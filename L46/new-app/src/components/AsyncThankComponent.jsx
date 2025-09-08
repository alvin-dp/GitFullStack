import { useDispatch, useSelector } from 'react-redux'
import { fetchDataRTK } from '../redux/selectors';
import {fetch_data_request,fetch_data_success,fetch_data_failure} from '../redux/reducerRTK'
//import {fetch_data_rq} from '../redux/reducerRTK'; useDispatch

    const fetchData = () => {
        // Ця функція отримує методи dispatch і getState, які можна використовувати для взаємодії зі станом
        return (dispatch, getState) => {
            dispatch(fetch_data_request());
            return fetch('https://swapi.info/api/films') // Робимо асинхронний запит
                .then(response => response.json()) // Перетворюємо відповідь у JSON
                .then(data => {
                    dispatch(fetch_data_success(data));
                })
                .catch(error => {
                    dispatch(fetch_data_failure(error));
                });
        };
    };



function AsyncThankComponent (props) 
{      
    const dispatch = useDispatch();        
    const dataSlice = useSelector(fetchDataRTK);

    if (dataSlice.loading) {
        return <p>loading...</p>    
    }
    return <div> <p>{`${dataSlice.data===null?'Nothing to show':dataSlice.data.map(({title})=>title)}`}</p>
                <button onClick={()=>dispatch(fetchData())}> call async code </button>
    </div>
}

export default AsyncThankComponent