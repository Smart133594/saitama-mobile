import Background from '@assets/images/background.png';
import Logo from '@assets/images/logo1.png';
import { BaseStyle } from "@config";
import React, { Component } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            try {
                if (this.props?.auth?.login?.success == true)
                    return this.props.navigation.navigate("Main");
                else
                    return this.props.navigation.navigate("Auth");
            } catch (err) {
            }
        }, 1000);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <SafeAreaView
                forceInset={{ top: "always" }}
            >
                <View style={{ alignItems: "center", flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
                    <Image source={Background} style={{ position: 'absolute' }} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                        <Image source={Logo} />
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