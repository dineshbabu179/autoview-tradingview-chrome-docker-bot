// This file just automates logging into TradingView.com - only a nice to have but can be extended to do anything on any website

let tvUsername = ''; // enter your TradingView.com user name here
let tvPassword = ''; // enter your TradingView.com password here

import { Chromeless } from 'chromeless';

// Make this runnable from package.json through NPM scripts using `make-runnable`
module.exports = {

    tradingViewLogin: async function () {
        const chromeless = new Chromeless({
            launchChrome: true,
            waitTimeout: 20000
        });

        const tradingView = await chromeless
            .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3430.0 Safari/537.36')
            // .setViewport({width: 2485, height: 1380, scale: 1})
            .goto('https://www.tradingview.com/')
            .wait('.tv-header')
            .wait(4000)
            .evaluate(() => {
                // No point in logging out each time, if its logged in then nothing will happen, if logged out then script will login
                // if (TradingView.isPro()) {
                //     TradingView.signOut();
                //     return false;
                // }
            })
            .wait(4000)
            .wait('a.tv-header__link--signin')
            .click('a.tv-header__link--signin')
            .wait(1000)
            .type(tvUsername, 'input[name="username"]')
            .type(tvPassword, 'input[name="password"]')
            .wait(1000)
            .click('button[type="submit"]')
            .wait(6000)
            .goto('https://www.tradingview.com/chart/gx4ipb8N')
            .wait('.chart-markup-table', 30000)
            .wait(7000)
            .screenshot()
            .catch((err) => {
                console.error(err);
            });
    }, 

    autoViewDebugging: async function () {
        const chromeless = new Chromeless({
            launchChrome: true,
            waitTimeout: 20000
        });

        const autoView = await chromeless
            .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3430.0 Safari/537.36')
            // .setViewport({width: 2485, height: 1380, scale: 1})
            .goto('http://localhost:9222/')
            .wait(1000)
            .click('a:nth-of-type(3)')
            .evaluate(() => {     }) // this has to be here or the site doesn't load correctly, only shows about:blank
            .catch((err) => {
                console.error(err);
            });

    }, 

}

require('make-runnable'); // must be at the END of the file

// Run directly from this script
// login().catch(console.error.bind(console));

// Run directly from this script
// module.exports.tradingViewLogin().catch(console.error.bind(console));

// Run directly from this script
// signout().catch(console.error.bind(console));
