const {test,expect} = require('@playwright/test');

test('test landing page title',async ({page})=>{

    await page.goto('https://cryptobubbles.net/');
    expect(await page.title()).toBe('Crypto Bubbles | Interactive bubble chart for crypto currencies')
})

test.only('test coin search is giving accurate results',async ({page})=>{

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