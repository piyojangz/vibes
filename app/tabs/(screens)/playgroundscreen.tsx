import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
// เพิ่ม import Animated จาก react-native-reanimated
import Animated, { Layout, FadeIn } from 'react-native-reanimated';
import { faCircleUser, faComments, faLocationArrow, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // เพิ่ม faTimes icon
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { useImagesStore, useTouchStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { AddIcon, ChevronRightIcon, InfoIcon } from "@/components/ui/icon"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function PlaygroundScreen() {
    const setHeader = useTouchStore((state) => state.setHeader);
    const navigation = useNavigation<any>();
    const images = useImagesStore((state) => state.images);

    useEffect(() => {
        setHeader(false);

        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setHeader(true);
        });

        return unsubscribe;
    }, [navigation, setHeader]);

    // สร้างข้อมูลตัวอย่างสำหรับสไลด์ (หรือใช้จาก images store)
    const slideData = [
        { id: '1', imageUrl: 'https://picsum.photos/id/1/800/350' },
        { id: '2', imageUrl: 'https://picsum.photos/id/2/800/350' },
        { id: '3', imageUrl: 'https://picsum.photos/id/3/800/350' },
        { id: '4', imageUrl: 'https://picsum.photos/id/4/800/350' },
        { id: '5', imageUrl: 'https://picsum.photos/id/5/800/350' },
    ];

    // ถ้าต้องการใช้ข้อมูลจาก images store แทน:
    // const slideData = images.slice(0, 5);

    const renderSlideItem = ({ item }: { item: any }) => (
        <View style={styles.slideItem}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.slideImage}
                resizeMode="cover"
            />
        </View>
    );

    const [activeSlide, setActiveSlide] = useState(0);

    const handleSlideChange = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
        const slideIndex = Math.floor(
            event.nativeEvent.contentOffset.x / Dimensions.get('window').width
        );
        setActiveSlide(slideIndex);
    };

    // ฟังก์ชั่นตรวจสอบว่าโพสต์ในวันนี้หรือไม่
    const isPostedToday = (dateString: string): boolean => {
        if (!dateString) return false;

        const postedDate = new Date(dateString);
        const today = new Date();

        return postedDate.getDate() === today.getDate() &&
            postedDate.getMonth() === today.getMonth() &&
            postedDate.getFullYear() === today.getFullYear();
    };

    // ข้อมูลสำหรับ Grid People - เพิ่ม lastPosted
    const [people, setPeople] = useState([
        { id: '1', name: 'Jessica', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'เยอรมนีเปิดตัว ICE รุ่นใหม่!', lastPosted: '2025-09-03T10:30:00' }, // วันนี้
        { id: '2', name: 'Michael', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', message: '', lastPosted: '2025-09-01T15:45:00' },
        { id: '3', name: 'Emma', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', message: 'นักบอลไทยย้ายซบทีมยุโรป', lastPosted: '2025-09-03T08:15:00' }, // วันนี้
        { id: '4', name: 'James', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', message: '', lastPosted: '2025-08-28T12:20:00' },
        { id: '5', name: 'Olivia', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', message: 'ดัชนีหุ้นไทยพุ่งแรง', lastPosted: '2025-09-03T14:50:00' }, // วันนี้
        { id: '6', name: 'Noah', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', message: '', lastPosted: '2025-09-02T11:10:00' },
        { id: '7', name: 'Ava', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', message: 'ฝนตกหนักทั่วกรุงเทพฯ', lastPosted: '2025-08-30T09:25:00' },
        { id: '8', name: 'William', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', message: '', lastPosted: '2025-09-01T16:35:00' },
        { id: '9', name: 'Sophia', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', message: '', lastPosted: '2025-08-29T13:40:00' },
        { id: '10', name: 'Benjamin', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', message: '', lastPosted: '2025-09-02T17:55:00' },
        { id: '11', name: 'Isabella', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', message: 'รถไฟฟ้าสายใหม่เปิดให้บริการแล้ว', lastPosted: '2025-09-03T09:05:00' }, // วันนี้
        { id: '12', name: 'Lucas', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', message: '', lastPosted: '2025-08-31T10:15:00' },
    ]);

    // เพิ่มต่อจาก useState ของ people
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

    // เพิ่ม useEffect สำหรับ auto update ทุกๆ 5 วินาที
    useEffect(() => {
        const updateInterval = setInterval(() => {
            // สุ่มเปลี่ยนสถานะของคนบางคน
            setPeople(currentPeople =>
                currentPeople.map(person => {
                    // สุ่มว่าจะอัพเดทคนนี้หรือไม่ (20% โอกาส)
                    if (Math.random() < 0.2) {
                        // ข้อความเฉพาะสำหรับแต่ละคน ตาม ID
                        let specificMessage = '';

                        // กำหนดข้อความเฉพาะตาม ID
                        switch (person.id) {
                            case '1':
                                specificMessage = 'เยอรมนีเปิดตัว ICE รุ่นใหม่!';
                                break;
                            case '2':
                                specificMessage = 'เช็คอินร้านอาหารใหม่ย่านสาทร';
                                break;
                            case '3':
                                specificMessage = 'นักบอลไทยย้ายซบทีมยุโรป';
                                break;
                            case '4':
                                specificMessage = 'พบเบาะแสใหม่คดีอาชญากรรม';
                                break;
                            case '5':
                                specificMessage = 'ดัชนีหุ้นไทยพุ่งแรง';
                                break;
                            case '6':
                                specificMessage = 'ถ่ายภาพสตอร์มที่พัทยา';
                                break;
                            case '7':
                                specificMessage = 'ฝนตกหนักทั่วกรุงเทพฯ';
                                break;
                            case '8':
                                specificMessage = 'แนะนำหนังใหม่น่าดู';
                                break;
                            case '9':
                                specificMessage = 'วันนี้ทานอาหารฝรั่งเศส';
                                break;
                            case '10':
                                specificMessage = 'แบ่งปันเทคนิคถ่ายภาพกลางคืน';
                                break;
                            case '11':
                                specificMessage = 'รถไฟฟ้าสายใหม่เปิดให้บริการแล้ว';
                                break;
                            case '12':
                                specificMessage = 'คอนเสิร์ตใหญ่มาไทยปีหน้า';
                                break;
                            case '13':
                                specificMessage = 'น้ำมันราคาลดลง 3 บาท';
                                break;
                            case '14':
                                specificMessage = 'ร้านกาแฟใหม่เปิดแล้วที่สยาม';
                                break;
                            case '15':
                                specificMessage = 'โควิดสายพันธุ์ใหม่ระบาดแล้ว';
                                break;
                            case '16':
                                specificMessage = 'แนะนำหนังสือน่าอ่านประจำเดือน';
                                break;
                            case '17':
                                specificMessage = 'เปิดจองไอโฟนรุ่นใหม่วันนี้!';
                                break;
                            case '18':
                                specificMessage = 'ส่วนลด 50% เฉพาะวันนี้';
                                break;
                            case '19':
                                specificMessage = 'ค่าเงินบาทแข็งค่าขึ้น';
                                break;
                            case '20':
                                specificMessage = 'ข่าวใหม่: งานวิ่งการกุศลเดือนหน้า';
                                break;
                            default:
                                specificMessage = 'มีอัพเดทล่าสุด';
                        }

                        // บางครั้งอาจจะล้างข้อความ (20% โอกาส)
                        if (Math.random() < 0.2) {
                            specificMessage = '';
                        }

                        // อัพเดทเวลาโพสต์เป็นปัจจุบัน
                        return {
                            ...person,
                            message: specificMessage,
                            lastPosted: new Date().toISOString()
                        };
                    }
                    return person;
                })
            );
            setLastUpdateTime(new Date());
        }, 5000); // อัพเดททุก 5 วินาที

        return () => clearInterval(updateInterval);
    }, []);

    // ก่อนส่ง data ไปยัง FlatList เรียงลำดับตาม lastPosted
    const sortedPeople = [...people].sort((a, b) => {
        // เรียงจากใหม่สุดไปเก่าสุด (วันที่มากไปน้อย)
        return new Date(b.lastPosted).getTime() - new Date(a.lastPosted).getTime();
    });

    const [loading, setLoading] = useState(false);

    // ปรับปรุงฟังก์ชัน loadMorePeople ให้มีข้อมูล lastPosted ด้วย
    const loadMorePeople = () => {
        setLoading(true);
        setTimeout(() => {
            const today = new Date().toISOString();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString();

            const newPeople = [
                { id: '13', name: 'Mia', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', message: 'น้ำมันราคาลดลง 3 บาท', lastPosted: today }, // วันนี้
                { id: '14', name: 'Henry', avatar: 'https://randomuser.me/api/portraits/men/14.jpg', message: '', lastPosted: yesterdayStr },
                { id: '15', name: 'Charlotte', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', message: 'โควิดสายพันธุ์ใหม่ระบาด', lastPosted: today }, // วันนี้
                { id: '16', name: 'Alexander', avatar: 'https://randomuser.me/api/portraits/men/16.jpg', message: '', lastPosted: yesterdayStr },
                { id: '17', name: 'Amelia', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', message: 'เปิดจองไอโฟนรุ่นใหม่วันนี้!', lastPosted: yesterdayStr },
                { id: '18', name: 'Oliver', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', message: '', lastPosted: yesterdayStr },
                { id: '19', name: 'Evelyn', avatar: 'https://randomuser.me/api/portraits/women/19.jpg', message: 'ค่าเงินบาทแข็งค่าขึ้น', lastPosted: today }, // วันนี้
                { id: '20', name: 'Daniel', avatar: 'https://randomuser.me/api/portraits/men/20.jpg', message: '', lastPosted: yesterdayStr },
            ];
            setPeople([...people, ...newPeople]);
            setLoading(false);
        }, 1000);
    };
    const closePlayground = useCallback(() => {
        // ใช้ navigation.goBack() เพื่อนำทางกลับไปยังหน้าก่อนหน้า
        navigation.goBack();
        // หรืออาจจะใช้ navigation.navigate เพื่อไปยังหน้าที่ต้องการโดยเฉพาะ
        // navigation.navigate('Home');
    }, [navigation]);
    // สร้าง AnimatedFlatList component
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

    // คอมโพเนนต์สำหรับแสดงแต่ละคน - เปลี่ยนเป็นใช้ Animated.View
    const renderPersonItem = ({ item }: { item: any }) => (
        <Animated.View
            style={styles.personItem}
            layout={Layout.springify().damping(14).stiffness(100)}
            entering={FadeIn.duration(300)}
        >
            <TouchableOpacity style={{ alignItems: 'center', width: '100%' }}>
                {/* Message Bubble */}
                {item.message ? (
                    <>
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText} numberOfLines={2} ellipsizeMode="tail">
                                {item.message}
                            </Text>
                            <View style={styles.arrowContainer}>
                                <View style={styles.messageArrow} />
                            </View>
                        </View>

                        {/* Rainbow Border using LinearGradient */}
                        <LinearGradient
                            colors={['#FF5E00', '#FFCA00', '#FF00B3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.avatarRainbowBorder}
                        >
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            </View>
                        </LinearGradient>
                    </>
                ) : (
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    </View>
                )}
                <Text style={styles.personName} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderFooter = () => {
        if (!loading) return (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMorePeople}>
                <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
        );

        return (
            <ActivityIndicator
                color="#0077B6"
                style={styles.loadingIndicator}
                size="small"
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.playgroundHeader}>
                <TouchableOpacity onPress={closePlayground} style={styles.closeButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="#666" />
                </TouchableOpacity>
                <View style={[{ flexDirection: 'row', alignItems: 'baseline' }]}>
                    <Text style={styles.contentText}>Exploring People</Text>
                    <Text style={styles.contentTitle}> Ratch hour</Text>
                </View>

            </View>
            {/* Slide ด้านบน */}
            {/* Content area */}
            {/* Warning Box - เพิ่มกล่องแจ้งเตือน */}
            <View style={styles.warningBox}>
                <FontAwesomeIcon icon={faWarning} color={'#d6e049ff'} size={24} />
                <Text style={styles.warningText}>
                    ทำไมจึงเห็น? เนื่องจากคุณได้แชร์ vibes ใน 7 วันที่ผ่านมา
                </Text>
            </View>

            <View style={styles.sliderContainer}>
                <FlatList
                    data={slideData}
                    renderItem={renderSlideItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleSlideChange}
                    keyExtractor={(item) => item.id}
                />
            </View>
            {/* Pagination dots */}
            <View style={styles.pagination}>
                {slideData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeSlide ? styles.paginationDotActive : {}
                        ]}
                    />
                ))}
            </View>


            {/* Grid People - เปลี่ยนจาก FlatList เป็น AnimatedFlatList */}
            <AnimatedFlatList
                data={sortedPeople}
                renderItem={renderPersonItem}
                keyExtractor={(item: unknown) => (item as { id: string }).id}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContainer}
                ListFooterComponent={renderFooter}
                style={styles.gridList}
                // เพิ่ม animation เมื่อมีการเปลี่ยนตำแหน่ง
                layout={Layout.springify().damping(10).stiffness(100)}
            />

            <Fab
                onPress={() => navigation.navigate('CameraCaptureScreen', {})}
                style={{ backgroundColor: "#9FFF1A" }}
                size="md"
                placement="bottom right"
                isHovered={false}
                isDisabled={false}
                isPressed={true}
            >
                <FabIcon as={AddIcon} color='#000' />
            </Fab>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sliderContainer: {
        height: 150,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5, // ลดระยะห่างด้านล่างลงเพื่อให้มีพื้นที่สำหรับ pagination
        borderRadius: 15,
        overflow: 'hidden',
    },
    slideItem: {
        width,
        height: 150,
    },
    slideImage: {
        width: '100%',
        height: '100%',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center', // จัดให้อยู่ตรงกลางแนวนอน
        marginBottom: 10, // เพิ่มระยะห่างด้านล่าง
        // ลบ position: 'absolute' และ bottom
        height: 20, // กำหนดความสูงชัดเจน
        alignItems: 'center', // จัดให้อยู่ตรงกลางแนวตั้ง
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: '#D9D9D9', // เปลี่ยนเป็นสีเข้มกว่าเดิมเพื่อให้เห็นชัด
    },
    paginationDotActive: {
        backgroundColor: '#01363E',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    contentArea: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    contentText: {
        fontSize: 16,
        color: '#666',
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    // เพิ่ม styles สำหรับกล่องแจ้งเตือน
    warningBox: {
        backgroundColor: '#E4F6FF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginHorizontal: 25,
        marginTop: 15,
        borderRadius: 10,
        gap: 10, // ระยะห่างระหว่างไอคอนและข้อความ
    },
    warningText: {
        color: '#000000ff',
        fontSize: 14,
        flex: 1,
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    // Styles for People Grid
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    seeAllLink: {
        color: '#0077B6',
        fontSize: 14,
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    gridList: {
        flex: 1,
    },
    gridContainer: {
        paddingHorizontal: 10,
        paddingBottom: 100, // เผื่อพื้นที่ด้านล่างสำหรับ FAB button
    },

    // Message Bubble Styles
    messageBubble: {
        position: 'absolute',
        top: -30,
        width: '100%', // เปลี่ยนเป็นเต็มความกว้าง
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 6,
        zIndex: 1,
        elevation: 3,
        // ปรับการจัดวางเป็นแนวคอลัมน์
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // เพิ่มเงา
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 0.5,
        borderColor: '#F0F0F0',
    },
    messageText: {
        fontSize: 10,
        color: '#333333',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 12,
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    arrowContainer: {
        position: 'absolute',
        bottom: -8,
        left: '20%', // ปรับตำแหน่งให้มองเห็นได้ชัดเจนยิ่งขึ้น
        width: 16,
        height: 8,
        overflow: 'hidden',
    },
    messageArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 0,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFFFFF',
    },
    avatarRainbowBorder: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        // ไม่สามารถใช้ linear-gradient ใน StyleSheet โดยตรงได้ 
        // จะใช้ borderWidth และ borderColor ที่มีสีสันสดใสแทน
        // borderWidth: 4,
        // borderColor: '#FF3366', // สีสันสดใส
        // เพิ่มเงาเพื่อให้ดูมีมิติและสีสันมากขึ้น
        shadowColor: '#FF9900',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },

    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 4,
        // ลบ marginBottom ถ้าอยู่ใน avatarRainbowBorder
        margin: 0,
    },

    avatar: {
        width: '100%',
        height: '100%',
    },
    personItem: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        maxWidth: '25%', // 4 columns
        position: 'relative',
        paddingTop: 35, // เพิ่มขึ้นเล็กน้อยเพื่อรองรับ bubble ที่ใหญ่ขึ้น
    },
    loadMoreButton: {
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
    },
    loadMoreText: {
        color: '#0077B6',
        fontWeight: 'bold',
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    loadingIndicator: {
        padding: 15,
    },
    personName: {
        fontSize: 12,
        color: '#333333',
        marginTop: 4,
        textAlign: 'center',
        fontFamily: "KanitLight", // เพิ่ม font family
    },
    playgroundHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    playgroundTitle: {
        fontSize: 18,
        fontFamily: 'KanitMedium',
        color: '#01363E',
    },

});