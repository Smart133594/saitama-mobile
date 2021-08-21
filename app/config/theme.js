import EStyleSheet from 'react-native-extended-stylesheet';
export const BaseStyle = EStyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '$primaryColor'
  },
  safeAreaView1: {
    flex: 1,
    backgroundColor: '$contentColor1'
  },
  inputView: {
    backgroundColor: "$bkColor",
    borderRadius: 20,
    flexDirection: 'column',
    padding: 20,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    elevation: 5
  },
  textInput: {
    height: 46,
    color: '$textColor',
    padding: 8,
    fontSize: 15,
    width: "100%",
    justifyContent: "center",
    borderRadius: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '$inputBoderColor',
  },

  text: {
    color: '$textColor',
    width: "100%",
    fontSize: 18,
    fontWeight: 'bold'
  },
});
