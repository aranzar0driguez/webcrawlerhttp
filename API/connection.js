const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Zhongguo20018!",
    database: "webcrawlerurls"

})

module.exports = client