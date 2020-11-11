import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Button from './Button';
import {AuthContext} from '../context';
import AsyncStorage from '@react-native-community/async-storage';



const AuthButtonWithMsgBox = ({message}) => {
    const {signIn} = React.useContext(AuthContext);

    const [login] = useState(null);
    const [pass] = useState(null);

    // const login = await AsyncStorage.getItem('login');
    // const pass = await AsyncStorage.getItem('pass');

    return (
        <Wrapper>
            <Box>
                <Message>{message}</Message>
            </Box>
            <Button onPress={() => {
                signIn(login, pass)
            }}>Войти</Button>
        </Wrapper>
    )
};

AuthButtonWithMsgBox.defaultProps = {
    message: '',
};


const Box = styled.View`
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.View`
    align-items: center;
    justify-content: center;
`;

const Message = styled.Text`
    color: #640200;
    font-size: 12px;
`;

export default AuthButtonWithMsgBox;
