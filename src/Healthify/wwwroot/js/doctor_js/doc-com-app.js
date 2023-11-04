import { getAppointment } from "../common-app.js";
import { fillUserDetails } from "../user_js/user-panel.js";
import { getPages } from "../user_js/pagination.js";

let id = [];

const load = async () => {

    fillUserDetails();
    let data;

    let app = document.getElementsByClassName("box-style-com")[0];
    app.innerHTML = "";
    let x = "", index = 0;

    data = await getAppointment(1, 0);
    // data = [
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 09:00 AM",
    //         "appointment_ID": 17,
    //         "mode": "Online",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 10:00 AM",
    //         "appointment_ID": 20,
    //         "mode": "Offline",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 09:30 AM",
    //         "appointment_ID": 21,
    //         "mode": "Online",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 04:30 PM",
    //         "appointment_ID": 25,
    //         "mode": "Online",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 07:00 PM",
    //         "appointment_ID": 29,
    //         "mode": "Online",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 09:30 AM",
    //         "appointment_ID": 30,
    //         "mode": "Offline",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     },
    //     {
    //         "app_Date": "27 Mar",
    //         "app_Time": "Sunday, 07:30 PM",
    //         "appointment_ID": 32,
    //         "mode": "Online",
    //         "fName": "Manthan",
    //         "lname": "Solanki",
    //         "completed": false,
    //         "cancelled": true,
    //         "refund": false,
    //         "speciality": "Dentist",
    //         "price": 0,
    //         "amountRefunded": 0
    //     }
    // ];
    x = "";
    console.log(data);
    if (data != null || data.length != 0) {

        for (let i = 0; i < data.length; i++, index++) {
            const element = data[i];
            x = "";

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
                                <span class="doc-name-style"> ${element.fName} ${element.lname} </span>`;

            if (element.completed == true) {
                x += `
                                    <span class="sucessfull-tag ml-1 ">
                                        <i class="fas fa-check mr-1"
                                        style="font-size: 0.8rem;"></i>Completed
                                    </span>`;
            }
            if (element.cancelled == true) {
                x += `
                                    <span class="cancelled-tag ml-1 ">
                                        <i class="fas fa-times-circle mr-1"
                                        style="font-size: 0.8rem;"></i> Cancelled
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
                    <a href="../doctor_details & payments/doc-confirm-appointment.html?appointment_ID=${element.appointment_ID}">
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


    if (document.getElementsByClassName("btn-style").length == 0) {
        document.getElementsByClassName("box-style-com")[0].innerHTML = "No Content";
        return;
    }

};

document.onload = load();