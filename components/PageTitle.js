import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';



const PageTitle = props => {
    return (
        <Header>
            <HeaderTitle>{props.TabTitle}</HeaderTitle>
            <HeaderStudentName>{props.studentName}</HeaderStudentName>
        </Header>
    )
};

PageTitle.defaultProps = {
    TabTitle: 'Untitled',
    studentName: 'Student Name'
};


const Header = styled.View`
    align-items: center;
    justify-content: center;
    height: 85px;
    width: 100%;
`;

const HeaderTitle = styled.Text`
    color: black;
    font-size: 30px;
    font-weight: bold;
`;

const HeaderStudentName = styled.Text`
    color: #7f7f7f;

`;

export default PageTitle;
