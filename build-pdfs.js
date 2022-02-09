const puppeteer = require('puppeteer')
const fs = require('fs')

const urls = fs
  .readFileSync('todo.txt')
  .toString()
  .split('\n')

let i = 0

const run = async () => {
  if (typeof urls[i] === 'undefined') {
    return
  }
  console.log(urls[i])
  const path = `./pdfs/${urls[i]}.pdf`
  if (fs.existsSync(path)) {
    i += 1
    run()
    return
  }
  const browser = await puppeteer.launch({
    headless: true,
  })

  const webPage = await browser.newPage()

  await webPage.goto(`http://localhost:9000/analysis-updates/pdf/${urls[i]}`)
  await webPage.waitForSelector('h1')

  await webPage.pdf({
    printBackground: false,
    format: 'Letter',
    path,
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px',
    },
  })

  await browser.close()
  i += 1
  run()
}

run()
