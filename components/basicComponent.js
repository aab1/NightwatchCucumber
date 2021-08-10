const { client } = require('nightwatch-api');
/**
 * Basic component class
 * Contains all basic user actions and asserts for a HTML element
 * such as clicking, verifying its existence or visibility
 * @class
 */
class BasicComponent {
  /**
   * Creates a basic component element object.
   * @param {"css selector"|"xpath"|"link text"|"partial link text"|"tag name"} locateStrategy
   *  - Locator strategy.
   * See {@link https://www.w3.org/TR/webdriver/#locator-strategies|W3 locator strategies},
   * {@link https://www.w3schools.com/cssref/css_selectors.asp|CSS selectors reference} and
   * {@link https://devhints.io/xpath|Xpath selectors reference}
   * @param {string} selector - Selector query
   *
   * @example
   * <caption>Example selecting a div using "css selector"</caption>
   * // HTML element
   * <div id="myDiv"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   *
   * @example
   * <caption>Example selecting a div using "xpath"</caption>
   * // HTML element
   * <div id="myDiv"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("xpath", `//div[@id="myDiv"]`);
   */
  constructor(locateStrategy, selector) {
    this.locateStrategy = locateStrategy;
    this.selector = selector;
    this.client = client;
  }

  /**
   * Clicks on the element.
   * Automatically waits for the element to be present and visible.
   * Scrolls into view first.
   * See {@link https://nightwatchjs.org/api/click.html|Nightwatch click}
   * @method
   * @async
   */
  async click() {
    await this.scrollIntoView();
    await this.client.click(this.locateStrategy, this.selector);
  }

  /**
   * Scrolls the element into view.
   * See {@link https://nightwatchjs.org/api/execute.html|Nightwatch execute}
   * @method
   * @async
   */
  async scrollIntoView() {
    await this.waitToBePresent();
    return new Promise((res) => {
      // eslint-disable-next-line prefer-arrow-callback, func-names
      this.client.execute(function (locateStrategy, selector) {
        let element;
        if (locateStrategy === 'xpath') {
          // eslint-disable-next-line no-undef
          const nodes = document.evaluate(selector, document);
          element = nodes.iterateNext();
        } else {
          // eslint-disable-next-line no-undef
          element = document.querySelector(selector);
        }
        element.scrollIntoView({ block: 'center' });
        return true;
      }, [this.locateStrategy, this.selector], () => {
        res();
      });
    });
  }

  /**
   * Forces click on the element via Client JavaScript.
   * See {@link https://nightwatchjs.org/api/execute.html|Nightwatch execute}
   * @method
   * @async
   */
  async forceClick() {
    await this.waitToBePresent();
    return new Promise((res) => {
      // eslint-disable-next-line prefer-arrow-callback, func-names
      this.client.execute(function (locateStrategy, selector) {
        let element;
        if (locateStrategy === 'xpath') {
          // eslint-disable-next-line no-undef
          const nodes = document.evaluate(selector, document);
          element = nodes.iterateNext();
        } else {
          // eslint-disable-next-line no-undef
          element = document.querySelector(selector);
        }
        element.click();
        return true;
      }, [this.locateStrategy, this.selector], () => {
        res();
      });
    });
  }

  /**
   * Moves the mouse to the element.
   * Asserts the element to be present and visible.
   * If offsets are null, the mouse will be moved to the center of the element.
   * If the element is not visible, it will be scrolled into view.
   * See {@link https://nightwatchjs.org/api/moveToElement.html|Nightwatch move to element}
   * @param {number} [xoffset] - (Optional) X offset to move to,
   *  relative to the top-left corner of the element.
   * @param {number} [yoffset] - (Optional) Y offset to move to,
   *  relative to the top-left corner of the element.
   * @method
   * @async
   *
   * @example
   * <caption>Example moving the mouse to the center of a div</caption>
   * // HTML element
   * <div id="myDiv"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * await myDivObject.moveToElement()
   *
   * @example
   * <caption>Example moving the mouse to the top left of a div</caption>
   * // HTML element
   * <div id="myDiv"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * await myDivObject.moveToElement(10, 10)
   *
   */
  async moveToElement(xoffset = null, yoffset = null) {
    await this.waitToBePresent();
    if (xoffset === null || yoffset === null) {
      const size = await this.getElementSize();
      await this.client.moveToElement(
        this.locateStrategy,
        this.selector,
        size.width / 2,
        size.height / 2,
      );
    } else {
      await this.client.moveToElement(this.locateStrategy, this.selector, xoffset, yoffset);
    }
  }

