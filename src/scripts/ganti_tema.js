(function() {
	'use strict';

	var themes,
		selectedThemeIndex,
		instructionsTimeout,
		deck;

	function init() {
		deck = bespoke.from('article');
		initThemeSwitching();
	}

	init();

//ini kalau dihapus thema gak bisa bergerak sama sekali
	function initThemeSwitching() {
//ini kalau dihapus thema gak bisa diswitch lagi
		themes = [
			'coverflow',
			'classic',
			'cube',
			'cube',
			'carousel',
			'concave',
			'cards',
			'cards'

		];
		
		selectedThemeIndex = 0;
		initKeys();
		selectTheme(0);
	}


	function initKeys() {
		if (/Firefox/.test(navigator.userAgent)) {
			document.addEventListener('keydown', function(e) {
				if (e.which >= 37 && e.which <= 40) {
					e.preventDefault();
				}
			});
		}

		document.addEventListener('keydown', function(e) {
			var key = e.which;

			key === 37 && deck.prev();
			(key === 32 || key === 39) && deck.next();

			key === 37 && prevTheme();
			(key === 32 || key === 39) && nextTheme();
		});
	}

	function selectTheme(index) {
		var theme = themes[index];
		document.body.className = theme;
		selectedThemeIndex = index;
	}

	function nextTheme() {
		offsetSelectedTheme(1);
		hideInstructions();
	}

	function prevTheme() {
		offsetSelectedTheme(-1);
		hideInstructions();
	}

	function offsetSelectedTheme(n) {
		selectTheme(modulo(selectedThemeIndex + n, themes.length));
	}

	function showInstructions() {
		document.querySelectorAll('header p')[0].className = 'visible';
	}

	function hideInstructions() {
		clearTimeout(instructionsTimeout);
		document.querySelectorAll('header p')[0].className = 'hidden';
	}

	function modulo(num, n) {
		return ((num % n) + n) % n;
	}

}());