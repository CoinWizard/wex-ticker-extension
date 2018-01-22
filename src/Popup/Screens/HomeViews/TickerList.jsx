import React from 'react';
import store from 'Popup/Store/index';
import classNames from 'classnames';
import {map, groupBy} from 'lodash';
import Numeral from 'numeral';

import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';

import {TickerActions} from 'Popup/Actions/TickerActions';

const currentExtension = ExtensionPlatform.getExtension().runtime;

export default class TickerList extends React.Component {

    onSelectMarket = (tickerKey) => {
        return () => {
            const request = {
                event: Events.SET_CURRENT_TICKER,
                tickerKey: tickerKey
            };

            currentExtension.sendMessage(request, (response) => {
                store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));
            });

            const {onSelect} = this.props;

            onSelect && onSelect();
        };
    };

    drawCoinTicker = (ticker) => {
        const {currentTickerKey = null} = this.props;

        const tickerListItemProps = {
            key: ticker.key,
            className: classNames(
                'ticker-list__coin',
                {'-active': currentTickerKey === ticker.key}
            ),
            onClick: this.onSelectMarket(ticker.key)
        };

        return (
            <div {...tickerListItemProps}>
                <label className="ticker-list__coin-name">{ticker.quoteCurrency}</label>
                <span className="ticker-list__coin-price">
                        {Numeral(ticker.price).format(ticker.format)}
                    </span>
            </div>
        )
    };

    drawTokenTicker = (ticker) => {
        const {currentTickerKey = null} = this.props;

        const tickerListItemProps = {
            key: ticker.key,
            className: `ticker-list__token ${currentTickerKey === ticker.key ? '-active' : ''}`,
            onClick: this.onSelectMarket(ticker.key)
        };

        return (
            <div {...tickerListItemProps}>
                <label className="ticker-list__token-name">{ticker.baseCurrency} / {ticker.quoteCurrency}</label>
                <span className="ticker-list__token-price">
                        {Numeral(ticker.price).format(ticker.format)} {ticker.quoteCurrency}
                    </span>
            </div>
        )
    };


    render() {
        const {tickers = [], selectMode = false} = this.props;

        const groupedTickers = groupBy(tickers, (ticker) => {
            return ticker.token ? 'token' : 'coin';
        });

        const coinsByBaseCurrencies = groupBy(groupedTickers['coin'], 'baseCurrency');

        return (
            <div className={`ticker-list ${selectMode ? '-active' : ''}`}>
                {map(coinsByBaseCurrencies, (groupedCoinTickers, baseKey) => {
                    return (
                        <div key={"group-" + baseKey} className="ticker-list-group -coin">
                            <h3 className="ticker-list-title">{baseKey}</h3>
                            <div className="ticker-list-group-items">
                                {map(groupedCoinTickers, this.drawCoinTicker)}
                            </div>
                        </div>
                    );
                })}

                <div className="ticker-list-group -token">
                    <h3 className="ticker-list-title">Tokens</h3>
                    <div className="ticker-list-group-items">
                        {map(groupedTickers['token'], this.drawTokenTicker)}
                    </div>
                </div>
            </div>
        )
    }
}
