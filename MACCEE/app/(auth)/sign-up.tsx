import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import TopBook from "../../assets/images/top-book.png";
import InputField from "../../components/inputField";
import person from "../../assets/icons/personIcon.png";
import email from "../../assets/icons/emailIcon.png";
import passwordIcon from "../../assets/icons/passwordIcon.png";
import checkIcon from "../../assets/icons/checkIcon.png";
import lockIcon from "../../assets/icons/lockIcon.png";
import CustomButton from "@/components/customButton";
import OAuth from "../../components/oAuth";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
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
            icon={passwordIcon}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title={"Sign Up"}
            className="mt-5"
            onPress={onSignUpPress}
          />

          <OAuth />

          <View className="flex flex-row items-center justify-center mt-3">
            <Text className="text-[#8d9191] font-Roboto">
              Already have an account?{" "}
            </Text>
            <Link href={"../(auth)/sign-in"} className="text-[#0286FF] ml-2">
              Log In
            </Link>
          </View>
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() =>
              setVerification({ ...verification, state: "success" })
            }
          >
            <View className="bg-white px-5 py-10 rounded-2xl min-h-[200px]">
              <Text className="text-3xl mb-5 font-Roboto font-bold">
                Verification
              </Text>
              <Text className="text-[#8d9191] mb-5">
                A verification code has been sent to {form.email}. Please enter
                the code below
              </Text>
              <InputField
                label={"Verification Code"}
                placeholder={"Enter the code"}
                icon={lockIcon}
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification({ ...verification, code: code })
                }
              />
              {verification.error && (
                <Text className="text-red-500 text-sm my-2">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title={"Verify"}
                className="mt-5"
                onPress={onPressVerify}
                bgVariant="success"
              />
            </View>
          </ReactNativeModal>
          <ReactNativeModal isVisible={verification.state === "success"}>
            <View className="bg-white px-5 py-10 rounded-2xl min-h-[200px]">
              <Image
                source={checkIcon}
                className="w-20 h-20 mx-auto bg-green-500 rounded-full p-6 my-5"
              />
              <Text className="text-2xl font-Roboto font-bold text-center">
                Account Created
              </Text>
              <Text className="text-[#8d9191] text-center mt-2">
                Your account has been created successfully
              </Text>
              <CustomButton
                title={"browse home"}
                className="mt-5"
                onPress={() => {
                  router.replace("/(root)/(tabs)/home");
                }}
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
