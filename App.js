import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as TaskManager from 'expo-task-manager'; 
import * as Notifications from 'expo-notifications';

import Routes from "./src/routes";
import "@expo-google-fonts/montserrat";

export default function App() {
  useEffect(() => {
    async function changeNavigationBarColor() {
      try {
        await NavigationBar.setBackgroundColorAsync("#0a213a");
      } catch (error) {
        console.error(
          "Error cambiando el color de la barra de navegación:",
          error
        );
      }
    }

    changeNavigationBarColor();
  }, []);

  useEffect(() => {
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        Notifications.getExpoPushTokenAsync().then((token) => {
          console.log(token.data);
        });
      } else {
        console.log('Permiso para notificaciones no otorgado');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
