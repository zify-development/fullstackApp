import axios from 'axios';

export interface IFUserInfo {
    firstName?: string,
    lastName?: string,
    myMotivation?: string,
    age?: number,
}

export const getUsersInfo = {
  get: async (id: string) => {
    let res = await axios.get(`http://localhost:5000/api/userInfo:${id}`);
    return res.data;
  }
}

export const createUserInfo = {
  create: async (data: IFUserInfo, id: string) => {
    const currentData = {
        ...data,
        id
    }
    let res = await axios.post(`http://localhost:5000/api/userInfo:${id}`, currentData);
    return res.data;
  }
}

export const updateUserInfo = {
  update: async (data: IFUserInfo, id: string) => {
    let res = await axios.put(`http://localhost:5000/api/api/userInfo:${id}`, data);
    return res.data;
  }
}

// export const deleteUserInfo = {
//   delete: async (data: IFUserInfo, id: string) => {
//     let res = await axios.post(`http://localhost:5000/api/user/login:${id}`, data);
//     return res.data;
//   }
// }