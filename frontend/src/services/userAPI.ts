import axios from 'axios';
import { sha512 } from 'js-sha512'


export interface IFUser {
  email: string,
  password: string,
  _id?: string
}

export const getUsersData = {
  get: async () => {
    let res = await axios.get(`http://localhost:5000/api/users`);
    return res.data;
  }
}

export const createUser = {
  create: async (data: IFUser) => {
    const currentData = {
      email: sha512(data.email),
      password: sha512(data.password)
    };
    let res = await axios.post(`http://localhost:5000/api/user`, currentData);
    return res.data;
  }
}

export const loginUser = {
  login: async (data: IFUser) => {
    const currentData = {
      email: sha512(data.email),
      password: sha512(data.password)
    };
    let res = await axios.post(`http://localhost:5000/api/user/login`, currentData);
    return res.data;
  }
}

// todo do I want to change email?
// export const updateUser = {
//   update: async (data: IFUser, id: string) => {
//     let res = await axios.post(`http://localhost:5000/api/user/login:${id}`, data);
//     return res.data;
//   }
// }