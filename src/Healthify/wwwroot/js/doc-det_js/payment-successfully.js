const getId = () => {
    let currUrl = location.href;
    let orderId = currUrl.indexOf('?');
    console.log(orderId)
    if (orderId != -1) {
        orderId = currUrl.substring(orderId + 1, currUrl.length);
        orderId = orderId.split('=');
        orderId = orderId[1];
    }
    else {
        orderId = "";
    }

    return orderId;
}

const getData = async () => {
    var q = getId();

    const url = "https://localhost:5001/Appointment/PaymentSuccessfull?Appointment_ID=" + q;
     const res = await fetch(url)
         .catch(err => {
             console.log(err);
         });

     if (res.status == 200) {
         let data = await res.json();
         console.log("1st : ",data);
         data = data[0];
         return data;
     }
     else{
         return null;
     }

    //let data = {
    //    "price": 1,
    //    "appointment_Id": 17,
    //    "razorpay_payment_id": null,
    //    "razorpay_order_id": null,
    //    "razorpay_signature": null,
    //    "date": "2022-03-24T00:00:00",
    //    "doctorFName": "Yasin",
    //    "doctorFLame": "Pathan",
    //    "app_Date": "Sun 27, Mar 2022",
    //    "app_Time": "09 : 00 AM",
    //    "patientFName": "Manthan",
    //    "patientLName": "Solanki"
    //};

    return data;
}

const load = async () => {
    console.log("loading");

    var q = getId();

    if (q == -1 || document.referrer == "") {
        location.href = "../../Index.html";
    }

    let data = await getData();

    if (data == null) {
        console.log("Data is not found");
        return;
    }

    console.log(q);

    let d = data.date;
    let i = d.indexOf('T');
    if (i != -1) {
        d = d.substring(0, i);
        document.getElementById("pay-date").innerHTML = d;
    }
    document.getElementById("pat-name").innerHTML = data.patientFName + ' ' + data.patientLName;
    document.getElementById("doc-name").innerHTML = data.doctorFName + ' ' + data.doctorFLame;
    document.getElementById("txn-id").innerHTML = data.razorpay_order_id;
    document.getElementById("pay-id").innerHTML = data.razorpay_payment_id;
    document.getElementById("order-id").innerHTML = data.appointment_Id;
    document.getElementById("app-time").innerHTML = data.app_Time;
    document.getElementById("app-date").innerHTML = data.app_Date;
    document.getElementById("price").innerHTML = '₹ ' + data.price;

};


