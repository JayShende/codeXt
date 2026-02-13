import { useQuery } from "@tanstack/react-query";
import { getRoomInfo, getSession } from "./api";

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
