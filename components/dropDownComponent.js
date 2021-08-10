const { BasicComponent } = require('./basicComponent');
const { InputTextComponent } = require('./inputComponent');

/**
 * Drop-down component class
 * Contains all basic user interactions with a dropdown
 * @class
 */
class DropDownComponent extends InputTextComponent {
  /**
   * Selects an option to the dropdown.
   * @method
   * @async
   * @param {string} value - Exact value to select to the dropdown
   */
  async selectOption(value) {
    await this.forceClick();
    await this.setValue(value);
    await this.clickOption(value);
  }

  /**
   * Clicks on an option from the dropdown list.
   * The dropdown list must be displayed first
   * @method
   * @async
   * @param {string} value - Option value to click
   */
  async clickOption(value) {
    const option = new BasicComponent('css selector', `[data-qa-id="option-${value}"]`);
    await option.click();
  }

  /**
   * Selects a random option from a dropdown.
   * @method
   * @async
   */
  async selectRandomOption() {
    await this.client.setValue(this.locateStrategy, this.selector, this.client.Keys.SPACE);
    await this.client.setValue(this.locateStrategy, this.selector, this.client.Keys.SPACE);
  }

  /**
   * Verifies all options from the dropdown list.
   * @method
   * @async
   * @param {string[]} expectedOptions - Options to verify
   */
  async verifyAllOptions(expectedOptions) {
    await this.click();
    const allOptions = await this.getElementsText('css selector', '.qa-option');
    this.verifyOptionsFromDropdown(expectedOptions, allOptions);
    await this.pressEscape();
  }

  /**
   * Verifies all available-only options from the dropdown list.
   * @method
   * @async
   * @param {string[]} expectedOptions - Options to verify
   */
  async verifyAvailableOptions(expectedOptions) {
    await this.click();
    const availableOptions = await this.getElementsText(
      'css selector',
      '.qa-option[aria-disabled="false"]',
    );
    this.verifyOptionsFromDropdown(expectedOptions, availableOptions);
    await this.pressEscape();
  }

  /**
   * Verifies all disabled-only options from the dropdown list.
   * @method
   * @async
   * @param {string[]} expectedOptions - Options to verify
   */
  async verifyDisabledOptions(expectedOptions) {
    await this.click();
    const disabledOptions = await this.getElementsText(
      'css selector',
      '.qa-option[aria-disabled="true"]',
    );
    this.verifyOptionsFromDropdown(expectedOptions, disabledOptions);
    await this.pressEscape();
  }

  /**
   * Util method for asserting dropdown options as array.
   * @method
   * @async
   * @param {string[]} expectedOptions - Options to verify
   * @param {string[]} dropdownOptions - Options from the dropdown
   */
  verifyOptionsFromDropdown(expectedOptions, dropdownOptions) {
    for (let i = 0; i < expectedOptions.length; i += 1) {
      const option = expectedOptions[i];
      const index = dropdownOptions.indexOf(option);
      if (index === -1) {
        this.client.assert.fail(`the dropdown does not contain the option: ${option}`);
      } else {
        this.client.assert.strictEqual(option, dropdownOptions[index]);
        dropdownOptions.splice(index, 1);
      }
    }
    if (dropdownOptions.length > 0) {
      this.client.assert.fail(`the dropdown contains extra options: ${dropdownOptions.toString()}`);
    }
  }
}

module.exports = { DropDownComponent };
