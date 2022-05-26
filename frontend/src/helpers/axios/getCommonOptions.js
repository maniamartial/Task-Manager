import React from "react";

export default function getCommonOptions() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return {};
  }

  return {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  };
}
