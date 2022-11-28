const
    fs = require('fs'),
    path = require('path'),
    shortid = require('shortid');

class SlimeDB {
    /**
     * @param { String } name Create or select table in slime database.
     */
    constructor( name ) {
        this.tableName = name;
        this.tablePath = path.join( __dirname, 'slimeDB' );
        this.tableFile = path.join( this.tablePath, `${name}.json` );
        
        /**
         * @param { { } } options Model options.
         * @return { void } Object data.
         */
        this.createTable = function createTable( options ) {
            this.tableModel = false;
            typeof options == "object" && (this.tableModel = options);
            !fs.existsSync( this.tablePath ) && fs.mkdirSync( this.tablePath );
            !fs.existsSync( this.tableFile ) && fs.writeFileSync( this.tableFile, "[]" );
            return this
        };
        
        /**
         * @return { void } destroy table
         */
        this.destroy = function destroy() {
            const file = fs.existsSync( this.tableFile );
            file && fs.unlinkSync( this.tableFile );
            return file ? true : false;
        };
    }
    static DataType = {
        PRIMARY: "primary_key",
        VARCHAR: "varchar",
        NUMBER: "int",
        DATETIME: "datetime",
        BOOLEAN: "bool"
    }
}

/**
 * @param { SlimeDB } slimeDB new SlimeDB(tableName).
 * @param { Function } callback Callback data to function.
 * @return { void }
 */
SlimeDB.query = function queryTable( slimeDB, callback ) {
    if ( slimeDB?.constructor?.name !== "SlimeDB" ) throw Error("argument slimeDB is not class SlimeDB.");
    if ( typeof callback !== "function" ) throw Error("Callback is not a function.");
    const table = require( slimeDB.tableFile );
    !callback( table );
    return true;
}

/**
 * @param { SlimeDB } slimeDB new SlimeDB(tableName).
 * @param { { } } data Object data insert to slime table.
 * @return { void }
 */
SlimeDB.insert = function insertTable( slimeDB, data ) {
    if ( slimeDB?.constructor?.name !== "SlimeDB" ) throw Error("argument slimeDB is not class SlimeDB.");
    if ( typeof data !== "object" ) throw Error("Data is not a object.");
    const newData = slimeDB.tableModel ? new Object() : data;
    slimeDB.tableModel && Object.keys( slimeDB.tableModel ).forEach( key => {
        slimeDB.tableModel[key] == SlimeDB.DataType.VARCHAR && ( newData[key] = ( typeof data[key] == "undefined" ) ? null : String( data[key] ) );
        slimeDB.tableModel[key] == SlimeDB.DataType.BOOLEAN && ( newData[key] = ( typeof data[key] == "undefined" ) ? null : Boolean( data[key] ) );
        slimeDB.tableModel[key] == SlimeDB.DataType.PRIMARY && ( newData[key] = shortid.generate() );
        slimeDB.tableModel[key] == SlimeDB.DataType.NUMBER && ( newData[key] = ( typeof data[key] == "undefined" ) ? null : Number( data[key] ) );
        slimeDB.tableModel[key] == SlimeDB.DataType.DATETIME && ( newData[key] = new Date().toLocaleString() );
    });
    const table = require( slimeDB.tableFile ); table.push( newData );
    const tableData =  JSON.stringify( table, null, 4 );
    fs.writeFileSync( slimeDB.tableFile, tableData );
    return true;
}

/**
 * @param { SlimeDB } slimeDB new SlimeDB(tableName).
 * @param { Function } filter Callback data to function.
 * @param { { } } data Object data insert to slime table.
 * @return { void }
 */
SlimeDB.update = function updateTable( slimeDB, filter, data ) {
    if ( slimeDB?.constructor?.name !== "SlimeDB" ) throw Error("argument slimeDB is not class SlimeDB.");
    if ( typeof filter !== "function" ) throw Error("Callback is not a filter function.");
    if ( typeof data !== "object" ) throw Error("Data is not a object.");
    const table = require( slimeDB.tableFile );
    const result = table.find( filter );
    result && Object.assign( result, data );
    const tableData =  JSON.stringify( table, null, 4 );
    fs.writeFileSync( slimeDB.tableFile, tableData );
    return result ? true : false;
}

/**
 * @param { SlimeDB } slimeDB new SlimeDB(tableName).
 * @param { Function } filter Callback data to function.
 * @return { void }
 */
SlimeDB.delete = function deleteTable( slimeDB, filter ) {
    if ( slimeDB?.constructor?.name !== "SlimeDB" ) throw Error("argument slimeDB is not class SlimeDB.");
    if ( typeof filter !== "function" ) throw Error("Callback is not a filter function.");
    const table = require( slimeDB.tableFile );
    const object = table.find( filter );
    const index = table.indexOf( object );
    ( index >= 0 ) && table.splice( index, 1 );
    const tableData = JSON.stringify( table, null, 4 );
    fs.writeFileSync( slimeDB.tableFile, tableData );
    return ( index >= 0 ) ? true : false;
}
module.exports = SlimeDB;
