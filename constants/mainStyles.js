import { StyleSheet } from "react-native";
import { secondaryColor } from "./Colors";

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryColor,
  },
  button: {
    width: "90%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#db938f",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    fontSize: 24,
    padding: 15
  }
});
