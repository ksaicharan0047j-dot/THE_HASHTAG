"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Event");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");

  async function publishEvent() {
    const { data: { user },} = await supabase.auth.getUser();

    if(!user) {
      alert("Please ligin first");
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          category,
          location,
          event_date: eventDate,
          registration_link : registrationLink,
          created_by: user?.email,
        },
      ]);
      if(error) {
        alert(error.message);
        return;
      }
      alert("Event Published Successfully");
      
      setTitle("");
      setDescription("");
      setLocation("");
      setEventDate("");
      setRegistrationLink("");

      router.push("/");
  }
  return (
    <main className = "min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <div className = "max-w-3xl mx-auto">
        <h1 className = "text-5xl font-black mb-10">Upload Event</h1>
        <div className = "sapce-y-5">
          <input
            type = "text"
            placeholder = "Event Title"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
            className = "w-full bf-[#1a1a1a] border border-white/10 rounded-2xl p-4"
            />

            <textarea
            placeholder = "Event Description"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
            rows = {6}
            className = "w-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-4"
            />

            <select
              value = {category}
              onChange = {(e) => setCategory(e.target.value)}
              className = "w-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-4"
              >
                <option>Event</option>
                <option>Workshop</option>
                <option>InternShip</option>
                <option>Hackathon</option>
                <option>Meetup</option>
                <option>Gaming</option>
                <option>Competition</option>
              </select>
              <input
                type ="text"
                placeholder = "Location"
                value = {location}
                onChange = {(e) => setLocation(e.target.value)}
                className = "w-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-4"
              />
              <input
                type = "date"
                placeholder = "Event Date"
                value = {eventDate}
                onChange = {(e) => setEventDate(e.target.value)}
                className = "w-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-4"
              />
              <input
                type = "text"
                placeholder = "Registration Link"
                value = {registrationLink}
                onChange = {(e) => setRegistrationLink(e.target.value)}
                className = "w-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-4"
              />
              <button
                onClick = {publishEvent}
                className = "w-full bg-[#d9d9d9] text-black py-4 rounded-full font-bold hover:scale-[1.2] transtition">Publish Event</button>
        </div>
      </div>
    </main>
  )

}