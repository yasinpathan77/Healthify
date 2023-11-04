const load = async () => {

    const res = await fetch("https://localhost:5001/Admin/Data");
     if(res.status != 200){

     }

     const data = await res.json();

    //const data = [
    //    {
    //        fname: 'ABC',
    //        lname: 'XYZ',
    //        profilePicture: '',
    //        userId: 123,
    //        email: 'abc@gmail.com',
    //        phone: '9876543210',
    //        dateOfJoining: '1 Apr 2022',
    //        role: 'User'
    //    }
    //];

    let x = "";

    console.log(data);

    data.forEach(element => {

        x += `<tr>
        <td>`;

        if (element.profilePicture == null) {
            x += `<img width="28" height="28" src="assets/img/user.jpg"`;
        }
        else {
            x += `<img width="28" height="28" src="${element.profilePicture}"`;

        }

        x += ` class="rounded-circle" alt=""> <h2> ${element.fname} ${element.lname} </h2>
        </td>
        <td> ${element.id} </td>
        <td> ${element.email} </td>`;

        if (element.phoneNumber == null) {
            x += `<td> - </td>`;
        }
        else {

            x += `<td> ${element.phoneNumber} </td>`;
        }

        x += `<td>  </td>
        <td>
           
        </td>
        <td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="edit-employee.html?userId=${element.id}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                    <a class="dropdown-item delete" href="#" data-toggle="modal" data-target="#delete_employee"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                </div>
            </div>
        </td>
    </tr>`;

    });

    document.querySelectorAll(".custom-table tbody")[0].innerHTML = x;

    data.forEach((element, index) => {
        document.getElementsByClassName("delete")[index].addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("delete-btn").setAttribute("data-delete", element.email);
        });
    });
}

const deleteUser = async (e) => {
    e.preventDefault();
    const email = e.target.dataset.delete;
    console.log(email)

    const url = "";
    const params = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: email })
    }

    const res = await fetch(url, params)
        .catch(err => console.log(err));

    if (res.status != 200) {
        console.log("Error");
    }
}

document.onload = load();

document.getElementById("delete-btn").addEventListener("click", deleteUser);