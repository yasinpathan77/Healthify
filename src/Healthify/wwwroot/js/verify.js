let mins = 3;
let secs = mins * 60;

const countdown = () => {
    const m = Math.floor(secs / 60);
    let s = secs % 60;
    s = s < 10 ? '0' + s : s;

    if (secs >= 0) {
        document.getElementById("timer").innerHTML = `in ${m}:${s}`;
        console.log(m + ':' + s);
    }
    secs--;
}

setInterval(countdown, 1000);

const verifyLoadFun = async () => {

    countdown();
    let q = location.href.indexOf('?');
    let id = "";
    if (q !== -1) {
        id = location.href.substring(q, location.href.length);
    }

    const url = 'https://localhost:5001/User/GetMail' + id;
    console.log(url);

    const res = await
        fetch(url)
            .catch
            (error => {
                console.log(error);
            });

    if (res.status !== 200) {
        return;
    }

    const data = await res.text();
    if (data != null) {
        console.log(data);
        document.getElementById("span-email").innerHTML = `${data}`;
        document.getElementById("alert-otp").style.display = "none";
    }
    else {
        console.log("error");
    }

};

const checkOTP = async (userOtp, f = true) => {
    let reg = /^[0-9]{6}$/;
    let flag = false;
    let text = "";
    const otpVal = userOtp.value;

    const alertOtp = document.getElementById("alert-otp");

    if (!reg.test(otpVal)) {
        text = "OTP format is invalid";
        flag = true;
    }

    if (otpVal === "") {
        text = "OTP is required";
        flag = true;
    }

    if (f === false) {
        text = "Incorrect OTP";
        flag = true;
    }

    if (!(f == true || f == false)) {
        text = f;
        flag = true;
    }

    alertOtp.innerText = text;

    if (flag === true) {
        userOtp.classList.add("input-alert");
        alertOtp.style.display = "block";
        return false;
    }
    else {
        userOtp.classList.remove("input-alert");
        alertOtp.style.display = "none";
        return true;
    }
};

const postOTP = async (otpVal) => {

    console.log(otpVal);
    const email = document.getElementById("span-email").innerHTML;
    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'referer': document.referrer
        },


        body: JSON.stringify({ Email: email, OtpData: otpVal })
    }

    const url = 'https://localhost:5001/User/MailVerification';

    const res = await fetch(url, params)
        .catch(error => {
            console.log(error);
        });

    var data = await res.json();
    console.log(data);
    if (res.status !== 200) {
        checkOTP(false);
        return;
    }

    redirect(data);
};

const redirect = (data) => {
    console.log(data);

    if (data.status == "Doctor") {
        location.href = "doctor/doc-reg.html";
    }
    else if (data.status === "Okay") {
        location.href = "reset.html";
    }
    else {
        location.href = "../Index.html";
    }


};

const verifyFun = async (e) => {
    e.preventDefault();

    let userOtp = document.getElementById("user-otp");
    console.log("clicked");
    if (secs <= 0) {
        checkOTP(userOtp, "Login is not available");
        return;
    }

    let check = await checkOTP(userOtp);
    var otpVal;

    if (check === true) {
        otpVal = userOtp.value;
        console.log(otpVal);
        postOTP(otpVal);
    }
}

const resendFun = async () => {

    mins = 3;
    secs = mins * 60;
    countdown();

    const email = document.getElementById("span-email").innerHTML;
    const params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'referer': document.referrer
        },


        body: JSON.stringify({ Email: email })
    }

    const url = "https://localhost:5001/User/ResendOTP";

    const res = await fetch(url, params)
        .catch(error => {
            console.log(error);
        });

    if (res.status !== 200) {
        return;
    }

    document.getElementById("verify-form").reset();
    //location.reload();
};

try {
    document.onload = verifyLoadFun();

    document.getElementById("verify-login-btn").addEventListener("click", verifyFun);
    document.getElementById("verify-form").addEventListener("submit", verifyFun);
    document.getElementById("resend").addEventListener("click", resendFun);

} catch (error) {

}