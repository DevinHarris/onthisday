(function() {
	'use strict';

	let resultEl = document.querySelector('.result'),
		randomBtn = document.querySelector('.random'),
		saveBtn = document.querySelector('.save'),
		genBtn = document.querySelector('.gen'),
		header = document.querySelector('.section-heading'),
		innerEl = document.querySelector('.inner'),
		instructions = document.querySelector('.instuctions'),
		factsArr = JSON.parse(localStorage.getItem('facts')) || [],
		date = new Date(),
		day = date.getDate(),
		month = date.getMonth(),
		monthArr = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

	header.textContent = `${header.textContent}	${monthArr[month]} ${day}!`;

	function loadFavorites() {
		if (localStorage.getItem('facts')) {
			console.log('Good to go');
			console.log(JSON.parse(localStorage.getItem('facts')));
		} else {
			console.log('localStorage is not setup');
		}
	}

	function callToNumAPI(reqType) {
		var reqUrl = '',
			xhr = new XMLHttpRequest();

		if (reqType == 'todayOnly') {
			reqUrl = 'http://numbersapi.com/' + (month + 1) + '/' + day + '/date?callback=?';
		} else if (reqType == 'random') {
			reqUrl = 'http://numbersapi.com/random/trivia?callback=?';
		}

		xhr.onload = function() {
			if (xhr.status === 200) {
				resultEl.textContent = xhr.response;
				genBtn.textContent = 'Generate a new fact!';
				instructions.style.display = 'none';
			} else {
				console.log('There was a problem', xhr.status, xhr.statusText);
			}
		};

		xhr.open('GET', reqUrl);
		xhr.send();
	}

	function save() {
		localStorage.setItem('facts', JSON.stringify(factsArr));
		factsArr.push({
			fact: resultEl.textContent,
			saved: new Date().toDateString()
		});

		localStorage.setItem('facts', JSON.stringify(factsArr));
		console.log(localStorage.getItem('facts'));

		/*localStorage.setItem('facts', JSON.stringify(factsArr));
	console.log(localStorage.getItem('facts'));
	console.log(JSON.parse(localStorage.getItem('facts')).length); */

		// switch to LocalStorage

		// convert back to JSON

		/*if (localStorage.getItem('facts')) {
		var factsJSON = JSON.parse(localStorage.getItem('facts'));
		console.log(localStorage.getItem('facts'));
	} else {
		localStorage.setItem('facts', JSON.stringify(factsArr));
	}
	//console.log(factsArr); */
	}

	genBtn.addEventListener('click', e => {
		callToNumAPI('todayOnly');
	});

	randomBtn.addEventListener('click', e => {
		callToNumAPI('random');
	});

	saveBtn.addEventListener('click', e => {
		innerEl.classList.add('show-menu');
		save();
		console.log('clicked');
	});

	loadFavorites();
})();
