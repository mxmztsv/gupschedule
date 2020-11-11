import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';

export async function getViolation() {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://www.gup.ru/insider/student/violation/`,
        });

        let $ = cheerio.load(response.data, {decodeEntities: false});


        const rowData = [];

        const trList = $('#vedTable > tr').map((_, tr) => {
            rowData.push({
                date: $(tr).children().html(),
                number: $(tr).children().next().html(),
                type:  $(tr).children().next().next().html(),
                level: $(tr).children().next().next().next().html(),
                title: $(tr).children().next().next().next().next().html(),
            })
            // console.log(data)
        })

        const data = [{
            data: rowData.slice(1)
        }];

        return data;
    } catch (e) {
        console.log(e)
    }

    return undefined


}
