import React from "react";

type GitHubUserData = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
};

export const GitHubUser = (data: GitHubUserData) => {
  return (
    <a
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-6 hover:opacity-80 transition-opacity"
    >
      <img
        src={data.avatar_url}
        alt={`${data.login}'s avatar`}
        className="w-16 h-16 rounded-full"
      />

      <div>
        <h2 className="text-xl font-bold text-black mb-1">
          {data.name || data.login}
        </h2>
        <p className="text-xs text-gray-600">@{data.login}</p>
      </div>
    </a>
  );
};
