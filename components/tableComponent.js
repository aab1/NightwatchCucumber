const { BasicComponent } = require('./basicComponent');

/**
 * Table component class
 * @class
 */
class TableComponent extends BasicComponent {
  /**
   * Verifies if a record is on the table.
   * @method
   * @async
   * @param {Object} attributes - row attributes
   * @deprecated use verifyRowIsPresent instead
   *
   */
  async verifyRecord(attributes) {
    let data = '';
    for (let i = 0; i < Object.keys(attributes).length; i += 1) {
      const attribute = Object.keys(attributes)[i];
      data += `[data-${attribute}="${attributes[attribute]}"]`;
    }
    const row = new BasicComponent(this.locateStrategy, `${this.selector} tr${data}`);
    await row.waitToBePresent();
    await row.waitToBeVisible();
  }

  /**
   * Verifies if a row is present on the table by its data-qa-id attribute.
   * The row must have the table's data-qa-id value as prefix.
   * Optionally can also verifies its cells content by their attributes.
   * @method
   * @async
   * @param {string} rowId - The row's data-qa-id
   * @param {object} [cells={}] - OPTIONAL. cells content to verify
   * @example
   * <caption>Verify if Daraprim PO 25 MG is present in the therapy table</caption>
   * // HTML element
   * <table data-qa-id="therapy-table">
   *  <tbody>
   *    <tr data-qa-id="therapy-row-69413033010">
   *     <td data-qa-id="therapy-name">Daraprim PO 25 MG</td>
   *     <td data-qa-id="therapy-date">2021-01-31</td>
   *     <td data-qa-id="therapy-status">Active</td>
   *    </tr>
   *  </tbody>
   * </table>
   *
   * // JavaScript
   * const table = new TableComponent("css selector", "table[data-qa-id='therapy-table']");
   * await table.verifyRowIsPresent(
   *  "69413033010",
   *  {
   *    name: "Daraprim PO 25 MG",
   *    date: "2021-01-31",
   *    status: "Active",
   *  }
   * ); // Asserts true
   *
   */
  async verifyRowIsPresent(rowId, cells = {}) {
    const tablePrefix = (await this.getAttributeValue('data-qa-id')).replace('-table', '');
    const row = new BasicComponent(
      this.locateStrategy,
      `${this.selector} tr[data-qa-id="${tablePrefix}-row-${rowId}"]`,
    );
    await row.waitToBePresent();
    await row.scrollIntoView();
    await row.waitToBeVisible();
    for (let i = 0; i < Object.keys(cells).length; i += 1) {
      const attribute = Object.keys(cells)[i];
      const cell = new BasicComponent(
        this.locateStrategy,
        `${row.selector} td[data-qa-id="${tablePrefix}-${attribute}"]`,
      );
      await row.waitToBePresent();
      await row.waitToBeVisible();
      await cell.verifyContainsInnerText(cells[attribute]);
    }
  }

  /**
   * Verifies if a row is not present on the table by its data-qa-id attribute.
   * The row must have the table's data-qa-id value as prefix.
   * @method
   * @async
   * @param {string} rowId - The row's data-qa-id
   * @example
   * <caption>Verify if therapy NDC "222" is not in the therapy table</caption>
   * // HTML element
   * <table data-qa-id="therapy-table">
   *  <tbody>
   *    <tr data-qa-id="therapy-row-111"></tr>
   *    <tr data-qa-id="therapy-row-333"></tr>
   *  </tbody>
   * </table>
   *
   * // JavaScript
   * const table = new TableComponent("css selector", "table[data-qa-id='therapy-table']");
   * await table.verifyRowIsNoTPresent("222"); // Asserts true
   *
   */
  async verifyRowIsNoTPresent(rowId) {
    const tablePrefix = (await this.getAttributeValue('data-qa-id')).replace('-table', '');
    const row = new BasicComponent(
      this.locateStrategy,
      `${this.selector} tr[data-qa-id="${tablePrefix}-row-${rowId}"]`,
    );
    await row.waitToNotBePresent();
  }

  /**
   * Clicks on the row's edit button.
   * @method
   * @async
   * @param {string} rowId - The row's data-qa-id
   *
   */
  async editRow(rowId) {
    const tablePrefix = (await this.getAttributeValue('data-qa-id')).replace('-table', '');
    const rowSelector = `${this.selector} tr[data-qa-id="${tablePrefix}-row-${rowId}"]`;
    const editButton = new BasicComponent(
      this.locateStrategy,
      `${rowSelector} button[data-qa-id="${tablePrefix}-edit"]`,
    );
    await editButton.click();
  }

  /**
   * Expands a row.
   * @method
   * @async
   * @param {string} rowId - The row's data-qa-id
   */
  async expandRow(rowId) {
    const tablePrefix = (await this.getAttributeValue('data-qa-id')).replace('-table', '');
    const rowSelector = `${this.selector} tr[data-qa-id="${tablePrefix}-row-${rowId}"]`;
    const expandButton = new BasicComponent(
      this.locateStrategy,
      `${rowSelector} button[aria-label="expand row"]`,
    );
    await expandButton.click();
  }

  /**
   * Verifies a row not having an expand button.
   * @method
   * @async
   * @param {string} rowId - The row's data-qa-id
   */
  async verifyExpandRowIsNotPresent(rowId) {
    const tablePrefix = (await this.getAttributeValue('data-qa-id')).replace('-table', '');
    const rowSelector = `${this.selector} tr[data-qa-id="${tablePrefix}-row-${rowId}"]`;
    const expandButton = new BasicComponent(
      this.locateStrategy,
      `${rowSelector} button[aria-label="expand row"]`,
    );
    await expandButton.waitToNotBePresent();
  }
}

module.exports = { TableComponent };
