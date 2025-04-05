import axios from "axios";
import authHeader from "./auth-header";

const SUPPORTMEASURE_API_BASEURL = "https://localhost:7232/api/SupportMeasure";

class SupportMeasureService {

    getSupportMeasure() {
        return axios.get(SUPPORTMEASURE_API_BASEURL, { headers: authHeader() });
    }

    createSupportMeasure(supportmeasure){
        return axios.post(SUPPORTMEASURE_API_BASEURL, supportmeasure, { headers: authHeader() });
    }

    getSupportMeasureById(supportmeasure_id){
        return axios.get(SUPPORTMEASURE_API_BASEURL + '/' + supportmeasure_id, { headers: authHeader() });
    }

    updateSupportMeasure(supportmeasure){
        return axios.put(SUPPORTMEASURE_API_BASEURL, supportmeasure, { headers: authHeader() });
    }

    deleteSupportMeasure(supportmeasure_id){
        return axios.delete(SUPPORTMEASURE_API_BASEURL + '?id=' + supportmeasure_id, { headers: authHeader() });
    }
}

export default new SupportMeasureService()