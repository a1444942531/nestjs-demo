type Method = "GET" | "POST"

export const aliceReq = async (url: string, authorization: string, method: Method = "GET", body) => {
    let res = await fetch(url, {
        headers: {
            authorization
        },
        body,
        method
    });
    let contentType = res.headers.get("Content-Type")

    switch (contentType) {
        case "text/html":
            return await res.text()
            break;

        default:
            break;
    }
    try {
        return await res.json()
    } catch (error) {
        console.log(contentType)
    }
}