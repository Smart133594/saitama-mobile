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

const ChangePassword = (props) => {
    const { email } = props.route.params;
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error_list, setErrorList] = useState({});
    const [error_message, setErrorMessage] = useState("");
    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );
    const init = () => {
        setErrorMessage("");
        setPassword("");
        setCPassword("");
        setErrorList({})
    }

    const changePass = () => {
        let error = false;
        let errorList = {};
        if (password == "") {
            error = true;
            errorList = { ...errorList, password: true };
        }
        if (cpassword == "") {
            error = true;
            errorList = { ...errorList, cpassword: true };
        }
        if (error) {
            setErrorList(errorList);
            return;
        }
        setErrorList({});
        if (!password.match(Utils?.PASSPORT_VALIDATE)) {
            setErrorMessage('Passwords must contain combination of special characters and numbers including lowercase and uppercase.')
            return;
        }
        if (cpassword != password) {
            setErrorMessage("Confirm Password must be same as Password")
            return;
        }
        setErrorMessage("");
        setLoading(true);
        var data = {
            "email": email,
            "password": password
        }
        apiActions.change_password(data)
            .then((res) => {
                setTimeout(() => {
                    try {
                        setLoading(false);
                        props.navigation.navigate("SignIn", { is_change: true });
                    } catch (err) {
                    }
                }, 1000);
            })
            .catch(err => {
                Toast.show("Network connection issue.");
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
                        <Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Updating user password.</Text>
                    </View>
                </View>
            }
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
                            value={password}
                            onChangeText={password => {
                                setPassword(password)
                            }}
                            placeholder={'New password'}
                            type="password"
                            status={password ? "update" : "new"}
                            errorText={""}
                            isError={error_list?.password}
                            icon="password"
                        />
                        <CustomAnimatedInput
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                            value={cpassword}
                            onChangeText={cpassword => {
                                setCPassword(cpassword)
                            }}
                            placeholder={'Confirm new password'}
                            type="password"
                            status={password ? "update" : "new"}
                            errorText={""}
                            isError={error_list?.password}
                            icon="password"
                        />
                    </View>
                    {!!error_message &&
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
                    <View style={{ width: "100%", marginTop: 25 }}>
                        <Button
                            full
                            onPress={() => {
                                if (!loading) {
                                    changePass()
                                }
                            }}
                        >
                            Update my password
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

export default ChangePassword;