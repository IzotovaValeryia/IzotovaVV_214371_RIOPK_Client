import axios from "axios";
import authHeader from "./auth-header";

const TYPESUPPORTMEASURE_API_BASEURL = "https://localhost:7232/api/TypeSupportMeasure";

class TypeSupportMeasureService {

    getTypeSupportMeasure() {
        return axios.get(TYPESUPPORTMEASURE_API_BASEURL, { headers: authHeader() });
    }

    createTypeSupportMeasure(typesupportmeasure){
        return axios.post(TYPESUPPORTMEASURE_API_BASEURL, typesupportmeasure, { headers: authHeader() });
    }

    getTypeSupportMeasureById(typesupportmeasure_id){
        return axios.get(TYPESUPPORTMEASURE_API_BASEURL + '/' + typesupportmeasure_id, { headers: authHeader() });
    }

    updateTypeSupportMeasure(typesupportmeasure){
        return axios.put(TYPESUPPORTMEASURE_API_BASEURL, typesupportmeasure, { headers: authHeader() });
    }

    deleteTypeSupportMeasure(typesupportmeasure_id){
        return axios.delete(TYPESUPPORTMEASURE_API_BASEURL + '?id=' + typesupportmeasure_id, { headers: authHeader() });
    }
}

export default new TypeSupportMeasureService()