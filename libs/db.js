const pgp = require('pg-promise')()
/*

// https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'my-database-name',
    user: 'user-name',
    password: 'user-password',
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};
const db = pgp(cn);
*/

const connectionString = "postgres://pptei_usr:kunziLevent@localhost:5432/propertiedb"
const db = pgp(connectionString)

module.exports = db
