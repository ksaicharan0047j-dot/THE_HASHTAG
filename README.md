THE

THE # is a student-focused platform designed to help students discover, share, and participate in events, workshops, hackathons, internships, competitions, gaming tournaments, and campus activities.

The platform combines event discovery, community interaction, and gaming into a single ecosystem.

---

Features

Event Management

- Upload events
- Browse events
- Workshops page
- Internships page
- Hackathons page
- Competitions page
- Meetups page
- Gaming Events page

Explore Feed

- Instagram-style content feed
- Upload images and videos
- Post captions
- Announcement posts
- Winner posts
- Trending section
- Search section

Gaming Zone

- Gaming events
- Interactive games
- Tic Tac Toe against AI
- Future support for Chess, Pong, and Snake

User System

- Authentication with Supabase
- Event publishing restricted to logged-in users
- Profile system (Work in Progress)

---

Tech Stack

Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

Backend

- Supabase

Storage

- Supabase Storage

Database

- PostgreSQL (Supabase)

---

Database Tables

events

Stores all uploaded events.

Column| Type
id| UUID
title| Text
description| Text
category| Text
location| Text
event_date| Date
registration_deadline| Date
registration_link| Text
contact_number| Text
poster_url| Text
created_by| Text

---

feed_posts

Stores Explore page posts.

Column| Type
id| UUID
user_email| Text
caption| Text
image_url| Text
media_type| Text
post_type| Text
created_at| Timestamp

---

registrations

Stores event registrations.

Column| Type
id| UUID
event_id| UUID
user_email| Text
registered_at| Timestamp

---

Installation

Clone the repository:

git clone https://github.com/ksaicharan0047j-dot/THE_HASHTAG

Move into the project:

cd the-hashtag

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

---

Environment Variables

Create a ".env.local" file:

NEXT_PUBLIC_SUPABASE_URL=sb_publishable_Y7a1nM7tPy2ygwPK5pY__g_QtIzsySt
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6aHZhZ3BmYWF4ZHphbXB0cXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzA0MzgsImV4cCI6MjA5NTM0NjQzOH0.6Q_VB0mMcLaQ1AyU3DiOwkXJVf7HO9hKEpVC5ANQx94

---

Roadmap

Completed

- Authentication
- Event Uploading
- Event Browsing
- Internship Filtering
- Workshop Filtering
- Gaming Events
- Explore Feed Uploads
- Image and Video Storage
- Tic Tac Toe AI

In Progress

- Search Feed
- Winners Feed
- Announcements Feed
- Trending Events

Future Plans

- Follow System
- Public/Private Profiles
- Event Wishlist
- Notifications
- Comments
- Likes
- Full Gaming Hub
- AI Event Recommendations

---

Project Vision

THE # aims to become a student ecosystem where users can:

- Discover opportunities
- Showcase achievements
- Share announcements
- Participate in events
- Connect with communities
- Play games
- Build their student profile

All from one platform.

---

License

MIT License

---

Built with Next.js, Supabase, and lots of caffeine.
