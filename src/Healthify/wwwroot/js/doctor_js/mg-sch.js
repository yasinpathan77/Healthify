import { fillUserDetails } from "../../js/user_js/user-panel.js";
//const fillSlots = async (mode, date) => {

//    console.log("date: ", date);

//    // let url = "https://localhost:5001/Doctor/GetSlots?Date=" + date + "&mode=" + mode;
//    // let res = await fetch(url);
//    //if (res.status == 200) {
//    //    data = res.json();
//    //     console.log(data);

//    let data = {
//        "morning": [
//            "09 : 00 AM,True",
//            "09 : 30 AM,True",
//            "10 : 00 AM,False",
//            "10 : 30 AM,False",
//            "11 : 00 AM,False",
//            "11 : 30 AM,False"
//        ],
//        "afternoon": [
//            "01 : 00 PM,False",
//            "01 : 30 PM,False",
//            "02 : 00 PM,False",
//            "02 : 30 PM,False",
//            "03 : 00 PM,False",
//            "03 : 30 PM,False",
//            "04 : 00 PM,False",
//            "04 : 30 PM,True",
//            "12 : 00 PM,False",
//            "12 : 30 PM,False"
//        ],
//        "evening": [
//            "05 : 00 PM,False",
//            "05 : 30 PM,False",
//            "06 : 00 PM,False",
//            "06 : 30 PM,False",
//            "07 : 00 PM,True",
//            "07 : 30 PM,False",
//            "08 : 00 PM,False",
//            "08 : 30 PM,False"
//        ]
//    };

//    let slotList = "";

//    slotList += `<div class="tab-pane fade p-3 active show" role="tabpanel">`;

//    if (data.morning.length == 0 && data.afternoon.length == 0 && data.evening.length == 0) {
//        slotList += `<div class="empty-card">
//        <img src="../../images/doctor panel/cell-schedule.png"> 
//        <span> Schedule is empty </span>
//        </div>`;
//        slotList += `</div>`;
//    }
//    else {

//        if (data.morning.length != 0) {
//            slotList += `<div class="c-day-session__header">
//            <span> Morning </span>
//            <span> (${data.morning.length} slots) </span>
//            </div>`;

//            slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//            (data.morning).forEach(element => {
//                const b = element.split(',');
//                if (b[1] === "True") {
//                    slotList += `<span class="booked">${b[0]}</span>`;
//                }
//                else {
//                    slotList += `<span>${b[0]}</span>`;
//                }
//            });

//            slotList += `</div>`;
//        }
//        if (data.afternoon.length != 0) {
//            slotList += `<div class="c-day-session__header">
//            <span> Afternoon </span>
//            <span> (${data.afternoon.length} slots) </span>
//            </div>`;

//            slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//            (data.afternoon).forEach(element => {
//                const b = element.split(',');
//                if (b[1] === "True") {
//                    slotList += `<span class="booked">${b[0]}</span>`;
//                }
//                else {
//                    slotList += `<span>${b[0]}</span>`;
//                }
//            });

//            slotList += `</div>`;

//        }
//        if (data.evening.length != 0) {
//            slotList += `<div class="c-day-session__header">
//            <span> Evening </span>
//            <span> (${data.evening.length} slots) </span>
//            </div>`;

//            slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//            (data.evening).forEach(element => {
//                const b = element.split(',');
//                if (b[1] === "True") {
//                    slotList += `<span class="booked">${b[0]}</span>`;
//                }
//                else {
//                    slotList += `<span>${b[0]}</span>`;
//                }
//            });

//            slotList += `</div>`;
//        }
//        slotList += `</div>`;
//    }

//    document.getElementById("slot-container").innerHTML = slotList;

//    let mon = date;
//    mon = mon.split(' ');
//    mon = mon[1] + ' ' + mon[3];
//    console.log(mon);
//    document.getElementById("month-inner").innerHTML = `${mon}`;
//     //}




//    // let mon = document.querySelector("#week-tab li .active");
//    // console.log(mon);
//    // mon = mon.dataset.forDay;
//    // mon = mon.split('-');
//    // mon = mon[1] + ' ' + mon[3];
//    // console.log(mon);
//    // document.getElementById("month-inner").innerHTML = `${mon}`;

//    // let url = `https://localhost:5001/Doctor/GetSlots?Date=${date}&mode=${mode}`;
//    // let res = await fetch(url);

//    // if(res.status == 200){
//    //     let data = await res.json();

//    // let data = [
//    //     {
//    //         "date": "Sun 01, May 2022",
//    //         "morning": [
//    //             "09 : 00 AM,True",
//    //             "09 : 30 AM,True",
//    //             "10 : 00 AM,False",
//    //             "10 : 30 AM,False",
//    //             "11 : 00 AM,False",
//    //             "11 : 30 AM,False"
//    //         ],
//    //         "afternoon": [
//    //             "01 : 00 PM,False",
//    //             "01 : 30 PM,False",
//    //             "02 : 00 PM,False",
//    //             "02 : 30 PM,False",
//    //             "03 : 00 PM,False",
//    //             "03 : 30 PM,False",
//    //             "04 : 00 PM,False",
//    //             "04 : 30 PM,True",
//    //             "12 : 00 PM,False",
//    //             "12 : 30 PM,False"
//    //         ],
//    //         "evening": [
//    //             "05 : 00 PM,False",
//    //             "05 : 30 PM,False",
//    //             "06 : 00 PM,False",
//    //             "06 : 30 PM,False",
//    //             "07 : 00 PM,True",
//    //             "07 : 30 PM,False",
//    //             "08 : 00 PM,False",
//    //             "08 : 30 PM,False"
//    //         ]
//    //     },
//    //     {
//    //         "date": "Mon 02, May 2022",
//    //         "morning": [],
//    //         "afternoon": [],
//    //         "evening": []
//    //     },
//    //     {
//    //         "date": "Tue 03, May 2022",
//    //         "morning": [
//    //             "09 : 00 AM,False",
//    //             "09 : 30 AM,False",
//    //             "10 : 00 AM,False",
//    //             "10 : 30 AM,False",
//    //             "11 : 00 AM,False",
//    //             "11 : 30 AM,False"
//    //         ],
//    //         "afternoon": [
//    //             "01 : 00 PM,False",
//    //             "01 : 30 PM,False",
//    //             "02 : 00 PM,False",
//    //             "02 : 30 PM,False",
//    //             "03 : 00 PM,False",
//    //             "03 : 30 PM,False",
//    //             "04 : 00 PM,False",
//    //             "04 : 30 PM,False",
//    //             "12 : 00 PM,False",
//    //             "12 : 30 PM,False"
//    //         ],
//    //         "evening": [
//    //             "05 : 00 PM,False",
//    //             "05 : 30 PM,False",
//    //             "06 : 00 PM,False",
//    //             "06 : 30 PM,False",
//    //             "07 : 00 PM,False",
//    //             "07 : 30 PM,False",
//    //             "08 : 00 PM,False",
//    //             "08 : 30 PM,False"
//    //         ]
//    //     },
//    //     {
//    //         "date": "Wed 04, May 2022",
//    //         "morning": [],
//    //         "afternoon": [],
//    //         "evening": []
//    //     },
//    //     {
//    //         "date": "Thu 05, May 2022",
//    //         "morning": [],
//    //         "afternoon": [],
//    //         "evening": []
//    //     },
//    //     {
//    //         "date": "Fri 06, May 2022",
//    //         "morning": [],
//    //         "afternoon": [],
//    //         "evening": []
//    //     },
//    //     {
//    //         "date": "Sat 07, May 2022",
//    //         "morning": [],
//    //         "afternoon": [],
//    //         "evening": []
//    //     }
//    // ];

