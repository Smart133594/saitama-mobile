import { apiActions } from "@actions";
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseConfig, BaseStyle } from "@config";
import * as Utils from "@utils";
import React, { Component, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import Logo from '@assets/images/logo.png';
import Success from '@assets/images/success.png';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import EStyleSheet from 'react-native-extended-stylesheet';

const ActiveAccount = (props) => {
    const { type } = props.route.params;
    console.log(type);
    const [verify_code, setVerifyCode] = useState("");
    const [is_code, setIsCode] = useState(false);
    const checkAccount = () => {

    }
    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            forceInset={{ top: "always" }}
        >
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Image source={Logo} style={{ height: 120, resizeMode: 'contain', marginTop: 80 }} />
                    <View style={{ backgroundColor: 'white', borderRadius: 100, padding: 5, marginTop: 40, backgroundColor: 'white' }}>
                        <Image source={Success} style={{ height: 100, width: 100 }} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white' }}>Congratulations!</Text>
                        <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold', color: 'white' }}>You are registered</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white', marginTop: 10 }}>Please insert here the code that we sent to your</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Light', color: 'white' }}>
                            email in order to activate your account</Text>
                    </View>
                    <OTPInputView style={{ width: '80%', height: 100 }}
                        pinCount={6}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            setVerifyCode(code);
                            setIsCode(true);
                            console.log(`Code is ${code}, you are good to go!`)
                        })} />
                    <View style={{
                        backgroundColor: EStyleSheet.value('$errorBkColor'),
                        opacity: 0.4,
                        borderWidth: 2,
                        borderColor: EStyleSheet.value('$errorBorderColor'),
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 20
                    }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor') }}>The user is not registered. Please try again</Text>
                    </View>
                    <TouchableOpacity onPress={checkAccount} disabled={!is_code} style={{ backgroundColor: EStyleSheet.value(!is_code ? '$disableColor' : '$btnColor'), padding: 10, width: '90%', alignItems: 'center', borderRadius: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Nunito-Bold', color: 'white' }} >Activate account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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