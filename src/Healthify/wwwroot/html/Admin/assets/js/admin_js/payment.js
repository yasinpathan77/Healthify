const payDoc = async (e) => {
    e.preventDefault();

     const params = {
         method: 'POST',
         headers: {
             'Content-type': 'application/json'
         },
         body: JSON.stringify({ Appointment_Id: e.target.dataset.pay})
     };
     const res = await fetch("https://localhost:5001/Admin/PaymentDoctor", params);
     if (res.status == 200) {
        location.reload();
     }

    console.log(e.target.dataset.pay);
}

const load = async () => {
     const res = await fetch("https://localhost:5001/Admin/PaymentDoctor");
     if (res.status != 200) {

     }

    const data = await res.json();
    console.log(data);
    let x = "";

    data.result.forEach(element => {
        x += `<tr>
        <td>
            <img width="28" height="28" src="../../../../Profile/yasinpathanp@gmail.com.jpg" class="rounded-circle" alt=""> <h2>${element.fname} ${element.lname}</h2>
        </td>
        <td> ${element.url} </td>
        <td> ${element.pincode} </td>
        <td> ${element.city} </td>
        <td> ₹ ${element.price} </td>

        <td>`;
        if (element.paid == true) {
            x += `<span class="custom-badge status-green">Paid</span>
            </td>
            <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    
                </div>
            </div>
            </td>`;
        }
        else {
            x += `<span class="custom-badge status-red">Pending</span>
            </td>
            <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    
                    <a class="dropdown-item pay" href="#pay_doc" data-toggle="modal" data-pay="${element.pincode}" data-target="#pay_doc"><i class="fa fa-trash-o m-r-5"></i> Pay </a>
                </div>
            </div>
            </td>`;
        }

        x += `</tr>`;
    });

    document.querySelector(".custom-table tbody").innerHTML = x;

    let pay = document.getElementsByClassName("pay");
    for (let i = 0; i < pay.length; i++) {
        pay[i].addEventListener("click", (e) => {
            document.getElementById("pay-btn").setAttribute("data-pay", e.target.dataset.pay);
        });
    }

    document.getElementById("pay-btn").addEventListener("click", payDoc);
}

document.onload = load();