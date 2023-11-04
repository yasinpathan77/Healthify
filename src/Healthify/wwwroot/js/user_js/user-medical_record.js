import { getPages } from "../user_js/pagination.js";
import { logOut, fillUserDetails } from "../user_js/user-panel.js";


const changePDF = () => {
    const files = document.getElementById("files").files;

    let x = [];
    for (const iterator of files) {
        x.push(iterator);
    }

    let check = checkPDF(x);
    if (typeof check != 'object') {
        document.getElementById("al-file").innerHTML = check;
        return null;
    }
    else {
        document.getElementById("al-file").innerHTML = "";
        return check;
    }
}

const checkPDF = (files) => {

    if (files.length == 0) {
        return "File is required";
    }
    for (let i = 0; i < files.length; i++) {
        if (!['application/pdf'].includes(files[i].type)) {
            return "Only pdf are allowed";
        }
    }

    return files;
}

const changeType = () => {
    let types = document.getElementsByName("types");

    let flag = false;
    for (let i = 0; i < types.length; i++) {
        if (types[i].checked == true) {
            flag = types[i].value;
        }
    }

    if (flag == false) {
        document.getElementById("al-type").innerHTML = "Please select the type of file";
    }
    else {
        document.getElementById("al-type").innerHTML = "";
    }
    return flag;
}

