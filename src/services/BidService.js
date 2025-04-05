import axios from "axios";
import authHeader from "./auth-header";

const BID_API_BASEURL = "https://localhost:7232/api/Bid";

class BidService {

    getBid() {
        return axios.get(BID_API_BASEURL, { headers: authHeader() });
    }

    createBid(bid){
        return axios.post(BID_API_BASEURL, bid, { headers: authHeader() });
    }

    getBidById(bid_id){
        return axios.get(BID_API_BASEURL + '/' + bid_id, { headers: authHeader() });
    }

    getBidByApplicationUserId(applicationUserId){
        return axios.get(BID_API_BASEURL + '/GetByApplicationUserId/' + applicationUserId, { headers: authHeader() });
    }


    updateBid(bid){
        return axios.put(BID_API_BASEURL, bid, { headers: authHeader() });
    }

    deleteBid(bid_id){
        return axios.delete(BID_API_BASEURL + '?id=' + bid_id, { headers: authHeader() });
    }
}

export default new BidService()