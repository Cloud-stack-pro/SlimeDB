# SlimeDB
Last version 2.0.0
## install
``` js
npm install slimedb@2.0.0
```
## how to use /* example */
``` js
const mysqli = require('slimedb');
const member = new mysqli("member").createTable({
    id: mysqli.DataType.PRIMARY,
    username: mysqli.DataType.VARCHAR,
    password: mysqli.DataType.VARCHAR,
    active: mysqli.DataType.BOOLEAN,
    age: mysqli.DataType.NUMBER
});
mysqli.query( member, function( data ) {
    console.log( data )
})
```
### options
``` js

```
