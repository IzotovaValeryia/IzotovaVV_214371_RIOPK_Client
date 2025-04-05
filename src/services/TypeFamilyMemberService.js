import axios from "axios";
import authHeader from "./auth-header";

const TYPEFAMILYMEMBER_API_BASEURL = "https://localhost:7232/api/TypeFamilyMember";

class TypeFamilyMemberService {

    getTypeFamilyMember() {
        return axios.get(TYPEFAMILYMEMBER_API_BASEURL, { headers: authHeader() });
    }

    createTypeFamilyMember(typefamilymember){
        return axios.post(TYPEFAMILYMEMBER_API_BASEURL, typefamilymember, { headers: authHeader() });
    }

    getTypeFamilyMemberById(typefamilymember_id){
        return axios.get(TYPEFAMILYMEMBER_API_BASEURL + '/' + typefamilymember_id, { headers: authHeader() });
    }

    updateTypeFamilyMember(typefamilymember){
        return axios.put(TYPEFAMILYMEMBER_API_BASEURL, typefamilymember, { headers: authHeader() });
    }

    deleteTypeFamilyMember(typefamilymember_id){
        return axios.delete(TYPEFAMILYMEMBER_API_BASEURL + '?id=' + typefamilymember_id, { headers: authHeader() });
    }
}

export default new TypeFamilyMemberService()