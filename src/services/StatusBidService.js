import axios from "axios";
import authHeader from "./auth-header";

const STATUSBID_API_BASEURL = "https://localhost:7232/api/StatusBid";

class StatusBidService {

    getStatusBid() {
        return axios.get(STATUSBID_API_BASEURL, { headers: authHeader() });
    }

    createStatusBid(statusbid){
        return axios.post(STATUSBID_API_BASEURL, statusbid, { headers: authHeader() });
    }

    getStatusBidById(statusbid_id){
        return axios.get(STATUSBID_API_BASEURL + '/' + statusbid_id, { headers: authHeader() });
    }

    updateStatusBid(statusbid){
        return axios.put(STATUSBID_API_BASEURL, statusbid, { headers: authHeader() });
    }

    deleteStatusBid(statusbid_id){
        return axios.delete(STATUSBID_API_BASEURL + '?id=' + statusbid_id, { headers: authHeader() });
    }
}

export default new StatusBidService()