const { fetchPartOfSpeech } = require("./wordfreq");

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

        return a[1] - b[1] //   Returns in ascending order smallest -> largest 
    })

    var numOfWords = 0

    if (wordArray.length < 5) {
        return wordArray
    }

    for (let i = wordArray.length - 1; i >= 0; i--) {

        const [word, freq] = wordArray[i]
        //const pos = fetchPartOfSpeech(word)

        if (word.length < 3) {
            wordArray.splice(i, 1)
        } else {
            numOfWords++
            if (numOfWords > 4) break; //   Exits loop once it has found at least 5 
        }
    }
    
    return wordArray.slice(-5).reverse()
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

