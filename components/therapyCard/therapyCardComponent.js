const { BasicComponent } = require('../basicComponent');
const { ServiceEnrollmentComponent } = require('./serviceEnrollmentComponent');
const { AdministrationStatusComponent } = require('./administrationStatus');
const { DropDownComponent } = require('../dropDownComponent');

/**
 * Therapy Card component class
 * @class
 */
class TherapyCardComponent extends BasicComponent {
  /**
   * Creates a Therapy Card component.
   * @param {string} therapyNdc - Therapy NDC
   */
  constructor(therapyNdc) {
    super('css selector', `[data-qa-id="therapy-card-${therapyNdc}"]`);
    this.buttons = {
      expand: new BasicComponent(
        this.locateStrategy,
        `${this.selector} [id^="therapy-expand"]`,
      ),
      edit: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="edit_button"]`,
      ),
      newTask: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="add_task_button"]`,
      ),
    };
    this.serviceEnrollment = new ServiceEnrollmentComponent(this.selector);
    this.administrationStatus = new AdministrationStatusComponent(this.selector);
  }

  /**
   * Expands the therapy card if it is collapsed
   * @method
   * @async
   */
  async expandCard() {
    const classes = await this.getPropertyValue('classList');
    if (!classes.includes('Mui-expanded')) {
      await this.buttons.expand.click();
      await this.buttons.newTask.waitToBeVisible();
    }
  }

  /**
   * Collapes the therapy card if it is expanded
   * @method
   * @async
   */
  async collapseCard() {
    const classes = await this.getPropertyValue('classList');
    if (classes.includes('Mui-expanded')) {
      await this.buttons.expand.click();
      await this.buttons.newTask.waitToNotBePresent();
    }
  }

  /**
   * Opens a task
   * @method
   * @param {"Data Collect"|"Prior Authorization"|"Financial Assistance"|
   * "Fill Coordination"|"Interventions"|"Medication Review"|"Counseling"|"Outreach"|
   * "Third Party Referral"|"Quality Related Event"} task - Task's name
   * @async
   */
  async openTask(task) {
    const taskButton = new BasicComponent(
      this.locateStrategy,
      `${this.selector} button[title="${task}"]`,
    );
    await taskButton.click();
  }

  /**
   * Verifies the options from a task status
   * @method
   * @param {string} task - Task's name
   * @param {string[]} options - Options to verify
   * @async
   */
  async verifyTaskStatusOptions(task, options) {
    const statusDropDown = new DropDownComponent(
      this.locateStrategy,
      `${this.selector} [data-qa-id="therapy-task-${task.toUpperCase()}-status"] input`,
    );
    await statusDropDown.verifyOptions(options);
  }

  /**
   * Opens the Add Notes
   * @method
   * @async
   */
  async openNotes() {
    const openNotesButton = new BasicComponent(
      this.locateStrategy,
      `${this.selector} img[alt="note"]`,
    );
    await openNotesButton.click();
  }
}

module.exports = { TherapyCardComponent };
