export const fetcherGET = (url: string) => fetch(url).then((res) => res.json());

export const fetchUser = (url: string, username: string) =>
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username }),
    }).then(res => res.json());