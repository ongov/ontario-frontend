function doSearch() {
	/* write your search code inside this function */
	var searchInputField = document.getElementById('ontario-search-input-field');
	console.log('search input field:', searchInputField.value);
}

function handleSearch() {
	console.log('Searching...');
}

/**
 * Add a click listener to the search reset button to clear and focus the search input.
 *
 * @param {string} searchResetButtonId Id of the search reset button
 * @param {string} searchInputId Id of the search input
 */
function addSearchResetOnClickListener(searchResetButtonId, searchInputId) {
	document.getElementById(searchResetButtonId).addEventListener('click', () => {
		const searchInput = document.getElementById(searchInputId);
		if (searchInput) {
			// Reset the search box contents
			const searchResetButton = document.getElementById(searchResetButtonId);
			searchInput.value = '';
			searchResetButton.style.display = 'none';

			// Focus the search box
			searchInput.focus();
		}
	});
}

/**
 * Add an input event listener to the search input to show/hide the search reset button.
 *
 * @param {string} searchInputId Id of the search input
 * @param {string} searchResetButtonId Id of the search reset button
 */
function addResetButtonOnSearchInputListener(searchResetButtonId, searchInputId) {
	const resetButton = document.getElementById(searchResetButtonId);
	const searchInput = document.getElementById(searchInputId);
	document.getElementById(searchInputId)?.addEventListener('input', function () {
		if (searchInput.value !== '') {
			resetButton.style.display = 'block';
		} else {
			resetButton.style.display = 'none';
		}
	});
}
