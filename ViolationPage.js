import React, {Component} from 'react';
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import ViolationCard from './components/ViolationCard';
import PageTitle from './components/PageTitle';
import AsyncStorage from '@react-native-community/async-storage';
import {getViolation} from './controllers/ViolationController'
import {getProgress} from './controllers/ProgressController';
import analytics from '@react-native-firebase/analytics';
import AdsBanner from './components/AdsBanner';
import {Splash} from './Screens';

export default class ViolationPage extends Component{

    state = {
        TabTitle: 'Дисциплина',
        studentName: 'Имя Отчество Фамилия',
        violationTable: undefined,
        refreshing: false,
    }

    componentDidMount = async () => {
        const studentName = await AsyncStorage.getItem('studentName');
        this.setState({studentName})

        const violationTable = await getViolation();
        this.setState({violationTable})

        await analytics().logScreenView({
            screen_name: "Дисциплина",
            screen_class: "Дисциплина",
        });

    }

    render() {
        return (
            <Screen>
                <StatusBar backgroundColor="#f3f3f3" barStyle={'dark-content'} />
                {/*<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>*/}
                <Container>
                    {this.state.violationTable !== undefined  ?
                        (
                            <Scroller
                                sections={this.state.violationTable}
                                // sections={DATA}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => <ViolationCard {...item}/>}
                                ListHeaderComponent={<PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>}
                                // ListHeaderComponent={<PageTitle TabTitle={this.state.TabTitle} studentName="Иннокентий Петрович Миронов"/>}
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
        const violationTable = await getViolation();
        this.setState({violationTable}, () => {
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
    width: 100%;
    height: 100%;
`;

const Screen = styled.View`
    flex: 1;
    align-items: center;    
`;

// const DATA = [
//     {
//         data: [
//             {
//                 date: '5.03.2021',
//                 title: 'За активное участие в организации и проведении мероприятий, проводимых в Университете',
//                 type: 'Благодарность',
//                 number: '123',
//                 level: 'факультету'
//             },
//             {
//                 date: '17.02.2021',
//                 title: 'За активную работу',
//                 type: 'Благодарность',
//                 number: '357',
//                 level: 'факультету'
//             },
//             {
//                 date: '12.02.2021',
//                 title: 'За активное участие в творческой жизни факультета и Университета',
//                 type: 'Благодарность',
//                 number: '85',
//                 level: 'факультету'
//             },
//             {
//                 date: '31.12.2020',
//                 title: 'Просто потому что молодец',
//                 type: 'Благодарность',
//                 number: '228',
//                 level: 'факультету'
//             },
//             {
//                 date: '19.11.2020',
//                 title: 'За активное участие в организации и проведении мероприятий, проводимых в Университете',
//                 type: 'Благодарность',
//                 number: '12',
//                 level: 'факультету'
//             },
//             {
//                 date: '21.10.2019',
//                 title: 'За активное участие в организации и проведении мероприятий, проводимых в Университете',
//                 type: 'Благодарность',
//                 number: '26',
//                 level: 'факультету'
//             },
//
//         ]
//     },
// ];