  /**
   * Gets the value of a HTML attribute from the element.
   * See {@link https://nightwatchjs.org/api/getAttribute.html|Nightwatch get attribute}
   * @param {string} attribute - Attribute key to retrieve its value
   * @method
   * @async
   * @returns {Promise.<string>} Attribute value
   *
   * @example
   * <caption>Get the aria-label attribute value from a div element</caption>
   * // HTML element
   * <div id="myDiv" aria-label="my value"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * const value = await myDivObject.getAttributeValue("aria-label");
   * console.log(value) //Prints "my value"
   *
   */
  async getAttributeValue(attribute) {
    return new Promise((res) => {
      this.client.getAttribute(this.locateStrategy, this.selector, attribute, (result) => {
        res(result.value);
      });
    });
  }

  /**
   * Gets the value of a CSS property from the element.
   * See {@link https://nightwatchjs.org/api/getCssProperty.html|Nightwatch get css property}
   * See {@link https://www.w3schools.com/csSref/default.asp|W3Schools CSS reference}
   * @param {string} cssProperty - CSS property to retrieve its value
   * @method
   * @async
   * @returns {Promise.<string>} CSS property value
   *
   * @example
   * <caption>Get the CSS color property value from a div element</caption>
   * // HTML element
   * <div id="myDiv" style="color: red"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * const value = await myDivObject.getCssPropertyValue("color");
   * console.log(value) //Prints "red"
   *
   */
  async getCssPropertyValue(attribute) {
    return new Promise((res) => {
      this.client.getCssProperty(this.locateStrategy, this.selector, attribute, (result) => {
        res(result.value);
      });
    });
  }

  /**
   * Gets the value of a HTML property from the element.
   * See {@link https://nightwatchjs.org/api/getElementProperty.html|Nightwatch
   *  get element property}
   * See {@link https://developer.mozilla.org/en-US/docs/Web/API/element|Mozilla Dev
   *  HTML element properties}
   * @param {string} property - HTML property to retrieve its value
   * @method
   * @async
   * @returns {Promise.<string>} Property value
   *
   * @example
   * <caption>Get the CSS color property value from a div element</caption>
   * // HTML element
   * <div id="myDiv" class="card"/>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * const value = await myDivObject.getElementProperty("classList");
   * console.log(value) //Prints "card"
   *
   */
  async getPropertyValue(property) {
    return new Promise((res) => {
      this.client.getElementProperty(this.locateStrategy, this.selector, property, (result) => {
        res(result.value);
      });
    });
  }

  /**
   * Gets the inner text value of the element
   * See {@link https://nightwatchjs.org/api/getText.html|Nightwatch get text}
   * @method
   * @async
   * @returns {Promise.<string>} Inner text
   *
   * @example
   * <caption>Get the text value from a div element</caption>
   * // HTML element
   * <div id="myDiv">Hello World</div>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * const value = await myDivObject.getText();
   * console.log(value) //Prints "Hello World"
   */
  async getInnerText() {
    return new Promise((res) => {
      this.client.getText(this.locateStrategy, this.selector, (result) => {
        res(result.value);
      });
    });
  }

  /**
   * Asserts the element has a given inner HTML text.
   * @method
   * @async
   * @param {string} text - Inner text
   */
  async verifyInnerText(text) {
    await this.client.expect.element(this).text.to.equal(text);
  }

  /**
   * Asserts the element to contain a section of a Text.
   * @method
   * @async
   * @param {string} text - Inner text
   */
  async verifyContainsInnerText(text) {
    await this.client.expect.element(this).text.to.contain(text);
  }

  /**
   * Asserts the element has a disabled attribute.
   * @method
   * @async
   */
  async verifyIsDisabled() {
    await this.client.expect.element(this).to.not.be.enabled;
  }

  /**
   * Asserts the element does not have a disabled attribute.
   * @method
   * @async
   */
  async verifyIsEnabled() {
    await this.client.expect.element(this).to.be.enabled;
  }

