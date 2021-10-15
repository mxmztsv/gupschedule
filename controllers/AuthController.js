import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import {getInfo} from './ProfileController'


export async function auth(login, pass) {

    console.log('login: ', login);
    console.log('pass: ',pass);

    if (login != null && pass != null) {
        const logTrim = login.trim();
        const passTrim = pass.trim();

        // const response = await axios.request({
        //     method: 'POST',
        //     url: `https://www.gup.ru/auth.php?AUTH_FORM=Y&TYPE=AUTH&backurl=/auth.php&USER_LOGIN=${logTrim}&USER_PASSWORD=${passTrim}`,
        // });

        let form = new FormData();
        form.append('USER_LOGIN', logTrim);
        form.append('USER_PASSWORD', passTrim);
        form.append('backurl', '/auth.php');
        form.append('TYPE', 'AUTH');
        form.append('AUTH_FORM', 'Y');

        const response = await axios.request({
            method: 'POST',
            url: `https://www.gup.ru/auth.php`,
            data: form
        });

        // console.log(response.data)

        // const $ = cheerio.load(response.data, {decodeEntities: false});
        // const name = $('.name').text().toString().trim().replace('  ', ' ');

        const info = await getInfo()

        try {
            const name = info['name']
            if (name) {
                console.log(name);
                return name;
            } else throw new Error("Неправильный логин и пароль, либо сайт gup.ru недоступен");
        } catch (e) {
        throw new Error("Неправильный логин и пароль, либо сайт gup.ru недоступен");
        }


    } else throw new Error("Необходимо ввести логин и пароль");
}


export async function logOut() {
    const response = await axios.request({
        method: 'GET',
        url: `https://www.gup.ru/insider/student/?logout=yes`,
    });

    console.log("Log out")
}
