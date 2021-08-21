import { apiActions } from "@actions";
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseStyle } from "@config";
import { useFocusEffect } from "@react-navigation/native";
import * as Utils from "@utils";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, ScrollView, TouchableOpacity, View, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-simple-toast';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '@assets/images/logo.png';
import styles from "./styles";

const ForgotPassword = (props) => {
    const panelRef = useRef(null);
    const [otpCode, setOtpCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [isVerify, setVerify] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error_list, setErrorList] = useState({});
    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );
    const init = () => {
        setEmail("");
        setPassword("");
        setCPassword("");
        setVerify(false);
        setShowOTP(false);
        setErrorList({})
    }
    const requestOTP = () => {
        if (email == "") {
            Toast.show("Please enter email address", Toast.LONG);
            setErrorList({ email: true });
            return;
        } else if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase())) {
            Toast.show("Please enter valid email address", Toast.LONG);
            return;
        }
        var data = {
            Email_Id: email
        }
        setLoading(true);
        apiActions.forgot_password(data)
            .then(async res => {
                if (res?.Response_Code == '200') {
                    setShowOTP(true);
                    if (panelRef?.current?.state?.isPanelOpened == false) {
                        panelRef?.current?.togglePanel();
                    }
                }
            })
            .catch(err => {
                Toast.show("Network connection issue.");
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    const changePass = () => {
        if (password == "") {
            Toast.show("Please enter password", Toast.LONG);
            setErrorList({ password: true });
            return;
        } else if (!password.match(Utils?.PASSPORT_VALIDATE)) {
            Toast.show('Passwords must contain combination of special characters and numbers including lowercase and uppercase.', Toast.LONG);
            return;
        } else if (cpassword == "") {
            Toast.show("Please enter confirm password", Toast.LONG);
            setErrorList({ cpassword: true });
            return;
        } else if (cpassword != password) {
            Toast.show("Confirm Password must be same as Password", Toast.LONG);
            return;
        }
        setLoading(true);
        var data = {
            "Email_Id": email,
            "Password": password
        }
        console.log(email);
        apiActions.reset_password(data)
            .then((res) => {
                Toast.show(res.UI_Display_Message, Toast.LONG);
                setTimeout(() => {
                    try {
                        props.navigation.goBack();
                    } catch (err) {
                    }
                }, 500);
            })
            .catch(err => {
                Toast.show("Network connection issue.");
                console.log(err);
            })
            .finally(() => {
                setPassword("");
                setCPassword("");
                setEmail("");
                setLoading(false);
            })
    }
    const emailVerification = () => {
        if (otpCode != "") {
            var data = {
                Email_Id: email,
                E_Verification_Code: otpCode
            }
            console.log(data);
            apiActions.email_verification(data)
                .then(async res => {
                    console.log('Email', res);
                    if (res.Response_Code == "404") {
                        Toast.show(res?.UI_Display_Message, Toast.LONG);
                    } else {
                        if (res.Response_Code == '200') {
                            setShowOTP(false);
                            if (panelRef?.current?.state?.isPanelOpened == true) {
                                panelRef?.current?.togglePanel();
                            }
                            setVerify(true);
                        }
                    }
                })
                .catch(err => {
                    Toast.show("Network connection issue.");
                })
                .finally(() => {
                    setOtpCode("");
                })
        } else {
            Toast.show("Please enter OTP code.", Toast.LONG);
        }
    }

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            forceInset={{ top: "always" }}
        >
            <ScrollView >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                    <Image source={Logo} />
                </View>
                <View style={styles.content}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                        <Text style={{ fontSize: 32, fontFamily: 'Nunito-Bold', color: EStyleSheet.value('$fontColor') }}>Forgot my password</Text>
                    </View>
                    <View style={[BaseStyle.inputView]}>
                        <CustomAnimatedInput
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            placeholder={'Email'}
                            type="email"
                            errorText={""}
                            status={email ? "update" : "new"}
                            isError={error_list?.email}
                            icon="email"
                        />
                        <CustomAnimatedInput
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                            value={password}
                            onChangeText={password => {
                                setPassword(password)
                            }}
                            placeholder={'Password'}
                            type="password"
                            status={password ? "update" : "new"}
                            errorText={""}
                            isError={error_list?.password}
                            icon="password"
                        />
                    </View>
                    <View style={{
                        backgroundColor: EStyleSheet.value('$errorBkColor'),
                        opacity: 0.4,
                        borderWidth: 2,
                        borderColor: EStyleSheet.value('$errorBorderColor'),
                        borderRadius: 8,
                        marginTop: 15,
                        padding: 10
                    }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor') }}>The user is not registered. Please try again</Text>
                    </View>
                    <View style={{ width: "100%", marginTop: 15 }}>
                        <Button
                            full
                            loading={loading}
                            onPress={() => {

                            }}
                        >
                            Send code
                        </Button>
                    </View>
                    <View style={{ width: "100%", marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>You already remember?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                            <Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword;