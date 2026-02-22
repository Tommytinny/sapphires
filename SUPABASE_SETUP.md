# Supabase Setup Guide

## Steps to Connect Supabase

### 1. Create a Supabase Project
- Go to [https://app.supabase.com](https://app.supabase.com)
- Sign up/Login with your account
- Create a new project
- Wait for the project to initialize

### 2. Create the Raids Table
In the Supabase dashboard, go to the SQL Editor and run this query:

```sql
CREATE TABLE raids (
  id BIGSERIAL PRIMARY KEY,
  project_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'completed')),
  progress INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  retweets INTEGER NOT NULL DEFAULT 0,
  comments INTEGER NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP,
  estimated_end TIMESTAMP,
  twitter_link TEXT,
  duration TEXT,
  package TEXT,
  chain_id TEXT,
  token_address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX idx_raids_created_at ON raids(created_at DESC);
```

### 3. Get Your Credentials
- Go to Settings > API in your Supabase project
- Copy your **Project URL** and **Anon/Public API Key**

### 4. Set Environment Variables
Create a `.env.local` file in your project root (or rename `.env.example` to `.env.local`):

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Enable Row Level Security (Optional but Recommended)
If you want to add authentication:
- Go to Authentication in Supabase
- Set up email/password or OAuth providers
- Enable RLS on the raids table
- Create policies for your use case

### 6. Restart Your Dev Server
```bash
npm run dev
```

The app will now use Supabase for data persistence. If Supabase is not configured, it will fall back to demo data.

## Features
- ✅ Real-time updates using Supabase subscriptions
- ✅ Automatic sync across tabs/windows
- ✅ Persistent data storage
- ✅ Fallback to demo data if Supabase is not connected

### 3. Create the Bookings Table
Run this in the SQL Editor to create the bookings table for storing raid booking requests:

```sql
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  project_name TEXT NOT NULL,
  twitter_handle TEXT NOT NULL,
  community_link TEXT NOT NULL,
  package TEXT NOT NULL,
  contact TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
```

## Seeding Example

If you'd like to seed the `raids` table with example rows, run this in the SQL editor. It uses proper TIMESTAMP values for `started_at` and `estimated_end`.

```sql
-- Example seed rows for raids
INSERT INTO raids (project_name, status, progress, likes, retweets, comments, engagements, started_at, estimated_end, twitter_link, duration, package, chain_id, token_address)
VALUES
  (
    'Demo Project Alpha',
    'active',
    25,
    1200,
    300,
    80,
    1680,
    NOW() - INTERVAL '22 minutes',
    NOW() + INTERVAL '2 days',
    'https://twitter.com/demo_alpha',
    '48 hours',
    'standard',
    '1',
    '0x1234567890abcdef1234567890abcdef12345678'
  ),
  (
    'Demo Project Beta',
    'completed',
    100,
    5400,
    1200,
    300,
    6900,
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '1 day',
    'https://twitter.com/demo_beta',
    '6 days',
    'premium',
    '1',
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
  );

-- Verify inserted rows
SELECT * FROM raids ORDER BY created_at DESC LIMIT 10;
```
