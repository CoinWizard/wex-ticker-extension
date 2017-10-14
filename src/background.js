import * as _ from 'lodash';

import ExtensionPlatform from 'Core/Extension';

import {Events} from 'Core/EventProtocol/Events';
import WexApiClient from 'Core/Wex/ApiClient';
import WexTickerMap from 'Core/Wex/TickerMap';


const TickerStorage = {};

_.each(WexTickerMap, (ticker) => {
    TickerStorage[ticker.key] = {
        ...ticker,
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
    };
});

let currentTickerKey = 'btc_usd';

const updateTicker = (wexTickerData) => {
    const currentTicker = TickerStorage[key];

    if (!currentTicker) {
        return;
    }

    currentTicker.price = wexTickerData.last;
    currentTicker.volume_base = wexTickerData.vol;
    currentTicker.volume_quote = wexTickerData.price;

    currentTicker.OHLC = {
        high: wexTickerData.high,
        low: wexTickerData.low,
        open: 0,
        close: 0
    };

    currentTicker.depth = {
        bid: wexTickerData.sell,
        ask: wexTickerData.buy
    };

    TickerStorage[key] = currentTicker;

    ExtensionPlatform.getExtension().extension.sendMessage({
        event: Events.UPDATE_TICKER,
        ticker: currentTicker
    });
};

const tickerUpdater = () => {
    WexApiClient.extractTickers(_.keys(TickerStorage)).then((wexTickers) => {
        _.each(tickers, (wexTicker, key) => updateTicker(wexTicker));
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
    ExtensionPlatform.getExtension().extension.onMessage.addListener(extensionEventListener);

    tickerUpdater();
    setInterval(tickerUpdater, 30000);
};

document.addEventListener('DOMContentLoaded', initBackground);