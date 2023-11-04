//const getAppointment = async (doc = 0, up = 0,page=1) => {
//    const url = `https://localhost:5001/Patient/GetAppointment?Doctor=${doc}&Upcoming=${up}&Page=${page}`;
//    const res = await fetch(url)
//        .catch(err => {
//            console.log(err);
//        });

//    if (res.status == 200) {
//        const data = await res.json();
//        return data;
//    }
//    else {
//        return null;
//    }
//}

//const getPayment = async (d = 0,page = 1) => {

//    const url = "https://localhost:5001/Patient/GetPayments?Doctor=" + d +"&Page="+page;

//    const res = await fetch(url)
//        .catch(err => {
//            console.log(err);
//        });

//    if (res.status == 200) {
//        const data = await res.json();
//        return data;
//    }
//    else {
//        return null;
//    }
//}

//export { getAppointment, getPayment };

const getAppointment = async (doc = 0, up = 0,page = 1) => {
    const url = `https://localhost:5001/Patient/GetAppointment?Doctor=${doc}&Upcoming=${up}&Page=${page}`;
    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        const data = await res.json();
        if (data != []) {
            return data;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const getPayment = async (d = 0,page=1) => {
    const url = "https://localhost:5001/Patient/GetPayments?Doctor=" + d + "&Page=" + page;

    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        const data = await res.json();
        if (data != []) {
            return data;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const getFeedback = async (d=0, page=1) => {
    console.log(page);
    const url = "https://localhost:5001/Appointment/GetPatientFeedBack?Doctor="+d+"&Page=" + page;
    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        const data = await res.json();
        return data;
    }
    else {
        return null;
    }
}

export { getAppointment, getPayment, getFeedback };