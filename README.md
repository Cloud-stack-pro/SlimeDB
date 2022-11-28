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

// Query data from table < class table >
mysqli.query( member, function( data ) {
    console.log( data )
});

// Insert data to table < class table >
mysqli.insert( member, {
    username: "kingslimes",
    password: "root@admin",
    active: false,
    age: 20
});

// Delete data from tabel < class table >
mysqli.delete( member, i => i.username == "kingslimes" ); // this removed 

// Remove data table ( delete all data in table )
mysqli.removeTable( member );
```
