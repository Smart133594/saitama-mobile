import { apiActions } from "@actions";
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseConfig, BaseStyle } from "@config";
import * as Utils from "@utils";
import React, { Component } from "react";
import { BackHandler, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-simple-toast';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import styles from "./styles";
import IcMail from '@assets/images/mail.png';
import IcLock from '@assets/images/lock.png';
import Logo from '@assets/images/logo.png';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			email: BaseConfig.DEVELOP_MEDE ? "olaguivelgabriel20@gmail.com" : '',
			password: BaseConfig.DEVELOP_MEDE ? "Test12345" : '',
			error_list: {},
			error_message: ""
		};
	}
	componentDidMount() {

	}

	componentWillUnmount() {
	}
	onLogin() {
		let { email, password } = this.state;
		let error = false;
		let errorList = {};
		if (email == "") {
			errorList = { ...errorList, email: true };
			error = true;
		}
		if (password == "") {
			errorList = { ...errorList, password: true };
			error = true;
		}
		if (error) {
			this.setState({ error_list: errorList });
			return;
		} else {
			this.setState({ error_list: {} })
		}
		if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase())) {
			this.setState({ error_message: "Please enter valid email address." })
			return;
		} else {
			this.setState({ error_message: "" })
		}
		let model = {
			Email_Id: email,
			Password: password,
			Email_OTP_Required: "1",
			Is_OTP_Verification_Required: "1"
		}
		this.setState({
			loading: true
		}, () => {
			apiActions.login(model)
				.then(async response => {
					console.log(response);
					if (response.Response_Code == '200') {
					} else {
						Toast.show('Please enter your username or password correctly.', Toast.LONG);
					}
				})
				.catch(err => {
					Toast.show("Network connection issue.");
				})
				.finally(
					() => this.setState({ loading: false })
				)
		})
	}

	onSignUp() {
		this.setState({ email: "", password: "" });
		return this.props.navigation.navigate("SignUp");
	}
	render() {
		const { email, password, loading, error_list, error_message } = this.state;
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
							<Text style={{ fontSize: 32, fontFamily: 'Nunito-Bold', color: EStyleSheet.value('$fontColor') }}>Log In</Text>
						</View>
						<View style={[BaseStyle.inputView]}>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={email}
								onChangeText={email => this.setState({ email })}
								placeholder={'Email'}
								type="email"
								status={email ? "update" : "new"}
								errorText={error_list?.email}
								icon="email"
							/>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={password}
								onChangeText={password => {
									this.setState({ password })
								}}
								placeholder={'Password'}
								type="password"
								status={password ? "update" : "new"}
								errorText={error_list?.password}
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
								padding: 10
							}}>
								<Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor') }}>{error_message}</Text>
							</View>
						}
						<TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
							this.setState({ email: "", password: "" })
							this.props.navigation.navigate('ForgotPassword')
						}}>
							<Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Forgot password?</Text>
						</TouchableOpacity>
						<View style={{ width: "100%", marginTop: 15 }}>
							<Button
								full
								loading={loading}
								onPress={() => {
									if (!loading)
										this.onLogin();
								}}
							>
								Log In
							</Button>
						</View>
						<View style={{ width: "100%", marginTop: 15, justifyContent: 'center', flexDirection: 'row' }}>
							<Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Not account yet? </Text>
							<TouchableOpacity onPress={() => this.onSignUp()}>
								<Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Register</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
