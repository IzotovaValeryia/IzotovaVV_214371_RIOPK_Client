import axios from "axios";
import authHeader from "./auth-header";

const FAMILYMEMBER_API_BASEURL = "https://localhost:7232/api/FamilyMember";

class FamilyMemberService {

    getFamilyMember() {
        return axios.get(FAMILYMEMBER_API_BASEURL, { headers: authHeader() });
    }

    createFamilyMember(familymember){
        return axios.post(FAMILYMEMBER_API_BASEURL, familymember, { headers: authHeader() });
    }

    getFamilyMemberById(familymember_id){
        return axios.get(FAMILYMEMBER_API_BASEURL + '/' + familymember_id, { headers: authHeader() });
    }

    updateFamilyMember(familymember){
        return axios.put(FAMILYMEMBER_API_BASEURL, familymember, { headers: authHeader() });
    }

    getFamilyMemberByApplicationUserId(applicationUserId){
        return axios.get(FAMILYMEMBER_API_BASEURL + '/GetByApplicationUserId/' + applicationUserId, { headers: authHeader() });
    }

    deleteFamilyMember(familymember_id){
        return axios.delete(FAMILYMEMBER_API_BASEURL + '?id=' + familymember_id, { headers: authHeader() });
    }
}

export default new FamilyMemberService()