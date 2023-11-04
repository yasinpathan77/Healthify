//$('.rightbar .carousel').carousel({
//    interval: false,
//});

// let schedule;

import { fillUserDetails } from "../user_js/user-panel.js";


const getSchedule = async (d, mode, w = 0, m = 0) => {
    const url = "https://localhost:5001/Doctor/GetSchedule?Date=" + d + '&mode=' + mode + "&week=" + w + "&month=" + m;
    const res = await fetch(url);

    if (res.status !== 200) {
        return;
    }

    const data = await res.json();
    // schedule = data;
    console.log(data);
    // console.log(schedule);
    fillSchedule(data);
}

/*
        To show days and keep slots 
*/

const fillSlots = async (d, mode, w = 0, m = 0, next = false) => {

    const url = "https://localhost:5001/Doctor/GetSlots?Date=" + d + "&Mode=" + mode + "&Week=" + w + "&Month=" + m;
    const res = await fetch(url);

    if (res.status !== 200) {
        return;
    }

    const data = await res.json();

    console.log(data);

    let slotList = "", dayList = "";
    let flag = false;

    for (let i = 0; i < data.length; i++) {
        const date = data[i].date;
        const mor = data[i].morning;
        const aft = data[i].afternoon;
        const eve = data[i].evening;

        const x = date.split(',');
        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

        if (next === true) {
            if (1 == d.split('-')[1]) {
                console.log("today");

                dayList += `<li class="nav-item">
                <span class="nav-link active" data-toggle="tab" data-for-day="${d}" role="week-tab">
                ${x[0]}
                </span>
            </li>`;
                flag = true;
                continue;
            }
        }

        if (new Date(d).toDateString() == new Date().toDateString()) {
            dayList += `<li class="nav-item">
            <span class="nav-link active today" data-toggle="tab" data-for-day="${d}" role="week-tab">
            ${x[0]}
            </span>
            </li>`;
            flag = true;
        }

        else if (i == 0) {
            if (new Date(d).toDateString() == new Date().toDateString()) {
                dayList += `<li class="nav-item">
            <span class="nav-link" data-toggle="tab" data-for-day="${d}" role="week-tab">
            ${x[0]}
            </span>
            </li>`;
            }
            else {
                dayList += `<li class="nav-item">
            <span class="nav-link active" data-toggle="tab" data-for-day="${d}" role="week-tab">
            ${x[0]}
            </span>
         </li>`;
            }
        }

        else {
            dayList += `<li class="nav-item">
            <span class="nav-link" data-toggle="tab" data-for-day="${d}" role="week-tab">
            ${x[0]}
            </span>
        </li>`;
        }
    }

    for (let i = 0; i < data.length; i++) {
        const x = data[i].date.split(',');
        const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

        if (i === 0) {
            slotList += `<div class="tab-pane fade p-3 show active" data-for-slot="${d}" role="tabpanel">`;
        }
        else {
            slotList += `<div class="tab-pane fade p-3" data-for-slot="${d}" role="tabpanel">`;
        }

        if (data[i].morning === [] && data[i].afternoon === [] && data[i].evening === []) {
            slotList += `<div class="empty-card">
            <img src="../../images/doctor panel/cell-schedule.png"> 
            <span> Schedule is empty </span>
            </div>`;
            slotList += `</div>`;
        }
        else {

            if (data[i].morning !== []) {
                slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${data[i].morning.length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (data[i].morning).forEach(element => {
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
            if (data[i].afternoon !== []) {
                slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${data[i].afternoon.length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (data[i].afternoon).forEach(element => {
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
            if (data[i].evening !== []) {
                slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${data[i].evening.length} slots) </span>
                 </div>`;

                slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                (data[i].evening).forEach(element => {
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

    document.getElementById("week-tab").innerHTML = dayList;
    document.getElementById("slot-container").innerHTML = slotList;

    changeDay(flag);
};


/*
    Change slot 
*/
const changeDay = async (flag) => {
    const weekDays = document.querySelectorAll("#week-tab .nav-item .nav-link");

    if (flag === false) {
        document.querySelectorAll("#week-tab .nav-item .nav-link")[0].classList.add("active");
    }

    let selectedDay = document.querySelector("#week-tab .nav-item .active");
    console.log("Selecytd eday", selectedDay);
    let month = document.getElementById("month-inner");
    let monthName = (selectedDay.dataset.forDay).split("-");
    month.innerHTML = `<div class="carousel-item active">
        <p>${monthName[2]} ${monthName[3]}</p>
        </div>`;

    weekDays.forEach(element => {

        element.addEventListener("click", (e) => {

            weekDays.forEach(element => {
                element.classList.remove("active");
            });

            const x = e.target;
            x.classList.add("active");

            /*
                To select active day from HTML
            */

            const dayNo = x.dataset.forDay;
            let mode = document.getElementById("mode").value;
            getSchedule(new Date(d), mode);


            /*
                To select active day
            */
            const toActivate = document.querySelector(`.tab-pane[data-for-slot=${dayNo}]`);
            // console.log(toActivate);

            const slotDisp = document.getElementById("slot-container").querySelectorAll(".tab-pane");
            slotDisp.forEach(element => {
                element.classList.remove("active");
                element.classList.remove("show");
                element.setAttribute("aria-selected", "false");
            });

            toActivate.classList.add("active");
            toActivate.classList.add("show");
            toActivate.setAttribute("aria-selected", "true");

            // const selectedDay = document.querySelector("#week-tab .nav-item .active");

            /*
              To Change Month Name
             */
            selectedDay = document.querySelector("#slot-container .active");
            console.log("Selecytd eday", selectedDay);
            month = document.getElementById("month-inner");
            monthName = (selectedDay.dataset.forSlot).split("-");
            month.innerHTML = `<div class="carousel-item active">
                <p>${monthName[2]} ${monthName[3]}</p>
                </div>`;


            getSchedule(dayNo, document.getElementById("mode").value);

        });
    });


}

const fillSchedule = (schedule) => {
    let index;
    let selectedDay = document.querySelector("#week-tab .nav-item .active");

    for (let i = 0; i < schedule.length; i++) {
        let e = schedule[i].date;
        e = e.split(',');
        e = e[0].replace(" ", "-") + "-" + e[1].trim().replace(" ", "-");

        console.log(e);
        console.log(selectedDay.dataset.forDay);

        if (e == selectedDay.dataset.forDay) {
            index = i;
        }
    }

    if (index == undefined && index == null) {
        return;
    }

    let s = schedule[index].schedule;
    fillStartTime(s);
    fillRepeat(s);
};

const fillStartTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + s.duration;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option value="${element}"" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("start-time").innerHTML = x;

            if (s == null) {
                return;
            }

            console.log("Start Time", s.startTime);

            document.getElementById("start-time").value = s.startTime;

            console.log("VakueL", document.getElementById("start-time").value);

            fillEndTime(s);
        })
        .catch(err => {
            console.log(err);
        });
};

const fillEndTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value + '&starttime=' + document.getElementById("start-time").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + s.duration + '&starttime=' + s.startTime;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option "${element}" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("end-time").innerHTML = x;
            document.getElementById("end-time").value = s.endTime;

            fillBreak1StartTime(s);
        })
        .catch(err => {
            console.log(err);
        });
};

const fillBreak1StartTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value + '&starttime=' + document.getElementById("start-time").value + '&endtime=' + document.getElementById("end-time").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?uration=' + s.duration + '&starttime=' + s.startTime + '&endtime=' + s.endTime;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option value="${element}" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("b1-start-time").innerHTML = x;
            document.getElementById("b1-start-time").value = s.break1StartTime;

            fillBreak1EndTime(s);
        })
        .catch(err => {
            console.log(err);
        });
};

const fillBreak1EndTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value + '&starttime=' + document.getElementById("b1-start-time").value + '&endtime=' + document.getElementById("end-time").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + s.duration + '&starttime=' + s.break1StartTime + '&endtime=' + s.endTime;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            x += `<option value="None"> None </option>`;

            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option value="${element}" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("b1-end-time").innerHTML = x;
            document.getElementById("b1-end-time").value = s.break1EndTime;

            fillBreak2StartTime(s);
        })
        .catch(err => {
            console.log(err);
        });
};

const fillBreak2StartTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value + '&starttime=' + document.getElementById("b1-end-time").value + '&endtime=' + document.getElementById("end-time").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + s.duration + '&starttime=' + s.break1EndTime + '&endtime=' + s.endTime;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            x += `<option value="None"> None </option>`;

            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option value="${element}" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("b2-start-time").innerHTML = x;
            document.getElementById("b2-start-time").value = s.break2StartTime;

            fillBreak2EndTime(s);
        })
        .catch(err => {
            console.log(err);
        });
};

const fillBreak2EndTime = async (s) => {

    let url = '';
    if (s == null) {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + document.getElementById("duration").value + '&starttime=' + document.getElementById("b2-start-time").value + '&endtime=' + document.getElementById("end-time").value;
    }
    else {
        url = 'https://localhost:5001/Doctor/GetTime?duration=' + s.duration + '&starttime=' + s.break2StartTime + '&endtime=' + s.endTime;
    }

    fetch(url)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            let x = "";
            x += `<option value="None"> None </option>`;

            data.forEach(element => {
                // if(element == s.starttime)
                // x += `<option value="${element}" selected> ${element} </option>`;
                // else
                //     x += `<option value="${element}"> ${element} </option>`;
                x += `<option value="${element}"> ${element} </option>`;
            });
            document.getElementById("b2-end-time").innerHTML = x;
            document.getElementById("b2-end-time").value = s.break2EndTime;
        })
        .catch(err => {
            console.log(err);
        });
};


/*
    To show repeat drop down and selected days
*/
const fillRepeat = async (s) => {
    let repeat = document.getElementById("repeat");
    let weekDays = document.getElementById("week-days");
    let checks = document.getElementsByClassName("checks");
    let count = 0;

    if (s.repeat != true || s == null) {
        repeat.selectedIndex = 0;
        weekDays.style.display = 'none';
        return;
    }

    for (let i = 0; i < checks.length; i++) {
        checks[i].value = false;
    }

    weekDays.style.display = 'block';
    repeat.selectedIndex = 2;

    if (s.sunday == true) {
        count++;
        checks[0].checked = true;
    }
    if (s.monday == true) {
        count++;
        checks[1].checked = true;
    }
    if (s.tuesday == true) {
        count++;
        checks[2].checked = true;
    }
    if (s.wednesday == true) {
        count++;
        checks[3].checked = true;
    }
    if (s.thursday == true) {
        count++;
        checks[4].checked = true;
    }
    if (s.friday == true) {
        count++;
        checks[5].checked = true;
    }
    if (s.saturday == true) {
        count++;
        checks[6].checked = true;
    }

    if (count == 7) {
        weekDays.style.display = 'none';
        repeat.selectedIndex = 1;
    }
};

const load = async (d = new Date().toISOString()) => {

    // const d = new Date().toISOString();
    fillUserDetails();
    console.log(d);
    let mode = document.getElementById("mode").value;
    fillSlots(d, mode);
    getSchedule(d, mode);
};

const getNextMonth = async () => {
    console.log("Next Month");
    let d = document.querySelector("#week-tab .nav-item .active").dataset.forDay;
    let mode = document.getElementById("mode").value;

    fillSlots(new Date(d), mode, 0, 1);
    getSchedule(new Date(d), mode, 0, 1);
};

const getPrevMonth = async () => {
    console.log("Prev Month");
    let d = document.querySelector("#week-tab .nav-item .active").dataset.forDay;
    let mode = document.getElementById("mode").value;

    fillSlots(new Date(d), mode, 0, 2);
    getSchedule(new Date(d), mode, 0, 2);
};

const getNextWeek = async () => {
    console.log("Next Week");
    let d = document.querySelector("#week-tab .nav-item .active").dataset.forDay;
    let mode = document.getElementById("mode").value;

    fillSlots(new Date(d), mode, 1, 0);
    getSchedule(new Date(d), mode, 1, 0);
};

const getPrevWeek = async () => {
    console.log("Prev Week");
    let d = document.querySelector("#week-tab .nav-item .active").dataset.forDay;
    let mode = document.getElementById("mode").value;

    fillSlots(new Date(d), mode, 2, 0);
    getSchedule(new Date(d), mode, 2, 0);
};


/*
    To change mode
*/
const changeMode = async (e) => {
    let mode = e.target.value;

    let d = document.querySelector("#week-tab .nav-item .active");
    if (d != null) {
        d = d.dataset.forDay;
        d = new Date(d).toISOString();
        fillSlots(d, mode);
        getSchedule(d, mode);
    }
}

/*
    To change repeat dropdown values according to selected days
*/

const changeRepeat = async (e) => {
    const repeat = e.target;
    let checks = document.getElementsByClassName("checks");

    if (repeat.selectedIndex !== 2) {
        document.getElementById("week-days").style.display = "none";
    }

    else {
        document.getElementById("week-days").style.display = "block";

        for (let i = 0; i < checks.length; i++) {
            checks[i].checked = false;
        }
        checks[(new Date().getDay())].checked = true;

        let count = 1;
        for (let i = 0; i < checks.length; i++) {
            checks[i].addEventListener("change", (e) => {
                if (checkChanges(e) === true) {
                    count++;
                }
                else {
                    count--;
                }
                console.log(count);
                if (count === 0) {
                    console.log(repeat.options[0]);
                    repeat.selectedIndex = "0";
                    document.getElementById("week-days").style.display = "none";
                }
                else if (count === 7) {
                    repeat.selectedIndex = "1";
                    document.getElementById("week-days").style.display = "none";
                }
                else if (count > 0 && count < 7) {
                    repeat.selectedIndex = "2";
                }
            });
        }
    }
}

const postDetails = async () => {
    const mode = document.getElementById("mode").value;
    const duration = document.getElementById("duration").value;
    const st = document.getElementById("start-time").value;
    const et = document.getElementById("end-time").value;
    const b1st = document.getElementById("b1-start-time").value;
    const b1et = document.getElementById("b1-end-time").value;
    const b2st = document.getElementById("b2-start-time").value;
    const b2et = document.getElementById("b2-end-time").value;
    let repeat = document.getElementById("repeat").value;
    let checks = document.getElementsByClassName("checks");

    let postSchedule = {
        Mode: mode,
        duration: duration,
        StartTime: st,
        EndTime: et,
        Break1StartTime: b1st,
        Break1EndTime: b1et,
        Break2StartTime: b2st,
        Break2EndTime: b2et
    };

    if (repeat == 'None') {
        postSchedule[repeat] = false;
        postSchedule[sunday] = false;
        postSchedule[monday] = false;
        postSchedule[tuesday] = false;
        postSchedule[wednesday] = false;
        postSchedule[thursday] = false;
        postSchedule[friday] = false;
        postSchedule[saturday] = false;
    }
    else if (repeat == 'Every Day') {
        postSchedule[repeat] = true;
        postSchedule[sunday] = true;
        postSchedule[monday] = true;
        postSchedule[tuesday] = true;
        postSchedule[wednesday] = true;
        postSchedule[thursday] = true;
        postSchedule[friday] = true;
        postSchedule[saturday] = true;
    }

    else {
        postSchedule[repeat] = true;
        postSchedule[sunday] = checks[0].value;
        postSchedule[monday] = checks[1].value;
        postSchedule[wednesday] = checks[3].value;
        postSchedule[thursday] = checks[4].value;
        postSchedule[tuesday] = checks[2].value;
        postSchedule[friday] = checks[5].value;
        postSchedule[saturday] = checks[6].value;
    }

    const url = "https://localhost:5001/Doctor/CreateSchedule";
    const params = {
        method: 'POST',
        body: postSchedule
    };
    fetch(url, params)
        .then(res => {
            if (res.ok && res.status === 201) {
                return res.json();
            }
        })
        .then(data => {
            if (data) {
                // console.log(data);
                // showWeek(data);
                load();
            }
        })
        .catch(err => {
            console.log(err);
        });

};

try {

    document.onload = load();

    document.getElementById("next-week").addEventListener("click", getNextWeek);
    document.getElementById("prev-week").addEventListener("click", getPrevWeek);

    document.getElementById("next-month").addEventListener("click", getNextMonth);
    document.getElementById("prev-month").addEventListener("click", getPrevMonth);

    document.getElementById("mode").addEventListener("change", changeMode);
    document.getElementById("duration").addEventListener("change", () => { fillStartTime(null) });
    document.getElementById("start-time").addEventListener("change", () => { fillEndTime(null) });
    document.getElementById("start-time").addEventListener("change", () => { fillBreak1StartTime(null) });
    document.getElementById("start-time").addEventListener("change", () => { fillBreak1EndTime(null) });
    document.getElementById("start-time").addEventListener("change", () => { fillBreak2StartTime(null) });
    document.getElementById("start-time").addEventListener("change", () => { fillBreak2EndTime(null) });

    document.getElementById("repeat").addEventListener("change", changeRepeat);

    document.getElementById("apply").addEventListener("click", postDetails);

} catch (error) {
    console.log(error);
}

