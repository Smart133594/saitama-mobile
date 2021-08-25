import { apiActions, actionTypes } from "@actions";
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseConfig, BaseStyle } from "@config";
import * as Utils from "@utils";
import React, { Component, useEffect, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import Logo from '@assets/images/logo.png';
import Success from '@assets/images/success.png';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import EStyleSheet from 'react-native-extended-stylesheet';
import RNRestart from 'react-native-restart';
import {
    BallIndicator
} from 'react-native-indicators';
const RecoverPassword = (props) => {
    const { email } = props.route.params;
    const [verify_code, setVerifyCode] = useState("");
    const [is_code, setIsCode] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const checkAccount = () => {
        var data = {
            otp_code: verify_code.toLocaleLowerCase(),
            email: email,
        }
        setResending(false);
        setLoading(true);
        apiActions.check_verify(data)
            .then((res) => {
                if (res.Response_Code == "200") {
                    setTimeout(() => {
                        try {
                            setErrorMessage("");
                            setVerifyCode("");
                            setSuccessMessage("");
                            setIsCode(false);
                            setLoading(false);
                            props.navigation.navigate('ChangePassword', { email: email })
                        } catch (err) {
                        }
                    }, 1000);
                } else {
                    setSuccessMessage("");
                    setErrorMessage(res.UI_Display_Message);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    }

    const resendCode = () => {
        if (loading) {
            return;
        }
        var data = {
            email: email,
            type: 1
        }
        setResending(true);
        setLoading(true);
        apiActions.resend_code(data)
            .then((res) => {
                if (res.Response_Code == "200") {
                    console.log(res);
                    setErrorMessage("");
                    setTimeout(() => {
                        try {
                            setSuccessMessage(res.UI_Display_Message);
                            setLoading(false);
                        } catch (err) {
                        }
                    }, 1000);
                } else {
                    setSuccessMessage("");
                    setErrorMessage(res.UI_Display_Message);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!!success_message) {
            setIsCode(false);
            setVerifyCode("");
            let timer = setTimeout(() => {
                try {
                    setSuccessMessage("");
                    setLoading(false);
                } catch (err) {
                }
            }, 10000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [success_message])

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            forceInset={{ top: "always" }}
        >
            {loading &&
                <View style={{ position: 'absolute', backgroundColor: 'white', opacity: 0.9, height: Utils.SCREEN.HEIGHT, width: Utils.SCREEN.WIDTH, zIndex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 80 }}>
                            <BallIndicator color={EStyleSheet.value('$btnColor')} size={50} />
                        </View>
                        {!resending ?
                            <>
                                <Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Validating code.</Text>
                                <Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Activating account.</Text>
                            </>
                            :
                            <Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Resending activation code.</Text>
                        }

                    </View>
                </View>
            }
            <KeyboardAvoidingView behavior={Platform.OS == 'android' ? "height" : "position"}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={Logo} style={{ height: 150, resizeMode: 'contain', marginTop: 120 }} />
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white', paddingVertical: 25 }}>Recover password code</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white', marginTop: 10 }}>Please insert here the code that we sent to your</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white' }}>
                                email in order to recover your password</Text>
                        </View>
                        <OTPInputView style={{ width: '80%', height: 100 }}
                            pinCount={6}
                            code={verify_code}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeChanged={(code) => setVerifyCode(code)}
                            onCodeFilled={(code => {
                                setVerifyCode(code);
                                setIsCode(true);
                                console.log(`Code is ${code}, you are good to go!`)
                            })} />

                        {!!error_message &&
                            <View style={{
                                width: '90%',
                                backgroundColor: EStyleSheet.value('$errorBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$errorBorderColor'),
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 20,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor'), textAlign: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', fontSize: 12 }}>
                                        The code is not correct. Would you want to resend it?
                                        <Text onPress={resendCode} style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$btnColor'), fontSize: 12 }}> Click Here</Text>
                                    </Text>
                                </View>
                            </View>
                        }
                        {!!success_message &&
                            <View style={{
                                width: '90%',
                                backgroundColor: EStyleSheet.value('$successBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$successBorderColor'),
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 20,
                            }}>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$successColor'), textAlign: 'center' }}>{success_message}</Text>
                            </View>
                        }
                        <TouchableOpacity onPress={checkAccount} disabled={!is_code} style={{ backgroundColor: EStyleSheet.value(!is_code ? '$disableColor' : '$btnColor'), padding: 10, width: '90%', alignItems: 'center', borderRadius: 50 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Nunito-Bold', color: 'white' }} >Go to recover my password</Text>
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: 15, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>You already remember?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                                <Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}> Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);