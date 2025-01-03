const {JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages, words) {

    //  Since we don't want to crawl the entire internet, we
    //  will limit our crawling to the baseURL

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)


    //  Initializes the key with a default value if it doesn't exist 
    if (!pages[normalizeCurrentURL]) {
        pages[normalizeCurrentURL] = {
            count: 1,
            wordFreq: {} 
        }
    //  If we have already crawled this URL... let's go ahead and simply increase its value
    } else if (pages[normalizeCurrentURL].count > 0) {

        pages[normalizeCurrentURL].count++
        return pages
    }

     

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

        //  Returns an array of words for a given URL  + intializes that value 
        const wordsObj = getWordFreqCountFromHTML(htmlBody)
        pages[normalizeCurrentURL].wordFreq = wordsObj

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        
        //  recursively will obtain links 
        for (const nextURL of nextURLs) {

            pages = await crawlPage(baseURL, nextURL, pages, words)

        }

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    
    return pages
}

function getWordFreqCountFromHTML(htmlBody) {
    
    const wordFreq = {} //  Initialize an empty Object for word frequencies 

    const dom = new JSDOM(htmlBody)
    const pElements = dom.window.document.querySelectorAll('p') //  returns a list of p elements 
    
    //  Iterates through each of the p elements 
    for (const element of pElements) {

        const text = element.textContent // extracts the text content from the p element 
        const wordsArray = text.split(" ") //This splits the string into an array of words 

        //  Iterates through the text within a single given p element 
        for (const word of wordsArray) {

            //  removes the punctuation and changes the entire word into lowercase form 
            const normalizedWord = word.toLowerCase().replace(/[^\w]/g, '');

            if (wordFreq[normalizedWord] > 0) {
                wordFreq[normalizedWord]++
            } else {
                wordFreq[normalizedWord] = 1
            }
        }

    }
    return wordFreq
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