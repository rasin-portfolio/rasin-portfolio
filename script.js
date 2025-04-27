// ==========================
// Navbar, Sections, Menu Icon
// ==========================
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => link.classList.remove('active'));
    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => section.classList.remove('active'));
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');
            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();
        navLinks[0].classList.add('active');
        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

// ==========================
// Resume Button Tabs
// ==========================
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        resumeBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');

        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeDetails[idx].classList.add('active');
    });
});

// ==========================
// Portfolio Carousel Arrows
// ==========================
// ==========================
// Portfolio Carousel Arrows + Number Change
// ==========================
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const imgItems = document.querySelectorAll('.portfolio-carowsel .img-item');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');

let index = 0;

const activePortfolio = () => {
    imgItems.forEach((img, idx) => {
        img.style.display = (idx === index) ? 'block' : 'none';
    });

    portfolioDetails.forEach((detail, idx) => {
        if (idx === index) {
            detail.classList.add('active');
        } else {
            detail.classList.remove('active');
        }
    });
};

// Initialize first image showing
activePortfolio();

arrowRight.addEventListener('click', () => {
    if (index < imgItems.length - 1) {
        index++;
        activePortfolio();
    }
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        activePortfolio();
    }
});


// ==========================
// Contact Form Handling (SweetAlert2)
// ==========================
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submit
        const formData = new FormData(this);

        Swal.fire({
            title: 'Sending...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(this.action, {
                method: this.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for contacting me. I will get back to you soon!',
                    showConfirmButton: false,
                    timer: 2500
                });
                form.reset(); // clear form
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later!'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Please check your internet connection and try again.'
            });
        }
    });
}
