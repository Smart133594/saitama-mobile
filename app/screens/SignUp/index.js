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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import styles from "./styles";
import Logo from '@assets/images/logo.png';
import CheckBox from '@react-native-community/checkbox';


class SignUp extends Component {
	constructor(props) {
		super(props);
		this.initState = {
			loading: false,
			fname: BaseConfig.DEVELOP_MEDE ? "test" : '',
			lname: '',
			email: BaseConfig.DEVELOP_MEDE ? "olaguivelgabriel20@gmail.com" : '',
			password: BaseConfig.DEVELOP_MEDE ? "Test12345" : '',
			cpassword: BaseConfig.DEVELOP_MEDE ? "Test12345" : '',
			success: {
				fname: true,
				lname: true,
				email: true,
				phone: true,
				password: true,
				cpassword: true
			},
			phone: BaseConfig.DEVELOP_MEDE ? "89777567619" : '',
			formattedPhone: "",
			callingCode: "91",
			validPhone: false,
			countryCode: "IN",
			showPass: true,
			showConfirmPass: true,
			showOtp: false,
			isEmail: true,
			loginType: 0,
			error_list: {},
			is_terms: false
		};
		this.state = this.initState;
	}
	componentDidMount() {
		
	}

	componentWillUnmount() {
	}

	onSignIn() {
		this.setState(this.initState);
		return this.props.navigation.navigate("SignIn");
	}

	onSingUp() {
		this.props.navigation.navigate('ActiveAccount');
		return;
		const { navigation } = this.props;
		const { loading, fname, lname, email, password, cpassword, error_list, phone, formattedPhone, callingCode } = this.state;
		let error = false;
		let errorList = {};
		if (fname == "") {
			errorList = { ...errorList, fname: true };
			error = true;
		}
		if (email == "") {
			errorList = { ...errorList, email: true };
			error = true;
		}
		if (phone == "") {
			errorList = { ...errorList, phone: true };
			error = true;
		}
		if (password == "") {
			errorList = { ...errorList, password: true };
			error = true;
		}
		if (cpassword == "") {
			errorList = { ...errorList, cpassword: true };
			error = true;
		}
		if (error) {
			this.setState({ error_list: errorList });
			Toast.show("Please enter details correctly.", Toast.LONG);
			return;
		}
		if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase())) {
			Toast.show("Please enter valid email address", Toast.LONG);
			return;
		}
		if (phone.toString().length < 10 || phone.toString().length > 11) {
			Toast.show("Please enter valid phone number", Toast.LONG);
			return;
		}
		if (!password.match(Utils?.PASSPORT_VALIDATE)) {
			Toast.show('Passwords must contain combination of special characters and numbers including lowercase and uppercase.', Toast.LONG);
			return;
		}
		if (cpassword != password) {
			Toast.show("Confirm Password must be same as Password", Toast.LONG);
			return;
		}
		let model = {
			Email_Id: email,
			Mobile_Number: '+' + callingCode + ' ' + phone,
			Password: password,
			User_Type: "USER",
		}
		this.setState(
			{
				loading: true,
			},
			() => {
				apiActions.registration(model)
					.then(async response => {
						console.log(response)
						if (response?.Response_Status == "Success") {
							this.setState({ ...this.initState });
							// return this.navigation.goBack();
							this.setState({ showOtp: true })
						} else {
							Toast.show(response?.UI_Display_Message, Toast.LONG);
						}
					})
					.catch(err => {
						Toast.show("Network connection issue.");
					})
					.finally(
						() => this.setState({ loading: false })
					)
			}
		);
	}

	render() {
		const { loading, fname, lname, email, password, cpassword, countryCode, phone, callingCode, error_list, showOtp, is_terms } = this.state;
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
							<Text style={{ fontSize: 32, fontFamily: 'Nunito-Bold', color: EStyleSheet.value('$fontColor') }}>Get Started</Text>
						</View>
						<View style={[BaseStyle.inputView]}>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={fname}
								onChangeText={fname => {
									this.setState({ fname })
								}}
								placeholder={'First name'}
								errorText={""}
								status={fname ? "update" : "new"}
								isError={error_list?.fname}
								icon="first"
							/>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={fname}
								onChangeText={fname => {
									this.setState({ fname })
								}}
								placeholder={'Last name'}
								errorText={""}
								status={fname ? "update" : "new"}
								isError={error_list?.fname}
								icon="last"
							/>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={email}
								onChangeText={email => {
									this.setState({ email })
								}}
								placeholder={'Email Address'}
								type="email"
								status={email ? "update" : "new"}
								errorText={""}
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
								status={password ? "update" : "new"}
								type="password"
								errorText={""}
								isError={error_list?.password}
								icon="password"
							/>
							<CustomAnimatedInput
								style={{ flex: 1, backgroundColor: 'transparent' }}
								value={cpassword}
								onChangeText={cpassword => {
									this.setState({ cpassword })
								}}
								placeholder={'Confirm Password'}
								status={cpassword ? "update" : "new"}
								type="password"
								errorText={""}
								isError={error_list?.cpassword}
								icon="password"
							/>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 20 }}>
							<CheckBox
								disabled={false}
								value={is_terms}
								onValueChange={(value) => this.setState({ is_terms: value })}
								tintColors={{ true: "#ffffff", false: "#ffffff" }}
							/>
							<View style={{ flexDirection: 'column' }}>
								<Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>I agree to the</Text>
								<Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Saitama Inu Terms of Use and Privacy Policy</Text>
							</View>
						</View>
						<View style={{ width: "100%", marginTop: 10 }}>
							<Button
								full
								loading={loading}
								onPress={() => {
									if (!loading)
										this.onSingUp();
								}}
							>
								Create account
							</Button>
						</View>
						<View style={{ width: "100%", marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
							<Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Already a Customer?</Text>
							<TouchableOpacity onPress={() => this.onSignIn()}>
								<Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}> Log In</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);