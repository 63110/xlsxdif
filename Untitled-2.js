function fistart () {

  "use strict";
var xlsx = require("xlsx");

var firstBook = xlsx.readFile("./uploads/book1.xlsx");
//console.log(firstBook.SheetNames);
var listReaderFirst = firstBook.Sheets["l1"];
var dataFirstBook = xlsx.utils.sheet_to_json(listReaderFirst);
//console.log(dataFirstBook);
var secondBook = xlsx.readFile("./uploads/book2.xlsx");
console.log(secondBook.SheetNames)
var listReaderSec = secondBook.Sheets["l1"];
var dataSecondBook = xlsx.utils.sheet_to_json(listReaderSec);
//console.log(dataSecondBook);


var Newdata1 = dataFirstBook.map((record) => {
  
  //console.log(record.Kilovaty);
  //console.log(record.NumberSCH);
  //console.log(record.Check);
  if (record.Kilovaty === undefined ) {
    record.Kilovaty = "No value in book1";
     // if (record.Check === undefined ) {
    //  record.Check = "No";
      
    //}
  };
  //console.log(record.Kilovaty) 
  //console.log(record.Check) 
  return record;
});
//Newdata1.forEach( element => console.log(element.Kilovaty));


var Newdata2 = dataSecondBook.map(record => {
  var SameNumberSCH = Newdata1.find((x) => record.NumberSCH_2 === x.NumberSCH);

  if (SameNumberSCH !== undefined) {
      record.Kilovaty_2 = SameNumberSCH.Kilovaty;

      if (SameNumberSCH.Kilovaty === undefined) {
          record.Kilovaty_2 = "No value in book1";
      }
      
  } else {
    record.INFO = "No data NUMBERSCH in book1";
    record.Kilovaty_2 = "No_value"
    record.NumberSCH_2;
  }
  
  delete record.A;
  delete record.B;
  delete record.C;
  delete record.D;
  delete record.E;
  delete record.F;
  delete record.G;
  delete record.I;
  delete record.J;
  delete record.G_1;
  return record;
  
});

Newdata1 = dataFirstBook.map((record) => {
  var SmNumberSCH = Newdata2.find((x) => record.NumberSCH === x.NumberSCH_2);
  
  if (record.Check === undefined ) {
    record.Check = "";
    if (SmNumberSCH !== undefined) {
      record.Check ="taken";
    }
  }

  //console.log(record.Check) 
  return record;
});

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(Newdata2);
xlsx.utils.book_append_sheet(newWB, newWS, "b2");
xlsx.writeFile(newWB, "./New Data File.xlsx");

var newWB1 = xlsx.utils.book_new();
var newWS1 = xlsx.utils.json_to_sheet(Newdata1);
xlsx.utils.book_append_sheet(newWB1, newWS1, "Newdata");
xlsx.writeFile(newWB1, "./bigbooktaken.xlsx");

return ('Untitled-2.js')};
module.exports = {fistart};