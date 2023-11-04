import { getPages } from "../user_js/pagination.js";
import { getFeedback } from "../common-app.js";
import { fillUserDetails } from "../../js/user_js/user-panel.js";


const load = async () => {
    fillUserDetails();

    let data = await getFeedback(1);


    console.log(data);


    let x = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let date = element.date.split(' ');

        x += `<div class="box-style">
        <div class="row g-10">

        <div class="col-md-1">

            <div class="date-box-style ml-5">
                <h5 class="ml-2"> ${date[0]} </h5>
                <span class="ml-2"> ${date[1]} </span>
            </div>
        </div>
        <div class="col-md-7">
            <div class="feedback-details">



                <div class="feedback-star">
                    


                    <label for="report-rd"> ${element.experience} </label>

                </div>

                <div class="feedback-time">
                    <span> ${element.time} </span>
                </div>

                <div class="feedback-doc-name">
                    <span>To: Dr. ${element.doc_Fname} ${element.doc_Lname}</span>
                </div>

            </div>
        </div>

    </div>
</div>
</div>`;
    }

    let app = document.getElementsByClassName("box-style-feedback")[0];

    app.innerHTML = x;

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
        document.getElementsByClassName("box-style-feedback")[0].innerHTML = "No Content";
        return;
    }
}

document.onload = load();