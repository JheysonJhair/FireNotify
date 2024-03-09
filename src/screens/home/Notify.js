import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Info from "../../components/information/Info";
import Notification from "../../components/information/Notification";
import { fetchData } from "../../api/apiFire";
import * as Location from "expo-location";

function Notify() {
  const [selectedTab, setSelectedTab] = useState("Todos");
  const [notifications, setNotifications] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = [];
      for (const notification of notifications) {
        const { address, streetViewUrl } = await getAddressFromCoords(
          notification.latitud,
          notification.longitud
        );
        addresses.push({ address, streetViewUrl });
      }
      setAddresses(addresses);
    };
    fetchAddresses();
  }, [notifications]);

  const getAddressFromCoords = async (latitudeStr, longitudeStr) => {
    try {
      const latitude = parseFloat(latitudeStr);
      const longitude = parseFloat(longitudeStr);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Invalid coordinates");
      }

      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const { street, city, region, country } = location[0];

      let address = "";
      if (street) {
        address += `${street}, `;
      }
      if (city) {
        address += `${city}, `;
      }
      address += `${region}, ${country}`;

      const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latitude},${longitude}&fov=90&heading=235&pitch=10&key=TU_API_KEY`;

      return {
        address,
        streetViewUrl: street ? streetViewUrl : null,
      };
    } catch (error) {
      console.error("Error obtaining address:", error);
      return {
        address: "Dirección no disponible",
        streetViewUrl: null,
      };
    }
  };

  const getFireImage = (temperature) => {
    if (temperature > 60) {
      return require("../../assets/fire/2.jpg");
    } else if (temperature > 40) {
      return require("../../assets/fire/3.jpg");
    } else if (temperature > 30) {
      return require("../../assets/fire/1.jpg");
    } else {
      return require("../../assets/logo.png");
    }
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split("T");
    return dateParts[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoAndInfoContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.infoContainerImage}>
            <Info title="ALERTA INCENDIOS" ubicacion="PERÚ / APURíMAC" />
          </View>
        </View>
        <Text style={styles.title}>Notificaciones</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Todos" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Todos")}
          >
            <Text style={styles.tabText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Recientes" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Recientes")}
          >
            <Text style={styles.tabText}>Recientes</Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "Todos" ? (
          <ScrollView>
            <View>
            {notifications.map((notification, index) => (

            <Notification
                key={index}
                imageSource={
                  addresses[index]?.streetViewUrl
                    ? { uri: addresses[index].streetViewUrl }
                    : getFireImage(notification.temperature)
                }
                location={addresses[index]?.address}
                date={formatDate(notification.date)}
              />
              ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View>
            {notifications.map((notification, index) => (
            <Notification
                key={index}
                imageSource={
                  addresses[index]?.streetViewUrl
                    ? { uri: addresses[index].streetViewUrl }
                    : getFireImage(notification.temperature)
                }
                location={addresses[index]?.address}
                date={formatDate(notification.date)}
              />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingTop: 18,
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#EBEAEB",
  },
  selectedTab: {
    backgroundColor: "#FF9800",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  notification: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  notificationText: {
    fontSize: 16,
  },
  logoAndInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logoContainer: {
    marginRight: 20,
    backgroundColor: "#E4E2E3",
    borderRadius: 10,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text00: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#48C26C",
  },
});

export default Notify;