//    // let slotList = "", slotList2 = "";
//    // let d = new Date();
//    // let m = d.getMonth()+1;
//    // let y = d.getFullYear();
//    // let ind = d.getDay()+1;
//    // let j=0;
//    // let mor = aft = eve = [];

//    // for (let i = 0; i < 7; i++) {
//    //     mor.push(data[i].morning);
//    //     aft.push(data[i].afternoon);
//    //     eve.push(data[i].evening);
//    // }

//    // for (let i = ind; i <= 7; i++, j++) {

//    //     let x = d.getDate() + j;

//    //     x = new Date(`${m}/${x}/${y}`).toDateString();
//    //     let t = x;

//    //     x = x.split(' ');
//    //     let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
//    //     let s = x;

//    //     if(parseInt(x[2]) < 10){
//    //         x = x[0] + ' ' + x[2].substring(1,2);
//    //         s = s[0] + '-' + s[2].substring(1,2);
//    //     }
//    //     else{
//    //         x = x[0] + ' ' + x[2];
//    //         s = s[0] + '-' + s[2];
//    //     }

//    //     slotList += `<div class="tab-pane fade p-3" id="${i}" role="tabpanel">`;

//    //     if (mor[j].length == 0 && aft[j].length == 0 && eve[j].length == 0) {
//    //         slotList += `<div class="empty-card">
//    //         <img src="../../images/doctor panel/cell-schedule.png"> 
//    //         <span> Schedule is empty </span>
//    //         </div>`;
//    //         slotList += `</div>`;
//    //     }
//    //     else {

//    //         if (mor[j].length != 0) {
//    //             slotList += `<div class="c-day-session__header">
//    //             <span> Morning </span>
//    //             <span> (${mor[j].length} slots) </span>
//    //             </div>`;

//    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (mor[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList += `</div>`;
//    //         }
//    //         if (aft[j].length != 0) {
//    //             slotList += `<div class="c-day-session__header">
//    //             <span> Afternoon </span>
//    //             <span> (${aft[j].length} slots) </span>
//    //             </div>`;

//    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (aft[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList += `</div>`;

//    //         }
//    //         if (eve[j].length != 0) {
//    //             slotList += `<div class="c-day-session__header">
//    //             <span> Evening </span>
//    //             <span> (${eve[j].length} slots) </span>
//    //             </div>`;

//    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (eve[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList += `</div>`;
//    //         }
//    //         slotList += `</div>`;
//    //     }
//    // }

//    // for (let i = 0; i < ind-1; i++, j++) {

//    //     let x = d.getDate() + j;

//    //     x = new Date(`${m}/${x}/${y}`).toDateString();
//    //     let t = x;

//    //     x = x.split(' ');
//    //     let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
//    //     let s = x;

//    //     if(parseInt(x[2]) < 10){
//    //         x = x[0] + ' ' + x[2].substring(1,2);
//    //         s = s[0] + '-' + s[2].substring(1,2);
//    //     }
//    //     else{
//    //         x = x[0] + ' ' + x[2];
//    //         s = s[0] + '-' + s[2];
//    //     }

//    //     slotList2 += `<div class="tab-pane fade p-3" id="${i}" role="tabpanel">`;

//    //     if (mor[j].length == 0 && aft[j].length == 0 && eve[j].length == 0) {
//    //         slotList2 += `<div class="empty-card">
//    //         <img src="../../images/doctor panel/cell-schedule.png"> 
//    //         <span> Schedule is empty </span>
//    //         </div>`;
//    //         slotList2 += `</div>`;
//    //     }
//    //     else {

//    //         if (mor[j].length != 0) {
//    //             slotList2 += `<div class="c-day-session__header">
//    //             <span> Morning </span>
//    //             <span> (${mor[j].length} slots) </span>
//    //             </div>`;

//    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (mor[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList2 += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList2 += `</div>`;
//    //         }
//    //         if (aft[j].length != 0) {
//    //             slotList2 += `<div class="c-day-session__header">
//    //             <span> Afternoon </span>
//    //             <span> (${aft[j].length} slots) </span>
//    //             </div>`;

//    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (aft[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList2 += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList2 += `</div>`;

//    //         }
//    //         if (eve[j].length != 0) {
//    //             slotList2 += `<div class="c-day-session__header">
//    //             <span> Evening </span>
//    //             <span> (${eve[j].length} slots) </span>
//    //             </div>`;

//    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

//    //             (eve[j]).forEach(element => {
//    //                 const b = element.split(',');
//    //                 if (b[1] === "True") {
//    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
//    //                 }
//    //                 else {
//    //                     slotList2 += `<span>${b[0]}</span>`;
//    //                 }
//    //             });

//    //             slotList2 += `</div>`;
//    //         }
//    //         slotList2 += `</div>`;
//    //     }
//    // }

//    // document.getElementById("slot-container").innerHTML = slotList2 + slotList;

//    // let sel = document.querySelectorAll("#week-tab li a");
//    // let sel2 = document.querySelectorAll("#slot-container .fade");

//    // let index = -1;
//    // for (let i = 0; i < 7; i++) {
//    //     if(new Date(sel[i].dataset.forDay).toDateString() == new Date().toDateString()){
//    //         index = i;
//    //         break;
//    //     }
//    // }

//    // if(index != -1){
//    //     sel2[index].classList.add('active');
//    //     sel2[index].classList.add('show');
//    // }

//    // for (let i = 0; i < sel.length; i++) {

//    //     sel[i].addEventListener("click", (e)=>{
//    //         for (let i = 0; i < sel.length; i++) {
//    //             sel2[i].classList.remove('active');
//    //             sel2[i].classList.remove('show');            
//    //         }

//    //         sel2[i].classList.add('active');
//    //         sel2[i].classList.add('show');            
//    //     });
//    // }
//    // }

//}



//const fillDays = () => {

//    let d = new Date();
//    let m = d.getMonth() + 1;
//    let y = d.getFullYear();
//    let ind = d.getDay() + 1;

//    console.log(ind);

//    let dayList = "", slotList = "", dayList2 = "", slotList2 = "";

//    let j = 0;
//    for (let i = ind; i <= 7; i++, j++) {
//        let x = d.getDate() + j;

