import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from 'expo-navigation-bar';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import Routes from "./src/routes";

// Define fetchDataAndSendNotification antes de usarlo
const fetchDataAndSendNotification = async () => {
  try {
    console.log("holaaa")
    const response = await axios.get("https://satlled.ccontrolz.com/satelite/conflagration");
    const data = response.data.value;
    const highTemperatureData = data.filter(item => item.temperature > 60);

    if (highTemperatureData.length > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '¡Alerta de temperatura alta!',
          body: 'Se ha detectado una temperatura mayor a 60°C.',
          icon: Platform.OS === "android" ? require("./src/assets/logo.png") : null,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        },
        trigger: null, 
      });
    }
  } catch (error) {
    console.error('Error al obtener datos de la API o enviar notificación:', error);
  }
};

TaskManager.defineTask('backgroundFetchTask', async () => {
  try {
    await fetchDataAndSendNotification();
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Error en la tarea en segundo plano:', error);
    return BackgroundFetch.Result.Failed;
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const registerBackgroundFetchTask = async () => {
      try {
        await BackgroundFetch.registerTaskAsync('backgroundFetchTask', {
          minimumInterval: 30,
          stopOnTerminate: false,
          startOnBoot: true,
        });
      } catch (error) {
        console.error('Error al registrar la tarea en segundo plano:', error);
      }
    };

    registerBackgroundFetchTask();

    return () => {
      BackgroundFetch.unregisterTaskAsync('backgroundFetchTask');
    };
  }, []);

  useEffect(() => {
    async function changeNavigationBarColor() {
      try {
        await NavigationBar.setBackgroundColorAsync("#FFFFFF");
      } catch (error) {
        console.error('Error cambiando el color de la barra de navegación:', error);
      }
    }
    
    changeNavigationBarColor();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
