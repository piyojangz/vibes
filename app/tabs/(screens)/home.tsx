import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faComments, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { Grid, GridItem } from "@/components/ui/grid"
import { ResponsiveGrid } from 'react-native-flexible-grid';
import { ClusterProps, MarkerClusterer } from '@teovilla/react-native-web-maps';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { AddIcon } from "@/components/ui/icon"
import MapView from 'react-native-maps';
import { useImagesStore, useTouchStore } from '../../store';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const setHeader = useTouchStore((state) => state.setHeader);
  const navigation = useNavigation();
  const images = useImagesStore((state) => state.images);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);




  interface ImageItem {
    imageUrl: string;
    widthRatio?: number;
    heightRatio?: number;
  }

  // const repeatedData: ImageItem[] = Array(2).fill(images).flat();


  const setX = useTouchStore((state) => state.setX);
  const setY = useTouchStore((state) => state.setY);
  const setsOverRideStackAnimations = useTouchStore((state) => state.setsOverRideStackAnimations);


  const handleImagePress = useCallback((index: number, e: GestureResponderEvent) => {
    setsOverRideStackAnimations(false)
    setX(e.nativeEvent.pageX);
    setY(e.nativeEvent.pageY);
    // navigation.navigate('ReelsScreen', { index });
    navigation.navigate('ReelsScreen', { index, x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
  }, [navigation, setX, setY]);


  const handleGroupPress = useCallback((e: GestureResponderEvent) => {
    setsOverRideStackAnimations(true)
    setX(e.nativeEvent.pageX);
    setY(e.nativeEvent.pageY);
    navigation.navigate('GroupScreen', {});
  }, [navigation, setX, setY]);


  const renderItem = ({ item, index }: { item: ImageItem; index: number }): React.ReactElement => (

    <TouchableOpacity style={styles.boxContainer} onPress={(e: GestureResponderEvent) => handleImagePress(index, e)} >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.box}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );


  const snapPoints = useMemo(() => ['100%', '50%'], []);



  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.map}>
        {/* <MapView style={styles.map} /> */}
        <ScrollView
          pagingEnabled={true}
          contentContainerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <HStack space="md" reversed={false} className="mt-2 mb-2">
            <View className="h-12  justify-center rounded  " style={styles.boxshadow}>
              <Image
                source={require("@/assets/images/eat-area.png")} />
              <Text style={{ color: "#000000", fontSize: 11, fontFamily: "KanitLight", textAlign: "left", marginTop: 3 }} numberOfLines={1}>{'ย่านของกิน'}</Text></View>
            <View className="h-12  justify-center rounded  " style={styles.boxshadow}>
              <Image
                source={require("@/assets/images/departmentstore.png")} />
              <Text style={{ color: "#000000", fontSize: 11, fontFamily: "KanitLight", textAlign: "left", marginTop: 3 }} numberOfLines={1}>{'ห้างสรรพสินค้า'}</Text></View>
            <View className="h-12   justify-center rounded  " style={styles.boxshadow}>
              <Image
                source={require("@/assets/images/market.png")} />
              <Text style={{ color: "#000000", fontSize: 11, fontFamily: "KanitLight", textAlign: "left", marginTop: 3 }} numberOfLines={1}>{'ตลาดนัด'}</Text></View>
            <View className="h-12   justify-center rounded  " style={[styles.boxshadow, { backgroundColor: "#DBEAFF" }]}>
              <Image
                source={require("@/assets/images/restr.png")} />
              <Text style={{ color: "#000000", fontSize: 11, fontFamily: "KanitLight", textAlign: "left", marginTop: 3 }} numberOfLines={1}>{'ร้านอาหาร'}</Text></View>
          </HStack>
        </ScrollView>



        <View style={styles.locationShadow}>
          <FontAwesomeIcon icon={faLocationArrow} color={'#000'} size={20} />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        style={{
          backgroundColor: '#fff', marginHorizontal: -6, shadowColor: "#f2f2f2",
          shadowOffset: {
            width: 0,
            height: -6,
          },
          shadowOpacity: 1.37,
          shadowRadius: 7.49,

          elevation: 12,
        }}
        snapPoints={snapPoints}
        onChange={handleSheetChanges} 
        enableOverDrag={false}
        enableDynamicSizing={true} 
      >
        <Box className="">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',paddingBottom:20,marginTop: 20 }}>
            <ScrollView
              pagingEnabled={true}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              horizontal={true}
              disableScrollViewPanResponder={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack space="xs" reversed={false}>
                <Box className="h-10 w-20 justify-center items-center rounded"><Text style={{ color: "#000000", fontSize: 12, fontFamily: "KanitLight", textAlign: "center" }}>{'ทั้งหมด\nView'}</Text></Box>
                <Box className="h-10 w-20 justify-center items-center rounded" style={{ backgroundColor: "#01363E" }}><Text style={{ color: "#9FFF1A", fontSize: 12, fontFamily: "Kanit", textAlign: "center" }}>{'Rach hour'}</Text></Box>
                <Box className="h-10 w-20 justify-center items-center rounded"><Text style={{ color: "#000000", fontSize: 12, fontFamily: "KanitLight", textAlign: "center" }}>{'ท่าช้างรัชโย\nView'}</Text></Box>
                <Box className="h-10 w-20 justify-center items-center rounded"><Text style={{ color: "#000000", fontSize: 12, fontFamily: "KanitLight", textAlign: "center" }}>{'Peek a Boo\nView'}</Text></Box>
                <Box className="h-10 w-20 justify-center items-center rounded"><Text style={{ color: "#000000", fontSize: 12, fontFamily: "KanitLight", textAlign: "center" }}>{'พราว\nView'}</Text></Box>
              </HStack>
            </ScrollView>
            <View className="h-10 justify-center items-center" style={{
              marginRight: 10,
              shadowColor: "#000",
              borderRadius: 10,
              width: 70,
              zIndex: 1,
              shadowOffset: {
                width: -2,
                height: 0,
              },
              shadowOpacity: 0.07,
              shadowRadius: 11.22,

              elevation: 3,
            }}>
              <Button onPress={(e: GestureResponderEvent) => { handleGroupPress((e)) }} style={{ backgroundColor: "#fff" }}><FontAwesomeIcon icon={faCircleUser} color={'#323232'} /><Text style={{ fontFamily: 'KanitMedium' }}>237</Text></Button>

            </View>
          </View>
        </Box>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}> 
            <View style={{ backgroundColor: '#fff' }}> 
                <ResponsiveGrid
                  maxItemsPerColumn={3}
                  data={images}
                  renderItem={renderItem}
                  style={{ padding: 0}}
                /> 
            </View> 
        </BottomSheetScrollView>
      </BottomSheet>

      <Fab
        style={{ backgroundColor: "#9FFF1A" }}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={true}
      >
        <FabIcon as={AddIcon} color='#000' />
      </Fab>

    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0, 
    zIndex: 0,
  },
  boxContainer: {
    flex: 1,
    margin: 1,
  },

  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  boxshadow: {
    paddingLeft: 10,
    paddingRight: 20,
    width: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  locationShadow: {
    backgroundColor: "#fff",
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});

