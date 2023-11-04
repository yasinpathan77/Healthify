// stop slider automatically js
$('.carousel').carousel({
    interval: false,
});

const fillData = async (data) => {
    if (data === "" || data === null) {
        return;
    }
    console.log(data.profilePhoto);
    document.getElementById("doc-img").setAttribute("src", "../../" + data.profilePhoto);

    const fname = data.fname; const lname = data.lname;
    document.getElementById("doc-name").innerText = `Dr. ${fname} ${lname}`;

    const qual = data.education;
    let q = document.getElementById("qual");
    q.innerHTML = "";

    let qualList = eduList = [];
    qual.forEach(element => {
        eduList.push(element);
        let i = element.indexOf('-');
        qualList.push(element.substring(0, i));
    });

    let ques = document.getElementsByClassName("q");
    for (let i = 0; i < ques.length; i++) {
        ques[i].innerHTML = 'Dr. ' + fname + ' ' + lname;
    }

    var text = "";

    for (let i = 0; i < qualList.length; i++) {
        i === qualList.length ? text += `<span> ${qualList[i]} </span>` : `<span> ${qualList[i]}, </span>`;
    }

    q.innerHTML += `<span class="specs"> ${text} </span>`;

    const specsList = [];
    let specs = document.getElementById("specs");
    let specialization = data.specialization;
    text = "";

    for (let i = 0; i < specialization.length; i++) {
        specsList.push(specialization[i]);
        text += specialization[i];

        i === specialization.length - 1 ? (text += " ") : (text += ", ");
    }
    specs.innerHTML = text;
    text = "";

    document.getElementById("expr").innerHTML = `${data.experienceInTotal} years of experience overall`;

    document.getElementById("desc").innerHTML = `${data.description};`

    const street = data.street; const city = data.city;
    const clName = data.clinicName;

    document.getElementById("loc").innerHTML = `${street}, ${city}`;
    document.getElementById("cl-name").innerHTML = `${clName}`;
    document.getElementById("address").innerHTML = `${data.roomNumber}, ${street}, <br> ${city}, <br> ${data.state} - ${data.pincode}`;
    document.getElementById("fee").innerHTML = `₹ ${parseInt(data.price) * 1000}`;
    document.getElementById("a1").innerHTML = `A. Dr. ${fname} ${lname} practices at ${clName} - ${street}`;
    document.getElementById("a2").innerHTML = `A. You can take Dr. ${fname}'s appointment online through Healthify for in-clinic visit with the doctor.`;

    const services = data.services;
    let serviceList = []; var i; text = "";

    for (i = 0; i < services.length; i++) {
        const e = services[i];
        serviceList.push(e);
        text += e;

        i === services.length - 1 ? (text += " ") : (text += ", ");
    }

    document.getElementById("a3").innerHTML = `A.  Patients frequently visit Dr. ${fname} ${lname} for ${text}`;

    let certList = [];
    const certificate = data.training;

    for (let i = 0; i < certificate.length; i++) {
        const e = certificate[i];
        certList.push(e);

        i === certificate.length - 1 ? text += ` ${e}` : text += `${e}, `;
    }

    let a4 = document.getElementById("a4");
    a4.innerHTML = `A. Dr. ${fname} ${lname} has following qualifications: ${text}`;
    text = "";


    const spList = document.getElementById("specs-list");
    spList.innerHTML = "";
    specsList.forEach(element => {
        spList.innerHTML += `<li>${element}</li>`;
    });

    const aw = document.getElementById("awards");
    aw.innerHTML = "";

    (data.awards).forEach(element => {
        aw.innerHTML += `<li>${element}</li>`;
    });

    const edu = document.getElementById("edu");
    edu.innerHTML = "";

    (eduList).forEach(element => {
        edu.innerHTML += `<li>${element}</li>`;
    });

    const expLi = document.getElementById("exp-li");
    expLi.innerHTML = "";

    (data.experience).forEach(element => {
        expLi.innerHTML += `<li>${element}</li>`;
    });

    document.getElementById("reg").innerHTML = `<li>${data.registration}</li>`;

    const training = document.getElementById("training");
    training.innerHTML = "";

    certList.forEach(element => {
        training.innerHTML += `<li>${element}</li>`;
    });

    let x = "";
    let schedule = data.schedule;
    console.log("Schedule : ", schedule);
    for (let i = 0; i < schedule.length; i++) {
        let s = schedule[i];
        s = s.split(',');
        x += ` <div>
                    <h5 class="timings__days">
                        <span> ${s[0]} </span> 
                    </h5>
    
                    <p class="timings__time"> `;
        for (let j = 1; j < s.length; j++) {
            x += `<span> ${s[j]} </span>`;
        }
        x += `</p>
            </div>`;
    }

    document.getElementById("schedule").innerHTML = x;

    console.log(document.querySelector('h5[data-qa-id]'));
};

