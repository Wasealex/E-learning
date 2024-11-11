import { Ride } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => (
  <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
    <View className="flex flex-row items-center justify-between p-3">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold text-neutral-900">
          {origin_address}
        </Text>
      </View>
    </View>
  </View>
);

export default RideCard;
