const client = require('./connection.js')
const express = require('express');
const { crawlWebsite } = require('./main.js')
const { returnJSONReport } = require(`./report.js`)

const app = express()   //  Creates the server 
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.listen(3300, ()=> {
    console.log("Server is now listening at port 3300")
})

client.connect()

const queries = {

    insertWebpage: `
        INSERT INTO webpages(
	        request_id, sub_url)
	        VALUES ($1, $2::text);`,

    insertExternalUrls: `
        INSERT INTO external_urls(
            request_id, base_url, external_urls)
            VALUES ($1, $2::text, $3::text[]);`,

    insertTags: `
        INSERT INTO tags(
            request_id, base_url, title_tags, header_tags, meta_tags)
            VALUES ($1, $2::text, $3::text[], $4::text[], $5::text[]);`,

    insertRequest: `
        INSERT INTO requests(
            request_id, root_url)
            VALUES ($1, $2::text)
    `
}


async function insertURLData(client, urlInfo, reqID) {
    
    const webPageValues = [reqID, urlInfo['base_url']]
    const externalURLsValues = [reqID, urlInfo['base_url'], urlInfo['externalURL']]
    const insertTagsValues = [reqID, urlInfo['base_url'], urlInfo['title_tags'], urlInfo['header_tags'], urlInfo['meta_tags']]

    try {
        // If the query does not fully execute, it will prevent the whole query from being sent 
        await client.query('BEGIN') 
        await client.query(queries.insertWebpage, webPageValues)
        await client.query(queries.insertExternalUrls, externalURLsValues)
        await client.query(queries.insertTags, insertTagsValues)
        await client.query('COMMIT')
        return true
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    }
}


app.get('/crawl/:request_id', (req, res)=> {

    const requestId = req.params.request_id

    if (!requestId) {
        return res.status(400).json({
            error: 'request_id is required',
            success: false
        })
    }

    try {

        query = `
            SELECT * FROM external_urls where request_id=${requestId};
        `
        client.query()
    } catch (err) {

    }

})

//  Detects whether the endpoint was successfull 
app.post('/crawl', async (req, res)=> {
        const { url } = req.body

        if (!url) {
            return res.status(400).json({ 
                error: 'URL is required',
                success: false
            })
        }

        const crawlResults = await crawlWebsite(url)
        const urlsArray = returnJSONReport(crawlResults)
        const rootURL = urlsArray[0]['base_url']
        const reqID = Math.floor(Math.random() * 1000000)
  
        //  Adds the request into the 
        const requestValues = [reqID, rootURL]
        await client.query(queries.insertRequest, requestValues)

        try {
            for (const urlInfo of urlsArray) {
                //Change this from base_url -> sub_url
                await insertURLData(client, urlInfo, reqID)
            }

            return res.status(200).json({
                message: 'All URLS processed successfully',
                requestID: `Your request ID is: ${reqID}. Please save this for future data retrieval of your crawl results.`,
                success: true
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message,
                success: false
            })
        }
    
})



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