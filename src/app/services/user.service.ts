export const getPortfolioService = async (username: string) => {
    const res = await fetch(`http://localhost:8080/portfolio/${username}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}