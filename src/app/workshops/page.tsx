"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function WorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<any[]>([]);

  useEffect(() => {
    async function loadWorkshops() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("category", "Workshop")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setWorkshops(data);
      }
    }

    loadWorkshops();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-[#242424] transition"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-black mb-4">
          Workshops
        </h1>

        <p className="text-[#8a8a8a] mb-10">
          Discover workshops uploaded by students and organizations.
        </p>

        <div className="grid gap-6">
          {workshops.length === 0 ? (
            <div className="text-[#8a8a8a]">
              No workshops available yet.
            </div>
          ) : (
            workshops.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex justify-between gap-6"
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-[#8a8a8a] mt-2">
                    {item.location}
                  </p>

                  <p className="mt-4">
                    {item.description}
                  </p>

                  <p className="mt-4 text-sm text-[#8a8a8a]">
                    Event Date: {item.event_date}
                  </p>

                  {item.registration_deadline && (
                    <p className="mt-2 text-sm text-yellow-400">
                      Deadline: {item.registration_deadline}
                    </p>
                  )}

                  {item.contact_number && (
                    <p className="mt-2 text-sm text-[#8a8a8a]">
                      {item.contact_number}
                    </p>
                  )}

                  {item.registration_link && (
                    <a
                      href={item.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 bg-[#d9d9d9] text-black px-5 py-3 rounded-full font-semibold hover:scale-105 transition"
                    >
                      Register
                    </a>
                  )}
                </div>

                {item.poster_url && (
                  <img
                    src={item.poster_url}
                    alt={item.title}
                    className="w-48 h-48 object-cover rounded-2xl"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}