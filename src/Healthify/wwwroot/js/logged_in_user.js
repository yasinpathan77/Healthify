//const fillUserName = async (data, log) => {

//    let x = "";
//    if (!(log === null || log === undefined)) {
//        if (data !== null) {
//            x = `<button class="drop-style user-name" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                            ${data.fname} ${data.lname}`;

//            if (data.profilePhoto == null) {
//                x += `<img src="../../../images/doctor panel/default.jpg" class="avatar ">`;
//            }
//            else {
//                x += `<img src="../../${data.profilePhoto} " class="avatar ">`;
//            }

//            x += `
//                        </button>
//                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                            <a class="dropdown-item" href="../../html/user panel/appointment.html"><i class="fas fa-calendar-check mr-2" style="font-size:14px;"></i>Appointment</a>
//                            <a class="dropdown-item" href="../../html/user panel/medical_record.html"> <i class="fas fa-notes-medical mr-2" style="font-size:14px;"></i>Medical Records</a>
//                            <a class="dropdown-item" href="../../html/user panel/feedback.html"><i class="fas fa-thumbs-up mr-2" style="font-size:14px; "></i>Feedback</a>
//                            <a class="dropdown-item" href="../../html/user panel/payment.html"><i class="far fa-credit-card mr-2" style="font-size:14px; "></i>Payment</a>
//                            <a class="dropdown-item" href="../../html/user panel/edit-profile.html"><i class="fas fa-user-edit mr-2" style="font-size:14px; "></i>Edit Profile</a>
//                            <a class="dropdown-item" id="logout" href="#"><i class="fas fa-sign-out-alt mr-2"></i>Log Out</a>
//                        </div>`;
//        }
//        else {
//            x = `<a class="login scrollto" href="../../html/login.html"> Login <i class="fas fa-user"></i></a>`;
//        }

//        log.innerHTML = x;
//    }

//    const lgt = document.getElementById("logout");

//    if (!(lgt === null || lgt === undefined)) {
//        document.getElementById("logout").addEventListener("click", logOut);
//    }

//    if (location.pathname.includes("doc-reg.html")) {
//        document.getElementById("fname").value = data.fname;
//        document.getElementById("lname").value = data.lname;
//    }

//    if (location.pathname.includes("patient-appointment.html")) {
//        document.getElementById("pat-name").innerHTML = data.fname + ' ' + data.lname;
//    }
//};

//const getLoginDetails = async () => {
//    const url = "https://localhost:5001/User/IsLogIn";

//    fetch(url)
//        .then(res => {
//            if (res.status === 200) {
//                return res.json();
//            }
//            else if (res.status === 401) {
//                return null;
//            }
//        })
//        .then(data => {
//            console.log(data);

//            var log = document.getElementsByClassName("user-style")[0];

//            fillUserName(data, log);
//        })
//        .catch(err => {
//            console.log(err);
//        });
//};

//const logOut = async () => {
//    console.log("logout");
//    fetch("https://localhost:5001/User/Logout")
//        .then(res => {
//            if (res.status === 200) {
//                location.reload();
//            }
//        })
//        .catch(err => {
//            console.log(err);
//        });
//}

//try {

//    document.onload = getLoginDetails();

//} catch (error) {
//    console.log(error);
//}


const fillUserName = async (data, log) => {

    let x = "";
    if (!(log === null || log === undefined)) {
        if (data !== null) {
            x = `<button class="drop-style user-name" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${data.fname} ${data.lname}`;

            if (data.profilePhoto == null) {
                x += `<img src="../../../images/doctor panel/default.jpg" class="avatar ">`;
            }
            else {
                x += `<img src="../../${data.profilePhoto} " class="avatar ">`;
            }

            x += `
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="../../html/user panel/appointment.html"><i class="fas fa-calendar-check mr-2" style="font-size:14px;"></i>Appointment</a>
                            <a class="dropdown-item" href="../../html/user panel/medical_record.html"> <i class="fas fa-notes-medical mr-2" style="font-size:14px;"></i>Medical Records</a>
                            <a class="dropdown-item" href="../../html/user panel/feedback.html"><i class="fas fa-thumbs-up mr-2" style="font-size:14px; "></i>Feedback</a>
                            <a class="dropdown-item" href="../../html/user panel/payment.html"><i class="far fa-credit-card mr-2" style="font-size:14px; "></i>Payment</a>
                            <a class="dropdown-item" href="../../html/user panel/edit-profile.html"><i class="fas fa-user-edit mr-2" style="font-size:14px; "></i>Edit Profile</a>
                            <a class="dropdown-item" id="logout" href="#"><i class="fas fa-sign-out-alt mr-2"></i>Log Out</a>
                        </div>`;
        }
        else {
            x = `<a class="login scrollto" href="../../html/login.html"> Login <i class="fas fa-user"></i></a>`;

             let docServices = document.querySelectorAll(".nav-item ul li a");
             if(docServices.length > 0){
                 docServices[2].parentElement.remove();
             }

            if (location.href.includes('patient-appointment.html')) {
                location.href = '../login.html';
            }
        }

        log.innerHTML = x;
    }

    const lgt = document.getElementById("logout");

    if (!(lgt === null || lgt === undefined)) {
        document.getElementById("logout").addEventListener("click", logOut);
    }

    if (location.pathname.includes("doc-reg.html")) {
        document.getElementById("fname").value = data.fname;
        document.getElementById("lname").value = data.lname;
    }

    if (location.pathname.includes("patient-appointment.html")) {
        document.getElementById("pat-name").innerHTML = data.fname + ' ' + data.lname;
    }
};

const getLoginDetails = async () => {
    const url = "https://localhost:5001/User/IsLogIn";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else if (res.status === 401) {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            var log = document.getElementsByClassName("user-style")[0];

            fillUserName(data, log);
        })
        .catch(err => {
            console.log(err);
        });
};

const logOut = async () => {
    console.log("logout");
    fetch("https://localhost:5001/User/Logout")
        .then(res => {
            if (res.status === 200) {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

try {

    document.onload = getLoginDetails();

} catch (error) {
    console.log(error);
}