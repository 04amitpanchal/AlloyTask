import Axios from 'axios-observable';

Axios.defaults.baseURL = 'http://localhost:4000/';
Axios.defaults.headers.common['Authorization'] = '';
Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
