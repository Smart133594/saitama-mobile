import { apiActions, actionTypes } from "@actions";
import Logo from '@assets/images/logo.png';
import ImgWelcome from '@assets/images/welcome.png';
import { BaseStyle } from "@config";
import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, View, BackHandler, Alert } from "react-native";
import { connect } from "react-redux";
import RNRestart from 'react-native-restart';

const Welcome = (props) => {
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want logout?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "YES", onPress: () => {
                        let data = {
                            success: false,
                            user: {}
                        };
                        props.dispatch({ type: actionTypes.LOGIN, data });
                        setTimeout(() => {
                            try {
                                RNRestart.Restart();
                            } catch (err) {
                            }
                        }, 500);
                    }
                }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            forceInset={{ top: "always" }}
        >
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Image source={Logo} style={{ height: 120, resizeMode: 'contain', marginTop: 30 }} />
                <Text style={{ fontFamily: 'Nunito-Bold', color: 'white', fontSize: 20, paddingVertical: 20 }}>You are officially a wolf!</Text>
                <Text style={{ fontFamily: 'Nunito-Bold', color: 'white', fontSize: 20 }}>Welcome to Saitama Inu</Text>
                <Text style={{ fontFamily: 'Nunito-Bold', color: 'white', fontSize: 20 }}>wolfpack!</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={ImgWelcome} style={{ width: '120%', resizeMode: 'contain' }} />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);