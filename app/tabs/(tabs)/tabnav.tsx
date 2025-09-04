import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { useTouchStore } from '../../store';
import { Home } from '../(screens)/home'
import { ReelsScreen } from '../(screens)/reelscreen'
import { GroupScreen } from '../(screens)/groupscreen'
import { CameraCaptureScreen } from '../(screens)/cameracapturescreen'
import { PlaygroundScreen } from '../(screens)/playgroundscreen';

const Stack = createStackNavigator();

const cardStyleInterpolator = (x: number, y: number): StackCardStyleInterpolator => ({
  current,
  layouts: { screen },
}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              x - screen.width / 2,
              0,
            ],
          }),
        },
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              y - screen.height / 2,
              0,
            ],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              0,
              1,
            ],
          }),
        },
      ],
    },
  };
};
export default function TabNav() {
  const touchX = useTouchStore(state => state.x);
  const touchY = useTouchStore(state => state.y);
  const isOverRideStackAnimations = useTouchStore(state => state.isOverRideStackAnimations);

  const screenOptions = useMemo(() => {
    console.log('screenOptions', touchX, touchY, isOverRideStackAnimations);
    if (isOverRideStackAnimations) {
      return {};
    }
    return { cardStyleInterpolator: cardStyleInterpolator(touchX, touchY) };
  }, [touchX, touchY]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <NavigationContainer> */}
      <Stack.Navigator screenOptions={screenOptions} >
        {/* <Stack.Navigator   > */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="ReelsScreen" component={ReelsScreen}
          options={{
            title: 'Ratch Hour',
          }}
        />
        <Stack.Screen name="GroupScreen" component={GroupScreen}
          options={{
            title: 'Ratch Hour',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen name="CameraCaptureScreen" component={CameraCaptureScreen}
          options={{
            animation: 'fade_from_bottom',
            cardStyleInterpolator: undefined,
            animationTypeForReplace: 'pop',
            // headerShown: false
          }}
        />

        <Stack.Screen name="PlaygroundScreen" component={PlaygroundScreen}
          options={{
            animation: 'slide_from_right',
            cardStyleInterpolator: undefined,
            animationTypeForReplace: 'pop',
            headerShown: false, 
          }}
        />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
