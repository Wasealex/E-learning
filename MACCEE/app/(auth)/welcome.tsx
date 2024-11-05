import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-center">
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-white">Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
