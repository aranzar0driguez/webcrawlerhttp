const client = require('./connection.js')
const express = require('express');
const { crawlWebsite } = require('./main.js')
const { returnJSONReport } = require(`./report.js`)

const app = express()   //  Creates the server 


app.listen(3300, ()=> {
    console.log("Server is now listening at port 3300")
})

client.connect()

//  Sets up an HTTP GET endpoint at /users
//  When a GET request is made to /users, the callback function is triggered.
//  DELETE LATER: Gets ALL users 
// app.get('/users', (req, res)=> {
//     //  Once the query completes, the callback function will execute 
//     client.query('Select * from users', (err, result)=> {
//         if (!err) {
//             //  Sends data back to the client 
//             res.send(result.rows)
//         }
//     })
//     client.end
// })

//  DELETE LATER: Gets a specific user
// app.get('/users/:id', (req, res)=> {
//     client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if (!err) {
//             res.send(result.rows)
//         }
//     })
//     client.end
// })

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//  DELETE LATER: Adds new user 
// app.post('/users', (req, res)=> {
//     const user = req.body
//     let insertQuery = `insert into users(id, firstname, lastname) 
//                        values(${user.id}, '${user.firstname}', '${user.lastname}')`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

//  Detects whether the endpoint was successfull 
app.post('/crawl', async (req, res)=> {
    try {
        const { url } = req.body

        if (!url) {
            console.log("A URL is required")
            return res.status(400).json({ error: 'URL is required'})
        }

        const crawlResults = await crawlWebsite(url)
        const urlsArray = returnJSONReport(crawlResults)
        rootURL = urlsArray[0]['base_url']
        randomNum = 1

        //  Insert the info the in query 
        const insertQuery = `
           INSERT INTO webpages(
	        request_id, sub_url, root_url)
	        VALUES (${randomNum}, '${rootURL}', '${rootURL}')
        `

        client.query(insertQuery, (err, result)=>{
            if(!err) {
                res.send('Insertion was successful')
            } else {
                console.log(err.message)
            }
        })
        //  Consider moving this to its own function: 
        client.end
        // res.json({ success: true, urls: urlsArray})

    } catch (error){
        res.status(500).json({ error: error.message })
        console.log(error.message)
    }
})


//  DELETE LATER: Updates user 
// app.put('/users/:id', (req, res)=> {
//     let user = req.body
//     let updatedQuery = `update users
//                         set firstname = '${user.firstname}',
//                         lastname = '${user.lastname}'
//                         where id = ${user.id}`

//     client.query(updatedQuery, (err, result)=> {
//         if (!err) {
//             res.send('Update was successful!')
//         } else {
//             console.log(err.message)
//         }
//     })
//     client.end
// })

//  DELETE LATER: 
// app.delete('/users/:id', (req, res)=> {
//     let insertQuery = `delete from users where id=${req.params.id}`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Deletion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

// client.connect()