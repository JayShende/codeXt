import { useQuery } from "@tanstack/react-query";
import { getSession } from "./api";


export function useGetSession(){
    return useQuery({
        queryKey:["get Session"],
        queryFn:getSession
    })
}