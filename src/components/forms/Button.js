import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const Button = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#aaaaaa" : "#1f5187" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? ["#1f5187", "#1f5187"] : ["#1f5187", "#1f5187"]}
        style={styles.linearGradient}
      >
        <View style={styles.contentContainer}>
          <Icon name="fire" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal:10,
    elevation: 3,
  },
  linearGradient: {
    borderRadius: 6,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_800ExtraBold",
    marginLeft: 5, 
  },
  icon: {
    marginRight: 5, 
  },
});

export default Button;
