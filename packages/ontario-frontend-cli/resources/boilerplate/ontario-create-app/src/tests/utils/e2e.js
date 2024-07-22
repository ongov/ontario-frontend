/**
 * All the utility functions for the e2e tests
 */

/**
 * Helper function to check if element exists and is visible
 * @param {string} selector - Selector value, either a class or an id, of the element
 * @param {string} description - Description of the element
 */
function checkElement(selector, description) {
  browser.assert
    .elementPresent(selector, `${description} should be present`)
    .assert.visible(selector, `${description} should be visible`);
}

/**
 * Helper function to check the attributes of an element
 * @param {string} selector - Selector of the element
 * @param {string} attribute - Attribute to check
 * @param {string} expectedValue - Expected value of the attribute
 */
function checkElementAttributes(selector, attribute, expectedValue) {
  browser.assert.attributeEquals(selector, attribute, expectedValue);
}

/**
 * Helper function to check the text content of an element
 * @param {string} selector - Selector of the element
 * @param {string} expectedText - Expected text content of the element
 */
function checkElementText(selector, expectedText) {
  browser.getText(selector, function (result) {
    this.assert.equal(result.value.trim(), expectedText);
  });
}

module.exports = {
  checkElement,
  checkElementAttributes,
  checkElementText,
};