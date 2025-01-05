const {JSDOM} = require('jsdom')
const puppeteer = require('puppeteer');


async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)

    //  Needs to return valid pages so that it can check what URLs are already in it 
    if (pages[normalizeCurrentURL]) return pages

    console.log(`actively crawling ${currentURL}`)
    pages[normalizeCurrentURL] =  true

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

        //  Launches pupeteer 
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(currentURL, { waitUntil: 'domcontentloaded' });

        //  Extracts the html content of the page 
        const htmlBody = await page.content()

        await browser.close()       
        

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        
        //  recursively will obtain links 
        for (const nextURL of nextURLs) {


            pages = await crawlPage(baseURL, nextURL, pages)

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

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    } 
    return hostPath
    
}
//  Makes the function above available to other js files
//  That may need to import it 
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}