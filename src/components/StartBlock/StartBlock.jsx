import React from 'react';
import MainContainer from "../layout/MainContainer/MainContainer";
import glbStyles from "../../styles/glbStyles";
import {Text} from "react-native";

function StartBlock() {

    return (
        <MainContainer
            styleProp={glbStyles.centeredColumnFlex}
        >
        <Text>startScreen</Text>
        </MainContainer>
    );
}



export default StartBlock;
