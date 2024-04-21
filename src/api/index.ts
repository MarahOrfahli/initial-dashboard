import axios from 'axios'
const apiOne = 'https://api.mightcinema.com/api/' // object for test
const apiURL = apiOne

///  Default Headers..........
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}
/// API Client Object........
const apiClient = axios.create({
  baseURL: apiURL,
  headers: defaultHeaders,
})
// Separate instance for multipart/form-data requests
///  API Client Object with Form Data........
const formDataApiClient = axios.create({
  baseURL: apiURL,
  headers: {
    ...defaultHeaders,
    'Content-Type': 'multipart/form-data',
  },
})
export { apiClient, formDataApiClient}
