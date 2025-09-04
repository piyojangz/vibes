import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useImagesStore, useTouchStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { AddIcon,ChevronRightIcon } from "@/components/ui/icon"
export function CameraCaptureScreen() {

    const setHeader = useTouchStore((state) => state.setHeader);

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    const navigation = useNavigation();

    useEffect(() => {
        setHeader(false);

        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setHeader(true);
        });

        return unsubscribe;
    }, [navigation, setHeader]);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Photo captured:', photo.uri);
            // TODO: Navigate to a preview screen or upload the photo
            navigation.goBack();
        }
    };

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
                    <Text>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.captureOuter} onPress={takePicture}>
                        <View style={styles.captureInner} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        justifyContent: 'center',
    },
    captureOuter: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(159, 255, 26, 0.5)',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#9FFF1A',
    },
    permissionButton: {
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    }
});