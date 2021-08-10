const { BasicComponent } = require('./basicComponent');

/**
 * Floating Button component class
 * @class
 */
class FloatingActionComponent extends BasicComponent {
  /**
   * Creates a Floating Action component.
   * @param {BasicComponent} floatingButton - Floating action button itself
   * @param {BasicComponent} newPatientButton - New Patient button inside the floating action
   * @param {BasicComponent} newTherapyButton - New Therapy button inside the floating action
   * @param {BasicComponent} newNoteButton - New Note button inside the floating action
   * @param {BasicComponent} newPBMInsurance - New PBM Insurance button inside the floating action
   * @param {BasicComponent} newFinancialAssistance - New Financial Assistance button inside the floating action
   * @param {BasicComponent} newAddIncome - New Income button inside the floating action
   * @param {BasicComponent} newMedicalInsurance - New Medical Insurance button inside the floating action
   */
  constructor(floatingButton, newPatientButton, newTherapyButton, newNoteButton, newPBMInsurance, newFinancialAssistance, newAddIncome, newMedicalInsurance) {
    super(floatingButton.locateStrategy, floatingButton.selector);
    this.newPatientButton = newPatientButton;
    this.newTherapyButton = newTherapyButton;
    this.newNoteButton = newNoteButton;
    this.newPBMInsurance = newPBMInsurance;
    this.newFinancialAssistance = newFinancialAssistance;
    this.newAddIncome = newAddIncome;
    this.newMedicalInsurance = newMedicalInsurance;
  }

  /**
   * Opens the new patient form page.
   * @method
   * @async
   */
  async openNewPatientForm() {
    await this.click();
    await this.newPatientButton.click();
  }

  /**
   * Opens the new therapy form.
   * @method
   * @async
   */
  async openNewTherapyForm() {
    await this.click();
    await this.newTherapyButton.click();
  }

  /**
   * Opens the new note side panel.
   * @method
   * @async
   */
  async openNewNoteSidePanel() {
    await this.click();
    await this.newNoteButton.click();
  }

  /**
   * Opens the new PBM Insurance form.
   * @method
   * @async
   */
  async openAddPBMInsurance() {
    await this.click();
    await this.newPBMInsurance.click();
  }

  /**
   * Opens the new Financial Assistance form.
   * @method
   * @async
   */
  async openAddFinancialAssistance() {
    await this.click();
    await this.newFinancialAssistance.click();
  }

  /**
   * Opens the new Income form.
   * @method
   * @async
   */
  async openAddIncome() {
    await this.click();
    await this.newAddIncome.click();
  }

  /**
   * Opens the new Medical Insurance form.
   * @method
   * @async
   */
  async openAddMedicalInsurance() {
    await this.click();
    await this.newMedicalInsurance.click();
  }
}

module.exports = { FloatingActionComponent };
