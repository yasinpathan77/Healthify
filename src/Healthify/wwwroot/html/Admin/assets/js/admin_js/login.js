const checkEmail = (f = true) => {
    const email = document.getElementById("user-email");
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emVal = email.value;
    let text = "";
    let flag = false;

    const alertEmail = document.getElementById("alert-email");

    if (f === false) {
        text = "Email is not registered";
        flag = true;
        remPassEffect();
        return;
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
    else {
        text = "";
    }

    alertEmail.innerText = text;
    if (flag) {
        email.value = emVal;
        email.classList.add("border-red");
    }

    if (flag)
        return false;
    else {
        email.classList.remove("border-red");
        return true;
    }
}

const remPassEffect = () => {
    const password = document.getElementById("user-password");
    password.classList.remove("border-red");
    password.value = "";

    const alertPassword = document.getElementById("alert-password");
    alertPassword.innerText = "";
}

const checkPassword = (f = true) => {
    const password = document.getElementById("user-password");
    const psVal = password.value;
    let flag = false;
    let text = "";

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
        password.classList.add("border-red");
    }

    if (flag)
        return psVal;
    else {
        alertPassword.innerText = "";
        password.classList.remove("border-red");
        return true;
    }
}

const postData = async (emVal, psVal) => {
    console.log(emVal, psVal);

    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'text/plain, application/json',
        },
        body: JSON.stringify({ email: emVal, password: psVal })
    }

    const url = 'https://localhost:5001/User/LogIN';

    const res = await fetch(url, params).catch(err => { });

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
        location.href = "index.html";
        return;
    }
};

const loginFun = async (e) => {
    e.preventDefault();

    var userEmail = document.getElementById("user-email");
    var userPassword = document.getElementById("user-password");

    let check2 = checkPassword();
    let check1 = checkEmail();

    if (check1 === true) {
        const emVal = userEmail.value;
        const psVal = userPassword.value;

        postData(emVal, psVal);
    }
}

document.getElementsByClassName("account-btn")[0].addEventListener("click", loginFun);