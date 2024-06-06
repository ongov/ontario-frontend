// Run asynchronously
function deferInFn(fn) {
	if (typeof fn === 'function') {
		setTimeout(fn, 0);
	}
}

/*
  Header
*/
(function () {
	'use strict';

	if (!('addEventListener' in window) || !document.documentElement.classList) {
		return;
	}

	const navPanelSelector = 'ontario-navigation';
	const isReadyClass = 'ontario-navigation--is-ready';
	const isActiveClass = 'ontario-navigation--open';
	const mobileMenuActiveClass = 'ontario-mobile-navigation--open';

	const nav = document.getElementById(navPanelSelector);
	const openBttnToggler = document.getElementById('ontario-header-menu-toggler');
	const closeBttnToggler = document.getElementById('ontario-header-nav-toggler');
	const menuIcon = document.getElementById('ontario-header-menu-icon');
	const body = document.body;

	if (!nav || !openBttnToggler || !closeBttnToggler || !menuIcon || !body) {
		return;
	}

	let currentToggler = null;
	let currentNavPanel = null;

	function showNavPanel(navPanel) {
		body.classList.add(mobileMenuActiveClass);
		navPanel.classList.add(isActiveClass);
		openBttnToggler.setAttribute('aria-expanded', 'true');
		closeBttnToggler.setAttribute('aria-expanded', 'true');
		menuIcon.setAttribute('xlink:href', '#ontario-icon-close');
		document.addEventListener('keydown', onKeyboardHandler);
		trapFocus(navPanel);
		deferInFn(unbindOpenBttnToggler);
		deferInFn(bindDocumentKeydown);
		deferInFn(bindDocumentClick);
		deferInFn(bindCloseBttnToggler);
	}

	function hideNavPanel(navPanel, returnToToggler) {
		const navPanelDomEl = navPanel ? navPanel : currentNavPanel;
		const returnFocusToToggler = returnToToggler !== undefined;

		body.classList.remove(mobileMenuActiveClass);
		navPanelDomEl.classList.remove(isActiveClass);
		openBttnToggler.setAttribute('aria-expanded', 'false');
		closeBttnToggler.setAttribute('aria-expanded', 'false');
		menuIcon.setAttribute('xlink:href', '#ontario-icon-menu');
		document.removeEventListener('keydown', onKeyboardHandler);
		releaseFocus(navPanelDomEl);
		unbindCloseBttnToggler();
		unbindDocumentClick();
		unbindDocumentKeydown();
		if (returnFocusToToggler) {
			currentToggler.focus();
			currentToggler = null;
		}
		bindOpenBttnToggler();
	}

	function toggleNavPanel() {
		if (nav.classList.contains(isActiveClass)) {
			hideNavPanel();
		} else {
			const navPanelId = openBttnToggler.getAttribute('aria-controls');
			const navPanel = document.getElementById(navPanelId);
			if (currentNavPanel && currentNavPanel !== navPanel) {
				hideNavPanel(currentNavPanel, false);
			}
			currentToggler = openBttnToggler;
			currentNavPanel = navPanel;
			showNavPanel(navPanel);
		}
	}

	function onKeyboardHandler(event) {
		if (event.key === 'Escape') {
			hideNavPanel();
		}
	}

	function trapFocus(element) {
		const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		function handleFocusTrap(event) {
			if (event.key === 'Tab') {
				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						lastFocusableElement.focus();
						event.preventDefault();
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						firstFocusableElement.focus();
						event.preventDefault();
					}
				}
			}
		}

		element.addEventListener('keydown', handleFocusTrap);
		firstFocusableElement.focus();

		return handleFocusTrap;
	}

	function releaseFocus(element) {
		const handleFocusTrap = trapFocus(element);
		element.removeEventListener('keydown', handleFocusTrap);
	}

	function bindOpenBttnToggler() {
		openBttnToggler.addEventListener('click', toggleNavPanel);
	}

	function unbindOpenBttnToggler() {
		openBttnToggler.removeEventListener('click', toggleNavPanel);
	}

	function bindCloseBttnToggler() {
		closeBttnToggler.addEventListener('click', hideNavPanel);
	}

	function unbindCloseBttnToggler() {
		closeBttnToggler.removeEventListener('click', hideNavPanel);
	}

	function bindDocumentClick() {
		document.addEventListener('click', onClickHandler);
	}

	function unbindDocumentClick() {
		document.removeEventListener('click', onClickHandler);
	}

	function bindDocumentKeydown() {
		document.addEventListener('keydown', onKeyboardHandler);
	}

	function unbindDocumentKeydown() {
		document.removeEventListener('keydown', onKeyboardHandler);
	}

	function onClickHandler(event) {
		const isNavPanel = event.target === currentNavPanel;
		const isElementInsideNav = currentNavPanel.contains(event.target);
		if (!isNavPanel && !isElementInsideNav) {
			hideNavPanel();
		}
	}

	function init() {
		const navPanelId = openBttnToggler.getAttribute('aria-controls');
		const navPanel = document.getElementById(navPanelId);
		if (navPanel) {
			addA11y(navPanel);
		}
		bindOpenBttnToggler();
		nav.classList.add(isReadyClass);
	}

	init();
})();

/*
    Search
*/
(function () {
	'use strict';

	// review browser support
	if (!('addEventListener' in window) || !document.documentElement.classList) {
		return;
	}

	var header = document.getElementById('ontario-header'),
		searchFormContainer = document.getElementById('ontario-search-form-container'),
		searchInputField = document.getElementById('ontario-search-input-field'),
		searchReset = document.getElementById('ontario-search-reset'),
		searchToggler = document.getElementById('ontario-header-search-toggler'),
		searchClose = document.getElementById('ontario-header-search-close'),
		searchOpenClass = 'ontario-header--search-open';

	if (!searchFormContainer || !searchInputField || !searchReset) {
		return;
	}

	searchInputField.addEventListener('keyup', function (e) {
		if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) {
			searchReset.click();
		}
		if (!e.target.value) {
			searchInputField.value = '';
			searchInputField.focus();
		}
	});

	// Mobile handling
	function toggleSearchForm(newState) {
		header.classList.toggle(searchOpenClass);
		if (newState === 'expand') {
			removeA11y(searchFormContainer);
			searchInputField.focus();
		} else {
			addA11y(searchFormContainer);
			searchToggler.focus();
		}
	}

	searchToggler.addEventListener('click', function (e) {
		toggleSearchForm('expand');
	});
	searchClose.addEventListener('click', function (e) {
		toggleSearchForm('collapse');
	});
	searchClose.addEventListener('keyup', function (e) {
		if (e.key === 'Enter' || e.keyCode === KEYCODE.ENTER) {
			toggleSearchForm('collapse');
		}
	});
})();
