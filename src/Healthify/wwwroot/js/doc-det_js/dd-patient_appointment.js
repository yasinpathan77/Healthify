

const fillinformation = async (data) => {

    console.log(data);
    data = data[0];
    console.log(data);

    let mode = document.getElementsByClassName("mode");
    if (data.mode == 'Online') {
        mode[0].innerHTML = 'Online Appointment';
        mode[1].innerHTML = 'This online appointment is for:';
        document.getElementsByClassName("row").innerHTML;
        document.getElementsByClassName("row")[4].style.display = 'none';
    }
    else {
        mode[0].innerHTML = `<i class="fas fa-clinic-medical"></i> In Clinic Appointment`;
        mode[1].innerHTML = 'This in-clinic appointment is for:';
        document.getElementById("cl-name").innerHTML = data.clinicName;
        document.getElementById("cl-addr").innerHTML = data.roomNumber + ', ' + data.street + ', <br>' + data.city + ', <br>' + data.state + ' - ' + data.pincode + '.';
    }

    //document.getElementById("pat-name").innerHTML = name.fname + ' ' + name.lname;
    document.getElementById("date").innerHTML = 'On ' + data.date;
    document.getElementById("time").innerHTML = 'At ' + data.time;
    document.getElementById("doc-img").setAttribute("src", data.profilePhoto);
    document.getElementById("doc-name").innerHTML = 'Dr. ' + data.fname + ' ' + data.lname;
    document.getElementById("qual").innerHTML = "";
    document.getElementById("specs").innerHTML = `<span> ${data.speciality} </span>`;

    document.getElementById("fees").innerHTML = '₹ ' + parseInt(data.price) * 1000;

    // document.getElementsByName("patient-select")[0].addEventListener("change", (e)=>{
    //     if(e.target.checked == true){
    //         document.getElementById("details-div").style.display = 'none';
    //     } 
    // });

    // document.getElementsByName("patient-select")[1].addEventListener("change", (e)=>{
    //     if(e.target.checked == true){
    //         document.getElementById("details-div").style.display = 'block';
    //     }
    // });
}


const getinformation = async (q) => {
    const res = await fetch("https://localhost:5001/Search/DoctorAppointment" + q)
        .catch(err => {
            console.log(err);
        });

    if (res.ok && res.status === 200) {
        console.log("Okay");
        const data = await res.json();
        fillinformation(data);
    }

    //data = {
    //    "result": [
    //        {
    //            "profilePhoto": "/Profile/yasinpathanp@gmail.com.jpg",
    //            "fname": "Yasin",
    //            "lname": "Pathan",
    //            "speciality": "Dentist",
    //            "clinicNumber": "9876543210",
    //            "roomNumber": "23A",
    //            "street": "Jivraj Park",
    //            "clinicName": "Dr. Yasin Pathan Multi Speciality & Cosmetic Dental Hospital",
    //            "state": "Gujarat",
    //            "city": "Ahmedabad",
    //            "pincode": 380052,
    //            "price": 1,
    //            "date": "Mar 22, 2022",
    //            "time": "9:00 am",
    //            "mode": "Online"
    //        }
    //    ],
    //    "id": 2,
    //    "exception": null,
    //    "status": 5,
    //    "isCanceled": false,
    //    "isCompleted": true,
    //    "isCompletedSuccessfully": true,
    //    "creationOptions": 0,
    //    "asyncState": null,
    //    "isFaulted": false
    //};
    //fillinformation(data);
}

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
    getinformation(q);
}

const checkName = (patientFullName) => {

    const reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;

    const val = patientFullName.value;
    const alertName = document.getElementById("alert-name");
    let flag = false;
    let text = "";

    if (val == '') {
        text = 'Full Name is required';
        flag = true;
    }
    else if (!(reg.test(val))) {
        text = 'Full Name is not valid';
        flag = true;
    }

    alertName.innerHTML = text;
    if (flag == true) {
        patientFullName.classList.add("input-alert");
        return false;
    }
    else {
        patientFullName.classList.remove("input-alert");
        return true;
    }
}

