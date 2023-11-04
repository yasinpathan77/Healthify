//const fillDocDetails = async () => {

//    let data = await getDocDetails();
//    if (data.profilePhoto == null) {

//        document.getElementById("prof-pic").setAttribute("src", `../../../../images/doctor panel/default.jpg`);
//    }
//    else {
//        document.getElementById("prof-pic").setAttribute("src", data.profilePhoto);
//    }

//    document.querySelector("#name").innerHTML = `${data.fname} ${data.lname}`;

    
//};

//const getDocDetails = async () => {
//    const url = "https://localhost:5001/User/IsLogIn";

    
//    let details = null;

//    const res = await fetch(url)
//        .catch(err => {
//            console.log(err);
//        });

//    if (res.status == 200) {
//        details = await res.json();
//    }
//    console.log(details);

//    return details;
//};

//const logOut = async () => {
//    console.log("logout");
//    fetch("https://localhost:5001/User/Logout")
//        .then(res => {
//            if (res.status === 200) {
//                console.log("uytucr");
//                location.href = "../../Index.html";
//            }
//        })
//        .catch(err => {
//            console.log(err);
//        });
//    location.href = "../../Index.html";

//}

//try {

//    document.onload = fillDocDetails();

//} catch (error) {
//    console.log(error);
//}

const fillDocDetails = async () => {

    let data = await getDocDetails();

    if (data.profilePhoto == null) {

        document.getElementById("prof-pic").setAttribute("src", `../../../../images/doctor panel/default.jpg`);
    }
    else {
        document.getElementById("prof-pic").setAttribute("src", data.profilePhoto);
    }

    document.querySelector("#name").innerHTML = `${data.fname} ${data.lname}`;

    if (data.role == 'User') {
        if (location.href.includes('/doctor/')) {

            if (location.href.includes('doc-reg.html')) { }

            else {
                let main = document.getElementsByTagName("main");

                console.log("Hello");

                if (main.length != 0) {

                    main = main[0];
                    main.innerHTML = `Register as a Doctor`;
                }
            }
        }
    }
};

const getDocDetails = async () => {
    const url = "https://localhost:5001/User/IsLogIn";

    let details = null;

    const res = await fetch(url)
        .catch(err => {
            console.log(err);
        });

    if (res.status == 200) {
        details = await res.json();
    }
    console.log(details);

     //let myAcc = document.querySelectorAll(".my-acc-style ul li");
     //if(myAcc.length != 0){

     //    if(details.status == 'User'){
     //        myAcc[0].remove();
     //        myAcc[1].remove();
     //    }
     //}

    return details;
};

const logOut = async () => {
    console.log("logout");
    fetch("https://localhost:5001/User/Logout")
        .then(res => {
            if (res.status === 200) {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

try {

    document.onload = fillDocDetails();

} catch (error) {
    console.log(error);
}