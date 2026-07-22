import { Employee } from "../models/employee.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getEmployees = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";
    const department = req.query.department || "";
    const status = req.query.status || "";

    const skip = (page - 1) * limit;

   
    const filter = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    if (department) {
        filter.department = department;
    }

    if (status) {
        filter.status = status;
    }

    const [employees, totalEmployees] = await Promise.all([
        Employee.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Employee.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        message: "Employees fetched successfully",

        data: employees,

        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalEmployees / limit),
            totalEmployees,
            limit,
            hasNextPage: page < Math.ceil(totalEmployees / limit),
            hasPreviousPage: page > 1,
        },
    });
});


export const createEmployee = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        department,
        designation,
        status,
        joiningDate,
        salary,
    } = req.body;

    const exists = await Employee.findOne({ email });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Employee already exists with this email",
        });
    }

    const employee = await Employee.create({
        name,
        email,
        phone,
        department,
        designation,
        status,
        joiningDate,
        salary,
    });

    res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
    });
});


export const updateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }

    const {
        name,
        email,
        phone,
        department,
        designation,
        status,
        joiningDate,
        salary,
    } = req.body;

    if (email && email !== employee.email) {
        const emailExists = await Employee.findOne({
            email,
            _id: { $ne: id },
        });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
    }

    employee.name = name ?? employee.name;
    employee.email = email ?? employee.email;
    employee.phone = phone ?? employee.phone;
    employee.department = department ?? employee.department;
    employee.designation = designation ?? employee.designation;
    employee.status = status ?? employee.status;
    employee.joiningDate = joiningDate ?? employee.joiningDate;
    employee.salary = salary ?? employee.salary;

    await employee.save();

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
    });
});


export const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }

    await employee.deleteOne();

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
    });
});


export const getEmployeeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }

    res.status(200).json({
        success: true,
        data: employee,
    });
});