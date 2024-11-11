import { Ride } from "@/types/type";
import React from "react";
import { Text, View, Image } from "react-native";
import fromIcon from "@/assets/icons/from.png";
import toIcon from "@/assets/icons/to.png";
import { formatDate, formatTime } from "@/lib/utils";

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
    <View className="flex flex-col items-center justify-between p-3">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[100px] rounded-lg"
        />
        <View className="flex flex-col mx-5 gap-y-2 flex-1">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={fromIcon} className="w-4 h-4" />
            <Text className="text-md font-Roboto" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Image source={toIcon} className="w-4 h-4" />
            <Text className="text-lg font-Roboto" numberOfLines={1}>
              {origin_address}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col w-full bg-general-500 items-center justify-center p-3 rounded-lg items-start">
        <View className="flex flex-row items-center justify-between w-full mb-5">
          <Text className="text-md font-Roboto text-gray-500">date & time</Text>
          <Text className="text-md font-Roboto text-gray-500">
            {formatDate(created_at)} {formatTime(ride_time)}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between w-full mb-5">
          <Text className="text-md font-Roboto text-gray-500">driver</Text>
          <Text className="text-md font-Roboto text-gray-500">
            {driver.first_name} {driver.last_name}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between w-full mb-5">
          <Text className="text-md font-Roboto text-gray-500">
            payment status
          </Text>
          <Text
            className={`text-md font-Roboto text-gray-500 capitalize ${
              payment_status === "paid" ? "text-green-500" : "text-danger-500"
            } `}
          >
            {payment_status}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-md font-Roboto text-gray-500">car seats</Text>
          <Text className="text-md font-Roboto text-gray-500">
            {driver.car_seats}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default RideCard;
