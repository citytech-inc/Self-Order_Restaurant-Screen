const sendPostRequest = async (timeDividedArray: Number[], restaurantId: String|undefined) => {
    if(restaurantId) {
        //バックエンドのエンドポイント指定
        const backendUrl = `http://localhost:3003/api/analysis/${restaurantId}`;
        //注文情報をPOSTリクエストでバックエンドに送信
        const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({timeDividedArray: timeDividedArray}),
        });
        const data =  await response.json();
        console.log(data)
        return data
    }
    return 0
};

export default sendPostRequest;