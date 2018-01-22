const TickerMap = {

    /**
     * Bitcoin
     */
    btc_usd: {
        key: 'btc_usd',
        baseCurrency: 'BTC',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    btc_rur: {
        key: 'btc_rur',
        baseCurrency: 'BTC',
        quoteCurrency: 'RUR',
        format: '0,0'
    },
    btc_eur: {
        key: 'btc_eur',
        baseCurrency: 'BTC',
        quoteCurrency: 'EUR',
        format: '0,0.[00]'
    },

    /**
     * DASH
     */
    dsh_btc: {
        key: 'dsh_btc',
        baseCurrency: 'DASH',
        quoteCurrency: 'BTC',
        format: '0,0.[00000]'
    },
    dsh_usd: {
        key: 'dsh_usd',
        baseCurrency: 'DASH',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    dsh_rur: {
        key: 'dsh_rur',
        baseCurrency: 'DASH',
        quoteCurrency: 'RUR',
        format: '0,0'
    },
    dsh_eur: {
        key: 'dsh_eur',
        baseCurrency: 'DASH',
        quoteCurrency: 'EUR',
        format: '0,0.[00]'
    },
    dsh_ltc: {
        key: 'dsh_ltc',
        baseCurrency: 'DASH',
        quoteCurrency: 'LTC',
        format: '0,0.[0000]'
    },
    dsh_eth: {
        key: 'dsh_eth',
        baseCurrency: 'DASH',
        quoteCurrency: 'ETH',
        format: '0,0.[0000]'
    },
    dsh_zec: {
        key: 'dsh_zec',
        baseCurrency: 'DASH',
        quoteCurrency: 'ZEC',
        format: '0,0.[0000]'
    },

    /**
     * Ethereum
     */
    eth_btc: {
        key: 'eth_btc',
        baseCurrency: 'ETH',
        quoteCurrency: 'BTC',
        format: '0,0.[00000]'
    },
    eth_ltc: {
        key: 'eth_ltc',
        baseCurrency: 'ETH',
        quoteCurrency: 'LTC',
        format: '0,0.[0000]'
    },
    eth_usd: {
        key: 'eth_usd',
        baseCurrency: 'ETH',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    eth_eur: {
        key: 'eth_eur',
        baseCurrency: 'ETH',
        quoteCurrency: 'EUR',
        format: '0,0.[00]'
    },
    eth_rur: {
        key: 'eth_rur',
        baseCurrency: 'ETH',
        quoteCurrency: 'RUR',
        format: '0,0.[00]'
    },
    eth_zec: {
        key: 'eth_zec',
        baseCurrency: 'ETH',
        quoteCurrency: 'ZEC',
        format: '0,0.[0000]'
    },

    /**
     * NameCoin
     */
    nmc_btc: {
        key: 'nmc_btc',
        baseCurrency: 'NMC',
        quoteCurrency: 'BTC',
        format: '0,0.[00000]'
    },
    nmc_usd: {
        key: 'nmc_usd',
        baseCurrency: 'NMC',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },

    /**
     * NovaCoin
     */
    nvc_btc: {
        key: 'nvc_btc',
        baseCurrency: 'NVC',
        quoteCurrency: 'BTC',
        format: '0,0.[00000]'
    },
    nvc_usd: {
        key: 'nvc_usd',
        baseCurrency: 'NVC',
        quoteCurrency: 'USD',
        format: '0,0.[0000]'
    },


    usd_rur: {
        key: 'usd_rur',
        baseCurrency: 'USD',
        quoteCurrency: 'RUR',
        format: '0,0.[00]'
    },
    eur_usd: {
        key: 'eur_usd',
        baseCurrency: 'EUR',
        quoteCurrency: 'USD',
        format: '0,0.[0000]'
    },
    eur_rur: {
        key: 'eur_rur',
        baseCurrency: 'EUR',
        quoteCurrency: 'RUR',
        format: '0,0.[00]'
    },

    /**
     * PPC
     */
    ppc_btc: {
        key: 'ppc_btc',
        baseCurrency: 'PPC',
        quoteCurrency: 'BTC',
        format: '0,0.[000000]'
    },
    ppc_usd: {
        key: 'ppc_usd',
        baseCurrency: 'PPC',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },

    /**
     * Litecoin
     */
    ltc_btc: {
        key: 'ltc_btc',
        baseCurrency: 'LTC',
        quoteCurrency: 'BTC',
        format: '0,0.[00000]'
    },
    ltc_usd: {
        key: 'ltc_usd',
        baseCurrency: 'LTC',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    ltc_rur: {
        key: 'ltc_rur',
        baseCurrency: 'LTC',
        quoteCurrency: 'RUR',
        format: '0,0.[00]'
    },
    ltc_eur: {
        key: 'ltc_eur',
        baseCurrency: 'LTC',
        quoteCurrency: 'EUR',
        format: '0,0.[00]'
    },

    /**
     * Bitcoin Cash
     */
    bch_btc: {
        key: 'bch_btc',
        baseCurrency: 'BCH',
        quoteCurrency: 'BTC',
        format: '0,0.[0000]'
    },
    bch_dsh: {
        key: 'bch_dsh',
        baseCurrency: 'BCH',
        quoteCurrency: 'DASH',
        format: '0,0.[0000]'
    },
    bch_eth: {
        key: 'bch_eth',
        baseCurrency: 'BCH',
        quoteCurrency: 'ETH',
        format: '0,0.[0000]'
    },
    bch_ltc: {
        key: 'bch_ltc',
        baseCurrency: 'BCH',
        quoteCurrency: 'LTC',
        format: '0,0.[0000]'
    },
    bch_zec: {
        key: 'bch_zec',
        baseCurrency: 'BCH',
        quoteCurrency: 'ZEC',
        format: '0,0.[0000]'
    },
    bch_usd: {
        key: 'bch_usd',
        baseCurrency: 'BCH',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    bch_eur: {
        key: 'bch_eur',
        baseCurrency: 'BCH',
        quoteCurrency: 'EUR',
        format: '0,0.[00]'
    },
    bch_rur: {
        key: 'bch_rur',
        baseCurrency: 'BCH',
        quoteCurrency: 'RUR',
        format: '0,0.[00]'
    },

    /**
     * ZEC
     */
    zec_btc: {
        key: 'zec_btc',
        baseCurrency: 'ZEC',
        quoteCurrency: 'BTC',
        format: '0,0.[0000]'
    },
    zec_usd: {
        key: 'zec_usd',
        baseCurrency: 'ZEC',
        quoteCurrency: 'USD',
        format: '0,0.[00]'
    },
    zec_ltc: {
        key: 'zec_ltc',
        baseCurrency: 'ZEC',
        quoteCurrency: 'LTC',
        format: '0,0.[0000]'
    },

    /**
     * WEX Tokens
     */
    usdet_usd: {
        key: 'usdet_usd',
        baseCurrency: 'USDET',
        quoteCurrency: 'USD',
        format: '0,0.[000]',
        token: true
    },
    ruret_rur: {
        key: 'ruret_rur',
        baseCurrency: 'RURET',
        quoteCurrency: 'RUR',
        format: '0,0.[000]',
        token: true
    },
    euret_eur: {
        key: 'euret_eur',
        baseCurrency: 'EURET',
        quoteCurrency: 'EUR',
        format: '0,0.[000]',
        token: true
    },
    btcet_btc: {
        key: 'btcet_btc',
        baseCurrency: 'BTCET',
        quoteCurrency: 'BTC',
        format: '0,0.[000]',
        token: true
    },
    ltcet_ltc: {
        key: 'ltcet_ltc',
        baseCurrency: 'LTCET',
        quoteCurrency: 'LTC',
        format: '0,0.[000]',
        token: true
    },
    ethet_eth: {
        key: 'ethet_eth',
        baseCurrency: 'ETHET',
        quoteCurrency: 'ETH',
        format: '0,0.[000]',
        token: true
    },
    nmcet_nmc: {
        key: 'nmcet_nmc',
        baseCurrency: 'NMCET',
        quoteCurrency: 'NMC',
        format: '0,0.[000]',
        token: true
    },
    nvcet_nvc: {
        key: 'nvcet_nvc',
        baseCurrency: 'NVCET',
        quoteCurrency: 'NVC',
        format: '0,0.[000]',
        token: true
    },
    ppcet_ppc: {
        key: 'ppcet_ppc',
        baseCurrency: 'PPCET',
        quoteCurrency: 'PPC',
        format: '0,0.[000]',
        token: true
    },
    dshet_dsh: {
        key: 'dshet_dsh',
        baseCurrency: 'DSHET',
        quoteCurrency: 'DASH',
        format: '0,0.[000]',
        token: true
    },
    bchet_bch: {
        key: 'bchet_bch',
        baseCurrency: 'BCHET',
        quoteCurrency: 'BCH',
        format: '0,0.[000]',
        token: true
    }
};

export default TickerMap;