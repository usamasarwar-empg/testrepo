const _getAddress = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/address/`, {
            method: 'GET',
            headers: { jwt_token: localStorage.token },
        });
        console.log(process.env);
        console.log('res: ');
        console.log(res);
        const parseData = await res.json();
        console.log('Parse Data');
        console.log(parseData);
        return parseData;

    } catch (err) {
        console.error(err);
    }
}

const _deleteAddress =async () => {
    try {
        await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/address`, {
            method: 'DELETE',
            headers: { jwt_token: localStorage.token },
        });

    } catch (err) {
        console.error(err.message);
    }
}

const _addAddress = async (body) => {
    try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('jwt_token', localStorage.token);
    
    const response = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/address`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
    });

    const parseResponse = await response.json();
    return parseResponse;
    } catch (err){
        console.error(err);
    }
}


const _updateAddress = async (body) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('jwt_token', localStorage.token);


        const response = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/address`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(body),
        });

        const parseResponse = await response.json();
        return parseResponse;
    } catch (err){
        console.log(err);
    }
}

export {_getAddress, _deleteAddress, _addAddress, _updateAddress};