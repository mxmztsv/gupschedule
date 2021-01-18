import * as cheerio from 'cheerio-without-node-native';
import axios from 'axios';

export async function getSchedule() {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://www.gup.ru/insider/student/schedule/`,
            // url: `https://www.gup.ru/insider/student/schedule/?Type=1&Faculty=4&Course=2&Group=24766`,
        });

        // console.log(response)

        let $ = cheerio.load(response.data, {decodeEntities: false});


        const rowData = [{
            date: $('.shedule__day-name').first().text().trim(),
            items: [],
        }];


        let day = 0;
        let classCount = 0;

        let numberPrev;
        let timePrev;
        let subjectPrev;
        let typePrev;
        let teacherPrev;
        let addressPrev;
        let roomPrev;

        for (let k = 0; k <= ($('.shedule__day-name ~ tr').length); k++) {
            $('.shedule__day-name ~ tr').eq(k).map((g, el) => {
                // console.log('___________________________________________')
                // console.log($(el).attr('class'))


                if ($(el).attr('class') === 'shedule__day-name') {
                    // console.log(($(el).text().trim() + ' это дата'))
                    rowData.push({
                        date: $(el).text().trim(),
                        items: [],
                    });
                    classCount = 0;
                    day++;
                } else {
                    // const t = $(el).html()
                    // console.log($(el).children().find($('td')).html())

                    // let $ = cheerio.load(response.data, {decodeEntities: false});

                    // console.log($(el).children().text())

                    function findItemByLabel(el, label) {
                        const data = [];
                        $(el).children().map((r, e) => {
                            const lbl = $(e).data('label');
                            // const a = $(e).children().attr('href');
                            // console.log('link: ', a);

                            if (lbl === label) {
                                // console.log(lbl, $(e).html())
                                data.push($(e).text().trim());
                                // return $(e).html()
                                // console.log("test")
                            }
                        });
                        // console.log(data)
                        return data;
                    }

                    function findRegistrationLink(el) {
                        const data = [];
                        $(el).children().map((r, e) => {
                            const lbl = $(e).data('label');
                            // const a = $(e).children().attr('href');
                            // console.log('link: ', a);

                            if (lbl === 'Предмет:') {
                                data.push($(e).children().attr('href'));
                                // const link = $(e).children().attr('href');
                                // if (link !== undefined) {
                                //     console.log('link: ', link);
                                //     return link
                                // } else return null

                            }
                        });
                        // console.log(data)
                        return data[0];
                    }

                    // findItemByLabel($(el), 'Предмет:')


                    // console.log($(el).html())
                    // console.log(day)
                    // console.log($('td[data-label="Пара:"]').text())
                    // console.log($(el).html(),findItemByLabel($(el), 'Пара:'))

                    const number = findItemByLabel($(el), 'Пара:');
                    const time = findItemByLabel($(el), 'Время:');
                    const subject = findItemByLabel($(el), 'Предмет:');
                    const type = findItemByLabel($(el), 'Тип:');
                    const teacher = findItemByLabel($(el), 'Преподаватель:');
                    const address = findItemByLabel($(el), 'Адрес:');
                    const room = findItemByLabel($(el), 'Аудитория:');
                    const regLink = findRegistrationLink($(el))

                    console.log('regLink: ', regLink);

                    // console.log((subject.length) ? subject : 'empty');


                    // console.log(rowData[0]['items'][classCount - 0]['subject'])


                    rowData[day]['items'].push({
                        number: (number.length) ? number : numberPrev,
                        time: (time.length) ? time : timePrev,
                        subject: (subject.length) ? subject : subjectPrev,
                        type: (type.length) ? type : typePrev,
                        teacher: teacher,
                        address: (address.length) ? address : addressPrev,
                        room: (room.length) ? room : roomPrev,
                        link: regLink,
                    });

                    numberPrev = number;
                    timePrev = time;
                    subjectPrev = subject;
                    typePrev = type;
                    teacherPrev = teacher;
                    addressPrev = address;
                    roomPrev = room;

                    classCount++;
                }

            });
        }


        const scheduleRaw = [];


        const schedule = scheduleRaw.slice(6);


        const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];


        function isDate(str) {
            for (let el of weekDays) {
                if (str.indexOf(el.toString()) > -1) {
                    return true;
                }
            }
            ;
            return false;
        }


        const items = [];
        const dates = [];


        const data = [{
            data: rowData,
        }];


        return data;
    } catch (e) {
        console.log(e);
    }

    return undefined;


}
