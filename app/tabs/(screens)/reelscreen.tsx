import React, { useEffect, useRef, useCallback } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useImagesStore, useTouchStore } from '../../store';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { ArrowLeftIcon } from "@/components/ui/icon"

export function ReelsScreen() {


    const setHeader = useTouchStore((state) => state.setHeader);
    // Define the type for your route params
    type ReelsScreenRouteParams = {
        index?: number;
    };


    const navigation = useNavigation();
    const listRef = useRef<FlatList<any>>(null);
    const { params } = useRoute<RouteProp<Record<string, ReelsScreenRouteParams>, string>>();

    const images = useImagesStore((state) => state.images);

    const renderItem = useCallback(
        ({ item }: { item: any }) => {
            return <Image source={{ uri: item.imageUrl }} style={styles.image} />;
        },
        []
    );
    // ...existing code...
    useEffect(() => {
        setHeader(false);
        if (params?.index !== undefined && params.index >= 0) {
            listRef.current?.scrollToIndex({ index: params.index, animated: false });
        }
        navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            // e.preventDefault();
            setHeader(true);
            // Prompt the user before leaving the screen 
        })
    }, [params?.index]);
    // ...existing code...


    // const handleBackPress = useCallback(() => {
    //     navigation.goBack();
    //     setHeader(true);
    // }, []);




    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                pagingEnabled
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                style={styles.container}
                data={images}
                renderItem={renderItem}
                getItemLayout={(data, index) => (
                    {
                        length: Dimensions.get('screen').height - 500,
                        offset: Dimensions.get('screen').width * index,
                        index
                    }
                )}
            />


            {/* <Fab
                onPress={() => { handleBackPress() }}
                style={{ backgroundColor: "#9FFF1A" }}
                size="md"
                placement="top left"
                isHovered={false}
                isDisabled={false}
                isPressed={true}
            >
                <FabIcon as={ArrowLeftIcon} color='#000' />
            </Fab> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000',
    },
    contentContainer: {
        gap: 10,
    },
    image: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
});