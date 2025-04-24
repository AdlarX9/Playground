// smooth scroll
const lenis = new Lenis();

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// scrollbar
var progressbar = document.getElementById("progressbar");
var percent = document.getElementById("percent");

var totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function() {
	var progress = (window.pageYOffset / totalHeight) * 100;
	progressbar.style.height = progress + "%";
}


// --------------------------------------------------------------------------------
// Variables


const body = document.querySelector("body");

const corps = document.querySelector(".corps");

const imgs = document.querySelectorAll(".ville img");
const bienvenue = document.querySelector(".bienvenue");
const ville = document.querySelector(".ville");
const villeP = document.querySelector(".ville .titre p");

const canvas = document.getElementById("renderSurface");

const gravity = document.querySelector(".gravity");
const card = document.querySelector(".card");
const zoneCard = document.querySelector(".zone-card");
const glare = document.querySelector(".glare");

const blackContainer = document.querySelector(".black-container");
const pifw = document.querySelector(".pifw");
const pafw = document.querySelector(".pafw");
const white = document.querySelector(".white");
const whiteContainer = document.querySelector(".white-container");
const pifb = document.querySelector(".pifb");
const pafb = document.querySelector(".pafb");
const abc = document.querySelector(".abc");
const awc = document.querySelector(".awc");

const verre = document.querySelector(".verre");
const slider = document.querySelector(".slider");
const poignee = document.querySelector(".poignee");
const panneau = document.querySelector(".panneau");


// --------------------------------------------------------------------------------
// Animation au scroll


let banderolle = gsap.timeline();
banderolle
	.to(".jaime", {
		x: "-131%"
	})
	.to(".omg", {
		x: "139%"
	}, "<")

ScrollTrigger.create({
	animation: banderolle,
	trigger: ".parallax",
	start: "top top",
	end: "bottom bottom",
	scrub: true,
	markers: false
})


let animationP = gsap.timeline();
animationP
	.to(".ciel", {
		scale: 1
	})
	.to(".city", {
		y: "-30vh"
	})
	.to(".bienvenue", {
		y: "-40vh"
	}, "<")
	.to(".avion", {
		x: "70vh",
		y: "57vh"
	})

ScrollTrigger.create({
	animation: animationP,
	trigger: ".parallax",
	start: "top top",
	end: "bottom bottom",
	scrub: true,
	pin: ".corps",
	markers: false
})

corps.onmouseenter = () => {
	mouseFollower.innerHTML = '<p class="parallax-m">scroll<br>to<br>explore</p>';
	mouseFollower.style.setProperty("--r", 8 + "vh");
};

corps.onmouseout = () => {
	mouseFollower.innerHTML = '';
	mouseFollower.style.setProperty("--r", 8 + "vh");
};


// --------------------------------------------------------------------------------
// Parallax


function troisd(e) {

	let bodyWidth = body.getBoundingClientRect().width;
	let windowHeight = window.innerHeight;

	let x = e.clientX / bodyWidth * 100;
	let y = e.clientY / windowHeight * 100;

	const a = 3

	let fx = a / 50 * x - a;
	let fy = a / 50 * y - a;

	imgs.forEach((img) => {
		img.style.setProperty("--tx", `${fx}vh`);
		img.style.setProperty("--ty", `${fy}vh`);
	})

}

body.addEventListener("touchmove", (e) => {

	e.preventDefault();

	let villeWidth = ville.getBoundingClientRect().width;
	let windowHeight = window.innerHeight;

	let x = e.touches[0].clientX / villeWidth * 100;
	let y = e.touches[0].clientY / windowHeight * 100;

	const a = 3

	let fx = a / 50 * x - a;
	let fy = a / 50 * y - a;

	imgs.forEach((img) => {
		img.style.setProperty("--tx", `${fx}vh`);
		img.style.setProperty("--ty", `${fy}vh`);
	})

});

body.addEventListener("mousemove", troisd);


// --------------------------------------------------------------------------------
// Métal 3D


function cardMetal(e) {
	let gravityTop = gravity.getBoundingClientRect().top;
	let gravityLeft = gravity.getBoundingClientRect().left;

	let gravityHeight = gravity.getBoundingClientRect().height;
	let gravityWidth = gravity.getBoundingClientRect().width;

	let x = e.clientX - gravityLeft;
	let y = e.clientY - gravityTop;

	let x100 = x / gravityWidth * 100;
	let y100 = y / gravityHeight * 100;

	let fx100 = 3 / 5 * x100 - 30;
	let fy100 = -1 * 3 / 5 * y100 + 30;

	if (fx100 <= 30 && fx100 >= -30 && fy100 >= -30 && fy100 <= 30) {

		card.style.setProperty("--rx", `${fx100}deg`);
		card.style.setProperty("--ry", `${fy100}deg`);

		glare.style.top = `calc(${y + "px"} - 3vh)`;
		glare.style.left = `calc(${x + "px"} - 3vh)`;

	} else { return }
}

