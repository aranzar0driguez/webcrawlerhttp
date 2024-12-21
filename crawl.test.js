const {normalizeURL} = require('./crawl.js')

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