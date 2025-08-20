// newsAggregator.js

/**
 * News Aggregator Script for Supabase
 *
 * Features:
 * - Loads and validates environment variables
 * - Fetches news from Newsdata.io API by category
 * - Connects to Supabase using @supabase/supabase-js
 * - Uses upsert() to avoid duplicate URL errors
 * - Runs daily with node-cron
 */

import dotenv from "dotenv";
import axios from "axios";
import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

// ✅ Validate required environment variables
const requiredEnv = [
  "NEWSDATA_API_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ Fetch news from Newsdata.io
async function fetchNews(category) {
  try {
    console.log(`🔎 Fetching ${category} news...`);

    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: process.env.NEWSDATA_API_KEY,
        category,
        language: "en",
      },
    });

    if (!response.data || !response.data.results) {
      console.error("⚠️ No results returned from API.");
      return [];
    }

    // Map API results into our DB schema
    return response.data.results.map((article) => ({
      id: crypto.randomUUID(), // Ensure unique UUID for Supabase PK
      title: article.title || "Untitled",
      description: article.description || "",
      url: article.link,
      image_url: article.image_url || null,
      source: article.source_id || "Unknown",
      category: category,
      published_at: article.pubDate
        ? new Date(article.pubDate).toISOString()
        : new Date().toISOString(),
      created_at: new Date().toISOString(),
    }));
  } catch (error) {
    console.error(`❌ Error fetching news for ${category}:`, error.message);
    return [];
  }
}

// ✅ Save news to Supabase (with upsert to prevent duplicates)
async function saveNewsToSupabase(articles) {
  if (!articles.length) {
    console.log("⚠️ No articles to save.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("news_articles")
      .upsert(articles, { onConflict: "url" });

    if (error) throw error;

    console.log(`✅ Saved ${articles.length} articles to Supabase.`);
    return data;
  } catch (error) {
    console.error("❌ Error saving articles to Supabase:", error.message);
  }
}

// ✅ Run aggregation for multiple categories
async function runAggregator() {
  console.log("🚀 Starting News Aggregation...");

  const categories = ["business", "technology", "crypto", "world"]; // Add more if needed

  for (const category of categories) {
    const articles = await fetchNews(category);
    await saveNewsToSupabase(articles);
  }

  console.log("🎉 News aggregation completed.");
}

// ✅ Schedule the job (runs every day at 06:00 AM server time)
cron.schedule("0 6 * * *", async () => {
  console.log("⏰ Running scheduled news aggregation...");
  await runAggregator();
});

// ✅ Run immediately when script starts
runAggregator();
