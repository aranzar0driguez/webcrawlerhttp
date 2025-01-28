const queries = {

    insertWebpageInfo: `
        INSERT INTO webpage_info(
	        request_id, root_url, base_url, external_urls, title_tags, header_tags, meta_tags)
	        VALUES ($1, $2::text, $3::text, $4::text[], $5::text[], $6::text[], $7::text[]);`,

    insertRequest: `
        INSERT INTO requests(
            request_id, root_url)
            VALUES ($1, $2::text[])`,

    //  Return JSON object (of the URL crawled info data) based on the given request_id 
    returnWebpageJSONObject: `
        SELECT json_agg(json_build_object(
        'root_url', root,
        'sub_urls', (
            SELECT json_agg(row_to_json(wi))
            FROM (
       			SELECT 
                    base_url, 
                    external_urls, 
                    title_tags, 
                    header_tags, 
                    meta_tags
                FROM webpage_info
                WHERE (webpage_info.request_id = r.request_id AND webpage_info.root_url = root)
                    ) wi
                )
            )
        )
        FROM requests r,
        LATERAL unnest(r.root_url) AS root
        WHERE r.request_id = $1;`,

    deleteWebpageInfo: `
        DELETE FROM webpage_info WHERE request_id=$1;`,

    deleteRequests: `
        DELETE FROM requests WHERE request_id=$1;`
}

//  Pushes data into SQL
async function insertURLData(client, urlInfo, rootURL, reqID) {
    
    const webpageInfoValues = [reqID, rootURL, urlInfo['base_url'], urlInfo['externalURL'], urlInfo['title_tags'], urlInfo['header_tags'], urlInfo['meta_tags']]

    try {
        // If the query does not fully execute, it will prevent the whole query from being sent 
        await client.query('BEGIN')
        await client.query(queries.insertWebpageInfo, webpageInfoValues)
        await client.query('COMMIT')
        return true

    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    }
}

async function deleteData(client, requestID) {
        await client.query('BEGIN')
        await client.query(queries.deleteWebpageInfo, [requestID]),
        await client.query(queries.deleteRequests, [requestID]),
        await client.query('COMMIT')
}

module.exports = { insertURLData, queries, deleteData }