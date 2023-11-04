
const searchFun = async () => {
    // console.log(value);

    let value = document.getElementById("search-bar").value;
    let search = ['Dentist', 'Dermatologist', 'General Physician', 'Gynaecologist', 'Dietician', 'Gastroentrologist'];

    let searchrResult1 = document.getElementById("searchr-result1");
    searchrResult1.style.display = 'none';
    searchrResult1.innerHTML = "";


    if (value == "") {
        console.log("true");
        return;
    }

    let loc = location.href;
    let x = "";



    const res = await fetch("https://localhost:5001/Search/SearchBar?name="+value)
        .catch(err => console.log(err));

    let data = await res.json();
    console.log(data.length);

    if (data.length != 0) {

        data.forEach(element => {
            if (loc.includes('Index.html')) {
                x += `<li class="search"> <a class="search-link" href="html/doctor_details & payments/doctor_details.html?DoctorId=${element.url}"> <img src="../../${element.profilePhoto}"> ${element.fname} ${element.lname} <span class="doc-search"> ${element.speciality} </span> </a> </li>`;
            }
            else if (loc.includes('doctor_details%20&%20payments')) {
                x += `<li class="search"> <a class="search-link" href="doctor_details.html?DoctorId=${element.url}"> <img src="../../${element.profilePhoto}"> ${element.fname} ${element.lname} <span class="doc-search"> ${element.speciality} </span> </a> </li>`;
            }
            else {
                x += `<li class="search"> <a class="search-link" href="doctor_details & payments/doctor_details.html?DoctorId=${element.url}"> <img src="../../${element.profilePhoto}"> ${element.fname} ${element.lname} <span class="doc-search"> ${element.speciality} </span> </a> </li>`;
            }
        });
    }
    else {

        search.forEach(element => {
            if (element.substring(0, value.length).toLocaleLowerCase() == value.toLocaleLowerCase()) {
                if (loc.includes('Index.html')) {
                    x += `<li class="search"> <a class="search-link" href="html/find_doctor.html?speciality=${element}&Videoconsult=false&page=1"> ${element} <span class="sp-search"> Speciality </span> </a> </li>`;
                }
                else if (loc.includes('doctor_details%20&%20payments')) {
                    x += `<li class="search"> <a class="search-link" href="../find_doctor.html?speciality=${element}&Videoconsult=false&page=1"> ${element} <span class="sp-search"> Speciality </span> </a> </li>`;
                }
                else {
                    x += `<li class="search"> <a class="search-link" href="find_doctor.html?speciality=${element}&Videoconsult=false&page=1"> ${element} <span class="sp-search"> Speciality </span> </a> </li>`;
                }
            }
        });
    }

    console.log(x);

    if (x == "") {
        return;
    }

    searchrResult1.innerHTML = x;
    searchrResult1.style.display = 'block';
    return x;
}

const click = async (e) => {
    let x = e.target.className;
    let searchrResult1 = document.getElementById("searchr-result1");

    let res = await searchFun();
    console.log(res);

    if (res == undefined || res == null) {
        return;
    }

    if (e.target.id == "search-bar") {
        searchrResult1.innerHTML = res;
        searchrResult1.style.display = 'block';
        return;
    }


    if (x == "search-width") { }
    else if (x == "search" || x == "search-link" || x == "sp-search" || x == "searchresult") { }

    else {
        searchrResult1.innerHTML = "";
        searchrResult1.style.display = 'none';
    }
}

let searchBar = document.getElementById("search-bar");

if (searchBar != null && searchBar != undefined) {
    searchBar.addEventListener("keyup", (e) => searchFun());
    document.addEventListener("click", click);
}

let searchForm = document.getElementById("search-form");

if (searchForm != null && searchForm != undefined) {
    searchForm.addEventListener("submit", (e) => e.preventDefault());
}

//console.log(searchBar.value);

//if (searchBar.value != "") {
//    location.reload();
//}