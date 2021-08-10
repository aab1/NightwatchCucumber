const { BasicComponent } = require('./basicComponent');
const { InputTextComponent } = require('./inputComponent');

/**
 * Floating Button component class
 * @class
 */
class PatientSearcherComponent extends BasicComponent {
  /**
   * Creates a patient searcher component.
   * @param {BasicComponent} searchButton - Search button itself
   * @param {InputTextComponent} searchInput - Patient search input
   */
  constructor(searchButton, searchInput) {
    super(searchButton.locateStrategy, searchButton.selector);
    this.searchInput = searchInput;
  }

  /**
   * Searches for a patient.
   * @method
   * @param {string} patient - Search by patient's Last, First name
   *  or MRN or DOB(mm/dd/yyyy) or Phone(xxx-xxx-xxxx)
   * @async
   */
  async searchPatient(patient) {
    await this.click();
    await this.searchInput.setValue(patient);
  }
}

module.exports = { PatientSearcherComponent };
