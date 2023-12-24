const {test,expect} = require('@playwright/test');

test('verify landing page title',async ({page})=>{

    await page.goto('https://cryptobubbles.net/');
    expect(await page.title()).toBe('Crypto Bubbles | Interactive bubble chart for crypto currencies')
})

test('verify coin search is giving accurate results',async ({page})=>{

    await page.goto('https://cryptobubbles.net/');
    await page.locator('Input[placeholder="Search cryptocurrency"]').fill('pulse');
    const coinList = await page.locator('tbody tr');
    console.log(await coinList.count())
    for (let i=0; i<await coinList.count();i++){
        const coinName =await coinList.nth(i).locator('td div button div.currency-header').textContent();
        await expect(coinName.toLowerCase()).toContain('pulse');
        await console.log(coinName);
        
    }
})

test('verify binance register page navigation',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://cryptobubbles.net/');
    await  page.locator('button').getByText('Register on').click();
    const link =await page.locator('[title="Register on Binance"]')
    const [binanceRegisterPage] = await Promise.all([
    context.waitForEvent('page'),link.click(),
    ])
    await binanceRegisterPage.waitForURL('https://accounts.binance.com/en/register?ref=BRM28YZ5')
    expect(await binanceRegisterPage.title()).toBe('Bitcoin Exchange | Cryptocurrency Exchange | Binance');
})