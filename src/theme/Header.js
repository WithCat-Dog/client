import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = ({headername})=>{
    const navigation = useNavigation();
    return(
    <View style={styles.view}>
        <Icon style={styles.icon} name="angle-left" size={45} onPress={()=>{navigation.canGoBack() && navigation.goBack();}}/>
        <Text style={styles.text}>{headername}</Text>
        
    </View>
    )
}
const styles = StyleSheet.create({
    view : {
        flexDirection : 'row',
        width : "100%",
        height : 50,
        
        backgroundColor : "#FFD8CC"
    },
    icon : {
        paddingLeft : 20
    },
    text : {
        fontSize : 20,
        marginLeft : 100,
        paddingTop:15
        
    }
})
export default Header;