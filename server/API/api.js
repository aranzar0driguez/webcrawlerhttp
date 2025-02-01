const client = require('./connection.js')
const express = require('express');
const cors = require('cors');
const { crawlWebsite } = require('../main.js')
const { returnJSONReport } = require(`../report.js`)
const { insertURLData, queries, deleteData } = require('./queries.js');
const { normalizeURL, normalizeRootURL } = require('../crawl.js');

const app = express()   //  Creates the server 

app.use(cors()) //  allows server to accept requests from different origins 
// (other domains, protocols, or ports) by setting appropriate HTTP headers

app.use(express.json()) //converts body to JSON

app.listen(3300, ()=> {
    console.log("Server is now listening at port 3300")
})

client.connect()

app.delete('/crawl/:request_id', async (req, res) => {

    const requestID = req.params.request_id;

    if (!requestID) {
        return res.status(400).json({
            error: 'request_id is required'
        })
    }
    try {
        deleteData(client, requestID);
        
        return res.status(200).json({
            message: `You have successfully deleted your query for requestID: ${requestID}`,
            success: true
        })

    } catch (err) {
        return res.status(400).json({
            error: err,
            success: false
        })
    }

})

app.get('/crawl/:request_id', async (req, res)=> {

    const requestID = req.params.request_id

    if (!requestID) {
        return res.status(400).json({
            error: 'Request_id is required',
            success: false
        })
    }

    try {
        client.query(queries.returnWebpageJSONObject, [requestID], (err, result)=> {
            if (!err) {

                return res.status(200).json({
                    message: 'Your query was successful!',
                    root_urls: result.rows[0].json_agg,
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

        let crawlResultsArray = [] //   Stores the results of the crawl 
        let urlCrawlFinishedArray = []

        if (!urls || storeResults == null) {
            return res.status(400).json({ 
                error: 'URL and storeResults are both required',
                success: false
            })
        }

        if (new Set(urls).size !== urls.length) {
            return res.status(400).json({
                error: 'Please ensure there are no duplicate URLs',
                success: false
            })
        }

        try {
            for (let i=0; i < urls.length; i++) {
                const validURL = new URL(normalizeRootURL(urls[i]))
                const crawlResults = await crawlWebsite(validURL)
                crawlResultsArray.push(crawlResults)
            }
        } catch (error) {
            return res.status(400).json({
                error: 'There is an invalid URL in your urls parameter',
                success: false
            })
        }      
        
        //  If the user would like to store the results, create random ID 
        const reqID = Math.floor(Math.random() * 1000000)
        
        if (storeResults) {
            await client.query(queries.insertRequest, [reqID, urls])
        }

        for (const crawlResult of crawlResultsArray) {

            //Extracts information from crawl results 
            const { urlsArray, rootURL } = returnJSONReport(crawlResult)  

            urlCrawlFinishedArray.push({
                rootURL,
                sub_urls: urlsArray
            })
            
            try {
                if (storeResults) {
                    for (const urlInfo of urlsArray) {
                        //Change this from base_url -> sub_url
                        await insertURLData(client, urlInfo, rootURL ,reqID)
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