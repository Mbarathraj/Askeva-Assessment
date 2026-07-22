export interface DashboardData {

    totalEmployees:number;

    activeEmployees:number;

    inactiveEmployees:number;

    onLeaveEmployees:number;

    departmentWise:{
        department:string;
        count:number;
    }[];

    monthlyJoined:{
        month:string;
        count:number;
    }[];

    statusDistribution:{
        status:string;
        count:number;
    }[];

}

export interface DashboardState{

    dashboard:DashboardData|null;

    loading:boolean;

    error:string|null;

}