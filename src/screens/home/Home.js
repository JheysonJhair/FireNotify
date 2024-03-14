import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../components/forms/Button";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { fetchFireLocations } from "../../api/apiFire";

export default function Home() {
  const [fireLocations, setFireLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const locations = await fetchFireLocations();
      setFireLocations(locations);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fuego</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.6394,
          longitude: -72.8814,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {fireLocations.length > 0 &&
          fireLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(location.latitud),
                longitude: parseFloat(location.longitud),
              }}
              title={`Temperatura: ${location.temperature}`}
              description={`Fecha: ${location.date}`}
              image={require("../../assets/fuego.png")}
            />
          ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button
          title="Notificaciones"
          onPress={() => navigation.navigate("Notify")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "002854",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    bottom: 20,
    right: 8,
    zIndex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#002854",
    width: "100%",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
});
