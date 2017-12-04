import * as _ from 'lodash';

import ExtensionPlatform from 'Core/Extension';

import {Events} from 'Core/EventProtocol/Events';
import WexApiClient from 'Core/Wex/ApiClient';
import WexTickerMap from 'Core/Wex/TickerMap';
import Numeral from 'numeral';


const TickerStorage = {};

_.each(WexTickerMap, (ticker) => {
    TickerStorage[ticker.key] = Object.assign({}, {
        token: false,
        price: 0,
        volume_base: 0,
        volume_quote: 0,
        OHLC: {
            high: 0,
            low: 0,
            open: 0,
            close: 0,
        },
        depth: {
            bid: 0,
            ask: 0
        } 
    }, ticker)
});

let currentTickerKey = 'btc_usd';

const updateTicker = (wexTickerKey, wexTickerData) => {
    const currentTicker = TickerStorage[wexTickerKey];

    if (!currentTicker) {
        return;
    }

    currentTicker.price = wexTickerData.last;
    currentTicker.volume_base = wexTickerData.vol_cur;
    currentTicker.volume_quote = wexTickerData.vol;

    currentTicker.OHLC = {
        high: wexTickerData.high,
        low: wexTickerData.low
    };

    currentTicker.depth = {
        bid: wexTickerData.sell,
        ask: wexTickerData.buy
    };

    TickerStorage[wexTickerKey] = currentTicker;

    ExtensionPlatform.getExtension().runtime.sendMessage({
        event: Events.UPDATE_TICKER,
        ticker: currentTicker
    });
};

/**
 * @param price
 * @return {string}
 */
const formatTickerPrice = (price) => {
    let priceNumeral = Numeral(price);
    
    if (price < 10) {
        return '' + priceNumeral.format('0.[00]');
    } else if (price < 100) {
        return '' + priceNumeral.format('0,0.[0]');
    } else if (price < 1000) {
        return '' + priceNumeral.format('0,0.[0]');
    } else if (price < 10000) {
        return '' + priceNumeral.format('00');
    } else if (price < 100000) {
        return '' + priceNumeral.divide(1000).format('0.[0]');
    } else if (price < 1000000) {
        return '' + priceNumeral.divide(1000).format('00');
    } else if (price < 10000000) {
        return '' + priceNumeral.divide(1000000).format('0.[00]');
    }

    return '' + price;
};

const updateBudgetTexts = () => {
    const currentTicker = TickerStorage[currentTickerKey];
    if (currentTicker) {
        ExtensionPlatform.getExtension().browserAction.setBadgeText({
            text: formatTickerPrice(currentTicker.price)
        });

        ExtensionPlatform.getExtension().browserAction.setTitle({
            title: 'Wex Ticker: ' +
            `${currentTicker.baseCurrency} / ${currentTicker.quoteCurrency}` +
            ` - ${Numeral(currentTicker.price).format(currentTicker.format)}`
        });
    }
};

const tickerUpdater = () => {
    console.log(_.keys(TickerStorage));
    WexApiClient.extractTickers(_.keys(TickerStorage)).then((wexTickers) => {
        _.each(wexTickers, (wexTicker, key) => updateTicker(key, wexTicker));
        updateBudgetTexts();
    });
};

/**
 * @param request
 * @param sender
 * @param sendResponse
 */
const extensionEventListener = (request, sender, sendResponse) => {
    const {event = null} = request;

    if (!event) {
        return;
    }

    switch (event) {
        case Events.FETCH_CURRENT_TICKER: {
            sendResponse({
                currentTickerKey: currentTickerKey
            });
            break;
        }

        case Events.SET_CURRENT_TICKER: {
            const {tickerKey} = request;
            if (!tickerKey) {
                break;
            }

            currentTickerKey = tickerKey;
            sendResponse({
                currentTicker: currentTickerKey
            });
            updateBudgetTexts();
            break;
        }

        case Events.GET_TICKERS: {
            sendResponse({
                tickers: TickerStorage
            });
            break;
        }
    }
};

const initBackground = () => {
    ExtensionPlatform.getExtension().runtime.onMessage.addListener(extensionEventListener);

    tickerUpdater();
    setInterval(tickerUpdater, 30000);

    ExtensionPlatform.getExtension().browserAction.setBadgeBackgroundColor({
        color: '#6f7a9a'
    });
};

document.addEventListener('DOMContentLoaded', initBackground);

ExtensionPlatform.getExtension().contextMenus.removeAll();
ExtensionPlatform.getExtension().contextMenus.create({
    title: "by CoinWizard Team",
    contexts: ["browser_action"],
    onclick: () => {
        ExtensionPlatform.getExtension().tabs.create({
            url: "https://coinwizard.me?ref=wex-extension"
        });
    }
});

ExtensionPlatform.getExtension().contextMenus.create({
    title: "Source code",
    contexts: ["browser_action"],
    onclick: () => {
        ExtensionPlatform.getExtension().tabs.create({
            url: "https://github.com/CoinWizard/wex-ticker-extension"
        });
    }
});