import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import TopBook from "../../assets/images/top-book.png";
import InputField from "../../components/inputField";
import email from "../../assets/icons/emailIcon.png";
import passwordIcon from "../../assets/icons/passwordIcon.png";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import OAuth from "@/components/oAuth";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 #ebf5f5">
      <View className="flex-1">
        <Image
          source={TopBook}
          className="z-0 w-full h-[150px] bg-[#8d9191] rounded-b5xl shadow-2xl"
        />

        <View className="p-6">
          <Text className="text-3xl font-Roboto font-bold absolute bottom-10 left-5">
            Log in
          </Text>
          <Text className="text-[#8d9191] text-sm font-Roboto absolute bottom-5 left-10 ">
            Login with your email and password
          </Text>
        </View>
        <View className="p-5">
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
            title={"Sign in"}
            className="mt-5"
            onPress={onSignInPress}
          />
          <OAuth />
          <View className="flex flex-row items-center justify-center mt-5">
            <Text className="text-[#8d9191] font-Roboto">
              Dont have an account?{" "}
            </Text>
            <Link href={"../(auth)/sign-up"} className="text-[#0286FF] ml-2">
              Sign up
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
