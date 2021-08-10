const { BasicComponent } = require('./basicComponent');

/**
 * Checkbox component class
 * Contains all basic user interactions with a checkbox
 * @class
 */
class CheckboxComponent extends BasicComponent {
  /**
   * Checks the checkbox if it is unchecked.
   * @method
   * @async
   */
  async check() {
    const checkStatus = await this.getAttributeValue('checked');
    if (!checkStatus) {
      await this.click();
    }
  }

  /**
   * Unchecks the checkbox if it is checked
   * @method
   * @async
   */
  async uncheck() {
    const checkStatus = await this.getAttributeValue('checked');
    if (checkStatus) {
      await this.click();
    }
  }

  /**
   * Checks or unchecks the checkbox depending of the status
   * @method
   * @async
   * @param {boolean} status - Check status
   */
  async setCheckStatus(status) {
    if (status) {
      await this.check();
    } else {
      await this.uncheck();
    }
  }
}

module.exports = { CheckboxComponent };
