import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { useLanguage } from '../components/context/LanguageContext';
import { FaLongArrowAltLeft } from "react-icons/fa";

// ── API URL ───────────────────────────────────────────────────────────────────
// In development:  set VITE_API_URL in your frontend .env → http://localhost:5000
// In production:   set VITE_API_URL to your deployed backend URL
//                  e.g. https://your-backend.onrender.com
//
// Your frontend .env (inside /src or project root) should contain:
//   VITE_API_URL=http://localhost:5000
const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/contact`
    : 'http://localhost:5000/api/contact';

const INITIAL_FORM = { name: '', email: '', tel: '', message: '' };

const Contact = () => {
    const { t } = useLanguage();

    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [serverError, setServerError] = useState('');

    // ── Field change ─────────────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear individual field error on change
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // ── Client-side validation ───────────────────────────────────────────────
    const validate = () => {
        const next = {};
        if (!form.name.trim())    next.name    = 'Name is required.';
        if (!form.email.trim())   next.email   = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                  next.email   = 'Enter a valid email.';
        if (!form.tel.trim())     next.tel     = 'Phone number is required.';
        if (!form.message.trim()) next.message = 'Message is required.';
        return next;
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('loading');
        setServerError('');

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setForm(INITIAL_FORM);
        } catch (err) {
            setStatus('error');
            // Give a clearer message for the "server not running" case
            if (err.message === 'Failed to fetch') {
                setServerError('Could not reach the server. Make sure the backend is running.');
            } else {
                setServerError(err.message || 'Failed to send. Please try again.');
            }
        }
    };

    const inputBase =
        'pl-3 pr-8 py-2 border rounded-md bg-transparent text-(--text-light) outline-none transition-colors focus:border-blue-500';

    return (
        <MainLayout>
            <div className='border border-(--border-light) w-full py-4 px-4 sm:px-6 flex flex-col'>

                <p className='text-xs'>
                    Kry-Rithisak<span className='text-(--text-gray)'> / </span>Contact
                    <span className='text-(--text-gray)'>.jsx</span>
                </p>

                {/* ── Success banner ── */}
                {status === 'success' && (
                    <div className='mt-6 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-md text-green-400 text-sm'>
                        ✅ Message sent! I'll get back to you soon.
                    </div>
                )}

                {/* ── Server error banner ── */}
                {status === 'error' && serverError && (
                    <div className='mt-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm'>
                        ❌ {serverError}
                    </div>
                )}

                <form className='flex flex-col gap-8 my-8' onSubmit={handleSubmit} noValidate>

                    {/* Name */}
                    <div className='flex flex-col gap-1.5'>
                        <label>{t('contact')?.name}<span className='text-red-500'> *</span></label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`${inputBase} ${errors.name ? 'border-red-500' : 'border-(--border-light)'}`}
                        />
                        {errors.name && <p className='text-xs text-red-400'>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-1.5'>
                        <label>{t('contact')?.email}<span className='text-red-500'> *</span></label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`${inputBase} ${errors.email ? 'border-red-500' : 'border-(--border-light)'}`}
                        />
                        {errors.email && <p className='text-xs text-red-400'>{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className='flex flex-col gap-1.5'>
                        <label>{t('contact')?.tel}<span className='text-red-500'> *</span></label>
                        <input
                            type="tel"
                            name="tel"
                            value={form.tel}
                            onChange={handleChange}
                            className={`${inputBase} ${errors.tel ? 'border-red-500' : 'border-(--border-light)'}`}
                        />
                        {errors.tel && <p className='text-xs text-red-400'>{errors.tel}</p>}
                    </div>

                    {/* Message */}
                    <div className='flex flex-col gap-1.5'>
                        <label>{t('contact')?.message}<span className='text-red-500'> *</span></label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className={`${inputBase} h-28 resize-none ${errors.message ? 'border-red-500' : 'border-(--border-light)'}`}
                        />
                        {errors.message && <p className='text-xs text-red-400'>{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className='w-36 bg-(--sucess) text-white font-semibold py-2 px-4 rounded-md
                                   hover:bg-(--sucess-hover) transition-colors disabled:opacity-60
                                   disabled:cursor-not-allowed cursor-pointer'
                    >
                        {status === 'loading' ? 'Sending…' : t('contact')?.submit}
                    </button>

                    <div className='flex gap-4 text-(--text-gray) items-center'>
                        <FaLongArrowAltLeft size={24} />
                        <p className='text-(--text-light)'>{t('contact')?.tip}</p>
                    </div>

                </form>
            </div>
        </MainLayout>
    );
};

export default Contact;