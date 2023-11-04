import { getAppointment } from "../common-app.js";
import { logOut, fillUserDetails } from "../user_js/user-panel.js";
import { getPages } from "../user_js/pagination.js";
let id = [];

const load = async () =>
{

    fillUserDetails();
    let data = await getAppointment(0, 1);
    

    let app = document.getElementsByClassName("card-content")[0];
    let x = "", index = 0;
    app.innerHTML = "";
    if (data != null) {
        console.log(data);

        for (let i = 0; i < data.length; i++, index++)
        {
            x = "";
            const element = data[i];
            id.push(element.appointment_ID);
            let date = element.app_Date.split(' ');
            x = `<div class="box-style">
                <div class="row g-10">
                    <div class="col-md-1">
                        <div class="date-box-style ml-5">
                            <h5 class="ml-2">${date[0]}</h5>
                            <span class="ml-2">${date[1]}</span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="doc-detail">
                            
                            <div class="app-doc-name">
                                <span class="doc-name-style"> Dr.${element.fName} ${element.lname} </span>`;

            x += `
                                <span class="upcoming-tag ml-1 ">
                                    <i class="fas fa-check mr-1"
                                    style="font-size: 0.8rem;"></i>Upcoming
                                </span>
                                
                            </div>
                            
                            <div class="app-time">
                                <span>${element.app_Time}</span>
                            </div>
                            <div class="app-place">`;

            if (element.mode == 'Online') {
                x += `<span> Online (${element.speciality})</span>`;
            }
            else {
                x += `<span> At Clinic (${element.speciality})</span>`;
            }

            x += `
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 d-flex flex-row-reverse">
                
                        <a href = "../doctor_details & payments/confirm-appointment.html?appointment_ID=${element.appointment_ID}">
                        <button class="btn-style">View Details</button>
                        </a>
                    </div>
                </div>
            </div>`;
            app.innerHTML += x;
            
        }
    }


    data = await getAppointment(0, 0);
    x = "";

    if (data != null) {

        console.log(data);


        for (let i = 0; i < data.length; i++, index++)
        {
            x = "";
            const element = data[i];

            id.push(element.appointment_ID);
            let date = element.app_Date.split(' ');
            x = `<div class="box-style">
                <div class="row g-10">
                    <div class="col-md-1">
                        <div class="date-box-style ml-5">
                            <h5 class="ml-2">${date[0]}</h5>
                            <span class="ml-2">${date[1]}</span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="doc-detail">
                            
                            <div class="app-doc-name">
                                <span class="doc-name-style"> Dr.${element.fName} ${element.lname} </span>`;

            if (element.cancelled == true) {
                x += `
                                    <span class="cancelled-tag ml-1 ">
                                        <i class="fas fa-times mr-1"
                                        style="font-size: 0.8rem;"></i>Cancelled
                                    </span>`;
            }
            else if (element.completed == true) {
                x += `
                                    <span class="sucessfull-tag ml-1 ">
                                        <i class="fas fa-check mr-1"
                                        style="font-size: 0.8rem;"></i>Completed
                                    </span>`;
            }


            x += `
                            </div>
                            
                            <div class="app-time">
                                <span>${element.app_Time}</span>
                            </div>
                            <div class="app-place">`;

            if (element.mode == 'Online') {
                x += `<span> Online </span>`;
            }
            else {
                x += `<span> At Clinic </span>`;
            }

            x += `
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 d-flex flex-row-reverse">
                        <a href = "../doctor_details & payments/confirm-appointment.html?appointment_ID=${element.appointment_ID}">
                        <button class="btn-style">View Details</button>
                        </a>          
                    </div>
                </div>
            </div>`;

            app.innerHTML += x;
           
            
        }

    }
    app.innerHTML += `<div class="main-pagnation">
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
    if (document.getElementsByClassName("box-style").length == 0) {
        document.getElementsByClassName("card-content")[0].innerHTML = "No Content";
        return;
    }
};

document.onload = load();



// let btnStyle = document.getElementsByClassName("btn-style");
// for (let i = 0; i < btnStyle.length; i++) {
//     btnStyle[i].addEventListener("click", (e)=>{
//         console.log(id[i]);

//         if()
//     });

// }