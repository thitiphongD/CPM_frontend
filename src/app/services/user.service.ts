import { ErrorType } from "../interfaces/auth";

export const getData = async (url: string, username: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();

}

export const fetcherGET = (url: string) => fetch(url).then((res) => res.json());

export const getPortfolioService = (url: string, username: string) =>
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username }),
    }).then(res => {
        if (res.status === 404) {
            throw new Error(ErrorType.COIN_NOT_FOUND);
        }
        return res.json();
    });