import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View, StyleSheet} from "react-native";
import * as Localization from 'expo-localization';

import SvgImage from "../../../assets/SvgImage";
import OptionsModal from "../../layout/OptionsModal/OptionsModal";

import {countries} from "../../../constants/constants";
import {arrowRight} from "../../../assets/svg";
import {COLORS, containerPadding} from "../../../styles/styleVariables";
import glbStyles from "../../../styles/glbStyles";
import {styleFuncs} from "../../../styles/styleFunctions";

function PhoneNumberForm({onChange, styleProp, withoutArrow, onSubmit}) {
    const [countriesPopupOpened, setCountriesPopupOpened] = useState(false)
    const [countryCode, setCountryCode] = useState('us')
    const [countryPhoneCode, setCountryPhoneCode] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const phoneInputRef = useRef(null)

    useEffect(() => {
        const getCountry = () => {
            const locale = Localization.locale;
            const countryCode = locale.substring(locale.lastIndexOf('_') + 1);
            const countryIso = countryCode.slice(countryCode.length - 2).toLowerCase()
            const actualCountry = countries.find(item => item.iso2 === countryIso)
            if (actualCountry) setCountryCode(actualCountry.iso2)
        };

        getCountry();
    }, []);


    useEffect(() => {
        onChange(`+${countryPhoneCode}${phoneNumberValue}`)
    }, [phoneNumberValue, countryPhoneCode])


    useEffect(() => {
        if (countryCode) {
            const dialCode = countries.find(item => item.iso2 === countryCode)?.dialCode
            if (countryPhoneCode !== dialCode) setCountryPhoneCode(dialCode)
            setTimeout(() => {
                phoneInputRef.current.focus()
            }, 50)
        }
    }, [countryCode])

    const onPhoneCodeChange = (value) => {
        setCountryPhoneCode(value)
        const selectedCountry = countries.find(item => item?.dialCode === value)
        if (selectedCountry) {
            setCountryCode(selectedCountry.iso2)
        } else {
            setCountryCode('')
        }
    }


    const onOpenCountriesPopup = () => {
        setCountriesPopupOpened(true)
    }

    const onCloseCountriesPopup = () => {
        setCountriesPopupOpened(false)
    }
    let countriesBtnText = ''
    if (countryCode) {
        countriesBtnText = countries.find(item => item.iso2 === countryCode)?.name
    } else countriesBtnText = !countryPhoneCode?.length ? 'Select Country Code' : 'Wrong Country Code'

    return (
        <>

            <View style={[styles.phoneNumberBlock, styleProp]}>
                <Pressable
                    onPress={onOpenCountriesPopup}
                    style={styles.countryBtn}
                >
                    <Text
                        style={styles.countryName}>{countriesBtnText}</Text>
                    {!withoutArrow ?
                        <SvgImage
                            id={arrowRight}
                            width={7}
                            height={13}
                        /> : null}
                </Pressable>
                <View style={styles.inputs}>
                    <Text style={styles.plusText}>+</Text>
                    <TextInput
                        style={[styles.countryCodeInput, styles.input]}
                        placeholderTextColor={COLORS.placeholderColor}
                        maxLength={4}
                        keyboardType={'phone-pad'}
                        value={countryPhoneCode}
                        onChangeText={onPhoneCodeChange}
                    />
                    <TextInput
                        ref={phoneInputRef}
                        style={[styles.phoneNumberInput, styles.input]}
                        placeholderTextColor={COLORS.placeholderColor}
                        placeholder={'Phone number'}
                        keyboardType={'phone-pad'}
                        value={phoneNumberValue}
                        onChangeText={setPhoneNumberValue}
                        onSubmitEditing={onSubmit ? onSubmit : null}
                    />
                </View>
            </View>
            <OptionsModal
                optionsArr={countries.map(({name, iso2}) => {
                    const sliceIndex = name.indexOf(' (') === -1 ?
                        name.length :
                        name.indexOf(' (') + 1

                    return ({
                        name: name.slice(0, sliceIndex),
                        onPress: () => {
                            setCountryCode(iso2)
                        }
                    })
                })}
                onClose={onCloseCountriesPopup}
                visible={countriesPopupOpened}
                styleProp={{height: 500}}
            />
        </>
    );
}

const styles = StyleSheet.create({
    phoneNumberBlock: {
        backgroundColor: COLORS.grey
    },
    countryBtn: {
        ...glbStyles.rowFlexBetween,
        paddingHorizontal: containerPadding,
        paddingVertical: 12
    },
    countryName: {
        ...styleFuncs.setFont([17, 18, 19]),
    },
    inputs: {
        ...glbStyles.greyBorderTop,
        marginHorizontal: containerPadding,
        flexDirection: 'row',

    },
    input: {
        ...styleFuncs.setFont(27, 300),
        paddingTop: 5,
        paddingBottom: 8,
    },
    countryCodeInput: {
        paddingLeft: 16,
        paddingRight: 25,
        borderRightWidth: 0.33,
        borderColor: COLORS.white40(),

    },
    phoneNumberInput: {
        paddingLeft: 17,
        flex: 1
    },
    plusText: {
        ...styleFuncs.setFont(27, 300),
        alignSelf: 'center',
        lineHeight: 30
    }
})

export default PhoneNumberForm;
