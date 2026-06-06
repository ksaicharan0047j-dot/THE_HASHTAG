"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Gamepad2,
    Trophy,
    Swords,
    Circle,
    Zap,
} from "lucide-react";

export default function GamingPage() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("events");

    const tabs = [{
        id: "events",
        icon: Gamepad2,
        label: "Gaming Events",
    },
    {
        id: "pong",
        icon: Trophy,
        label: "Pong",
    },
    {
        id: "chess",
        icon: Swords,
        label: "Chess",
    },
    {
        id: "tictactoe",
        icon: Circle,
        label: "Tic Tac Toe",
    },
    {
        id: "snake",
        icon: Zap,
        label: "Snake"
    },
    ];

    return (
        <main className = "min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
            <div className = "max-w-6xl mx-auto">
                <button onClick = {() => router.back()} className = "mb-8 px-4 py-2 rounded-full border border-white/10 bg-[#242424]">← Back</button>
                    <div className = "flex md:justify-end justify-start gap-4 overflow-x-auto ph-3 w-full">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button key = {tab.id} onClick = {() => setActiveTab(tab.id)} className = {`shrink = 0 flex items-center gap-3 rounded-full border border-white/10 bg-[#1a1a1a] px-4 py-3 transition-all duration-300 ${
                                    active
                                        ? "w-56 md:w-72 justify-start"
                                        : "w-16 justify-center"
                                }`}>
                                    <Icon size = {28} />
                                    <span className = {`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                                        active
                                            ? "opacity-100"
                                            : "opacity-0 w-0"
                                    }`}>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className = "mt-12 bg-[#1a1a1a] border border-white/10 rounnded-3xl p-8">
                        {activeTab === "events" && (
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">
                                    Gaming Events
                                </h2>
                                <p className = "text-[#8a8a8a]">Gaming tournaments and esports events will apper here.</p>
                            </div>
                        )}
                        {activeTab === "pong" && (
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">Pong</h2>
                                <p className = "text-[#8a8a8a]">High Score: 0</p>
                                <button className = "mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold">Play Pong</button>
                            </div>
                        )}
                        {activeTab === "chess" && (
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">
                                    Chess
                                </h2>
                                <button className = "mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold">
                                    Play Chess
                                </button>
                            </div>
                        )}
                        {activeTab === "tictactoe" && (
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">

                                    Tic Tac Toe
                                </h2>
                                <button className = "mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold">Ply Tic Tac Toe</button>
                            </div>
                        )}
                        {activeTab === "snake" && (
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">Snake</h2>
                                <button className = "mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold">Play Snake</button>
                            </div>
                        )}
                    </div>
            </div>
        </main>
    );
}