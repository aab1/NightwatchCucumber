const { BasicComponent } = require('../basicComponent');
const { DropDownComponent } = require('../dropDownComponent');
const { InputTextComponent } = require('../inputComponent');
const { CheckboxComponent } = require('../checkboxComponent');
const { CalendarComponent } = require('../calendarComponent');

/**
 * Administration Status, Therapy Card sub component class
 * @class
 */
class AdministrationStatusComponent extends BasicComponent {
  /**
   * Creates an Administration Status, Therapy Card sub component.
   * @param {string} parentCardCssSelector - Therapy Card Css Selector
   */
  constructor(parentCardCssSelector) {
    super('css selector', parentCardCssSelector);
    this.buttons = {
      edit: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="edit_administration_button"]`,
      ),
      save: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="edit_administration_submit_button"]`,
      ),
    };
    this.checkboxes = {
      unknownStartDate: new CheckboxComponent(
        this.locateStrategy,
        `${this.selector} input[name="start_date_unknown"]`,
      ),
    };
    this.dropDowns = {
      administrationStatus: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} #administration_status-select input[type="text"]`,
      ),
      reason: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} #administration_status_reason-select input[type="text"]`,
      ),
    };
    this.calendars = {
      date: new CalendarComponent(
        this.locateStrategy,
        `${this.selector} input[placeholder="mm/dd/yyyy"]`,
      ),
    };
    this.inputs = {
      note: new InputTextComponent(
        this.locateStrategy,
        `${this.selector} textarea[placeholder="Add a Note"]`,
      ),
      otherReason: new InputTextComponent(
        this.locateStrategy,
        `${this.selector} input[name="administration_status_additional_reason"]`,
      ),
    };
  }

  /**
   * Edits the therapy's administration status to pre-therapy.
   * @method
   * @async
   */
  async selectPreTherapy() {
    await this.dropDowns.administrationStatus.selectOption('Pre-Therapy');
  }

  /**
   * Edits the therapy's administration status to on-therapy.
   * @method
   * @param {string} startDate - Start Date in format MM/DD/YYYY
   * Set to "today" to use today's date
   * Set to "unknown" to check "Unkown Start Date"
   * @param {string} [note=null] - Note
   * it is only available when changing it to this status for the first time
   * @async
   */
  async selectOnTherapy(startDate, note = null) {
    await this.dropDowns.administrationStatus.selectOption('On Therapy');
    if (startDate === 'unkown') {
      await this.checkboxes.unknownStartDate.check();
    } else {
      await this.calendars.date.setDate(startDate);
    }
    if (note) {
      await this.inputs.note.setValue(note);
    }
  }

  /**
   * Edits the therapy's administration status to no-go.
   * @method
   * @param {"FA unavailable"|"Formulary"|"No insurance"|"PA denied"|"Patient choice"|
   * "Patient unreachable"|"Therapy inappropriate"|"Other"} reason - Reason
   * @param {string} noGoDate - No Go date in format MM/DD/YYYY
   * Set to "today" to use today's date
   * @param {string} [otherReason=null] - Other Reason
   * Use only when reason is "Other"
   * @async
   */
  async selectNoGo(reason, noGoDate, otherReason = null) {
    await this.dropDowns.administrationStatus.selectOption('No-Go');
    await this.dropDowns.reason.selectOption(reason);
    if (reason === 'Other' && otherReason != null) {
      await this.inputs.otherReason.setValue(otherReason);
    }
    await this.calendars.date.setDate(noGoDate);
  }

  /**
   * Edits the therapy's administration status to discontinued.
   * @method
   * @param {"Archived"|"Attempting Pregnancy"|"Currently Pregnant"|
   * "Disease/Condition interaction"|"Drug interaction"|"Drug intolerance (SE/ADR)"|
   * "Financial hardship / inability to pay"|"No insurance"|"PA denied"|"Patient choice"|
   * "Patient deceased"|"Patient moved to hospice"|"Patient unreachable"|"Payer mandate"|
   * "Therapy change: Dose change"|"Therapy change: New Medication/Guideline"|
   * "Therapy change: formulary"|"Therapy change: ineffective"|
   * "Therapy completed"|"Other"} reason - Reason
   * @param {string} discontinuedDate - Discontinued date in format MM/DD/YYYY
   * Set to "today" to use today's date
   * @param {string} [otherReason=null] - Other Reason
   * Use only when reason is "Other"
   * @async
   */
  async selectDiscontinued(reason, discontinuedDate, otherReason = null) {
    await this.dropDowns.administrationStatus.selectOption('Discontinued');
    await this.dropDowns.reason.selectOption(reason);
    if (reason === 'Other' && otherReason != null) {
      await this.inputs.otherReason.setValue(otherReason);
    }
    await this.calendars.date.setDate(discontinuedDate);
  }

  /**
   * Edits the therapy's administration status to discontinued.
   * @method
   * @param {"Attempting Pregnancy"|"Currently Pregnant"|"Drug holiday"|"Hospitalization"|
   * "Medical procedure"|"Patient unreachable"|"Other"} reason - Reason
   * @param {string} recheckDate - Recheck date in format MM/DD/YYYY
   * Set to "today" to use today's date
   * @param {string} [otherReason=null] - Other Reason
   * Use only when reason is "Other"
   * @async
   */
  async selectOnHold(reason, recheckDate, otherReason = null) {
    await this.dropDowns.administrationStatus.selectOption('On Hold');
    await this.dropDowns.reason.selectOption(reason);
    if (reason === 'Other' && otherReason != null) {
      await this.inputs.otherReason.setValue(otherReason);
    }
    await this.calendars.date.setDate(recheckDate);
  }
}

module.exports = { AdministrationStatusComponent };
