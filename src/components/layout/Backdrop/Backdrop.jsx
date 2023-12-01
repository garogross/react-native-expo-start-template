import React, {useEffect, useState} from 'react';
import {useAnimate} from "../../../hooks/useAnimate";
import {Pressable, Animated} from "react-native";
import {Modal} from "react-native";


import {backdropStyles as styles} from "./backdropStyles";

function Backdrop({children, visible, onClose, fade}) {
    const [backdropShowing, setBackdropShowing] = useState(false)
    const [modalShowing, setModalShowing] = useState(false)
    const animateValue = useAnimate(backdropShowing, 200, false)
    const timOutSec = fade ? 0 : 500
    useEffect(() => {
        if (visible) {
            setModalShowing(true)
            setTimeout(() => setBackdropShowing(true), timOutSec)
        } else {
            setBackdropShowing(false)
            setTimeout(() => setModalShowing(false), timOutSec)
        }
    }, [visible])

    return (
        <>
            <Modal
                animationType={fade ? 'fade' : 'slide'}
                transparent={true}
                visible={modalShowing}
            >
                <Animated.View style={[styles.wrapper,animateValue('backgroundColor',['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.4)'])]}>
                    <Pressable
                        onPress={onClose}
                        style={styles.backdrop}
                    >
                    </Pressable>
                    {children}
                </Animated.View>
            </Modal>
        </>
    );
}

export default Backdrop;
