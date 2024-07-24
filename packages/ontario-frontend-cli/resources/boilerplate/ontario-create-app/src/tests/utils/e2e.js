/**
 * All the utility functions for the e2e tests
 */

/**
 * Helper function to check if element exists and is visible
 * @param {string} selector - Selector value, either a class or an id, of the element
 * @param {string} description - Description of the element
 */
function checkElement(selector, description) {
  browser
    .waitForElementVisible(selector, 1000, `${description} is visible within 1 second`)
    .assert.elementPresent(selector, `${description} should exist`);
}

/**
 * Helper function to check the attributes of an element
 * @param {string} selector - Selector of the element
 * @param {string} attribute - Attribute to check
 * @param {string} expectedValue - Expected value of the attribute
 */
function checkElementAttributes(selector, attribute, expectedValue, customMessage) {
  browser.assert.attributeEquals(selector, attribute, expectedValue, customMessage);
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

/**
 * A combined function to check the page language attributes and language toggle button text
 * @param {string} langAttr - Expected value of the HTML lang attribute
 * @param {string} buttonText - Expected text content of the language toggle button
 */
function checkLanguageAttributes(langAttr, buttonText, customMessage) {
  checkElementAttributes(
    'html',
    'lang',
    langAttr,
    customMessage
  );
  // Targeting the language toggle button within the ontario header
  checkElementText('.ontario-header__language-toggler span', buttonText);
}

module.exports = {
  checkElement,
  checkElementAttributes,
  checkElementText,
  checkLanguageAttributes,
};