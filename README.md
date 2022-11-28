# SlimeDB
Last version 2.0.0
## install
``` js
npm install slimedb@2.0.0
```
## how to use
``` js
const mysqli = require('slimedb');
const member = new mysqli("member").createTable( options );
mysqli.query( member, function( data ) {
    console.log( data )
})
```
