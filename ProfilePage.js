import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView , TextInput, Image, StatusBar, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import PageTitle from './components/PageTitle';
import ScheduleCard from './components/ScheduleCard';
import Button from './components/Button'
import { AuthContext } from "./context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getSchedule} from './controllers/ScheduleController';
import ProfileCard from './components/ProfileCard'
import {getInfo} from './controllers/ProfileController'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType, BannerAdSize } from '@react-native-firebase/admob';
import analytics from '@react-native-firebase/analytics';
import AdsBanner from './components/AdsBanner';






export default class ProfilePage extends Component{
    // const { signOut } = React.useContext(AuthContext);

    state = {
        TabTitle: 'Профиль',
        studentName: 'Имя Отчество Фамилия',
        specialty: 'Специальность',
        year: 'Курс',
        group: 'Группа',
        number: 'Личный номер',
        info: 'Информация о студенте'
    }

    componentDidMount = async () => {
        const studentName = await AsyncStorage.getItem('studentName');
        this.setState({studentName})

        const info = await getInfo()
        console.log(info)
        this.setState({info})


        // admob()
        //     .setRequestConfiguration({
        //         // Update all future requests suitable for parental guidance
        //         maxAdContentRating: MaxAdContentRating.PG,
        //
        //         // Indicates that you want your content treated as child-directed for purposes of COPPA.
        //         tagForChildDirectedTreatment: false,
        //
        //         // Indicates that you want the ad request to be handled in a
        //         // manner suitable for users under the age of consent.
        //         tagForUnderAgeOfConsent: true,
        //     })
        //     .then(() => {
        //         // Request config successfully set!
        //     });

        await analytics().logScreenView({
            screen_name: "Профиль",
            screen_class: "Профиль",
        });



    }

    render() {

        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8976849445350370/7194804059';
        // const adUnitId = 'ca-app-pub-8976849445350370/7194804059';

        return (
            <Screen>
                <Scroller>
                <StatusBar backgroundColor="#f3f3f3" barStyle={'dark-content'} />
                <PageTitle TabTitle={this.state.TabTitle} studentName={this.state.studentName}/>
                {/*<PageTitle TabTitle={this.state.TabTitle} studentName="Иннокентий Петрович Миронов"/>*/}
                <Container>
                    <ProfileCard studentName={this.state.studentName} info={this.state.info}/>

                    {/*<BannerAd unitId={adUnitId} size={BannerAdSize.BANNER}/>*/}

                    {/*<Card>*/}
                    {/*    <Avatar source={{uri: 'https://edu.gup.ru/pluginfile.php/93636/user/icon/boost/f1?rev=5526329'}}/>*/}
                    {/*    <DescriptionWrapper>*/}
                    {/*        <Description>Иннокентий Петрович Миронов</Description>*/}
                    {/*        <Description>Специальность: 51.03.01 Культурология. БАКАЛАВР</Description>*/}
                    {/*        <Description>Курс: 1</Description>*/}
                    {/*        <Description>Группа: 12345</Description>*/}
                    {/*        <Description>Личный номер: 12345</Description>*/}
                    {/*    </DescriptionWrapper>*/}
                    {/*    <Button onPress={() => signOut()}>Выйти</Button>*/}
                    {/*</Card>*/}
                    <Card>
                        <AboutWrapper>
                            <AboutBox>
                                <About>Неофициальное приложение для студентов Санкт-Петербургского Гуманитарного университета профсоюзов.
                                    Вся предоставленная информация взята с сайта gup.ru.</About>
                                {/*<TouchableOpacity onPress={async () => {*/}
                                {/*    await Linking.openURL('mailto:zaytsevmaxim.official@gmail.com')*/}
                                {/*}}>*/}
                                {/*<Mail>zaytsevmaxim.official@gmail.com</Mail>*/}
                                {/*</TouchableOpacity>*/}
                            </AboutBox>
                            <AuthorWrapper>
                                <About>От студента ❤ студентам</About>
                                <About>Версия 1.0.1</About>
                                {/*<AuthorRow>*/}
                                {/*    <Avatar source={{uri: 'https://instagram.fhen2-1.fna.fbcdn.net/v/t51.2885-19/s320x320/97016074_258203348871108_2921080461432193024_n.jpg?_nc_ht=instagram.fhen2-1.fna.fbcdn.net&_nc_ohc=PrQyASxilP8AX_b9fw2&oh=8a1775ffbf5061c1c0fc7f53028c17b1&oe=5F9A21FE'}}/>*/}
                                {/*    <AuthorName onPress={() => Linking.openURL('https://www.instagram.com/russian_hustla/')}>Максим Зайцев</AuthorName>*/}
                                {/*</AuthorRow>*/}
                                {/*<Button onPress={() => signOut()}>Поблагодарить</Button>*/}
                            </AuthorWrapper>
                        </AboutWrapper>
                    </Card>
                </Container>
                </Scroller>
                <AdsBanner/>
            </Screen>
        );
    }


}

const Scroller = styled.ScrollView`
width: 100%;
`;

const Container = styled.View`
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 15px;
`;

const DescriptionWrapper = styled.View`
    justify-content: center;
    margin: 10px 10px 0 10px;
`;

const Screen = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;



const AboutWrapper = styled.View`
    align-items: center;
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
    padding: 5px;
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

const Mail = styled.Text`
    color: #8b0401;
    font-size: 10px;
    text-align: justify;
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



