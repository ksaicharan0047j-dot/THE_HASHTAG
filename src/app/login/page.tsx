"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    async function sendOtp() {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if(error) {
            alert(error.message);
            return;
        }
        alert("OTP sent to your email");
        setShowOtp(true);
    }
    async function verifyOTP() {
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });
        if(error){
            alert(error.message);
            return;
        }
        alert("Login Successful👍")
        router.push("/");
    }
    return (
        <main className = "min-h-screen flex items-center justify-center bg-[#111] text-white">
            <div className = "w-full max-w-md p-8 bg-[#1a1a1a] rounded-3xl">
                <h1 className = "text-4xl font-bold mb-6">Login</h1>
                <input 
                type = "email"
                placeholder = "Enter Email"
                className = "w-full p-4 rounded-xl bg-[#222] mb-4"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                {!showOtp ? (
                    <button 
                    onClick = {sendOtp}
                    className = "w-full bg-white text-black py-4 rounded-xl font-bold">
                        Send OTP
                    </button>
                ) : (
                    <>
                    <input 
                    type = "text"
                    placeholder = "ENTER OTP"
                    className = "w-full p-4 rounded-xl bg-[#222] mt-4"
                    value = {otp}
                    onChange = {(e) => setOtp(e.target.value)}
                    />
                    <button 
                    onClick = {verifyOTP}
                    className = "w-full bg-white text-black py-4 rounded-xl font-bold">
                        Verify OTP
                    </button>
                    </>
                )}
            </div>
        </main>
    );
}