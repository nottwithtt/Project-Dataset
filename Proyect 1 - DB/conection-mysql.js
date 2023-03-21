const mysql = require('mysql2')
const connection = mysql.createConnection('mysql://4eme3kqqx4ueltv2mfzj:pscale_pw_L5cO1mxvZ83BMQUwcEYLLMWdEPBPMkrbQE7nB9TEK7t@us-east.connect.psdb.cloud/project?ssl={"rejectUnauthorized":true}'
)
console.log('Connected to PlanetScale!')
connection.end()