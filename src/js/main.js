let langSwitcher = document.querySelectorAll('.langs__selected');
langSwitcher.forEach(btn => {
	btn.addEventListener('click', () => {
		let langs = btn.parentNode;
		langs.classList.toggle('open');
	})
})


let menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
	let menu = document.querySelector('.menu');
	menu.classList.toggle('open');
})