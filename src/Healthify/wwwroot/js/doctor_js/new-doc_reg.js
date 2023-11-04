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

const checkFName = async () => {
    const reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
    const fn = document.getElementById("fname");
    const fnVal = fn.value;
    let flag = false;

    if (!reg.test(fnVal)) {
        flag = true;
    }

    if (flag) {
        fn.style.border = "1.5px solid red";
        return false;
    }

    else {
        fn.style.border = "1px solid #b4b4be";
        return true;
    }
}

const checkLName = async () => {
    const reg = /^([\s]*[a-zA-Z]+[\s]*[a-zA-Z_\s\.]*)$/;
    const ln = document.getElementById("lname");
    const lnVal = ln.value;
    let flag = false;

    if (!reg.test(lnVal)) {
        flag = true;
    }

    if (flag) {
        ln.style.border = "1.5px solid red";
        return false;
    }

    else {
        ln.style.border = "1px solid #b4b4be";
        return true;
    }
}

// Add States
const addState = () => {
    const arr = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi NCR'];
    arr.sort();
    const state = document.getElementById("state");
    var st;

    arr.forEach(element => {
        st += `<option value="${element}"> ${element} </option>`;
    });
    state.innerHTML += st;
};

// Add Specialties
const addSpecialty = () => {
    const arr = ['Dentist', 'Dermatologist', 'ENT Specialist', 'Cardiologist', 'Gynaecologist', 'Opthalmologist', 'General Physician'];
    arr.sort();

    const specialty = document.getElementById("specialty");
    var sp;

    arr.forEach(element => {
        sp += `<option value="${element}">${element}</option>`;
    });
    specialty.innerHTML += sp;
};

// Add Cities
const addCity = async (option) => {

    console.log("Add city");

    const gj = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Rajkot', 'Vadodara'];
    gj.sort();
    const rj = ['Jaipur', 'Jodhpur', 'Udaipur'];
    rj.sort();
    const mh = ['Mumbai', 'Pune', 'Thane'];
    mh.sort();
    const dl = ['New Delhi', 'Gurgaon', 'Noida'];
    dl.sort();

    const city = document.getElementById("city");
    city.innerHTML = `<option value="Select City">Select City</option>`;
    var c = "";

    if (option === 'Gujarat') {
        gj.forEach(element => {
            c += `<option value="${element}">${element}</option>`;
        });
    }
    else if (option === 'Rajasthan') {
        rj.forEach(element => {
            c += `<option value="${element}">${element}</option>`;
        });
    }
    else if (option === 'Delhi NCR') {
        dl.forEach(element => {
            c += `<option value="${element}">${element}</option>`;
        });
    }
    else if (option === 'Maharashtra') {
        mh.forEach(element => {
            c += `<option value="${element}">${element}</option>`;
        });
    }
    else {
        c = "";
    }

    city.innerHTML += c;
};

// Change State

const changeState = async () => {
    const state = document.getElementById("state");
    let option = state.options[state.selectedIndex];
    optionInd = option.index;
    optionVal = option.value;

    addCity(optionVal);
    checkPinCode();

    if (optionInd === 0) {
        checkState();
    }
    else {
        checkState(false);
    }
};

// Change City
const changeCity = async () => {
    const city = document.getElementById("city");
    let option = city.options[city.selectedIndex];
    option = option.index;
    console.log(option);

    if (option === 0) {
        checkCity();
    }
    else {
        checkCity(false);
    }
};

// Change Specialty
const changeSpecialty = async () => {
    const specialty = document.getElementById("specialty");
    let option = specialty.options[specialty.selectedIndex];
    option = option.index;
    console.log(option);

    if (option === 0) {
        checkSpecialty();
    }
    else {
        checkSpecialty(false);
    }
};

