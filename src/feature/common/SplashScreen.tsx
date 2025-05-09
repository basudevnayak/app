import React, { useEffect, useRef } from "react";
import { View,Animated} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SplashStyle } from "../../utils/styles";
import { SplashScreenNavigationProp } from "../../navigation/types";



const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.navigate("Dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={SplashStyle.container}>
      <Animated.Image
        source={require("../../../assets/splash.png")}
        style={[
          SplashStyle.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[SplashStyle.title, { opacity: fadeAnim }]}>
        Welcome to Home Automation
      </Animated.Text>
      <Animated.Text style={[SplashStyle.tagline, { opacity: fadeAnim }]}>
        Smart. Simple. Seamless.
      </Animated.Text>
    </View>
  );
};



export default SplashScreen;
