import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getApiUrl } from "../api";

export const useUser = (): UseQueryResult<any, Error> => {
  const res = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/user`, {
        credentials: "include", // Add this line
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      return data;
    },
    retry: false,
  });

  return res;
};
