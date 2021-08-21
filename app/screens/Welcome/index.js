import React, { Component, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { BaseConfig, BaseStyle } from "@config";
import Logo from '@assets/images/logo.png';
import ImgWelcome from '@assets/images/welcome.png';

const Welcome = () => {
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