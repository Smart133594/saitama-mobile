import React from "react";
import { View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Utils from '@utils';
import Home from "@screens/Home";
import MyProfile from "@screens/MyProfile";
import ResetPassword from "@screens/MyProfile/ResetPassword";
import ProfileEdit from "@screens/MyProfile/ProfileEdit";
import Categories from "@screens/Categories";
import LeftDrawerContent from "@components/LeftDrawerContent";
import RightDrawerContent from "@components/RightDrawerContent";
import Cart from "@screens/Cart";
import WishList from "@screens/WishList";
import OrderSummary from "@screens/OrderSummary";
import MyOrders from "@screens/MyOrders";
import OrderDetails from "@screens/MyOrders/OrderDetails";
import ProductDetails from "@screens/ProductDetails";
import Products from "@screens/Products";
import Brands from "@screens/Brands";
import BrandDetails from "@screens/BrandDetails";
import PartnerDetails from "@screens/PartnerDetails";
import Partners from "@screens/Partners";
import MyWallet from "@screens/MyWallet";
import GiftCard from "@screens/GiftCard";
import BuyGift from "@screens/GiftCard/BuyGift";
import ChangeAddress from "@screens/AddressSetting/ChangeAddress";
import AddressSetting from "@screens/AddressSetting";
import MissingCashback from "@screens/MissingCashback";
import PaymentStatus from "@screens/PaymentStatus";
import Coupons from "@screens/Coupons";
import CouponDetails from "@screens/CouponDetails";
import Deals from "@screens/Deals";
import DealDetails from "@screens/DealDetails";
import SearchProduct from "@screens/SearchProduct";
import Earn from "@screens/Earn";
import InviteFriend from "@screens/Earn/InviteFriend";
import ShopbyCity from "@screens/ShopbyCity";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import ForgotPassword from "@screens/ForgotPassword";
import SubCategory from "@screens/SubCategory";
import Notifications from "@screens/Notifications";
import ContactUs from "@screens/ContactUs";
import PrivacyPolicy from "@screens/PrivacyPolicy";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DrawerL = createDrawerNavigator();
const DrawerR = createDrawerNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: EStyleSheet.value('$primaryColor'),
        inactiveTintColor: EStyleSheet.value('$placeColor'),
        showLabel: false
      }}
      sceneContainerStyle={{ backgroundColor: 'red' }}
      tabBar={(props) => {
        return <View
          style={{ paddingTop: 15, backgroundColor: "white" }}
        >
          <AnimatedCircleBarComponent
            navigation={props}
            style={{ backgroundColor: "white" }}
            getLabelText={({ route }) => {
              return null;
            }}
            renderIcon={({ route, focused }) => {
              switch (route.name) {
                case "Home":
                  return focused ? <MaterialCommunityIcons name="home" color={EStyleSheet.value('$primaryColor')} size={25} /> : <MaterialCommunityIcons name="home" color={EStyleSheet.value('$placeColor')} size={25} />
                case "Category":
                  return focused ? <MaterialIcons name="category" color={EStyleSheet.value('$primaryColor')} size={25} /> : <MaterialIcons name="category" color={EStyleSheet.value('$placeColor')} size={25} />;
                case "MyProfile":
                  return focused ? <MaterialCommunityIcons name="account" color={EStyleSheet.value('$primaryColor')} size={25} /> : <MaterialCommunityIcons name="account" color={EStyleSheet.value('$placeColor')} size={25} />
                default:
                  return <MaterialCommunityIcons name="home" color={EStyleSheet.value('$primaryColor')} size={25} />;
              }
            }}
            onTabPress={({ route }) => !Utils.checkLogin() && route.name == "MyProfile" ? props.navigation.navigate("SignIn") : props.navigation.navigate(route.name, { Category_Id: [], Brand_Id: [], Partner_Details_Id: [], Deal_Id: [], Coupon_Id: [] })}
          />
        </View>
      }}
    >
      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarLabel: 'Category',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function RightDrawer() {
  return (
    <DrawerR.Navigator initialRouteName="BottomTab" drawerPosition="right" drawerContent={(props) => <RightDrawerContent {...props} />}>
      <DrawerR.Screen name="Products" component={Products} />
      <DrawerR.Screen name="Coupons" component={Coupons} />
      <DrawerR.Screen name="Deals" component={Deals} />
      <DrawerR.Screen name="SearchProduct" component={SearchProduct} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="BottomTab" component={BottomTab} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ProfileEdit" component={ProfileEdit} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="Cart" component={Cart} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="WishList" component={WishList} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="SubCategory" component={SubCategory} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="OrderSummary" component={OrderSummary} />
      <DrawerR.Screen name="MyOrders" component={MyOrders} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="OrderDetails" component={OrderDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ProductDetails" component={ProductDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="Brands" component={Brands} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="BrandDetails" component={BrandDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="PartnerDetails" component={PartnerDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="Partners" component={Partners} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ShopbyCity" component={ShopbyCity} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="MyWallet" component={MyWallet} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="GiftCard" component={GiftCard} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="BuyGift" component={BuyGift} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="AddressSetting" component={AddressSetting} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ChangeAddress" component={ChangeAddress} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="MissingCashback" component={MissingCashback} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="PaymentStatus" component={PaymentStatus} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="DealDetails" component={DealDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="CouponDetails" component={CouponDetails} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ResetPassword" component={ResetPassword} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="Earn" component={Earn} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="InviteFriend" component={InviteFriend} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="SignIn" component={SignIn} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="SignUp" component={SignUp} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ForgotPassword" component={ForgotPassword} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="Notifications" component={Notifications} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="ContactUs" component={ContactUs} options={{ swipeEnabled: false }} />
      <DrawerR.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ swipeEnabled: false }} />
    </DrawerR.Navigator>
  )
}
function LeftDrawer() {
  return (
    <DrawerL.Navigator initialRouteName="RightDrawer" drawerPosition="left" drawerContent={(props) => <LeftDrawerContent {...props} />}>
      <DrawerL.Screen name="RightDrawer" component={RightDrawer} />
    </DrawerL.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName="Main"
        headerMode="none"
        screenOptions={{ animationEnabled: false }}>
        <Stack.Screen name="Main" component={LeftDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