// Check Pin Code
const checkPinCode = async () => {
    const state = document.getElementById("state");
    let option = state.options[state.selectedIndex];
    option = option.value;

    var pinCode = document.getElementById("pin-code");
    const pinVal = pinCode.value;
    var reg;
    let flag;

    if (option === 'Gujarat') {
        reg = /^3[6-9]{1}[0-9]{4}$/;
    }
    else if (option === 'Rajasthan') {
        reg = /^3[0-4]{1}[0-9]{4}$/;
    }
    else if (option === 'Delhi NCR') {
        reg = /^(11)([0-9]{4})$/;
    }
    else if (option === 'Maharashtra') {
        reg = /^4[0-4]{1}[0-9]{4}$/;
    }
    else {
        return false;
    }

    if (pinVal === "") {
        flag = true;
    }

    else if (!reg.test(pinVal)) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        pinCode.style.border = "1.5px solid red";
        return false;
    }
    else {
        pinCode.style.border = "1px solid #b4b4be";
        return true;
    }
}

// Check State
const checkState = async (f = true) => {
    var state = document.getElementById("state");
    let option = state.options[state.selectedIndex];
    option = option.index;
    let flag;

    if (f === true) {
        flag = true;
    }
    if (option === 0) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        state.style.border = "1.5px solid red";
        return false;
    }
    else {
        state.style.border = "1px solid #b4b4be";
        return true;
    }

};

// Check Specialty
const checkSpecialty = async (f = true) => {
    var specialty = document.getElementById("specialty");
    let option = specialty.options[specialty.selectedIndex];
    option = option.index;
    let flag;

    if (f === true) {
        flag = true;
    }
    if (option === 0) {
        flag = true;
    }
    else {
        flag = false;
    }
    if (flag === true) {
        specialty.style.border = "1.5px solid red";
        return false;
    }
    else {
        specialty.style.border = "1px solid #b4b4be";
        return true;
    }

};

// Check City
const checkCity = async (f = true) => {
    var city = document.getElementById("city");
    let option = city.options[city.selectedIndex];

    option = option.index;
    console.log(option);
    let flag;

    if (f === true) {
        flag = true;
    }
    if (option === 0) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        city.style.border = "1.5px solid red";
        return false;
    }
    else {
        city.style.border = "1px solid #b4b4be";
        return true;
    }
};

// Check DOB

const checkDOB = async () => {
    const dob = document.getElementById("dob");
    let flag;
    if (dob.value === '') {
        flag = true;
    }
    if (flag === true) {
        dob.style.border = "1.5px solid red";
        return false;
    }
    else {
        dob.style.border = "1px solid #b4b4be";
        return true;
    }
}

// Check Phone
const checkPhone = async () => {
    const phone = document.getElementById("phone");
    const phnVal = phone.value;
    let flag = false;

    const reg = /^[6-9]{1}[0-9]{9}$/;

    if (phnVal === "") {
        flag = true;
    }
    else if (!reg.test(phnVal)) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        phone.style.border = "1.5px solid red";
        return false;
    }
    else {
        phone.style.border = "1px solid #b4b4be";
        return true;
    }
};

// Check House
const checkHouse = async () => {
    const house = document.getElementById("house");
    const hsVal = house.value;
    let flag = false;

    const reg = /^([\s]*[a-zA-Z0-9]{1,5}[\s]*)([\s])*([\-\/]{0,1}[\s]*)([\s])*([\s]*[a-zA-Z0-9]{0,5}[\s]*)$/;

    if (hsVal === "") {
        flag = true;
    }
    else if (!reg.test(hsVal)) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        house.style.border = "1.5px solid red";
        return false;
    }
    else {
        house.style.border = "1px solid #b4b4be";
        return true;
    }
};

// Check Street
const checkStreet = async () => {
    const street = document.getElementById("street");
    const strVal = street.value;
    let flag = false;

    const reg = /^([\s]*[a-zA-Z]{1,20}[\s]*)(([\s]*[\-]{0,1}[\s]*)([\s]*[a-zA-Z0-9]{0,10}[\s]*)+)$/;

    if (strVal === "") {
        flag = true;
    }
    else if (!reg.test(strVal)) {
        flag = true;
    }
    else {
        flag = false;
    }

    if (flag === true) {
        street.style.border = "1.5px solid red";
        return false;
    }
    else {
        street.style.border = "1px solid #b4b4be";
        return true;
    }
};

// Check PDF

