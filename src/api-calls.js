import axios from 'axios';

export function getAllWords() {
    return axios.get('http://localhost:5000/api/words');
}
