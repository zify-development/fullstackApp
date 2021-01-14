import axios from 'axios';

export interface IFUser {
  email: string,
  password: string,
  _id?: string
}

export const getUsersData = {
  getUsers: async () => {
    let res = await axios.get(`http://localhost:5000/api/users`);
    return res.data;
  }
}

export const createUser = {
  create: async (data: IFUser) => {
    let res = await axios.post(`http://localhost:5000/api/user`, data);
    return res.data;
  }
}

export const loginUser = {
  login: async (data: IFUser) => {
    let res = await axios.post(`http://localhost:5000/api/user/login`, data);
    return res.data;
  }
}