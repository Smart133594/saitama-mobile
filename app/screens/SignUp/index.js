import { apiActions, actionTypes } from "@actions";
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseConfig, BaseStyle } from "@config";
import * as Utils from "@utils";
import React, { Component } from "react";
import { BackHandler, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, KeyboardAvoidingView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-simple-toast';
import { connect } from "react-redux";
import styles from "./styles";
import Logo from '@assets/images/logo.png';
import CheckBox from '@react-native-community/checkbox';
import {
	BallIndicator
} from 'react-native-indicators';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.initState = {
			loading: false,
			fname: BaseConfig.DEVELOP_MODE ? 'fname' : '',
			lname: BaseConfig.DEVELOP_MODE ? 'lname' : "",
			email: BaseConfig.DEVELOP_MODE ? 'olaguivelgabriel20@gmail.com' : '',
			password: BaseConfig.DEVELOP_MODE ? 'Test@123' : '',
			cpassword: BaseConfig.DEVELOP_MODE ? 'Test@123' : '',
			showPass: true,
			showConfirmPass: true,
			isEmail: true,
			loginType: 0,
			error_list: {},
			is_terms: false,
			error_message: ""
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
		const { fname, lname, email, password, cpassword, is_terms } = this.state;
		let error = false;
		let errorList = {};
		if (fname == "") {
			errorList = { ...errorList, fname: true };
			error = true;
		}
		if (lname == "") {
			errorList = { ...errorList, lname: true };
			error = true;
		}
		if (email == "") {
			errorList = { ...errorList, email: true };
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
		if (is_terms == false) {
			errorList = { ...errorList, is_terms: true };
			error = true;
		}
		if (error) {
			this.setState({ error_list: errorList });
			return;
		}
		this.setState({ error_list: {} })
		if (!Utils.EMAIL_VALIDATE.test((email).toLowerCase())) {
			this.setState({ error_message: "Please enter valid email address" })
			return;
		}
		if (!password.match(Utils?.PASSPORT_VALIDATE)) {
			this.setState({ error_message: 'Passwords must contain combination of special characters and numbers including lowercase and uppercase.' })
			return;
		}
		if (cpassword != password) {
			this.setState({ error_message: "Confirm Password must be same as Password" })
			return;
		}
		this.setState({ error_message: "" })
		let model = {
			email: email,
			password: password,
			fname: fname,
			lname: lname
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
							let data = {
								success: false,
								user: response.User
							};
							this.props.dispatch({ type: actionTypes.LOGIN, data });
							setTimeout(() => {
								try {
									this.setState({ loading: false })
									this.setState({ ...this.initState });
									return this.props.navigation.navigate("ActiveAccount", { type: 0 });
								} catch (err) {
								}
							}, 1000);
						} else {
							setTimeout(() => {
								try {
									this.setState({ error_message: response?.UI_Display_Message })
									this.setState({ loading: false })
								} catch (err) {
								}
							}, 1000);
						}
					})
					.catch(err => {
						console.log(err)
						this.setState({ loading: false })
						Toast.show("Network connection issue.");
					})
			}
		);
	}

	render() {
		const { loading, fname, lname, email, password, cpassword, error_list, error_message, is_terms } = this.state;
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
							<Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Sending data.</Text>
							<Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Creating account.</Text>
						</View>
					</View>
				}
				<KeyboardAvoidingView behavior='position'>
					<ScrollView >
						<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
							<Image source={Logo} style={{ height: 150, resizeMode: 'contain' }} />
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
									status={fname ? "update" : "new"}
									errorText={error_list?.fname}
									icon="first"
								/>
								<CustomAnimatedInput
									style={{ flex: 1, backgroundColor: 'transparent' }}
									value={lname}
									onChangeText={lname => {
										this.setState({ lname })
									}}
									placeholder={'Last name'}
									status={lname ? "update" : "new"}
									errorText={error_list?.lname}
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
									status={password ? "update" : "new"}
									type="password"
									errorText={error_list?.password}
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
									errorText={error_list?.cpassword}
									icon="password"
								/>
							</View>
							<View style={{ flexDirection: 'row', marginTop: 20 }}>
								<CheckBox
									disabled={false}
									value={is_terms}
									style={{ height: 20 }}
									onValueChange={(value) => this.setState({ is_terms: value })}
									tintColors={{ true: "#ffffff", false: "#ffffff" }}
									onCheckColor={"#ffffff"}
									onTintColor={"#ffffff"}
								/>
								<View style={{ flexDirection: 'column' }}>
									<Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>I agree to the</Text>
									<Text onPress={() => this.props.navigation.navigate('Terms')} style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}><Text>Saitama Inu Terms of Use</Text> <Text style={{ color: 'white' }}>and</Text> <Text onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>Privacy Policy</Text></Text>
								</View>
							</View>
							{error_list?.is_terms &&
								<View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1, flexDirection: 'row', width: '100%', height: 25 }}>
									<Text style={styles.errorText}>
										{'You have to accept our terms of use.'}
									</Text>
								</View>
							}
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
									<Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor') }}>{error_message}</Text>
								</View>
							}
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
								<Text style={{ color: EStyleSheet.value('$fontColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}>Already have an account?</Text>
								<TouchableOpacity onPress={() => this.onSignIn()}>
									<Text style={{ color: EStyleSheet.value('$btnColor'), fontFamily: 'OpenSans-Light', fontSize: 12 }}> Log In</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
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