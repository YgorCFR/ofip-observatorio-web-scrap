import React, {useState, useEffect} from 'react';
import axios from 'axios';


function DataFetching() {
    const [sites, setSites] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5000/api/v1/vehicle/get-vehicles')
            .then(res => {
                setSites(res.data.data);
            })
            .catch(err =>{
                console.log(err)
            });
    }, [])

    return (
        <div>
            <ul>
               {
                   <select>{
                   sites.map(site => (<option key={site.id}>
                       {site.site}</option>))}
                    </select>
               }
            </ul>
        </div>
    )
}

export default DataFetching