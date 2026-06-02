"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function loadEvents() {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });

        if(!error && data) {
          setEvents(data);
        }
    }
    loadEvents();
  }, []);

  return (
    <main className = "min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <h1 className = "text-5xl font-black mb-10">Events</h1>
        <div className = "grid gap-6">
          {events.map((event) => (
            <div key = {event.id} className = "bg-[#1a1a1a] p-6 rounded-3xl border border-white/10">
              <h2 className = "text-2xl font-bold">
                {event.title}
              </h2>
              <p className = "text-[#8a8a8a] mt-2">{event.category}</p>
              <p className = "mt-4">{event.description}</p>
              <p className = "mt-4 text-sm text-[#8a8a8a]">{event.location}</p>
              <p className = "text-sm text-[#8a8a8a]">{event.event_date}</p>
            </div>
          ))}
        </div>
    </main>
  );
}