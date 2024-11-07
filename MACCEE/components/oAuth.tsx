import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./customButton";
import GoogleIcon from "../assets/icons/googleIcon.png";
const OAuth = () => {
  const onGooglePress = async () => {};
  return (
    <View>
      <View className="flex flex-row items-center justify-center my-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title={"Login with Google"}
        bgVariant="outline"
        textVariant="primary"
        onPress={onGooglePress}
        IconLeft={() => (
          <Image
            source={GoogleIcon}
            resizeMode="contain"
            className="w-6 h-6 mx-2"
          />
        )}
      />
    </View>
  );
};

export default OAuth;
