import React, { useEffect, useRef, useCallback } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useImagesStore, useTouchStore } from '../../store';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab"
import { ArrowLeftIcon } from "@/components/ui/icon"

export function GroupScreen() {

    const setHeader = useTouchStore((state) => state.setHeader);
    const navigation = useNavigation();

    // ...existing code...
    useEffect(() => {
        setHeader(false);
        navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            // e.preventDefault();
            setHeader(true);
            // Prompt the user before leaving the screen 
        })
    }, []);

    return (
        <View style={styles.container}>

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
        height: Dimensions.get('screen').height - 500,
        width: Dimensions.get('screen').width,
    },
});