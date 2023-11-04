const checkFName = async (fn) => {
    const reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
    const fnVal = fn.value;
    let flag = false;
    let text;

    const alertFName = document.getElementById("alert-first-name");

    if (fnVal == '') {
        text = "First Name is required";
        flag = true;
    }

    else if (!reg.test(fnVal)) {
        text = "First Name is not valid";
        flag = true;
    }

    if (flag) {
        alertFName.innerText = text;
        alertFName.setAttribute("style", "display:block;");
        fn.value = fnVal;
        fn.classList.add("input-alert");
        return false;
    }

    else {
        alertFName.innerText = "";
        alertFName.setAttribute("style", "display:none;");
        fn.value = fnVal;
        fn.classList.remove("input-alert");
        return true;
    }
}

const checkLName = async (ln) => {
    const reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
    const lnVal = ln.value;
    let flag = false;
    let text;

    const alertLName = document.getElementById("alert-last-name");

    if (lnVal == '') {
        text = "Last Name is required";
        flag = true;
    }

    else if (!reg.test(lnVal)) {
        text = "Last Name is not valid";
        flag = true;
    }

    if (flag) {
        alertLName.innerText = text;
        alertLName.setAttribute("style", "display:block;");
        ln.value = lnVal;
        ln.classList.add("input-alert");
        return false;
    }

    else {
        alertLName.innerText = "";
        alertLName.setAttribute("style", "display:none;");
        ln.value = lnVal;
        ln.classList.remove("input-alert");
        return true;
    }
}

const checkConfPass = async (confpass, userPass) => {

    const confVal = confpass.value;
    let flag = false;
    let text;

    const password = document.getElementById("user-password");
    const psVal = password.value;
    const alertConf = document.getElementById("alert-confirm-password");

    if (confpass.value === "") {
        text = "Password is required";
        flag = true;
    }

    else if (confpass.value !== "" && userPass.value === "") {
        checkPassword(userPass);
        text = "";
        flag = true;
    }

    else if (confVal !== psVal) {
        text = "Confirmed Password does not match";
        flag = true;
    }

    if (flag) {
        alertConf.innerText = text;
        alertConf.setAttribute("style", "display:block;");
        confpass.value = confVal;
        confpass.classList.add("input-alert");
        return false;
    }
    else {
        alertConf.innerText = "";
        alertConf.setAttribute("style", "display:none;");
        confpass.value = confVal;
        confpass.classList.remove("input-alert");
        return true;
    }
}

const remPassEffect = () => {
    const password = document.getElementById("user-password");
    password.classList.remove("input-alert");
    password.value = "";

    const password2 = document.getElementById("confirm-user-password");
    password2.classList.remove("input-alert");
    password2.value = "";

    const alertPassword = document.getElementById("alert-password");
    alertPassword.innerText = "";
    alertPassword.setAttribute("style", "display:none;");

    const alertPassword2 = document.getElementById("alert-confirm-password");
    alertPassword2.innerText = "";
    alertPassword2.setAttribute("style", "display:none;");
}

const checkEmail = async (email, f = true) => {
    const reg = /^([a-zA-Z0-9_]){1,10}([_\-\.0-9A-Za-z]){1,10}@([_\-\.0-9A-Za-z]{1,20})\.([a-zA-Z\.]){0,1}([a-zA-Z]{1,5})$/;

    const emVal = email.value;
    let flag = false;
    let text;
    console.log(emVal);

    const alertEmail = document.getElementById("alert-email");

    if (f === false) {
        text = "Email is not registered";
        flag = true;
        remPassEffect();
    }

    if (emVal == '') {
        text = "Email is required";
        flag = true;
    }

    else if (!reg.test(emVal)) {
        text = "Email is not valid";
        flag = true;
        remPassEffect();
    }

    if (flag) {
        alertEmail.innerText = text;
        alertEmail.setAttribute("style", "display:block;");
        email.value = emVal;
        email.classList.add("input-alert");
    }

    if (flag)
        return false;
    else {
        alertEmail.innerText = "";
        alertEmail.setAttribute("style", "display:none;");
        email.classList.remove("input-alert");
        return true;
    }
}

const checkPassword = async (password) => {
    const psVal = password.value;
    let flag = false;
    let text;

    const alertPassword = document.getElementById("alert-password");

    if (psVal == '') {
        text = "Password is required";
        flag = true;
    }

    if (flag) {
        alertPassword.innerText = text;
        alertPassword.setAttribute("style", "display:block;");
        password.classList.add("input-alert");
    }

    if (flag)
        return false;
    else {
        alertPassword.innerText = "";
        alertPassword.setAttribute("style", "display:none;");
        password.classList.remove("input-alert");
        return true;
    }
}

const postData = async (emVal, psVal, fnVal, cnfVal, lnVal) => {
    let url = 'https://localhost:5001/User/User/SignUP';

    if (document.location.pathname === '/html/signupDoc.html') {
        url = 'https://localhost:5001/User/Doctor/SignUP';
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json text/plain',
            'referer': document.referrer
        },
        body: JSON.stringify({ Fname: fnVal, Lname: lnVal, Email: emVal, Password: psVal, ConfirmPassword: cnfVal })
    }

    const res = await fetch(url, params)
        .catch(error => {
            console.log(error);
        })

    const data = await res.json();
    if (res.status === 200 || res.status === 201) {
        redirect();
    }
    else {

    }
};

const redirect = async () => {
    location.href = 'verify.html';
};

async function signupFun(e) {

    e.preventDefault();
    const userEmail = document.getElementById("user-email");
    const userPassword = document.getElementById("user-password");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const confirmUserPassword = document.getElementById("confirm-user-password");

    let check3 = await checkFName(firstName);
    let check2 = await checkPassword(userPassword);
    let check4 = await checkConfPass(confirmUserPassword, userPassword);
    let check1 = await checkEmail(userEmail);
    let check5 = await checkLName(lastName);

    var emVal = userEmail.value;
    var psVal = userPassword.value;
    var fnVal = firstName.value;
    var lnVal = lastName.value;
    var cnfVal = confirmUserPassword.value;

    if (check1 === true && check2 === true && check3 === true && check4 === true && check5 === true) {

        postData(emVal, psVal, fnVal, cnfVal, lnVal);
    }
}

try {
    document.getElementById("otp-btn").addEventListener("click", signupFun);
    document.getElementById("signup-form").addEventListener("submit", signupFun);

} catch (error) {
    console.log(error);
}
