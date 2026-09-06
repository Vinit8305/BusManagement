import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Apne firebase file ka sahi relative path rakhein
import { useNavigate, Link } from "react-router-dom";
import { Bus, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const token = await user.getIdToken();
            localStorage.setItem("adminToken", token);
            localStorage.setItem("adminEmail", user.email || "");

            navigate("/dashboard");
        } catch (err: any) {

            // User-friendly Error Messages
            if (
                err.code === "auth/invalid-credential" ||
                err.code === "auth/user-not-found" ||
                err.code === "auth/wrong-password"
            ) {
                setError("Invalid Emain and Password");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter the valid email");
            } else if (err.code === "auth/too-many-requests") {
                setError("You have attempt many time . Try after some time! ");
            } else {
                setError("Please check the internet connection");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-600/30 mb-4">
                        <Bus className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">FleetTrack PRO</h1>
                    <p className="text-slate-400 text-sm mt-1">Bus Management Admin Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-slate-100 mb-6">Admin Sign In</h2>

                    {/* Error Alert Box */}
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-6 flex items-center gap-3 text-rose-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@gmail.com"
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verifying Credentials...</span>
                                </>
                            ) : (
                                <span>Sign In to Dashboard</span>
                            )}
                        </button>
                    </form>

                    {/* Navigation Link to Sign Up Page */}
                    <div className="mt-6 text-center pt-4 border-t border-slate-800/80">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline underline-offset-4"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Footnote */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    Bus Management System
                </p>
            </div>
        </div>
    );
}
export default Login;