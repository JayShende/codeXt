import { useQuery } from "@tanstack/react-query";
import { getAllUserRoomsData, getRoomInfo, getSession } from "./api";

export function useGetSession() {
  return useQuery({
    queryKey: ["get Session"],
    queryFn: getSession,
  });
}

export function useGetRoomDetails(roomSlug: string) {
  return useQuery({
    queryKey: ["Room Details"],
    queryFn: () => getRoomInfo(roomSlug),
  });
}

// export function useGetAllUserRoomsData() {
//   return useQuery({
//     queryKey: ["User_All_Room_Data"],
//     queryFn: getAllUserRoomsData,
//   });
// }

export const useGetAllUserRoomsData = () => {
  return useQuery({
    queryKey: ["User_All_Room_Data"],
    queryFn: getAllUserRoomsData,
    select: (res) => ({
      ...res,
      data: res.data.map((room: any) => ({
        ...room,
        createdAt: new Date(room.createdAt),
        expiresAt: new Date(room.expiresAt),
        snippetUpdatedAt: new Date(room.snippetUpdatedAt),
      })),
    }),
  });
};