const checkEmail = (email) => {
    const reg = /^([a-zA-Z0-9_]){1,10}([_\-\.0-9A-Za-z]){1,10}@([_\-\.0-9A-Za-z]{1,20})\.([a-zA-Z\.]){0,1}([a-zA-Z]{1,5})$/;

    const emVal = email.value;
    let flag = false;
    let text = '';

    const alertEmail = document.getElementById("alert-email");

    if (emVal == '') {
        text = "Email is required";
        console.log("required");
        flag = true;
    }

    if (!reg.test(emVal)) {
        text = "Email is not valid";
        flag = true;
    }

    alertEmail.innerHTML = text;

    if (flag == true) {
        email.classList.add("input-alert");
        return false;
    }
    else {
        email.classList.remove("input-alert");
        return true;
    }
}

const redirect = (data) => {
    location.href = 'invoice.html?orderId=' + data;
}

const confirmFun = async (e) => {
    e.preventDefault();

    console.log("Confirm Clicked");

    const currUrl = decodeURI(location.href);
    let q = currUrl.indexOf('?');

    if (q != -1) {
        q = currUrl.substring(q + 1, currUrl.length);
    }
    else {
        q = '';
    }

    q = q.split('&');

    let obj = {};
    q.forEach(e => {
        e = e.split('=');
        obj[e[0]] = e[1];
    });

    console.log(obj);


    let post;

    if (document.getElementById("someone-else").checked != true) {
        console.log("Bypassed");

        post = {
            Id: obj.id,
            Mode: obj.mode,
            Date: obj.date,
            Time: obj.time,
            SomeOneElse: false
        }
        console.log("post", post)
    }

    else {

        const patientEmail = document.getElementById("patient-email");
        const patientFullName = document.getElementById("patient-full-name");
        const check1 = checkEmail(patientEmail);
        const check2 = checkName(patientFullName);

        if (check1 != true) {
            return;
        }

        if (check2 != true) {
            return;
        }

        let fname = "", lname = "";
        if (patientFullName.value.includes(' ')) {
            fname = patientFullName.value.split(' ')[0];
            lname = patientFullName.value.split(' ')[1];
        }
        else {
            fname = patientFullName.value;
            lname = ' ';
        }

        post = {
            Id: obj.id,
            Mode: obj.mode,
            Date: obj.date,
            Time: obj.time,
            SomeOneElse: true,
            Email: patientEmail.value,
            Fname: fname,
            Lname: lname
        }

        console.log("post", post);
    }

    const url = "https://localhost:5001/Appointment/Booking";
    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(post)
    }

    const res = await fetch(url, params)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200 || res.status == 201) {
        const data = await res.json();
        console.log(data);
        redirect(data.message);
    }

};

try {
    document.onload = load();

    if (document.getElementById("patient-name").checked == true) {
        document.getElementById("details-div").style.display = 'none';
    }

    document.getElementById("patient-name").addEventListener("change", (e) => {
        if (e.target.checked == true) {
            document.getElementById("details-div").style.display = 'none';
        }
    });

    document.getElementById("someone-else").addEventListener("change", (e) => {
        if (e.target.checked == true) {
            document.getElementById("details-div").style.display = 'block';
        }
    });

    document.getElementById("change-date-time").setAttribute("href", document.referrer);

    document.getElementById("confirm-btn").addEventListener("click", confirmFun);
    document.getElementById("app-form").addEventListener("submit", confirmFun);

    let btn = document.getElementsByClassName("reschedule-button-style")[0];

    if (btn != null) {

    }

    // if(document.referrer != location.href){    
    //     document.getElementById("change-date-time").setAttribute("href", document.referrer);
    // }
    // else{
    //     const url = location.href;
    // let q = url.indexOf('?');

    // if (q !== -1) {
    //     q = url.substring(q, url.length);
    //     q = q.split('&');
    //     q = q[0];
    // }
    // else {
    //     q = "";
    // }
    //     document.getElementById("change-date-time").setAttribute("href", "doctor_details.html"+q);
    // }
}
catch (error) {
    cosole.log(error);
}