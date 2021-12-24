import logo from '../assets/images/mung.png'
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';
import  React,{useCallback, useEffect,useState} from 'react';
import { FlatList,SafeAreaView, TouchableOpacity,View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
const petDetail = ({route,navigation}) => {
    const {id,nickname,petName,petIntro,url} = route.params;
    // const [nickName,setuserName] = useState('사라');
    // const [url,setuserId] = useState(logo);
    // const [petName,setuserPassword] = useState('내이름');
    // const [petIntro,setconfirmPw] = useState('안뇽 ');
    console.log(nickname);
    return (
    <SafeAreaView style={styles.safe}>    
        <View style={styles._topView}>
            <View style={styles.nickView}>
                <Text style={styles.text}>{nickname}님의 펫</Text>
            </View>
            <View style={styles.imgView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={{url:url}}/>
                </View>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>{petName}</Text>
            </View>
        </View>
        <View style={styles._totalView}>
            <View style={styles.introView}>
                <Text style={styles.text}>펫 정보</Text>

                <Text style={styles.infoText}>{petIntro}</Text>
            </View>
        </View>
    </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    _topView:{
        flex:5,
        backgroundColor:'#FFD8CC',
        alignItems:'center'
    },
    _totalView:{flex:4,width:'100%',flex:7,backgroundColor:'white',borderTopRightRadius:30,borderTopLeftRadius:30,},
    nickView:{flex:1,flex:1,flexDirection:'row',alignItems:'center'},
    imgView:{flex:5,marginTop:30,},
    imageView : {
        borderRadius : 75,
        width : 150,
        height : 150,
        backgroundColor : 'white'
    },
    imageStyle : {
        width : 150,
        height : 150
    },
    nameView:{flex:1,alignItems:'center',},
    nameText:{fontSize:20,color:'black',fontWeight:'400'},
    introView:{margin:40},
    infoText:{fontSize:18,fontColor:'black',fontWeight:'400'},
    text:{fontSize:14,},
    safe:{backgroundColor:'#FFD8CC',flex:1,alignContent:'center',justifyContent:'center',alignItems:'center'},
});

export default petDetail;