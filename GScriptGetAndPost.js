function doGet(e) {
    //return ContentService.createTextOutput("Hello World!");
    
    //the following methods are found in https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
    
    try{
      var ss = SpreadsheetApp.openById('158xO4WvHtPIwcVuAkesKzmIgXjVYbN4ARqPs80xwUNE');
      var sheet = ss.getSheetByName('Sheet1');
      var data = sheet.getRange(2, 1, sheet.getLastRow() -1, sheet.getLastColumn()).getValues();
      var jsonData = JSON.stringify(data);
          return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
    }
    catch(e) {
      var error = {error:e};
      var jsonError = JSON.stringify(error);
      return ContentService.createTextOutput(jsonError).setMimeType(ContentService.MimeType.JSON);
    }
  }

  function doPost(e) {
    try {
        var ss = SpreadsheetApp.openById("158xO4WvHtPIwcVuAkesKzmIgXjVYbN4ARqPs80xwUNE");
        var sheet = ss.getSheetByName('Sheet1');
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var holderArray = [];
        for (var x = 0; x < headers.length; x++) {
            var tempValue = !e.parameter[headers[x]] ? ' ' : e.parameter[headers[x]];
            holderArray.push(tempValue);
        }
        sheet.appendRow(holderArray);
        var results = {
            "data": e.parameter,
            "holder": holderArray
        };
        var jsonData = JSON.stringify(results);
        return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
    }
    catch (e) {
        var error = {"error": e};
        var jsonError = JSON.stringify(error);
        return ContentService.createTextOutput(jsonError).setMimeType(ContentService.MimeType.JSON);
    }
}