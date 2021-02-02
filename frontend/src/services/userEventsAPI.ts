import axios from "axios";
import { ISchedule } from "tui-calendar";

export const getUserEvents = {
  get: async (token: string) => {
    let res = await axios.get(`http://localhost:5000/api/userEvents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const createUserEvent = {
  create: async (data: ISchedule, token: string) => {
    let res = await axios.post(`http://localhost:5000/api/userEvents`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const updateUserEvent = {
  update: async (data: ISchedule, token: string) => {
    let res = await axios.put(`http://localhost:5000/api/userEvents`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const deleteUserEvent = {
  delete: async (id: string) => {
    let res = await axios.delete(`http://localhost:5000/api/userEvents/${id}`);
    return res.data;
  },
};
