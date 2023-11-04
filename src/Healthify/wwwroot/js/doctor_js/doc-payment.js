import { getPayment } from "../common-app.js";
import { fillUserDetails } from "../../js/user_js/user-panel.js";
import { getPages } from "../user_js/pagination.js";

let id = [];

const load = async () => {

    fillUserDetails();
    let data = await getPayment(1);
    console.log(data);
    let app = document.getElementsByClassName("box-style-payment")[0];
    let x = "", index = 0;
    app.innerHTML = "";
    if (data != null) {
        console.log(data.length);

        for (let i = 0; i < data.length; i++, index++) {
            
            const element = data[i];
            console.log(element);

            //id.push(element.appointment_ID);

            let date = element.app_Date.split(' ');

            x += `<div class="box-style">
                <div class="row g-10">
                    <div class="col-md-1">
                        <div class="date-box-style ml-5">
                            <h5 class="ml-2">${date[0]}</h5>
                            <span class="ml-2">${date[1]}</span>
                        </div>
                    </div>
                    <div class="col-md-7">
                    <div class="patient-payment-details">



                    <div class="medical-test-name">
                        <span class="pay-amount">
                            Amount:₹ ${data[i].price}


                        </span>`;

            

            x += `</div>
                            
                            <div class="pay-app-time">
                            <span>${element.app_Time}</span>
                        </div>
                        <div class="pay-doc-name">
                        <span>For Appointment: ${element.lname} ${element.fName}</span>
                        </div>`;

            x += `
                            </div>
                        </div>
                    
                </div>
            </div>`;

            app.innerHTML = x;

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


    if (document.getElementsByClassName("box-style-payment").length == 0) {
        document.getElementsByClassName("container")[0].innerHTML = "No Content";
        return;
    }
};

document.onload = load();