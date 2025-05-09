
import { useRef } from "react";
import { Animated, Easing } from "react-native";

 
export const ScalAnim= (scaleAnim:any) => {
  Animated.timing(scaleAnim, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  }).start();
};



    export const FadeAnim= (fadeAnim:any) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    };



  export const Shake = (shakeAnim:any) => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };