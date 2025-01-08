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

function returnJSONReport(pages) {
    const urls = {}

    pagesArray = Object.entries(pages)

    for (const page of pagesArray) {

        const currentURL = page[0]
        const {count, externalURL, titles, headers, meta} = page[1]

        externalURLArray = Object.entries(externalURL)
        titlesArray = Object.entries(titles)
        headersArray = Object.entries(headers)
        metaArray = Object.entries(meta)

        urls[currentURL] = {
            externalURL: externalURLArray,
            title_tags: titlesArray, //  Keeping track of how many times this external URL
            header_tags: headersArray, //   Titles, header, address, 
            meta_tags: metaArray
        }

        
    }

    return urls
}

module.exports = {
    printReport,
    returnJSONReport
}