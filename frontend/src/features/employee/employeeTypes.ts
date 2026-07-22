export interface Employee {
    _id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    status: string;
    joiningDate: string;
    salary: number;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalEmployees: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface EmployeeState {
    employees: Employee[];
    employee: Employee | null;

    pagination: Pagination | null;

    loading: boolean;

    error: string | null;
}