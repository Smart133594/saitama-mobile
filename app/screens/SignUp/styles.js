import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
    content:{
        padding:25
    },
    errorText: {
        color: '$errorColor',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        paddingLeft: 10,
        fontFamily: 'OpenSans-Light',
        textAlign: 'center'
    },
});
