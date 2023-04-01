const mysql = require('mysql2')
const connection = mysql.createConnection(DATABASE_URL='mysql://zcvz5mpa0mku4a1wrhmr:pscale_pw_z55WN8fUijvuNvIk2MutRQIqMyt3tWYsyzsHMZ77hp@aws.connect.psdb.cloud/mysql-db1?ssl={"rejectUnauthorized":true}')
console.log('Connected to PlanetScale!')
connection.query(`INSERT INTO comments(name) VALUES('Hola',${foto})`)



/*
const {createPool} = require("mysql2/promise");

async function main() {
    const conn = await createPool({
        database: "mysql-db1",
        username: "bjlrczd553uz785fbwp6",
        host: "aws.connect.psdb.cloud",
        password: "pscale_pw_2CJEnoRpaxewvq8qldaCCnhEfIvvRGISTChmegUBc2V",
        ssl: {
            rejectUnauthorized: false
        }
    });

    conn.query('CREATE TABLE users(name VARCHAR(100))');

    console.log('Conectado');
}

main();
*/