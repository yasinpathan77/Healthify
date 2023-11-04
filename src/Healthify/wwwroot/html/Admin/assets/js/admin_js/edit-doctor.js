
const load = async () => {

    let uid = location.href;
    let i = uid.indexOf('?');
    if (i == -1) {
        location.href = 'doctors.html';
    }

    uid = uid.substring(i + 1, uid.length);

    const url1 = location.href;
    let q = url1.indexOf('=');

    if (q !== -1) {
        q = url1.substring(q, url1.length);
    }
    else {
        q = "";
    }
    console.log(q);

    const url = "https://localhost:5001/Admin/DoctorThis?id" + q;
    const res = await fetch(url);
    const data = await res.json();


    console.log(data);

    const url3 = "https://localhost:5001/Admin/UserDetail?id=" + data.userId;
    const res3 = await fetch(url3);

    //if (res3.status != 200) {
    //    location.href = 'doctors.html';
    //    return;
    //}

    let data1 = await res3.json();

    //const data = {
    //    docId: '123', fname: 'ABC', lname: 'XYZ', gender: 'Male', email: 'abc@gmail.com', phone: '9876543221', dob: '2000-01-01', state: 'Gujarat', city: 'Ahmedabad', pin: '380000', street: 'C G Road', house: 'A/1',
    //    description: 'dbfskjfkj kfhkd jhkf hffsfj fdsjfjsl kdfsl'
    //}
    console.log(data1);
    document.getElementById("doc-id").value = data.id;
    document.getElementById("user-id").value = data.userId;
    document.getElementById("email").value = data1.email;
    document.getElementById("fname").value = data1.fname;
    document.getElementById("lname").value = data1.lname;
    document.getElementById("dob").value = data1.birthDate;

    if (data.clinicNumber != null)
        document.getElementById("phone").value = data.clinicNumber;

    document.getElementById("desc").value = data.description;

    if (data1.gender == 'Male') {
        document.getElementById("male").checked = true;
    }
    else if (data1.gender == 'Female') {
        document.getElementById("female").checked = true;
    }

    if (data.street != null)
        document.getElementById("cl-street").value = data.street;
    if (data.roomNumber != null)
        document.getElementById("cl-clinic").value = data.roomNumber;
    if (data.city != null)
        document.getElementById("cl-city").value = data.city;
    if (data.state != null)
        document.getElementById("cl-state").value = data.state;
    if (data.pincode != null)
        document.getElementById("cl-pin").value = data.pincode;


    if (data1.profilePicture != null) {
        document.getElementById("pic").setAttribute("src", data1.profilePicture);
    }

    document.getElementById("education").value = data.education;
    document.getElementById("awards").value = data.awards;
    document.getElementById("experience").value = data.experience;
    document.getElementById("membership").value = data.membership;
    document.getElementById("registration").value = data.registration;
    document.getElementById("specialization").value = data.specialization;
    document.getElementById("services").value = data.services;
    document.getElementById("training").value = data.training;
    document.getElementById("schedule").value = data.schedule;
    document.getElementById("exp").value = data.experienceInTotal;
    document.getElementById("cl-name").value = data.clinicName;
    document.getElementById("price").value = data.price;
    document.getElementById("gpay").value = data.googlePay;
    document.getElementById("meet").value = data.meet;
    document.getElementById("speciality").value = data.speciality;

}

document.onload = load();

const checkDetails = (fname, lname, dob, house, street, city, state, pin, desc, awards, education, exp, experience, cl_name, gpay, price, meet, membership, training, schedule, services, registration, speciality, specialization, phone) => {
    let reg = "";
    let err = document.getElementById("err");
    let text = "";

    reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
    if (fname == "") {
        text = "First Name is required";
    }
    else if (!reg.test(fname)) {
        text = "First Name is not valid";
    }

    if (lname == "") {
        text = "Last Name is required";
    }
    else if (!reg.test(lname)) {
        text = "Last Name is not valid";
    }

    if (dob == '') {
        text = "Date of Birth is required";
    }

    if (house == '') {
        text = "Clinic number is required";
    }
    if (street == '') {
        text = "Street Name is required";
    }
    if (city == '') {
        text = "City is required";
    }
    if (state == '') {
        text = "State is required";
    }
    if (pin == '') {
        text = "Pin Code is required";
    }
    if (exp == '') {
        text = "Experience is required";
    }
    if (awards == '') {
        text = "Awards is required";
    }
    if (desc == '') {
        text = "Description is required";
    }
    if (education == '') {
        text = "Education is required";
    }
    if (experience == '') {
        text = "Experience is required";
    }
    if (membership == '') {
        text = "Membership is required";
    }
    if (meet == '') {
        text = "Meet Link is required";
    }
    if (gpay == '') {
        text = "Google Pay ID is required";
    }
    if (services == '') {
        text = "Services is required";
    }
    if (schedule == '') {
        text = "Schedule is required";
    }
    if (price == '') {
        text = "Price is required";
    }
    if (cl_name == '') {
        text = "Clinic Name is required";
    }
    if (registration == '') {
        text = "Registraion is required";
    }
    if (schedule == '') {
        text = "Schedule is required";
    }
    if (speciality == '') {
        text = "Speciality is required";
    }
    if (specialization == '') {
        text = "Specialization is required";
    }
    if (phone == '') {
        text = "Phone Number is required";
    }


    console.log(text);
    if (text == "") {
        err.innerHTML = "";
        return true;
    }
    else {
        err.innerHTML = text;
        return text;
    }

}

