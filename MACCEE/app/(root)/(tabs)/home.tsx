import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView className="bg-general-500">
      <Text className="text-danger-500">Home</Text>
    </SafeAreaView>
  );
}
