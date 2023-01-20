
import toast from 'react-hot-toast';

const USER_API = 'http://localhost:3000';



export const setWithExpiry = (key, value, ttl) => {

    const now = new Date()

    const item = {
        ...value,
        expiry: now.getTime() + ttl * 60 * 1000,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)

    const now = new Date()

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }

    return item
}


export const login = (userData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch(`${USER_API}/users/authenticate`, requestOptions).then(handleResponse).catch(handleError);
}

export const logout = () => {
    localStorage.removeItem('muiUser');
    window.location.href = '/login';
}


const handleResponse = (response) => response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if (response.status === 401) {
            logout();
            window.location.href = '/login';
        }

        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
    }

    return data;
});

const handleError = error => { toast.error(error.toString()); };