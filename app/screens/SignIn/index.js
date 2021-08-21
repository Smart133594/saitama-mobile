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
			success: {
				email: true,
				password: true
			},
			phone: BaseConfig.DEVELOP_MEDE ? "7416809023" : '',
			userInfo: null,
			showPass: true,
			showOtp: false,
			isEmail: true,
			loginType: 0,
			countryCode: "IN",
			callingCode: "91",
			error_list: {}
		};
	}
	componentDidMount() {
		
	}

	componentWillUnmount() {
	}
	onLogin() {
		this.props.navigation.navigate('Welcome');
		return;
		let self = this;
		let { email, password, success, isEmail, phone, callingCode } = this.state;
		if (email == "" && isEmail && password == "") {
			Toast.show("Email and Password details are required.", Toast.LONG);
			this.setState({ error_list: { email: true, password: true, } })
			return;
		}
		if (email == "" && isEmail) {
			// this.setState({ success: { ...success, email: false } });
			Toast.show("Please enter email address", Toast.LONG);
			this.setState({ error_list: { email: true } })
			return;
		} else if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase()) && isEmail) {
			Toast.show("Please enter valid email address", Toast.LONG);
			return;
		} else if (phone == "" && isEmail == false) {
			// this.setState({ success: { ...success, email: false } });
			Toast.show("Please enter phone number", Toast.LONG);
			this.setState({ error_list: { phone: true } })
			return;
		} else if ((phone.toString().length < 10 || phone.toString().length > 11) && isEmail == false) {
			Toast.show("Please enter valid phone number", Toast.LONG);
			return;
		} else if (password == "" && isEmail) {
			// this.setState({ success: { ...success, password: false } });
			Toast.show("Please enter password", Toast.LONG);
			this.setState({ error_list: { password: true } })
			return;
		}
		if (isEmail == false) {
			self.setState({ loginType: 1 })
			let model = {
				Mobile: '+' + callingCode + " " + phone,
			}
			this.setState({
				loading: true
			}, () => {
				apiActions.mobile_otp(model)
					.then(async response => {
						console.log(response)
						if (response?.Response_Code == '404') {
							Toast.show(response.UI_Display_Message, Toast.LONG);
						} else {
							self.setState({ showOtp: true })
							this.current.togglePanel();
						}
					})
					.catch(err => {
						Toast.show("Network connection issue.");
					})
					.finally(
						() => this.setState({ loading: false })
					)
			})
		} else {
			self.setState({ loginType: 0 })
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
							self.setState({ showOtp: true })
							this.current.togglePanel();
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
	}

	onSignUp() {
		this.setState({ isEmail: true, email: "", password: "" });
		return this.props.navigation.navigate("SignUp");
	}
	render() {
		const { email, password, loading, showOtp, phone, isEmail, loginType, error_list } = this.state;
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
								errorText={""}
								status={email ? "update" : "new"}
								isError={error_list?.email}
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
