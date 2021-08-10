const { BasicComponent } = require('../basicComponent');
const { DispensingComponent } = require('./dispensingComponent');
const { ClinicalSupportComponent } = require('./clinicalSupportComponent');
/**
 * Service Enrollment, Therapy Card sub component class
 * @class
 */
class ServiceEnrollmentComponent extends BasicComponent {
  /**
   * Creates Service Enrollment, Therapy Card sub component.
   * @param {string} parentCardCssSelector - Therapy Card Css Selector
   */
  constructor(parentCardCssSelector) {
    super('css selector', parentCardCssSelector);
    this.dispensing = new DispensingComponent(parentCardCssSelector);
    this.clinicalSupport = new ClinicalSupportComponent(parentCardCssSelector);
    this.buttons = {
      edit: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="edit_service_button"]`,
      ),
      save: new BasicComponent(
        this.locateStrategy,
        `${this.selector} button[name="edit_enrollment_submit_button"]`,
      ),
    };
  }
}

module.exports = { ServiceEnrollmentComponent };
