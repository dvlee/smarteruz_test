let langSwitcher = document.querySelector('.langs__selected');
langSwitcher.addEventListener('click', () => {
	let langs = langSwitcher.parentNode;
	langs.classList.toggle('open');
})


let menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
	let menu = document.querySelector('.menu');
	menu.classList.toggle('open');
})