const load = async () => {
    const url = "https://localhost:5001/Admin/Doctors";
     const res = await fetch(url);

     if(res.status != 200){
         document.getElementsByClassName("doctor-grid")[0].innerHTML = "No Doctors";
         return;
     }

     let data = await res.json();

    //let data = [
    //    {
    //        id: '123',
    //        fname: 'ABC',
    //        lname: 'XYZ',
    //        profilePicture: '//',
    //        speciality: 'Dentist',
    //        city: 'Ahmedabad'
    //    }
    //];
    if (data.length == 0) {
        document.getElementsByClassName("doctor-grid")[0].innerHTML = "No Doctors";
        return;
    }

    let x = "";
    data.forEach(element => {

        x += `<div class="col-md-4 col-sm-4  col-lg-3">
        <div class="profile-widget">
        <div class="doctor-img">
            <a class="avatar" href="profile.html?Id=${element.url}"><img alt="" src="../../${element.profilePhoto}"></a>
        </div>
        <div class="dropdown profile-action">
            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="edit-doctor.html?DoctorId=${element.url}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                <a class="dropdown-item delete" href="#" data-toggle="modal" data-target="#delete_doctor"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
            </div>
        </div>
        <h4 class="doctor-name text-ellipsis"><a href="profile.html?id=${element.url}"> ${element.fname} ${element.lname} </a></h4>
        <div class="doc-prof"> ${element.speciality} </div>
        <div class="user-country">
            <i class="fa fa-map-marker"></i> ${element.city}
        </div>
    </div>
</div>`;
    });

    document.getElementsByClassName("doctor-grid")[0].innerHTML = x;

    data.forEach((element, index) => {
        document.getElementsByClassName("delete")[index].addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("delete-btn").setAttribute("data-delete", element.id);
        });
    });
}

const deleteUser = async (e) => {
    e.preventDefault();
    const userId = e.target.dataset.delete;
    console.log(userId)

    // const url = "";
    // const params = {
    //     method: 'POST',
    //     headers: {'Content-type': 'application/json'},
    //     body: JSON.stringify({userId: userId})
    // }

    // const res = await fetch(url, params)
    // .catch(err=> console.log(err));

    // if(res.status != 200){
    //     console.log("Error");
    // }
}

document.onload = load();

document.getElementById("delete-btn").addEventListener("click", deleteUser);