const getOnlineSlots = async (q) => {
    const res = await fetch("https://localhost:5001/Search/DoctorSlots" + q + '&body=Online')
        .catch(err => {
            console.log(err);
        });

    if (res.ok && res.status === 200) {
        const data = await res.json();
        if (data) {
            fetchOn = data;
            fillOnlineSlots(0);
        }
    }


};

const getMonth = (mon) => {
    const m = { 'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12' };
    return m[mon];
}

let fetchOn, fetchOff;

const getOfflineSlots = async (q) => {
    const url = "https://localhost:5001/Search/DoctorSlots" + q + "&body=Offline";
    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.ok && res.status === 200) {
        const data = await res.json();
        if (data) {

            fetchOff = data;
            fillOfflineSlots(0);
        }
    }
};

const fillOnlineSlots = async (p = 0) => {
    let data = fetchOn;

    if (data === null || data === undefined) {
        document.getElementsByClassName("card-sticky1")[0].remove();
        return;
    }

    let url = location.href;
    let index = url.indexOf('?');
    let id = "";
    if (index !== -1) {
        id = url.substring(index, url.length);
        id = id.split('=');
        id = id[1];
    }

    let on1 = [], on2 = [];
    let dayList = "", slotList = "";

    for (let i = 0, j = 3; i < 3, j < 6; i++, j++) {
        on1.push(data[i]);
        on2.push(data[j]);
    }

    if (p == 0) {
        dayList = "", slotList = "";

        for (let i = 0; i < on1.length; i++) {
            const day = on1[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
            console.log(d);

            let a = d.split('-');
            a = a[0] + ' ' + a[1] + ' ' + a[2].substring(0, 3);
            console.log(a);
            let total = on1[i].morning.length + on1[i].afternoon.length + on1[i].evening.length;
            console.log("total", total);

            dayList += `<li class="nav-item">`;
            if (i == 0) {
                dayList += `<a class="nav-link active" data-toggle="tab" role="tab" data-for-day="${d}">
                Today`;
            }
            else if (i == 1) {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day="${d}">
                    Tomorrow`;
            }
            else {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day="${d}">
                    ${a}`;
            }
            dayList += `<div>
                        <p style="font-size:9px;">`;
            dayList += (total === 1) ? `1 slot` : `${total} slots`;
            dayList += ` available</p>
                    </div>
                </a>
            </li>`;
        }

        document.getElementById("on-tab").innerHTML = dayList;

        slotList = "";
        for (let i = 0; i < on1.length; i++) {
            const day = on1[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

            let date = d.split('-');
            date = date[3] + '-' + getMonth(date[2]) + '-' + date[1];

            if (i === 0) {
                slotList += `<div class="tab-pane on fade p-2 show active" data-for-slot="${d}" role="tabpanel">`;
            }
            else {
                slotList += `<div class="tab-pane on fade p-2" data-for-slot="${d}" role="tabpanel">`;
            }

            let total = on1[i].morning.length + on1[i].afternoon.length + on1[i].evening.length;
            if (total == 0) {
                slotList += `<div class="c-day-session">


                <img src="../../images/doc-det/no-slots.svg" alt="" width="97" style="margin-left: 125px;margin-top: 31px;">

                <p class="noslot-heading-style">No slots Available</p>
                <div>

                </div>

            </div>`;
            }

            else {

                if (on1[i].morning != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${on1[i].morning.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on1[i].morning).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (on1[i].afternoon != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${on1[i].afternoon.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on1[i].afternoon).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (on1[i].evening != null) {
                    slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${on1[i].evening.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on1[i].evening).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }
            }
            slotList += `</div>`;
        }

        document.getElementById("on-content").innerHTML = slotList;
    }
    else if (p == 1) {

        dayList = "", slotList = "";
        for (let i = 0; i < on2.length; i++) {

            const day = on2[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
            // console.log(x[0]);
            console.log(d);

            let a = d.split('-');
            a = a[0] + ' ' + a[1] + ' ' + a[2].substring(0, 3);
            console.log(a);
            let total = on2[i].morning.length + on2[i].afternoon.length + on2[i].evening.length;
            console.log("total", total);

            dayList += `<li class="nav-item">`;

            if (i == 0) {
                dayList += `<a class="nav-link active" data-toggle="tab" role="tab" data-for-day=${d}>
                    ${a}`;
            }
            else {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day=${d}>
                    ${a}`;
            }

            dayList += `<div>
                        <p style="font-size:9px;">`;
            dayList += (total === 1) ? `1 slot` : `${total} slots`;
            dayList += ` available</p>
                    </div>
                </a>
            </li>`;
        }

        document.getElementById("on-tab").innerHTML = dayList;


        slotList = "";
        for (let i = 0; i < on2.length; i++) {
            const day = on2[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

            let date = d.split('-');
            date = date[3] + '-' + getMonth(date[2]) + '-' + date[1];

            if (i === 0) {
                slotList += `<div class="tab-pane on fade p-2 show active" data-for-slot="${d}" role="tabpanel">`;
            }
            else {
                slotList += `<div class="tab-pane on fade p-2" data-for-slot="${d}" role="tabpanel">`;
            }

            let total = on2[i].morning.length + on2[i].afternoon.length + on2[i].evening.length;
            if (total == 0) {
                slotList += `<div class="c-day-session">
                <img src="../../images/doc-det/no-slots.svg" alt="" width="97" style="margin-left: 125px;margin-top: 31px;">
                <p class="noslot-heading-style">No slots Available</p>
                </div>`;
                slotList += `</div>`;
            }

            else {

                if (on2[i].morning != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${on2[i].morning.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on2[i].morning).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (on2[i].afternoon != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${on2[i].afternoon.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on2[i].afternoon).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (on2[i].evening != null) {
                    slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${on2[i].evening.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (on2[i].evening).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Online&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;
                }
            }
            slotList += `</div>`;
        }
    }
    document.getElementById("on-content").innerHTML = slotList;

    changeDay("on");
};

const fillOfflineSlots = async (p = 0) => {
    let data = fetchOff;

    let url = location.href;
    let index = url.indexOf('?');
    let id = "";
    if (index !== -1) {
        id = url.substring(index, url.length);
        id = id.split('=');
        id = id[1];
    }

    let off1 = [], off2 = [];
    let dayList = "", slotList = "";

    for (let i = 0, j = 3; i < 3, j < 6; i++, j++) {
        off1.push(data[i]);
        off2.push(data[j]);
    }

    if (p == 0) {
        dayList = "", slotList = "";

        for (let i = 0; i < off1.length; i++) {
            const day = off1[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
            // console.log(x[0]);
            console.log(d);

            let a = d.split('-');
            a = a[0] + ' ' + a[1] + ' ' + a[2].substring(0, 3);
            console.log(a);
            let total = off1[i].morning.length + off1[i].afternoon.length + off1[i].evening.length;
            console.log("total", total);

            dayList += `<li class="nav-item">`;
            if (i == 0) {
                dayList += `<a class="nav-link active" data-toggle="tab" role="tab" data-for-day="${d}">
                Today`;
            }
            else if (i == 1) {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day="${d}">
                    Tomorrow`;
            }
            else {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day="${d}">
                    ${a}`;
            }
            dayList += `<div>
                        <p style="font-size:9px;">`;
            dayList += (total === 1) ? `1 slot` : `${total} slots`;
            dayList += ` available</p>
                    </div>
                </a>
            </li>`;
        }

        document.getElementById("off-tab").innerHTML = dayList;

        slotList = "";
        for (let i = 0; i < off1.length; i++) {
            const day = off1[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

            let date = d.split('-');
            date = date[3] + '-' + getMonth(date[2]) + '-' + date[1];

            if (i === 0) {
                slotList += `<div class="tab-pane off fade p-2 show active" data-for-slot="${d}" role="tabpanel">`;
            }
            else {
                slotList += `<div class="tab-pane off fade p-2" data-for-slot="${d}" role="tabpanel">`;
            }

            let total = off1[i].morning.length + off1[i].afternoon.length + off1[i].evening.length;
            if (total == 0) {
                slotList += `<div class="c-day-session">


                <img src="../../images/doc-det/no-slots.svg" alt="" width="97" style="margin-left: 125px;margin-top: 31px;">

                <p class="noslot-heading-style">No slots Available</p>
                <div>

                </div>

            </div>`;
            }

            else {

                if (off1[i].morning != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${off1[i].morning.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off1[i].morning).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (off1[i].afternoon != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${off1[i].afternoon.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off1[i].afternoon).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (off1[i].evening != null) {
                    slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${off1[i].evening.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off1[i].evening).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }
            }
            slotList += `</div>`;
        }

        document.getElementById("off-content").innerHTML = slotList;
    }
    else if (p == 1) {

        dayList = "", slotList = "";
        for (let i = 0; i < off2.length; i++) {

            const day = off2[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");
            // console.log(x[0]);
            console.log(d);

            let a = d.split('-');
            a = a[0] + ' ' + a[1] + ' ' + a[2].substring(0, 3);
            console.log(a);
            let total = off2[i].morning.length + off2[i].afternoon.length + off2[i].evening.length;
            console.log("total", total);

            dayList += `<li class="nav-item">`;

            if (i == 0) {
                dayList += `<a class="nav-link active" data-toggle="tab" role="tab" data-for-day=${d}>
                    ${a}`;
            }
            else {
                dayList += `<a class="nav-link" data-toggle="tab" role="tab" data-for-day=${d}>
                    ${a}`;
            }

            dayList += `<div>
                        <p style="font-size:9px;">`;
            dayList += (total === 1) ? `1 slot` : `${total} slots`;
            dayList += ` available</p>
                    </div>
                </a>
            </li>`;
        }

        document.getElementById("off-tab").innerHTML = dayList;


        slotList = "";
        for (let i = 0; i < off2.length; i++) {
            const day = off2[i].date;
            const x = day.split(',');
            const d = x[0].replace(" ", "-") + "-" + x[1].trim().replace(" ", "-");

            let date = d.split('-');
            date = date[3] + '-' + getMonth(date[2]) + '-' + date[1];

            if (i === 0) {
                slotList += `<div class="tab-pane off fade p-2 show active" data-for-slot="${d}" role="tabpanel">`;
            }
            else {
                slotList += `<div class="tab-pane off fade p-2" data-for-slot="${d}" role="tabpanel">`;
            }

            let total = off2[i].morning.length + off2[i].afternoon.length + off2[i].evening.length;
            if (total == 0) {
                slotList += `<div class="c-day-session">
                <img src="../../images/doc-det/no-slots.svg" alt="" width="97" style="margin-left: 125px;margin-top: 31px;">
                <p class="noslot-heading-style">No slots Available</p>
                </div>`;
                slotList += `</div>`;
            }

            else {

                if (off2[i].morning != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Morning </span>
                 <span> (${off2[i].morning.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off2[i].morning).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (off2[i].afternoon != null) {

                    slotList += `<div class="c-day-session__header">
                 <span> Afternoon </span>
                 <span> (${off2[i].afternoon.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off2[i].afternoon).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;

                }


                if (off2[i].evening != null) {
                    slotList += `<div class="c-day-session__header">
                 <span> Evening </span>
                 <span> (${off2[i].evening.length} slots) </span>
                 </div>`;

                    slotList += `<div class="c-day-session__slot-bluebr-style ">`;

                    (off2[i].evening).forEach(element => {
                        slotList += `<a href="patient-appointment.html?id=${id}&mode=Offline&date=${date}&time=${element}"> <span> ${element} </span> </a>`;
                    });
                    slotList += `</div>`;
                }
            }
            slotList += `</div>`;
        }
    }
    document.getElementById("off-content").innerHTML = slotList;

    changeDay("off");
};

const changeDay = (mode) => {
    const weekDays = document.querySelectorAll(`#${mode}-tab .nav-item .nav-link`);
    console.log("weeksfday", weekDays);

    // let selectedDay = document.querySelector("#off-tab .nav-item .active");
    // console.log("Selecytd eday",selectedDay);

    weekDays.forEach(element => {
        element.addEventListener("click", (e) => {

            const dayNo = (element).dataset.forDay;

            const toActivate = document.querySelector(`.${mode}[data-for-slot=${dayNo}]`);
            console.log("toActivate", toActivate);

            const slotDisp = document.getElementById(`${mode}-content`).querySelectorAll(`.${mode}`);
            // console.log(slotDisp);
            slotDisp.forEach(element => {
                element.classList.remove("active");
                element.classList.remove("show");
                element.setAttribute("aria-selected", "false");
            });

            toActivate.classList.add("active");
            toActivate.classList.add("show");
            toActivate.setAttribute("aria-selected", "true");
        });
    });
};

const getDetails = async (q) => {
    fetch("https://localhost:5001/Search/DoctorDetails" + q)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(data => {
            if (data) {
                console.log(data);
                fillData(data);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const load = async () => {

    const url = location.href;
    let q = url.indexOf('?');

    if (q !== -1) {
        q = url.substring(q, url.length);
    }
    else {
        q = "";
    }

    console.log(q);

    getDetails(q);
    getOnlineSlots(q);
    getOfflineSlots(q);

};

let ofp, ofn, onp, onn;
ofp = ofn = onp = onn = 0;

const offPrev = () => {
    console.log("Off Prev");
    if (ofp == 0) {
        return;
    }

    ofp--; ofn--;
    fillOfflineSlots(0);
};

const offNext = () => {
    console.log("Off Next");
    if (ofn == 1) {
        return;
    }

    ofp++; ofn++;
    fillOfflineSlots(1);
};

const onPrev = () => {
    console.log("On Prev");
    if (onp == 0) {
        return;
    }

    onp--; onn--;
    fillOnlineSlots(0);
};

const onNext = () => {
    console.log("On Next");
    console.log(onn);
    if (onn == 1) {
        return;
    }

    onp++; onn++;
    fillOnlineSlots(1);
};

try {

    document.onload = load();
    document.getElementsByClassName("prev-date")[0].addEventListener("click", onPrev);
    document.getElementsByClassName("next-date")[0].addEventListener("click", onNext);

    document.getElementsByClassName("prev-date")[1].addEventListener("click", offPrev);
    document.getElementsByClassName("next-date")[1].addEventListener("click", offNext);

} catch (error) {
    console.log(error);
}