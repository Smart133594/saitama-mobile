import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Auth from "./auth";
import Loading from "@screens/Loading";

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    Auth: Auth,
  },
  {
    initialRouteName: "Loading"
  }
);
module.exports = createAppContainer(AppNavigator);
