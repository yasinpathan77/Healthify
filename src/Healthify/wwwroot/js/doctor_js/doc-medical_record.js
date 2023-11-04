// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//     'use strict';

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation');

//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms).forEach((form) => {
//         form.addEventListener('submit', (event) => {
//             if (!form.checkValidity()) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//         }, false);
//     });
// })();

// const updateProduct = []

// var month_name = function (dt) {
//     mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return mlist[dt.getMonth()];
// };
// // console.log(month_name(new Date("10/11/2009")));

// const showMedicalRecord = function (userdata) {
//     var userday = userdata.date;
//     const myArray = userday.split("-");
//     console.log(userdata)
//     const html = `
//         <div class="box-style">
//           <div class="row g-10">
//           <div class="col-md-1">

//               <div class="date-box-style ml-5">
//                 <h5 class="ml-2">${myArray[2]}</h5>
//                 <span class="ml-2">${month_name(new Date(userday))}</span>
//               </div>
//           </div>
//             <div class="col-md-7">
//               <div class="patient-detail-medical">



//                 <div class="medical-test-name">
//                   <span class="test-name">${userdata.title}</span>
//                   <span class="new-tag ml-2 mt-5">New</span>
//                 </div>


//                 <div class="test-user-name">
//                   <span>Record for ${userdata.user} </span>
//                 </div>

//               </div>
//             </div>

//             <div class="col-md-2 record-details">

//               <p>1 record</p>
//             </div>
//             <div class="col-md-2">


//               <div class="dropdown show mt-4">
//                 <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
//                   aria-haspopup="true" aria-expanded="false">
//                   <i class="fas fa-ellipsis-v mt-1"></i>
//                 </a>

//                 <div class="dropdown-menu detail-style" aria-labelledby="dropdownMenuLink">
//                   <a class="dropdown-item" href="#"><button>View</button></a>
//                   <a class="dropdown-item" href="#"><button id=${userdata.title} onClick="gotoDelete('\' + title + '\')" >Delete</button></a>

//                 </div>
//               </div>


//             </div>

//           </div>
//         </div>
//        `;
//     document.querySelector('#displayRecord').insertAdjacentHTML('afterbegin', html);
// }

// function medicalReport() {
//     document.querySelector('.display_none').style.display = "none";

//     document.querySelector('#displayRecord').innerHTML = '';
//     var obj = {};
//     obj["files"] = document.getElementById('files').value;
//     obj["title"] = document.getElementById('title').value;
//     obj["user"] = document.getElementById('user').value;
//     obj["date"] = document.getElementById('date').value;
//     updateProduct.push(obj);
//     updateProduct.forEach(data => showMedicalRecord(data));
//     console.log(updateProduct)
// }

// function gotoDelete(title) {
//     console.log(title)
//     console.log('delete');
//     // document.querySelector('#displayRecord').innerHTML = '';
//     console.log(updateProduct.findIndex(data => data.title === title))
//     const index = updateProduct.findIndex(data => data.title === title);
//     updateProduct.splice(index, 1);
//     updateProduct.forEach(data => showMedicalRecord(data));
// }

import { fillUserDetails } from "../../js/user_js/user-panel.js";

import { getPages } from "../user_js/pagination.js";


const deleteRecord = async (e) => {
    let id = e.target.dataset.del;
    console.log("delete for:  " + id);

    const url = "https://reqres.in/api/users";
    const params = {
        method: 'DELETE',
        // body: JSON.stringify({Id: id})
    }
    const res = await fetch(url, params)
        .catch(err => console.log(err));

    if (res.status == 200) {
        location.reload();
    }
}

const load = async () => {
    fillUserDetails();
    console.log("load fired");
    let displayRecord = document.getElementById("displayRecord");
    displayRecord.innerHTML = "";

    const url = "https://localhost:5001/Doctor/PatientRecord";
        const res = await fetch(url)
        .catch(err=> console.log(err));

        if(res.status != 200){
          displayRecord.innerHTML = "No Content";
          return;
        }

        let data = await res.json();


    let x = "";

    console.log(data);

    data.forEach(element => {
        let d = element.date.split(' ');
        x += ` <div class="box-style">
      
  <div class="row g-10">

  <div class="col-md-1">

    <div class="date-box-style ml-5">
      <h5 class="ml-2"> ${d[0]} </h5>
      <span class="ml-2"> ${d[1]} </span>
    </div>
  </div>
  <div class="col-md-7">
    <div class="patient-detail-medical">
      <div class="medical-test-name">
        <span class="test-name">PATIENT : ${element.fname} ${element.lname}</span>
      </div>

      <div class="app-time">
        <span>${element.filename}</span>
      </div>
      
      <div class="app-time">
        <span>${element.time}</span>
      </div>
    </div>
  </div>

  <div class="col-md-2 record-details">

    <p>1 record</p>
  </div>
  <div class="col-md-2">

  <div class="dropdown my-acc-style dotted">
  <button class="account-btn" id="options" data-bs-toggle="dropdown" aria-expanded="false">
  <img src = "../../images/user panel/three-dots-vertical.svg">
  </button>
  <ul class="dropdown-menu" aria-labelledby="options">
      <li><a class="dropdown-item" href="${element.pathname}" target="_blank">View</a></li>
      <li><a class="dropdown-item delete" data-del="${element.id}"> Delete </a></li>
  </ul>
  </div>
    </div>


  </div>

</div>`;
    });

    displayRecord.innerHTML = x;

    displayRecord.innerHTML += `<div class="main-pagnation">
                            <div class="pagination mt-3 justify-content-end">
                              
                                <li class="page-item previous-page"><a class="page-link" href="#">Prev</a></li>
                                <li class="page-item current-page"><a class="page-link" href="#">1</a></li>
                                <li class="page-item dots"><a class="page-link" href="#">...</a></li>
                                <li class="page-item current-page"><a class="page-link" href="#">2</a></li>
                                <li class="page-item current-page"><a class="page-link" href="#">3</a></li>
                                <li class="page-item dots"><a class="page-link" href="#">...</a></li>
                                <li class="page-item current-page"><a class="page-link" href="#">10</a></li>
                                <li class="page-item next-page"><a class="page-link" href="#">Next</a></li>
                                    
                            </div>
                        </div>`;
    getPages();
}

document.onload = load();

let del = document.getElementsByClassName("delete");
console.log(del);
for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", deleteRecord);
}

let boxStyle = document.getElementsByClassName("box-style");
if (boxStyle.length > 0) {
    for (let i = 0; i < boxStyle.length; i++) {
        boxStyle[i].addEventListener("dblclick", (e) => {
            e.preventDefault();
            boxStyle[i].children[0].children[3].children[0].children[1].children[0].children[0].click();
        });

    }
}