const { BasicComponent } = require('./basicComponent');

/**
 * Radio button component class
 * @class
 */
class RadioButtonComponent extends BasicComponent {
  /**
   * Selects an option.
   * @method
   * @async
   * @param {string} value - Exact value to select to the radio button
   * @param {"aria-label"|"value"} [valueAttribute="aria-label"] - Attribute to capture
   *  value from the radio button
   *
   */
  async selectOption(value, valueAttribute = 'aria-label') {
    let selector;
    if (this.locateStrategy === 'xpath') {
      selector = `${this.selector}//*[@${valueAttribute}="${value}"]`;
    } else {
      selector = `${this.selector} [${valueAttribute}="${value}"]`;
    }
    const option = new BasicComponent(this.locateStrategy, selector);
    await option.waitToBePresent();
    await option.click();
  }
}

module.exports = { RadioButtonComponent };
