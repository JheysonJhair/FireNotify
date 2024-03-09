import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(mesaage, bodyMessage) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: mesaage,
      body: bodyMessage,
      icon: Platform.OS === "android" ? require("../assets/logo.png") : null,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    },
    trigger: null, 
  });
}
