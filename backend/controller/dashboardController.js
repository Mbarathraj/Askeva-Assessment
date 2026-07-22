import { Employee } from "../models/employee.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
    // Total Employees
    const totalEmployees = await Employee.countDocuments();

    // Employee Status Counts
    const statusCounts = await Employee.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);

    let activeEmployees = 0;
    let inactiveEmployees = 0;
    let onLeaveEmployees = 0;

    const statusDistribution = statusCounts.map((item) => {
        if (item._id === "Active") activeEmployees = item.count;
        if (item._id === "Inactive") inactiveEmployees = item.count;
        if (item._id === "On Leave") onLeaveEmployees = item.count;

        return {
            status: item._id,
            count: item.count,
        };
    });

    // Department-wise Count
    const departmentWise = await Employee.aggregate([
        {
            $group: {
                _id: "$department",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                department: "$_id",
                count: 1,
            },
        },
        {
            $sort: {
                department: 1,
            },
        },
    ]);

    // Monthly Joined Employees
    const monthlyJoined = await Employee.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$joiningDate" },
                },
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id.month": 1,
            },
        },
    ]);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;

        const found = monthlyJoined.find(
            (item) => item._id.month === month
        );

        return {
            month: monthNames[index],
            count: found ? found.count : 0,
        };
    });

    res.status(200).json({
        success: true,
        data: {
            totalEmployees,
            activeEmployees,
            inactiveEmployees,
            onLeaveEmployees,

            departmentWise,

            monthlyJoined: monthlyData,

            statusDistribution,
        },
    });
});