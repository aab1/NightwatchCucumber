const { BasicComponent } = require('./basicComponent');
const { DropDownComponent } = require('./dropDownComponent');

/**
 * Task Card component class
 * @class
 */
class TaskCardComponent extends BasicComponent {
  /**
   * Creates a Task Card component.
   * @param {string} name - Task name
   */
  constructor(name) {
    super('css selector', `[data-qa-id="task-card-${name.toUpperCase()}"]`);
    this.cardContent = new BasicComponent('css selector', '[data-qa-id="card-content"]');
    this.currentStatus = new BasicComponent('css selector', '[data-qa-id="current-status-chip"]');
    this.moreButton = new DropDownComponent('css selector', '[data-qa-id="status-more-button"]');
  }

  /**
   * Opens the task card content if it is not opened
   * @method
   * @async
   */
  async openCard() {
    const classes = await this.getPropertyValue('classList');
    let isOpened = false;
    for (let i = 0; i < classes.length; i += 1) {
      const className = classes[i];
      if (className.includes('cardChecked')) {
        isOpened = true;
        break;
      }
    }
    if (!isOpened) {
      await this.click();
      await this.cardContent.waitToBePresent();
    }
  }

  /**
   * Closes the task card content if it is opened
   * @method
   * @async
   */
  async closeCard() {
    const classes = await this.getPropertyValue('classList');
    let isOpened = false;
    for (let i = 0; i < classes.length; i += 1) {
      const className = classes[i];
      if (className.includes('cardChecked')) {
        isOpened = true;
        break;
      }
    }
    if (isOpened) {
      await this.click();
      await this.cardContent.waitToBePresent();
    }
  }

  /**
   * Verifies the card content next default status
   * @method
   * @param {string} status - Next status to verify
   * @async
   */
  async verifyCardContentNextDefaultStatus(status) {
    const statusLabel = new BasicComponent(
      this.cardContent.locateStrategy,
      `${this.cardContent.selector} [name="status_id"]`,
    );
    await statusLabel.verifyInnerText(status);
  }

  /**
   * Moves the task status to a new one
   * @method
   * @param {string} nextStatus - Next status to move
   * @async
   */
  async moveToStatus(nextStatus) {
    const selectedStatus = new BasicComponent(
      this.cardContent.locateStrategy,
      `${this.cardContent.selector} [data-qa-id="status_id_${nextStatus}_selected"]`,
    );
    const nextDefaultStatus = new BasicComponent(
      this.cardContent.locateStrategy,
      `${this.cardContent.selector} [data-qa-id="status_id_${nextStatus}"]`,
    );
    if (await selectedStatus.waitToBePresent(3000, false)) {
      await selectedStatus.click();
    } else if (await nextDefaultStatus.waitToBePresent(3000, false)) {
      await nextDefaultStatus.click();
    } else {
      await this.moreButton.click();
      // Wait for the dropdown list to be fully expanded
      const dropDownList = new BasicComponent('css selector', 'div[role="presentation"] div[style*="transform: none"]');
      await dropDownList.waitToBePresent();
      await this.moreButton.clickOption(nextStatus);
    }
  }

  /**
   * Verifies the task card status
   * @method
   * @param {string} status - Status to verify
   * @async
   */
  async verifyTaskStatus(status) {
    const cardStatus = new BasicComponent(
      this.locateStrategy,
      `${this.selector} [data-qa-id="task-card-status-${status}"]`,
    );
    await cardStatus.waitToBeVisible();
    await cardStatus.verifyInnerText(status);
  }
}

module.exports = { TaskCardComponent };
