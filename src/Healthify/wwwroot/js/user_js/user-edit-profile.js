import { logOut, fillUserDetails } from '../user_js/user-panel.js';

// for chaging images

var uimg1 = document.getElementById("user-img-change")

function readURL(input) {

    if (input.files) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e) => {
            uimg1.src = e.target.result;

        }
    }
}

const checkImg = (imgFile) => {

    if (imgFile === undefined || imgFile === null) {
        return false;
    }

    else if (!['image/jpeg', 'image/png'].includes(imgFile.type)) {
        console.log("image error");
        return "Only jpg and png files are allowed";
    }

    else if (imgFile.size > 1 * 1024 * 1024) {
        console.log("image size error");
        return "Image size must be less than 1 MB";
    }
    else
        return true;
}

// Change Image
const changeImg = () => {
    const changeImage = document.getElementById("change-image");
    console.log(changeImage);

    const userImgChange = document.getElementById("user-img-change");
    const alertImg = document.getElementById("alert-img");

    if (changeImage.files) {
        const img = changeImage.files[0];
        const flag = checkImg(img);
        console.log(flag);

        if (flag === true) {
            alertImg.innerHTML = "";
            alertImg.setAttribute("style", "display:none;");

            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e) => {
                userImgChange.src = e.target.result;
            }
            return img;
        }

        else if (flag === false) {
            return true;
        }
        else {
            alertImg.innerHTML = flag;
            alertImg.setAttribute("style", "display:block;");
        }
    }
}

const postImg = async (e) => {
    e.preventDefault();
    console.log(e);

    let flag = changeImg();
    console.log(flag);

    if (flag == true) {
        return;
    }

    const url = "https://localhost:5001/User/image";
    const fd = new FormData();
    fd.append('File', flag);
    const params = {
        method: 'POST',
        body: fd
    }

    console.log("post img");

    let details = null;
    const res = await fetch(url, params)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        details = await res.json();
    }

    console.log("out details 22", details);
}

const getProfile = async () => {

    let details = null;
    const url = "https://localhost:5001/Patient/GetProfile";

    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        details = await res.json();
    }

    console.log("out details", details);
    return details;
}

let profileData = null;

const load = async () => {

    fillUserDetails();

    profileData = await getProfile();
    if (profileData == null) {
        console.log("do not fill");
        return;
    }

    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let phone = document.getElementById("phone");

    let gender = document.getElementById("gender");
    document.getElementById("gender").value = profileData.gender;

    let pic = document.getElementById("user-img-change");
    let chpic = profileData.profilePicture;

    if (chpic != null) {
        document.getElementById("user-img-change").src = chpic;
    }
    else {
        document.getElementById("user-img-change").src = "../../images/doctor panel/default.jpg";
    }

    let blood = document.getElementById("blood");
    let house = document.getElementById("house");
    let street = document.getElementById("street");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let country = document.getElementById("country");
    let pin = document.getElementById("pin-code");

    fname.value = profileData.fname == null ? "" : profileData.fname;
    lname.value = profileData.lname == null ? "" : profileData.lname;
    phone.value = profileData.phoneNumber == null ? "" : profileData.phoneNumber;
    house.value = profileData.houseNumber == null ? "" : profileData.houseNumber;
    state.value = profileData.state == null ? "" : profileData.state;
    street.value = profileData.street == null ? "" : profileData.street;
    city.value = profileData.city == null ? "" : profileData.city;
    country.value = profileData.country == null ? "" : profileData.country;
    pin.value = profileData.pincode == 0 ? "" : profileData.pincode;

    gender.value = profileData.gender == null ? gender.selectedIndex = 0 : profileData.gender;
    blood.value = profileData.bloodGroup == null ? blood.selectedIndex = 0 : profileData.bloodGroup;

    let d = profileData.birthDate;
    let i = d.indexOf('T');
    if (i != -1) {
        d = d.substring(0, i);
        document.getElementById("dob").value = d;
    }
}

const reg1 = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
const reg2 = /^([\s]*[a-zA-Z0-9]{1,5}[\s]*)([\s])*([\-\/]{0,1}[\s]*)([\s])*([\s]*[a-zA-Z0-9]{0,5}[\s]*)$/;
const reg3 = /^([\s]*[a-zA-Z]{1,20}[\s]*)(([\s]*[\-]{0,1}[\s]*)([\s]*[a-zA-Z0-9]{0,10}[\s]*)+)$/;
const reg4 = /^([1-9]{1})([0-9]{5})$/;
const reg5 = /^([6-9]{1})([0-9]{9})/;

