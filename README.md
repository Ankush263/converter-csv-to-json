## converter-csv-to-json

#### Special Note:

- First row of your CSV file must contain all the titles of related columns.
- Selector is your input tag id

```html
<input type="file" id="my-id"/>
```
```javascript
import {csvtojson} from "converter-csv-to-json";

async function convertToJson(){
	
	let jsonData = await csvtojson({
	"selector": "my-id",
	"delimiter": ","
	});

	console.log(josnData);
}

// Result

{
     "data":[{
		"name" : "your name",
		"address" : "your address",
		"contact" : "1234567890"
	},{
		"name" : "your name 1",
		"address" : "your address 1",
		"contact" : "1234567890"
	}]
}
```
