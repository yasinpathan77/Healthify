const load = async () => {
    // if(document.referrer == '' || (!document.referrer.includes("/user panel/appointment.html"))){

    // }

    let currUrl = location.href;
    let id = currUrl.indexOf("?");
    if (id != -1) {
        id = currUrl.substring(id + 1, currUrl.length);
        id = id.split('=');
        id = id[1];
    }
    else {
        id = "";
    }

       const url = "https://localhost:5001/Appointment/PanelAppointmentDetails?Appointment_ID="+id;

       const res = await fetch(url)
       .catch(err=> {
           console.log(err);
       });

    let data = null;
       if(res.status == 200){
           data = await res.json();
      }
      console.log(data);

    //data = {
    //    app_Time: "07 : 30 PM",

    //    appointment_ID: 32,

    //    appointment_Id: 0,

    //    cancelled: false,

    //    city: "Ahmedabad",

    //    clinicName: "Dr. Yasin Pathan Multi Speciality & Cosmetic Dental Hospital",

    //    completed: false,

    //    country: "India",

    //    date: "Sun 27,Mar 2022",

    //    doc_Fname: "Yasin",

    //    doc_Lname: "Pathan",

    //    dt_Refunded: null,

    //    dt_Rf_Applied: null,

    //    email: "manthansolanki812@gmail.com",

    //    fName: "Manthan",

    //    lname: "Solanki",

    //    mode: "Online",

    //    person: null,

    //    pincode: 380052,

    //    price: 1,

    //    profilePicture: "/Profile/yasinpathanp@gmail.com.jpg",

    //    reason: null,

    //    refund: true,

    //    roomNumber: "23A",

    //    someOneElse: false,

    //    speciality: "Dentist",

    //    specialization: ["Dentist", "Cosmetic/Aesthetic Dentist", "Implantologist", "Oral Pathologist"],

    //    state: "Gujarat",

    //    street: "Jivraj Park",

    //    feedback: null,

    //    feedbackText: null
    //};


    if (data.mode == 'Online') {
        document.getElementById("mode").innerHTML = `<i class="fas fa-clinic-medical"></i> Online Appointment`;
        document.getElementsByClassName("row")[4].style.display = 'none';
    }
    else {
        document.getElementById("mode").innerHTML = `<i class="fas fa-clinic-medical"></i> In-Clinic Appointment`;
        document.getElementById("cl-name").innerHTML = data.clinicName;
        document.getElementById("cl-addr").innerHTML = `${data.roomNumber}, ${data.street}, ${data.city}, <br> ${data.state} - ${data.pincode}`;
    }

    document.getElementById("speciality").innerHTML = data.speciality;

    let s = data.specialization;
    let x = "";
    for (let i = 0; i < s.length; i++) {
        if (i == s.length - 1) {
            x += s[s.length - 1];
        }

        else {
            x += s[i] + ', ';
        }
    }

    document.getElementById("specialization").innerHTML = x;

    document.getElementById("date").innerHTML = '<i class="far fa-calendar-alt"></i> On ' + data.date;
    document.getElementById("time").innerHTML = '<i class="far fa-clock"></i> At ' + data.app_Time;
    document.getElementById("doc-img").setAttribute("src", data.profilePicture);
    //document.getElementById("speciality").innerHTML = data.speciality;
    //document.getElementById("spec").innerHTML = speciality[0];

    if (data.cancelled == true) {
        showCancelled(data);
    }

    if (data.completed == true) {
        showCompleted(data);
    }

    if (data.completed == false && data.cancelled == false) {
        showUpcoming(data);
    }
}

