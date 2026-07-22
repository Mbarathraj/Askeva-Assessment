import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      enum: [
        "HR",
        "IT",
        "Finance",
        "Sales",
        "Marketing",
        "Operations",
        "Support",
      ],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },

    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);


employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ name: "text", email: "text" });

export const Employee = mongoose.model("Employee", employeeSchema);