export const postusers = async (url, options) => {
    let res = await fetch(url, options)
        .then(res => res.json());
    return res;
}