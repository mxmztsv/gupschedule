import React from 'react';
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import PageTitle from './components/PageTitle';
import SubjectProgress from './components/SubjectProgress';
import ScheduleCard from './components/ScheduleCard'
import * as cheerio from 'cheerio-without-node-native';
import * as iconv from 'iconv-lite';
import { Buffer } from 'buffer';


async function print(promise_var) {
    console.log(await promise_var);
}

export default function SchedulePageRep() {
    // auth('NemykinaDA', '78650');
    auth('NasyrovaMD', 'lenzthelenz11');
    const violation = get_violation();
    print(violation)

    return (
        <Screen>
            <StatusBar backgroundColor="#f3f3f3" barStyle={'dark-content'}/>
            <PageTitle title='Расписание' studentName='Иннокентий Петрович Сидоров'/>
            <Container>
                <Scroller
                    // sections={DATA}
                    sections={ [
                        {
                            data: [
                                {
                                    date: 'Пятница, 25 сентября 2020',
                                    items: [
                                        {
                                            subject: 'Информационные технологии в лингвистике',
                                            number: '1',
                                            type: 'пгр',
                                            teacher: 'Лебедев А.В.',
                                            address: 'Фучика-15',
                                            room: '525',
                                            time: '08:30-10:05'
                                        },
                                        {
                                            subject: 'Практика устной и письменной речи',
                                            number: '2',
                                            type: 'пгр',
                                            teacher: 'Дрещинская М.К.',
                                            address: 'Фучика-15',
                                            room: '316',
                                            time: '10:15-11:50'
                                        },
                                        {
                                            subject: 'Лексикология',
                                            number: '3',
                                            type: 'сем',
                                            teacher: 'Белобородова А.В.',
                                            address: 'Фучика-15',
                                            room: '412',
                                            time: '12:30-14:05'
                                        },

                                    ]

                                },
                            ]
                        },
                    ]}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => <ScheduleCard {...item}/>}

                />
            </Container>
        </Screen>
    );
}


async function auth(login, pass) {
    const searchUrl = `https://www.gup.ru/auth.php?AUTH_FORM=Y&TYPE=AUTH&backurl=/auth.php&USER_LOGIN=${login}&USER_PASSWORD=${pass}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        },
        redirect: 'follow'
    };
    const response = await fetch(searchUrl, requestOptions);   // fetch page

    const htmlString = await response.text();  // get response text
    // console.log(response["headers"]['map']['set-cookie']);
    // console.log(response);
    // console.log(htmlString);
}

async function get_violation() {
    const searchUrl = `https://www.gup.ru/insider/student/violation//`;
    const requestOptions = {
        method: 'GET',
        encoding : 'binary',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        },
        redirect: 'follow'
    };
    const response = await fetch(searchUrl, requestOptions);   // fetch page

    const htmlString = await response.text();  // get response text
    // console.log(response["headers"]['map']['set-cookie']);
    console.log(response);

    // let body = Buffer.from(htmlString, 'binary');
    // let conv = iconv.decode(body,'win1251');
    // // // body = conv.convert(body).toString();
    // //
    // // let conv = iconv.Iconv('windows-1251', 'utf8');
    // // body = conv.convert(body).toString();

    const result = iconv.encode(iconv.decode(Buffer.from(htmlString, 'binary'), 'utf8'), 'win1251').toString();
    // console.log(result.toString());

    //
    const $ = cheerio.load(result, {decodeEntities: false});
    // console.log($('#vedTable > tr')
    //     .map((_, tr) => ({
    //         title: $(tr).text()
    //     }))
    // );

    // console.log($('.name').text());

    return $('.name').text().toString();
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

const Screen = styled.View`
    flex: 1;
    padding-bottom: 120px;
    width: 100%;
    align-items: center;
`;




const DATA = [
    {
        data: [
            {
                date: 'Пятница, 25 сентября 2020',
                items: [
                    {
                        subject: 'Информационные технологии в лингвистике',
                        number: '1',
                        type: 'пгр',
                        teacher: 'Лебедев А.В.',
                        address: 'Фучика-15',
                        room: '525',
                        time: '08:30-10:05'
                    },
                    {
                        subject: 'Практика устной и письменной речи',
                        number: '2',
                        type: 'пгр',
                        teacher: 'Дрещинская М.К.',
                        address: 'Фучика-15',
                        room: '316',
                        time: '10:15-11:50'
                    },
                    {
                        subject: 'Лексикология',
                        number: '3',
                        type: 'сем',
                        teacher: 'Белобородова А.В.',
                        address: 'Фучика-15',
                        room: '412',
                        time: '12:30-14:05'
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
                    {
                        subject: 'Философия',
                        number: '2',
                        type: 'пгр',
                        teacher: 'Дрещинская М.К.',
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
