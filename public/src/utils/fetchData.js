import axios from 'axios';

const VERSION = 'v1';
const BASEURL = 'http://localhost:8080';

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASEURL}/api/${VERSION}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const postDataAPI = async (url, data, token) => {
    const res = await axios.post(`${BASEURL}/api/${VERSION}/${url}`, data.data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const putDataAPI = async (url, data, token) => {
    const res = await axios.put(`${BASEURL}/api/${VERSION}/${url}`, data.data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const patchDataAPI = async (url, data, token) => {
    const res = await axios.patch(`${BASEURL}/api/${VERSION}/${url}`, data.data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${BASEURL}/api/${VERSION}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