//        x = new Date(`${m}/${x}/${y}`).toDateString();
//        let t = x;

//        x = x.split(' ');
//        let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
//        let s = x;

//        if (parseInt(x[2]) < 10) {
//            x = x[0] + ' ' + x[2].substring(1, 2);
//            s = s[0] + '-' + s[2].substring(1, 2);
//        }
//        else {
//            x = x[0] + ' ' + x[2];
//            s = s[0] + '-' + s[2];
//        }

//        if (t == new Date().toDateString()) {
//            console.log("object");
//            dayList += `<li class="nav-item today active">
//            <a class="nav-link today active" data-toggle="tab" data-for-day="${v}" href='#${i - 1}' role="tab">
//            ${x}
//            </a>
//            </li>`;
//        }
//        else {
//            dayList += `<li class="nav-item">
//            <a class="nav-link" data-toggle="tab" data-for-day="${v}" href='#${i - 1}' role="tab">
//            ${x}
//            </a>
//            </li>`;
//        }
//    }

//    console.log("j:  ", j);
//    for (let i = 0; i < ind - 1; i++, j++) {
//        let x = d.getDate() + j;

//        x = new Date(`${m}/${x}/${y}`).toDateString();
//        let t = x;

//        x = x.split(' ');
//        let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
//        let s = x;

//        if (parseInt(x[2]) < 10) {
//            x = x[0] + ' ' + x[2].substring(1, 2);
//            s = s[0] + '-' + s[2].substring(1, 2);
//        }
//        else {
//            x = x[0] + ' ' + x[2];
//            s = s[0] + '-' + s[2];
//        }

//        if (t == new Date().toDateString()) {
//            dayList2 += `<li class="nav-item">
//            <a class="nav-link today active" data-toggle="tab" data-for-day="${v}" href='#${i}' role="tab">
//            ${x}
//            </a>
//            </li>`;
//        }
//        else {
//            dayList2 += `<li class="nav-item">
//            <a class="nav-link" data-toggle="tab" data-for-day="${v}" href='#${i}' role="tab">
//            ${x}
//            </a>
//            </li>`;
//        }
//    }

//    document.getElementById("week-tab").innerHTML = dayList2 + dayList;
//}

//const getStart = async (duration) => {

//    console.log("duration: ", duration);
//    let url = "https://localhost:5001/Doctor/GetTime?Duration=" + duration;
//    let res = await fetch(url);
//    let data = await res.json();
//    let opt = "";
//    console.log(data);
//    for (let i = 0; i < data.length; i++) {

//        opt += `<option value= "${data[i]}" > ${data[i]} </option>`
//    }

//    document.getElementById("start-time").innerHTML = opt;
//    //console.log(opt);
//}

//const load = (mode = 'Offline') => {

//    fillDays();
//    let date = new Date().toDateString();
//    fillSlots(mode, date);

//    getStart('10');
//}

//document.onload = load();

//document.getElementById("mode").addEventListener("change", (e) => {
//    fillSlots(e.target.value);
//});

//let week = document.getElementById("week-tab");

//if (week != null) {
//    for (let i = 0; i < 7; i++) {
//        document.querySelectorAll("#week-tab li a")[i].addEventListener("click", (e) => {

//            let sel = document.querySelectorAll("#week-tab li a");

//            for (let i = 0; i < sel.length; i++) {
//                sel[i].classList.remove('active');
//            }

//            e.preventDefault();

//            let mode = document.getElementById("mode").value;
//            let d = e.target.dataset.forDay;
//            d = new Date(d).toDateString();

//            let h = e.target.href;
//            let ind = h.indexOf('#');
//            h = h.substring(ind + 1, h.length);
//            console.log(h);
//            fillSlots(mode, d);
//        });

//    }
//}

//const showSchedule = async (date, mode, e) => {
//    let url = "https://localhost:5001/";
//    let res = await fetch(url);

//    if (res.status == 200) {

//        let data = await res.json();
//        // let data = [
//        //     {
//        //         start: '9:00 AM',
//        //         end: '7:00 PM',
//        //         b1start: '12:00 PM',
//        //         b1end: '1:00 PM',
//        //         b2start: '4:00 PM',
//        //         b2end: '4:30 PM',
//        //         repeat: 'None'
//        //     }
//        // ];

//        let sch = `<ul style="list-style-type: none;">`;

//        for (let i = 0; i < data.length; i++) {
//            sch += ` <li> <p> Schedule ${i + 1}: </p>
//        <p style="font-size:13.5px;"> Timings: ${data[i].start} - ${data[i].end} Repeat: ${data[i].repeat} </p>
//        <p style="font-size:13.5px;"> Break 1: ${data[i].b1start} - ${data[i].b1end} Break 2: ${data[i].b2start} - ${data[i].b2end} </p>
//        </li>
//        `;
//        }
//        sch += `</ul>`;
//        document.getElementsByClassName("modal-body")[0].innerHTML = sch;

//        e.target.setAttribute("data-target", "#exampleModalCenter");
//    }
//};

//document.getElementsByClassName("today-btn-style")[0].addEventListener("click", (e) => {
//    e.preventDefault();

//    let date = document.querySelector("#week-tab li .active").dataset.forDay;
//    date = new Date(date).toDateString();
//    let mode = document.getElementById("mode").value;

//    showSchedule(date, mode, e);
//});

//document.getElementById("duration").addEventListener("change", (e) => {
//    let dur = e.target.value;
//    getStart(dur);
//});

//document.getElementById("start-time").addEventListener("change", (e) => {
//    let dur = document.getElementById("duration").value;
//    let st = e.target.value;

//    console.log(st);

//    getEnd(dur, st);
//});

//document.getElementById("end-time").addEventListener("change", (e) => {
//    let dur = document.getElementById("duration").value;
//    let st = document.getElementById("start-time").value;
//    let end = e.target.value;

//    getB1Start(dur, st, end);
//});

//document.getElementById("b1-start-time").addEventListener("change", (e) => {
//    let dur = document.getElementById("duration").value;
//    let b1st = document.getElementById("b1-start-time").value;
//    let end = document.getElementById("end-time").value;
//    getB1End(dur, b1st, end);
//});

//document.getElementById("b1-end-time").addEventListener("change", (e) => {
//    let dur = document.getElementById("duration").value;
//    let b1st = document.getElementById("b1-end-time").value;
//    let end = document.getElementById("end-time").value;
//    getB2Start(dur, b1st, end);
//});

//document.getElementById("b2-start-time").addEventListener("change", (e) => {
//    let dur = document.getElementById("duration").value;
//    let b1end = document.getElementById("b2-start-time").value;
//    let end = document.getElementById("end-time").value;
//    getB2End(dur, b1end, end);
//});

//const getEnd = async (duration, start) => {
//    let a = document.getElementById("start-time");
//    console.log(a);
//    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + start;
//    let res = await fetch(url);

//    let data = await res.json();
//    let opt = "";

