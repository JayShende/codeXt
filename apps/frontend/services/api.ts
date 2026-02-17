import axios from "axios";
import "dotenv/config";
import { deleteRoomProps } from "./mutations";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    url: `${BACKEND_URL}api/auth/sign-up/email`,
    data: data,
    withCredentials: true,
  });
  return response.data;
};

export const signIn = async (data: signInBody) => {
  const response = await axios({
    method: "post",
    url: `${BACKEND_URL}api/auth/sign-in/email`,
    data: data,
    withCredentials: true,
  });
  return response.data;
};

export const getSession = async () => {
  const response = await axios({
    method: "get",
    url: `${BACKEND_URL}api/auth/get-session`,
    withCredentials: true,
  });

  return response.data;
};

export const logOut = async () => {
  const response = await axios({
    method: "post",
    url: `${BACKEND_URL}api/auth/sign-out`,
    withCredentials: true,
  });

  return response.data;
};

export const getRoomInfo = async (roomSlug: string) => {
  const response = await axios({
    method: "get",
    url: `${BACKEND_URL}v1/room/getRoomDetails/${roomSlug}`,
  });
  return response.data.data;
};

export const getAllUserRoomsData = async () => {
  const response = await axios({
    method: "get",
    url: `${BACKEND_URL}v1/room/getAllUserRoomsData`,
    withCredentials: true,
  });
  return response.data;
};

export const deleteRoom = async (data: deleteRoomProps) => {
  const response = await axios({
    method: "post",
    data: data,
    url: `${BACKEND_URL}v1/room/deleteRoom`,
    withCredentials: true,
  });

  return response.data;
};

export const createRoom = async (roomName: string) => {
  const response = await axios({
    method: "post",
    data: {
      roomName: roomName,
    },
    url: `${BACKEND_URL}v1/room/createRoom`,
    withCredentials: true,
  });
  return response.data;
};
