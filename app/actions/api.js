import { BaseConfig } from "@config";
import base64 from 'react-native-base64';

const _REQUEST2SERVER = (url, params = null, type = null) => {
	const isGet = (params == null);
	console.log(params);
	console.log(BaseConfig.SERVER_HOST);

	return new Promise(function (resolve, reject) {
		fetch(`${BaseConfig.SERVER_HOST}${url}`, {
			method: type ? type : isGet ? 'get' : 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${base64.encode(BaseConfig.AUTH_USERNAME + ':' + BaseConfig.AUTH_PASSWORD)}`,
			},
			...(!isGet && { body: JSON.stringify(params) })
		})
			.then(res => res.json())
			.then(res => {
				resolve(res);
				if (res?.Response_Status == 'Success')
					resolve(res);
				else reject(res);
			})
			.catch(err => {
				reject(err)
			});
	});
}
export const registration = (params) => {
	return _REQUEST2SERVER(`User/SignUp`, params);
}
export const login = (params) => {
	return _REQUEST2SERVER(`User/Login`, params);
}
export const log_out = (params) => {
	return _REQUEST2SERVER(`User/Log_Out`, params);
}
export const check_password = (params) => {
	return _REQUEST2SERVER(`User/Old_Password_Check`, params);
}
export const change_password = (params) => {
	return _REQUEST2SERVER(`User/Change_Password`, params);
}
export const reset_password = (params) => {
	return _REQUEST2SERVER(`User/Reset_Password`, params);
}
export const email_verification_for_login = (params) => {
	return _REQUEST2SERVER(`User/OTP_Validation_For_Login`, params);
}
export const email_verification = (params) => {
	return _REQUEST2SERVER(`User/Email_Verification`, params);
}
export const mobile_otp = (params) => {
	return _REQUEST2SERVER(`User/Mobile_OTP`, params);
}
export const forgot_password = (params) => {
	return _REQUEST2SERVER(`User/Forgot_Password`, params);
}
export const mobile_verification = (params) => {
	return _REQUEST2SERVER(`User/OTP_Verification`, params);
}
export const email_exist = (params) => {
	return _REQUEST2SERVER(`User/Name_Existence`, params);
}
