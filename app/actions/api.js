import { BaseConfig } from "@config";
import base64 from 'react-native-base64';

const _REQUEST2SERVER = (url, params = null, type = null) => {
	const isGet = (params == null);
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
	return _REQUEST2SERVER(`User/SignIn`, params);
}
export const check_verify = (params) => {
	return _REQUEST2SERVER(`User/CheckVerify`, params);
}
export const resend_code = (params) => {
	return _REQUEST2SERVER(`User/ResendCode`, params);
}
export const log_out = (params) => {
	return _REQUEST2SERVER(`User/LogOut`, params);
}
export const change_password = (params) => {
	return _REQUEST2SERVER(`User/ChangePassword`, params);
}
export const forgot_password = (params) => {
	return _REQUEST2SERVER(`User/ForgotPassword`, params);
}