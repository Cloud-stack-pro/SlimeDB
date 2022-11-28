# SlimeDB
Last version 2.0.0
## install
``` js
npm install slimedb@2.0.0
```
## example to use 
``` js
const mysqli = require('slimedb');
const member = new mysqli("member").createTable({
    id: mysqli.DataType.PRIMARY, // auto primary key
    datetime: mysqli.DataType.DATETIME, // auto generate datetime
    username: mysqli.DataType.VARCHAR, // typeof this = string
    password: mysqli.DataType.VARCHAR, // typeof this = string
    active: mysqli.DataType.BOOLEAN, // typeof this = boolean
    age: mysqli.DataType.NUMBER // typeof this = number
});
mysqli.query( member, function( data ) {
    console.log( data )
})
```
