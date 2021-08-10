const { BasicComponent } = require('./basicComponent');

/**
 * Input text component class
 * Contains all basic user interactions with a text input or text area
 * @class
 */
class InputTextComponent extends BasicComponent {
  /**
   * Sets a text value to the input.
   * See {@link https://nightwatchjs.org/api/setValue.html|Nightwatch set value}
   * @method
   * @async
   * @param {string} value - Value to set to the input
   * @param {boolean} [hitEnter=false] - Hits the Enter key after typing the value
   */
  async setValue(value, hitEnter = false) {
    await this.clearValue();
    await this.client.setValue(this.locateStrategy, this.selector, hitEnter ? `${value}\n` : value);
  }

   /**
   * Sets a text value to the input.
   * See {@link https://nightwatchjs.org/api/setValue.html|Nightwatch set value}
   * @method
   * @async
   * @param {string} value - Value to set to the input
   * @param {boolean} [hitEnter=false] - Hits the Enter key after typing the value
   */
    async setMultipleValues(value, hitEnter = false) {
      await this.client.setValue(this.locateStrategy, this.selector, hitEnter ? `${value}\n` : value);
    }

  /**
   * Gets the value from the input.
   * See {@link https://nightwatchjs.org/api/getValue.html|Nightwatch get value}
   * @method
   * @async
   * @returns {Promise.<string>} Input's current value
   */
  async getValue() {
    return new Promise((res) => {
      this.client.getValue(this.locateStrategy, this.selector, (result) => {
        res(result.value);
      });
    });
  }

  /**
   * Clears the input value.
   * Uses CTRL + A + DEL to manually clear the input value in order
   * to also clear React's value state
   * See {@link https://nightwatchjs.org/api/keys.html|Nightwatch keys}
   * @method
   * @async
   */
  async clearValue() {
    await this.client.setValue(this.locateStrategy, this.selector, ''); // focus on input
    await this.client.keys(this.client.Keys.CONTROL);
    await this.client.keys('A');
    await this.client.keys(this.client.Keys.DELETE);
    await this.client.keys(this.client.Keys.NULL); // release all keys
  }

  /**
   * Asserts the input's value (attribute) to an expected value.
   * @method
   * @async
   * @param {string} expectedValue - Expected value the input should have
   */
  async verifyValue(expectedValue) {
    await this.client.expect.element(this).to.have.value.that.equals(expectedValue);
  }

  /**
   * Inserts a random text in a input
   * @method
   * @async
   * @param {number} stringLength Random string's length.
   */
  async insertRandomString(stringLength = 10) {
    let text = '';
    for (let i = 0; i < stringLength; i += 1) {
      text += String.fromCharCode(Math.floor(Math.random() * 26 + 'a'.charCodeAt()));
    }
    await this.client.clearValue(this.locateStrategy, this.selector);
    await this.client.setValue(this.locateStrategy, this.selector, text);
    return text;
  }

  /**
   * Presses Enter key from keyboard.
   * See {@link https://nightwatchjs.org/api/keys.html#apimethod-page|Nightwatch keys}
   * @method
   * @async
   */
  async pressEnterKey() {
    await this.client.keys(this.client.Keys.ENTER);
  }
}

module.exports = { InputTextComponent };
