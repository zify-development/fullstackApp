import axios from "axios";

export const getImagesByToken = {
  get: async () => {
    let res = await axios.get(`http://localhost:5000/api/user/images`);
    return res.data;
  },
};

export const uploadImage = {
  upload: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    let res = await axios.post(
      `http://localhost:5000/api/user/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },
};
