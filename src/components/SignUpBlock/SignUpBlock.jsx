import React from 'react';
import {useFormValue} from "../../hooks/useFormvalue";
import {Text, StyleSheet, View} from "react-native";

import AuthHeader from "../global/authHeader/authHeader";
import PhoneNumberForm from "../global/PhoneNumberForm/PhoneNumberForm";
import ErrorText from "../layout/ErrorText/ErrorText";

import glbStyles from "../../styles/glbStyles";
import {
    containerPadding,
} from "../../styles/styleVariables";

import {styleFuncs} from "../../styles/styleFunctions";

function SignUpBlock() {
    const error = null // useSelector(state => state.signUp)
    const {formData,onChange} = useFormValue({
        phone: '',
    },error,clearSignUpError)

    const onSubmit = () => {
        // dispatch(signUp(formData))
    }
    return (
        <>
            <View style={glbStyles.container}>
                <AuthHeader
                    curPage={'Enter phone number'}
                    onDone={onSubmit}
                />
                <Text style={styles.title}>
                    Please Confirm your country code and {'\n'}
                    enter your phone number
                </Text>

            <PhoneNumberForm
                onChange={(value) => onChange(value,'phone',true)}
                onSubmit={onSubmit}
            />
                {error ?
                    <ErrorText
                    styleProp={styles.errorText}
                    error={!!(error)}
                >Your phone number is invalid or not found.</ErrorText>
                : null
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        ...styleFuncs.setFont([15,16,17]),
        marginVertical: 20,
        textAlign: 'center',
        marginHorizontal: containerPadding
    },
    errorText: {
        marginLeft: 33
    }

})

export default SignUpBlock;