const showUpcoming = (data) => {
    let x = `<div>
        <h1>Dr. ${data.doc_Fname} ${data.doc_Lname}</h1>
    </div>

    <div>
        <p>
            We noticed that you have booked an appointment with
            <span> ${data.fName} ${data.lname}</span> on <span>${data.date} </span> at  <span>${data.app_Time}</span>
        </p>
        <p> Patient Name: <span> ${data.fName} ${data.lname} </span> </p>
    </div>
    <div>
        <p>If you wish to reschedule or cancel your appointment please use the following links</p>

    </div>

    <div>

        <div>
        <p> Enter OTP to Start Appointment: </p>
        <input id="otp" class="form-control form-control-sm" type="text" style="border: 1px solid gray; width: 60%;" placeholder="Enter OTP">
        <small style="font-style: 12px; color:red;" id="otp-al">  <small>
        </div>

        <button type="button" class="reschedule-button-style" id="start-app"> Start Appointment </button>

        <!-- <button type="button" class="cancel-twobutton-style"> </i></button> -->

        <button type="button" class="cancel-twobutton-style" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap"> <i class="fas fa-times"></i>  Cancel Appointment </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cancel Appointment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style="color: white;">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <img src="doctors/feedback-and-giving-rating-design-concept-for-customer-satisfaction-illustration-vector.jpg" alt="" width="500px"> -->
                        <h5 style="font-size: 15px;padding:16px 5px ;">Are you sure to Cancel the Appointment ?</h5>
                        <h5 style="font-size: 15px;padding:16px 5px ;">Reason for cancellation: </h5>
                        <select name="reason" id="reason">
                            <option value="Select Reason"> Select Reason </option>                                                
                            <option value="Timing Issues"> Timing Issues </option>                                                
                            <option value="Other"> Other </option>
                        </select>
                        <small class="alert" style="color:red;">  </small>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="send-btn-style" >Yes</button>
                        <button type="button" class="close-btn-style" data-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>


    </div>`;
    document.getElementsByClassName("right-side-info")[0].innerHTML = x;

    let alert = document.getElementsByClassName("alert")[0];
    alert.innerHTML = "";

    document.getElementById("reason").addEventListener("change", (e) => {
        if (e.target.selectedIndex == 0) {
            alert.innerHTML = "Please fill the reason for cancellation";
        }
        else {
            alert.innerHTML = "";
        }
    })

    document.getElementsByClassName("send-btn-style")[0].addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");
        let reason = document.getElementById("reason");

        if (reason.selectedIndex == 0) {
            alert.innerHTML = "Please fill the reason for cancellation";
        }
        else {
            alert.innerHTML = "";
            cancel(reason);
        }
    });

    document.getElementsByClassName("close-btn-style")[0].addEventListener("click", (e) => {
        e.preventDefault();
        alert.innerHTML = "";
    });

    document.getElementsByClassName("close")[0].addEventListener("click", (e) => {
        e.preventDefault();
        alert.innerHTML = "";
    });

    document.getElementById("start-app").addEventListener("click", startFun);
}

const showCancelled = (data) => {
    let x = `<div>
    <h1>Appointment Cancelled</h1>
</div>

<div class="app-id-style">
        <p> Your appointment ID is <span>${data.appointment_ID}</span> </p>
        <p> Patient Name: <span>${data.fName} ${data.lname}</span> </p>
</div>`;

    if (data.person != null) {
        x += `<p> Cancelled By: ${data.person} </p>`;
    }
    if (data.reason != "" && data.reason != null) {
        x += `<p> Reason for Cancellation: ${data.reason} </p>`;
    }

    document.getElementsByClassName("right-side-info")[0].innerHTML = x;
}

const showCompleted = (data) => {

    let x = `<div>
    <h1>Appointment Completed</h1>
</div>

<div class="app-id-style">
        Your appointment ID is <span>${data.appointment_ID}</span>
</div>`

    if (data.feedback == null) {
        x += `
    <div class="mt-3">
    <form id="feedback-form">
    Please provide us your valuable feedback

    <div class="mt-3" style="font-size:14.5px;">
    <input class="mr-1 ml-2" type="radio" name="feed" value="Poor"> Poor
    <input class="mr-1 ml-2" type="radio" name="feed" value="Average"> Average
    <input class="mr-1 ml-2" type="radio" name="feed" value="Excellent"> Excellent
    <p id="fdb-alert" style="color:red; margin-top:5px; font-size: 12px;">  </p>
    </div>

    <div class="mt-3">
    Your Feedback
    <textarea class="form-control mt-2" style="border: 1px solid gray;" id="feedback" rows="3"></textarea>
    <button type="button" class="reschedule-button-style" style="margin-top:20px;" id="feed-btn"> Submit </button>
    </div>
    </form>
</div>`;

    }

    if (data.feedback != null) {
        x += `<div class="mt-3"> 
        Your Feedback:

        <p> ${data.feedbackText} </p>
    </div>`;
    }

    document.getElementsByClassName("right-side-info")[0].innerHTML = x;

    let feed = document.getElementsByName("feed");
    for (let i = 0; i < feed.length; i++) {
        feed[i].addEventListener("change", () => {
            document.getElementById("fdb-alert").innerHTML = "";
        });
    }


    let fdb = document.getElementById("feed-btn");

    fdb.addEventListener("click", postFeedback);
}