  /**
   * Asserts and waits for the element to be present
   * See {@link https://nightwatchjs.org/api/waitForElementPresent.html|Nightwatch
   *  wait for element present}
   * @method
   * @async
   * @param {number} timeout - (Optional) Custom time in miliseconds to wait before
   *  failing the test.
   * Default value is defined by waitForConditionTimeout in nightwatch.conf.js
   * @param {number} retryInterval - (Optional) Custom interval time in miliseconds to retry
   *  if the element is present.
   * Default value is defined by waitForConditionPollInterval in nightwatch.conf.js
   * @param {bool} abortOnFailure - (Optional) Set to false to continue
   *  the test even if the assertion fails.
   * Default value is defined by abortOnAssertionFailure in nightwatch.conf.js
   * @returns {Promise.<bool>} True if the element is present
   */
  async waitToBePresent(
    timeout = this.client.globals.waitForConditionTimeout,
    abortOnFailure = this.client.globals.abortOnAssertionFailure) {
    return new Promise((resolve) => {
      this.client.waitForElementPresent(this, timeout, abortOnFailure, (result) => {
        if (!abortOnFailure) {
          resolve(Boolean(result.value));
          return;
        }
        if (result.value) {
          resolve(Boolean(result.value));
        } else {
          resolve(this.client.assert.fail());
        }
      });
    });
  }

  /**
   * Asserts and waits for the element to not be present
   * See {@link https://nightwatchjs.org/api/waitForElementNotPresent.html|Nightwatch
   *  wait for element not present}
   * @method
   * @async
   * @param {number} timeout - (Optional) Custom time in miliseconds to wait before
   *  failing the test.
   * Default value is defined by waitForConditionTimeout in nightwatch.conf.js
   * @param {number} retryInterval - (Optional) Custom interval time in miliseconds to retry
   *  if the element is not present.
   * Default value is defined by waitForConditionPollInterval in nightwatch.conf.js
   * @param {bool} abortOnFailure - (Optional) Set to false to continue
   *  the test even if the assertion fails.
   * Default value is defined by abortOnAssertionFailure in nightwatch.conf.js
   * @returns {Promise.<bool>} True if the element is not present
   */
  async waitToNotBePresent(
    timeout = this.client.globals.waitForConditionTimeout,
    abortOnFailure = this.client.globals.abortOnAssertionFailure) {
    return new Promise((resolve) => {
      this.client.waitForElementNotPresent(this, timeout, abortOnFailure, (result) => {
        if (!abortOnFailure) {
          resolve(!result.value);
          return;
        }
        if (result.value) {
          resolve(true);
        } else {
          resolve(this.client.assert.fail());
        }
      });
    });
  }

  /**
   * Asserts and waits for the element to be visible
   * See {@link https://nightwatchjs.org/api/waitForElementVisible.html|Nightwatch
   *  wait for element visible}
   * @method
   * @async
   * @param {number} timeout - (Optional) Custom time in miliseconds to wait before
   *  failing the test.
   * Default value is defined by waitForConditionTimeout in nightwatch.conf.js
   * @param {bool} abortOnFailure - (Optional) Set to false to continue
   *  the test even if the assertion fails.
   * Default value is defined by abortOnAssertionFailure in nightwatch.conf.js
   * @returns {Promise.<bool>} True if the element is visible
   */
  async waitToBeVisible(
    timeout = this.client.globals.waitForConditionTimeout,
    abortOnFailure = this.client.globals.abortOnAssertionFailure) {
    return new Promise((resolve) => {
      this.client.waitForElementVisible(this, timeout, abortOnFailure, (result) => {
        if (!abortOnFailure) {
          resolve(result.value);
          return;
        }
        if (result.value) {
          resolve(result.value);
        } else {
          resolve(this.client.assert.fail());
        }
      });
    });
  }

  /**
   * Asserts and waits for the element to not be visible.
   * See {@link https://nightwatchjs.org/api/waitForElementNotVisible.html|Nightwatch
   *  wait for element not visible}
   * @method
   * @async
   * @param {number} timeout - (Optional) Custom time in miliseconds to wait before
   *  failing the test.
   * Default value is defined by waitForConditionTimeout in nightwatch.conf.js
   * @param {bool} abortOnFailure - (Optional) Set to false to continue
   *  the test even if the assertion fails.
   * Default value is defined by abortOnAssertionFailure in nightwatch.conf.js
   * @returns {Promise.<bool>} True if the element is not visible
   */
  async waitToNotBeVisible(
    timeout = this.client.globals.waitForConditionTimeout,
    abortOnFailure = this.client.globals.abortOnAssertionFailure) {
    return new Promise((resolve) => {
      this.client.waitForElementNotVisible(this, timeout, abortOnFailure, (result) => {
        if (!abortOnFailure) {
          resolve(result.value);
          return;
        }
        if (!result.value) {
          resolve(result.value);
        } else {
          resolve(this.client.assert.fail());
        }
      });
    });
  }

