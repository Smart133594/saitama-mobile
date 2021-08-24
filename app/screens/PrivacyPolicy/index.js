import { BaseStyle } from "@config";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from "react-redux";
const PrivacyPolicy = (props) => {
    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            forceInset={{ top: "always" }}
        >
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ margin: 20, paddingBottom: 0, borderBottomWidth: 2, borderColor: EStyleSheet.value('$btnColor'), flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontFamily: 'OpenSans-Bold', flex: 1, color: 'black' }}>Privacy Policy</Text>
                    <Text onPress={() => props.navigation.goBack()} style={{ fontSize: 24, color: EStyleSheet.value('$btnColor'), fontWeight: 'bold' }}>x</Text>
                </View>
                <View style={{ alignItems: 'center', margin: 20, marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Regular', color: 'black' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget aliquam dolor, et commodo dolor. Sed eu libero fermentum urna tempus molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin bibendum erat sed tortor tristique, at elementum ipsum finibus. Aliquam ante purus, ultrices sit amet blandit eget, iaculis ut elit. Etiam nisi ligula, vehicula congue dictum ac, gravida nec lorem. Nulla erat nunc, suscipit sed auctor non, pellentesque in leo. Donec tincidunt interdum lorem, vehicula tincidunt quam vulputate non.

                            Donec eleifend purus mollis, fermentum leo vitae, posuere sem. Donec condimentum feugiat sem, a porta odio mattis eu. Proin quis pharetra lorem. Aliquam erat volutpat. Integer posuere ligula metus, vel convallis libero dapibus vitae. Cras mollis arcu sed laoreet aliquam. Praesent varius arcu sed velit malesuada faucibus. Donec velit neque, placerat at lectus eget, fermentum ullamcorper dolor. Sed eu congue ligula. Praesent lacinia ultricies tincidunt. Sed sem tortor, luctus feugiat odio ac, mollis bibendum nunc. Morbi molestie porta leo non placerat.

                            Ut ut tellus massa. Integer efficitur enim odio, sit amet dignissim augue placerat sed. Sed pharetra semper porttitor. Morbi feugiat elit ut nibh vestibulum viverra. In hac habitasse platea dictumst. Fusce pretium, odio non lobortis vestibulum, metus dui mollis orci, sit amet ultrices nunc lectus sit amet arcu. Nunc eget aliquet sem, a tempor quam. Vestibulum scelerisque sapien eu velit eleifend, quis mattis enim suscipit.

                            Praesent ut consequat tortor. Pellentesque quam arcu, vulputate et consequat non, vulputate et sapien. Phasellus scelerisque urna ut enim porta, et elementum dui iaculis. Nullam vel mauris commodo, congue tellus a, cursus diam. Nunc iaculis elit turpis, quis elementum lectus pellentesque non. Phasellus odio quam, malesuada nec sapien ac, sollicitudin fringilla metus. Suspendisse potenti. Etiam auctor bibendum elit, a egestas nisl porttitor nec. Pellentesque sagittis ultricies mauris, quis viverra urna convallis in. Proin eleifend lacus at maximus fermentum. Donec pellentesque hendrerit arcu, quis tempor magna tristique ut. Nulla facilisi. Nullam a blandit purus. Ut luctus est eget lacus bibendum sollicitudin. Maecenas nulla mi, pretium ac venenatis sed, molestie eget massa. Sed quis neque sed mauris posuere luctus eu eget eros.

                            Praesent vel lobortis metus. Nulla risus mauris, varius et aliquet nec, dapibus dictum augue. Aenean viverra efficitur pulvinar. Pellentesque vestibulum nulla ac metus imperdiet, eu ultrices ligula fermentum. In bibendum lorem enim, at iaculis est porttitor a. Integer bibendum fermentum urna accumsan gravida. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac arcu commodo, tempus leo a, luctus dui. Nulla bibendum rhoncus luctus. Proin bibendum iaculis venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris nec aliquet magna, sollicitudin placerat quam.

                            Proin non libero sit amet enim maximus tempor. Proin condimentum lectus a nisl imperdiet suscipit. Phasellus in molestie dolor, sit amet ullamcorper mauris. Mauris rutrum purus ut malesuada rhoncus. Nulla ut nulla enim. Etiam turpis tellus, imperdiet a convallis ac, varius in urna. Mauris ullamcorper mollis ex. Curabitur iaculis euismod leo vel feugiat. Aliquam dapibus felis eu nulla iaculis euismod.

                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin fermentum faucibus ipsum, eget molestie urna aliquet eu. Donec arcu nisl, eleifend at leo et, elementum mollis nunc. Suspendisse fermentum pulvinar elit, non finibus quam luctus eu. Fusce vel tincidunt tortor. Etiam ac neque sit amet nunc rutrum laoreet. Suspendisse lacinia neque eget elementum hendrerit. Ut vel ex nec tortor sagittis ultrices.</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ backgroundColor: EStyleSheet.value('$btnColor'), padding: 10, width: '90%', alignItems: 'center', borderRadius: 50, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Nunito-Bold', color: 'white' }} >I agree</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);