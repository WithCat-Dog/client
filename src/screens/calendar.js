
import { useNavigation,NavigationContainer } from '@react-navigation/native';
import {Colors, useTheme} from "react-native-paper";
import {Modal,KeyboardAvoidingView, Image,SafeAreaView, View, Text,StyleSheet,TextInput, Button, Alert, TouchableOpacity ,Keyboard,StatusBar} from 'react-native';
import  React,{useCallback, useEffect,useState} from 'react';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';

const Calendar = ({navigation})=>{
    const [click,setDate] =useState("");

    const onDateChange = (click) => {
        console.log("click"+click);
        const days = click.split(" ");     
        switch(days[1]){
            case("Dec"): {days[1]='12'; break;}
            case("Nov"): {days[1]='11'; break;}
            case("Oct"): {days[1]='10'; break;}
            case("Sep"):{days[1]='09'; break;}
            case("Aug"): {days[1]='08'; break;}
            case("July"): {days[1]='07'; break;}
            case("June"): {days[1]='06'; break;}
            case("May"):{days[1]='05'; break;}
            case("Apr"): {days[1]='04'; break;}
            case("Mar"): {days[1]='03'; break;}
            case("Feb"): {days[1]='02'; break;}
            case("Jan"):{days[1]='01'; break;}
        }
        console.log("days");
        console.log(days);
        const tempDate = days[3]+'-'+days[1]+'-'+days[2];
        console.log('tempdate');
        console.log(tempDate);
        setDate(tempDate);

};    
    return(
        <SafeAreaView style = {{flex:1,backgroundColor:'white'}}>
        <View style={{backgroundColor:'white'}}>
        <CalendarPicker
                        weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                        months={[
                            '1','2','3','4','5','6','7','8','9','10', '11','12',
                        ]}
                        startFromMonday
                        selectedDayColor='#DF5F5F'
                        todayBackgroundColor='#FFD8CC'
                        onDateChange={(date)=>{onDateChange(date.toString())}}
                            />

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('writenotice',{date:click})}>
                            <Text style={styles.buttonText}>확인</Text>
                        </TouchableOpacity>
                    </View>

        </View>
        </SafeAreaView>
        
    )

}
const styles = StyleSheet.create({
    button:{
        backgroundColor: '#DF5F5F',
        flexDirection:'row',
        
        height: 50,
        width: 140,
        borderRadius: 30,
        alignItems:'center',
        marginTop:10,
    },
    buttonText :{
        flex:1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign:'center',
        textAlignVertical:'center',
        
       
    },
    buttonView:{
        padding:20,
        flex:1,
        alignContent:'center',
        alignItems:'center',
        

    }
})
export default Calendar;
