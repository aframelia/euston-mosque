var data = new Array();

$.getJSON('prayerTimes.json', function(jsonFile) {

    var currentMonth = moment().month()

    data = jsonFile;

    var tr;
    var today = new moment().format("MM/DD/YYYY");
    
    for (var i = 0; i < data.length; i++) {

        if(data[i]['Date'] == today) {
            tr = $('<tr/>');
            tr.append("<td>" + "Fajr" + "</td>");
            tr.append("<td>" + data[i]['FajrStart'] + "</td>");
            tr.append("<td>" + data[i]['FajrPray'] + "</td>");
            $('table').append(tr);
            tr = $('<tr/>');
            tr.append("<td>" + "Sunrise" + "</td>");
            tr.append("<td>" + data[i]['Sunrise'] + "</td>");
            tr.append("<td>" + " " + "</td>");
            $('table').append(tr);
            tr = $('<tr/>');
            tr.append("<td>" + "Dhuhr" + "</td>");
            tr.append("<td>" + data[i]['DhuhrStart'] + "</td>");
            tr.append("<td>" + data[i]['DhuhrPray'] + "</td>");
            $('table').append(tr);
            tr = $('<tr/>');
            tr.append("<td>" + "Asr" + "</td>");
            tr.append("<td>" + data[i]['AsrStart'] + "</td>");
            tr.append("<td>" + data[i]['AsrPray'] + "</td>");
            $('table').append(tr);
            tr = $('<tr/>');
            tr.append("<td>" + "Maghrib" + "</td>");
            tr.append("<td>" + data[i]['MaghribStart'] + "</td>");
            tr.append("<td>" + data[i]['MaghribPray'] + "</td>");
            $('table').append(tr);
            tr = $('<tr/>');
            tr.append("<td>" + "Isha" + "</td>");
            tr.append("<td>" + data[i]['IshaStart'] + "</td>");
            tr.append("<td>" + data[i]['IshaPray'] + "</td>");
            $('table').append(tr);
        }
    }

});

function generatePrayerTimes() {

    console.log('prayertimes');
    var monthlytimes = new Array();
    var currentMonth = moment().month();
    var monthStr = moment().format('MMMM');
    console.log(monthStr);

    for (var i = 0; i < data.length; i++) {

        dayStr = data[i]['Date'];
        day = moment(dayStr, "MM/DD/YYYY");
        month = day.month();  

        if(currentMonth == month) {
            monthlytimes.push([day.date(),
                day.format('dddd').substring(0,3),
                removeAMPMfromString(data[i]['FajrStart']),
                removeAMPMfromString(data[i]['FajrPray']),
                removeAMPMfromString(data[i]['Sunrise']),
                removeAMPMfromString(data[i]['DhuhrStart']),
                removeAMPMfromString(data[i]['DhuhrPray']),
                removeAMPMfromString(data[i]['AsrStart']),
                removeAMPMfromString(data[i]['AsrPray']),
                removeAMPMfromString(data[i]['MaghribStart']),
                removeAMPMfromString(data[i]['MaghribPray']),
                removeAMPMfromString(data[i]['IshaStart']),
                removeAMPMfromString(data[i]['IshaPray'])]);
        }
    }
    
    console.log("ended for loop")
    console.log(monthlytimes.length);
    console.log(monthlytimes);

    var columns = ["Date", "Day", "Fajr", "Fajr Pray", "Sunrise", "Dhuhr", "Dhuhr Pray", "Asr", "Asr Pray", "Maghrib", "Magrhib Pray", "Isha", "Isha Pray"];

    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text("Shah Jalal Jame Masjid: " + monthStr, 40, 60);


    doc.autoTable(columns, monthlytimes, 
        {startY: 150,
        tableWidth: 'wrap',
        theme: 'striped', 
        styles: {fontSize: 8, overflow: 'linebreak', halign: 'center'}});
    doc.save("prayerTimes.pdf");

}

function removeAMPMfromString(theString){

    return theString.replace('AM', '').replace('PM','');
}
