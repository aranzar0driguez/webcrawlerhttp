const {normalizeURL, getURLsFromHTML} = require('./crawl.js')

//  Test defines test cases 
//  Expect = asserts expectations about test results
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {   
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev.Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

//  relative = URL that does not include the protocal/domain (only the path)
test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">
                Boot.dev.Blog Path One
            </a>
             <a href="https://blog.boot.dev/path2/">
                Boot.dev.Blog Path two 
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev.Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})
