const getData = (url) => {
        let data;

        return fetch(url).then(function(res){
            if(!res.ok){
                throw Error('Could not fetch data from the server');
            }
            return res.json().then((response) => {
                data = response;
                return data;
            }).catch((err) => {
                console.log(err.message);
            });
        });
}

export default getData;