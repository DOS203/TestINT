// const puppeteer = require('puppeteer');
// const credentials = require('../test/credentialsR');

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: [
//             '--window-size=1920,1080'
//         ]
//     })
//   const page = await browser.newPage();
//   page.setViewport({height: 1080, width: 1920});
//   await page.goto('https://release122.herokuapp.com/users/register');
//   await page.waitFor(4000);
  
//   await page.waitFor(() => document.querySelectorAll('input').length)

//   await page.type('[name=firstname]', credentials.firstname)
//   await page.type('[name=lastname]', credentials.lastname)
//   await page.type('[name=email]', credentials.email2)
//   await page.type('[name=password]', credentials.password)
//   await page.type('[name=password2]', credentials.password2)

//   await page.evaluate(() => {
//       document.querySelector('.btn').click()
//   });

//   await page.waitFor(4000);

//   await browser.close();
// })();