import Axios, {AxiosInstance, AxiosPromise, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import {WexTickerInterface} from "Core/Wex/WexTickerInterface";

export class ApiClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = Axios.create({
            baseURL: 'https://wex.nz/api/3'
        });
    }

    extractTickers(tickerKeys: Array<string>): AxiosPromise {

        const onSuccess = (response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        };

        const onError = (error: AxiosError) => {

            const {response = null} = error;

            console.error(error);
            console.error(response);
        };

        const requestParams: AxiosRequestConfig = {
            params: {
                ignore_invalid: '1'
            }
        };

        return this.axiosClient
            .get(`/ticker/${tickerKeys.join('-')}`, requestParams)
            .then(onSuccess, onError);
    }
}


const wexApiClientInstance: ApiClient = new ApiClient();
export default wexApiClientInstance;