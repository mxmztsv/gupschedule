import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';

export async function getInfo() {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://www.gup.ru/insider/student/vedomost/`,
        });

        let $ = cheerio.load(response.data, {decodeEntities: false});


        const rowData = [];

        // console.log($('table.text > tr > td > b').html())

        let name;
        let specialty;
        let year;
        let group;
        let number;

        let info;


        $('table.text > tr').map((i, el) => {
            if (i === 0) {
                name = $(el).text().trim("")
                console.log('name', name)
            }
            if (i === 1) {
                let str = $(el).text().trim("")
                info = str.split("\n")
            }
        })

        const studentInfo = {
            name: name.trim(),
            specialty: info[0].trim(),
            year: info[1].trim(),
            group: info[2].trim(),
            number: info[3].trim(),
        }


        return studentInfo;
    } catch (e) {
        console.log(e)
    }
    return undefined


}
