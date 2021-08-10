const { BasicComponent } = require('./basicComponent');
const { CheckboxComponent } = require('./checkboxComponent');

/**
 * Multi select Drop-down checkbox component class
 * Contains all basic user interactions with a multi select checkbox dropdown
 * @class
 */
class DropDownMultiSelectCheckboxComponent extends BasicComponent {
  /**
   * Checks multiple options for the checkbox-dropdown.
   * @method
   * @async
   * @param {string[]} values - Multiple values to select on the dropdown
   */
  async multiSelectDropDown(values) {
    for (let i = 0; i < values.length; i += 1) {
      const checkbox = new CheckboxComponent(
        'xpath',
        `(//span[@title="${values[i]} "]//parent::li//span)[2]`,
      );
      await this.client.setValue(this.locateStrategy, this.selector, values[i]);
      await checkbox.check();
    }
    await this.pressEscape();
  }
}
module.exports = { DropDownMultiSelectCheckboxComponent };
