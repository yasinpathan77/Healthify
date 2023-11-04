const load = async () => {

     const res = await fetch("https://localhost:5001/Admin/Request");
      if(res.status != 200){
          
      }

      const data = await res.json();
    console.log(data);
    //const data = [
    //    {
    //        fname: 'ABC',
    //        lname: 'XYZ',
    //        profilePicture: null,
    //        userId: 123,
    //        email: 'abc@gmail.com',
    //        phone: '9876543210',
    //        dateOfJoining: '1 Apr 2022',
    //        role: 'User'
    //    }
    //];

    let x = "";

    data.forEach(element => {

        x += `<tr>
        <td> <img width="28" height="28" `;

        if (element.profilePicture == null) {
            x += `src="assets/img/user.jpg"`;
        }
        else {
            x += `src="${element.profilePicture}"`;
        }

        x += `class="rounded-circle" alt=""> <h2> ${element.fname} ${element.lname} </h2>
        </td>
        <td> ${element.url} </td>
        <td> ${element.speciality} </td>`;

        if (data.city == null) {
            x += `<td> - </td>`;
        }
        else {
            x += `<td> ${element.street} </td>`;

        }
        if (data.street == null) {
            x += `<td> - </td>`;
        }

        else {
            x += `<td> ${element.city} </td>`;
        }

        x += `<td class="text-right">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="add-doctor.html?userId=${element.url}&docId=${element.id}"><i class="fa fa-pencil m-r-5"></i> Add</a>
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
            document.getElementById("delete-btn").setAttribute("data-delete", element.userId);
        });
    });
}

document.onload = load();