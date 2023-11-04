let options = {};
let cnt = 0;

const book = async (response) =>
{
    console.log(response);
    let currUrl = location.href;
    let orderId = currUrl.indexOf('?');

    if (orderId != -1)
    {
        orderId = currUrl.substring(orderId + 1, currUrl.length);
        orderId = orderId.split('=');
        orderId = orderId[1];
    }
    else
    {
        orderId = "";
    }
    let url = "https://localhost:5001/Appointment/BookSlot?Appointment_ID=" + orderId;

    let res = await fetch(url)
        .catch(err =>
        {
            console.log(err);
        });
    let data = await res.text();
    console.log(data);

    url = "https://localhost:5001/Appointment/CheckoutDescription?Appointment_ID=" + orderId ;
    const params =
    {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(response)
    }

    res = await fetch(url, params)
        .catch(err =>
        {
            console.log(err);
        });
    console.log(orderId);
    let orderthid = orderId;
    data = await res.text();
    if (res.status == 200)
    {
        url = "https://localhost:5001/Appointment/AppointmentMail?Appointment_ID=" + orderthid;
        res = await fetch(url).catch(err => {
            console.log(err);
        });

        console.log(data);
        location.href = 'payment-successfully.html?Appointment_ID=' + orderthid;
    }

}

const load = async () => {

    let currUrl = location.href;
    let orderId = currUrl.indexOf('?');

    if (orderId != -1) {
        orderId = currUrl.substring(orderId + 1, currUrl.length);
        orderId = orderId.split('=');
        orderId = orderId[1];
    }
    else {
        orderId = "";
    }

    const url = "https://localhost:5001/Appointment/AppointmentDetails";
    const res = await fetch(url + '?Appointment_ID=' + orderId)
        .catch(err => {
            console.log(err);
        });

    let data = null;

    if (res.status == 200) {
        data = await res.json();
        console.log("Okayyyyy:", data[0]);
        data = data[0];
        console.log("This",data);
    }

    if (data == null) {
        return;
    }

    document.getElementById("order-date").innerHTML = `Order Date: ${data.date}`;
    document.getElementById("pat-name").innerHTML = `${data.fName} ${data.lname}`;
    document.getElementById("pat-email").innerHTML = data.email;
    document.getElementById("order-id").innerHTML = data.appointment_ID;
    document.getElementById("doc-name").innerHTML = `Dr. ${data.doc_Fname} ${data.doc_Lname}`;
    document.getElementById("mode").innerHTML = data.mode;
    document.getElementById("app-date").innerHTML = data.app_Date;
    document.getElementById("app-time").innerHTML = data.app_Time;
    document.getElementById("fees").innerHTML = "Total Amount : " + data.price;
    let amount = parseInt(data.price) * 100;
    amount = amount.toString();

    options = {
        "key": data.key,
        "order_id": data.order_ID,
        "amount": amount,
        "currency": "INR",
        "name": "Yasin Pathan",
        "description": "Appointment",
        "prefill": { "name": data.fName + ' ' + data.lname },
        "image": "../../images/favicon.png",

        //"callback_url": "https://localhost:5001/Appointment/CheckoutDescription?OrderId" + data.appointment_ID,
        //"redirect": "true"

        "handler": function (response) {
            console.log(response);
            console.log("this hello");
            book(response);
            //let form = document.getElementById("form").addEventListener("submit", (e) => {
            //    cnt++;

            //    if (cnt >= 1) {

             
                //}

            //});

        }
        
    };

   

}

const proceedFun = async (e) => {
    e.preventDefault();
    console.log(options);

   
        var rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
            //alert(response.error.code);
            //alert(response.error.description);
            //alert(response.error.source);
            //alert(response.error.step);
            //alert(response.error.reason);
            //alert(response.error.metadata.order_id);
            //alert(response.error.metadata.payment_id);
            //console.log(response);
        });


        rzp1.open();
        e.preventDefault();
    
};


document.onload = load();
document.getElementById("proceed-btn").addEventListener("click", proceedFun);

