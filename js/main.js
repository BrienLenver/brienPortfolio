// Text Animation
let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");  
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";  

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";   
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);


// Active menu on scroll
let menuLi = document.querySelectorAll('header ul li a');
let sections = Array.from(document.querySelectorAll('section')).filter(section => !section.classList.contains('skills-section'));

// Function to handle active menu item
function activeMenu() {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) {}

    // Remove the active class from all menu items
    menuLi.forEach(sec => sec.classList.remove("active"));

    // Add the active class to the current section's menu item
    if (len >= 0 && len < menuLi.length) {
        menuLi[len].classList.add("active");
    }
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// Sticky navbar
const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 50);
});


// Throttle function to optimize scroll performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    var swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        loop: true, // Enables infinite looping of slides
    });

    // Event listener to navigate slides on screen click
    document.addEventListener('click', function(event) {
        const clickX = event.clientX;
        const windowWidth = window.innerWidth;
        
        // Check if the click is on the right or left half of the screen
        if (clickX > windowWidth / 2) {
            swiper.slideNext(); // Go to the next slide
        } else {
            swiper.slidePrev(); // Go to the previous slide
        }
    });
});

// Form submission with Formspree
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Submit the form using Formspree
    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            // Show the modal
            document.getElementById('successModal').style.display = 'block';

            // Optionally reset the form
            form.reset();
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    }).catch(function (error) {
        alert('Oops! Something went wrong. Please try again.');
    });
});

// Close modal when the user clicks the "x" or outside of the modal
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('successModal').style.display = 'none';
});

window.onclick = function (event) {
    if (event.target === document.getElementById('successModal')) {
        document.getElementById('successModal').style.display = 'none';
    }
};



// Scroll reveal animation

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000, // Reduced duration for faster animations
    delay: 200, // Reduced delay for faster start
    reset: true // Animation repeats
});

// Fade-in effect for btn-box without movement
sr.reveal('.about-content .btn-box', {
    opacity: 0, // Start fully transparent
    duration: 1500, // Adjusted duration
    delay: 1000, // Adjusted delay
    origin: 'center', // Default origin to keep in place
    distance: '0px' // No movement
});

// Change: Fading in the About Image without moving
sr.reveal('.about-img', {
    opacity: 0, // Start fully transparent
    duration: 1500, // Adjust duration if needed
    delay: 300, // Adjust delay if needed
    origin: 'center', // No movement, fade in from center
    distance: '0px', // No movement
    reset: true // Repeats the animation when scrolling back
});

// Other ScrollReveal animations
sr.reveal('.home-content');
sr.reveal('.home-image', {origin: 'right'});
sr.reveal('.about-content', {origin: 'right'});

sr.reveal('.skills h2', {
    duration: 1200, // Reduced duration
    delay: 200, // Reduced delay
    opacity: 0,
});
sr.reveal('.skills p', {
    duration: 1200, // Reduced duration
    delay: 400, // Reduced delay
    opacity: 0,
});
sr.reveal('.skills-container', {
    origin: 'bottom',
    distance: '40px',
    duration: 1200, // Reduced duration
    delay: 200, // Reduced delay
    opacity: 0,
});

sr.reveal('.skills-container .skill-card', {
    origin: 'bottom',
    distance: '20px',
    duration: 1200, // Reduced duration
    delay: 300, // Reduced delay
    opacity: 0,
    interval: 150, // Adjusted interval for each skill
});

// Apply ScrollReveal to the contact section and its elements
sr.reveal('.contact', {
    duration: 1200, // Reduced duration
    delay: 200, // Reduced delay
    opacity: 0
});

sr.reveal('.contactTitle', {
    duration: 1200, // Reduced duration
    delay: 300, // Reduced delay
    opacity: 0
});

sr.reveal('.contactInfo', {
    duration: 1200, // Reduced duration
    delay: 400, // Reduced delay
    opacity: 0
});

sr.reveal('.messageForm', {
    duration: 1200, // Reduced duration
    delay: 600, // Reduced delay
    opacity: 0
});

// Initialize ScrollReveal
const pr = ScrollReveal({
    duration: 1500, // Duration for animations
    delay: 200, // Delay before animation starts
    opacity: 0, // Start fully transparent
    reset: true // Animation repeats when scrolling back
});

// Apply ScrollReveal to project section
pr.reveal('.project-section', {
    opacity: 0, // Start fully transparent
    origin: 'center', // No movement; fade in from center
    distance: '0px', // No movement distance
    duration: 2500, // Duration of the animation
    delay: 200 // Delay before animation starts
});




let menuIcon = document.querySelector("#menu-icons");
let navList = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-menu-alt-left"); 
    navList.classList.toggle("open");
}

window.onscroll = ()=>{
    menuIcon.classList.remove("bx-menu-alt-left"); 
    navList.classList.remove("open");
}

// Animate social icons with delay
let socialIcons = document.querySelectorAll('.social-icons-home a'); // Select your social icons (or adjust the class if needed)

socialIcons.forEach((icon, index) => {
    icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // Define the transition effect
    icon.style.opacity = '0'; // Initially hide the icons
    icon.style.transform = 'translateY(20px)'; // Move icons slightly downwards

    // Set delay for each icon
    setTimeout(() => {
        icon.style.opacity = '1'; // Fade in the icons
        icon.style.transform = 'translateY(0)'; // Move to original position
    }, index * 300); // Delay is 300ms multiplied by the icon index
});




