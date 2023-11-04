

import { fillUserDetails } from "../../js/user_js/user-panel.js";

//const getSchedule = (mode = 'Offline', d = 0) => {

//    // const url = `https://localhost:5001/?mode=${mode}&Date=${d}`;
//    // const res = await fetch(url)
//    // .catch(err=> {
//    //     console.log(err);
//    // });

//    let sch = null;
//    // if(res.status == 200){
//    //     sch = await res.json();
//    // }

//    console.log("d", d, "mode", mode);
//    sch = {
//        st: "9:00 AM",
//        et: "6:00 PM",
//        b1st: "12:00 PM",
//        b1et: "12:30 PM",
//        b2st: "4:00 PM",
//        b2et: "4:30 PM",
//        repeat: true,
//        mode: "Offline",
//        duration: "20",
//        monday: true,
//        tuesday: true,
//        wednesday: true,
//        thursday: true,
//        friday: true,
//        saturday: true,
//        sunday: true
//    };
//    return sch;
//}

//const getSlot = async(mode = 'Offline', d = 0, w = 0, m = 0) => {

//    if (d == 0) {
//        d = new Date().toDateString();
//    }
//    else {
//        d = new date(e.target.dataset.forDay).toDateString();
//    }

//    console.log("getslot", mode, d, w, m);
//    const url = "https://localhost:5001/Doctor/GetSlots?Date=" + d + "&Mode=" + mode + "&Week=" + w + "&Month=" + m;
//    const res = await fetch(url)
//        .catch(err => {
//            console.log(err);
//        });

//    let slots = null;

//    if (res.status == 200) {
//        slots = await res.json();
//    }
//    console.log(slots);
    
//    console.log("2");

//    return slots;
//}

//const fillDays = async(index = null, w = 0, m = 0) => {

//    let data = await getSlot();
//    console.log("1");
//    let days = [], mor = [], aft = [], eve = [];
//    let slotList = "", dayList = "";

//    const weekTab = document.getElementById("week-tab");
//    console.log("week tab", weekTab);
//    weekTab.innerHTML = "";

//    data.forEach(element => {
//        days.push(element.date);
//        mor.push(element.morning);
//        aft.push(element.afternoon);
//        eve.push(element.evening);
//    });

//    console.log(days);
//    var okay = 0;

//    for (let i = 0; i < days.length; i++) {
//        const x = days[i].split(',');
//        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
//        const t = d.substring(4);

//        console.log(x[1]);

//        const date = new Date();
//        const today = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();

       
//        if (today == t) {
//            dayList += `<li class="nav-item" >
//            <span class="nav-link active today" data-toggle="tab" data-for-day="${d} id="${i}">
//            ${x[0]}
//            </span>
//            </li>`;
//            // flag = true;
//            okay = 1;
//            document.getElementById("month-inner").innerHTML = x[1] ;
//        }

//        else {
//            dayList += `<li class="nav-item">
//            <span class="nav-link" data-toggle="tab" data-for-day="${d}" id="${i}" >
//            ${x[0]}
//            </span>
//        </li>`;

//        }


//    };
//    weekTab.innerHTML = dayList;
//    console.log("week tab", weekTab);


//    console.log(document.querySelectorAll("#week-tab .nav-item .nav-link"));



//    console.log("This", index);
//    if (okay == 0 && index == null) {

//        document.querySelectorAll("#week-tab .nav-item .nav-link")[0].classList.add("active");
//        console.log(document.querySelectorAll("#week-tab .nav-item .nav-link")[0].classList.add("active"));
//        const x = days[0].split(',');

//        document.getElementById("month-inner").innerHTML = x[1];
//        console.log(x[1]);

//    }
//    else {
//        if (index != null) {

//            if (index.trim() == "Sun") {

//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[0].classList.add("active");
//                const x = days[0].split(',');
//                document.getElementById("month-inner").innerHTML = x[1];

//            }
//            if (index.trim() == "Mon") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[1].classList.add("active");
//                const x = days[1].split(',');
//                document.getElementById("month-inner").innerHTML = x[1];

//            }
//            if (index.trim() == "Tue") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[2].classList.add("active");
//                const x = days[2].split(',');

//                document.getElementById("month-inner").innerHTML = x[1];
//            }
//            if (index.trim() == "Wed") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[3].classList.add("active");
//                const x = days[3].split(',');

