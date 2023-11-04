// stop slider automatically js
$('.book_appointment .carousel').carousel({
    interval: false,
});

const load = async () => {
    const problems = document.getElementsByClassName("consult_card");
    const speciality = document.getElementsByClassName("book_card");

    let p = {
        'Pregnancy Issue': 2,
        'Acne or Skin Issue': 4,
        'Personal Issue': 0,
        'Cold, Cough or Fever': 1,
        'Child not feeling well': 3,
        'Depression or Anxiety': 5
    };
    for (let i = 0; i < speciality.length; i++) {
        const x = document.querySelectorAll(".book_card a .card-body .card-title")[i];
        const l = `html/find_doctor.html?Videoconsult=false&speciality=${x.innerText}&page=1`;

        document.querySelectorAll(".book_card a")[i].setAttribute("href", l);
    }

    for (let i = 0; i < problems.length; i++) {
        const x = problems[i].children[1].children[0];
        const l = `html/find_doctor.html?Videoconsult=false&problem=${p[x.innerText]}&page=1`;

        document.querySelectorAll(".consult_link")[i].setAttribute("href", `${l}`);
    }
}

try {

    document.onload = load();

} catch (error) {
    console.trace(error);
}

