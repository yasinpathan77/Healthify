const refundApp = async (e) => {
    const id = e.target.dataset.delete;
    console.log(id);
    console.log("Hlo");
    const url = "https://localhost:5001/Admin/Refund?id="+id;


    const res = await fetch(url)
        .catch(err => console.log(err));

    if (res.status == 200) {
        location.reload();
    }
}

const delApp = async (e) => {
    const id = e.target.dataset.app;

    console.log("cofirm");
    const url = "";
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: id })
    };

    const res = await fetch(url, params)
        .catch(err => console.log(err));

    if (res.status == 200) {
        location.reload();
    }
}

const load = async (s = 'All') => {

     const res = await fetch("https://localhost:5001/Admin/AppointmentData");
     if (res.status != 200) {

     }

     const data = await res.json();

    console.log(data);
    let x = "";

    data.forEach(element => {

        x += `<tr>
        <td> ${element.appointment_ID} </td>
        <td><img width="28" height="28" src="${element.profilePicture}" class="rounded-circle m-r-5" alt=""> ${element.fName} ${element.lname}</td>
        <td> Dr. ${element.doc_Fname} ${element.doc_Lname} </td>
        <td> ${element.speciality} </td>
        <td> ${element.date} </td>
        <td> ${element.app_Time} </td>
        <td>`;

        if (element.completed == true) {
            x += `<span class="custom-badge status-green">COMPLETED</span>
            </td>
            <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item view" data-app="${element.appointment_ID}" href="#"><i class="fa fa-pencil m-r-5"></i> View</a>
                </div>
            </div>`;
        }
        else if (element.cancelled == true ) {
            x += `<span class="custom-badge status-red">CANCELLED </span>
            </td>
            <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item view" href="#" data-app="${element.appointment_ID}"><i class="fa fa-pencil m-r-5"></i> View</a>`;

            if (element.refund == true) {
                x += `<a class="dropdown-item refund" href="#" data-toggle="modal" data-target="#refund_appointment" data-app="${element.appointment_ID}"><i class="fa fa-trash-o m-r-5"></i> Refund</a>`;
            }
                
                x += `</div>
            </div>`;
        }
        else {
            x += `<span class="custom-badge status-blue">UPCOMING</span>            
            </td>
            <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item view" href="#" data-app="${element.appointment_ID}"><i class="fa fa-pencil m-r-5"></i> View</a>   
                    <a class="dropdown-item" class="edit" href="edit-appointment.html?appId=${element.appointment_ID}" data-app="${element.appointment_ID}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                    <a class="dropdown-item delete" href="#" data-toggle="modal" data-target="#delete_appointment" data-app="${element.appointment_ID}"><i class="fa fa-trash-o m-r-5"></i> Cancel</a>
                </div>
            </div>`;
        }

        //     x += `
        //     </td>
        //     <td class="text-right">
        //         <div class="dropdown dropdown-action">
        //             <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
        //             <div class="dropdown-menu dropdown-menu-right">
        //                 <a class="dropdown-item" href="edit-appointment.html?appId=${element.id}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
        //                 <a class="dropdown-item delete" href="#" data-toggle="modal" data-target="#delete_appointment"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
        //             </div>
        //         </div>
        //     </td>
        // </tr>`;

        x += `</td> </tr>`;

    });

    document.querySelectorAll(".custom-table tbody")[0].innerHTML = x;

    let view = document.getElementsByClassName("view");
    let del = document.getElementsByClassName("delete");
    let refund = document.getElementsByClassName("refund");
    let edit = document.getElementsByClassName("edit");

    // if(view.length > 0){
    //     for (let i = 0; i < view.length; i++) {
    //         view[i].addEventListener("click", viewApp);            
    //     }
    // }

    if (del.length > 0) {
        for (let i = 0; i < del.length; i++) {
            del[i].addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById("delete-btn").setAttribute("data-delete", e.target.dataset.app);
            });
        }

        document.getElementById("delete-btn").addEventListener("click", delApp);
    }

    if (refund.length > 0) {
        for (let i = 0; i < refund.length; i++) {
            refund[i].addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById("refund-btn").setAttribute("data-delete", e.target.dataset.app);

            });
        }

        document.getElementById("refund-btn").addEventListener("click", refundApp);
    }

    if (edit.length > 0) {
        for (let i = 0; i < del.length; i++) {
            edit[i].addEventListener("click", editApp);
        }
    }
}

// const deleteApp = async (e) => {
//     e.preventDefault();
//     const appId = e.target.dataset.delete;
//     console.log(appId);

//     const url = "";
//     const params = {
//         method: 'POST',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify({ appId: appId })
//     }

//     const res = await fetch(url, params)
//         .catch(err => console.log(err));

//     if (res.status != 200) {
//         console.log("Error");
//     }
// }

document.onload = load();

const select = document.getElementsByClassName("floating")[0];
console.log(select.value);

select.addEventListener("change", (e) => {
    console.log(e.target.value);
    // load(e.target.value);
});

// document.getElementsByClassName("select-focus")[0].addEventListener("click", (e)=>{
//     let s1 = document.getElementById("select2-oqmd-result-0dt0-All");
//     let s2 = document.getElementById("select2-6l9c-result-tryl-Upcoming");
//     let s3 = document.getElementById("select2-6l9c-result-18o5-Completed");
//     let s4 = document.getElementById("select2-6l9c-result-1y4j-Cancelled");

//     console.log(s1, s2, s3, s4);
//     const getOpt = (x)=>{
//         let i = x.lastIndexOf(x);
//         if(i != -1){
//             return x.substring(i+1, x.length);
//         }
//         else{
//             return null;
//         }
//     }

//     if(s1 != null){
//         s1.addEventListener("click", (e)=>{
//             e.preventDefault();
//             // load(getOpt(e));
//             console.log(getOpt(e.target.id));
//         });
//     }
// });
