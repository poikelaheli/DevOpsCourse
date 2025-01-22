
const handleRequest = () => {
    fetch(new Request("http://localhost:8198/request", {
        method: "GET"
    })).then(response => {
        //const payload = Buffer.concat(response.getBody()).toString();
        console.log(response);
        //console.log(response.json());
        response.text().then((payload) => {
            console.log(payload);
            document.getElementById("response").innerHTML = payload;
        })
    }).catch(err => {
        console.log(err);
    })
} 