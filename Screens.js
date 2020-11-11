import React from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";

import { AuthContext } from "./context";
import SchedulePageRep from './SchedulePageRep';
import SchedulePage from './SchedulePage';
import ProgressPage from './ProgressPage';
import AuthPage from './AuthPage';
import ProfilePage from './ProfilePage';
import ViolationPage from './ViolationPage';
// import ActivityIndicator from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export const Home = ({ navigation }) => (
    <ScreenContainer>
        <ViolationPage/>
    </ScreenContainer>
);

export const Schedule = ({ navigation }) => (
    <ScreenContainer>
        <SchedulePage/>
    </ScreenContainer>
);

export const Progress = ({ navigation }) => (
    <ScreenContainer>
        <ProgressPage />
    </ScreenContainer>
);

export const Details = ({ route }) => (
    <ScreenContainer>
        <Text>Details Screen</Text>
        {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
);

export const Search = ({ navigation }) => (
    <ScreenContainer>
        <Text>Search Screen</Text>
        <Button title="Search 2" onPress={() => navigation.push("Search2")} />
        <Button
            title="React Native School"
            onPress={() => {
                navigation.navigate("Home", {
                    screen: "Details",
                    params: { name: "React Native School" }
                });
            }}
        />
    </ScreenContainer>
);

export const Search2 = () => (
    <ScreenContainer>
        <Text>Search2 Screen</Text>
    </ScreenContainer>
);

export const Profile = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <ScreenContainer>
            <ProfilePage/>
        </ScreenContainer>
    );
};

export const Splash = () => (
    <ScreenContainer>
        {/*<Text>Загрузка...</Text>*/}
        {/*<View>*/}
        {/*    <ActivityIndicator size="large"/>*/}
        {/*</View>*/}
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#8b0401"/>
        </View>
    </ScreenContainer>
);

// export const SignIn = ({ navigation }) => {
//     const { signIn } = React.useContext(AuthContext);
//
//     return (
//         <ScreenContainer>
//             <Text>Sign In Screen</Text>
//             <Button title="Sign In"
//                     onPress={() => signIn()}
//             />
//             <Button
//                 title="Create Account"
//                 onPress={() => navigation.push("CreateAccount")}
//             />
//         </ScreenContainer>
//     );
// };

export const SignIn = ({ navigation }) => {

    return (
        <ScreenContainer>
            <AuthPage />
        </ScreenContainer>
    );
};

export const CreateAccount = () => {
    const { signUp } = React.useContext(AuthContext);

    return (
        <ScreenContainer>
            <Text>Create Account Screen</Text>
            <Button title="Sign Up"
                    onPress={() => signUp()}
            />
        </ScreenContainer>
    );
};
