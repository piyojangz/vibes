import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, GestureResponderEvent, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faComments, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { Grid, GridItem } from "@/components/ui/grid"
import { ResponsiveGrid } from 'react-native-flexible-grid';
// import { ClusterProps, MarkerClusterer } from '@teovilla/react-native-web-maps';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { AddIcon, ChevronRightIcon } from "@/components/ui/icon"
import MapView from 'react-native-maps';
import { useImagesStore, useTouchStore } from '../../store';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const setHeader = useTouchStore((state) => state.setHeader);
  const navigation = useNavigation<any>();
  const images = useImagesStore((state) => state.images);
  const categories = useImagesStore((state) => state.categories);
  const setSelectedCategory = useImagesStore((state) => state.setSelectedCategory);
  const selectedCategoryId = useImagesStore((state) => state.selectedCategoryId);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);




  interface ImageItem {
    imageUrl: string;
    widthRatio?: number;
    heightRatio?: number;
    categoryId?: string; // เพิ่ม field นี้
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

  // เพิ่ม state สำหรับข้อมูลหมวดหมู่และการเลือก
  // Get categories from store instead of local state


  // เพิ่ม state เก็บ categoryId ที่เลือก
  // const [selectedCategoryId, setSelectedCategoryId] = useState('2'); // เริ่มต้นที่ Rach hour

  // ข้อมูล mock สำหรับแต่ละหมวดหมู่
  const categoryImages = useMemo(() => ({
    '1': images, // ทั้งหมด
    '2': images.filter((_, i) => i % 4 === 0 || i % 4 === 1), // Rach hour
    '3': images.filter((_, i) => i % 5 === 2 || i % 5 === 3), // ท่าช้างรัชโย
    '4': images.filter((_, i) => i % 3 === 0), // Peek a Boo
    '5': images.filter((_, i) => i % 2 === 0), // พราว
  }), [images]);

  // เลือกข้อมูลที่จะแสดงตามหมวดหมู่ที่เลือก
  const displayImages = useMemo(() => {
    if (selectedCategoryId === '1') return images; // ทั้งหมด

    // กรองตาม categoryId
    return images.filter(img => img.categoryId === selectedCategoryId);
  }, [selectedCategoryId, images]);

  // เพิ่ม animation effect สำหรับ fade in/out
  const [isLoading, setLoading] = useState(false);

  // ปรับปรุงฟังก์ชัน handleCategorySelect เพื่อแสดงและซ่อน loading
  const handleCategorySelect = useCallback(async (selectedId: string) => {
    setLoading(true); // แสดง loading ก่อนเปลี่ยน category

    // ใช้ setSelectedCategory จาก store แทน
    setSelectedCategory(selectedId);

    try {
      // จำลองเวลาโหลด
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to fetch images for category", error);
    } finally {
      setLoading(false); // ซ่อน loading เมื่อโหลดเสร็จ
    }
  }, [setSelectedCategory]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.map}>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 13.7563, // Example: Bangkok latitude
            longitude: 100.5018, // Example: Bangkok longitude
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        {/* <ScrollView
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
        </ScrollView> */}



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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 10, marginTop: 0 }}>
            <ScrollView
              pagingEnabled={true}
              contentContainerStyle={{
                paddingLeft: 10,
                paddingRight: 10
              }}
              horizontal={true}
              disableScrollViewPanResponder={true}
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
                marginHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <TouchableOpacity
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <Box
                        className="h-10 w-20 justify-center items-center rounded"
                        style={category.selected ? { backgroundColor: "#01363E" } : {}}
                      >
                        <Text
                          style={{
                            color: category.selected ? "#9FFF1A" : "#000000",
                            fontSize: 12,
                            fontFamily: category.selected ? "Kanit" : "KanitLight",
                            textAlign: "center"
                          }}
                        >
                          {category.name}
                        </Text>
                      </Box>
                    </TouchableOpacity>

                    {/* เพิ่มเส้นแบ่งหลังทุกกล่อง ยกเว้นกล่องสุดท้าย */}
                    {index < categories.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </ScrollView>
          </View>
        </Box>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ backgroundColor: '#fff', height: 100 }}>
            {isLoading ? (
              // แสดง loading spinner ขณะกำลังโหลด
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#9FFF1A" />
                <Text style={styles.loadingText}>กำลังโหลด...</Text>
              </View>
            ) : (
              // แสดง grid เมื่อโหลดเสร็จ
              <ResponsiveGrid
                maxItemsPerColumn={3}
                data={displayImages}
                renderItem={renderItem}
                style={{ padding: 0 }}
              />
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      <Fab
        onPress={() => navigation.navigate('PlaygroundScreen', {})}
        style={{ backgroundColor: "#9FFF1A" }}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={true}
      >
        <FabIcon as={ChevronRightIcon} color='#000' />
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#01363E',
    fontFamily: 'KanitMedium',
  },
  divider: {
    height: '70%', // ความสูง 70% ของพื้นที่
    width: 1,       // ความกว้าง 1 pixel
    backgroundColor: '#E0E0E0', // สีอ่อนๆ
    marginHorizontal: 5, // ระยะห่างซ้าย-ขวา
    alignSelf: 'center', // จัดให้อยู่กลางแนวตั้ง
  },
});

