import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/components/utils/UserContext";
import { LocationProvider } from "./src/components/utils/LocationContext ";
import * as NavigationBar from 'expo-navigation-bar';

import Routes from "./src/routes";
import "@expo-google-fonts/montserrat";

export default function App() {
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
    <UserProvider>
      <LocationProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <Routes />
        </NavigationContainer>
      </LocationProvider>
    </UserProvider>
  );
}
