import axios from 'axios';
// 'Access-Control-Allow-Origin': '*'
import Swal from 'sweetalert2';
const headers = { headers: {} };
const authenticatorHeader = { headers: {'Authorization': `Bearer ${sessionStorage.getItem('acces_token')}`} };
const goToHome = (baseUrl, response) => {
  const login = window.location.origin + '/admin/login';
//   if (window.location.href !== login && baseUrl.indexOf('/is-auth') === -1) {
  if (!window.location.href.includes('/admin/login')) {
    Swal.fire({
        icon: 'error',
        title: 'Oops, session expired...',
        text: 'Kindly login again',
        showConfirmButton: false,
        timer: 3000
    });
    sessionStorage.removeItem('acces_token')
    window.location.href = login;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: response.data.message,
      showConfirmButton: false,
      timer: 3000
    });
  }
};

// GET Request
export const getService = async (baseUrl, isAuthentication = false) => {
  try {
    const response = await axios.get(baseUrl, isAuthentication ? authenticatorHeader : headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 400 || response?.status === 401) {
        goToHome(baseUrl, response);
    }
    return [null, response && response.data];
  }
};

// POST Request
export const postService = async (baseUrl, params, isAuthentication = false) => {
  try {
    const response = await axios.post(baseUrl, params, isAuthentication ? authenticatorHeader : headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 400 || response?.status === 401) {
      goToHome(baseUrl, response);
    }
    return [null, response && response.data];
  }
};

// PUT Request
export const putService = async (baseUrl, params, isAuthentication = false) => {
  try {
    const response = await axios.put(baseUrl, params, isAuthentication ? authenticatorHeader : headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 400 || response?.status === 401) {
      goToHome(baseUrl, response);
    }
    return [null, response && response.data];
  }
};

// DELETE Request
export const deleteService = async (baseUrl, isAuthentication = false) => {
  try {
    const response = await axios.delete(baseUrl, isAuthentication ? authenticatorHeader : headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 400 || response?.status === 401) {
      goToHome(baseUrl, response);
    }
    return [null, response && response.data];
  }
};
