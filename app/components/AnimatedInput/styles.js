import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    content: {
        justifyContent: 'flex-end',
        paddingVertical: 4,
        // marginVertical: 1,
        height: 40,
        flex: 1
    },
    bodyContent: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 40,
    },
    toucheableLineContent: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    label: {
        fontSize: 10,
        // paddingBottom: 7,
        color: 'white',
        height: 16,
        lineHeight: 16,
        fontFamily: 'OpenSans-Light',
    },
    input: {
        fontSize: 16,
        flex: 1,
        // marginBottom: 30,
        borderWidth: 0,
        padding: 0,
        paddingBottom: 2,
        // borderBottomWidth: 0,
        height: 35,
        lineHeight: 20,
        color: 'white'
    },
    error: {
        marginBottom: 5,
        color: '#d32f2f',
        fontSize: 13,
        marginTop: 2,
    },
    sufix: {
        flexDirection: 'column-reverse',
    },
});
