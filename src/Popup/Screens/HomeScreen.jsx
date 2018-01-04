import React from 'react';
import store from 'Popup/Store/index';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import Numeral from 'numeral';

import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';

import {TickerActions} from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ExtensionPlatform.getExtension().runtime;

class HomeScreen extends React.Component {

    state = {
        selectMode: false
    };

    componentWillMount() {
        currentExtension.sendMessage({event: Events.FETCH_CURRENT_TICKER}, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(TickerActions.fetchTickers(response.tickers));
        });
    }

    onSelectMarket = (tickerKey) => {
        const request = {
            event: Events.SET_CURRENT_TICKER,
            tickerKey: tickerKey
        };

        currentExtension.sendMessage(request, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));
        });

        this.setState({selectMode: false});
    };

    drawTickerList() {
        const {tickers = [], currentTickerKey = null} = this.props;
        const {selectMode = false} = this.state;


        const groupedTickers = _.groupBy(tickers, (ticker) => {
            return ticker.token ? 'token' : 'coin';
        });

        console.log(groupedTickers);

        const drawTicker = (ticker) => {
            const tickerListItemProps = {
                key: ticker.key,
                className: `ticker-list__item ${currentTickerKey === ticker.key ? '-active' : ''}`,
                onClick: () => {
                    this.onSelectMarket(ticker.key);
                }
            };

            return (
                <div {...tickerListItemProps}>
                    <label className="ticker-list__item-name">{ticker.baseCurrency} / {ticker.quoteCurrency}</label>
                    <span className="ticker-list__item-price">
                        {Numeral(ticker.price).format(ticker.format)} {ticker.quoteCurrency}
                    </span>
                </div>
            )
        };

        return (
            <div className={`ticker-list ${selectMode ? '-active' : ''}`}>
                {_.map(_.groupBy(groupedTickers['coin'], 'baseCurrency'), (groupedCoinTickers, baseKey) => {
                    return (
                        <div key={"group-" + baseKey} className="ticker-list-group">
                            <h3 className="ticker-list-title">{baseKey}</h3>
                            <div>{_.map(groupedCoinTickers, drawTicker)}</div>
                        </div>
                    );
                })}

                <div className="ticker-list-group">
                    <h3 className="ticker-list-title">Tokens</h3>
                    <div>
                        {_.map(groupedTickers['token'], drawTicker)}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        const currentMarketLabelProps = {
            className: "header__current-market",
            onClick: () => {
                this.setState({selectMode: true});
            }
        };

        return (
            <div>
                {this.drawTickerList()}

                <header className="header">
                    <a href="https://wex.nz/?ref=coinwizard-wex-ticker"
                       target="_blank"
                       className="header__logo"
                       title="WEX.NZ Exchange"
                    >
                        <img className="header__logo-img" src="/images/wex-logo.png"/>
                    </a>
                    {
                        currentTicker && (
                            <label {...currentMarketLabelProps}>
                                {currentTicker.baseCurrency}/{currentTicker.quoteCurrency}
                            </label>
                        )
                    }
                </header>

                <CurrentTickerView ticker={currentTicker}/>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            tickers: state.ticker.tickers,
            currentTickerKey: state.ticker.currentTickerKey
        };
    }
)(HomeScreen)