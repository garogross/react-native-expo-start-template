import React from 'react';
import {StyleSheet,View} from "react-native";
import glbStyles from "../../../styles/glbStyles";

function MainContainer({styleProp, children}) {
    return (
        <View style={styles.view}>
            <View style={{minHeight: '100%'}} >
                <View style={[glbStyles.main, styleProp]}>
                    {children}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    }
})

export default MainContainer;
