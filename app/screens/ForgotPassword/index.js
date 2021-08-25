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
import {
    BallIndicator
} from 'react-native-indicators';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error_list, setErrorList] = useState({});
    const [error_message, setErrorMessage] = useState("");
    const [is_valid, setIsValid] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );
    const init = () => {
        setEmail("");
        setErrorMessage("");
        setIsValid(false);
        setErrorList({})
    }
    const requestOTP = () => {
        setErrorList({})
        if (email == "") {
            setErrorMessage("");
            setIsValid(false);
            setErrorList({ email: true });
            return;
        }
        if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase())) {
            setIsValid(false)
            setErrorMessage("");
            setErrorMessage("Please enter valid email address");
            return;
        }
        var data = {
            email: email
        }
        setLoading(true);
        apiActions.forgot_password(data)
            .then(async res => {
                console.log(res);
                setTimeout(() => {
                    try {
                        if (res?.Response_Code == '200') {
                            props.navigation.navigate('RecoverPassword', { email: email });
                        } else {
                            setIsValid(true)
                        }
                        setLoading(false);
                    } catch (err) {
                    }
                }, 1000);

            })
            .catch(err => {
                console.log(err)
                Toast.show("Network connection issue.");
                console.log(err);
                setLoading(false);
            })
    }

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
                        <Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Sending code.</Text>
                    </View>
                </View>
            }
            <KeyboardAvoidingView behavior="position">
                <ScrollView >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                        <Image source={Logo} style={{ height: 150, resizeMode: 'contain' }} />
                    </View>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 32, fontFamily: 'Nunito-Bold', color: EStyleSheet.value('$fontColor') }}>Forgot my password</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 25 }}>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white', marginTop: 10 }}>Please insert here the email that you registered with </Text>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white' }}>
                                us in order to send to you the instructions to recover</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white' }}>
                                your password</Text>
                        </View>
                        <View style={[BaseStyle.inputView]}>
                            <CustomAnimatedInput
                                style={{ flex: 1, backgroundColor: 'transparent' }}
                                value={email}
                                onChangeText={email => setEmail(email)}
                                placeholder={'Email'}
                                type="email"
                                status={email ? "update" : "new"}
                                errorText={error_list?.email}
                                icon="email"
                            />
                        </View>
                        {!!error_message && !is_valid &&
                            <View style={{
                                backgroundColor: EStyleSheet.value('$errorBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$errorBorderColor'),
                                borderRadius: 8,
                                marginTop: 15,
                                padding: 10,
                                width: '100%'
                            }}>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor'), textAlign: 'center' }}>{error_message}</Text>
                            </View>
                        }
                        {is_valid &&
                            <View style={{
                                backgroundColor: EStyleSheet.value('$errorBkColor'),
                                opacity: 0.4,
                                borderWidth: 2,
                                borderColor: EStyleSheet.value('$errorBorderColor'),
                                borderRadius: 8,
                                padding: 10,
                                marginTop: 20,
                                width: '100%'
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor'), textAlign: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', fontSize: 12 }}>
                                        The user is not registered. Would you want to register a new account?
                                        <Text onPress={() => props.navigation.navigate('SignUp')} style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$btnColor'), fontSize: 12 }}> Click Here</Text>
                                    </Text>
                                </View>
                            </View>
                        }
                        <View style={{ width: "100%", marginTop: 25 }}>
                            <Button
                                full
                                onPress={() => {
                                    if (!loading) {
                                        requestOTP()
                                    }
                                }}
                            >
                                Send code
                            </Button>
                        </View>
                        <View style={{ width: "100%", marginTop: 20, justifyContent: 'center', flexDirection: 'row' }}>
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

export default ForgotPassword;