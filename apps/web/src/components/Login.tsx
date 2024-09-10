import React from "react";
import { getApiUrl } from "../api";
import { Github } from "lucide-react";

export const Login = () => {
  const apiUrl = getApiUrl();
  console.log("API URL", apiUrl);

  return (
    <a
      href={`${apiUrl}/login/github`}
      className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
    >
      <Github className="w-5 h-5 mr-2" />
      <span>Login with GitHub</span>
    </a>
  );
};
