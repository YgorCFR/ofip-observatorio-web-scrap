import React, { Component } from 'react';


class LocalStorage extends Component {

    getData() {
        let data = localStorage.getItem('myData');
        data = JSON.parse(data);
        console.log(data);
    }

    setData() {
        let obj = {name: 'Miller', age: 42, occupation: 'Manager', token: '24fsfsgdnsksoareke-eeaem23123'};
        localStorage.setItem('myData', JSON.stringify(obj));
    }

    render() {
        return (
            <div className="App">
                <button onClick={() => this.setData() }>Set Data</button>
                <button onClick={() => this.getData()}>Get Data</button>
            </div>
        );
    }

}


export default LocalStorage;