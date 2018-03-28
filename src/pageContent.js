import * as _ from 'lodash';
import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';
import {sendEvent} from 'Popup/Analytics';

const currentExtension = ExtensionPlatform.getExtension().runtime;

const fee = 0.002;

const calculateVolumes = () => {
    const request = {event: Events.GET_TICKERS};

    return new Promise((resolve, reject) => {
        currentExtension.sendMessage(request, (response) => {
            const {tickers} = response;

            const volumes = {};

            _.each(tickers, (ticker) => {

                if (typeof volumes[ticker.baseCurrency] === 'undefined') {
                    volumes[ticker.baseCurrency] = 0;
                }

                if (typeof volumes[ticker.quoteCurrency] === 'undefined') {
                    volumes[ticker.quoteCurrency] = 0;
                }

                volumes[ticker.baseCurrency] += ticker.volume_base;
                volumes[ticker.quoteCurrency] += ticker.volume_quote;
            });


            resolve(volumes)
        })
    })
};

sendEvent('frame', 'open', window.location.host, null, (err) => {
    if (err) {
        console.error('Something happend!')
        console.error(err);
        return;
    }

    console.log('success!');
});