import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import {getInfo} from './ProfileController'


export async function auth(login, pass) {

    console.log('login: ', login);
    console.log('pass: ',pass);

    if (login != null && pass != null) {
        const logTrim = login.trim();
        const passTrim = pass.trim();

        const response = await axios.request({
            method: 'POST',
            url: `https://www.gup.ru/auth.php?AUTH_FORM=Y&TYPE=AUTH&backurl=/auth.php&USER_LOGIN=${logTrim}&USER_PASSWORD=${passTrim}`,
        });

        // console.log(response);

        // const $ = cheerio.load(response.data, {decodeEntities: false});
        // const name = $('.name').text().toString().trim().replace('  ', ' ');

        const info = await getInfo()

        // console.log('studentName: ', info['name']);

        const name = info['name']
        if (name) {
            console.log(name);
            return name;
        } else throw new Error("Неправильный логин и пароль, либо сайт gup.ru недоступен");

    } else throw new Error("Необходимо ввести логин и пароль");
}


export async function logOut() {
    const response = await axios.request({
        method: 'GET',
        url: `https://www.gup.ru/insider/student/?logout=yes`,
    });

    console.log("Log out")
}
