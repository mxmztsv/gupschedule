import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Button from './Button';
import { AuthContext } from "../context";
import AsyncStorage from '@react-native-community/async-storage';




const ProfileCard = ({studentName, info}) => {
    const { signOut } = React.useContext(AuthContext);
    return (
        <Card>
            <Avatar source={{uri: 'https://edu.gup.ru/pluginfile.php/93636/user/icon/boost/f1?rev=5526329'}}/>
            <DescriptionWrapper>
                <Description>{studentName}</Description>
                <Description>{info.specialty}</Description>
                <Description>{info.year}</Description>
                <Description>{info.group}</Description>
                <Description>{info.number}</Description>
            </DescriptionWrapper>
            <Button onPress={() => signOut()}>Выйти</Button>
        </Card>
    )
};

ProfileCard.defaultProps = {
    studentName: 'Student Name',
    info: {}
    // specialty: 'Специальность',
    // year: 'Курс',
    // group: 'Группа',
    // number: 'Личный номер'
};

const DescriptionWrapper = styled.View`
    justify-content: center;
    margin: 10px 10px 0 10px;
`;


const Header = styled.View`
    align-items: center;
    justify-content: center;
    height: 120px;
    width: 90%;
    
`;

const HeaderTitle = styled.Text`
    color: black;
    font-size: 30px;
    font-weight: bold;
`;

const HeaderStudentName = styled.Text`
    color: #7f7f7f;

`;

const Avatar = styled.Image`
    border-radius: 50px;
    width: 50px;
    height: 50px;
    margin-right: 5px;
`;

const AboutBox = styled.View`
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #f3f3f3;
    padding: 10px;
`;

const AuthorWrapper = styled.View`
    align-items: center;
`;

const AuthorRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 5px;
`;

const About = styled.Text`
    color: #7f7f7f;
    font-size: 10px;
    text-align: center;
`;

const AuthorName = styled.Text`
    
`;

const Description = styled.Text`
    color: #7f7f7f;
    font-size: 12px;
`;

const Card = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 20px 15px 20px 15px;
    margin: 30px 15px 10px 15px;
    border-radius: 25px;
    width: 100%;
`;

export default ProfileCard;
