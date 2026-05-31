"use client";

import Link from "next/link";
import {useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [otherRole, setOtherRole] = useState("");
    const [gender, setGender] = useState("");
    const [college, setCollege] = useState("");
    const [instagram, setInstagram] = useState("");
    const [profileExists, setProfileExists] = useState(false);
    const [loading, setLoading] = useState(true);

    async function checkProfile() {
        const{ data: {user},} = await supabase.auth.getUser();

        if(!user){
            router.push("/login");
            return;
        }
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if(data){
            setProfileExists(true);
            setFullName(data.full_name);
            setRole(data.role);
            setOtherRole(data.other_role || "");
            setGender(data.gender);
            setCollege(data.college);
            setInstagram(data.instagram || "");
        }
        setLoading(false);
    }
    useEffect(() => {
        checkProfile();
    }, []);

    if(loading) {
        return(
            <main className = "min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">Loading...</main>
        );
    }

    if(profileExists){
        return(
            <main className = "min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
                <div className = "max-w-4xl mx-auto">
                    <button onClick = {() => router.push("/")} className = "text-[#8a8a8a] hover:text-white mb-8">← Back to Home</button>
                    <div className = "bg-[#1a1a1a] border border-white/10 rounded-4xl p-8">
                        <div className = "flex flex-col items-center text-center">
                            <div className = "w-28 h-28 rounded-full bg-[#d9d9d9] text-black flex items-center justify-center text-5xl font-bold mb-5">
                                👤
                            </div>
                            <h1 className = "text-4xl font-black">
                                {fullName}
                            </h1>
                            <p className = "text-[#8a8a8a] mt-2">{role}</p>
                            <p className = "text-[#8a8a8a]">{college}</p>
                            {instagram && (
                                <p className = "mt-4">@{instagram}</p>
                            )}
                        </div>
                    </div>
                    <div className = "grid gap-6 mt-8">
                        <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
                            ❤️ Wishlist
                        </div>
                        <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">Registered Events</div>
                        <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">Recently Viewed</div>
                        <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">Certificates</div>
                    </div>
                </div>
            </main>
        );
    }

    async function saveProfile() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if(!user) {
            alert("Please login first");
            return;
        }
        const { error } = await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            full_name: fullName,
            role,
            other_role: role === "Other" ? otherRole : null,
            gender,
            college,
            instagram,
        });
        if(error) {
            alert(error.message);
            return;
        }
        alert("Profile created");
        router.push("/");
    }
    return(<main className = "min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6 py-20">
            <div className = "w-full max-w-xl bg-[#1a1a1a] border border-white/10 rounded-4xl p-8">
                <Link href = "/" className = "inline-flex items-center gap-2 text-[#8a8a8a] hover:text-white mb-8">← Back to Home</Link>
                <h1 className = "text-4xl font-back mb-2">Complete Profile</h1>
                <p className = "text-[#8a8a8a] mb-8">Tell us a little about yourself.</p>
                <div className = "space-y-5">
                    <input
                    type = "text"
                    placeholder = "Full Name"
                    value = {fullName}
                    onChange = {(e) => setFullName(e.target.value)}
                    />
                    <select 
                        value = {role}
                        onChange = {(e) => setRole(e.target.value)}
                        className = "w-full p-4 rounded-xl bg-[#242424] border-white/10">
                            <option value = "">Select Role</option>
                            <option>Student</option>
                            <option>college Staff</option>
                            <option>Faculty</option>
                            <option>Club Lead</option>
                            <option>Event Organizer</option>
                            <option>Other</option>
                        </select>
                        {role === "Other" && (
                            <input
                                type = "text"
                                placeholder="Describe your role"
                                value = {otherRole}
                                onChange = {(e) => setOtherRole(e.target.value)}
                                className = "w-full p-4 rounded-xl bg-[#242424] border border-white/10"/>
                        )}
                        <select
                            value = {gender}
                            onChange = {(e) => setGender(e.target.value)}
                            className="w-full p-4 rounded-xl bg-[#242424] border border-white/10">
                                <option value = "">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to say</option>
                            </select>
                            <input 
                                type = "text"
                                placeholder="College Name"
                                value = {college}
                                onChange = {(e) => setCollege(e.target.value)}
                                className = "w-full p-4 rounded-xl bg-[#242424] border border-white/10"/>
                                <input
                                    type = "text"
                                    placeholder="Instagram Username (optional)"
                                    value={instagram}
                                    onChange = {(e) => setInstagram(e.target.value)}
                                    className = "w-full p-4 rounded-xl bg-[#242424] border border-white/10"/>
                                    <button onClick = {saveProfile} className = "w-full bg-white text-black py-4 rounded-full font-semibold hover:opacity-90 transition">Complete Profile</button>
                </div>
            </div>
           </main>);
}