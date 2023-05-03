let access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUxMTIwZGE4NGNhNzliMDA0YTk1NzgiLCJpYXQiOjE2ODMwMzY5MzIsImV4cCI6MTY4MzAzNzIzMn0.4gLWOlM48XcAOXZFN5ocTiD1Vto7LUIhKnbRJGHz2ZI';
let refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUxMTIwZGE4NGNhNzliMDA0YTk1NzgiLCJpYXQiOjE2ODMwMzU1MjgsImV4cCI6MTY4MzY0MDMyOH0.ArTW77vdIdz9z7W2rEkjgh74We4uSpgthZ4R0EbeEN0';

axios.interceptors.response.use(
  res => res,
  async err => {
    const originalReq = err.config;
    if (err.response.status === 500 && !originalReq._retry) {
      const {
        data: { accessToken, refreshToken }
      } = await axios.post('http://localhost:8000/auth/refresh-token', null, {
        headers: {
          refresh_token
        }
      });
      originalReq.headers.Authorization = accessToken;
      access_token = accessToken;
      refresh_token = refreshToken;
      return axios(originalReq);
    }
  }
);

axios
  .get('http://localhost:9000/posts', {
    headers: {
      Authorization: access_token
    }
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
