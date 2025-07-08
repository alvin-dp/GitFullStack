import HeaderStateless from './HeaderStateless';
import { useState, useEffect } from 'react';

function UseEffectAsyncDataFetch(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlToFetch  = 'https://jsonplaceholder.typicode.com/posts/' + props.postId;
                const response = await fetch(urlToFetch);
                
                if (response.status >=200 && response.status <300) {
                    const data  = await response.json();  
                    console.log(data);
                   setData(data);
                    }
                else
                    {
                    throw new Error('Network error: Code - ' + response.status + ', ' + response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            }           
        };

        fetchData(); 
    }, []); 

    return (
        <div>
            {error && <p>Error message: {error}</p>}
            {data ? <div><HeaderStateless name={'Post #' + props.postId} /> <p style={{color:'yellowgreen'}}>Title : {data.title}</p></div> : <p>Дані завантажуються...</p>}
        </div>
    );
}

export default UseEffectAsyncDataFetch;