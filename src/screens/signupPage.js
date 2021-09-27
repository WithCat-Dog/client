
import * as React from 'react';
import { useState, Component } from 'react';
import { Image,SafeAreaView, View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, CheckBox } from 'react-native';

const signupPage = (props) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userterm, setUserTerm] = useState(false);



    // 회원정보 데이터 넘기는 함수 
    const handleSubmitButon = () => {

        //입력을 안했을 경우
        if (!userName) {
            alert('이름을 입력해주세요');
            return;
        }
        if (!userId) {
            alert('id를 입력해주세요');
            return;
        }
        if (!userPassword) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (!userNickname) {
            alert('닉네임을 입력해주세요');
            return;
        }
        if (!userterm) {
            alert('동의약관에 동의하셔야 합니다');
            return;
        }


        fetch('http://localhost:3030/auth/join', { 
            method: "POST",
            body: JSON.stringify({
                id: userId,
                pw: userPassword,
                name: userName,
                nickname: userNickname,
                tel: userPhone
            }),

            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => { alert(res.data); })




    };

    /*const validid = fasle;
    const checkid = () => {
        fetch('http://localhost:3003/auth/join', {
            method: "GET",
            body: JSON.stringify({
                id: userId,
            })
        }).then((res) => {
            if (res.data == true) {
                validid = true;
            }
            else {
                alert("이미 존재하는 아이디입니다.");
                validid = false;
            }
        })
    };
*/
    /*  const checkId = () => {
          fetch('http://localhost:3003/auth/join', {
              method: "POST",
              body: JSON.stringify({
                  id: userId,
              })
          }).then((res) => res.json())
              .then((json) => {
                  if (json) {
                      alert('사용가능한 아이디입니다.');
                      /*this.setState({
      
                      })
                  } else {
                      alert('이미 사용중인 아이디입니다.');
                  }
              })
      }*/
    return (

        <SafeAreaView style={signupstyle.total}>
            <View style={signupstyle.topbar}>

                <Text style={signupstyle.toptextstyle}>
                    회원 가입</Text >
                <View style={[{flexDirection:'row'}]}>
                <Text style={signupstyle.textstyle}>
                    멍이랑 냥이랑
                </Text>
                <Image style={signupstyle.logoImage}
                    source={require('../../assets/IconImage.png')}
                />
                </View>
            </View>
            <View style={signupstyle.contents}>
                <Text style={signupstyle.contText}>아이디</Text>
                <View style={signupstyle.vi}>
                    <TextInput
                        // value={this.state.userId}
                        type="userId"
                        style={signupstyle.textinput}
                        placeholder="아이디를 입력해주세요"
                        onChange={(e) => {
                            const { eventCount, target, text } = e.nativeEvent;
                            setUserId(text);
                        }}
                    />

                    <TouchableOpacity style={signupstyle.smallbutton} /*onPress={checkid}*/>
                        <Text style={signupstyle.smtext}>중복 확인</Text>
                    </TouchableOpacity>
                </View>
                <Text style={signupstyle.contText}>닉네임</Text>
                <View style={signupstyle.vi}>
                    <TextInput
                        type="userNickname"
                        style={signupstyle.textinput}
                        placeholder="닉네임을 입력해주세요"
                        // onChangeText ={(userNickname)=> setUserNickname({userNickname})}
                        onChange={(e) => {
                            const { eventCount, target, text } = e.nativeEvent;
                            setUserNickname(text);
                        }}

                    />
                    <TouchableOpacity style={signupstyle.smallbutton}>
                        <Text style={signupstyle.smtext}>중복 확인</Text>
                    </TouchableOpacity>
                </View>
                <Text style={signupstyle.contText}>이름</Text>
                <TextInput
                    type="userName"
                    style={signupstyle.textinput}
                    placeholder="이름을 입력해주세요"
                    // onChangeText ={(userName)=> setUserName({userName})}
                    onChange={(e) => {
                        const { eventCount, target, text } = e.nativeEvent;
                        setUserName(text);
                    }}


                />
                <Text style={signupstyle.contText}>비밀 번호</Text>
                <TextInput
                    type="userPassword"
                    style={signupstyle.textinput}
                    placeholder="비밀번호를 입력해주세요"
                    //onChangeText ={(userPassword)=> setUserPassword({userPassword})}
                    onChange={(e) => {
                        const { eventCount, target, text } = e.nativeEvent;
                        setUserPassword(text);
                    }}


                />
                <Text style={signupstyle.contText}>전화 번호</Text>
                <TextInput
                    type="userPhone"
                    style={signupstyle.textinput}
                    placeholder="전화번호를 입력해주세요"
                    //onChangeText ={(userPhone)=> setUserPhone({userPhone})}
                    onChange={(e) => {
                        const { eventCount, target, text } = e.nativeEvent;
                        setUserPhone(text);
                    }}

                />
                <View style={[{flexDirection:'row'},{position:'relative'},{height:80}]}>
                    <Text style={[signupstyle.contText]}>개인정보 수집이용 동의약관</Text>
                    <CheckBox
                        name="userterm"
                        title='개인정보수집에 동의하십니까?'
                        value={userterm}
                        onValueChange={setUserTerm}
                        checkdColor='red'
                        style={signupstyle.checkbox}
                    >
                    </CheckBox>
                    
                </View>

                <TouchableOpacity style={signupstyle.button} onPress={handleSubmitButon}>
                    <Text style={signupstyle.buttontext}>회원 가입</Text>

                    </TouchableOpacity>

            </View>

        </SafeAreaView>
    );

}

