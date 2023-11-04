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

    else if (confpass !== "" && userPass.value === "") {
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

const checkPassword = async (password) => {
    const psVal = password.value;
    let flag = false;
    let text;

    const alertPassword = document.getElementById("alert-password");

    if (psVal == '') {
        text = "Password is required";
        flag = true;
    }

    else if (psVal.length < 6) {
        text = "Password must be atleast 6 characters long";
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


const postPassword = async (userPassword, confirmUserPassword) => {
    const url = "https://localhost:5001/User/ForgotPassword";
    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'text/plain, application/json',
            'referer': 'login.html'
        },
        body: JSON.stringify({ Password: userPassword.value, ConfirmPassword: confirmUserPassword.value })
    }

    const res = await fetch(url, params)
        .catch(err => console.log(err));

    if (res.ok && (res.status === 200 || res.status === 201)) {
        const data = await res.text();

        if (data) {
            console.log(data);
            location.href = "login.html";
        }
    }
    else {
        console.log("error");
    }
};

const resetFun = async (e) => {
    e.preventDefault();

    const userPassword = document.getElementById("user-password");
    const confirmUserPassword = document.getElementById("confirm-user-password");
    let check1 = await checkPassword(userPassword);
    let check2 = await checkConfPass(confirmUserPassword, userPassword);

    if (check1 === true && check2 === true) {
        postPassword(userPassword, confirmUserPassword);
    }
};

try {
    document.getElementById("change-btn").addEventListener("click", resetFun);
    document.getElementById("reset-form").addEventListener("submit", resetFun);
} catch (error) {
    console.log(error);
}