const afterLoad = async () => {
    console.log("object");

    const data = await getData();

    if (data == null) {
        return;
    }

    let d = data.date;
    let i = d.indexOf('T');
    if (i != -1) {
        d = d.substring(0, i);
    }

    const content =
        `<html>
    <head>
    <link rel="icon" type="image/x-icon" href="../../images/favicon.png">
    
    <title>payment</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap main link -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css" rel="stylesheet">
    <!-- css link -->
    <!-- <link rel="stylesheet" href="../../css/doc-det_css/dd-payment-successfully.css"> -->
    <!--Google icon -->
    <script src="https://kit.fontawesome.com/849b321cb3.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style>
    body{
        background-color: #f0f0f5;
        
    }
    .pay-success .card {
        
        box-shadow:1px 5px 30px 0 rgb(45 45 51 / 8%);
        padding:0 20
    }
    .pay-success .price-style{
        margin-top: 5%;
        background-color:darkblue;
        text-align: center;
        padding:5;
        color: white;
        border-radius:15px 15px 0px 0px;
        
    }
    .pay-success .price-style h3{
        padding-top: 5;
        font-size: 16px;
        font-weight: 400;
    }
    .payment-pg .price-style span{
        padding-top: 5;
        font-weight: 600;
    }
    .pay-success .price-style span{
        padding-top: 5;
        font-weight: 600;
    }
    .pay-success .pay-title{
        width:100%;
     
      
        padding: 23px;
        border: 1px solid #b4b4be;
        border-radius:0px 0px 10px 10px ;
        line-height: 1.4;
        outline: none;
        background-color: #f0f0f5;
        color: #414146;
        font-size: 10px;
    }
    /* right side card info  */
    .pay-success .pay-title h5{
        color:darkblue;
        
        font-size: 30px;
        font-weight:600;
        
        
    }
    .pay-success .pay-title .det-print{
        color:rgb(73, 73, 73);
        padding-left: 7px;
        font-weight: 500;
        font-size:1rem;
    }
    .pay-success .pay-title ul{
        margin-left:-20;
    }
    .pay-success .pay-title div{
        padding-top:19px !important;
    }
    .pay-success .pay-title span{
        color:black;
        padding-top: 20px !important;
        font-size:1rem;
        font-weight: 600;
    }
    
      .confirm-btn-style{
          width:38%;
          height:8%;
          padding:5px;
          font-weight: 550;
          margin-top:4%;
          margin-left:34%;
          margin-bottom:4%;
          border: 1px solid #b4b4be;
          border-radius:8px;
          line-height: 1.4;
          outline: none;
          border: 1px solid #13aedd;
          background-color: #13aedd;
          font-weight: 600;
          color: #fff;
          font-size: 14px;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
        }
        </style>
        </head>
    <body>
    
        <!-- end header -->
        <section class="spacebetween pay-success mt-5">
        <div class="container">
        <div class="row">
        <div class="col">
        <div class="card left-side-info" style="min-width:440px;">
        <div class="card-body">
        <div class="row">
        <!-- 1st col -->
        <div class="col pl-4">
        <!-- price tag -->
        <div class="price-style">
        <h3 style="font-size:1.2rem;">Appointment Booked Successfully !</h3>
        </div>
        <div class="pay-title">
        <h5 style="font-size:1.2rem;">Payment Details : </h5>
        <div>
        <span>Date of Payment :</span>
        <span id="pay-date" class="det-print"> ${d} </span>
        </div>
        <div>
        <span>Payment ID :</span>
        <span id="pay-id" class="det-print"> ${data.razorpay_payment_id} </span>
        </div>
        <div>
        <span>Transaction ID :</span>
        <span id="txn-id" class="det-print"> ${data.razorpay_order_id} </span>
        </div>
        <div>
        <span>Appointment ID :</span>
        <span id="order-id" class="det-print"> ${data.appointment_Id} </span>
        </div>
        <div>
        <span>Name of Patient :</span>
        <span id="pat-name" class="det-print"> ${data.patientFName} ${data.patientLName} </span>
        </div>
        <div>
        <span>Name of Doctor :</span>
        <span id="doc-name" class="det-print"> ${data.doctorFName} ${data.doctorFLame} </span>
        </div>
        <div>
        <span>Date of Appointment :</span>
        <span id="app-date" class="det-print"> ${data.app_Date} </span>
        </div>
                                            <div>
                                            <span>Time of Appointment :</span>
                                                <span id="app-time" class="det-print"> ${data.app_Time} </span>
                                                </div>
                                                <div>
                                                <span>Amount :</span>
                                                <span id="price" class="det-print"> ${data.price} </span>
                                                </div>
                                                </div>
                                                <div class="pay-btn">
                                                
                                                </div>
                                                <!-- close -->
                                                </div>
                                                </div><!-- end row -->
                                                </div><!-- End card body-->
                                                </div><!-- end card -->
                                                </div><!-- left side card col -->
                                                </div>
                                                </div>
                                                </section>
                                                <section class="spacebetween">
                                                </section>
                                                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
                                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
                                                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                                                <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
                                                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
                                                
                                                </body>
                                                </html>`;

    console.log(content);

    const url = "https://localhost:5001/Appointment/SendVoice"
    let fd = new FormData();
    fd.append('Body', content);

    const params = {
        method: 'POST',
        body: fd
    }

     const res = await fetch(url, params)
     .catch(err => console.log(err));

}

document.onload = load();

if (document.referrer.includes("invoice.html")) {
    document.addEventListener("DOMContentLoaded", afterLoad);
}

document.getElementById("done-btn").addEventListener("click", (e) => {
    e.preventDefault();

    location.href = '../user panel/appointment.html';
});