const postDetails = async (e) => {
    e.preventDefault();

    let uid = document.getElementById("user-id").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("dob").value;

    let house = document.getElementById("cl-clinic").value;
    let street = document.getElementById("cl-street").value;
    let city = document.getElementById("cl-city").value;
    let state = document.getElementById("cl-state").value;
    let pin = document.getElementById("cl-pin").value;


    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;

    let gender = "", status = "";

    if (male == true) {
        gender = 'Male';
    }
    else if (female == true) {
        gender = 'Female';
    }

    let desc = document.getElementById("desc").value;
    let education = document.getElementById("education").value;
    let awards = document.getElementById("awards").value;
    let experience = document.getElementById("experience").value;
    let membership = document.getElementById("membership").value;
    let registration = document.getElementById("registration").value;
    let specialization = document.getElementById("specialization").value;
    let services = document.getElementById("services").value;
    let training = document.getElementById("training").value;
    let schedule = document.getElementById("schedule").value;
    let exp = document.getElementById("exp").value;
    let cl_name = document.getElementById("cl-name").value;
    let price = document.getElementById("price").value;
    let gpay = document.getElementById("gpay").value;
    let meet = document.getElementById("meet").value;
    let speciality = document.getElementById("speciality").value;
    let phone = document.getElementById("phone").value;

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

    let check = checkDetails(fname, lname, dob, house, street, city, state, pin, desc, awards, education, exp, experience, cl_name, gpay, price, meet, membership, training, schedule, services, registration, speciality, specialization, phone);

    if (check != true) {
        e.target.setAttribute("data-target", "#delete_employee");
        return;
    }
    else {
        e.target.removeAttribute("data-target", "#delete_employee");
    }

    let post = [];
    post.push({
        op: "replace", path: "Fname", value: fname
    });
    post.push({
        op: "replace", path: "Lname", value: lname
    });
    post.push({
        op: "replace", path: "Gender", value: gender
    });
    post.push({
        op: "replace", path: "BirthDate", value: dob
    });

    post = [];
    let url1 = "https://localhost:5001/Admin/UserUpdate?userId=" + uid;

    const params1 = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post)
    };

    const res1 = await fetch(url1, params1);
    

    post.push({
        op: "replace", path: "Description", value: desc
    });
    post.push({
        op: "replace", path: "Speciality", value: speciality
    });
    post.push({
        op: "replace", path: "RoomNumber", value: house
    });
    post.push({
        op: "replace", path: "Street", value: street
    });
    post.push({
        op: "replace", path: "State", value: state
    });
    post.push({
        op: "replace", path: "City", value: city
    });
    post.push({
        op: "replace", path: "Pincode", value: pin
    });
    post.push({
        op: "replace", path: "Education", value: education
    });
    post.push({
        op: "replace", path: "Experience", value: experience
    });
    post.push({
        op: "replace", path: "ExperienceInTotal", value: exp
    });
    post.push({
        op: "replace", path: "Training", value: training
    });
    post.push({
        op: "replace", path: "ClinicName", value: cl_name
    });
    post.push({
        op: "replace", path: "Meet", value: meet
    });
    post.push({
        op: "replace", path: "Price", value: price
    });
    post.push({
        op: "replace", path: "GooglePay", value: gpay
    });
    post.push({
        op: "replace", path: "Schedule", value: schedule
    });
    post.push({
        op: "replace", path: "Membership", value: membership
    });
    post.push({
        op: "replace", path: "Registration", value: registration
    });
    post.push({
        op: "replace", path: "Specialization", value: specialization
    });
    post.push({
        op: "replace", path: "Services", value: services
    });
    post.push({
        op: "replace", path: "ClinicNumber", value: phone
    });

    console.log(post);

    let id = location.href;
    let q = id.indexOf('=');
    console.log(q);
    if (q != -1) {
        id = id.substring(q + 1, id.length);
    }

    const url = "https://localhost:5001/Admin/DoctorDetails?id="+id;
    const params = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post)
    };

    const res = await fetch(url, params);

    if (res.status != 200) {
        e.target.setAttribute("data-target", "#delete_employee");
    }
    else {
        e.target.removeAttribute("data-target", "#delete_employee");
    }
}

document.getElementsByClassName("submit-btn")[0].addEventListener("click", postDetails);