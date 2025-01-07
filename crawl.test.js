const {normalizeURL, getURLsFromHTML, convertIntoMarkDown} = require('./crawl.js')

//  Test defines test cases 
//  Expect = asserts expectations about test results
const {test, expect} = require('@jest/globals')

// test('normalizeURL strip protocol', () => {   
//     const input = 'https://blog.boot.dev/path/'
//     const actual = normalizeURL(input)
//     const expected = 'blog.boot.dev/path'
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// test('normalizeURL capitals', () => {
//     const input = 'https://BLOG.boot.dev/path'
//     const actual = normalizeURL(input)
//     const expected = 'blog.boot.dev/path'
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// test('normalizeURL strip http', () => {
//     const input = 'http://blog.boot.dev/path'
//     const actual = normalizeURL(input)
//     const expected = 'blog.boot.dev/path'
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// test('getURLsFromHTML absolute', () => {
//     const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="https://blog.boot.dev/path/">
//                 Boot.dev.Blog
//             </a>
//         </body>
//     </html>
//     `
//     const inputBaseURL = "https://blog.boot.dev/path/"
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
//     const expected = ["https://blog.boot.dev/path/"]
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// //  relative = URL that does not include the protocal/domain (only the path)
// test('getURLsFromHTML relative', () => {
//     const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="/path1/">
//                 Boot.dev.Blog Path One
//             </a>
//              <a href="https://blog.boot.dev/path2/">
//                 Boot.dev.Blog Path two 
//             </a>
//         </body>
//     </html>
//     `
//     const inputBaseURL = "https://blog.boot.dev"
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
//     const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// test('getURLsFromHTML both', () => {
//     const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="/path/">
//                 Boot.dev.Blog
//             </a>
//         </body>
//     </html>
//     `
//     const inputBaseURL = "https://blog.boot.dev"
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
//     const expected = ["https://blog.boot.dev/path/"]
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

// test('getURLsFromHTML invalid', () => {
//     const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="invalid">
//                 Invalid
//             </a>
//         </body>
//     </html>
//     `
//     const inputBaseURL = "https://blog.boot.dev"
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
//     const expected = []
//     //  Runs a test and returns either a pass/fail
//     expect(actual).toEqual(expected) 
// })

test('convertIntoMarkDown match', () => {
    const inputHTMLBody = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Aranza Rodriguez</title>

    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/portraitstyle.css">
    <link rel="stylesheet" href="styles/homesecondsection.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BVB22Q0THH"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BVB22Q0THH');
    </script>

</head>
<body>
    <shared-navbar></shared-navbar>
    
    <script src="assetsjs/elements.js"></script>
    
    <main>
        <section class="home-first-section floating-item">
        <div class="home-img-container">
            <div class="circle-1"></div>
            <div class="home-img">
                <a href="../../index.html">
                    <img src="/images/main-page-portrait.jpg" alt="portrait.img">
                </a>
            </div>
            <div class="circle-2"></div>
        </div>
        <div class="home-content">
            <h1>¡Hola!</h1>
            <p>I'm Aranza Rodriguez. I like to learn and bring ideas to life, such as <u><a href="../html/projects.html">Frenz</a></u>,
                <u><a href="https://pickpackgo.app" target="_blank">PickPackGo</a></u>, and <u><a href="https://apps.apple.com/us/app/pirx-share-events/id6477340285" target="_blank">Pirx</a></u>. Check out some of my <u><a href="../html/projects.html#marketing-section">
                marketing</a></u> experience too!<br><br> I <u><a href="../html/fun.html#learning-chinese-journey">taught 
                myself</a></u> Mandarin Chinese, was once part of a Chinese Lion Dance team, and graduated from Yale University in 2024.
            </p>
            <div class="social-icons">
                <a href="https://www.instagram.com/alpaca.qween" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/aranza-rodriguez/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/aranzar0driguez" target="_blank"><i class="fa-brands fa-github"></i></a>
                <!--<a href="https://www.youtube.com/@lunazigma3535" target="_blank"><i class="fa-brands fa-youtube"></i></a>-->

            </div>
        </div>
            
        </section>

        <section class="home-second-section">
            <h2>Recent Coding Projects</h2>
            <div class="gallery">
                <div class="home-gallery-item">
                    <img id="frenz" src="/images/heart.png" alt="portrait.img">
                    <figcaption>Frenz</figcaption>
                    <p>Frenz is a Yalies-only dating/friend making app that utilizes <span>Swift</span> and <span>Typescript</span> and Firebase as the backend.</p>
                </div>
                <div class="home-gallery-item">
                    <img id="pickpackgo" src="/images/pickpackgologo.png" alt="portrait.img">
                    <figcaption>PickPackGo</figcaption>
                    <p>PickPackGo is an app that lets users send their packages to a local business at affordable rates.</p>

                </div>
                <div class="home-gallery-item">
                    <img id="pirx" src="/images/pirxlogo.png" alt="portrait.img">
                    <figcaption>Pirx</figcaption>
                    <p>Pirx allows users to post/see events that are currently happening around New Haven.</p>

                </div>

            </div>
        </section>

        <section class>

        </section>
           
        <section class="home-third-section">
            <footer>
                © 2024 Made by Aranza Rodriguez ♡
            </footer>
        </section>
    </main>
</body>
</html>
    `
    const actual = convertIntoMarkDown(inputHTMLBody)
    //const expect = []

    console.log(actual)

    // expect(actual).toEqual(expect)
})
