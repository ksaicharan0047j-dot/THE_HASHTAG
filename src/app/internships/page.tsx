"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function InternshipsPage() {
  const router = useRouter();
  const [internships, setInternships] = useState<any[]>([]);

  useEffect(() => {
    async function loadInternships() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("category", "Internship")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setInternships(data);
      }
    }

    loadInternships();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <button onClick = {() => router.back()} className = "mb-8 px-4 py-2 rounded-full border border-white/10 bg-[#242424] transition">← Back</button>
        <h1 className="text-5xl font-black mb-4">
          Internships
        </h1>

        <p className="text-[#8a8a8a] mb-10">
          Discover internship opportunities uploaded by students and organizations.
        </p>

        <div className="grid gap-6">
          {internships.length === 0 ? (
            <div className="text-[#8a8a8a]">
              No internships available yet.
            </div>
          ) : (
            internships.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex justify-between gap-6"
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-[#8a8a8a] mt-2">
                    📍 {item.location}
                  </p>

                  <p className="mt-4">
                    {item.description}
                  </p>

                  <p className="mt-4 text-sm text-[#8a8a8a]">
                    📅 Event Date: {item.event_date}
                  </p>

                  {item.registration_deadline && (
                    <p className="mt-2 text-sm text-yellow-400">
                      ⏰ Deadline: {item.registration_deadline}
                    </p>
                  )}

                  {item.contact_number && (
                    <p className="mt-2 text-sm text-[#8a8a8a]">
                      📞 {item.contact_number}
                    </p>
                  )}

                  {item.registration_link && (
                    <a
                      href={item.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 bg-[#d9d9d9] text-black px-5 py-3 rounded-full font-semibold hover:scale-105 transition"
                    >
                      Apply
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