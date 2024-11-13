import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where are you going?"
        debounce={200}
        styles={{
          textInputContainer: {
            backgroundColor: textInputBackgroundColor,
            borderRadius: 10,
            width: "100%",
            height: 50,
            margin: 0,
            padding: 0,
          },
          textInput: {
            backgroundColor: textInputBackgroundColor,
            borderRadius: 10,
            fontSize: 18,
            height: 50,
            margin: 0,
            padding: 0,
          },
          listView: {
            backgroundColor: textInputBackgroundColor,
            borderRadius: 10,
            width: "100%",
            margin: 0,
            padding: 0,
          },
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
