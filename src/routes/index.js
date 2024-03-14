import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Load from "../screens/auth/Load";
import Home from "../screens/home/Home";
import Notify from "../screens/home/Notify";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Load"
        component={Load}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notify"
        component={Notify}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#002854",
          },
          headerTitleStyle: {
            color: "#fff",
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          title: "Notificaciones",
        }}
      />
    </Stack.Navigator>
  );
}
