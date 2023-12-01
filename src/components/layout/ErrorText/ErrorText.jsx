import React from 'react';
import {StyleSheet,Animated} from "react-native";
import {COLORS} from "../../../styles/styleVariables";
import {useAnimate} from "../../../hooks/useAnimate";
import {styleFuncs} from "../../../styles/styleFunctions";

function ErrorText({styleProp,error,children}) {
    const animateStyle = useAnimate(error)

    return (
        <Animated.Text style={[styles.text,styleProp,animateStyle('opacity')]}>{children}</Animated.Text>
    );
}

const styles = StyleSheet.create({
    text: {
        ...styleFuncs.setFont(13,400,COLORS.redLight),
    }
})

export default ErrorText;
