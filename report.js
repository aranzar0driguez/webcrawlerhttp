
function printReport(pages) {
    console.log("==================REPORT==================")
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page ${url}`)
    }
    console.log("===============END OF REPORT===============")

}

function sortPages(pages) {
    //  Converts it into an array 
    pagesArray = Object.entries(pages)
    pagesArray.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]

        //  This ensures that the array is sorted in a descending order
        return b[1] - a[1]
    })
    console.log(pagesArray)
    return pagesArray
}

module.exports = {
    sortPages,
    printReport
}