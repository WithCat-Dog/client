import React, {useCallback, useMemo, useState, Component, useEffect, useRef} from 'react';
import { Flatlist, Image,SafeAreaView,View,Text,StyleSheet,TextInput, Button,Alert,TouchableOpacity ,CheckBox} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //아이콘 불러오기 
import RadioGroup from 'react-native-radio-buttons-group';
import  Checkbox  from 'react-native-check-box';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import { ScrollView } from 'react-native-gesture-handler';
import { renderMatches } from 'react-router-dom';



const searchPage = ({navigation}) => {

    const mounted = useRef(false);


    var searchdata = undefined;


    const oid = "ex2";
    const onickname = "멍냥";

    const [otype,setType] = useState("");
    const [osize,setSize] = useState("");
    const [osex,setSex] = useState("");
    const [oage,setAge] = useState(0);
    const [oexperience,setExperience] = useState(-1);
    const [olicense,setLicense] = useState(-1);
    const [petSitterArray,Setpetsitterarray] =useState([ ]);
    const [success,Setsuccess] =useState(false);
    // {sid:'1',snickName:'1',ssize:'1',sage:'1',sexperience:1,slicense:1,stype:'1',ssex:'1'}

//   useEffect(()=>{
//     Setpetsitterarray(petSitterArray=>([...petSitterArray,searchdata]));
//     console.log('searchdata'+searchdata);
//     console.log(petSitterArray)
// },[searchdata]);

//   function createPetSitters(id,nickname,residence,type,sex,experience,license) {
//     return {id,nickname,residence,type,sex,experience,license}
// }
//   const setpetsitter =(searchdata)=>{
     
//   }

useEffect( ()=>{
    if(mounted.current){
        Setpetsitterarray(petSitterArray);
        for(i=0;i<petSitterArray.length;i++){
            console.log("sitter:"+petSitterArray[i].age);
        }
        navigation.navigate("searchresult", { owner : {
                    id : oid,
                    nickname : onickname,
                    type : otype,
                    sex : osex,
                    age :  ((oage == '20대')? 20 : 30),
                    experience : oexperience == '있음' ? 1 :0 ,
                    license : olicense=='있음' ? 1:0,
                    size:osize
                }, petSitterArray:petSitterArray
                ,result:success
            });
            console.log('navigateresult'+success);
    }
    else mounted.current=true;
    //navigation.navigate("searchresult",{owner:ownerUser,petSitterArray:petSitterArray});
},[petSitterArray])
  
  const handleSearchButton =(() => {
    console.log("handlesearchbutton 들어옴")
    const ownerUser = {
        id : oid,
        nickname : onickname,
        type : otype,
        sex : osex,
        age :  ((oage == '20대')? 20 : 30),
        experience : oexperience == '있음' ? 1 :0 ,
        license : olicense=='있음' ? 1:0,
        size:osize,

     }
     
      if(otype!=''){
       console.log("onwerUser:",ownerUser);
       console.log("searchPage 리스트들",oid,onickname,otype,osize,osex,oage,oexperience,olicense);
       console.log("ownerUser 리스트들",ownerUser.age,ownerUser.type,ownerUser.size, ownerUser.sex,ownerUser.experience,ownerUser.license);
    //db에서 데이터 가져오기 fetch 함수
        try{
        fetch('http://localhost:3030/search/petSitter', { 
            method: "POST",
            body: JSON.stringify({
                oid:ownerUser.id, //id
                onickname:ownerUser.nickname, //닉네임
                otype:ownerUser.type, //펫 종류
                osize:ownerUser.size, //펫 사이즈
                osex : ownerUser.sex ,//성별
                oage:ownerUser.age , //나이
                oexperience :ownerUser.experience, //경험
                olicense:ownerUser.license, //자격증 유무
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        //.then(res=>{console.log(res);})
        .then((res)=>{
            console.log("성공여부",res.success);
            // console.log("res.sitter[0]출력:",res.sitter[0]);
            // console.log("res.json.petSitter[0]",res.json.petSitter[0]);
            var subList = [];
            if(res.success === true){
                if (res.matched!=0){
                    Setsuccess(!success);
                }
                
                for (let i=0;i<res.matched;i++){
                        searchdata=res.sitter[i];
                        console.log('searchdata',searchdata);
                        subList.push(searchdata);
                        console.log("subList의 길이 : "+subList.length);
                        // Setpetsitterarray((petSitterArray) =>([...petSitterArray,searchdata]));
                }
                for(i=0;i<subList.length;i++) console.log(subList[i]);
                Setpetsitterarray((petSitterArray)=>(subList));
                // console.log('petsitterarray'+petSitterArray[0].age);
                // navigation.navigate("searchresult",{owner:ownerUser,petSitterArray:petSitterArray});
            }
        })}catch(e){
            console.log(e);
        }

}});
    
    


    return(
      <SafeAreaView style = {{backgroundColor:'white',flex:1}}>
          <ScrollView>
          <View style = {searchStyle.topbar}>
            <Text style = {{fontSize:20,top:15}}>펫시터 검색</Text>
          </View>
          <View style = {{left:20,top:10}}>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>부탁할 펫</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:250}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['강아지','고양이']}
                value = {otype}
                onSelect ={(value)=>setType(value) }
            />
            </View>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>펫의 크기</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:250}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['소형','중형','대형']}
                value = {osize}
                onSelect ={value=>setSize(value) }
            />
            </View>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>선호하는 펫시터의 성별</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:250}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['남성','여성']}
                value = {osex}
                onSelect ={value=>setSex(value) }
            />
            </View>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>선호하는 펫시터의 연령대</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:330}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['20대','30대','40대 이상']}
                value={oage}
                onSelect ={(value)=>setAge(value) }
            />
            </View>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>펫 키워본 경험</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:250}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['있음','없음']}
                value = {oexperience}
                onSelect ={value=>setExperience(value) }
            />
            </View>
            <View style = {searchStyle.bordercomponent}>
            <Text style = {searchStyle.text}>자격증 유무</Text>
            <ButtonToggleGroup 
                style = {[searchStyle.togglemenu,{width:250}]}
                highlightBackgroundColor ={'#FFD8CC'}
                highlightTextColor={'black'}
                inactiveTextColor={'black'}
                values={['있음','상관없음']}
                value = {olicense}
                onSelect ={value=>setLicense(value) }
            />
            </View>
            <View style = {searchStyle.submitButton}>
                    <TouchableOpacity style={searchStyle.button} onPress = {()=>handleSearchButton()} >
                        <Text style={searchStyle.buttontext}>검색</Text>
                    </TouchableOpacity>
                </View>
          </View>
          </ScrollView>
      </SafeAreaView>
        
    );
};

const searchStyle = StyleSheet.create({
  liststyle:{
      flexDirection:'row',
      position:'relative',
      top:-10,
  },
  topbar:{
      backgroundColor:'#FFD8CC',
      height:60,
      alignItems:'center',
      position:'relative',
  },
  topbarfont:{
      fontSize:20,
      top:15,
  },
   
  text:{
          marginTop:10,
          marginBottom :5,
          fontSize:15,
          width:200,
          height:25
  },
  
  box:{
      flexDirection:'row',
      margin:20,
      top:3,
  },
  button:{
      backgroundColor: '#DF5F5F',
      alignItems: 'center',
      height: 50,
      width: 140,
      position: 'relative',
      top:30,
      left: 100,
      borderRadius: 30,

  },
  buttontext :{
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 15,
      color: 'white',
  }
  ,
  bordercomponent :{
    width:340,
    height:100,
    borderBottomWidth:1,
    borderBottomColor:'gray',
    marginBottom:-10,
  },
  submitButton:{

  },
  togglemenu :{
    top:10,
    height:40,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    marginTop:-15
  }

})
export default searchPage;