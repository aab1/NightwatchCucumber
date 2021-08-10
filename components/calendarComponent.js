const { InputTextComponent } = require('./inputComponent');

/**
 * Calendar component class
 * Contains all basic user interactions with a calendar
 * @class
 */
class CalendarComponent extends InputTextComponent {
  /**
   * Sets the calendar date to today.
   * @method
   * @async
   */
  async setToday() {
    await this.clearValue();
    await this.click();
    await this.pressEnterKey();
  }

  /**
   * Sets a date to the calendar
   * You can also set date to "today" as string to select today's date
   * @method
   * @async
   * @param {string} date - Date to set
   */
  async setDate(date) {
    if (date === 'today') {
      await this.setToday();
    } else {
      await this.setValue(date, true);
    }
  }

   /**
   * Returns tomorrow's date
   * Expected output: mm/dd/yyyy
   * @method
   */
  getTomorrowsDate() {
    const today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }
    const tommorrow = `${mm}/${dd + 1}/${yyyy}`;
    return tommorrow;
  }

  /**
   * Returns date as mm/YYYY
   * @param {string} date - Date to set mm/dd/yyyy
   * @method
   */
  getMonthAndYear(date = this.getTomorrowsDate()) {
    const fullDate = date.split('/');
    return `${fullDate[0]}/${fullDate[2]}`;
  }
}

module.exports = { CalendarComponent };
