import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusCircle, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { Grid, GridItem } from "@/components/ui/grid"
import { ResponsiveGrid } from 'react-native-flexible-grid';
import { ClusterProps, MarkerClusterer } from '@teovilla/react-native-web-maps';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { AddIcon } from "@/components/ui/icon"

export default function Home() {
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

  const data: ImageItem[] = [
    {
      imageUrl: 'https://www.lemon8-app.com/seo/image?item_id=7283652971815109122&index=1&sign=555c7bc03d8536815fd1ac6d41142d13',
      widthRatio: 1,
      heightRatio: 1.4,
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWDSDWf77PV7V6kBX31E6r5RWSVHRm5NPGg&s',
      widthRatio: 1,
      heightRatio: 1.4,
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yX6bw_zV18yHCcvru1VFSZQRLw0ErcAZMw&s',
      widthRatio: 1,
      heightRatio: 1.4,
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAO6PXCN3Uc9XPkypVGdjBmPT8Zw4ewkHQyQ&s',
      widthRatio: 1,
      heightRatio: 1.4,
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
      widthRatio: 1,
      heightRatio: 1.4,
    },
  ];

  const repeatedData: ImageItem[] = Array(2).fill(data).flat();

  function handleImagePress(index: number, e: GestureResponderEvent): void {
    console.log(`Image at index ${index} pressed`, e.nativeEvent);
  }


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
        enableDynamicSizing={true}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Box className="">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <ScrollView
                pagingEnabled={true}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                horizontal={true}
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
                width: 60,
                shadowColor: "#000",
                borderRadius: 10,
                zIndex: 1,
                shadowOffset: {
                  width: -1,
                  height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 2.22,

                elevation: 3,
              }}>
                <Button style={{ backgroundColor: "#fff" }}><FontAwesomeIcon icon={faPlusCircle} color={'#000'} size={16} /></Button>
              </View>
            </View>
          </Box>

          <Box className="flex-1 bg-black h-[100vh] bg-grey mt-2">
            <View style={{ backgroundColor: '#f1f1f1' }}>
              <ScrollView
              // style={{ height: Dimensions.get('window').height - 200 }}
              >
                <ResponsiveGrid
                  maxItemsPerColumn={3}
                  data={repeatedData}
                  renderItem={renderItem}
                  style={{ padding: 5 }}
                />
              </ScrollView>
            </View>
          </Box>
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
    paddingVertical: 10,
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