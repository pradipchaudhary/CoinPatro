const baseCoinAPI = "https://pro-api.coinmarketcap.com/";
const apiVersion = "v1";
const apiKey = `&CMC_PRO_API_KEY=${REACT_APP_CMC_KEY}`;

//Function to get the top 25 coins.
const getCoins = async (endPoint) => {
    let path = `${baseCoinAPI}${apiVersion}${endPoint}${apiKey}`;
    const fetchResult = await fetch(path);
    const result = await fetchResult.json();
    console.log(result);

    if (fetchResult.ok) {
        return result;
    }
    const responseError = {
        type: "Error",
        message: result.message || "Something went wrong",
        data: result.data || "",
        code: result.code || "",
    };

    let error = new Error();
    error = { ...error, ...responseError };
    throw error;
};

//DOM Manipulation to show all the coins and respective values
const coins = getCoins("/cryptocurrency/listings/latest?limit=25");
