
const load = async () => {

     let uid = location.href;
     let i = uid.indexOf('=');
     if(i == -1){
         location.href = 'employees.html';
     }

    uid = uid.substring(i + 1, uid.length);
    console.log(uid);
    const url = "https://localhost:5001/Admin/UserDetail?id=" + uid;
    const res = await fetch(url).catch(err => console.log(err));
     const data = await res.json();

    //const data = {
    //    docId: '123', fname: 'ABC', lname: 'XYZ', gender: 'Male', email: 'abc@gmail.com', pwd: 'abc', cpwd: 'abc', phone: '9876543221', dob: '2000-01-01', state: null, city: null, pin: null, street: null, house: null
    //}

    console.log(data);

    document.getElementById("user-id").value = uid;
    document.getElementById("email").value = data.email;
    document.getElementById("fname").value = data.fname;
    document.getElementById("lname").value = data.lname;
    document.getElementById("dob").value = new Date(data.birthDate).toDateString();

    if(data.phoneNumber != null)
        document.getElementById("phone").value = data.phoneNumber;
    if (data.bloodGroup != null)
        document.getElementById("blood").value = data.bloodGroup;

    if (data.street != null)
        document.getElementById("street").value = data.street;
    if (data.houseNumber != null)
        document.getElementById("house").value = data.houseNumber;
    if (data.city != null)
        document.getElementById("city").value = data.city;
    if (data.state != null)
        document.getElementById("state").value = data.state;
    if (data.pincode != null)
        document.getElementById("pin").value = data.pincode;


    if (data.gender == 'Male') {
        document.getElementById("male").checked = true;
    }
    else if (data.gender == 'Female') {
        document.getElementById("female").checked = true;
    }

}

document.onload = load();

const checkPost = ( fname, lname) => {

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

const postUserDetails = async (e) => {
    e.preventDefault();

    let id = document.getElementById("user-id").value;
    let email = document.getElementById("email").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;

    let phone = document.getElementById("phone").value;
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


    let house = document.getElementById("house").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let street = document.getElementById("street").value;
    let pin = document.getElementById("pin").value;
    let blood = document.getElementById("blood").value;

    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;
    
    let gender = "";

    if (male == true) {
        gender = 'Male';
    }
    else if (female == true) {
        gender = 'Female';
    }


    let check = checkPost(fname, lname);
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

    post.push({
        op: "replace", path: "HouseNumber", value: house
    });

    post.push({
        op: "replace", path: "PhoneNumber", value: phone
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
        op: "replace", path: "Street", value: street
    });
    post.push({
        op: "replace", path: "BloodGroup", value: blood
    });

    console.log(post);

    const url = "https://localhost:5001/Admin/UserUpdate?id=" + id;
    const params = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post)
    };

    const res = await fetch(url, params);

    if (res.status != 200) {
        console.log("error");
        e.target.setAttribute("data-target", "#delete_employee");
    }
    else {
        console.log("success");
        e.target.removeAttribute("data-target", "#delete_employee");
    }
};

document.getElementsByClassName("submit-btn")[0].addEventListener("click", postUserDetails);