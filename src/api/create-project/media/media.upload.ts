// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// let data = new FormData();
// data.append('image', fs.createReadStream('/Users/otarmames/Desktop/Screenshot 2025-09-12 at 15.11.34.png'));
// data.append('description', 'test photo');

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://api.ctmpus.dev/projects/019973aa-ed0d-7135-a252-31379272897a/media',
//   headers: {
//     'Accept': 'application/json',
//     'X-Account-Id': '{{accountId}}',
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

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
