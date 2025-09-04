import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { View } from "@/components/Themed";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image, Text } from "react-native";
import { faUser, faCompass, faUserFriends, faHomeAlt, faUserAlt, faUserCircle, faHome, faAlignLeft } from '@fortawesome/free-solid-svg-icons'

import { useTouchStore } from '../../store';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -5 }} {...props} />;
}

export default function TabLayout() {


  const isShow = useTouchStore((state) => state.isShow);
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarActiveTintColor: '#01363E',
        tabBarInactiveTintColor: '#DDDDDD',
        headerStyle: {
          backgroundColor: '#fff', borderBottomWidth: 0, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
        headerLeft(props) {
          return (
            <View style={{ marginLeft: 0 }}>
              <Image style={{ height: 40 }} resizeMode="contain"
                source={require("@/assets/images/Vibes.png")} />
            </View>
          );
        },
        headerRight(props) {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Text style={{ fontFamily: "Karla", fontWeight: 700, marginRight: 10, fontSize: 14 }} >Hi, BREESHY</Text>
              <Image style={{ height: 40, width: 40 }} className="rounded-full"
                source={{ uri: 'https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg' }} />
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
        },
      }}
    >
      {/* <Tabs.Screen
        name="tab2"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 10 }}><FontAwesomeIcon icon={faHomeAlt} color={color} size={24} /></View>,
        }}
      /> */}
      <Tabs.Screen
        name="tabhome"
        options={{
          headerShown: isShow,
          title: "",
          tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 10 }}><FontAwesomeIcon icon={faHome} color={color} size={24} /></View>,
        }}
      />

      <Tabs.Screen
        name="tabnav"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 10 }}><FontAwesomeIcon icon={faCompass} color={color} size={24} /></View>,
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 10 }}><FontAwesomeIcon icon={faAlignLeft} color={color} size={24} /></View>,
        }}
      />

      <Tabs.Screen
        name="tab3"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 10 }}><FontAwesomeIcon icon={faUserCircle} color={color} size={24} /></View>,
        }}
      />
    </Tabs>
  );
}
