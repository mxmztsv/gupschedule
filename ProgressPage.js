import React, {Component} from 'react';
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import SubjectProgress from './components/SubjectProgress';
import PageTitle from './components/PageTitle';
import AsyncStorage from '@react-native-community/async-storage';
import {getProgress} from './controllers/ProgressController';
import {getSchedule} from './controllers/ScheduleController';
import analytics from '@react-native-firebase/analytics';
import AdsBanner from './components/AdsBanner';
import {Splash} from './Screens';

export default class ProgressPage extends Component{

    state = {
        TabTitle: 'Успеваемость',
        studentName: 'Имя Отчество Фамилия',
        progressTable: undefined,
        refreshing: false,
    }

    componentDidMount = async () => {
        const studentName = await AsyncStorage.getItem('studentName');
        this.setState({studentName})

        const progressTable = await getProgress();
        this.setState({progressTable})

        await analytics().logScreenView({
            screen_name: "Успеваемость",
            screen_class: "Успеваемость",
        });
    }

    render () {
        return (
            <Screen>
                <StatusBar backgroundColor="#f3f3f3" barStyle={'dark-content'} />
                {/*<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>*/}
                <Container>
                    {this.state.progressTable !== undefined  ?
                        (
                            <Scroller
                                sections={this.state.progressTable}
                                // sections={DATA}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => <SubjectProgress {...item}/>}
                                // renderItem={item.map((item, index) => <SubjectProgress {...item}/>)}
                                ListHeaderComponent={<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>}
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh}
                            />
                        ) : (
                            <Splash/>
                        )}

                    <AdsBanner />
                </Container>
            </Screen>
        );
    }

    handleRefresh = async () => {
        this.setState({
            refreshing: true
        })
        const progressTable = await getProgress();
        this.setState({progressTable}, () => {
            this.setState({
                refreshing: false
            })
        })
    }

}

const Scroller = styled.SectionList`
    width: 100%;
    height: 100%;
    padding-right: 5px;
`;

const Container = styled.View`
    height: 100%;
    width: 100%;
`;

const Screen = styled.View`
    flex: 1;
    align-items: center;
`;

// const DATA = [
//     {
//         data: [
//             {
//                 term: 'Семестр 1',
//                 data: [
//                     {
//                         date: '21.10.2019',
//                         title: 'История лингвистических учений',
//                         type: 'Аттестационная ведомость (баллы)',
//                         points: '26'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'История культуры Санкт-Петербурга',
//                         type: 'Зачетная ведомость',
//                         points: 'Зач'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Английский язык',
//                         type: 'Зачетная ведомость',
//                         points: '30'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Математика',
//                         type: 'Зачетная ведомость',
//                         points: '25'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Информатика',
//                         type: 'Зачетная ведомость',
//                         points: '22'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Математика',
//                         type: 'Зачетная ведомость',
//                         points: '22'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Математика',
//                         type: 'Зачетная ведомость',
//                         points: '22'
//                     },
//                     {
//                         date: '20.09.2020',
//                         title: 'Последний',
//                         type: 'Зачетная ведомость',
//                         points: '22'
//                     },
//                 ]
//             }
//         ]
//     },
// ];

const DATA = [
    {
        data: [
            {
                date: '21.10.2019',
                title: 'История лингвистических учений',
                type: 'Аттестационная ведомость (баллы)',
                points: '26'
            },
            {
                date: '20.09.2020',
                title: 'История культуры Санкт-Петербурга',
                type: 'Зачетная ведомость',
                points: 'Зач'
            },
            {
                date: '20.09.2020',
                title: 'Английский язык',
                type: 'Зачетная ведомость',
                points: '30'
            },
            {
                date: '20.09.2020',
                title: 'Математика',
                type: 'Зачетная ведомость',
                points: '25'
            },
            {
                date: '20.09.2020',
                title: 'Информатика',
                type: 'Зачетная ведомость',
                points: '22'
            },
            {
                date: '20.09.2020',
                title: 'Математика',
                type: 'Зачетная ведомость',
                points: '22'
            },
            {
                date: '20.09.2020',
                title: 'Математика',
                type: 'Зачетная ведомость',
                points: '22'
            },
            {
                date: '20.09.2020',
                title: 'Последний',
                type: 'Зачетная ведомость',
                points: '22'
            },
        ]
    },
];

