import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { reverseGeocodeAsync } from "expo-location";
import { useNavigation } from "@react-navigation/native";

import { useLocation } from "../../components/utils/LocationContext ";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/forms/Button";

function UserLocation() {
  const navigation = useNavigation();
  const [location, setLocationActual] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const { setLocationInfo } = useLocation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { distanceInterval: 10 },
        async (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocationActual({ latitude, longitude });
          setLocationInfo({ latitude, longitude });
          const reverseGeocode = await reverseGeocodeAsync({
            latitude,
            longitude,
          });
          if (reverseGeocode.length > 0) {
            const { street, city, region, country } = reverseGeocode[0];
            if (street) {
              setAddress(`${street}, ${city}, ${region}, ${country}`);
            } else {
              setAddress(`${city}, ${region}, ${country}`);
            }
          } else {
            setAddress("Address not found");
          }
        }
      );
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.address}>Cargando...</Text>
      </View>
    );
  }
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem(
        "locationData",
        JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    } catch (error) {
      console.error("Error al guardar datos de locacion:", error);
    }
  };

  const handleUbication = () => {
    navigation.navigate("Explore");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>
      <View style={styles.contAddress}>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.contB}>
        <Button title="Enviar mi ubicación" onPress={handleUbication} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161B21",
  },
  map: {
    width: "100%",
    height: "85%",
  },
  contAddress: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  contB:{
    width: "90%",
  }
});

export default UserLocation;
