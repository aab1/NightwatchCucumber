const { client } = require('nightwatch-api');
const { base_textField } = require('./baseSelectors');
const { BasicComponent } = require('../../components/basicComponent');

/**
 * Base page class
 * Contains all the basic actions and attributes for a page object model
 * @class
 */
class BasePage {
  /**
   * Creates a base page.
   * @param {string} pathUrl - The URL path of Sign in page
   */
  constructor(pathUrl) {
    this.pathUrl = pathUrl;
    this.client = client;
    this.base_textField = base_textField;
  }

  /**
   * Navigates to the page url and waits for the main element to be present.
   * @method
   * @async
   */
  async navigate() {
    await this.client.url();
  }

  /**
   * Refreshes the current browser window.
   * @method
   * @async
   */
  async refresh() {
    await this.client.refresh();
  }

  /**
   * Navigates to a given URL.
   * @method
   * @async
   * @param {string} url - Url
   */
  async navigateTo(url) {
    await this.client.url(url);
  }

  /**
   * Maximizes the current browser window.
   * @method
   * @async
   */
  async maximizeWindow() {
    await this.client.maximizeWindow();
  }

  /**
   * Deletes the current browser cookies.
   * @method
   * @async
   */
  async deleteCookies() {
    await this.client.deleteCookies();
  }

  /**
  * Sets a cookie to the current browser window.
  * @method
  * @param {string} name - Cookie key name
  * @param {string} value - Cookie value
  * @async
  */
  async setCookie(name, value) {
    await this.client.setCookie({
      name,
      value,
    });
  }

  /**
   * Presses the Escape key.
   * @method
   * @async
   */
  async pressEscape() {
    await this.client.keys(this.client.Keys.ESCAPE);
  }

  /**
   * Gets the current window size.
   * @method
   * @async
   * @typedef {Object} Size
   * @property {number} height - Height of the current window
   * @property {number} width - Width of the current window
   * @returns {Promise.<Size>} Height and width of the current window
   */
  async getWindowSize() {
    return new Promise((res) => {
      this.client.getWindowSize((result) => {
        res(result);
      });
    });
  }

  /**
   * Resizes the current window.
   * @method
   * @async
   * @param {number} width - Width size in pixels
   * @param {number} height - Height size in pixels
   */
  async resizeWindow(width, height) {
    await this.client.resizeWindow(width, height);
  }

  /**
   * Opens a new tab.
   * @method
   * @async
   * @param {boolean=true} swithToNewTap - Switch to the new tab as soon as it created
   */
  async openNewTab(swithToNewTap = true) {
    this.client.openNewWindow();
    if (swithToNewTap) {
      await this.swithToTab();
    }
  }

  /**
   * Switches to a tab or window based on what tab number has been created.
   * @method
   * @async
   * @param {number=1} tabNumber - N. created tab, starts from 0
   */
  async swithToTab(tabNumber = 1) {
    return new Promise((resolve) => {
      this.client.windowHandles((result) => {
        this.client.switchWindow(result.value[tabNumber]);
        resolve();
      });
    });
  }

  /**
   * The selector takes a string of xpath
   * @method
   * @param {string} selector
   */
  async getNumberOfElementsThatMatchSelector(selector) {
    return new Promise((resolve) => {
      this.client.elements('xpath', selector, (result) => {
        resolve(result.value.length);
      });
    });
  }

  /**
   * This takes a dynamic xpath that get a list of elements to be clicked
   * @method
   * @param {string} xpathSelector
   */
  async clickOnMultipleElementsUsingXpath(xpathSelector) {
    const numberOfElements = await this.getNumberOfElementsThatMatchSelector(xpathSelector);
    for (let i = 1; i <= numberOfElements; i += 1) {
      await new BasicComponent('xpath', `(${xpathSelector.selector})[${i}]`).click();
    }
  }

  /**
   * Pauses the test execution by miliseconds.
   * @method
   * @async
   * @param {number} time - Timo to wait in miliseconds
   */
  async pause(time) {
    await this.client.pause(time);
  }

  /**
   * See {@link https://nightwatchjs.org/api/keys.html#apimethod-page|Nightwatch keys}
   * @method
   * @async
   */
  async pressEscKey() {
    await this.client.keys(this.client.Keys.ESCAPE);
  }

  /**
 * Returns a random number with the lenght passed as parameter.
 * By default the return number has a length of 10
 * @method
 * @async
 * @param {number} length - length of the number
 */
  async generateRandomNumber(length = 10) {
    let text = '';
    for (let i = 0; i < length; i += 1) {
      text += String.fromCharCode(Math.floor(Math.random() * 10 + '0'.charCodeAt()));
    }
    return text;
  }
}

module.exports = { BasePage };
