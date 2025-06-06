import React, { useState } from "react";
import Gradient from "@/assets/Icons/Gradient";
import DocumentData from "@/assets/Icons/DocumentData";
import LightBulbPerson from "@/assets/Icons/LightbulbPerson";
import Rocket from "@/assets/Icons/Rocket";
import Logo from "@/assets/Icons/Logo";
import { Box } from "@/components/ui/box";
import { ScrollView, Image, ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { Text } from "@/components/ui/text";
import LoadingModal from "react-native-loading-modal";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const onPress = () => {
    setLoading(true);
    setTimeout(() => {
      location.replace("/tabs/");
    }, 2000);

  };
  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <LoadingModal modalVisible={loading} darkMode={true} color={"#01363E"} />

      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="absolute top-0 left-0 right-0 bottom-0 z-[-1]">
          <Image resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            source={require("@/assets/images/land-bg.png")} />
        </View>
        <View className="flex-1 justify-center items-center top-110   left-0 right-0 z-10">
          <Image
            source={require("@/assets/images/Vibes.png")} />
        </View>
        <View
          className="pt-10 pb-10 justify-center items-center   left-0 right-0 z-10"
          style={{ backgroundColor: "#01363E", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
        >
          <View className="flex-row justify-center items-center w-full px-5">
            <Text style={{ color: "#fff", fontSize: 28, fontFamily: "KanitMedium" }}>ยินดีต้อนรับสู่ <Text style={{ color: "#9FFF1A", fontSize: 32, fontFamily: "Karla", fontWeight: 700 }}>Vibes</Text></Text>
          </View>
          <View className="flex-row justify-center items-center w-full px-5 pt-4 pb-2">
            <Text style={{ color: "#fff", fontSize: 18, fontFamily: "KanitLight" }}>ล๊อกอินเพื่อบอก vibe ดีๆให้ทุกคนได้รู้</Text>
          </View>
          <View className="flex-row justify-center items-center w-full px-5 pt-2 pb-2  mt-5"  >

            <Button className="bg-white" style={{ borderRadius: 15, height: 60, width: 300 }} onPress={onPress}> <Image
              source={require("@/assets/images/google-icon.png")} /> <Text style={{ color: "#000", fontSize: 18, fontFamily: "Karla", fontWeight: "700" }}>Continue with Google</Text></Button>

          </View>
          <View className="flex-row justify-center items-center w-full px-5 pt-2 pb-2 "  >
            <Button className="bg-white mt-5" style={{ borderRadius: 15, height: 60, width: 300 }}> <Image
              source={require("@/assets/images/apple-icon.png")} /> <Text style={{ color: "#000", fontSize: 18, fontFamily: "Karla", fontWeight: "700" }}>Continue with Google</Text></Button>
          </View>

          <View className="flex-row justify-center items-center w-full px-5  mt-5">
            <Text style={{ color: "#fff", fontSize: 16, fontFamily: "KanitLight" }}>ยังไม่มีบัญชีใช่ไหม? <Text style={{ color: "#9FFF1A", fontSize: 16, fontFamily: "KanitLight" }}>สมัครเลย</Text></Text>
          </View>
        </View>
      </ScrollView>
    </Box>
  );
}
