import {useEffect, useRef} from "react";
import {Animated} from "react-native";

export const useAnimate = (state,duration = 200,useNativeDriver = true) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: state ? 1 : 0,
            duration,
            useNativeDriver,
        }).start();

    }, [state])


    const animateStyle = (prop, outputRange) => {
        return  {
                [prop]: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: outputRange || [0, 1]
                },)
            }

    }

    return animateStyle


}