import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";
const schema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const [checkingAuth, setCheckingAuth] = useState(true);


    useEffect(() => {

        const checkAuth = async () => {

            const result = await dispatch(getProfile());

            if (getProfile.fulfilled.match(result)) {

                navigate("/dashboard", {
                    replace: true,
                });

            } else {

                setCheckingAuth(false);

            }

        };

        checkAuth();

    }, [dispatch, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setServerError(null);
        setIsSubmitting(true);

        try {
            const result = await dispatch(login(data));

            if (login.fulfilled.match(result)) {
                navigate("/dashboard");
            } else {
                // result.payload if you use rejectWithValue in the thunk, else result.error.message
                const message =
                    (result as any).payload ??
                    (result as any).error?.message ??
                    "Invalid email or password";
                setServerError(message);
            }
        } catch (err) {
            setServerError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Checking session...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-slate-100"
                noValidate
            >
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                    <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
                </div>

                {serverError && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2">
                        {serverError}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className={`border w-full p-3 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-400" : "border-slate-300"
                            }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...register("password")}
                        placeholder="••••••••"
                        className={`border w-full p-3 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-400" : "border-slate-300"
                            }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end mb-6">
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isSubmitting && (
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                    )}
                    {isSubmitting ? "Signing in..." : "Login"}
                </button>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}