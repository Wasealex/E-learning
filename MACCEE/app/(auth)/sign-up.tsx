import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import TopBook from "../../assets/images/top-book.png";
import InputField from "../../components/inputField";
import person from "../../assets/icons/personIcon.png";
import email from "../../assets/icons/emailIcon.png";
import password from "../../assets/icons/passwordIcon.png";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSignupPress = () => {};
  return (
    <ScrollView className="flex-1 #ebf5f5">
      <View className="flex-1">
        <Image
          source={TopBook}
          className="z-0 w-full h-[150px] bg-[#8d9191] rounded-b5xl shadow-2xl"
        />

        <View className="p-6">
          <Text className="text-3xl font-Roboto font-bold absolute bottom-10 left-5">
            Create Account
          </Text>
          <Text className="text-[#8d9191] text-sm font-Roboto absolute bottom-5 left-10 ">
            Create a new account to get started
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Full Name"}
            placeholder={"Enter your full name"}
            value={form.fullName}
            icon={person}
            onChangeText={(value) => setForm({ ...form, fullName: value })}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            value={form.email}
            icon={email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            value={form.password}
            icon={password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <InputField
            label={"Confirm Password"}
            placeholder={"Re-enter your Password"}
            value={form.confirmPassword}
            secureTextEntry={true}
            icon={password}
            onChangeText={(value) =>
              setForm({ ...form, confirmPassword: value })
            }
          />
          <CustomButton
            title={"Sign Up"}
            className="mt-5"
            onPress={onSignupPress}
          />
          {/* OAuth */}

          <View className="flex flex-row items-center justify-center mt-3">
            <Text className="text-[#8d9191] font-Roboto">
              Already have an account?{" "}
            </Text>
            <Link href={"../(auth)/sign-in"} className="text-[#0286FF] ml-2">
              Log In
            </Link>
          </View>
          {/* Verification modal*/}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