//                document.getElementById("month-inner").innerHTML = x[1];
//            }
//            if (index.trim() == "Thu") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[4].classList.add("active");
//                const x = days[4].split(',');

//                document.getElementById("month-inner").innerHTML = x[1];
//            }
//            if (index.trim() == "Fri") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[5].classList.add("active");

//                const x = days[5].split(',');

//                document.getElementById("month-inner").innerHTML = x[1];
//            }
//            if (index.trim() == "Sat") {
//                console.log("This", index);

//                document.querySelectorAll("#week-tab .nav-item .nav-link")[6].classList.add("active");

//                const x = days[6].split(',');

//                document.getElementById("month-inner").innerHTML = x[1];
//                console.log(x[1]);
//            }
//        }
//    }

//    for (let i = 0; i < days.length; i++) {
//        const x = days[i].split(',');
//        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

//        if (i === 0) {
//            slotList += `<div class="tab-pane fade p-3 " data-for-slot="${d}" role="tabpanel">`;
//        }
//        else {
//            slotList += `<div class="tab-pane fade p-3" data-for-slot="${d}" role="tabpanel">`;
//        }

//        if (mor[i].length == 0 && aft[i].length == 0 && eve[i].length == 0) {
//            slotList += `<div class="empty-card">
//            <img src="images/cell-schedule.png"> 
//            <span> Schedule is empty </span>
//            </div>`;
//            slotList += `</div>`;
//        }
//        else {

//            if (mor[i].length != 0) {
//                slotList += `<div class="c-day-session__header">
//                 <span> Morning </span>
//                 <span> (${mor[i].length} slots) </span>
//                 </div>`;

//                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//                (mor[i]).forEach(element => {
//                    const b = element.split(',');
//                    if (b[1] === "True") {
//                        slotList += `<span class="booked">${b[0]}</span>`;
//                    }
//                    else {
//                        slotList += `<span>${b[0]}</span>`;
//                    }
//                });

//                slotList += `</div>`;
//            }
//            if (aft[i].length != 0) {
//                slotList += `<div class="c-day-session__header">
//                 <span> Afternoon </span>
//                 <span> (${aft[i].length} slots) </span>
//                 </div>`;

//                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//                (aft[i]).forEach(element => {
//                    const b = element.split(',');
//                    if (b[1] === "True") {
//                        slotList += `<span class="booked">${b[0]}</span>`;
//                    }
//                    else {
//                        slotList += `<span>${b[0]}</span>`;
//                    }
//                });

//                slotList += `</div>`;

//            }
//            if (eve[i].length != 0) {
//                slotList += `<div class="c-day-session__header">
//                 <span> Evening </span>
//                 <span> (${eve[i].length} slots) </span>
//                 </div>`;

//                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//                (eve[i]).forEach(element => {
//                    const b = element.split(',');
//                    if (b[1] === "True") {
//                        slotList += `<span class="booked">${b[0]}</span>`;
//                    }
//                    else {
//                        slotList += `<span>${b[0]}</span>`;
//                    }
//                });

//                slotList += `</div>`;
//            }
//            slotList += `</div>`;
//        }
//    }

//    document.getElementById("slot-container").innerHTML = slotList;

//    fillSlots();
//}

//const fillSlots = (e = 0) => {
//    // console.log("fill slots");
//    let sld = document.querySelectorAll("#week-tab .nav-item .active")[0];

//    console.log(e);
//    if (e != 0) {
//        sld = e.target;
//    }
//    // let sld=document.querySelector("#week-tab .nav-item .active");
//    let sl = document.querySelectorAll("#slot-container .tab-pane");
//    console.log(sld);
//    for (let i = 0; i < sl.length; i++) {
//        sl[i].classList.remove("active");
//        sl[i].classList.remove("show");

//        if (sld.dataset.forDay == sl[i].dataset.forSlot) {
//            sl[i].classList.add("active");
//            sl[i].classList.add("show");
//            showMonth();
//        }
//    }
//}

//const fillSchedule = (e = 0) => {

