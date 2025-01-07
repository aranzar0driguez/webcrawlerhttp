//const { headersArray } = require("puppeteer")

function printReport(pages) {
    console.log("==================REPORT==================")
    pagesArray = Object.entries(pages)

    for (const sortedPage of pagesArray) {

        const url = sortedPage[0]
        const {count, externalURL, titles, headers, meta} = sortedPage[1]
        

        urlArray = Object.entries(externalURL)
        titlesArray = Object.entries(titles)
        headersArray = Object.entries(headers)
        metaArray = Object.entries(meta)
        
        console.log(`${url}********************************`)
        reportElementFormat("   No external Links", "   EXTERNAL LINKS:", urlArray)
        reportElementFormat("   No title tags", "   TITLES:", titlesArray)
        reportElementFormat("   No headers", "  HEADERS:", headersArray)
        reportElementFormat("   No meta data found", "  META DESCRIPTION", metaArray)

    }
    console.log("===============END OF REPORT===============")

}

function reportElementFormat(noElement, elementPresent, elementArray) {
    if (elementArray.length < 1) {
        console.log(noElement)
    } else {
        console.log(elementPresent)
        for (const element of elementArray) {
            console.log(`    -${element[1]}`)
        }
    }
}

module.exports = {
    printReport,
    reportElementFormat
}