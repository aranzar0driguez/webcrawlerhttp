const { crawlPage } = require(`./crawl.js`)
const { printReport } = require(`./report.js`)

//  Export crawLogic 
async function crawlWebsite(baseURL) {
    console.log(`starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    return pages
}

//  CLI functionality 
async function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("too many command line args")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)

}

//  Checks to see if the line is being run directly or imported as a module
//  By another file 

if (require.main === module) {
    main()
}

module.exports = { crawlWebsite }