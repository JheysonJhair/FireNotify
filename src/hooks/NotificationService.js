import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(texto, scheduledTime) {
  let bodyMessage = texto;

  const now = new Date();
  const scheduledDate = new Date(scheduledTime);
  const timeDiff = scheduledDate.getTime() - now.getTime();

  // Si la hora programada ya pasó, no se programa la notificación
  if (timeDiff <= 0) {
    console.warn("La hora programada ya ha pasado.");
    return;
  }

  // Configura la notificación con vibración y sonido personalizado
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Llegó la notificación!",
      body: bodyMessage,
      sound: require("../assets/sonido.mp3"), // Ruta al archivo de sonido personalizado
      icon: Platform.OS === "android" ? require("../assets/logo.png") : null,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    },
    trigger: {
      seconds: timeDiff / 1000, // Convertir la diferencia de tiempo a segundos
    },
  });
}
