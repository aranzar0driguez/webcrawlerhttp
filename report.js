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
    const urls = []

    pagesArray = Object.entries(pages)

    for (const [base_url, pageData] of pagesArray) {
        const { externalURL, titles, headers, meta } = pageData;

        urls.push({
            base_url,               // Use the URL string
            externalURL,       // Array of external URLs
            title_tags: titles,   // Titles
            header_tags: headers, // Headers
            meta_tags: meta       // Meta tags
        });
    }

    return  urls 
}

module.exports = {
    printReport,
    returnJSONReport
}