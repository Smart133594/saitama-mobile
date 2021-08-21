import { Typography, FontWeight } from "@config";
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  default: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '$btnColor',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  textDefault: {
    fontSize: 20,
    color: '$whiteColor',
    fontFamily: 'Nunito-Bold',
  },
  outline: {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$btnColor'
  },
  textOuline: {
    color: '$btnColor'
  },
  full: {
    width: "100%",
    alignSelf: "auto"
  },
  round: {
    borderRadius: 28
  },
});