const checkPDF = async () => {

    const certificate = document.getElementById("certificate");
    if (certificate.files) {
        const pdfFile = certificate.files[0];
        // console.log(pdfFile);

        if (pdfFile === undefined || pdfFile === null) {
            return "Medical Certificate is required";
        }

        if (!['application/pdf'].includes(pdfFile.type)) {
            console.log("pdf error");
            return "Only pdf is allowed";
        }

        if (pdfFile.size > 5 * 1024 * 1024) {
            console.log("pdf size error");
            return "File size must be less than 5 MB";
        }

        return true;
    }
    else {
        return "Medical Certificate is required";
    }
};

// Change PDF

const changePDF = async () => {
    const certificate = document.getElementById("certificate");
    console.log(certificate);

    const alertPdf = document.getElementById("alert-pdf");

    if (certificate.files) {
        const pdf = certificate.files[0];
        const flag = await checkPDF();
        console.log(flag);

        if (flag === true) {
            alertPdf.innerHTML = pdf.name;
            return true;
        }

        else if (flag === false) {
            alertPdf.innerHTML = flag;
            return false;
        }
        else {
            alertPdf.innerHTML = flag;
            return false;
        }
    }
};

// Post PDF
const postPDF = async () => {
    const certificate = document.getElementById("certificate");

    if (!certificate.files) {
        return null;
    }

    let flag = await checkPDF(certificate.files[0]);

    if (flag !== true) {
        return null;
    }

    return certificate.files[0];
};


// Post Image
const postImg = async () => {
    const changeImage = document.getElementById("change-image");

    if (changeImage.files.length > 0) {
        let flag = await checkImg(changeImage.files[0]);

        if (flag !== true) {
            return null;
        }
        else
            return changeImage.files[0];
    }
    else
        return null;
};

// Check Image
const checkImg = async (imgFile) => {

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
};

// Change Image
const changeImg = async () => {
    const changeImage = document.getElementById("change-image");
    console.log(changeImage);

    const userImgChange = document.getElementById("user-img-change");
    const alertImg = document.getElementById("alert-img");

    if (changeImage.files) {
        const img = changeImage.files[0];
        const flag = await checkImg(img);
        console.log(flag);

        if (flag === true) {
            alertImg.innerHTML = "";
            alertImg.setAttribute("style", "display:none;");

            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e) => {
                userImgChange.src = e.target.result;
            }
        }

        else if (flag === false) { }
        else {
            alertImg.innerHTML = flag;
            alertImg.setAttribute("style", "display:block;");
        }
    }
};

