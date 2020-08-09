class HttpError extends Error {
    constructor(response) {
        super(`Status ${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new HttpError(response);
    }

    return response.json();
}
