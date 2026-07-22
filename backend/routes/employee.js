import { Router } from "express";
import {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getEmployees,
} from "../controller/employeeController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.post("/", createEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export const employeeRoutes = router