function cardMetalT(e) {

	e.preventDefault();

	let gravityTop = gravity.getBoundingClientRect().top;
	let gravityLeft = gravity.getBoundingClientRect().left;

	let gravityHeight = gravity.getBoundingClientRect().height;
	let gravityWidth = gravity.getBoundingClientRect().width;

	let x = e.touches[0].clientX - gravityLeft;
	let y = e.touches[0].clientY - gravityTop;

	let x100 = x / gravityWidth * 100;
	let y100 = y / gravityHeight * 100;

	let fx100 = 3 / 5 * x100 - 30;
	let fy100 = -1 * 3 / 5 * y100 + 30;

	if (fx100 <= 30 && fx100 >= -30 && fy100 >= -30 && fy100 <= 30) {

		card.style.setProperty("--rx", `${fx100}deg`);
		card.style.setProperty("--ry", `${fy100}deg`);

		glare.style.top = `calc(${y + "px"} - 3vh)`;
		glare.style.left = `calc(${x + "px"} - 3vh)`;

	} else { return }

}

gravity.addEventListener("mousemove", cardMetal);
gravity.addEventListener("touchmove", cardMetalT);


// --------------------------------------------------------------------------------
// PifPaf Logo


function pifPaf(e) {
	let h = whiteContainer.getBoundingClientRect().height;
	let t = whiteContainer.getBoundingClientRect().top;
	let y = e.clientY - t;

	let fy = y / h * 100;

	if (fy <= 100) {
		pifb.style.height = fy + "%";
		pafb.style.height = 100 - fy + "%";
		pifw.style.height = fy + "%";
		pafw.style.height = 100 - fy + "%";
	} else { return }
}

function pifPafT(e) {

	e.preventDefault();

	let h = whiteContainer.getBoundingClientRect().height;
	let t = whiteContainer.getBoundingClientRect().top;
	let y = e.touches[0].clientY - t;

	let fy = y / h * 100;

	if (fy <= 100) {
		pifb.style.height = fy + "%";
		pafb.style.height = 100 - fy + "%";
		pifw.style.height = fy + "%";
		pafw.style.height = 100 - fy + "%";
	} else { return }
}

function switchLight() {
	white.classList.toggle("white-show");
	awc.classList.toggle("awc-show");
}

blackContainer.addEventListener("mousemove", pifPaf);
whiteContainer.addEventListener("mousemove", pifPaf);
blackContainer.addEventListener("touchmove", pifPafT);
whiteContainer.addEventListener("touchmove", pifPafT);
abc.addEventListener("click", switchLight);
awc.addEventListener("click", switchLight);


// --------------------------------------------------------------------------------
// Glassmorphism


body.onload = () => {
	poignee.style.setProperty("--poignee-top", 50 + "%");
	panneau.style.setProperty("--panneau-blur", 1.25 + "vh");
};

let isMouseDown = false;

slider.addEventListener('mousedown', () => {
	isMouseDown = true;
	return isMouseDown;
});

poignee.addEventListener('mousedown', () => {
	isMouseDown = true;
	return isMouseDown;
});

body.addEventListener('mouseup', () => {
	isMouseDown = false;
	return isMouseDown;
});

body.addEventListener('mousemove', (e) => {
	if (isMouseDown) {

		let sliderTop = slider.getBoundingClientRect().top;
		let sliderHeight = slider.getBoundingClientRect().height;

		let a = e.clientY - sliderTop;
		let x = a / sliderHeight * 100;

		let amplitude = 2.5

		let fx = -1 * amplitude / 100 * x + amplitude;

		if (x >= 0 && x <= 100) {
			poignee.style.setProperty("--poignee-top", x + "%");
			panneau.style.setProperty("--panneau-blur", fx + "vh");
		};

	};
});


slider.addEventListener('touchstart', () => {
	isMouseDown = true;
	return isMouseDown;
});

poignee.addEventListener('touchdown', () => {
	isMouseDown = true;
	return isMouseDown;
});

body.addEventListener('touchend', () => {
	isMouseDown = false;
	return isMouseDown;
});

verre.addEventListener('touchmove', (e) => {
	if (isMouseDown) {

		e.preventDefault();

		let sliderTop = slider.getBoundingClientRect().top;
		let sliderHeight = slider.getBoundingClientRect().height;

		let a = e.touches[0].clientY - sliderTop;
		let x = a / sliderHeight * 100;

		let amplitude = 2.5

		fx = -1 * amplitude / 100 * x + amplitude;

		if (x >= 0 && x <= 100) {
			poignee.style.setProperty("--poignee-top", x + "%");
			panneau.style.setProperty("--panneau-blur", fx + "vh");
		}

	}
});

body.ontouchstart = () => {
	verre.innerHTML = '<p style="color:red;font-size:3vw">propriétés non prises en charge par les navigateurs mobiles</p>';
};


// --------------------------------------------------------------------------------
// Swiper


const swiper = new Swiper('.swiper', {
	loop: true,

	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
});

let animateSwiper = new gsap.timeline();

animateSwiper.from('.logo', { opacity: 0, x: -100, duration: 1, ease: 'elastic.in' })