//    for (let i = 0; i < data.length; i++) {
//        opt += `<option value="${data[i]}"> ${data[i]} </option>`
//    }

//    document.getElementById("end-time").innerHTML = opt;
//}

//const getB1Start = async (duration, start, end) => {
//    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + start + "&endtime=" + end;
//    let res = await fetch(url);

//    let data = await res.json();
//    let opt = "";

//    for (let i = 0; i < data.length; i++) {
//        opt += `<option value="${data[i]}"> ${data[i]} </option>`
//    }

//    document.getElementById("b1-start-time").innerHTML = opt;
//}

//const getB1End = async (duration, b1start, end) => {
//    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b1start + "&endtime=" + end;
//    let res = await fetch(url);

//    let data = await res.json();
//    let opt = "";

//    for (let i = 0; i < data.length; i++) {
//        opt += `<option value="${data[i]}"> ${data[i]} </option>`
//    }

//    document.getElementById("b1-end-time").innerHTML = opt;
//}

//const getB2Start = async (duration, b1end, end) => {
//    console.log(b1end);
//    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b1end + "&endtime=" + end;
//    let res = await fetch(url);

//    let data = await res.json();
//    let opt = "";

//    for (let i = 0; i < data.length; i++) {
//        opt += `<option value="${data[i]}"> ${data[i]} </option>`
//    }

//    document.getElementById("b2-start-time").innerHTML = opt;
//}

//const getB2End = async (duration, b2start, end) => {
//    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b2start + "&endtime=" + end;
//    let res = await fetch(url);

//    let data = await res.json();
//    let opt = "";

//    for (let i = 0; i < data.length; i++) {
//        opt += `<option value="${data[i]}"> ${data[i]} </option>`
//    }

//    document.getElementById("b2-end-time").innerHTML = opt;
//}


//let repeat = document.getElementById("repeat");
//repeat.onchange = () => {
//    //console.log("Hello");
//    if (repeat.value == "Everyweek") {
//        console.log("Hello");
//        let ch = document.getElementsByClassName("checks");
//        console.log(ch);
//        for (let i = 0; i < 7; i++) {
//            ch[i].checked = true;
//        }
//    }
//    else {
//        let ch = document.getElementsByClassName("checks");
//        for (let i = 0; i < 7; i++) {
//            ch[i].checked = false;
//        }
//    }
//}

//document.getElementById("apply").addEventListener("click", async(e) => {
//    e.preventDefault();

//    let mode = document.getElementById("mode").value;
//    let duration = document.getElementById("duration").value;
//    let st = document.getElementById("start-time").value;
//    let end = document.getElementById("end-time").value;
//    let b1st = document.getElementById("b1-start-time").value;
//    let b1end = document.getElementById("b1-end-time").value;
//    let b2st = document.getElementById("b2-start-time").value;
//    let b2end = document.getElementById("b2-end-time").value;
//    let date = document.querySelector("#week-tab li .active").dataset.forDay;
//    date = date.substring(4, date.length);
//    console.log(end);
//    console.log(date);
//    date = new Date(date).toDateString();
//    console.log(date);
//    //date = new Date(date).toISOString();
//    //console.log(date);


//    //let i = date.indexOf("T");
//    //date = date.substring(0, i);
//    //date = date.replaceAll('-', '/');

//    let repeat = document.getElementById("repeat").value;

//    if (repeat == 'None') {
//        repeat = false;
//    }
//    else {
//        repeat = true;
//    }

//    let data = {
//        StartTime: st,
//        EndTime: end,
//        Break1StartTime: b1st,
//        Break1EndTime: b1end,
//        Break2StartTime: b2st,
//        Break2EndTime: b2end,
//        Repeat: false,
//        StartDate: date,
//        Mode: mode,
//        Duration: duration,
//        Sunday: false,
//        Monday: false,
//        Tuesday: false,

//        Wednesday: false,
//        Thursday: false,
//        Friday: false,

//        Saturday: false

//    }

//    //{
//    //    "StartDate" : "2022/05/06",
//    //        "Mode" : "Offline",
//    //            "Duration" : "30",
//    //                "StartTime" : "9:00 AM",
//    //                    "EndTime" : "9:00 PM",
//    //                        "Break1StartTime" : "1:00 PM",
//    //                            "Break1EndTime" : "2:00 PM",
//    //                                "Break2StartTime" : "5:00 PM",
//    //                                    "Break2EndTime" : "6:00 PM",
//    //                                        "Repeat" : "True",
//    //                                            "Sunday" : "True",
//    //                                                "Monday" : "False",
//    //                                                    "Tuesday" : "True",
//    //                                                        "Wednesday" : "False",
//    //                                                            "Thursday" : "False",
//    //                                                                "Friday" : "False",
//    //                                                                    "Saturday" : "False"
//    //}

//    let ch = document.getElementsByClassName("checks");

//    if (ch[0].checked) {
//        data.Sunday = true;
//        data.Repeat = true;

//    }
//    if (ch[1].checked) {
//        data.Monday = true;
//        data.Repeat = true;
        
//    }
//    if (ch[2].checked) {
//        data.Tuesday = true;
//        data.Repeat = true;
//    }
//    if(ch[3].checked) {
//        data.Wednesday = true;
//        data.Repeat = true;
//    }
//    if (ch[4].checked) {
//        data.Thursday = true;
//        data.Repeat = true;
//    }
//    if (ch[5].checked) {
//        data.Friday = true;
//        data.Repeat = true;
//    }
//    if (ch[6].checked) {
//        data.Saturday = true;
//        data.Repeat = true;
//    }

//    console.log(data);

//    const params = {
//        method: 'POST',
//        headers: { 'Content-type': 'application/json' },
         
      
//        body: JSON.stringify(data)
//    }

//    let url = "https://localhost:5001/Doctor/CreateSchedule";

//    const res = await fetch(url, params);


//    //const data = await res.text();

//    if (res.status == 200) {
//        let data = await res.text();
//        console.log("Created", data);
//    }
//    else {
//        console.log("error");
//    }
//});


