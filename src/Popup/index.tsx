import React from 'react';
import {Provider} from 'react-redux';
import store from 'Popup/Store/index';
import {sendTickerScreenView} from 'Popup/Analytics';

import HomeScreen from 'Popup/Screens/HomeScreen';

import 'Popup/EventHandler';

class PopupApplication extends React.Component<any, any> {
    componentDidMount() {
        sendTickerScreenView();
    }

    render() {
        return (
            <div className="application">
                <Provider store={store}>
                    <HomeScreen/>
                </Provider>
            </div>
        );
    }
}

export default PopupApplication;