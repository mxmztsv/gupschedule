import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Donut from './Donut'


const SubjectProgress = ( { date, title, type, points }) => {
// const SubjectProgress = ( { item }) => {
    console.log({ date, title, type, points })
    return (
        // <View>
        // {items.map((item, index) =>
        <Subject>
            <InfoWrapper>
                <Date>{date}</Date>
                <SubjectTitleWrapper>
                    <SubjectTitle>{title}</SubjectTitle>
                </SubjectTitleWrapper>
                <Description>{type}</Description>
            </InfoWrapper>
            <PointsWrapper>
                {/*<PointsBox>*/}
                {/*    <Points>{points}</Points>*/}
                {/*</PointsBox>*/}
                <Donut key={1} percentage={points} type={type}/>
            </PointsWrapper>
        </Subject>
    )
};


// const SubjectProgress = ( { progress }) => {
//     return (
//         progress.map((subject, index) =>
//                 <Subject key={index}>
//                     <InfoWrapper>
//                         <Date>{subject.date}</Date>
//                         <SubjectTitleWrapper>
//                             <SubjectTitle>{subject.title}</SubjectTitle>
//                         </SubjectTitleWrapper>
//                         <Description>{subject.type}</Description>
//                     </InfoWrapper>
//                     <PointsWrapper>
//                         <PointsBox>
//                             <Points>{subject.points}</Points>
//                         </PointsBox>
//                     </PointsWrapper>
//                 </Subject>
//             )
//     )
// };

SubjectProgress.defaultProps = {
    progress: []
};


const Subject = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 10px;
    margin: 5px 10px 5px 15px;
    min-height: 110px;
    border-radius: 25px;
`;

const InfoWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
    margin: 5px;
    padding-left: 15px;
    width: 80%;
`;

const SubjectTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const SubjectTitleWrapper = styled.View`
    justify-content: center;
    min-height: 35px;

`;

const Date = styled.Text`
    color: #7f7f7f;
    font-weight: bold;

`;

const Description = styled.Text`
    color: #7f7f7f;
    font-weight: normal;

`;

const Points = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
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
    width: 65px;
    height: 65px;
    border-radius: 50px;
    border-color: #8b0401;
    border-width: 5px;
`;

export default SubjectProgress;
