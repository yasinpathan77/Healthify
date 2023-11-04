const fillUserDetails = async () => {
    const data = await getUserDetails();


    if (data.profilePhoto == null) {
        
        document.getElementById("prof-pic").setAttribute("src", `../../../../images/doctor panel/default.jpg`);
    }
    else {
        document.getElementById("prof-pic").setAttribute("src", data.profilePhoto);
    }

    document.getElementById("name").innerHTML = `${data.fname} ${data.lname} <i class="far fa-edit"></i>`;

    document.querySelectorAll(".dropdown-menu li .dropdown-item")[2].addEventListener("click", (e) => {
        e.preventDefault();
        logOut();
    })

};

const getUserDetails = async () => {
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
    return details;
}

const logOut = async () => {
    console.log("logout");
    fetch("https://localhost:5001/User/Logout")
        .then(res => {
            if (res.status === 200) {
                location.href= "../../../Index.html";
                return;
            }
        })
        .catch(err => {
            console.log(err);
        });
    //location.href ="../../../Index.html";

}

export { getUserDetails, logOut, fillUserDetails };