const load = async () => {
    const url = location.href;
    let q = url.indexOf('=');

    if (q !== -1) {
        q = url.substring(q, url.length);
    }
    else {
        q = "";
    }

    console.log(q);
    const url1 = "https://localhost:5001/Admin/DoctorThis?Id" + q;
     const res = await fetch(url1);

     //if(res.status != 200){
     //    location.href = 'doctors.html';
     //    return;
     //}

    let data = await res.json();
    console.log(data);
    console.log(data.userId);
   
    const url3 = "https://localhost:5001/Admin/UserDetail?id=" + data.userId;
    const res3 = await fetch(url3);

    //if (res3.status != 200) {
    //    location.href = 'doctors.html';
    //    return;
    //}

    let data1 = await res3.json();

    const url4 = "https://localhost:5001/Search/DoctorDetails?DoctorId" + q;
    const res4 = await fetch(url4);

    //if (res3.status != 200) {
    //    location.href = 'doctors.html';
    //    return;
    //}

    let data4 = await res4.json();

    console.log(data1);
    console.log(data4);
    console.log(data.education);
    console.log(data.lname);
    console.log(data.fname);
    document.getElementById("name").innerHTML = data1.fname + ' ' + data1.lname;
    document.getElementById("phone").innerHTML = data1.phoneNumber;
    document.getElementById("email").innerHTML = data1.email;
    document.getElementById("dob").innerHTML = data1.birthDate;
    document.getElementById("gender").innerHTML = data1.gender;
    document.getElementById("doc-id").innerHTML = 'Doctor ID:  ' + data.id;
    document.getElementById("address").innerHTML = data.roomNumber + ', ' + data.street + `,<br>` + data.city + `,<br>` + data.state + ' - ' + data.pincode;

    let x = "";
    (data4.education).forEach((element) => {
        x += `<li>
        <div class="experience-user">
            <div class="before-circle"></div>
        </div>
        <div class="experience-content">
            <div class="timeline-content">
                <a href="#/" class="name">${element} (UG)</a>
                <div> ${element} </div>
                <span class="time"> ${element} </span>
            </div>
        </div>
    </li>`;
    });

    document.getElementsByClassName("experience-list")[0].innerHTML = x;

    x = "";

    (data4.experience).forEach((element) => {
        x += `<li>
        <div class="experience-user">
            <div class="before-circle"></div>
        </div>
        <div class="experience-content">
            <div class="timeline-content">
                <a href="#/" class="name"> ${element} </a>
                <span class="time"> ${element} </span>
            </div>
        </div>
    </li>`;
    });

    document.getElementsByClassName("experience-list")[1].innerHTML = x;

}

document.onload = load();

document.getElementsByClassName("btn-rounded")[0].addEventListener("click", (e) => {
    e.preventDefault();

    let id = location.href;
    let q = id.indexOf('=');

    id = id.substring(q + 1, id.length);
    console.log(id);

    location.href = 'edit-doctor.html?DoctorId='+id;
});