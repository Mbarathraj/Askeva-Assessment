import api from "../../api/axios";

export interface EmployeeQuery {

    page?: number;

    limit?: number;

    search?: string;

    department?: string;

    status?: string;

}

export const getEmployeesAPI = async (
    params: EmployeeQuery
) => {

    const response = await api.get("/employees", {
        params,
    });

    return response.data;

};

export const getEmployeeAPI = async (
    id: string
) => {

    const response = await api.get(`/employees/${id}`);

    return response.data;

};

export const createEmployeeAPI = async (
    data: any
) => {

    const response = await api.post(
        "/employees",
        data
    );

    return response.data;

};

export const updateEmployeeAPI = async (
    id: string,
    data: any
) => {

    const response = await api.put(
        `/employees/${id}`,
        data
    );

    return response.data;

};

export const deleteEmployeeAPI = async (
    id: string
) => {

    const response = await api.delete(
        `/employees/${id}`
    );

    return response.data;

};