import React, { useContext, createContext, useState } from "react";
import { IFUserData } from "../pages/ProfilePage";
import { IFUserInfoFormValues } from "../types/FormTypes";
import { IFImage } from "../types/ImageTypes";

export const userDataContext = createContext<{
  userData: { data?: IFUserData; setUserData: (data: IFUserData) => void };
  userInfoData: {
    infoData?: IFUserInfoFormValues;
    setUserInfoData: (infoData: IFUserInfoFormValues) => void;
  };
  userImageData: {
    imageData?: IFImage;
    setUserImage: (imageData: IFImage) => void;
  };
}>({
  userData: {
    setUserData: () => {},
  },
  userInfoData: {
    setUserInfoData: () => {},
  },
  userImageData: {
    setUserImage: () => {},
  },
});

const UserDataProvider: React.FC = ({ children }) => {
  const [data, setUserData] = useState<IFUserData>({});
  const [infoData, setUserInfoData] = useState<IFUserInfoFormValues>({});
  const [imageData, setUserImage] = useState<IFImage>({});

  return (
    <userDataContext.Provider
      value={{
        userData: { data, setUserData },
        userInfoData: { infoData, setUserInfoData },
        userImageData: { imageData, setUserImage },
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export const useUserData = () => {
  const ctx = useContext(userDataContext);

  const loginUser = () => {
    setTimeout(() => {
      ctx.userData.setUserData({ _id: "TEST_USER_LOGGED" });
    }, 1500);
  };

  return {
    loginUser,
    context: ctx,
  };
};

export default UserDataProvider;
