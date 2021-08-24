import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import AnimatedInput from '../AnimatedInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Utils from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import IcMail from '@assets/images/mail.png';
import IcLock from '@assets/images/lock.png';
import IcFirst from '@assets/images/name_first.png';
import IcLast from '@assets/images/name_last.png';

const CustomAnimatedInput = ({
    placeholder,
    placeholderStyle,
    value,
    onChangeText,
    errorText,
    validator,
    type,
    button,
    autoFocus,
    maxLength,
    style,
    styleInput,
    status,
    disabled,
    isError,
    icon,
    ...props
}) => {
    const [buttonContainerSize, onLayout] = Utils.useComponentSize();

    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onFocus = e => {
        setFocused(true);
    };
    const onBlur = e => {
        setFocused(false);
    };

    return <React.Fragment>
        <View style={[styles.wrapper, !!errorText ? styles.hasError : {}, style]}>
            <View style={{
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50
            }}>
                {icon == 'email' &&
                    <Zocial name="email" size={22} color="white"/>
                }
                {icon == 'password' &&
                    <Fontisto name="locked" size={22} color="white" />
                }
                {icon == 'first' &&
                    <MaterialCommunityIcons name="account-circle" color="white" size={25}/>
                }
                {icon == 'last' &&
                    <MaterialCommunityIcons name="account-circle-outline" color="white" size={25}/>
                }
            </View>
            <AnimatedInput
                placeholder={placeholder}
                // valid={!(!!error)}
                // errorText={errorText}
                styleInput={{ paddingRight: (buttonContainerSize?.width || 0), ...styleInput }}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlure={onBlur}
                value={value}
                autoFocus={autoFocus}
                disabled={disabled}
                type={passwordVisible ? 'text' : type}
                maxLength={maxLength}
                status={status}
                isError={isError}
            />
            <View style={styles.buttonsContainer} onLayout={onLayout}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {type === 'password' && (
                        <FontAwesome5
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            style={styles.passwordToggle}
                            size={22}
                            name={passwordVisible ? 'eye' : 'eye-slash'}
                        />
                    )}
                    {button}
                </View>
            </View>
        </View>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, flexDirection: 'row', width: '100%', height: 20}}>
            {!!errorText && <Text style={styles.errorText}>
                {'This field is required.'}
            </Text>}
        </View>
    </React.Fragment>
};

CustomAnimatedInput.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'password', 'email'])
};

CustomAnimatedInput.defaultProps = {
    type: 'text',
    autoFocus: false,
};

const styles = EStyleSheet.create({
    wrapper: {
        borderWidth: 0,
        backgroundColor: '$contentColor1',
        borderRadius: 5,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    passwordToggle: {
        fontWeight: '900',
        fontSize: 16,
        lineHeight: 24,
        color: '$placeColor',
    },
    hasError: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '$errorColor',
    },
    input: {
        padding: 0,
    },
    inputFocused: {
        // height: 0.66 * INPUT_HEIGHT,
        // lineHeight: 0.66 * INPUT_HEIGHT
    },
    errorText: {
        color: '$errorColor',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        paddingLeft: 10,
        fontFamily: 'OpenSans-Light'
    },
    buttonsContainer: {
        position: 'absolute',
        right: 0,
        height: '100%',
        paddingHorizontal: 8,
    }
});

export default CustomAnimatedInput;
