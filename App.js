import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as TaskManager from 'expo-task-manager'; 

import Routes from "./src/routes";
import "@expo-google-fonts/montserrat";

import * as BackgroundFetch from 'expo-background-fetch';
import { fetchFireLocations2 } from "./src/api/apiFire";
import { schedulePushNotification } from "./src/hooks/NotificationService";

TaskManager.defineTask('background-fetch', async () => {
  try {
    const response = await fetchFireLocations2();
    if (response === true) {
      schedulePushNotification("Probando notificacion", "xsdd");
    }
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Error en la tarea en segundo plano:', error);
    return BackgroundFetch.Result.Failed;
  }
});

BackgroundFetch.setMinimumIntervalAsync(10); 

export default function App() {
  useEffect(() => {
    async function changeNavigationBarColor() {
      try {
        await NavigationBar.setBackgroundColorAsync("#FFFFFF");
      } catch (error) {
        console.error(
          "Error cambiando el color de la barra de navegación:",
          error
        );
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
