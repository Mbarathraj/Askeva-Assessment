import api from "../../api/axios";

export const getDashboardAPI=async()=>{

    const response=await api.get("/dashboard");

    return response.data;

}