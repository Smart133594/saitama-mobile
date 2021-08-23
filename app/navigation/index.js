import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Auth from "./auth";
import Main from "./main";
import Loading from "@screens/Loading";

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    Auth: Auth,
    Main: Main,
  },
  {
    initialRouteName: "Loading"
  }
);
module.exports = createAppContainer(AppNavigator);
