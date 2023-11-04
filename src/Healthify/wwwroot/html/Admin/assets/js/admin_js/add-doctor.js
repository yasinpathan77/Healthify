const load = async () => {
     let uid = location.href;
     let i = uid.indexOf('=');
     if(i == -1){
         location.href = 'doctors.html';
     }

    let i2 = uid.indexOf('&');
    uid = uid.substring(i + 1, uid.length);

    let docid = uid.split('=');

    let url = "https://localhost:5001/Admin/UserDetail?id="+uid;
     let res = await fetch(url);
    let data1 = await res.json();

    console.log(data1);

    

    

    document.getElementById("user-id").value = data1.id;
    document.getElementById("fname").value = data1.fname;
    document.getElementById("lname").value = data1.lname;
    document.getElementById("email").value = data1.email;
    document.getElementById("dob").value = new Date(data1.birthDate).toDateString();

    if (data1.gender == 'Male') {
        document.getElementById("male").checked = true;
    }
    else if (data1.gender == 'Female') {
        document.getElementById("female").checked = true;
    }

    url = "https://localhost:5001/Admin/DoctorThis?id="+docid[1];
     res = await fetch(url);
    data = await res.json();

    console.log(data);

    document.getElementById("doc-id").value = data.id;
    document.getElementById("cl-clinic").value = data.roomNumber;
    document.getElementById("cl-street").value = data.street;
    document.getElementById("cl-city").value = data.city;
    document.getElementById("cl-pin").value = data.pincode;
    document.getElementById("cl-state").value = data.state;
    document.getElementById("speciality").value = data.speciality;
    document.getElementById("cl-name").value = data.clinicName;

    
    document.getElementById("phone").value = data.clinicNumber;

    if (data1.profilePicture != null)
        document.getElementById("pic").setAttribute("src", data1.profilePicture);


}

document.onload = load();

const postDocDetails = async (e) => {
     e.preventDefault();

    let uid = location.href;
    let i = uid.indexOf('=');
    if (i == -1) {
        location.href = 'doctors.html';
    }

    let i2 = uid.indexOf('&');
    uid = uid.substring(i + 1, uid.length);

    let docid = uid.split('=');


    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let user_id = document.getElementById("user-id").value;
    let doc_id = document.getElementById("doc-id").value;
    let dob = document.getElementById("dob").value;
        console.log(dob);

    if (dob.includes('/')) {
        dob = dob.split('/');
        dob = dob[2] + '-' + dob[1] + '-' + dob[0];
    }
    else {
        dob = new Date(dob).toISOString();
        i = dob.indexOf('T');
        dob = dob.substring(0, i);
    }
    
    console.log(dob);
    let speciality = document.getElementById("speciality").value;

    let cl_clinic = document.getElementById("cl-clinic").value;
    let cl_street = document.getElementById("cl-street").value;
    let cl_city = document.getElementById("cl-city").value;
    let cl_pin = document.getElementById("cl-pin").value;
    let cl_state = document.getElementById("cl-state").value;
    let cl_name = document.getElementById("cl-name").value;
    let country = document.getElementById("country").value;


    let awards = document.getElementById("awards").value;
    let education = document.getElementById("education").value;
    let experience = document.getElementById("experience").value;
    let membership = document.getElementById("membership").value;
    let schedule = document.getElementById("schedule").value;
    let registration = document.getElementById("registration").value;
    let services = document.getElementById("services").value;

    let specialization = document.getElementById("specialization").value;
    let training = document.getElementById("training").value;
    let exp = document.getElementById("exp").value;
    let desc = document.getElementById("desc").value;

    let price = document.getElementById("price").value;
    let gpay = document.getElementById("gpay").value;
    let meet = document.getElementById("meet").value;
    let phone = document.getElementById("phone").value;

    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;

    let gender = "", status = "";

    console.log(gpay);

    if (male == true) {
        gender = 'Male';
    }
    else if (female == true) {
        gender = 'Female';
    }

    let post = [];

    post.push({
        op: "replace", path: "Fname", value: fname
    });
    post.push({
        op: "replace", path: "Lname", value: fname
    });
    post.push({
        op: "replace", path: "BirthDate", value: dob
    });
    post.push({
        op: "replace", path: "Gender", value: gender
    });

    console.log(doc_id);
    let url = "https://localhost:5001/Admin/UserUpdate?id="+doc_id;
    let params = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post)
    };
    let res = await fetch(url, params).catch(err => console.log(err));
    let resdata = await res.text();
    console.log(cl_clinic);
    let data = {
        Getmail: email,
        Awards: awards,
        Education: education,
        Experience: experience,
        Membership: membership,
        Registration: registration,
        Services: services,
        Specialization: specialization,
        ExperienceInTotal: exp,
        Description: desc,
        Training: training,
        ClinicName: cl_name,
        Meet: meet,
        Price: price,
        GooglePay: gpay,
        Schedule: schedule,
        RoomNo: cl_clinic,
        Street: cl_street,
        City: cl_city,
        State: cl_state,
        Pincode: cl_pin,
        Country: country,
        ClinicNumber: phone
    };

    url = "https://localhost:5001/Admin/DoctorVerification";

    params = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    };

    res = await fetch(url, params).catch(err => console.log(err));
    resdata = await res.text();

    if (res.status == 200) {
        location.href = "doctor-request.html";
    }
    console.log(data);
};

document.getElementsByClassName("submit-btn")[0].addEventListener("click", postDocDetails);