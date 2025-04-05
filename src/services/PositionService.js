import axios from "axios";
import authHeader from "./auth-header";

const POSITION_API_BASEURL = "https://localhost:7232/api/Position";

class PositionService {

    async getPositions() {
        return axios.get(POSITION_API_BASEURL, { headers: authHeader() });
    }

    async createPosition(position){
        return axios.post(POSITION_API_BASEURL, position, { headers: authHeader() });
    }

    async getPositionById(position_id){
        return axios.get(POSITION_API_BASEURL + '/' + position_id, { headers: authHeader() });
    }

    async updatePosition(position){
        return axios.put(POSITION_API_BASEURL, position, { headers: authHeader() });
    }

    async deletePosition(position_id){
        return axios.delete(POSITION_API_BASEURL + '?id=' + position_id, { headers: authHeader() });
    }
}

export default new PositionService()