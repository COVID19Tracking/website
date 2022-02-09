const puppeteer = require('puppeteer')
const fs = require('fs')

const urls = fs
  .readFileSync('todo.txt')
  .toString()
  .split('\n')

let i = 0

const run = async () => {
  console.log(urls[i])
  const browser = await puppeteer.launch({
    headless: true,
  })

  const webPage = await browser.newPage()

  await webPage.goto(`http://localhost:8000/analysis-updates/pdf/${urls[i]}`)
  await webPage.waitForSelector('h1')

  await webPage.pdf({
    printBackground: false,
    format: 'Letter',
    path: `./pdfs/${urls[i]}.pdf`,
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px',
    },
  })

  await browser.close()
}

run()
