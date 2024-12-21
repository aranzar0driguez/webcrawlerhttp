
/*
    Note to self: 

    The first argument to any program is always the name of the program (node.js)
    The second argument is the entry point file
    Third argument is hte actual argument inputted
    
*/

const { crawlPage } = require(`./crawl.js`)

function main() {
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
    crawlPage(baseURL)

}

main()