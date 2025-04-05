import axios from "axios";
import authHeader from "./auth-header";

const LEVELDISABILITY_API_BASEURL = "https://localhost:7232/api/LevelDisability";

class LevelDisabilityService {

    getLevelDisability() {
        return axios.get(LEVELDISABILITY_API_BASEURL, { headers: authHeader() });
    }

    createLevelDisability(leveldisability){
        return axios.post(LEVELDISABILITY_API_BASEURL, leveldisability, { headers: authHeader() });
    }

    getLevelDisabilityById(leveldisability_id){
        return axios.get(LEVELDISABILITY_API_BASEURL + '/' + leveldisability_id, { headers: authHeader() });
    }

    updateLevelDisability(leveldisability){
        return axios.put(LEVELDISABILITY_API_BASEURL, leveldisability, { headers: authHeader() });
    }

    deleteLevelDisability(leveldisability_id){
        return axios.delete(LEVELDISABILITY_API_BASEURL + '?id=' + leveldisability_id, { headers: authHeader() });
    }
}

export default new LevelDisabilityService()