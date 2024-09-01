const { BadRequestError } = require("../expressError");

// /**
//  * Generates a SQL partial update query based on the keys and values provided in the data object.
//  *
//  * @param {Object} data - Contains the fields to update and their new values.
//  * @param {Object} jsToSql - Maps JavaScript object keys to database column names.
//  * @returns {Object} - Contains the SQL query string and an array of values to be used in the query.
//  */

const { BadRequestError } = require("../expressError");

/**
 * Generates a SQL part for an update query that can be used to perform partial updates on a database row.
 *
 * This function creates a part of an SQL update statement, based on the keys provided in the `dataToUpdate` object,
 * mapping them to database column names defined in `jsToSql`. It constructs a string of column assignments for use in
 * an SQL UPDATE statement, and collects the new values to be set in these columns.
 *
 * Example usage:
 * sqlForPartialUpdate({firstName: 'Aliya', age: 32}, {firstName: 'first_name'})
 *   => {
 *        setCols: '"first_name"=$1, "age"=$2',
 *        values: ['Aliya', 32]
 *      }
 *
 * @param {Object} dataToUpdate - An object where the keys are the JavaScript object keys to update,
 *                                and the values are the new values for these keys.
 * @param {Object} jsToSql - An object mapping JavaScript style camelCase keys to database column names in snake_case.
 * @throws {BadRequestError} If `dataToUpdate` is empty.
 * @returns {Object} An object containing `setCols` (a string with the SQL column assignments) and `values` (an array of new values).
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