const fillSlots = async (mode, date, index = -1) => {

    console.log("date: ", date);
    console.log("mode: ", mode);
    console.log("index: ", index);

     let url = "https://localhost:5001/Doctor/GetSlots?Date=" + date + "&mode=" + mode;
     let res = await fetch(url);
    if (res.status == 200) {


        let data = await res.json();
        let slotList1 = "", slotList2 = "";
        let days = document.querySelectorAll("#week-tab li a");

        let d = new Date();
        let m = d.getMonth() + 1;
        let y = d.getFullYear();
        let ind = d.getDay() + 1;
        let j = 0;

        for (let i = ind - 1; i < 7; i++, j++) {

            console.log(j);
            let x = d.getDate() + j;
            console.log(x);

            x = new Date(`${m}/${x}/${y}`).toDateString();

            slotList1 += `<div class="tab-pane fade p-3" role="tabpanel"  data-for-slot="${x}">`;

            if (data[i].morning.length == 0 && data[i].afternoon.length == 0 && data[i].evening.length == 0) {
                slotList1 += `<div class="empty-card">
        <img src="../../images/doctor panel/cell-schedule.png"> 
        <span> Schedule is empty </span>
        </div>`;
                slotList1 += `</div>`;
            }
            else {

                if (data[i].morning.length != 0) {
                    slotList1 += `<div class="c-day-session__header">
            <span> Morning </span>
            <span> (${data[i].morning.length} slots) </span>
            </div>`;

                    slotList1 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].morning).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList1 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList1 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList1 += `</div>`;
                }
                if (data[i].afternoon.length != 0) {
                    slotList1 += `<div class="c-day-session__header">
            <span> Afternoon </span>
            <span> (${data[i].afternoon.length} slots) </span>
            </div>`;

                    slotList1 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].afternoon).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList1 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList1 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList1 += `</div>`;

                }
                if (data[i].evening.length != 0) {
                    slotList1 += `<div class="c-day-session__header">
            <span> Evening </span>
            <span> (${data[i].evening.length} slots) </span>
            </div>`;

                    slotList1 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].evening).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList1 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList1 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList1 += `</div>`;
                }
                slotList1 += `</div>`;
            }

        }

        for (let i = 1; i < ind; i++, j++) {

            let x = d.getDate() + j;
            console.log(j);

            x = new Date(`${m}/${x}/${y}`).toDateString();

            slotList2 += `<div class="tab-pane fade p-3" role="tabpanel" data-for-slot="${x}">`;

            if (data[i].morning.length == 0 && data[i].afternoon.length == 0 && data[i].evening.length == 0) {
                slotList2 += `<div class="empty-card">
        <img src="../../images/doctor panel/cell-schedule.png"> 
        <span> Schedule is empty </span>
        </div>`;
                slotList2 += `</div>`;
            }
            else {

                if (data[i].morning.length != 0) {
                    slotList2 += `<div class="c-day-session__header">
            <span> Morning </span>
            <span> (${data[i].morning.length} slots) </span>
            </div>`;

                    slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].morning).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList2 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList2 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList2 += `</div>`;
                }
                if (data[i].afternoon.length != 0) {
                    slotList2 += `<div class="c-day-session__header">
            <span> Afternoon </span>
            <span> (${data[i].afternoon.length} slots) </span>
            </div>`;

                    slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].afternoon).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList2 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList2 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList2 += `</div>`;

                }
                if (data[i].evening.length != 0) {
                    slotList2 += `<div class="c-day-session__header">
            <span> Evening </span>
            <span> (${data[i].evening.length} slots) </span>
            </div>`;

                    slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

                    (data[i].evening).forEach(element => {
                        const b = element.split(',');
                        if (b[1] === "True") {
                            slotList2 += `<span class="booked">${b[0]}</span>`;
                        }
                        else {
                            slotList2 += `<span>${b[0]}</span>`;
                        }
                    });

                    slotList2 += `</div>`;
                }
                slotList2 += `</div>`;
            }

        }

        document.getElementById("slot-container").innerHTML = slotList2 + slotList1;

    }

    let sl = document.querySelectorAll("#week-tab li a");
    let sl2 = document.querySelectorAll("#slot-container .fade");
    for (let i = 0; i < 7; i++) {
        if (new Date().toDateString() == new Date(sl[i].dataset.forDay).toDateString()) {
            sl2[i].classList.add("active");
            sl2[i].classList.add("show");
            break;
        }
    }

    if (index != -1) {
        for (let i = 0; i < 7; i++) {
            sl2[i].classList.remove("active");
            sl2[i].classList.remove("show");
            sl[i].classList.remove("active");
        }

        sl2[index].classList.add("active");
        sl2[index].classList.add("show");
        sl[index].classList.add("active");
    }

    let select = document.querySelector("#week-tab li .active");

    if (select != null) {

        select = select.dataset.forDay;
        select = select.split('-');
        select = select[1];
        console.log("select 2 : ", select);

        document.getElementById("month-inner").innerHTML = select;
    }


    // for (let i = 0; i < 7; i++) {

    //     sl[i].addEventListener("click", (e)=>{
    //         e.preventDefault();
    //         console.log("object");

    //         let sl2 = document.querySelectorAll("#slot-container .fade");            

    //         for (let i = 0; i < 7; i++) {
    //             sl[i].classList.remove("active");
    //             sl2[i].classList.remove("active");
    //             sl2[i].classList.remove("show");                
    //         }

    //         sl2[i].classList.add("active");
    //         sl2[i].classList.add("show");
    //         e.target.classList.add("active");

    //         console.log(e.target.dataset.forDay);
    //         console.log(sl2[i].dataset.forSlot);

    //     });
    // }

    // let mon = date;
    // mon = mon.split(' ');
    // mon = mon[1] + ' ' + mon[3];
    // console.log(mon);
    // document.getElementById("month-inner").innerHTML = `${mon}`;

    // }




    // let mon = document.querySelector("#week-tab li .active");
    // console.log(mon);
    // mon = mon.dataset.forDay;
    // mon = mon.split('-');
    // mon = mon[1] + ' ' + mon[3];
    // console.log(mon);
    // document.getElementById("month-inner").innerHTML = `${mon}`;

    // let url = `https://localhost:5001/Doctor/GetSlots?Date=${date}&mode=${mode}`;
    // let res = await fetch(url);

    // if(res.status == 200){
    //     let data = await res.json();

    // let data = [
    //     {
    //         "date": "Sun 01, May 2022",
    //         "morning": [
    //             "09 : 00 AM,True",
    //             "09 : 30 AM,True",
    //             "10 : 00 AM,False",
    //             "10 : 30 AM,False",
    //             "11 : 00 AM,False",
    //             "11 : 30 AM,False"
    //         ],
    //         "afternoon": [
    //             "01 : 00 PM,False",
    //             "01 : 30 PM,False",
    //             "02 : 00 PM,False",
    //             "02 : 30 PM,False",
    //             "03 : 00 PM,False",
    //             "03 : 30 PM,False",
    //             "04 : 00 PM,False",
    //             "04 : 30 PM,True",
    //             "12 : 00 PM,False",
    //             "12 : 30 PM,False"
    //         ],
    //         "evening": [
    //             "05 : 00 PM,False",
    //             "05 : 30 PM,False",
    //             "06 : 00 PM,False",
    //             "06 : 30 PM,False",
    //             "07 : 00 PM,True",
    //             "07 : 30 PM,False",
    //             "08 : 00 PM,False",
    //             "08 : 30 PM,False"
    //         ]
    //     },
    //     {
    //         "date": "Mon 02, May 2022",
    //         "morning": [],
    //         "afternoon": [],
    //         "evening": []
    //     },
    //     {
    //         "date": "Tue 03, May 2022",
    //         "morning": [
    //             "09 : 00 AM,False",
    //             "09 : 30 AM,False",
    //             "10 : 00 AM,False",
    //             "10 : 30 AM,False",
    //             "11 : 00 AM,False",
    //             "11 : 30 AM,False"
    //         ],
    //         "afternoon": [
    //             "01 : 00 PM,False",
    //             "01 : 30 PM,False",
    //             "02 : 00 PM,False",
    //             "02 : 30 PM,False",
    //             "03 : 00 PM,False",
    //             "03 : 30 PM,False",
    //             "04 : 00 PM,False",
    //             "04 : 30 PM,False",
    //             "12 : 00 PM,False",
    //             "12 : 30 PM,False"
    //         ],
    //         "evening": [
    //             "05 : 00 PM,False",
    //             "05 : 30 PM,False",
    //             "06 : 00 PM,False",
    //             "06 : 30 PM,False",
    //             "07 : 00 PM,False",
    //             "07 : 30 PM,False",
    //             "08 : 00 PM,False",
    //             "08 : 30 PM,False"
    //         ]
    //     },
    //     {
    //         "date": "Wed 04, May 2022",
    //         "morning": [],
    //         "afternoon": [],
    //         "evening": []
    //     },
    //     {
    //         "date": "Thu 05, May 2022",
    //         "morning": [],
    //         "afternoon": [],
    //         "evening": []
    //     },
    //     {
    //         "date": "Fri 06, May 2022",
    //         "morning": [],
    //         "afternoon": [],
    //         "evening": []
    //     },
    //     {
    //         "date": "Sat 07, May 2022",
    //         "morning": [],
    //         "afternoon": [],
    //         "evening": []
    //     }
    // ];

    // let slotList = "", slotList2 = "";
    // let d = new Date();
    // let m = d.getMonth()+1;
    // let y = d.getFullYear();
    // let ind = d.getDay()+1;
    // let j=0;
    // let mor = aft = eve = [];

    // for (let i = 0; i < 7; i++) {
    //     mor.push(data[i].morning);
    //     aft.push(data[i].afternoon);
    //     eve.push(data[i].evening);
    // }

    // for (let i = ind; i <= 7; i++, j++) {

    //     let x = d.getDate() + j;

    //     x = new Date(`${m}/${x}/${y}`).toDateString();
    //     let t = x;

    //     x = x.split(' ');
    //     let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
    //     let s = x;

    //     if(parseInt(x[2]) < 10){
    //         x = x[0] + ' ' + x[2].substring(1,2);
    //         s = s[0] + '-' + s[2].substring(1,2);
    //     }
    //     else{
    //         x = x[0] + ' ' + x[2];
    //         s = s[0] + '-' + s[2];
    //     }

    //     slotList += `<div class="tab-pane fade p-3" id="${i}" role="tabpanel">`;

    //     if (mor[j].length == 0 && aft[j].length == 0 && eve[j].length == 0) {
    //         slotList += `<div class="empty-card">
    //         <img src="../../images/doctor panel/cell-schedule.png"> 
    //         <span> Schedule is empty </span>
    //         </div>`;
    //         slotList += `</div>`;
    //     }
    //     else {

    //         if (mor[j].length != 0) {
    //             slotList += `<div class="c-day-session__header">
    //             <span> Morning </span>
    //             <span> (${mor[j].length} slots) </span>
    //             </div>`;

    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (mor[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList += `</div>`;
    //         }
    //         if (aft[j].length != 0) {
    //             slotList += `<div class="c-day-session__header">
    //             <span> Afternoon </span>
    //             <span> (${aft[j].length} slots) </span>
    //             </div>`;

    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (aft[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList += `</div>`;

    //         }
    //         if (eve[j].length != 0) {
    //             slotList += `<div class="c-day-session__header">
    //             <span> Evening </span>
    //             <span> (${eve[j].length} slots) </span>
    //             </div>`;

    //             slotList += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (eve[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList += `</div>`;
    //         }
    //         slotList += `</div>`;
    //     }
    // }

    // for (let i = 0; i < ind-1; i++, j++) {

    //     let x = d.getDate() + j;

    //     x = new Date(`${m}/${x}/${y}`).toDateString();
    //     let t = x;

    //     x = x.split(' ');
    //     let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
    //     let s = x;

    //     if(parseInt(x[2]) < 10){
    //         x = x[0] + ' ' + x[2].substring(1,2);
    //         s = s[0] + '-' + s[2].substring(1,2);
    //     }
    //     else{
    //         x = x[0] + ' ' + x[2];
    //         s = s[0] + '-' + s[2];
    //     }

    //     slotList2 += `<div class="tab-pane fade p-3" id="${i}" role="tabpanel">`;

    //     if (mor[j].length == 0 && aft[j].length == 0 && eve[j].length == 0) {
    //         slotList2 += `<div class="empty-card">
    //         <img src="../../images/doctor panel/cell-schedule.png"> 
    //         <span> Schedule is empty </span>
    //         </div>`;
    //         slotList2 += `</div>`;
    //     }
    //     else {

    //         if (mor[j].length != 0) {
    //             slotList2 += `<div class="c-day-session__header">
    //             <span> Morning </span>
    //             <span> (${mor[j].length} slots) </span>
    //             </div>`;

    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (mor[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList2 += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList2 += `</div>`;
    //         }
    //         if (aft[j].length != 0) {
    //             slotList2 += `<div class="c-day-session__header">
    //             <span> Afternoon </span>
    //             <span> (${aft[j].length} slots) </span>
    //             </div>`;

    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (aft[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList2 += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList2 += `</div>`;

    //         }
    //         if (eve[j].length != 0) {
    //             slotList2 += `<div class="c-day-session__header">
    //             <span> Evening </span>
    //             <span> (${eve[j].length} slots) </span>
    //             </div>`;

    //             slotList2 += `<div class="c-day-session__slot-bluebr-style ">`;

    //             (eve[j]).forEach(element => {
    //                 const b = element.split(',');
    //                 if (b[1] === "True") {
    //                     slotList2 += `<span class="booked">${b[0]}</span>`;
    //                 }
    //                 else {
    //                     slotList2 += `<span>${b[0]}</span>`;
    //                 }
    //             });

    //             slotList2 += `</div>`;
    //         }
    //         slotList2 += `</div>`;
    //     }
    // }

    // document.getElementById("slot-container").innerHTML = slotList2 + slotList;

    // let sel = document.querySelectorAll("#week-tab li a");
    // let sel2 = document.querySelectorAll("#slot-container .fade");

    // let index = -1;
    // for (let i = 0; i < 7; i++) {
    //     if(new Date(sel[i].dataset.forDay).toDateString() == new Date().toDateString()){
    //         index = i;
    //         break;
    //     }
    // }

    // if(index != -1){
    //     sel2[index].classList.add('active');
    //     sel2[index].classList.add('show');
    // }

    // for (let i = 0; i < sel.length; i++) {

    //     sel[i].addEventListener("click", (e)=>{
    //         for (let i = 0; i < sel.length; i++) {
    //             sel2[i].classList.remove('active');
    //             sel2[i].classList.remove('show');            
    //         }

    //         sel2[i].classList.add('active');
    //         sel2[i].classList.add('show');            
    //     });
    // }
    // }

}

const fillDays = () => {

    let d = new Date();
    let m = d.getMonth() + 1;
    let y = d.getFullYear();
    let ind = d.getDay() + 1;

    console.log(ind);

    let dayList = "", slotList = "", dayList2 = "", slotList2 = "";

    let j = 0;
    for (let i = ind - 1; i < 7; i++, j++) {
        let x = d.getDate() + j;

        x = new Date(`${m}/${x}/${y}`).toDateString();
        let t = x;

        x = x.split(' ');
        let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
        let s = x;

        if (parseInt(x[2]) < 10) {
            x = x[0] + ' ' + x[2].substring(1, 2);
            s = s[0] + '-' + s[2].substring(1, 2);
        }
        else {
            x = x[0] + ' ' + x[2];
            s = s[0] + '-' + s[2];
        }

        if (t == new Date().toDateString()) {
            console.log("object");
            dayList += `<li class="nav-item">
            <a class="nav-link today active" data-for-day="${v}" role="tab">
            ${x}
            </a>
            </li>`;
        }
        else {
            dayList += `<li class="nav-item">
            <a class="nav-link" data-for-day="${v}" role="tab">
            ${x}
            </a>
            </li>`;
        }
    }

    console.log("j:  ", j);
    for (let i = 1; i < ind; i++, j++) {
        let x = d.getDate() + j;

        x = new Date(`${m}/${x}/${y}`).toDateString();
        let t = x;

        x = x.split(' ');
        let v = x[0] + '-' + x[1] + '-' + x[2] + '-' + x[3];
        let s = x;

        if (parseInt(x[2]) < 10) {
            x = x[0] + ' ' + x[2].substring(1, 2);
            s = s[0] + '-' + s[2].substring(1, 2);
        }
        else {
            x = x[0] + ' ' + x[2];
            s = s[0] + '-' + s[2];
        }

        if (t == new Date().toDateString()) {
            dayList2 += `<li class="nav-item">
            <a class="nav-link today active" slotList2 data-for-day="${v}" href='#${i}' role="tab">
            ${x}
            </a>
            </li>`;
        }
        else {
            dayList2 += `<li class="nav-item">
            <a class="nav-link" slotList2 data-for-day="${v}" href='#${i}' role="tab">
            ${x}
            </a>
            </li>`;
        }
    }

    document.getElementById("week-tab").innerHTML = dayList2 + dayList;
}

const getStart = async (duration) => {

    console.log("duration: ", duration);
    let url = "https://localhost:5001/Doctor/GetTime?Duration=" + duration;
    let res = await fetch(url);
    let data = await res.json();
    let opt = "";
    console.log(data);
    for (let i = 0; i < data.length; i++) {

        opt += `<option value= "${data[i]}" > ${data[i]} </option>`
    }

    document.getElementById("start-time").innerHTML = opt;
    //console.log(opt);
}

const load = (mode = 'Offline') => {
    fillUserDetails();
    fillDays();
    let date = new Date().toDateString();
    fillSlots(mode, date);

    getStart('10');
}

document.onload = load();

document.getElementById("mode").addEventListener("change", (e) => {
    let mode = e.target.value;

    let date = document.querySelectorAll("#week-tab li a");
    let index = -1;
    for (let i = 0; i < 7; i++) {

        if (date[i].classList.contains("active")) {
            date = date[i].dataset.forDay;
            console.log(date);

            date = date.substring(4, date.length);
            date = new Date(date).toDateString();

            index = i;
            break;
        }
    }
    
    console.log(date);
    fillSlots(mode, date, index);
});

let week = document.getElementById("week-tab");

if (week != null) {
    for (let i = 0; i < 7; i++) {
        document.querySelectorAll("#week-tab li a")[i].addEventListener("click", (e) => {

            let sel = document.querySelectorAll("#week-tab li a");

            for (let i = 0; i < sel.length; i++) {
                sel[i].classList.remove('active');
            }

            e.preventDefault();

            let mode = document.getElementById("mode").value;
            let d = e.target.dataset.forDay;
            d = new Date(d).toDateString();

            let h = e.target.href;
            let ind = h.indexOf('#');
            h = h.substring(ind + 1, h.length);
            console.log(h);
            fillSlots(mode, d);
        });

    }
}

const showSchedule = async (date, mode, e) => {
        console.log("hello");
    let url = "https://localhost:5001/Doctor/GetSchedule?Date="+date+"&mode="+mode;
    let res = await fetch(url);

    if (res.status == 200)
    {
        console.log("hello");

        let data = await res.json();
        

        let sch = "";
        try {
            if (data.length == 0 || data == null || data == []) {
                sch = "<p> Schedule is empty </p>";
            }
            else {

                let x = data[0].schedule;
                console.log(x);
                sch = `<ul style="list-style-type: none;">`;

                sch += ` <li> <p> Schedule: </p>
        <p style="font-size:13.5px;"> Timings: ${x.startTime} - ${x.endTime} Repeat: ${x.repeat} </p>
        <p style="font-size:13.5px;"> Break 1: ${x.break1StartTime} - ${x.break1EndTime} Break 2: ${x.break2StartTime} - ${x.break2EndTime} </p>
        </li>
        `;

                sch += `</ul>`;
            }



        }
        catch (err) {
            sch = "<p> Schedule is empty </p>";
        }
        console.log("hello");
            document.getElementsByClassName("modal-body")[0].innerHTML = sch;
            e.target.setAttribute("data-target", "#exampleModalCenter");
    }
};

document.getElementsByClassName("today-btn-style")[0].addEventListener("click", (e) => {
    e.preventDefault();

    let date = document.querySelector("#week-tab li .active").dataset.forDay;
    date = date.substring(4, date.length);
    date = new Date(date).toDateString();
    let mode = document.getElementById("mode").value;

    showSchedule(date, mode, e);
});

document.getElementById("duration").addEventListener("change", (e) => {
    let dur = e.target.value;
    getStart(dur);
});

document.getElementById("start-time").addEventListener("change", (e) => {
    let dur = document.getElementById("duration").value;
    let st = e.target.value;

    console.log(st);

    getEnd(dur, st);
});

document.getElementById("end-time").addEventListener("change", (e) => {
    let dur = document.getElementById("duration").value;
    let st = document.getElementById("start-time").value;
    let end = e.target.value;

    getB1Start(dur, st, end);
});

document.getElementById("b1-start-time").addEventListener("change", (e) => {
    let dur = document.getElementById("duration").value;
    let b1st = document.getElementById("b1-start-time").value;
    let end = document.getElementById("end-time").value;
    getB1End(dur, b1st, end);
});

document.getElementById("b1-end-time").addEventListener("change", (e) => {
    let dur = document.getElementById("duration").value;
    let b1st = document.getElementById("b1-end-time").value;
    let end = document.getElementById("end-time").value;
    getB2Start(dur, b1st, end);
});

document.getElementById("b2-start-time").addEventListener("change", (e) => {
    let dur = document.getElementById("duration").value;
    let b1end = document.getElementById("b2-start-time").value;
    let end = document.getElementById("end-time").value;
    getB2End(dur, b1end, end);
});

const getEnd = async (duration, start) => {
    let a = document.getElementById("start-time");
    console.log(a);
    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + start;
    let res = await fetch(url);

    let data = await res.json();
    let opt = "";

    for (let i = 0; i < data.length; i++) {
        opt += `<option value="${data[i]}"> ${data[i]} </option>`
    }

    document.getElementById("end-time").innerHTML = opt;
}

const getB1Start = async (duration, start, end) => {
    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + start + "&endtime=" + end;
    let res = await fetch(url);

    let data = await res.json();
    let opt = "";

    for (let i = 0; i < data.length; i++) {
        opt += `<option value="${data[i]}"> ${data[i]} </option>`
    }

    document.getElementById("b1-start-time").innerHTML = opt;
}

const getB1End = async (duration, b1start, end) => {
    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b1start + "&endtime=" + end;
    let res = await fetch(url);

    let data = await res.json();
    let opt = "";

    for (let i = 0; i < data.length; i++) {
        opt += `<option value="${data[i]}"> ${data[i]} </option>`
    }

    document.getElementById("b1-end-time").innerHTML = opt;
}

const getB2Start = async (duration, b1end, end) => {
    console.log(b1end);
    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b1end + "&endtime=" + end;
    let res = await fetch(url);

    let data = await res.json();
    let opt = "";

    for (let i = 0; i < data.length; i++) {
        opt += `<option value="${data[i]}"> ${data[i]} </option>`
    }

    document.getElementById("b2-start-time").innerHTML = opt;
}

const getB2End = async (duration, b2start, end) => {
    let url = "https://localhost:5001/Doctor/GetTime?duration=" + duration + "&starttime=" + b2start + "&endtime=" + end;
    let res = await fetch(url);

    let data = await res.json();
    let opt = "";

    for (let i = 0; i < data.length; i++) {
        opt += `<option value="${data[i]}"> ${data[i]} </option>`
    }

    document.getElementById("b2-end-time").innerHTML = opt;
}


let repeat = document.getElementById("repeat");
repeat.onchange = () => {
    //console.log("Hello");
    if (repeat.value == "Everyweek") {
        console.log("Hello");
        let ch = document.getElementsByClassName("checks");
        console.log(ch);
        for (let i = 0; i < 7; i++) {
            ch[i].checked = true;
        }
    }
    else {
        let ch = document.getElementsByClassName("checks");
        for (let i = 0; i < 7; i++) {
            ch[i].checked = false;
        }
    }
}

document.getElementById("apply").addEventListener("click", async (e) => {
    e.preventDefault();

    let mode = document.getElementById("mode").value;
    let duration = document.getElementById("duration").value;
    let st = document.getElementById("start-time").value;
    let end = document.getElementById("end-time").value;
    let b1st = document.getElementById("b1-start-time").value;
    let b1end = document.getElementById("b1-end-time").value;
    let b2st = document.getElementById("b2-start-time").value;
    let b2end = document.getElementById("b2-end-time").value;
    let date = document.querySelector("#week-tab li .active").dataset.forDay;
    date = date.substring(4, date.length);
    console.log(end);
    console.log(date);
    date = new Date(date).toDateString();
    console.log(date);
    //date = new Date(date).toISOString();
    //console.log(date);


    //let i = date.indexOf("T");
    //date = date.substring(0, i);
    //date = date.replaceAll('-', '/');

    let repeat = document.getElementById("repeat").value;

    if (repeat == 'None') {
        repeat = false;
    }
    else {
        repeat = true;
    }

    let data = {
        StartTime: st,
        EndTime: end,
        Break1StartTime: b1st,
        Break1EndTime: b1end,
        Break2StartTime: b2st,
        Break2EndTime: b2end,
        Repeat: false,
        StartDate: date,
        Mode: mode,
        Duration: duration,
        Sunday: false,
        Monday: false,
        Tuesday: false,

        Wednesday: false,
        Thursday: false,
        Friday: false,

        Saturday: false

    }

    //{
    //    "StartDate" : "2022/05/06",
    //        "Mode" : "Offline",
    //            "Duration" : "30",
    //                "StartTime" : "9:00 AM",
    //                    "EndTime" : "9:00 PM",
    //                        "Break1StartTime" : "1:00 PM",
    //                            "Break1EndTime" : "2:00 PM",
    //                                "Break2StartTime" : "5:00 PM",
    //                                    "Break2EndTime" : "6:00 PM",
    //                                        "Repeat" : "True",
    //                                            "Sunday" : "True",
    //                                                "Monday" : "False",
    //                                                    "Tuesday" : "True",
    //                                                        "Wednesday" : "False",
    //                                                            "Thursday" : "False",
    //                                                                "Friday" : "False",
    //                                                                    "Saturday" : "False"
    //}

    let ch = document.getElementsByClassName("checks");

    if (ch[0].checked) {
        data.Sunday = true;
        data.Repeat = true;

    }
    if (ch[1].checked) {
        data.Monday = true;
        data.Repeat = true;

    }
    if (ch[2].checked) {
        data.Tuesday = true;
        data.Repeat = true;
    }
    if (ch[3].checked) {
        data.Wednesday = true;
        data.Repeat = true;
    }
    if (ch[4].checked) {
        data.Thursday = true;
        data.Repeat = true;
    }
    if (ch[5].checked) {
        data.Friday = true;
        data.Repeat = true;
    }
    if (ch[6].checked) {
        data.Saturday = true;
        data.Repeat = true;
    }

    console.log(data);

    const params = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },


        body: JSON.stringify(data)
    }

    let url = "https://localhost:5001/Doctor/CreateSchedule";

    const res = await fetch(url, params);


    //const data = await res.text();

    if (res.status == 200) {
        let data = await res.text();
        console.log("Created", data);
    }
    else {
        console.log("error");
    }
    location.reload();
});

let sl = document.querySelectorAll("#week-tab li a");
let sl2 = document.querySelectorAll("#slot-container .fade");

for (let i = 0; i < 7; i++) {

    sl[i].addEventListener("click", (e) => {
        e.preventDefault();
        console.log("object");

        let sl2 = document.querySelectorAll("#slot-container .fade");

        for (let i = 0; i < 7; i++) {
            sl[i].classList.remove("active");
            sl2[i].classList.remove("active");
            sl2[i].classList.remove("show");
        }

        sl2[i].classList.add("active");
        sl2[i].classList.add("show");
        e.target.classList.add("active");

        console.log(e.target.dataset.forDay);
        console.log(sl2[i].dataset.forSlot);

        let select = sl2[i].dataset.forSlot;
        select = select.split(' ');
        select = select[1];
    });
}