//    let sch;
//    let mode = document.getElementById("mode").value;
//    if (e == 0) {
//        sch = getSchedule(mode, new Date().toDateString());
//    }
//    else {
//        sch = getSchedule(mode, new Date(e.target.dataset.forDay).toDateString());
//    }
//    document.getElementById("mode").value = sch.mode;
//    document.getElementById("duration").value = sch.duration;
//    document.getElementById("start-time").value = sch.st;
//    document.getElementById("end-time").value = sch.et;
//    document.getElementById("b1-start-time").value = sch.b1st;
//    document.getElementById("b1-start-time").value = sch.b1st;
//    document.getElementById("b2-start-time").value = sch.b2st;
//    document.getElementById("b2-end-time").value = sch.b2et;
//    let checks = document.getElementsByClassName("checks");
//    console.log(checks);
//    let repeat = document.getElementById("repeat");
//    if (sch.repeat == true) {
//        repeat.selectedIndex = 2;
//        let count = 0;
//        if (sch.monday == true) {
//            checks[0].checked = true;
//            count++;
//        }
//        if (sch.tuesday == true) {
//            checks[1].checked = true;
//            count++;
//        }
//        if (sch.wednesday == true) {
//            checks[2].checked = true;
//            count++;
//        }
//        if (sch.thursday == true) {
//            checks[3].checked = true;
//            count++;
//        }
//        if (sch.friday == true) {
//            checks[4].checked = true;
//            count++;
//        }
//        if (sch.saturday == true) {
//            checks[5].checked = true;
//            count++;
//        }
//        if (sch.sunday == true) {
//            checks[6].checked = true;
//            count++;
//        }

//        if (count == 7) {
//            repeat.selectedIndex = 1;
//        }
//    }
//    else {
//        repeat.selectedIndex = 0;
//    }
//}

//export { getSchedule, getSlot, fillSchedule, fillDays, fillSlots };
const getSchedule = (mode = 'Offline', d = 0) => {

    // const url = `https://localhost:5001/?mode=${mode}&Date=${d}`;
    // const res = await fetch(url)
    // .catch(err=> {
    //     console.log(err);
    // });

    let sch = null;
    // if(res.status == 200){
    //     sch = await res.json();
    // }

    console.log("d", d, "mode", mode);
    sch = {
        st: "9:00 AM",
        et: "6:00 PM",
        b1st: "12:00 PM",
        b1et: "12:30 PM",
        b2st: "4:00 PM",
        b2et: "4:30 PM",
        repeat: true,
        mode: "Offline",
        duration: "20",
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
    };
    return sch;
}

const getSlot =  (mode = 'Offline', d = 0, w = 0, m = 0) => {

    if (d == 0) {
        d = new Date().toDateString();
    }
    else {
        d = new date(e.target.dataset.forDay).toDateString();
    }

    console.log("getslot", mode, d, w, m);

    let slots = [
        {
            "date": "Sun 27, March 2022",
            "morning": [
                "09 : 00 AM,True",
                "09 : 30 AM,True",
                "10 : 00 AM,False",
                "10 : 30 AM,False",
                "11 : 00 AM,False",
                "11 : 30 AM,False"
            ],
            "afternoon": [
                "01 : 00 PM,False",
                "01 : 30 PM,False",
                "02 : 00 PM,False",
                "02 : 30 PM,False",
                "03 : 00 PM,False",
                "03 : 30 PM,False",
                "04 : 00 PM,False",
                "04 : 30 PM,True",
                "12 : 00 PM,False",
                "12 : 30 PM,False"
            ],
            "evening": [
                "05 : 00 PM,False",
                "05 : 30 PM,False",
                "06 : 00 PM,False",
                "06 : 30 PM,False",
                "07 : 00 PM,True",
                "07 : 30 PM,False",
                "08 : 00 PM,False",
                "08 : 30 PM,False"
            ]
        },
        {
            "date": "Mon 28, March 2022",
            "morning": [],
            "afternoon": [],
            "evening": []
        },
        {
            "date": "Tue 29, March 2022",
            "morning": [
                "09 : 00 AM,False",
                "09 : 30 AM,False",
                "10 : 00 AM,False",
                "10 : 30 AM,False",
                "11 : 00 AM,False",
                "11 : 30 AM,False"
            ],
            "afternoon": [
                "01 : 00 PM,False",
                "01 : 30 PM,False",
                "02 : 00 PM,False",
                "02 : 30 PM,False",
                "03 : 00 PM,False",
                "03 : 30 PM,False",
                "04 : 00 PM,False",
                "04 : 30 PM,False",
                "12 : 00 PM,False",
                "12 : 30 PM,False"
            ],
            "evening": [
                "05 : 00 PM,False",
                "05 : 30 PM,False",
                "06 : 00 PM,False",
                "06 : 30 PM,False",
                "07 : 00 PM,False",
                "07 : 30 PM,False",
                "08 : 00 PM,False",
                "08 : 30 PM,False"
            ]
        },
        {
            "date": "Wed 30, March 2022",
            "morning": [],
            "afternoon": [],
            "evening": []
        },
        {
            "date": "Thu 31, March 2022",
            "morning": [],
            "afternoon": [],
            "evening": []
        },
        {
            "date": "Fri 01, April 2022",
            "morning": [],
            "afternoon": [],
            "evening": []
        },
        {
            "date": "Sat 02, April 2022",
            "morning": [],
            "afternoon": [],
            "evening": []
        }
    ];

    //const url = "https://localhost:5001/Doctor/GetSlots?Date=" + d + "&Mode=" + mode + "&Week=" + w + "&Month=" + m;
    //const res = await fetch(url)
    //    .catch(err => {
    //        console.log(err);
    //    });

   

    //if (res.status == 200) {
    //    slots = await res.json();
    //}
    //console.log(slots);

    //console.log("2");
    //var res = fetch(url)
    //    .then(
    //        function (response) {
    //            if (response.status !== 200) {
    //                console.log('Looks like there was a problem. Status Code: ' +
    //                    response.status);
    //                return;
    //            }

    //            // Examine the text in the response

    //            response.json().then(function (data) {
    //                slots = data;
    //                console.log("thisone",data);
    //                return data;
    //            });
    //        }
    //    )
    //    .catch(function (err) {
    //        console.log('Fetch Error :-S', err);
    //    });

   

    //console.log(res);

    //console.log(res.data.json());
    //if (res.status == 200) {
    //    slots = await res.json();
    //}
    console.log(slots);
    return slots;
}

