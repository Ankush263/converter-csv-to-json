module.exports.csvtojson = async function(optionsObj){
  if(typeof optionsObj === "object"){
    if((optionsObj.selector !== undefined) && (optionsObj.delimiter !== undefined)){
      if((typeof optionsObj.selector === "string") && (typeof optionsObj.delimiter === "string")){
        var inputId = optionsObj.selector;
        var delimiter = optionsObj.delimiter;
        var inputObj = document.getElementById(inputId);
    
        var csv = await readUploadedFileAsText(inputObj.files[0]);
        
        var allTextLines = csv.split(/\r\n|\n/);
        var finalObj = {
          "data":[]
        };
    
        // to get all keys for JSON
        var allTitles = allTextLines[0].split(delimiter);
    
        for (var i=1; i<(allTextLines.length-1); i++) {
    
            var data = allTextLines[i].split(delimiter);
    
            var jsonObj = new Object();
    
            for(var j=0; j<data.length; j++){
              jsonObj[allTitles[j]] = data[j]
            }
    
            finalObj.data.push(jsonObj);
        }
        return new Promise((resolve, reject) => {
          resolve(finalObj);
        });
      }
      else{
        throw "selector and delimiter must be string";
      }
    }
    else{
      throw "selector and delimiter both required";
    }
  }
  else{
    throw "argument must be object";
  }
}

function readUploadedFileAsText(inputFile) {
  const readerObj = new FileReader();

  return new Promise((resolve, reject) => {
    readerObj.onerror = () => {
      readerObj.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    readerObj.onload = () => {
      resolve(readerObj.result);
    };
    readerObj.readAsText(inputFile);
  });
};