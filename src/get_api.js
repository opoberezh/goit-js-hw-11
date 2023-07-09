import axios from 'axios';
import { imgsName, currentPage } from './index';

const URL = 'https://pixabay.com/api/';
const KEY = '38119446-41822b71524f1b118d79216dc';
const axios = require('axios');




async function makeRequest() {
    const config = {
        url: URL,
        key: KEY,
        q: imgsName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
    };
    try{
        let res = await axios.get(config);

        return res;
    } catch (error) {
        console.error(error);
      }
    
}

export {makeRequest};