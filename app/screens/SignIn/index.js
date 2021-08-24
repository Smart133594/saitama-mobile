import { actionTypes, apiActions } from "@actions";
import Logo from '@assets/images/logo.png';
import { Button } from "@components";
import CustomAnimatedInput from "@components/CustomAnimatedInput";
import { BaseConfig, BaseStyle } from "@config";
import * as Utils from "@utils";
import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import {
	BallIndicator
} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';
import { connect } from "react-redux";
import styles from "./styles";
class SignIn extends Component {
	constructor(props) {
		super(props);
		this.initState = {
			loading: false,
			email: BaseConfig.DEVELOP_MODE ? "olaguivelgabriel20@gmail.com" : '',
			password: BaseConfig.DEVELOP_MODE ? "Test@12345" : '',
			error_list: {},
			error_message: "",
			success_message: "",
		};
		this.state = this.initState;
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.route.params?.is_change) {
			this.setState({success_message: 'Your password was updated with success, you can log in with it.'})
		}
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
			email: email,
			password: password,
		}
		this.setState({
			loading: true
		}, () => {
			apiActions.login(model)
				.then(async response => {
					if (response.Response_Code == '200') {
						this.setState({ success_message: response?.UI_Display_Message })
						let data = {
							success: false,
							user: response.User
						};
						this.props.dispatch({ type: actionTypes.LOGIN, data });
						setTimeout(() => {
							try {
								this.setState({ ...this.initState });
								return this.props.navigation.navigate("ActiveAccount", { type: 1 });
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
					this.setState({ loading: false })
					Toast.show("Network connection issue.");
				})
		})
	}

	onSignUp() {
		this.setState({ ...this.initState })
		return this.props.navigation.navigate("SignUp");
	}
	render() {
		const { email, password, loading, error_list, error_message, success_message } = this.state;
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
							<Text style={{ color: 'black', fontFamily: 'Nunito-Light', fontSize: 16 }}>Login account.</Text>
						</View>
					</View>
				}
				<ScrollView >
					<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
						<Image source={Logo} style={{ height: 150, resizeMode: 'contain' }} />
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
								padding: 10,
								width: '100%'
							}}>
								<Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$errorColor'), textAlign: 'center' }}>{error_message}</Text>
							</View>
						}
						{!!success_message &&
							<View style={{
								backgroundColor: EStyleSheet.value('$successBkColor'),
								opacity: 0.4,
								borderWidth: 2,
								borderColor: EStyleSheet.value('$successBorderColor'),
								borderRadius: 8,
								marginTop: 15,
								padding: 10,
								width: '100%'
							}}>
								<Text style={{ fontFamily: 'OpenSans-SemiBold', color: EStyleSheet.value('$successColor'), textAlign: 'center' }}>{success_message}</Text>
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
