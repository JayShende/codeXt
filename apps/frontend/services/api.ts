import axios from "axios";

export interface signUpBody {
  name: string;
  email: string;
  password: string;
}

export interface signInBody {
  email: string;
  password: string;
}

export const signUp = async (data: signUpBody) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3001/api/auth/sign-up/email",
    data: data,
    withCredentials: true,
  });
  return response.data;
};

export const signIn = async (data: signInBody) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3001/api/auth/sign-in/email",
    data: data,
    withCredentials: true,
  });
  return response.data;
};

export const getSession = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3001/api/auth/get-session",
    withCredentials: true,
  });

  return response.data;
};

export const logOut = async () => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3001/api/auth/sign-out",
    withCredentials: true,
  });

  return response.data;
};

export const getRoomInfo = async (roomSlug: string) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:3001/v1/room/getRoomDetails/${roomSlug}`,
  });
  return response.data.data;
};
