import { 
    REQUEST_UPDATE_DAYS,
    SUCCESS_UPDATE_DAYS,
    ERROR_UPDATE_DAYS,
    SUCCESS_ROWS_DATA,
    ERROR_ROWS_DATA,
    REQUEST_ROWS_DATA,
    SET_FILTER_DATA,
} from '../actionTypes';
import axios from 'axios';
  

const manageDays = data => (dispatch) => {
        dispatch({ type: REQUEST_UPDATE_DAYS });
        //in case of api calls change post get patch delete accordingly
        // return axios.get('api path', data).then((res) => {
        //     dispatch({ type: SUCCESS_UPDATE_DAYS, payload: res });
        // }).catch((err) => {
        //     dispatch({ type: ERROR_UPDATE_DAYS, payload: err });
        // });
        dispatch({ type: SUCCESS_UPDATE_DAYS, payload: data });
    };

    const getData = (data) => (dispatch) => {
        // const { offset = 0, limit = 30, normalize = false } = data;
        // let normFlag = 'Normalize';
        // if(normalize) normFlag = 'Non-Normalize';
        dispatch({ type: REQUEST_ROWS_DATA });
        // axios.post(url, { offset, limit, normalize }).then(() => {}).catch(()=>{})
        //in case of api calls change post get patch delete accordingly
        return axios.get('./sample.json').then(({ data: res = [] }) => {
            dispatch({ type: SUCCESS_ROWS_DATA, payload: res});
        }).catch((err) => {
            console.log(err);
            dispatch({ type: ERROR_ROWS_DATA, payload: err });
        });
    };

    const setFilters = (data) => (dispatch) => {
        console.log(data);
        dispatch({ type: SET_FILTER_DATA, payload: data });
    }
  
    
    export {
        manageDays,
        getData,
        setFilters,
    };