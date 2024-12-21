const {JSDOM} = require('jsdom')

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
    console.log(urls)
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
    getURLsFromHTML
}