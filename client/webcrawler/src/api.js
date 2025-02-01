import axios from 'axios'


export const getData = async (requestedURLs) => {

    let data = JSON.stringify({
      "urls": requestedURLs,
      "storeResults": false
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3300/crawl',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try {
        //  This returns an actual promise that can be accessed outside the scope of the function
        const responseData = await axios.request(config);
        return responseData.data.urlArray
    } catch (error) {
        console.error("Erorr fetching data:", error)
        return null
    }
}