//Post Data
const postData = async () => {

    try {

        console.log("post data");

        const fnVal = document.getElementById("fname").value;
        const lnVal = document.getElementById("lname").value;
        const phnVal = document.getElementById("phone").value;
        const dobVal = document.getElementById("dob").value;

        const gender = document.getElementById("gender");
        let option4 = gender.options[gender.selectedIndex];
        const genVal = option4.value;

        const specialty = document.getElementById("specialty");
        let option = specialty.options[specialty.selectedIndex];
        const spVal = option.value;

        const hsVal = document.getElementById("house").value;
        const strVal = document.getElementById("street").value;

        const state = document.getElementById("state");
        let option2 = state.options[state.selectedIndex];
        const stVal = option2.value;

        const city = document.getElementById("city");
        let option3 = city.options[city.selectedIndex];
        const ctVal = option3.value;

        const cntVal = document.getElementById("country").value;
        const pinVal = document.getElementById("pin-code").value;

        const img = await postImg();
        const pdf = await postPDF();
        console.log(pdf);
        console.log(img);

        if (pdf === null) {
            return;
        }
        // if (img === null) {
        //     data = JSON.stringify({ ClinicNumber: phnVal, Fname: fnVal, Lname: lnVal, BirthDate: dobVal, Gender: genVal, Speciality: spVal, RoomNumber: hsVal, Street: strVal, Country: cntVal, State: stVal, City: ctVal, Pincode: pinVal, DoctorCertificate: pdf });
        // }
        // else {
        //     data = JSON.stringify({ ClinicNumber: phnVal, ProfilePicture: img, Fname: fnVal, Lname: lnVal, BirthDate: dobVal, Gender: genVal, Speciality: spVal, RoomNumber: hsVal, Street: strVal, Country: cntVal, State: stVal, City: ctVal, Pincode: pinVal, DoctorCertificate: pdf });
        // }

        const data = new FormData();
        data.append('ClinicNumber', phnVal);
        data.append('Fname', fnVal);
        data.append('Lname', lnVal);
        data.append('BirthDate', dobVal);
        data.append('Gender', genVal);
        data.append('Speciality', spVal);
        data.append('RoomNumber', hsVal);
        data.append('Street', strVal);
        data.append('City', ctVal);
        data.append('State', stVal);
        data.append('Country', cntVal);
        data.append('Pincode', pinVal);
        data.append('DoctorCertificate', pdf);

        if (img !== null) {
            data.append('ProfilePicture', img);
        }

        console.log(data);


        const url = 'https://localhost:5001/Doctor/Details/this';
        const params = {
            method: 'POST',

            body: data
        };

        fetch(url, params)
            .then(res =>
            {
                if (res.status !== 201) {
                    throw new Error("data not created");
                }
                else {
                    location.href = "../../Index.html";
                    return res.json();

                }
            })
            .then(data => {
                if (data) {
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            });

        

    } catch (error) {
        console.log(error);
    }
};

const doneFun = async (e) => {
    e.preventDefault();
    postData();

    let btn = 
};

const saveFun = async (e) => {
    e.preventDefault();

    document.getElementById("save-chng-btn").removeAttribute("data-target");

    const check1 = await checkPhone();
    const check2 = await checkDOB();
    const check3 = await checkSpecialty();
    const check4 = await checkHouse();
    const check5 = await checkStreet();
    const check6 = await checkState();
    const check7 = await checkCity();
    const check8 = await checkPinCode();
    const check9 = await changePDF();
    const check10 = await checkFName();
    const check11 = await checkLName();

    if (check1 !== true) {
        return;
    }
    else if (check2 !== true) {
        return;
    }
    else if (check3 !== true) {
        return;
    }
    else if (check4 !== true) {
        return;
    }
    else if (check5 !== true) {
        return;
    }
    else if (check6 !== true) {
        return;
    }
    else if (check7 !== true) {
        return;
    }
    else if (check8 !== true) {
        return;
    }
    else if (check9 !== true) {
        return;
    }
    else if (check10 !== true) {
        return;
    }
    else if (check11 !== true) {
        return;
    }
    else {
        document.getElementById("save-chng-btn").setAttribute("data-target", "#exampleModalCenter");
        const done = document.getElementById("done");
        done.addEventListener("click", doneFun);
    }

};

const load = async () => {
    console.log("Doc Loaded");

    const changeImage = document.getElementById("change-image");
    changeImage.setAttribute("accept", ".jpg, .png");

    const certificate = document.getElementById("certificate");
    certificate.setAttribute("accept", ".pdf");

    const dob = document.getElementById("dob");
    let y = new Date().getFullYear();
    dob.setAttribute("max", `${y - 22}-01-01`);
    dob.setAttribute("min", `${y - 100}-01-01`);

    addState();
    addSpecialty();
};

try {

    load();
    console.log("Doc Reg");

    const changeImage = document.getElementById("change-image");
    changeImage.addEventListener("change", changeImg);

    const certificate = document.getElementById("certificate");
    certificate.addEventListener("change", changePDF);

    const state = document.getElementById("state");
    state.addEventListener("change", changeState);

    const city = document.getElementById("city");
    city.addEventListener("change", changeCity);

    const specialty = document.getElementById("specialty");
    specialty.addEventListener("change", changeSpecialty);

    const phone = document.getElementById("phone");
    phone.addEventListener("blur", checkPhone);

    const dob = document.getElementById("dob");
    dob.addEventListener("blur", checkDOB);

    specialty.addEventListener("blur", checkSpecialty);

    state.addEventListener("blur", checkState);

    city.addEventListener("blur", checkCity);

    const pinCode = document.getElementById("pin-code");
    pinCode.addEventListener("blur", checkPinCode);

    const house = document.getElementById("house");
    house.addEventListener("blur", checkHouse);

    const street = document.getElementById("street");
    street.addEventListener("blur", checkStreet);

    const saveChngBtn = document.getElementById("save-chng-btn");
    saveChngBtn.addEventListener("click", saveFun);

    const regForm = document.getElementById("reg-form");
    regForm.addEventListener("submit", saveFun);
} catch (error) {
    console.log(error);
}
