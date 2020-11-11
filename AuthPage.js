import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, SectionList, TextInput, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import PageTitle from './components/PageTitle';
import ScheduleCard from './components/ScheduleCard';
import Button from './components/Button'
import AuthButtonWithMsgBox from './components/AuthButtonWithMsgBox';
import { AuthContext } from "./context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

// export default class AuthPage extends Component{
export default function AuthPage() {
    const {signIn} = React.useContext(AuthContext);

    const [login, setLogin] = useState(null);
    const [pass, setPass] = useState(null);


    // state = {
    //     authStatus: '',
    //     setLogin: '',
    //     setPass: ''
    // }
    //
    // componentDidMount = async () => {
    //     // const authStatus = await AsyncStorage.getItem('authStatus');
    //     // this.setState({authStatus})
    // }


    // render() {
        return (
            <Screen>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle={'dark-content'} />
                <TitleWrapper>
                    <Title>Авторизация</Title>
                    <Description>Выполните вход в аккаунт gup.ru</Description>
                </TitleWrapper>
                <Card>
                    <LoginRow>
                        <FieldIcon>
                            <MaterialCommunityIcons name="account" size={25} color="#7f7f7f" />
                        </FieldIcon>
                        <LoginField placeholder={"Логин"} type="text" onChangeText={async (val) => {
                            setLogin(val.toString())
                            // const setLogin = val.toString()
                            // // this.setState({setLogin});
                            //
                            // try {
                            //     await AsyncStorage.setItem('login', setLogin);
                            // } catch(err) {
                            //     console.error(err);
                            // }
                        }}/>
                    </LoginRow>
                    <PassRow>
                        <FieldIcon>
                            <MaterialCommunityIcons name="shield-key" size={25} color="#7f7f7f" />
                        </FieldIcon>
                        <PassField placeholder={"Пароль"} secureTextEntry={true} onChangeText={async (val) => {
                            setPass(val.toString())
                            // const setPass = val.toString()
                            // // this.setState({setPass});
                            // try {
                            //     await AsyncStorage.setItem('pass', setPass);
                            // } catch(err) {
                            //     console.error(err);
                            // }
                        }}/>
                    </PassRow>
                </Card>
                {/*<Button style={styles.signInButton} title="Войти" color="red" onPress={() => signIn()}/>*/}
                <Button onPress={async () => {
                    try {
                        // const login = await AsyncStorage.getItem('login');
                        // const pass = await AsyncStorage.getItem('pass');
                        signIn(login,pass)
                    } catch (e) {
                        // console.log(e.message)
                    }
                }
                }>Войти</Button>
                {/*<AuthButtonWithMsgBox message={this.state.authStatus}/>*/}
            </Screen>
        );
    // }


}

const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const TitleWrapper = styled.View`
    align-items: center;
`;

const Title = styled.Text`
    color: black;
    font-size: 30px;
    font-weight: bold;
`;

const Description = styled.Text`
    color: #7f7f7f;
`;

const Card = styled.View`
    background-color: #fff;
    padding: 10px 15px 10px 15px;
    margin: 30px 15px 10px 15px;
    width: 90%;
    border-radius: 25px;

`;

const LoginRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const FieldIcon = styled.View`
    align-items: center;
    width: 10%;
`;

const LoginField = styled.TextInput`
    align-items: center;
    width: 90%;
`;

const PassRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PassField = styled.TextInput`
    align-items: center;
    width: 90%;
`;

const styles = StyleSheet.create({
    signInButton: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        width: 100,
    }
})

