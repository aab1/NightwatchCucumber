const { BasicComponent } = require('../basicComponent');
const { DropDownComponent } = require('../dropDownComponent');
const { InputTextComponent } = require('../inputComponent');
const { CheckboxComponent } = require('../checkboxComponent');
const { CalendarComponent } = require('../calendarComponent');

/**
 * Dispensing, Service Enrollment sub component class
 * @class
 */
class DispensingComponent extends BasicComponent {
  /**
   * Creates a Dispensing, Service Enrollment sub component.
   * @param {string} parentCardCssSelector - Therapy Card Css Selector
   */
  constructor(parentCardCssSelector) {
    super('css selector', parentCardCssSelector);
    this.buttons = {
      undecided: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[name="dispensing_status"][value="Undecided"]`,
      ),
      optIn: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[name="dispensing_status"][value="Opt in"]`,
      ),
      optOut: new BasicComponent(
        this.locateStrategy,
        `${this.selector} input[name="dispensing_status"][value="Opt out"]`,
      ),
    };
    this.inputs = {
      daysSupply: new InputTextComponent(
        this.locateStrategy,
        `${this.selector} input[name="days_supply"]`,
      ),
      outsideDispensingPharmacyOtherReason: new InputTextComponent(
        this.locateStrategy,
        `${this.selector} input[name="external_dispensing_additional_reason"]`,
      ),
    };
    this.checkboxes = {
      perProtocol: new CheckboxComponent(
        this.locateStrategy,
        `${this.selector} input[name="is_needsby_per_protocol"]`,
      ),
    };
    this.dropDowns = {
      undecidedReason: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} #dispensing_undecided_reason-select input[type="text"]`,
      ),
      transferFromPharmacy: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} input[name="transfer_pharmacy"]`,
      ),
      dispensingPharmacy: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} input[name="dispensing_pharmacy"]`,
      ),
      outsideDispensingPharmacyReason: new DropDownComponent(
        this.locateStrategy,
        `${this.selector} #external_dispensing_reason-select input[type="text"]`,
      ),

    };
    this.calendars = {
      followUpDate: new CalendarComponent(
        this.locateStrategy,
        `${this.selector} input[placeholder="mm/dd/yyyy"]`,
      ),
      needsByDay: new CalendarComponent(
        this.locateStrategy,
        `${this.selector} input[placeholder="mm/dd/yyyy"]`,
      ),
    };
  }

  /**
   * Selects Dispensing Service Enrollment Undecided
   * @method
   * @param {"Not yet offered to patient"|"Patient deferred decision"} reason - Reason
   * @param {string} followUpDate - Follow up date
   * Use only when reason is "Patient deferred decision"
   * @async
   */
  async selectUndecided(reason, followUpDate = null) {
    await this.buttons.undecided.click();
    await this.dropDowns.undecidedReason.selectOption(reason);
    if (reason === 'Patient deferred decision') {
      await this.calendars.followUpDate.setDate(followUpDate);
    }
  }

  /**
   * Selects Dispensing Service Enrollment Opt In
   * @param {string} dispensingPharmacy - Dispensing Pharmacy
   * @param {string} [outsideDispensingPharmacyReason=null] - Outside Dispensing Pharmacy Reason
   * @param {string} [otherReason=null] - Other reason
   * Use only when Outside Dispensing Pharmacy Reason is "Other"
   * @param {string} [needsByDate=null] - Needs by date
   * Set to "today" to use today's date
   * @param {string} [daysSupply=null] - Days supply
   * @param {boolean} [perProtocol=false] - Per protocol
   * @param {string} [transferFromPharmacy=null] - Transfer from pharmacy
   */
  async selectOptIn(
    dispensingPharmacy,
    outsideDispensingPharmacyReason = null,
    otherReason = null,
    needsByDate = null,
    daysSupply = null,
    perProtocol = false,
    transferFromPharmacy = null,
  ) {
    await this.buttons.optIn.click();
    await this.dropDowns.dispensingPharmacy.selectOption(dispensingPharmacy);
    await this.checkboxes.perProtocol.setCheckStatus(perProtocol);
    if (outsideDispensingPharmacyReason) {
      await this.dropDowns.outsideDispensingPharmacyReason.selectOption(
        outsideDispensingPharmacyReason,
      );
    }
    if (outsideDispensingPharmacyReason === 'Other' && otherReason != null) {
      await this.inputs.outsideDispensingPharmacyOtherReason.setValue(otherReason);
    }
    if (needsByDate) {
      await this.calendars.followUpDate.setDate(needsByDate);
    }
    if (daysSupply) {
      await this.inputs.daysSupply.setValue(daysSupply);
    }
    if (transferFromPharmacy) {
      await this.dropDowns.transferFromPharmacy.selectOption(transferFromPharmacy);
    }
  }

  /**
   * Selects Dispensing Service Enrollment Opt Out
   * @method
   * @param {string} dispensingPharmacy - Dispensing Pharmacy
   * @param {"LDD"|"Provider Administered"|"Payor Lockout"|"Free Drug Program"|
   * "Patient Choice - Likes current pharmacy"|"Patient Choice - Better OOP/DS at current pharmacy"
   * "Patient Choice - Other"|"Clinician Recommendation - Complexity"|"Long Term Care"|
   * "Out of Service Area"|"Pharmacy is not licensed in this state"|
   * "Other"} outsideDispensingPharmacyReason - Outside Dispensing Pharmacy Reason
   * @param {string} outsideDispensingPharmacyOtherReason - Other Reason
   * Use only when Outside Dispensing Pharmacy Other Reason is "Patient Choice - Other" or "Other"
   * @async
   */
  async selecOptOut(
    dispensingPharmacy,
    outsideDispensingPharmacyReason = null,
    outsideDispensingPharmacyOtherReason = null,
  ) {
    await this.buttons.optOut.click();
    await this.dropDowns.dispensingPharmacy.selectOption(dispensingPharmacy);
    await this.dropDowns.outsideDispensingPharmacyReason.selectOption(
      outsideDispensingPharmacyReason,
    );
    if (outsideDispensingPharmacyReason === 'Other') {
      await this.inputs.outsideDispensingPharmacyOtherReason.setValue(
        outsideDispensingPharmacyOtherReason,
      );
    }
  }
}

module.exports = { DispensingComponent };
