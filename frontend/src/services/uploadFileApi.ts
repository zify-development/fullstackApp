import axios from "axios";

export const getProfileImage = {
  get: async () => {
    let res = await axios.get(`http://localhost:5000/api/user/images`);
    return res.data;
  },
};

export const uploadProfileImage = {
  create: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    let res = await axios.post(
      `http://localhost:5000/api/user/image`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateProfileImage = {
  update: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    let res = await axios.put(
      `http://localhost:5000/api/user/image`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};
