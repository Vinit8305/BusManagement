import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Bus, Lock, Mail, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const singin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (password.length < 6) {
            setError('Password must be containe the 6 characters.');
            return;
        }

        setLoading(true);

        try {
            // 1. Firebase Auth se Account Create Karein
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Token save karein LocalStorage me
            const token = await user.getIdToken();
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminEmail', user.email || '');

            setSuccessMsg('Account created successfully ');

            // 3. Direct Dashboard par navigate karein
            setTimeout(() => {
                navigate('/dashboard');
            }, 1200);

        } catch (err: any) {
            console.error("Sign Up Error:", err);

            if (err.code === 'auth/email-already-in-use') {
                setError('This Email has already taken ! try new');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter the valid email');
            } else if (err.code === 'auth/weak-password') {
                setError('Password must be contain the 6 characters');
            } else {
                setError('Somthing is wrong please try again'); 
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
                    <p className="text-slate-400 text-sm mt-1">Bus Management Admin Registration</p>
                </div>

                {/* Card Container */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-slate-100 mb-6">Create Admin Account</h2>

                    {/* Error Alert */}
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-6 flex items-center gap-3 text-rose-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Alert */}
                    {successMsg && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-6 flex items-center gap-3 text-emerald-400 text-sm">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-5">

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@fleettrack.com"
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
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <span>Sign Up</span>
                            )}
                        </button>
                    </form>

                    {/* Navigation Link to Login Page */}
                    <div className="mt-6 text-center pt-4 border-t border-slate-800/80">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline underline-offset-4"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Security Footnote */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    FleetTrack PRO Bus Management System
                </p>

            </div>
        </div>
    );
}
export default singin;