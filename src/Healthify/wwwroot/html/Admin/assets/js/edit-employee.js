
const load = async () => {

    let uid = location.href;
    let i = uid.indexOf('?');
    if (i == -1) {
        location.href = 'employees.html';
    }

    uid = uid.substring(i + 1, uid.length);
    const url = "https://localhost/..?userId=" + uid;
    const res = await fetch(url);
    const data = await res.json();

    // const data = {
    //    userId: '123', fname: 'ABC', lname: 'XYZ', gender: 'Male', email: 'abc@gmail.com', pwd: 'abc', cpwd: 'abc', phone: '9876543221', dob: '2000-01-01', state: null, city: null, pin: null, street: null, house: null
    // }

    document.getElementById("user-id").value = data.userId;
    document.getElementById("email").value = data.email;
    document.getElementById("fname").value = data.fname;
    document.getElementById("lname").value = data.lname;
    document.getElementById("pwd").value = data.pwd;
    document.getElementById("cpwd").value = data.cpwd;
    document.getElementById("phone").value = data.phone;
    document.getElementById("dob").value = data.dob;

    if (data.street != null)
        document.getElementById("house").value = data.street;
    if (data.house != null)
        document.getElementById("house").value = data.house;
    if (data.city != null)
        document.getElementById("city").value = data.city;
    if (data.state != null)
        document.getElementById("state").value = data.state;
    if (data.pin != null)
        document.getElementById("pin").value = data.pin;


    if (data.gender == 'Male') {
        document.getElementById("male").checked = true;
    }
    else if (data.gender == 'Female') {
        document.getElementById("female").checked = true;
    }

    if (data.status == 'Inactive') {
        document.getElementById("employee_inactive").checked = true;
    }
    else {
        document.getElementById("employee_active").checked = true;
    }
}

document.onload = load();

const checkPost = (email, dob, fname, lname, pwd, cpwd, phone) => {

    let reg = "";
    let err = document.getElementById("err");
    let text = "";

    reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "") {
        text = "Email is required";
    }
    else if (!reg.test(email)) {
        text = "Email is not valid";
    }

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

    if (pwd == '') {
        text = "Password is required";
    }
    else if (cpwd == '') {
        text = "Confirm Password is required";
    }
    else if (pwd != cpwd) {
        text = "Passwords do not match";
    }


    reg = /^[6-9]{1}[0-9]{9}$/;
    if (phone == '') {
        text = "Phone number is required";
    }
    else if (!reg.test(phone)) {
        text = "Phone number is not valid";
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

    let email = document.getElementById("email").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let pwd = document.getElementById("pwd").value;
    let cpwd = document.getElementById("cpwd").value;
    let phone = document.getElementById("phone").value;
    let dob = document.getElementById("dob").value;
    let house = document.getElementById("house").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let street = document.getElementById("street").value;
    let pin = document.getElementById("pin").value;

    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;
    let active = document.getElementById("employee_active").checked;
    let inactive = document.getElementById("employee_inactive").checked;

    let gender = "", status = "";

    if (male == true) {
        gender = 'Male';
    }
    else if (female == true) {
        gender = 'Female';
    }
    if (active == true) {
        status = 'Active';
    }
    else if (inactive == true) {
        status = 'Inactive';
    }


    let check = checkPost(email, dob, fname, lname, pwd, cpwd, phone);
    if (check != true) {
        e.target.setAttribute("data-target", "#delete_employee");
        return;
    }
    else {
        e.target.removeAttribute("data-target", "#delete_employee");
    }

    let post = [];
    post.push({
        op: "replace", path: "fname", value: fname
    });
    post.push({
        op: "replace", path: "lname", value: lname
    });
    post.push({
        op: "replace", path: "email", value: email
    });
    post.push({
        op: "replace", path: "password", value: pwd
    });

    post.push({
        op: "replace", path: "fname", value: fname
    });
    post.push({
        op: "replace", path: "gender", value: gender
    });
    post.push({
        op: "replace", path: "dob", value: dob
    });
    post.push({
        op: "replace", path: "house", value: house
    });
    post.push({
        op: "replace", path: "state", value: state
    });
    post.push({
        op: "replace", path: "city", value: city
    });
    post.push({
        op: "replace", path: "pin", value: pin
    });
    post.push({
        op: "replace", path: "street", value: street
    });

    console.log(post);

    const url = "";
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
};

document.getElementsByClassName("submit-btn")[0].addEventListener("click", postUserDetails);