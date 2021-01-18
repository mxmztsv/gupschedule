import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import styled from 'styled-components/native';
import SubjectProgress from './SubjectProgress';

// const ScheduleCard = ( { date, subject, number, type, teacher, address, room, time }) => {
const ScheduleCard = ( { date, items }) => {
        return (
            <Card>
                <Date>{date}</Date>
                {items.map((item, index) =>
                    <TouchableOpacity onPress={async () => {
                        if (item.link) {
                            // console.log(item.link)
                            try {
                                await Linking.openURL(item.link)
                            } catch (e) {

                            }
                        }

                    }}>
                <ClassWrapper key = {index}>
                    {/*<Class>*/}
                        <InfoColumn>
                            <NumberRow>
                                <Number>{item.number}</Number>
                                <TypeWrapper>
                                    <Type>{item.type}</Type>
                                </TypeWrapper>
                                <TimeBox>
                                    <TimeWrapper>
                                        <Time>{item.time}</Time>
                                    </TimeWrapper>
                                </TimeBox>

                            </NumberRow>
                            <SubjectWrapper>
                                {item.link ? (
                                    <SubjectWithLink ellipsizeMode = "tail" numberOfLines={2}>{item.subject}</SubjectWithLink>
                                ):(
                                    <Subject ellipsizeMode = "tail" numberOfLines={2}>{item.subject}</Subject>
                                )}
                            </SubjectWrapper>
                            <Teacher>{item.teacher}</Teacher>
                            <AddressRow>
                                <RoomWrapper>
                                    <Room>{item.room}</Room>
                                </RoomWrapper>
                                <Address>{item.address}</Address>
                            </AddressRow>
                        </InfoColumn>
                    {/*</Class>*/}
                </ClassWrapper>
                    </TouchableOpacity>)}
            </Card>
        )
}

ScheduleCard.defaultProps = {
    date: 'Date',
    items: []
};

const Card = styled.View`
    flex-direction: column;
    background-color: #fff;
    padding: 10px 5px 10px 5px;
    margin: 5px 15px 5px 15px;
    border-radius: 25px;
   
`;

const InfoColumn = styled.View`
    flex-direction: column;
    width: 100%;
`;

const Date = styled.Text`
    color: #7f7f7f;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: center;
    
`;

const ClassWrapper = styled.View`
    width: 100%;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #f3f3f3;
    border-radius: 15px;
    padding: 10px 5px;
    min-height: 115px;
    margin-bottom: 7px;
`;

const SubjectWrapper = styled.View`
    width: 100%;
    padding-right: 3px;
    justify-content: center;
    min-height: 30px;
`;

const TimeBox = styled.View`
    flex-direction: row;
    flex:1;
    justify-content: flex-end;
`;

const TimeWrapper = styled.View`
    background: #8b0401;
    padding: 0px 8px 2px 8px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 5px 0 0;
`;

const RoomWrapper = styled.View`
    background: #8b0401;
    padding: 0px 8px 2px 8px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    margin: 0 5px 0 0;

`;

const TypeWrapper = styled.View`
    background: #1c6a8a;
    padding: 0px 8px 2px 8px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 1px 5px 0 0;
`;

const Class = styled.View`
    flex-direction: row;
`;

const NumberRow = styled.View`
flex: 1;
flex-direction: row;
padding: 2px 0;
min-height: 25px;
`;

const Number = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #7f7f7f;
    border-radius: 10px;
    text-align: center;
    margin: 0 5px 0 0;
`;

const Type = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: white;
`;

const Subject = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;

const SubjectWithLink = styled.Text`
    color: black;
    text-decoration: underline;
    font-size: 15px;
    font-weight: bold;
`;

const Teacher = styled.Text`
    font-size: 12px;
    color: #7f7f7f;
`;

const AddressRow = styled.View`
flex-direction: row;
padding: 5px 0 5px 0;
`;

const Address = styled.Text`
color: #7f7f7f;
font-size: 12px;

`;

const Room = styled.Text`
    font-size: 12px;
    color: white;
`;

const Time = styled.Text`
    font-size: 12px;
    color: white;
`;

const TimeColumn = styled.View`
    width: 20%;
    justify-content: center;

`;

export default ScheduleCard;

