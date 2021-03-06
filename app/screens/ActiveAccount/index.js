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
const ActiveAccount = (props) => {
    const { type } = props.route.params;
    const user_details = props.auth.login.user;
    const [verify_code, setVerifyCode] = useState("");
    const [is_code, setIsCode] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const checkAccount = () => {
        var data = {
            otp_code: verify_code.toLocaleLowerCase(),
            email: user_details.email,
        }
        setResending(false);
        setLoading(true);
        apiActions.check_verify(data)
            .then((res) => {
                if (res.Response_Code == "200") {
                    let data = {
                        success: true,
                        user: res.User
                    };
                    props.dispatch({ type: actionTypes.LOGIN, data });
                    setTimeout(() => {
                        try {
                            setErrorMessage("");
                            setVerifyCode("");
                            setSuccessMessage("");
                            setIsCode(false);
                            setLoading(false);
                            RNRestart.Restart();
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
            email: user_details.email,
            type: 0
        }
        setResending(true);
        setLoading(true);
        apiActions.resend_code(data)
            .then((res) => {
                if (res.Response_Code == "200") {
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
                        <Image source={Logo} style={{ height: 120, resizeMode: 'contain', marginTop: 60 }} />
                        <View style={{ backgroundColor: 'white', borderRadius: 100, padding: 5, marginTop: 20, backgroundColor: 'white' }}>
                            <Image source={Success} style={{ height: 100, width: 100 }} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            {type == 0 &&
                                <>
                                    <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white' }}>Congratulations!</Text>
                                    <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white' }}>You are registered</Text>
                                </>
                            }
                            {type == 1 &&
                                <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white' }}>Activation code</Text>
                            }
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white', marginTop: 10 }}>Please insert here the code that we sent to your</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white' }}>
                                email in order to activate your account</Text>
                        </View>
                        <OTPInputView style={{ width: '80%', height: 100 }}
                            pinCount={6}
                            autoFocusOnLoad
                            code={verify_code}
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
                                backgroundColor: EStyleSheet.value('$errorBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$errorBorderColor'),
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 20,
                                marginHorizontal: 10,
                                width: '90%'
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor'), textAlign: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', fontSize: 12 }}>
                                        The code is not correct. Would you want to resend the activation code?
                                        <Text onPress={resendCode} style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$btnColor'), fontSize: 12 }}> Click Here</Text>
                                    </Text>
                                </View>
                            </View>
                        }
                        {!!success_message &&
                            <View style={{
                                backgroundColor: EStyleSheet.value('$successBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$successBorderColor'),
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 20,
                                marginHorizontal: 10,
                                width: '90%'
                            }}>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$successColor'), textAlign: 'center' }}>{success_message}</Text>
                            </View>
                        }
                        <TouchableOpacity onPress={checkAccount} disabled={!is_code} style={{ backgroundColor: EStyleSheet.value(!is_code ? '$disableColor' : '$btnColor'), padding: 10, width: '90%', alignItems: 'center', borderRadius: 50 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Nunito-Bold', color: 'white' }} >Activate account</Text>
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginTop: 20, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Already have an account?</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAccount);