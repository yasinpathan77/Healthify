// what our user  say about online consulation js
$('.clients-carousel').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 450,
    margin: 30,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        991: {
            items: 2
        },
        1200: {
            items: 2
        },
        1920: {
            items: 2
        }
    }
});


// FAQ js

let li = document.querySelectorAll(".faq-text li");
for (var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", (e) => {
        let clickedLi;
        if (e.target.classList.contains("question-arrow")) {
            clickedLi = e.target.parentElement;
        } else {
            clickedLi = e.target.parentElement.parentElement;
        }
        clickedLi.classList.toggle("showAnswer");
    });
}

$('#recipeCarousel').carousel({
    interval: 10000
})

$('.specialities .carousel .carousel-item').each(function () {
    var minPerSlide = 4;
    var next = $(this).next();

    if (!next.length) {
        next = $(this).siblings(':first');


    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});


// stop slider automatically js
$('.carousel').carousel({
    interval: false,
});

const load = async () => {
    let specialities = document.getElementsByClassName("specialities_card");

    for (let i = 0; i < specialities.length; i++) {
        const x = document.querySelectorAll(".specialities_card .card-body .specialities_name")[i];
        const l = `find_doctor.html?Videoconsult=true&speciality=${x.innerText}&page=1`;
        document.querySelectorAll(".specialities_card .card-body .specialities_link")[i].setAttribute("href", `${l}`);
    }

    let problems = document.getElementsByClassName("book_card");

    let p = {
        'Depression / Anxiety?': 5,
        'Lose Weight': 6,
        'Stomach Issues?': 7,
        'Vaginal Infections?': 2,
        'Cough & Cold?': 1,
        'Period Problems?': 2,
        'Sick Kid?': 3,
        'Skin Problems?': 4
    };
    for (let i = 0; i < problems.length; i++) {
        const x = document.querySelectorAll(".book_card .card-body .card-title")[i];
        const l = `find_doctor.html?Videoconsult=true&problem=${p[x.innerText]}&page=1`;
        problems[i].children[0].setAttribute("href", `${l}`);
        document.querySelectorAll(".book_card .card-body a")[i].setAttribute("href", `${l}`);
    }
};

document.onload = load();