  /**
   * Gets the height and width of the element
   * See {@link https://nightwatchjs.org/api/getElementSize.html|Nightwatch
   *  get element size}
   * @method
   * @async
   * @typedef {Object} Size
   * @property {number} height - Height of the element
   * @property {number} width - Width of the element
   * @returns {Promise.<Size>} Height and width of the element
   *
   * @example
   * <caption>Get size of a div element</caption>
   * // HTML element
   * <div id="myDiv">Hello World</div>
   *
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * const value = await myDivObject.getElementSize();
   * console.log(value) //Prints "{height: 100, width:100}"
   */
  async getElementSize() {
    return new Promise((resolve) => {
      this.client.getElementSize(this.locateStrategy, this.selector, (result) => {
        resolve({
          height: result.value.height,
          width: result.value.width,
        });
      });
    });
  }

  /**
   * Gets the text as array from elements.
   * @method
   * @async
   * @param {"css selector"|"xpath"|"link text"|"partial link text"|"tag name"} locateStrategy
   * @param {string} selector - Selector query
   * @returns {Promise.<string[]>} Texts as array
   */
  async getElementsText(locateStrategy, selector) {
    return new Promise((res) => {
      this.client.elements(locateStrategy, selector, async (elements) => {
        const options = [];
        for (let i = 0; i < elements.value.length; i += 1) {
          options.push(await this.getElementTextByNightwatchId(elements.value[i].ELEMENT));
        }
        res(options);
      });
    });
  }

  /**
   * Gets the text from a element by nightwatch ID.
   * See {@link https://nightwatchjs.org/api/elementIdText.html|Nightwatch element id text}
   * @method
   * @async
   * @param {string} id - Nightwatch id
   * @returns {Promise.<string>} Element inner text
   */
  async getElementTextByNightwatchId(id) {
    return new Promise((res) => {
      this.client.elementIdText(id, (text) => {
        res(text.value);
      });
    });
  }

  /**
   * Asserts if the element contains a class name.
   * @method
   * @async
   * @param {string} className - Class to verify
   */
  async hasClass(className) {
    const classes = await this.getPropertyValue('classList');
    return new Promise((resolve) => {
      resolve(classes.includes(className));
    });
  }

  /**
   * Hides the element by adding CSS rule display:none.
   * @method
   * @async
   */
  async hide() {
    await this.waitToBePresent();
    return new Promise((res) => {
      // eslint-disable-next-line prefer-arrow-callback, func-names
      this.client.execute(function (locateStrategy, selector) {
        let element;
        if (locateStrategy === 'xpath') {
          // eslint-disable-next-line no-undef
          const nodes = document.evaluate(selector, document);
          element = nodes.iterateNext();
        } else {
          // eslint-disable-next-line no-undef
          element = document.querySelector(selector);
        }
        element.style.display = 'none';
        return true;
      }, [this.locateStrategy, this.selector], () => {
        res();
      });
    });
  }

  /**
   * Shows the element by removing its CSS rule display.
   * @method
   * @async
   */
  async show() {
    await this.waitToBePresent();
    return new Promise((res) => {
      // eslint-disable-next-line prefer-arrow-callback, func-names
      this.client.execute(function (locateStrategy, selector) {
        let element;
        if (locateStrategy === 'xpath') {
          // eslint-disable-next-line no-undef
          const nodes = document.evaluate(selector, document);
          element = nodes.iterateNext();
        } else {
          // eslint-disable-next-line no-undef
          element = document.querySelector(selector);
        }
        element.style.removeProperty('display');
        return true;
      }, [this.locateStrategy, this.selector], () => {
        res();
      });
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
   * Checks if the given attribute of an element contains the expected value
   * @method
   * @async
   * @param {string} attribute - HTML attibute to retrieve its value
   * @param {string} expectedValue - value expected to be found in html attribute
   * <caption>Get the arial-label attribute value from a div element and assert its value</caption>
   * // HTML element
   * <div id="myDiv" arial-label="Some text"/>
   * // JavaScript
   * const myDivObject = new BasicComponent("css selector", "div#myDiv");
   * await myDivObject.verifyAttributeContainsValue("arial-label","Some text");
   */
    async verifyAttributeContainsValue(attribute, expectedValue) {
      await this.client.expect
        .element(this)
        .to.have.attribute(attribute)
        .which.contains(expectedValue);
    }
}

module.exports = { BasicComponent };
