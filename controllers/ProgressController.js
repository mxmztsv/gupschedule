import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';

export async function getProgress() {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://www.gup.ru/insider/student/vedomost/`,
        });

        let $ = cheerio.load(response.data, {decodeEntities: false});


        const rowData = [];

        let term = 0;

        // const trList = $('#vedTable > tr').map((_, tr) => {
        //
        //     // console.log($(tr).html())
        //
        //     rowData.push({
        //         date: $(tr).children().children().html(),
        //         title: $(tr).children().next().html(),
        //         type:  $(tr).children().next().next().children().html(),
        //         points: $(tr).children().next().next().next().text().trim(),
        //     })
        //
        //     // console.log(data)
        // })

        const trList = $('#vedTable > tr').map((_, tr) => {

            // console.log($(tr).html())


            if ($(tr).text().trim().indexOf('Семестр') !== -1) {
                // console.log(($(tr).text().trim() + ' это семестр'))
                rowData.push({
                    term: $(tr).text().trim(),
                    items: [],
                })
                // classCount = 0;
                // console.log(term)
                term++
            } else {

                if (term-1 >= 0) {
                    rowData[term-1]['items'].push({
                        date: $(tr).children().children().html(),
                        title: $(tr).children().next().html(),
                        type:  $(tr).children().next().next().children().html(),
                        points: $(tr).children().next().next().next().text().trim(),
                    })
                }
                // console.log(rowData[term-1]['data'])

            }
            // console.log(data)
        })

        // console.log(JSON.stringify(rowData))

        const reversedLastTerm = rowData[term-1]['items'].reverse()

        const data = [{
            data: reversedLastTerm
        }];

        return data;
    } catch (e) {
        console.log(e)
    }
    return undefined


}
