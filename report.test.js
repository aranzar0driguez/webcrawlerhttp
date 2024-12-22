const { sortPages } = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPagesl', () => {   
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1

    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]

    ]
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})

test('sortPages', () => {   
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 6,
        'https://wagslane.dev/path3': 66,
        'https://wagslane.dev/path4': 9,
        'https://wagslane.dev/path5': 10




    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path3', 66],
        ['https://wagslane.dev/path5', 10],
        ['https://wagslane.dev/path4', 9],
        ['https://wagslane.dev/path2', 6],
        ['https://wagslane.dev', 3]
    ]
    //  Runs a test and returns either a pass/fail
    expect(actual).toEqual(expected) 
})