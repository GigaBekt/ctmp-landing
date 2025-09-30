import axios from "axios";

export const mediaUpload = async (projectId: string, formData: FormData) => {
  const accountId = localStorage.getItem("accountId");
  const guestToken = localStorage.getItem("guestToken");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_API_BASE_URL}projects/${projectId}/media`,
    headers: {
      Accept: "application/json",
      "X-Account-Id": accountId || guestToken,
    },
    data: formData,
  };

  const response = await axios.request(config);
  return response.data;
};
