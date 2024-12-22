const {JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages) {

    //  Since we don't want to crawl the entire internet, we
    //  will limit our crawling to the baseURL

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)

    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }

    pages[normalizeCurrentURL] = 1

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return pages
            //  400 = client error 
            //  500 = server error 
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non html response, content-type: ${contentType}, on page ${currentURL}`)
            return pages
        }
        //  checks to see that the actual content is HTML
        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        //  recursively will obtain links 
        for (const nextURL of nextURLs) {
            //  This is where the newly encountered URL is added to the pages object and its paired key is a 1
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    
    console.log(`actively crawling ${currentURL}`)
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    //  allows us to access DOM APIs -> document object model 
    const dom = new JSDOM(htmlBody) //  Holds that html street structure
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {

        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative URL: ${err.message}`)
            }
            
        } else {
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