
const checkEmail = async (email, f = true) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emVal = email.value;
    let flag = false;
    let text;

    const alertEmail = document.getElementById("alert-email");

    if (f === false) {
        text = "Email is not registered";
        flag = true;
    }

    if (emVal == '') {
        text = "Email is required";
        flag = true;
    }

    else if (!reg.test(emVal)) {
        text = "Email is not valid";
        flag = true;
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
};

const postEmail = async (emVal) => {

    try {

        let params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'text/plain, application/json',
                'referer': document.referrer
            },
            body: JSON.stringify({ email: emVal })
        }
        const url = 'https://localhost:5001/User/EmailForgotPassword';

        let res = await fetch(url, params)
            .catch(err => {
                console.log(err);
            });

        if (res.status !== 200) {
            console.log("Not found");
            checkEmail(false);
        }
        else {
            const data = await res.json();

            if (data) {
                console.log(data);
                console.log(data.message);
                redirect(data.message);
            }
        }

    } catch (error) {
        console.log(error);
    }
};

const redirect = async (message) => {
    console.log(message);
    location.href = `./verify.html?A=${message}`;
}

async function forgotFun(e) {

    try {

        e.preventDefault();

        let userEmail = document.getElementById("user-email");
        let check1 = await checkEmail(userEmail);

        if (check1 === true) {
            postEmail(userEmail.value);
        }

    } catch (error) {
        console.log(error);
    }
}

try {
    console.log("Forgot");

    document.getElementById("inst-btn").addEventListener("click", forgotFun);
    document.getElementById("forgot-form").addEventListener("submit", forgotFun);

} catch (error) {
    console.log(error);
}