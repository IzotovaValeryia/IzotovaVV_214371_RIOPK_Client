import axios from "axios";

const API_URL = "https://localhost:7232/api/Accounts/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { 
        email, password 
      })
      .then((response) => {
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios.post(API_URL + "Registration", {
      email,
      password
    });
  }
}

export default new AuthService();
