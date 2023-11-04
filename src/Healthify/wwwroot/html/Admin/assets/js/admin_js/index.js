
const fillDocs = async () => {
     const url = "https://localhost:5001/Admin/Doctors";
     const res = await fetch(url)
         .catch(err => {
             console.log(err);
         });

     if (res.status != 200) {
         return;
     }

     const data = await res.json();



    if (data == null) { }
    else {

        if (data.length == 1) {
            document.getElementById("total-docs").innerHTML = '1';
            document.getElementsByClassName("widget-title1")[0].innerHTML = `Doctor <i class="fa fa-check" aria-hidden="true"></i>`;
        }
        else {
            document.getElementById("total-docs").innerHTML = data.length;
        }

        let x = "", y = 0;
        console.log(data);

        for (let i = 0; i < data.length; i++, y++) {

            let element = data[i];
            if (y == 5) {
                break;
            }

            x += `<tr>
            <td>`;

            if (element.profilePicture == '' || element.profilePicture == null) {
                x += `<img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">`;
            }
            else {
                x += `<img width="28" height="28" class="rounded-circle" src="${element.profilePicture}" alt="">`;
            }

            x += `<h2>${element.fname} ${element.lname}</h2>
            </td>
            <td>${element.city}</td>
            <td>${element.speciality}</td>
            <td>${element.city}</td>
            <!-- <td><button class="btn btn-primary btn-primary-one float-right">Fever</button></td> -->
        </tr>`;

        };

        document.querySelectorAll(".table tbody")[2].innerHTML = x;
    }
};

const fillApps = async () => {


    const url = "https://localhost:5001/Admin/AppointmentData";
     const res = await fetch(url)
         .catch(err => {
             console.log(err);
         });

     if (res.status != 200) {
         return;
     }

     const data = await res.json();


    console.log(data);

    if (data == null) { }
    else {

        if (data.length == 1) {
            document.getElementById("total-docs").innerHTML = '1';
            document.getElementsByClassName("widget-title2")[0].innerHTML = `Doctor <i class="fa fa-check" aria-hidden="true"></i>`;
        }
        else {
            document.getElementById("total-pats").innerHTML = data.length;
        }

        let x = "", y = 0;

        for (let i = 0; i < data.length; i++, y++) {
            let element = data[i];
            if (y == 5) {
                break;
            }

            x += `<tr>
            <td style="min-width: 200px;">`;

            if (element.profilePicture == '' || element.profilePicture == null) {
                x += `<a class="avatar" href="profile.html"> ${element.fname.substring(0, 1)} </a>`;
            }
            else {
                x += `<a class="avatar" href="profile.html"> <img src="${element.profilePicture}"> </a>`;
            }
            x += `<h2><a href="profile.html"> ${element.fName} ${element.lname} </a></h2>
            </td>                 
            <td>
                <h5 class="time-title p-0">Appointment With</h5>
                <p>Dr. ${element.doc_Fname} ${element.doc_Lname}</p>
            </td>
            <td>
                <h5 class="time-title p-0">Date</h5>
                <p>${element.date}</p>
            </td>
            
        </tr>`;

        }


        // document.getElementsByClassName("table")[0].children[1].innerHTML = x;
        document.querySelector(".table tbody").innerHTML = x;
    }
};

const fillUsers = async () => {
     const url = "https://localhost:5001/Admin/Data";
     const res = await fetch(url)
         .catch(err => {
             console.log(err);
         });

     if (res.status != 200) {
         return;
     }

     const data = await res.json();

    

    console.log(data);
    if (data == null || data == []) { }
    else {

        let x = "";
        let a = 0;
        for (let i = 0; i < data.length; i++, a++) {

            if (a == 5) {
                break;
            }

            x += `<tr>
            <td>`;

            if (data[i].profilePicture == '' || data[i].profilePicture == null) {
                x += `<img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">`;
            }
            else {
                x += `<img width="28" height="28" class="rounded-circle" src="${data[i].profilePicture}" alt="">`;
            }

            x += `<h2>${data[i].fname} ${data[i].lname}</h2>
            </td>
            <td>${data[i].email}</td>
            <td>${data[i].phoneNumber}</td>
            <td>${data[i].gender}</td>
            <!-- <td><button class="btn btn-primary btn-primary-one float-right">Fever</button></td> -->
        </tr>`;

        }

        // document.getElementsByClassName("table")[1].children[0].innerHTML = x;
        document.querySelectorAll(".table tbody")[1].innerHTML = x;
    }
}

const load = async () => {
    fillDocs();
    fillApps();
    fillUsers();

    let url = "https://localhost:5001/Admin/Stats";
    let res = await fetch(url);

    if (res.status == 200) {
        let data = await res.json();
        console.log(data);

        //let data = 12;

        document.getElementById("total-docs").innerHTML = data.totaldocs;

        //data.totalDocs;
        document.getElementById("total-pats").innerHTML = data.totalPats;
        document.getElementById("total-users").innerHTML = data.totalUsers;
        //document.getElementById("total-docs").innerHTML = data.totalDocs;
        document.getElementById("com-apps").innerHTML = data.comApps;
        document.getElementById("up-apps").innerHTML = data.upApps;
        document.getElementById("total-vis").innerHTML = data.totalVis;
        document.getElementById("com-apps").innerHTML = data.comApps;
    }
}

document.onload = load();