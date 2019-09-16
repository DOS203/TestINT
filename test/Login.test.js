// const puppeteer = require('puppeteer');
// const credentials = require('../test/credentialsL');

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: [
//             '--window-size=1920,1080'
//         ]
//     })
//   const page = await browser.newPage();
//   page.setViewport({height: 1080, width: 1920});
//   await page.goto('https://release122.herokuapp.com/users/login');
  
//   await page.waitFor(() => document.querySelectorAll('input').length)
  
  



//   await page.type('[name=email]', credentials.email)
//   await page.type('[name=password]', credentials.password)

//   await page.evaluate(() => {
//       document.querySelector('.btn').click()
//   });


//   await page.waitFor(() => document.querySelector('[placeholder=Products]'));
//   await page.evaluate(() => {
//       document.querySelectorAll(' #navbarDropdownMenuLink');
//   });


//   await page.waitFor(5000);
//     await page.evaluate(() => {
//         document.querySelector('[href="/users/logout"]').click()
// });


//   await page.waitFor(4000);

//   await browser.close();
// })();