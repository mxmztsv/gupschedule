// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';


const ViolationCard = ( { date, title, type, number, level }) => {
    return (
        <Subject>
            <InfoWrapper>
                <DateRow>
                    <Date>{date}</Date>
                    <NumberWrapper>
                        <Number>{number}</Number>
                    </NumberWrapper>
                </DateRow>
                <SubjectTitleWrapper>
                    <SubjectTitle>{title}</SubjectTitle>
                </SubjectTitleWrapper>
                <DescriptionRow>
                    <Description>{type}</Description>
                    <Description>по</Description>
                    <Description>{level}</Description>
                </DescriptionRow>
            </InfoWrapper>
        </Subject>
    )
};

ViolationCard.defaultProps = {
    data: []
};


const Subject = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    margin: 5px 10px 5px 15px;
    min-height: 110px;
    border-radius: 25px;

`;

const DateRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const DescriptionRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const InfoWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const SubjectTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const SubjectTitleWrapper = styled.View`
    justify-content: center;
    min-height: 35px;
    margin: 5px 0;
`;

const NumberWrapper = styled.View`
    justify-content: center;
    align-items: center;
    background: #8b0401;
    border-radius: 50px;
    padding: 0 8px;
`;

const Number = styled.Text`
    color: white;
    font-size: 12px;
`;

const Date = styled.Text`
    color: #7f7f7f;
    font-weight: bold;
    margin-right: 10px;

`;

const Description = styled.Text`
    color: #7f7f7f;
    font-weight: normal;
    margin-right: 5px;

`;

const Points = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
`;

const PointsWrapper = styled.View`
    margin: 5px;
    align-items: center;
    justify-content: center;
    width: 20%;
`;

const PointsBox = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #8b0401;
    width: 50px;
    height: 50px;
    border-radius:25px;
`;

export default ViolationCard;
