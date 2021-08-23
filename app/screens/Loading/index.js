import { BaseStyle } from "@config";
import React, { Component } from "react";
import { Image, SafeAreaView, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {
    BallIndicator
} from 'react-native-indicators';
import { connect } from "react-redux";
class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            try {
                if (this.props?.auth?.login?.success == false)
                    return this.props.navigation.navigate("Auth");
                else
                    return this.props.navigation.navigate("Main");
            } catch (err) {
            }
        }, 1000);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView]}
                forceInset={{ top: "always" }}
            >
                <View style={{ alignItems: "center", flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                        <BallIndicator color={EStyleSheet.value('$btnColor')} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);