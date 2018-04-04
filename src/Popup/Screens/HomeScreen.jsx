import React from 'react';
import store from 'Popup/Store/index';
import {connect} from 'react-redux';
import {} from 'lodash';

import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';

import {TickerActions} from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ExtensionPlatform.getExtension().runtime;

import TickerList from './HomeViews/TickerList';

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
                <TickerList
                    currentTickerKey={currentTickerKey}
                    tickers={tickers}
                    selectMode={this.state.selectMode}
                    onSelect={() => this.setState({selectMode: false})}
                />

                <header className="header">
                    <a href="https://wex.nz/?src=WEX_Ticker_Extension"
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