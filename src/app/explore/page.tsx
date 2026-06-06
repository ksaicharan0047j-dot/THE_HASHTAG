"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  TrendingUp,
  Trophy,
  Megaphone,
} from "lucide-react";

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");

  const tabs = [
    {
      id: "search",
      icon: Search,
      label: "Search",
    },
    {
      id: "trending",
      icon: TrendingUp,
      label: "Trending",
    },
    {
      id: "winners",
      icon: Trophy,
      label: "Winners",
    },
    {
      id: "announcements",
      icon: Megaphone,
      label: "Announcements",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="
            mb-8
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-[#1a1a1a]
            hover:bg-[#242424]
            transition
          "
        >
          ← Back
        </button>

        <div className="flex md:justify-end justify-start gap-4 overflow-x-auto pb-3 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  shrink-0
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-[#1a1a1a]
                  px-4
                  py-3
                  transition-all
                  duration-300
                  ${
                    active
                      ? "w-56 md:w-72 justify-start"
                      : "w-16 justify-center"
                  }
                `}
              >
                <Icon size={28} />

                <span
                  className={`
                    whitespace-nowrap
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 w-0"
                    }
                  `}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}