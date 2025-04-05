import axios from "axios";
import authHeader from "./auth-header";

const APPLICATION_USER_API_BASEURL = "https://localhost:7232/api/Accounts";


class ApplicationUserService {
    getApplicationUsers() {
        return axios.get(APPLICATION_USER_API_BASEURL + '/ApplicationUsers', { headers: authHeader() });
    }

    getApplicationRoles() {
        return axios.get(APPLICATION_USER_API_BASEURL + '/ApplicationRoles', { headers: authHeader() });
    }

    updateApplicationRoles(roles) {
        return axios.post(APPLICATION_USER_API_BASEURL + '/UpdateApplicationRoles', roles, { headers: authHeader() });
    }
}

export default new ApplicationUserService()
