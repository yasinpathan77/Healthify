
const fillDocs = async () => {

    const data = await getDocs();
    console.log(data);

    if (data === null || data === undefined || data.length == 0) {
        fillEmptyDocs();
        return;
    }

    let docsHead = document.getElementById("docs-head");

    docsHead.innerHTML = `<h4 class="heading_style"> <span id="total-docs"> `;
    docsHead.innerHTML += data.length > 1 ? `${data.length} doctors` : `${data.length} doctor`;
    docsHead.innerHTML += ` available </span> </h4> <p style="color: #787887;font-size: 14;"><i class="far fa-check-circle"></i>  Book appointments with minimum wait-time & verified doctor details</p>`;

    let docs = document.getElementById("docs");

    data.forEach(element => {
        let id = element.url;
        console.log(id);
        let url = 'doctor_details & payments/doctor_details.html?DoctorId=' + id;
        docs.innerHTML += `
          <div class="row ">
          <div class="col">
            <div class="card mb-1 " style="max-width:1040px;">
              <div class="row no-gutters">
                <div class="col-md-3">
                  <img src="${element.profilePhoto}" class="card-img" alt="...">
                </div>
                <div class="col-md-6">
                  <div class="card-body">
                    <div>
                      <a href="${url}" style="text-decoration: none ;">
                        <h5 class="card-title"><i class="fas fa-user-md"></i> ${element.fname} ${element.lname} </h5>
                      </a>
                    </div>
                    <div>
                      <span class="card-text">${element.speciality}</span>
                    </div>
                    <div>
                      <p>${element.experienceInTotal} years experience overall</p>
                    </div>
                    <div>
                      <p><i class="fas fa-map-marker-alt"> </i> ${element.street}, ${element.city} </p>
                    </div>
                    <div>
                      <p> ₹ ${parseInt(element.price) * 1000} Consultation fee </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div style="padding-top: 105;">
                    <p><i class="far fa-calendar-alt"></i> Available Today</p>
                    <div>
                    <a href="${url}">
                      <button class="btn btn-primary justify-content-end" type="button">Book Appointment</button>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
          `;
    });
}

const fillEmptyDocs = async () => {
    document.getElementById("docs").innerHTML = `
  <div class="em-li">
    <img src="../images/not-found.jpg" alt="">
    <div class="h4"> 
      Sorry! We could not find the right doctors for you.
    </div>  
    <p> <a href="../index.html"> Click here </a> to go to home page.</p>
  </div>
  `;
}

const getDocs = async () => {

    try {
        let url = location.href;
        const i = url.indexOf('?');
        let q = "";
        if (i !== -1) {
            q = url.substring(i, url.length);
        }

        url = 'https://localhost:5001/Search/FindDoctor' + q;
        console.log(url);
        const res = await fetch(url);

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            return data;
        }
        else {
            return null;
        }

    } catch (error) {
        console.log(error)
    }
}

try {

    console.log("Find doctors");
    document.body.onload = fillDocs();


} catch (error) {
    console.log(error);
}