const postFeedback = async (e) => {
    e.preventDefault();

    console.log("object");
    let feedback = document.getElementById("feedback").value;
    let exp = document.getElementsByName("feed");

    if (exp[0].checked == false && exp[1].checked == false && exp[2].checked == false) {
        document.getElementById("fdb-alert").innerHTML = "Please fill the experience";
        return;
    }

    let x = "";

    for (let i = 0; i < exp.length; i++) {
        if (exp[i].checked == true) {
            x = exp[i].value;
            break;
        }
    }

    if (x == "") {
        return;
    }

    console.log(x);
    console.log(feedback);
    let currUrl = location.href;
    let id = currUrl.indexOf("?");
    if (id != -1) {
        id = currUrl.substring(id + 1, currUrl.length);
        id = id.split('=');
        id = id[1];
    }
    else {
        id = "";
    }
    const url = "https://localhost:5001/Appointment/FeedBackForAppointment";
      const params = {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'Accept': 'text/plain, application/json'
          },
          body: JSON.stringify({ Experience: x, Message: feedback, Appointment_Id: id})
      }

      const res = await fetch(url, params)
      .catch(err=> {
          console.log(err);
      });

      if(res.status == 200 || res.status == 201){
          location.href = "../../html/user panel/feedback.html";
      }
};

const cancel = async (reason) => {
    console.log("cancelled");
    let currUrl = location.href;
    let id = currUrl.indexOf("?");
    if (id != -1) {
        id = currUrl.substring(id + 1, currUrl.length);
        id = id.split('=');
        id = id[1];
    }
    else {
        id = "";
    }
     const url = "https://localhost:5001/Appointment/AppointmentCancellation";

      const params = {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'Accept': 'text/plain, application/json'
          },

          body: JSON.stringify({ Reason: reason.value, Appointment_ID: id })
      }
      const res = await fetch(url, params)
      .catch(err=> {
          console.log(err);
      });

      if(res.status == 200){
          location.reload();
      }

}

const checkOTP = (f = true) => {
    let otp = document.getElementById("otp");
    let otpAl = document.getElementById("otp-al");
    let reg = /^([0-9]{6})$/;

    if (f == false) {
        otp.style.border = '1px solid red';
        otpAl.innerHTML = "Incorrect OTP";
        return true;
    }

    if (otp.value == "") {
        otp.style.border = '1px solid red';
        otpAl.innerHTML = "OTP is required";
        return false;
    }

    else if (!(reg.test(otp.value))) {
        otp.style.border = '1px solid red';
        otpAl.innerHTML = "OTP format is not valid";
        return false;
    }

    else {
        otp.style.border = '1px solid gray';
        otpAl.innerHTML = "";
        return true;
    }
}

const startFun = async (e) => {
    e.preventDefault();

    let check = checkOTP();
    if (check == false) {
        return;
    }

    const otp = document.getElementById("otp");

    console.log("post otp", otp.value);
    let currUrl = location.href;
    let id = currUrl.indexOf("?");
    if (id != -1) {
        id = currUrl.substring(id + 1, currUrl.length);
        id = id.split('=');
        id = id[1];
    }
    else {
        id = "";
    }

    const url = "https://localhost:5001/Appointment/AppointmentStarted";

     const params = {
         method: 'POST',
         headers: {
             'Content-type': 'application/json',
             'Accept': 'text/plain, application/json'
         },

         body: JSON.stringify({ OtpValue: otp.value, Appointment_Id: id })
     }

     const res = await fetch(url, params)
     .catch(err=> {
         console.log(err);
     });

     if(res.status == 200){
         location.reload();
     }
     else{
         check = checkOTP(false);
     }
}

document.onload = load();