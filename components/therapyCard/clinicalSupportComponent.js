const { BasicComponent } = require('../basicComponent');
const { DropDownComponent } = require('../dropDownComponent');
const { InputTextComponent } = require('../inputComponent');
const { CalendarComponent } = require('../calendarComponent');

/**
 * Clinical Support, Service Enrollment sub component class
 * @class
 */
class ClinicalSupportComponent extends BasicComponent {
  /**
   * Creates a Clinical Support, Service Enrollment sub component.
   * @param {string} parentCardCssSelector - Therapy Card Css Selector
   */
  constructor(parentCardCssSelector) {
    super('css selector', parentCardCssSelector);
    this.buttons = {
      undecided: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[data-qa-id="clinical_support_status_Undecided"]`,
      ),
      optIn: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[data-qa-id="clinical_support_status_Opt in"]`,
      ),
      optOut: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[data-qa-id="clinical_support_status_Opt out"]`,
      ),
    };
    this.inputs = {
      otherReason: new InputTextComponent(
        this.locateStrategy,
        `${this.selector} [data-qa-id="clinical_support_other_reason"] input`,
      ),
    };
    this.dropDowns = {
      undecidedReason: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} [data-qa-id="clinical_support_undecided_reason_select"] input`,
      ),
      optOutReason: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} [data-qa-id="clinical_support_opt_out_reason_select"] input`,
      ),
    };
    this.calendars = {
      followUpDate: new CalendarComponent(
        this.locateStrategy,
        `${this.selector} input[placeholder="mm/dd/yyyy"]`,
      ),
    };
  }

  /**
   * Selects Clinical Support Service Enrollment to Undecided
   * @method
   * @param {"Not yet offered to patient"|"Patient deferred decision"} reason - Reason
   * @param {string} followUpDate - Follow up date
   *  Use only when reason is "Patient deferred decision"
   *  Set to "today" to use today's date
   * @async
   */
  async selectUndecided(reason, followUpDate = null) {
    await this.buttons.undecided.click();
    await this.dropDowns.undecidedReason.selectOption(reason);
    if (reason === 'Other') {
      await this.calendars.followUpDate.setDate(followUpDate);
    }
  }

  /**
   * Selects Clinical Support Service Enrollment to Opt In
   * @method
   * @async
   */
  async selectOptIn() {
    await this.buttons.optIn.click();
  }

  /**
   * Selects Dispensing Service Enrollment Opt Out
   * @param {"Patient Perception – Therapy Control"|"Patient Perception – Long Time Use"|
   * "Time Constraint"|"Clinician Recommendation - Complexity"|"Other"} reason - Reason
   * @param {string} [otherReason=null] - Other reason
   * Use only when reason is "Other"
   */
  async selecOptOut(
    reason,
    otherReason = null,
  ) {
    await this.buttons.optOut.click();
    await this.dropDowns.optOutReason.selectOption(reason);
    if (reason === 'Other') {
      await this.inputs.otherReason.setValue(otherReason);
    }
  }

  /**
   * Asserts if the option is selected
   * @param {"Opt in"|"Opt out"|"Undecided"} option - Option
   */
  async verifyOptionIsSelected(option) {
    const optionComponent = new BasicComponent(
      'xpath',
      // eslint-disable-next-line max-len
      `//input[@data-qa-id="clinical_support_status_${option}"]/ancestor::span[@aria-disabled="false"]`,
    );
    await optionComponent.hasClass('Mui-checked');
  }
}

module.exports = { ClinicalSupportComponent };
