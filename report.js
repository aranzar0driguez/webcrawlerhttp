
function printReport(pages) {
    console.log("==================REPORT==================")
    pagesArray = Object.entries(pages)

    for (const sortedPage of pagesArray) {
        // const url = sortedPage[0]

        const url = sortedPage[0]
        const {count, externalURL} = sortedPage[1]

        urlArray = Object.entries(externalURL)
        
        console.log(`The current page: ${url}`)
        // console.log(urlArray)

        if (urlArray.length < 1) {
            console.log("   This url has no external links")
        } else {
            console.log("   EXTERNAL LINKS:")
            for (const externalLink of urlArray) {
                console.log(`   - ${externalLink[1]}`)
            }
        }


    }
    console.log("===============END OF REPORT===============")

}

module.exports = {
    printReport
}