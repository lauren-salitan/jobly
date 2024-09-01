// describe("sqlForPartialUpdate", function() {
//     it("should generate a valid SQL update query with multiple fields", function() {
//       const result = sqlForPartialUpdate(
//         { firstName: 'Alice', lastName: 'Doe' },
//         { firstName: 'first_name', lastName: 'last_name' }
//       );
//       expect(result).toEqual({
//         setCols: `"first_name"=$1, "last_name"=$2`,
//         values: ['Alice', 'Doe']
//       });
//     });
  
//     it("should throw an error if no data provided", function() {
//       expect(() => {
//         sqlForPartialUpdate({}, {});
//       }).toThrow(new Error("No data"));
//     });
//   });
  
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function() {
  test("should generate correct SQL part for single field update", function() {
    const result = sqlForPartialUpdate({ name: "TestCo" }, { name: "name" });
    expect(result).toEqual({
      setCols: '"name"=$1',
      values: ["TestCo"]
    });
  });

  test("should generate correct SQL part for multiple fields update", function() {
    const result = sqlForPartialUpdate({ firstName: "Test", lastName: "User" }, { firstName: "first_name", lastName: "last_name" });
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2',
      values: ["Test", "User"]
    });
  });

  test("should throw an error if no data is provided", function() {
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrow(BadRequestError);
  });
});