const checkFName = () => {
    let fname = document.getElementById("fname");

    if (fname.value == '') {
        fname.style.border = "1.5px solid red";
        return false;
    }
    if (!reg1.test(fname.value)) {
        console.log("fname error");
        fname.style.border = "1.5px solid red";
        return false;
    }
    else {
        fname.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkLName = () => {
    let lname = document.getElementById("lname");

    if (lname.value == '') {
        lname.style.border = "1.5px solid red";
        return false;
    }
    if (!reg1.test(lname.value)) {
        lname.style.border = "1.5px solid red";
        return false;
    }
    else {
        lname.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkPhone = () => {
    let phone = document.getElementById("phone");

    if (phone.value == '') {
        phone.style.border = "1px solid #b4b4be";
        return true;
    }
    if (!reg5.test(phone.value)) {
        phone.style.border = "1.5px solid red";
        return false;
    }
    else {
        phone.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkHouse = () => {

    let house = document.getElementById("house");

    if (house.value == '') {
        house.style.border = "1px solid #b4b4be";
        return true;
    }
    if (!reg2.test(house.value)) {
        house.style.border = "1.5px solid red";
        return false;
    }
    else {
        house.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkStreet = () => {
    let street = document.getElementById("street");

    if (street.value == '') {
        street.style.border = "1px solid #b4b4be";
        return true;
    }
    if (!reg3.test(street.value)) {
        street.style.border = "1.5px solid red";
        return false;
    }
    else {
        street.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkState = () => {
    let state = document.getElementById("state");

    if (state.value == '') {
        state.style.border = "1px solid #b4b4be";
        return true;
    }
    if (!reg1.test(state.value)) {
        state.style.border = "1.5px solid red";
        return false;
    }
    else {
        house.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkCity = () => {
    let city = document.getElementById("city");

    if (city.value == '') {
        city.style.border = "1px solid #b4b4be";
        return true;
    }
    if (!reg1.test(city.value)) {
        city.style.border = "1.5px solid red";
        return false;
    }
    else {
        city.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkPin = () => {
    let pinCode = document.getElementById("pin-code");

    if (pinCode.value == '') {
        pinCode.style.border = "1px solid #b4b4be";
        return true;
    } 
    if (!reg4.test(pinCode.value)) {
        pinCode.style.border = "1.5px solid red";
        return false;
    }
    else {
        pinCode.style.border = "1px solid #b4b4be";
        return true;
    }
}

const saveFun = (e) => {
    e.preventDefault();

    console.log("clicked");
    let check1 = checkFName();
    let check2 = checkLName();
    let check3 = checkPhone();
    let check4 = checkHouse();
    let check5 = checkState();
    let check6 = checkCity();
    let check7 = checkStreet();
    let check8 = checkPin();

    if (check1 != true) {
        return;
    }
    else if (check2 != true) {
        return;
    }
    else if (check3 != true) {
        return;
    }
    else if (check4 != true) {
        return;
    }
    else if (check5 != true) {
        return;
    }
    else if (check6 != true) {
        return;
    }
    else if (check7 != true) {
        return;
    }
    else if (check8 != true) {
        return;
    }
    else {
        postProfile();
    }
}

const postProfile = async () => {
    console.log(profileData);

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let gender = document.getElementById("gender").value;
    let dob = document.getElementById("dob").value;
    let blood = document.getElementById("blood").value;
    let house = document.getElementById("house").value;
    let street = document.getElementById("street").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let pin = document.getElementById("pin-code").value;
    let phone = document.getElementById("phone").value;
    let country = document.getElementById("country").value;


    console.log(fname, lname, phone);

    let post = [];

    if (profileData.fname != fname) {
        post.push({
            op: "replace", path: "fname", value: fname
        });
    }

    if (profileData.lname != lname) {
        post.push({
            op: "replace", path: "lname", value: lname
        });
    }

    if (profileData.phone != phone) {
        if (profileData.phone == null && phone == "") { }
        else {
            post.push({
                op: "replace", path: "PhoneNumber", value: phone
            });
        }
    }

    if (profileData.gender != gender) {
        if (document.getElementById("gender").selectedIndex == 0) {
            post.push({
                op: "replace", path: "gender", value: null
            });
        }
        else {
            post.push({
                op: "replace", path: "gender", value: gender
            });
        }
    }

    if (new Date(profileData.birthDate) != new Date(dob)) {
        if (dob.value != "") {
            post.push({
                op: "replace", path: "birthDate", value: dob
            });
        }
    }

    if (profileData.bloodGroup != blood) {
        if (document.getElementById("blood").selectedIndex == 0) {
            post.push({
                op: "replace", path: "bloodGroup", value: null
            });
        }
        else {
            post.push({
                op: "replace", path: "bloodGroup", value: blood
            });
        }
    }

    if (profileData.house != house) {
        if (profileData.house == null && house == "") { }
        else {
            post.push({
                op: "replace", path: "houseNumber", value: house
            });
        }
    }

    if (profileData.street != street) {
        if (profileData.street == null && street == "") { }
        else {
            post.push({
                op: "replace", path: "street", value: street
            });
        }
    }

    if (profileData.city != city) {
        if (profileData.city == null && city == "") { }
        else {
            post.push({
                op: "replace", path: "city", value: city
            });
        }
    }

    if (profileData.pincode != pin) {
        if (profileData.pincode == 0 && pin == "") { }
        else {
            post.push({
                op: "replace", path: "pincode", value: pin
            });
        }
    }

    if (profileData.state != state) {
        if (profileData.state == null && state == "") { }
        else {
            post.push({
                op: "replace", path: "state", value: state
            });
        }
    }

    if (profileData.country != country) {
        if (profileData.country == null && country == "") { }
        else {
            post.push({
                op: "replace", path: "country", value: country
            });
        }
    }

    if (post == "" || post == null) {
        return;
    }

    console.log(post);

    const url = "https://localhost:5001/Patient/EditProfile";
    const params = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(post)
    };

    let details = null;
    const res = await fetch(url, params)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        details = await res.text();
    }

    console.log("patch", details);
    load();
}

document.onload = await load();
document.getElementById("change-image").addEventListener("change", changeImg);
document.getElementById("save-image").addEventListener("click", postImg);
document.querySelectorAll(".dropdown-menu li a")[2].addEventListener("click", logOut);
document.getElementById("save-changes").addEventListener("click", saveFun);
document.getElementById("profile-form").addEventListener("submit", saveFun);
