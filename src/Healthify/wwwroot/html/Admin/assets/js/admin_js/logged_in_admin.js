const logged_in = async () => {
    const url = "https://localhost:5001/User/IsLogIN";
     const res = await fetch(url)
     .catch(err=> {
         console.log(err);
     });

     if(res.status != 200){
         location.href = "login.html";
         return;
     }

     const data = await res.json();

    const userImg = document.getElementsByClassName("user-img")[0];

    if (userImg == null) {
        return;
    }

    if (data.profilePicture != '' && data.profilePicture != null) {
        userImg.children[0].setAttribute("src", data.profilePicture);
    }
    userImg.nextElementSibling.innerHTML = data.fname + ' ' + data.lname;

}

document.onload = logged_in();