"use client";
import { useEffect, useState} from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0f0f0f]/70 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">

            THE #

          </h1>

          <div className="hidden md:flex items-center gap-10 text-sm text-[#8a8a8a]">

            <button className="hover:text-white transition">
              Explore
            </button>

            <button className="hover:text-white transition">
              Events
            </button>

            <button className="hover:text-white transition">
              Internships
            </button>

            <button className="hover:text-white transition">
              Workshops
            </button>

          </div>
         {user ? (
          <Link href = "/profile">
            <button className = "w-12 h-12 rounded-full bg-[#d9d9d9] text-black text-xl font-bold flex items-center justify-center hover:scale-110 transition">
              👤
            </button>
          </Link>
         ) : (
          <Link href = "/login">
            <button className = "bg-[#d9d9d9] text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
              Login
            </button>
          </Link>
         )}

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="pt-28 md:pt-36">

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* LEFT SECTION */}

          <div className="bg-[#d9d9d9] text-black rounded-b-[40px] lg:rounded-none lg:rounded-r-[70px] flex flex-col justify-center px-8 md:px-16 py-20">

            <p className="uppercase tracking-[6px] text-sm text-black/60 mb-6">

              Student Powered Platform

            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">

              Discover
              <br />
              Events.
              <br />
              Opportunities.
              <br />
              Communities.

            </h1>

            <p className="mt-8 text-black/70 text-base md:text-lg leading-relaxed max-w-xl">

              THE # is a student-powered platform where anyone can upload workshops, hackathons, gaming events, internships, meetups and opportunities happening around Hyderabad.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <button className="bg-black text-white px-7 py-4 rounded-full font-medium hover:scale-105 transition duration-300">

                Explore Events

              </button>

              <button className="border border-black px-7 py-4 rounded-full font-medium hover:bg-black hover:text-white transition duration-300">

                Upload Event

              </button>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center px-6 md:px-8 py-12 md:py-12">

            {/* GLOW */}

            <div className="absolute w-87.5 h-87.5 bg-white/5 rounded-full blur-3xl top-0 right-0" />

            <div className="absolute w-62.5 h-62.5 bg-white/5 rounded-full blur-3xl bottom-0 left-0" />

            {/* FLOATING CATEGORY UI */}

            <div className = "hidden md:block relative w-full max-w-2xl h-162.5">
                {/*Internships*/}
                <button className = "absolute top-12 left-12 w-60 h-60 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center text-center shadow-[0_0_80px_rgba(255,255,255,0.14)] transition duration-500">
                    <div>
                        <p className = "text-[#8a8a8a] text-sm uppercase tracking-[4px]">Featured</p>
                        <h2 className = "text-3xl font-black mt-3 leading none">Internships</h2>
                    </div>
                </button>
                {/*GAMING*/}
                <button className = "absolute top-56 right-6 w-64 h-64 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-center shadow-[0_0_90px_rgba(255,255,255,0.16)] transition duration-500">
                    <div>
                        <p className = "text-[#8a8a8a] text-sm">Live</p>
                        <h2 className = "text-5xl font-black mt-3 leading-tight">Gaming<br />Arena</h2>
                    </div>
                </button>
                {/*WORKSHOPS*/}
                <button className = "absolute top-80 left-4 bg-[#202020] border border-white/10 rounded-full px-8 py-6 hover:scale-105 hover:bg-[#2a2a2a] transition duration-500">
                    <h3 className = "text-2xl font-bold">Workshops</h3>
                </button>
                {/*COMMUNITIES*/}
                <button className = "absolute top-32 right-0 bg-[#202020] border border-white/10 rounded-full px-7 py-5 hover:scale-105 hover:bg-[#2a2a2a] transition duration-500">
                    <h3 className = "text-xl font-semibold">Communities</h3>
                </button>
                {/*HACKATHONS*/}
                <button className = "absolute bottom-10 left-8 bg-[#202020] border border-white/10 rounded-full px-9 py-7 hover:scale-105 hover:bg-[#2a2a2a] transition duration-500">
                    <h3 className = "text-2xl font-bold">Hackathons</h3>
                </button>
                {/*COMPETITIONS*/}
                <button className = "absolute bottom-36 left-44 bg-[#202020] border border-white/10 rounded-full px-7 py-5 hover:scale-105 hover:bg-[#2a2a2a] transition duration-500">
                    <h3 className = "text-xl font-semibold">Competitions</h3>
                </button>
                {/*MEETUPS*/}
                <button className = "absolute bottom-12 right-10 bg-[#202020] border border-white/10 rounded-full px-7 py-5 hover:scale-105 hover:bg-[#2a2a2a] transition duration-500">
                    <h3 className = "text-xl font-semibold">Meetups</h3>
                </button>
            </div>
            {/*MOBILE CATEGORY UI*/}
            <div className = "md:hidden w-full flex flex-col gap-5">
              <button className = "w-full h-28 rounded-full bg-[#242424] border border-white/10 text-3xl font-black shadow-[0_0_40px_rgba(255,255,255,0.08)]">Internships</button>
              <button className = "w-full h-28 rounded-full bg-[#242424] border border-white/10 text-3xl font-black shadow-[0_0_50px_rgba(255,255,255,0.12)]"> Gaming</button>
              <button className = "w-full h-20 rounded-full bg-[#202020] border border-white/10 text-xl font-semibold">Workshops</button>
              <button className = "w-full h-20 rounded-full bg-[#202020] border border-white/10 text-xl font-semibold">Hackathons</button>
              <button className = "w-full h-20 rounded-full bg-[#202020] border border-white/10 text-xl font-semibold">Competitions</button>
              <button className = "w-full h-20 rounded-full bg-[#202020] border border-white/10 text-xl font-semibold">Communities</button>
              <button className = "w-full h-20 rounded-full bg-[#202020] border border-white/10 text-xl font-semibold">Meetups</button> 
            </div>

          </div>

        </div>

      </section>

      {/* TRENDING SECTION */}

      <section className="px-6 md:px-12 py-24">

        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="uppercase tracking-[5px] text-sm text-[#8a8a8a]">

              Discover

            </p>

            <h2 className="text-4xl md:text-6xl font-black mt-3 tracking-tight">

              Trending Updates

            </h2>

          </div>

          <button className="hidden md:block border border-white/10 px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black transition duration-300">

            View All

          </button>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* EVENT CARD */}

          <div className="bg-[#1a1a1a] rounded-[36px] overflow-hidden border border-white/10 hover:border-white/20 transition duration-300 group">

            <div className="h-64 bg-[#242424] relative overflow-hidden flex items-center justify-center">

              <div className="absolute w-44 h-44 rounded-full border border-white/10 group-hover:scale-110 transition duration-500" />

              <h3 className="text-4xl font-black text-center leading-tight px-6">

                Student
                <br />
                Events

              </h3>

            </div>

            <div className="p-6">

              <div className="flex justify-between text-sm text-[#8a8a8a]">

                <span>Venue / Online</span>
                <span>Open</span>

              </div>

              <button className="mt-8 bg-[#d9d9d9] text-black px-5 py-3 rounded-full text-sm font-semibold hover:scale-105 transition duration-300">

                Explore

              </button>

            </div>

          </div>

          {/* INTERNSHIP CARD */}

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-linear-to-b from-[#242424] to-[#1a1a1a] shadow-[0_0_60px_rgba(255,255,255,0.08)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] transition duration-500">

            <div className="absolute w-75 h-75 bg-white/10 rounded-full blur-3xl -top-20 -right-20" />

            <div className="relative p-8 min-h-105 flex flex-col justify-between">

              <div>

                <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold">

                  Featured

                </span>

                <h3 className="text-5xl md:text-6xl font-black leading-none mt-8">

                  Internships

                </h3>

                <p className="text-[#b0b0b0] mt-5 text-lg leading-relaxed">

                  Explore startup roles, remote internships and student opportunities.

                </p>

              </div>

              <button className="mt-10 bg-[#d9d9d9] text-black py-4 rounded-full font-semibold hover:scale-[1.02] transition duration-300 text-lg">

                Explore Internships

              </button>

            </div>

          </div>

          {/* GAMING CARD */}

          <div className="relative bg-[#1a1a1a] rounded-[36px] overflow-hidden border border-white/10 hover:border-white/20 transition duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.05)]">

            <div className="absolute w-60 h-60 bg-white/5 rounded-full blur-3xl -top-10 right-0" />

            <div className="h-64 bg-[#242424] relative overflow-hidden flex items-center justify-center">

              <div className="absolute w-44 h-44 rounded-full border border-white/10 group-hover:scale-110 transition duration-500" />

              <h3 className="text-4xl font-black text-center leading-tight px-6">

                Gaming
                <br />
                Arena

              </h3>

            </div>

            <div className="p-6">

              <div className="flex justify-between text-sm text-[#8a8a8a]">

                <span>Online Matches</span>
                <span>Live</span>

              </div>

              <button className="mt-8 bg-[#d9d9d9] text-black px-5 py-3 rounded-full text-sm font-semibold hover:scale-105 transition duration-300">

                Play

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-5">

        <div>

          <h2 className="text-2xl font-black">

            THE #

          </h2>

          <p className="text-[#8a8a8a] text-sm mt-2">

            Student Powered Discovery Platform

          </p>

        </div>

        <div className="flex items-center gap-6 text-sm text-[#8a8a8a]">

          <button className="hover:text-white transition">
            Instagram
          </button>

          <button className="hover:text-white transition">
            Discord
          </button>

          <button className="hover:text-white transition">
            LinkedIn
          </button>

        </div>

      </footer>

    </main>
  )
}