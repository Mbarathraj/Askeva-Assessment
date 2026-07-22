import api from "../../api/axios";

export const loginAPI = async (data: {
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", data);
    console.log(response.data)

    return response.data;
};

export const logoutAPI = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};

export const getProfileAPI = async () => {
    const response = await api.get("/auth/profile");

    return response.data;
};