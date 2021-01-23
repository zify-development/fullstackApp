import axios from "axios";
import { IFUserInfoFormValues } from "../types/FormTypes";

export interface IFUserInfo {
  firstName?: string;
  lastName?: string;
  age?: number | null;
  id: string;
}

export const getUserInfo = {
  get: async (token: string) => {
    let res = await axios.get(`http://localhost:5000/api/userInfo/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const createUserInfo = {
  create: async (data: IFUserInfoFormValues, token: string) => {
    let res = await axios.post(`http://localhost:5000/api/userInfo/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const updateUserInfo = {
  update: async (data: IFUserInfoFormValues, token: string) => {
    let res = await axios.put(`http://localhost:5000/api/userInfo/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

// export const deleteUserInfo = {
//   delete: async (data: IFUserInfo, id: string) => {
//     let res = await axios.post(`http://localhost:5000/api/user/login:${id}`, data);
//     return res.data;
//   }
// }
