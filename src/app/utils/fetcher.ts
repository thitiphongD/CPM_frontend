export const fetcherGET = (url: string) => fetch(url).then((res) => res.json());


export const fetcherPOST = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch portfolio");
    }
    return response.json();
};