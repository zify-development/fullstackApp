import axios from "axios";

export interface IFUser {
  email: string;
  password: string;
  _id?: string;
  createdDate?: Date;
}

export const getAll = {
  get: async (token: string) => {
    let res = await axios.get(`http://localhost:5000/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const getUserDataByToken = {
  getData: async (token: string) => {
    let res = await axios.get(`http://localhost:5000/api/user/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const createUser = {
  create: async (data: IFUser) => {
    const currentData = {
      email: data.email,
      password: data.password,
      createdDate: new Date(),
    };
    let res = await axios.post(
      `http://localhost:5000/api/user/register`,
      currentData
    );
    console.warn(res, "res");
    return res.data;
  },
};

export const loginUser = {
  login: async (data: IFUser) => {
    let res = await axios.post(`http://localhost:5000/api/user/login`, data);
    return res.data;
  },
};

// todo do I want to change email?
// export const updateUser = {
//   update: async (data: IFUser, id: string) => {
//     let res = await axios.post(`http://localhost:5000/api/user/login:${id}`, data);
//     return res.data;
//   }
// }
