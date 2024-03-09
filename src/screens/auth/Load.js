import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  useFonts,
  Montserrat_800ExtraBold,
  Montserrat_400Regular_Italic,
} from "@expo-google-fonts/montserrat";

const Load = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Montserrat_400Regular_Italic,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
        <Animatable.Text animation="flipInX" style={styles.containerLogoText}>
          FIRENOTIFY
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#073a3f",
    paddingBottom: 80,
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogoText: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "Montserrat_800ExtraBold",
  },
  logo: {
    width: 115, 
    height: 110, 
  },
});

export default Load;
