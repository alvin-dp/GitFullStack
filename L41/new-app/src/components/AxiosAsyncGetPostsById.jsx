import HeaderStateless from './HeaderStateless';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosAsyncGetPostsById(props) {
    const [responseData, setResponseData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [idMessage, setidMessage] = useState(1);

    useEffect(() => {
        async function axiosAsyncFetchData () {
            try {
                const urlToFetch  = 'https://jsonplaceholder.typicode.com/posts/' + idMessage;
                const response = await axios.get(urlToFetch);
                console.log(response);
                setResponseData(response.data);
                setErrorMsg(null);
            } catch (error) {
                console.error('Error:', error);
                setErrorMsg(error.message);
                setResponseData(null);
            }           
        };
        axiosAsyncFetchData(); 
    }, [idMessage]); 

    return (
        <div> 
            <HeaderStateless name={'Post #' + idMessage} />             
            {errorMsg && <p>Error message: {errorMsg}</p>}
            {responseData ? <div>
                    <p style={{color:'yellowgreen'}}>Title : {responseData.title}</p>
                    <p>Message: {responseData.body}</p> </div>: 
                    <p>Дані завантажуються...</p>}
            <p>
                <button onClick={() => setidMessage(idMessage - 1)}>Previous</button>      
                <button onClick={() => setidMessage(idMessage + 1)}>Next</button>                
            </p>             
        </div>
    );
}

export default AxiosAsyncGetPostsById;