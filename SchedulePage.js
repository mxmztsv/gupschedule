import React, {Component} from 'react';
import {StyleSheet, Text, View, SectionList, StatusBar, RefreshControl, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import PageTitle from './components/PageTitle';
import SubjectProgress from './components/SubjectProgress';
import ScheduleCard from './components/ScheduleCard'
import AdsBanner from './components/AdsBanner';
import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {getSchedule} from './controllers/ScheduleController';
import {getViolation} from './controllers/ViolationController';
import analytics from '@react-native-firebase/analytics';
import admob, {BannerAd, BannerAdSize, MaxAdContentRating, TestIds} from '@react-native-firebase/admob';
import {AuthContext} from './context';
import {Splash} from './Screens';
// import ActivityIndicator from 'react-native-paper';

export default class SchedulePage extends Component {

    state = {
        TabTitle: 'Расписание',
        studentName: 'Имя Отчество Фамилия',
        scheduleTable: undefined,
        refreshing: false,
    }

    componentDidMount = async () => {
        const studentName = await AsyncStorage.getItem('studentName');
        this.setState({studentName})

        const scheduleTable = await getSchedule();
        this.setState({scheduleTable})

        await analytics().logScreenView({
            screen_name: "Расписание",
            screen_class: "Расписание",
        });

    }


    render() {

        // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8976849445350370/7194804059';
        // const adUnitId = 'ca-app-pub-8976849445350370/7194804059';

        return (
            <Screen>
                <StatusBar backgroundColor="#f3f3f3" barStyle={'dark-content'} />
                {/*<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>*/}
                <Container>
                    {this.state.scheduleTable !== undefined ?
                        (
                    <Scroller
                        sections={this.state.scheduleTable}
                        // sections={DATA}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => <ScheduleCard {...item}/>}
                        ListHeaderComponent={<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>}
                        // ListHeaderComponent={<PageTitle TabTitle={this.state.TabTitle} studentName="Иннокентий Петрович Миронов"/>}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                    ) : (
                            // <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            //     <ActivityIndicator size="large" color="#8b0401"/>
                            // </View>
                            <Splash/>
                    )}

                    <AdsBanner />
                    {/*<BannerWrapper>*/}
                    {/*    <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER}/>*/}
                    {/*</BannerWrapper>*/}
                </Container>
            </Screen>
        )
    }

    handleRefresh = async () => {
        this.setState({
            refreshing: true
        })
        const scheduleTable = await getSchedule();
        this.setState({scheduleTable}, () => {
            this.setState({
                refreshing: false
            })
        })
    }

}

const Scroller = styled.SectionList`
    width: 100%;
    height: 100%;
`;

const Container = styled.View`
    align-items: center;
    width: 100%;
    height: 100%;
`;

const BannerWrapper = styled.View`
    bottom: 0;
    position: absolute;
    align-items: center;
    width: 320px;
    align-self: center;
`;

const Screen = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;




let DATA = [
    {
        data: [
            {
                date: 'Пятница, 25 сентября 2021',
                items: [
                    {
                        subject: 'Информатика',
                        number: '1',
                        type: 'пгр',
                        teacher: 'Иванов А.Б.',
                        address: 'Фучика-15',
                        room: '525',
                        time: '08:30-10:05'
                    },
                    {
                        subject: 'Математика',
                        number: '2',
                        type: 'пгр',
                        teacher: 'Петрова М.К.',
                        address: 'Фучика-15',
                        room: '316',
                        time: '10:15-11:50'
                    },
                    {
                        subject: 'Английский язык',
                        number: '3',
                        type: 'сем',
                        teacher: 'Сидорова А.В.',
                        address: 'Фучика-15',
                        room: '412',
                        time: '12:30-14:05'
                    },

                ]

            },
            {
                date: 'Суббота, 26 сентября 2021',
                items: [
                    {
                        subject: 'Философия',
                        number: '1',
                        type: 'лек',
                        teacher: 'Зайцев М.О.',
                        address: 'Фучика-15',
                        room: 'Лз№ 3',
                        time: '08:30-10:05'
                    },
                    {
                        subject: 'Экономика',
                        number: '2',
                        type: 'сем',
                        teacher: 'Волкова Е.В.',
                        address: 'Фучика-15',
                        room: '419',
                        time: '10:15-11:50'
                    },
                    {
                        subject: 'Философия',
                        number: '1',
                        type: 'лек',
                        teacher: 'Рахманинова М.Д.',
                        address: 'Фучика-15',
                        room: 'Лз№ 3',
                        time: '08:30-10:05'
                    },
                    {
                        subject: 'Философия',
                        number: '2',
                        type: 'пгр',
                        teacher: 'Дрещинская М.К.',
                        address: 'Фучика-15',
                        room: '419',
                        time: '10:15-11:50'
                    },

                ]

            },
            {
                date: 'Суббота, 26 сентября 2020',
                items: [
                    {
                        subject: 'Философия',
                        number: '1',
                        type: 'лек',
                        teacher: 'Рахманинова М.Д.',
                        address: 'Фучика-15',
                        room: 'Лз№ 3',
                        time: '08:30-10:05'
                    },

                ]

            }, {
                date: 'Суббота, 26 сентября 2020',
                items: [


                ]

            },


        ]
    },
];

// const test = DATA[0]['data'][0];
//
// DATA[0]['data'][0]['items'].push({
//     sc:'asc'
// })
//
// console.log(DATA[0]['data'][0]['items']);