const fillDays =   (next = false, index = null, w = 0, m = 0, i = 0) => {

    let data = getSlot();
    console.log(data)
    let days = [], mor = [], aft = [], eve = [];
    let slotList = "", dayList = "";

    const weekTab = document.getElementById("week-tab");
    weekTab.innerHTML = "";

    data.forEach(element => {
        days.push(element.date);
        mor.push(element.morning);
        aft.push(element.afternoon);
        eve.push(element.evening);
    });

    console.log(days);
    var okay = 0;

    for (let i = 0; i < days.length; i++) {
        const x = days[i].split(',');
        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
        const t = d.substring(4);
        // console.log(t);
        const date = new Date();
        const today = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();
        // console.log(today);
        // console.log(next);

        if (next === true) {
            if (1 == d.substring(4, 5)) {
                console.log("date 1");
                dayList += `<li class="nav-item">
                <span class="nav-link active" data-toggle="tab" data-for-day="${d}" >
                ${x[0]}
                </span>
            </li>`;
                flag = true;
                continue;
            }
        }

        if (today == t) {
            dayList += `<li class="nav-item">
            <span class="nav-link active today" data-toggle="tab" data-for-day="${d}" >
            ${x[0]}
            </span>
            </li>`;
            // flag = true;
            okay = 1;
        }

        // else if(i==0){
        //     console.log( "i=0",today);
        //     console.log("i=0", t);
        //     if(today != t){
        //         dayList += `<li class="nav-item">
        //     <span class="nav-link" data-toggle="tab" data-for-day="${d}" >
        //     ${x[0]}
        //     </span>
        // </li>`; 
        //     }
        //     else{
        //         dayList += `<li class="nav-item">
        //     <span class="nav-link active" data-toggle="tab" data-for-day="${d}" >
        //     ${x[0]}
        //     </span>
        // </li>`;          
        //     }
        // }

        else {
            dayList += `<li class="nav-item">
            <span class="nav-link" data-toggle="tab" data-for-day="${d}" >
            ${x[0]}
            </span>
        </li>`;
        }


    };
    console.log("This", index);
    weekTab.innerHTML = dayList;
    
        if (index != null) {
            if (index.trim() == "Sun") {
                console.log("This", index);

                //document.querySelectorAll("#week-tab .nav-item .nav-link")[0].classList.add("active");
            }
        }
    
    for (let i = 0; i < days.length; i++) {
        const x = days[i].split(',');
        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

        if (i === 0) {
            slotList += `<div class="tab-pane fade p-3 " data-for-slot="${d}" role="tabpanel">`;
        }
        else {
            slotList += `<div class="tab-pane fade p-3" data-for-slot="${d}" role="tabpanel">`;
        }

        if (mor[i].length == 0 && aft[i].length == 0 && eve[i].length == 0) {
            slotList += `<div class="empty-card">
            <img src="images/cell-schedule.png"> 
            <span> Schedule is empty </span>
            </div>`;
            slotList += `</div>`;
        }
        else {

            if (mor[i].length != 0) {
                slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${mor[i].length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (mor[i]).forEach(element => {
                    const b = element.split(',');
                    if (b[1] === "True") {
                        slotList += `<span class="booked">${b[0]}</span>`;
                    }
                    else {
                        slotList += `<span>${b[0]}</span>`;
                    }
                });

                slotList += `</div>`;
            }
            if (aft[i].length != 0) {
                slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${aft[i].length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (aft[i]).forEach(element => {
                    const b = element.split(',');
                    if (b[1] === "True") {
                        slotList += `<span class="booked">${b[0]}</span>`;
                    }
                    else {
                        slotList += `<span>${b[0]}</span>`;
                    }
                });

                slotList += `</div>`;

            }
            if (eve[i].length != 0) {
                slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${eve[i].length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (eve[i]).forEach(element => {
                    const b = element.split(',');
                    if (b[1] === "True") {
                        slotList += `<span class="booked">${b[0]}</span>`;
                    }
                    else {
                        slotList += `<span>${b[0]}</span>`;
                    }
                });

                slotList += `</div>`;
            }
            slotList += `</div>`;
        }
    }

    document.getElementById("slot-container").innerHTML = slotList;
    return 0;
}

const fillSlots = (e = 0) => {
    // console.log("fill slots");
    console.log(e);

    let sld = document.querySelectorAll("#week-tab .nav-item .active");

    if (e != 0) {
        sld = e.target;
    }
    // let sld=document.querySelector("#week-tab .nav-item .active");
    let sl = document.querySelectorAll("#slot-container .tab-pane");
    console.log(sld);
    for (let i = 0; i < sl.length; i++) {
        sl[i].classList.remove("active");
        sl[i].classList.remove("show");

        if (sld.dataset.forDay == sl[i].dataset.forSlot) {
            sl[i].classList.add("active");
            sl[i].classList.add("show");
            showMonth();
        }
    }
}

const showMonth = (e = 0) => {
    let m = (document.querySelectorAll("#week-tab .nav-item .active"));
    console.log(m);
    if (e != 0) {
        m = e.target.dataset.forDay;
    }
    m = m.split('-');
    m = m[2] + ' ' + m[3];
    console.log(m);
    document.getElementById("month-inner").innerHTML = m;
}

const fillSchedule = (e = 0) => {

    let sch;
    let mode = document.getElementById("mode").value;
    if (e == 0) {
        sch = getSchedule(mode, new Date().toDateString());
    }
    else {
        sch = getSchedule(mode, new Date(e.target.dataset.forDay).toDateString());
    }
    document.getElementById("mode").value = sch.mode;
    document.getElementById("duration").value = sch.duration;
    document.getElementById("start-time").value = sch.st;
    document.getElementById("end-time").value = sch.et;
    document.getElementById("b1-start-time").value = sch.b1st;
    document.getElementById("b1-start-time").value = sch.b1st;
    document.getElementById("b2-start-time").value = sch.b2st;
    document.getElementById("b2-end-time").value = sch.b2et;
    let checks = document.getElementsByClassName("checks");
    console.log(checks);
    let repeat = document.getElementById("repeat");
    if (sch.repeat == true) {
        repeat.selectedIndex = 2;
        let count = 0;
        if (sch.monday == true) {
            checks[0].checked = true;
            count++;
        }
        if (sch.tuesday == true) {
            checks[1].checked = true;
            count++;
        }
        if (sch.wednesday == true) {
            checks[2].checked = true;
            count++;
        }
        if (sch.thursday == true) {
            checks[3].checked = true;
            count++;
        }
        if (sch.friday == true) {
            checks[4].checked = true;
            count++;
        }
        if (sch.saturday == true) {
            checks[5].checked = true;
            count++;
        }
        if (sch.sunday == true) {
            checks[6].checked = true;
            count++;
        }

        if (count == 7) {
            repeat.selectedIndex = 1;
        }
    }
    else {
        repeat.selectedIndex = 0;
    }
}

export { getSchedule, getSlot, fillSchedule, fillDays, fillSlots, showMonth };