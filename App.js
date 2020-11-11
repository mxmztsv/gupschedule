import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignIn, CreateAccount, Profile, Home, Splash, Schedule, Progress} from './Screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "./context";
import { auth, logOut } from './controllers/AuthController'
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import {getInfo} from './controllers/ProfileController'


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Вход", headerShown: false }}
        />
    </AuthStack.Navigator>
);

const TabsScreen = () => (
    <Tabs.Navigator tabBarOptions={{
        activeTintColor: '#8b0401'
    }}>
        <Tabs.Screen name="Расписание" component={Schedule} options={{
            tabBarLabel: 'Расписание',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="schedule" size={30} color={color} />
            ),
        }}/>
    <Tabs.Screen
      name="Успеваемость"
      component={Progress}
      options={{
        tabBarLabel: 'Успеваемость',
        tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="progress-check" color={color} size={30} />
            ),
            // tabBarIcon: ({ activeTintColor }) => <MaterialCommunityIcons name="progress-check" color={activeTintColor} />
        }}/>
        <Tabs.Screen name="Дисциплина" component={Home} options={{
            tabBarLabel: 'Дисциплина',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="school-outline" size={30} color={color}/>
            ),
        }}/>
        {/*<Tabs.Screen name="Расписание" component={Schedule} options={{*/}
        {/*    tabBarLabel: 'Расписание',*/}
        {/*    tabBarIcon: ({ color, size }) => (*/}
        {/*        <MaterialIcons name="schedule" size={30} color={color} />*/}
        {/*    ),*/}
        {/*}}/>*/}
        <Tabs.Screen name="Профиль" component={Profile} options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle-outline" size={30} color={color} />
            ),
        }}/>
    </Tabs.Navigator>
);


// function App()
// {
//     return (
//             <NavigationContainer>
//                 <TabsScreen />
//             </NavigationContainer>
//         )
//
// }

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator headerMode="none">
        {userToken ? (
            <RootStack.Screen
                name="App"
                component={TabsScreen}
                options={{
                    animationEnabled: false
                }}
            />
        ) : (
            <RootStack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                    animationEnabled: false
                }}
            />
        )}
    </RootStack.Navigator>
);

// export default App;

export default function App() {


    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };


    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {

            signIn: async (login, pass) => {
                try {
                    const studentName = await auth(login, pass);
                    console.log('studentName: ', studentName);

                    try {
                        await AsyncStorage.setItem('studentName', studentName);
                        await AsyncStorage.setItem('login', login);
                        await AsyncStorage.setItem('pass', pass);
                    } catch(err) {
                        console.error(err);
                    }

                    dispatch({ type: 'LOGIN', id: login, token: studentName });



                    try {

                        const info = await getInfo()

                        await analytics().logEvent('authorization', {
                            studentName: await AsyncStorage.getItem('studentName'),
                            specialty: info['specialty'],
                            year: info['year'],
                            group: info['group'],
                            number: info['number'],
                        })

                        await analytics().setUserId(info['number'])
                        await analytics().setSessionTimeoutDuration(180000)
                        await analytics().setUserProperties({
                            ["Имя"]: await AsyncStorage.getItem('studentName'),
                            ["Специальность"]: info['specialty'],
                            ["Курс"]: info['year'],
                            ["Группа"]: info['group'],
                            ["Номер"]: info['number'],
                        })

                    } catch (error) {
                        console.error(error.message);
                    }


                } catch (e) {
                    // console.error( e.message );
                    Alert.alert("Что-то пошло не так", e.message,[
                        {text: "Понимаю"}
                    ])
                    // throw new Error("Вход не выполнен, повторите попытку");
                    // try {
                    //     await AsyncStorage.setItem('authStatus', e.message);
                    // } catch(err) {
                    //     console.error(err);
                    // }
                }

            },
            signOut: async () => {
                await logOut();
                try {
                    await AsyncStorage.removeItem('studentName');
                    await AsyncStorage.removeItem('login');
                    await AsyncStorage.removeItem('pass');
                } catch(e) {
                    console.log(e);
                }
                dispatch({ type: 'LOGOUT' });
                // setIsLoading(false);
                // setUserToken(null);
            }
        };
    }, []);

    React.useEffect(() => {
        async function fetchDataFromAsyncStorage() {
            // const {signIn} = React.useContext(AuthContext);
            let studentName;
            let login;
            let pass;
            studentName = null;

            try {
                studentName = await AsyncStorage.getItem('studentName');
                login = await AsyncStorage.getItem('login');
                pass = await AsyncStorage.getItem('pass');
            } catch(e) {
                console.log(e);
            }

            console.log('studentName: ', studentName);

            await analytics().logAppOpen();

            if (login && pass) {
                console.log('login: ', login);
                console.log('pass: ', pass);
                try {
                    await auth(login, pass) //auth while open app
                    const info = await getInfo()
                    await analytics().setUserId(info['number'])
                    await analytics().setUserProperties({
                        ["Имя"]: await AsyncStorage.getItem('studentName'),
                        ["Специальность"]: info['specialty'],
                        ["Курс"]: info['year'],
                        ["Группа"]: info['group'],
                        ["Номер"]: info['number'],
                    })
                } catch (e) {
                    console.log(e)
                    if (e.message === 'Network Error') {
                        Alert.alert("Ошибка сети", "Отсутствует подключение к сети, либо сайт gup.ru недоступен",[
                            {text: "Хорошо"}
                        ])
                    }
                }
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: studentName });
        }

        fetchDataFromAsyncStorage();


        // setTimeout(async () => {
        //     // setIsLoading(false);
        //     let studentName;
        //     studentName = null;
        //
        //     try {
        //         studentName = await AsyncStorage.getItem('studentName');
        //     } catch(e) {
        //         console.log(e);
        //     }
        //
        //     console.log('studentName: ', studentName);
        //     dispatch({ type: 'RETRIEVE_TOKEN', token: studentName });
        // }, 0);
    }, []);

    if (loginState.isLoading) {
        return <Splash />;
        // return <ActivityIndicator size="large"/>
        // return(
        //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //         <ActivityIndicator size="large"/>
        //     </View>
        // );
    }


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <RootStackScreen userToken={loginState.userToken} />
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
