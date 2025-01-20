const client = require('./connection.js')
const express = require('express');
const { crawlWebsite } = require('./main.js')
const { returnJSONReport } = require(`./report.js`)

const app = express()   //  Creates the server 
app.use(express.json()) //converts body to JSON

app.listen(3300, ()=> {
    console.log("Server is now listening at port 3300")
})

client.connect()

const queries = {

    insertWebpageInfo: `
        INSERT INTO webpage_info(
	        request_id, root_url, base_url, external_urls, title_tags, header_tags, meta_tags)
	        VALUES ($1, $2::text, $3::text, $4::text[], $5::text[], $6::text[], $7::text[]);`,

    insertRequest: `
        INSERT INTO requests(
            request_id, root_url)
            VALUES ($1, $2::text[])
    `,

    selectRequest: `
        SELECT * FROM requests WHERE request_id=$1
    `
}

//  Pushes data into SQL
async function insertURLData(client, urlInfo, rootURL, reqID) {
    
    const webpageInfoValues = [reqID, rootURL, urlInfo['base_url'], urlInfo['externalURL'], urlInfo['title_tags'], urlInfo['header_tags'], urlInfo['meta_tags']]

    try {
        // If the query does not fully execute, it will prevent the whole query from being sent 
        await client.query('BEGIN')
        await client.query(queries.insertWebpageInfo, webpageInfoValues)
        await client.query('COMMIT')
        return true

    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    }
}



app.get('/crawl/:request_id', async (req, res)=> {

    const requestID = req.params.request_id

    if (!requestID) {
        return res.status(400).json({
            error: 'Request_id is required',
            success: false
        })
    }

    try {

        await client.query(queries.selectRequest, [requestID], (err, result)=> {
            if (!err) {
                return res.status(400).json({
                    message: 'Your query has been successful',
                    result: result,
                    success: true
                })
            }
        })

    } catch (err) {
        return res.status(400).json({
            error: 'Invalid Request ID',
            success: false
        })
    }

})

//  Detects whether the endpoint was successfull 
app.post('/crawl', async (req, res)=> {
        const { urls, storeResults } = req.body
        // let validURLS
        let crawlResultsArray = [] //   Stores the results of the crawl 
        let urlCrawlFinishedArray = []

        //  Ensures request body is complete 
        if (!urls || storeResults == null) {
            return res.status(400).json({ 
                error: 'URL and storeResults are both required',
                success: false
            })
        }

        //  Ensures a valid URL was inputted 
        try {
            for (const url of urls) {
                const validURL = new URL(url)
                const crawlResults = await crawlWebsite(validURL)
                crawlResultsArray.push(crawlResults)
            }
        } catch (error) {
            return res.status(400).json({
                error: 'There is an invalid URL in your urls parameter!',
                success: false
            })
        }      
        
        //  If the user would like to store the results 
        const reqID = Math.floor(Math.random() * 1000000)
        
        if (storeResults) {
            //  The urls object MUST be an array of URLS
            await client.query(queries.insertRequest, [reqID, urls])
        }

        for (const crawlResult of crawlResultsArray) {

            const { urlsArray, rootURL } = returnJSONReport(crawlResult)            
            urlCrawlFinishedArray.push(urlsArray)
            
            try {
                if (storeResults) {
                    for (const urlInfo of urlsArray) {
                        //Change this from base_url -> sub_url
                        await insertURLData(client, urlInfo, rootURL ,reqID) //  For now, this doesn't do anything 
                    }
                }

            } catch (error) {
                return res.status(500).json({
                    error: error.message,
                    success: false
                })
            }
        }

        return res.status(200).json({
            message: 'All URLS processed successfully!',
            requestID: storeResults ? `Your request ID is: ${reqID}. Please save this for future data retrieval of your crawl results.` : `Your results were not stored in our database.`,
            success: true,
            urlArray: urlCrawlFinishedArray
        })
    
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