
function printReport(pages) {
    console.log("==================REPORT==================")
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const { count, wordFreq } = sortedPage[1]; //   Accesses the second index of the array, which contains the count and wordFrequency

        console.log("\n")
        console.log(`Found ${count} links to page ${url}`)

        const sortedWords = sortWordFreq(wordFreq)

        if (sortedWords.length < 3) {
            console.log("No <p> tag found on this url")
        } else {
            console.log("The top 5 words on this site are:")

            for (const [word, freq] of sortedWords) {
                console.log(`"${word}" - ${freq} times`)
            }
        }
    }
    console.log("===============END OF REPORT===============")

}

function sortWordFreq(words) {
    //  Concerts the wordFreq into an array before iterating through it 
    const wordArray = Object.entries(words)

    //  Sorts based on frequency 
    wordArray.sort((a, b) => { //a, b represents two elements in the array (word, count)

        return b[1] - a[1] //   This accesses the second element of each array 
    })

    //  If the first element is of X part of of speech, it removes it and goes to the next ... it will keeping removing until the top 5 are a specific POS
    

    return wordArray.slice(0, 5)
}
function sortPages(pages) {
    //  Converts it into an array 
    pagesArray = Object.entries(pages)
    pagesArray.sort((a,b) => {
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

