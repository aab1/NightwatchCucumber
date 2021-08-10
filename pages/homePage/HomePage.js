const { textField } = require('./HomePageSelectors');
const { BasePage } = require('../base/basePage');
// let assert = require('assert');

/**
 * Home page class
 * @class
 */
class HomePage extends BasePage{
  /**
   *
   */
   constructor() {
    super();
    // this.textField = textField;  
  }

}
module.exports = { homePage: new HomePage() };
