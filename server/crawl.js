const {JSDOM} = require('jsdom')
var TurndownService = require('turndown')
const events = require('./API/events.js');
const { sendSSEUpdate } = events;

//const puppeteer = require('puppeteer');


async function crawlPage(baseURL, currentURL, pages, includeElement) { //   Contains parameters for the types of tags to scrape 

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    //  Prevents us from crawling websites outside our baseURL
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)

    //  Needs to return valid pages so that it can check what URLs are already in it 
    if (pages[normalizeCurrentURL]) {
        pages[normalizeCurrentURL].count ++
        return pages
    }

    console.log(`actively crawling ${currentURL}`)
    try {
        sendSSEUpdate(`actively crawling ${currentURL}`);
    } catch (err) {
        console.log(err)
    }

    pages[normalizeCurrentURL] = {
        count: 1,
        externalURL: [], //  Keeping track of how many times this external URL
        titles: [], //   Titles, header, address, 
        headers: [],
        meta: [] 
    }

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return pages
       
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non html response, content-type: ${contentType}, on page ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()    
        
        //  An array of true or false values is passed (maybe a reference to the value where it matches a specific value )

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        const titles = getElementFromHTML(htmlBody, normalizeCurrentURL, 'title', includeElement.titles.crawl)
        const headers = getElementFromHTML(htmlBody, normalizeCurrentURL, 'h1, h2, h3, h4, h5, h6', includeElement.headers.crawl)
        const metaData = getElementFromHTML(htmlBody, normalizeCurrentURL, 'meta[name="description"], meta[property="og:description"]', includeElement.metaData.crawl)


        pages[normalizeCurrentURL].titles = titles
        pages[normalizeCurrentURL].headers = headers
        pages[normalizeCurrentURL].meta = metaData

        //  This is the list of all the URLs it crawled within the website 
        for (const nextURL of nextURLs) {
            
            const nextURLObj = new URL(nextURL)

            //  If the URL is an external URL... go ahead and add it 
            if (baseURLObj.hostname !== nextURLObj.hostname) {

                if (nextURLObj.protocol.startsWith("http")) {
                    pages[normalizeCurrentURL].externalURL.push(nextURLObj.href); // Adds an external URL to the array
                }

            }

            pages = await crawlPage(baseURL, nextURL, pages, includeElement)
        }

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []

        //  allows us to access DOM APIs -> document object model 
        const dom = new JSDOM(htmlBody) //  Holds that html street structure
        const linkElements = dom.window.document.querySelectorAll('a')

        for (const linkElement of linkElements) {

            //  If the href element starts with /... go ahead and add the base URL to it 
            if (linkElement.href.slice(0, 1) === '/') {
                try {

                    const urlObj = new URL(`${baseURL}${linkElement.href}`)
                    
                    urls.push(urlObj.href)

                } catch (err) {
                    console.log(`error with relative URL: ${err.message}`)
                }
                
            } else if (linkElement.href.slice(0,2) == '..') {
                try {
                    //  Remove the first two dots 
                    const sliceURL = linkElement.href.slice(2)
                    const urlObj = new URL(`${baseURL}${sliceURL}`)
                    
                    urls.push(urlObj.href)


                } catch (err) {
                    console.log(`error turning the ../ URL into an obj ${err.message}`)
                }
            }
            
            else {
                try {
                    const urlObj = new URL(linkElement.href)
                    urls.push(urlObj.href)


                } catch (err) {
                    console.log(`error with absolute URL: ${err.message}`)
                }
            }
        
    }

    return urls
 
}

function getElementFromHTML(htmlBody, currentURL, querySelectorElement, includeValue) {
    
    const elementArray = []

    if (includeValue) {
        
        const dom = new JSDOM(htmlBody)
        const elements = dom.window.document.querySelectorAll(querySelectorElement)

        if (querySelectorElement !== 'meta[name="description"], meta[property="og:description"]') {
            for (const element of elements) {
                //console.log(`One of the title element for ${currentURL} is ${title.textContent}`)
                elementArray.push(element.textContent)
            }
        } else {
            
            for (const element of elements) {

                elementArray.push(element.content)

            }

        }

    }

    return elementArray

} 

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    } 
    return hostPath
    
}

function normalizeRootURL(urlString) {
    var pattern = /^((http|https|ftp):\/\/)/

    if(!pattern.test(urlString)) {
        url = "http://" + urlString
        console.log(`the normalized url: ${url}`)
        return url
    } else {
        return urlString
    }

}

// function convertIntoMarkDown(htmlBody) {
//     var turndownService = new TurndownService()
//     var markdown = turndownService.turndown(htmlBody)
//     console.log(markdown)

//     //return markdown
// }

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
    getElementFromHTML,
    normalizeRootURL
}