const uploadFun = async (e) => {
    e.preventDefault();

    let check1 = changePDF();

    if (typeof check1 != 'object' || check1 == null) {
        return;
    }

    let check2 = changeType();
    if (check2 == false) {
        return;
    }

    document.getElementById("close-upload").click();

    let json = {}
    json['FormFiles'] = check1;
    json['Type'] = check2;
    json['Change'] = true;
    console.log(json);

    const fd = new FormData();
    fd.append('FormFiles', JSON.stringify.check1);
    for (let i = 0; i < check1.length; i++) {
        fd.append('FormFiles', check1[i]);
    }
    fd.append('FileType', check2);
    fd.append('Change', false);

    console.log("now upload");
    const url = "https://localhost:5001/Patient/MedicalRecords";
    const params = {
        method: 'POST',
        body: fd
    }
    const res = await fetch(url, params);


    console.log(fd.getAll('FormFiles')[1]);

    let data = null;
    if (res.status == 201) {
        document.getElementById("close-upload").click();
        location.reload();
        return;

    }
    else {
        data = await res.json();
    }

    console.log(data);

    for (let i = 0; i < data.length; i++) {

        let x = `<button type="button" id="p${i}" data-toggle="modal" data-target="#pop-${i}" data-whatever="@getbootstrap" style="display: none;"> </button>

            <div class="modal fade" id="pop-${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel" style="color:white"> Replace File </h5>
                            <button type="button" class="close" id="cross-replace-${i}" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style="color: white;">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- <img src="doctors/feedback-and-giving-rating-design-concept-for-customer-satisfaction-illustration-vector.jpg" alt="" width="500px"> -->
                            <h5 style="font-size: 15px;padding:16px 5px ;">The file named <span id="dup-file"> ${data[i].filename} </span> already exists. </h5>                
                            <h5 style="font-size: 15px;padding:16px 5px ;">Are you sure to replace the file ?</h5>                
    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="send-btn-style" id="replace-${i}" >Yes</button>
                            <button type="button" class="close-btn-style" id="close-replace-${i}" data-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementsByClassName("col-md-3")[0].innerHTML += x;
    }


    clickPopUps(data, check2);


    document.getElementsByClassName("btn-style")[0].setAttribute("data-target", "#exampleModalCenter");
}

const clickPopUps = (data, type) => {

    console.log("clickpopoup");

    for (let i = 0; i < data.length; i++) {

        console.log(`rr-${i}`);

        document.getElementById(`p${i}`).click();
        document.getElementById(`replace-${i}`).addEventListener("click", (e) => {
            console.log("Okay");
            e.preventDefault();
            console.log("clicked");

            let json = {}
            json['FormFiles'] = files[files.length - 1 - data[i].index];
            json['Type'] = type;
            json['Change'] = true;
            console.log(json);

            let nfd = new FormData();

            nfd.append('FormFiles', files[files.length - 1 - data[i].index]);
            nfd.append('Type', type);
            nfd.append('Change', true);

            document.getElementById(`close-replace-${i}`).click();
            document.getElementById(`pop-${i}`).remove();
        });

        console.log("Okaythis");

        document.getElementById(`close-replace-${i}`).addEventListener("click", (e) => {
            e.preventDefault();
            load();
        })

    }
    console.log("returinig form click poppup");
}


const deleteRecord = async (e) => {
    let id = e.target.dataset.del;
    console.log("delete for:  " + id);

    const url = "https://localhost:5001/Patient/DeleteRecords";
    const params = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ Id: id })
    }
    const res = await fetch(url, params)
        .catch(err => console.log(err));

    if (res.status == 200) {
        location.reload();
    }
}

const changeDocs = (id) => {

    const checks = document.getElementsByClassName(`doc-check-${id}`);
    console.log(checks);
    let x = [];
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked == true) {
            x.push(checks[i].value)
        }
    }
    return x;
}

const shareRecord = async (e) => {
    let id = e.target.dataset.share;
    console.log(id);

    console.log(`s${id}`);

    const checks = document.getElementsByClassName(`doc-check-${id}`);
    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener("change", () => { console.log(id); changeDocs(id); });
    }
    document.getElementById(`access-${id}`).addEventListener("click", (e) => {
        e.preventDefault();
        console.log(`access-${id}`);


        let x = changeDocs(id);

        if (x.length == 0) {
            document.getElementById(`form-${id}`).reset();
            document.getElementById(`close-access-${id}`).click();
            return;
        }

        const share = {
            Id: id,
            Docs: x
        }

        console.log(share);

        const params = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(share)
        }

        const url = "https://localhost:5001/Patient/ShareWithDoctor";
        fetch(url, params)
            .then(res => { return res.json(); })
            .then(data => { console.log(data); })
            .catch(err => { console.log(err); });

    });

    document.getElementById(`close-access-${id}`).addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(`form-${id}`).reset();
    });

    document.getElementById(`cross-access-${id}`).addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(`form-${id}`).reset();
    });
}

const remEff = () => {
    document.getElementById("al-file").innerHTML = "";
    document.getElementById("al-type").innerHTML = "";
    document.getElementById("upload-form").reset();
}

const load = async () => {

    fillUserDetails();

    console.log("load fired");
    let displayRecord = document.getElementById("displayRecord");
    displayRecord.innerHTML = "";

    const url = "https://localhost:5001/Patient/MedicalRecords";

    const res = await fetch(url)
        .catch(err => console.log(err));

    if (res.status != 200) {
        displayRecord.innerHTML = "No Content";
        return;
    }

    let data = await res.json();

    const url2 = "https://localhost:5001/Patient/GetPatientDoctor";

    const res2 = await fetch(url2)
        .catch(err => console.log(err));

    let doc = [];
    if (res2.status == 200) {
        doc = await res2.json();
    }


    let x = "";

    console.log(data);
    console.log(doc);
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
          <span class="test-name"> ${element.type} </span>
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
        <li><a class="dropdown-item share" data-share="${element.id}" data-toggle="modal" href="#accessToDocs-${element.id}"> Share </a></li>
        <li><a class="dropdown-item delete" data-del="${element.id}"> Delete </a></li>
    </ul>
    </div>
      
        <div class="modal fade" tabindex="-1" role="dialog"
                                     id="accessToDocs-${element.id}" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title main-title" id="exampleModalLongTitle">Give Access to Doctors</h5>
                                                <button type="button" class="close" id="cross-access-${element.id}" data-dismiss="modal" aria-label="Close"
                                                        style="color: white;">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div class="modal-body">`;

        if (doc.length > 0) {
            x += `<form action="" id="form-${element.id}" class="needs-validation">
                    Select the doctors to give access to your file: <br><br>
                    <ul class="doc-list">`
            for (let i = 0; i < doc.length; i++) {
                x += `<li> <img class="doc-img" src="../../${doc[i].profilePhoto}"> Dr. ${doc[i].fname} ${doc[i].lname} <input type="checkbox" value="${doc[i].url}" class="doc-ch doc-check-${element.id}"> </li>`
            }
            x += `</ul></form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="close-btn-style" id="close-access-${element.id}" data-dismiss="modal">Close</button>
                            <button type="submit" class="done-btn-style" id="access-${element.id}">Done</button>
                        </div>`;
        }
        else {
            x += `
                You have not taken any appointments yet.
            </div>
            <div class="modal-footer"> 
                <button type="button" class="close-btn-style" data-dismiss="modal">Close</button>
            </div>`
        }

        x +=
            `
                                            

                                        </div>
                                    </div>
                                </div>
      </div>


    </div>

  </div>
</div>`;
    });


    displayRecord.innerHTML += x;

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

    let share = document.getElementsByClassName("share");
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        share[i].addEventListener("click", shareRecord);
    }

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
}

document.onload = load();

document.getElementById("upload").addEventListener("click", uploadFun);

document.getElementById("files").addEventListener("change", changePDF);

let t = document.getElementsByName("types");
for (let i = 0; i < t.length; i++) {
    t[i].addEventListener("change", changeType);
}

document.getElementById("close-upload").addEventListener("click", remEff);

document.getElementById("cross-upload").addEventListener("click", remEff);