const signupstyle = StyleSheet.create({
    total: {
        backgroundColor: 'white',
    },
    topbar: {
        backgroundColor: '#FFEEDB',
        height: 250,
        alignItems: 'center',
        
    },
    toptextstyle: {
        fontFamily: 'BM',
        alignItems: 'center',
        fontSize: 30,
        position: 'relative',
        paddingTop: 20,
       


    },
    textstyle: {
        fontFamily: 'BM',
        fontSize: 40,
        position: 'relative',
        top: 100,
        left: 10,
        

    },
    contents: {
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        top: -30,
        height: 600,
        borderColor: 'black',

    },
    contText: {
        fontFamily: 'BM',
        fontSize: 20,
        position: 'relative',
        top: 30,
        left: 40,
        marginBottom: 30,
        
        height:25,
    },
    
    textinput: {
        fontFamily: 'BM',
        height: 40,
        width: 260,

        borderColor: 'gray',
        borderWidth: 1,
        position: 'relative',
        left: 50,
        marginBottom: -15,
        marginTop: 5,
        top:-5,

    },
    smallbutton: {
        backgroundColor: '#DF5F5F',
        alignItems: 'center',
        height: 37,
        width: 80,
        borderRadius: 30,
        left: 60,
        top: 5,


    },
    smtext: {
        color: 'white',
        fontFamily: 'BM',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 8,
    },
    vi: {
        flexDirection: 'row',
        marginBottom: -15,
        marginTop: -5,
        height: 40,
        top:7,
        
    },
    button: {
        backgroundColor: '#DF5F5F',
        alignItems: 'center',
        height: 50,
        width: 140,
        position: 'relative',
        top: 50,
        left: 140,
        borderRadius: 30,
    },
    buttontext: {
        fontFamily: 'BM',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
        color: 'white',


    },
    validtext: {
        fontFamily: 'BM',
        color: 'red',
        fontSize: 15,
    },
    checkbox: {
        position: 'relative',
        top: 30,
        left: 60,
        width:20,
        height:20,
    },
   
    logoImage:{
        width:180,
        height:180,
        resizeMode: 'contain' ,
        position: 'relative',
        left:10,
        top:-40,
        

    }

})

export default signupPage;