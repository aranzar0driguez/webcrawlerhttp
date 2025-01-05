
function printReport(pages) {
    console.log("==================REPORT==================")
    pagesArray = Object.entries(pages)

    for (const sortedPage of pagesArray) {
        const url = sortedPage[0]

        console.log(`Found ${url}`)
    }
    console.log("===============END OF REPORT===============")

}

module.exports = {
    printReport
}