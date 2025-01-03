const fetch = require('node-fetch');

async function fetchPartOfSpeech(word) {

    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fe9a4cd257msh0adc7c016ed0140p150b48jsn5acb43131459',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
	    const response = await fetch(url, options);
	    const jsonResponse = await response.json();

        //  Iterates through the definitions object and returns all POS
        const partOfSpeech = jsonResponse.definitions.map(def => def.partOfSpeech)

	    console.log(partOfSpeech);
    } catch (error) {
	    console.error(error);
    }
}

module.exports = {
    fetchPartOfSpeech
}