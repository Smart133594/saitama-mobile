import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated, Text } from 'react-native';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const AnimatedInput = ({
    placeholder,
    type,
    errorText,
    valid,
    errorColor,
    disabled,
    value,
    prefix,
    sufix,
    styleInput,
    styleLabel,
    styleError,
    autoFocus,
    maxLength,
    status,
    isError,
    // styleContent,
    // styleBodyContent,
    stylePlaceholder,
    ...others
}) => {
    const [showInput, setShowInput] = useState(false);
    const [showError, setShowError] = useState(false);
    const [animatedIsFocused] = useState(new Animated.Value(1));
    const [isInputFocused, setInputFocus] = useState(false);


    const inputFontSize = styleInput.fontSize || styles.input.fontSize;
    const labelFontSize = styleLabel.fontSize || styles.label.fontSize;
    const errorFontSize = styleError.fontSize || styles.error.fontSize;
    useEffect(() => {
        if (status == 'new') {
            if (value == "" && showInput) {
                onBlur();
            }
        }
    }, [status])
    useEffect(() => {
        setShowError(!valid);
        if (value) {
            setShowInput(true);
        }
        if (value && !showInput) {
            startAnimation();
        }
        animationView();
    }, [
        valid,
        value,
        animationView,
        animationLabelFontSize,
        animatedIsFocused,
        startAnimation,
        showInput,
    ]);

    const onBlur = async () => {
        await setInputFocus(false);
        if (!value) {
            await setShowInput(false);
            await setShowError(false);
            await startAnimation();
        }
    };

    const onFocus = () => {
        setInputFocus(true);
        if (!showInput) {
            startAnimation();
        }
    };

    useEffect(() => {
        autoFocus && onFocus();
    }, [autoFocus])

    const borderColor = () => {
        const borderStyle = {};
        // borderStyle.borderBottomColor =
        //     styleBodyContent.borderBottomColor ||
        //     styles.bodyContent.borderBottomColor;
        if (showError) {
            borderStyle.borderBottomColor = errorColor || '#d32f2f';
        }
        return borderStyle;
    };

    const setContentHeight = () => {
        const fontsHeight = labelFontSize + inputFontSize + errorFontSize + 10;
        const internalVerticalSpaces = 16;
        return fontsHeight + internalVerticalSpaces;
    };

    const getErrorContentSpace = () => {
        return errorFontSize + 2;
    };

    const startAnimation = useCallback(() => {
        Animated.timing(animatedIsFocused, {
            toValue: showInput ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start(() => {
            if (!showInput) {
                setShowInput(true);
            }
        });
    }, [animatedIsFocused, showInput]);

    const animationView = useCallback(() => {
        const sizeShow = 15 + labelFontSize + inputFontSize + 5;
        const sizeHide = 15 + labelFontSize;
        const inputAdjust = {
            height: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [sizeShow, sizeHide],
            }),
        };
        return inputAdjust;
    }, [animatedIsFocused, inputFontSize, labelFontSize]);

    const animationLabelFontSize = useCallback(() => {
        const fontAdjust = {
            fontSize: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [labelFontSize, inputFontSize],
            }),
        };
        return fontAdjust;
    }, [animatedIsFocused, inputFontSize, labelFontSize]);

    const animationLabelColor = useCallback(() => {
        const fontAdjust = {
            color: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [EStyleSheet.value('$primaryColor'), EStyleSheet.value('$placeColor')],
            }),
        };
        return fontAdjust;
    }, [animatedIsFocused]);

    const animationLabelStyle = useCallback(() => {
        const style = {
            fontSize: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    styles.label.fontSize,
                    styles.input.fontSize],
            }),
            height: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    styles.label.height,
                    styles.label.height + styles.input.height,
                ],
            }),
            lineHeight: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    styles.label.height,
                    styles.label.height + styles.input.height - 5,
                ],
            }),
            color: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [EStyleSheet.value('$fontColor'), isError == true ? EStyleSheet.value('$errorColor') : EStyleSheet.value('$fontColor')],
            }),
        };
        return style;
    }, [animatedIsFocused, isError]);

    const getKeyboardType = type => {
        switch (type) {
            case 'number': return 'numeric';
            case 'email': return 'email-address';
            default: return 'default'
        }
    }

    return (
        <View
            style={[styles.content/*styleContent, {height: setContentHeight()}*/]}
        >
            <Animated.View
                style={[
                    styles.bodyContent,
                ]}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}>
                    <Animated.Text
                        style={[styles.label, animationLabelStyle()]}
                        onPress={() => !disabled && onFocus()}
                    >
                        {placeholder}
                    </Animated.Text>
                    {showInput && (
                        <View style={styles.toucheableLineContent}>
                            <>{prefix}</>
                            {disabled ?
                                <Text
                                    {...others}
                                    style={[styles.input, styleInput, { paddingTop: 0, paddingBottom: 30, height: 50 }]}
                                >{value}</Text>
                                :
                                <TextInput
                                    {...others}
                                    value={value}
                                    pointerEvents={disabled ? 'box-none' : 'auto'}
                                    selectionColor={styleInput.fontColor}
                                    autoFocus={!!value ? false : true}
                                    blurOnSubmit
                                    onBlur={() => onBlur()}
                                    style={[styles.input, styleInput, { paddingTop: 0, paddingBottom: 30, height: 50 }]}
                                    onEndEditing={() => onBlur()}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={type === 'password'}
                                    keyboardType={getKeyboardType(type)}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    maxLength={maxLength}
                                />
                            }

                        </View>
                    )}
                </View>
                <View style={styles.sufix}>{sufix}</View>
            </Animated.View>
            {showError && (
                <Text
                    style={[
                        styles.error,
                        errorColor && { color: errorColor },
                        styleError,
                    ]}
                >
                    {errorText}
                </Text>
            )}
        </View>
    );
};

AnimatedInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
}

AnimatedInput.defaultProps = {
    valid: true,
    disabled: false,
    value: '',
    styleInput: {},
    styleLabel: {},
    styleError: {},
    autoFocus: false,
    type: 'text'
};

export default AnimatedInput;
