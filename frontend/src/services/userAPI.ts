import axios from "axios";
import { sha512 } from "js-sha512";

export interface IFUser {
  email: string;
  password: string;
  _id?: string;
  createdDate?: Date;
}

export const getUsersData = {
  get: async () => {
    let res = await axios.get(`http://localhost:5000/api/users`);
    return res.data;
  },
};

export const getUserDataByToken = {
  getData: async (token: string) => {
    let res = await axios.get(`http://localhost:5000/api/user/data`, {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    let responseData;
    await axios
      .post(`http://localhost:5000/api/user/register`, currentData)
      .then((res) => {
        console.warn(res, "res api");
      })
      .catch((error) => {
        if (error.response) {
          console.warn("1. if", error.response);
          responseData = error.response;

          // client received an error response (5xx, 4xx)
        } else if (error.request) {
          console.warn(error, "else if api");

          // client never received a response, or request never left
        } else {
          console.warn(error, "else api");

          // anything else
        }
      });

    return responseData as any;
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
