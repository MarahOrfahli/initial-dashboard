import axios from 'axios'
const apiOne = 'https://api.mightcinema.com/api/' // object for test
const apiURL = apiOne

///  Default Headers..........
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  "Access-Control-Allow-Credentials":"true"
}
/// API Client Object........
const apiClient = axios.create({
  baseURL: apiURL,
  headers: defaultHeaders,
})

apiClient.interceptors.request.use((config) => {
  const isAuthenticated = !!localStorage.getItem('authToken')
  const token = localStorage.getItem('authToken')
  if (isAuthenticated) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
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

formDataApiClient.interceptors.request.use((config) => {
  const isAuthenticated = !!localStorage.getItem('authToken')
  const token = localStorage.getItem('authToken')
  if (isAuthenticated) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
export { apiClient, formDataApiClient}
