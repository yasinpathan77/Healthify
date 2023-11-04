
const checkEmail = async (f = true) => {
    const email = document.getElementById("user-email");
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emVal = email.value;
    let flag = false;
    let text;

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

const remPassEffect = () => {
    const password = document.getElementById("user-password");
    password.classList.remove("input-alert");
    password.value = "";

    const alertPassword = document.getElementById("alert-password");
    alertPassword.innerText = "";
    alertPassword.setAttribute("style", "display:none;");
}

const checkPassword = (f = true) => {
    const password = document.getElementById("user-password");
    const psVal = password.value;
    let flag = false;
    let text;

    const alertPassword = document.getElementById("alert-password");

    if (psVal == '') {
        text = "Password is required";
        flag = true;
    }

    if (f === false) {
        text = "Incorrect Password";
        flag = true;
    }


    if (flag) {
        alertPassword.innerText = text;
        alertPassword.setAttribute("style", "display:block;");
        password.classList.add("input-alert");
    }

    if (flag)
        return psVal;
    else {
        alertPassword.innerText = "";
        alertPassword.setAttribute("style", "display:none;");
        password.classList.remove("input-alert");
        return true;
    }
}

const postData = async (emVal, psVal, checkVal) => {
    console.log(emVal, psVal);

    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'text/plain, application/json',
            'referer': 'login.html'
        },
        body: JSON.stringify({ email: emVal, password: psVal, keep: checkVal })
    }

    const url = 'https://localhost:5001/User/LogIN';

    const res = await fetch(url, params)


    const data = await res.json();

    console.log(data);
    if (res.status == 401) {
        if (data.status.includes("Email")) {
            checkEmail(false);
        }
        else if (data.status.includes("Password")) {
            checkPassword(false);
        }

    }
    else {
        redirect(data);
    }
};

const redirect = async (data) => {

    if (data.status.includes("User")) {
        location.href = '../index.html';
    }
    else {
        location.href = 'doctor/upcoming_app.html';
    }

};

async function loginFun(e) {

    e.preventDefault();
    var userEmail = document.getElementById("user-email");
    var userPassword = document.getElementById("user-password");

    let check2 = await checkPassword();

    let check1 = await checkEmail();
    if (check1 === true) {
        const emVal = userEmail.value;
        const psVal = userPassword.value;
        const checkVal = document.getElementById("offerCheck").checked;

        postData(emVal, psVal, checkVal);
    }
}

try {

    document.getElementById("login-btn").addEventListener("click", loginFun);
    document.getElementById("login-form").addEventListener("submit", loginFun);

} catch (error) {
    console.log(error);
}