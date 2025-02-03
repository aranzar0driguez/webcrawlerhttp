import axios from 'axios'


export const getData = async (requestedURLs, includeElement) => {


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3300/crawl',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        urls: requestedURLs,
        storeResults: false,
        includeElement: includeElement 
        //  We are instead passing the element directly so that the serialization can be consistent
      }
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