import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405 }
    )
  }

  try {
    const { projectName, twitterHandle, communityLink, package: pkg, contact } = await req.json()

    if (!projectName || !twitterHandle || !communityLink || !pkg || !contact) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      )
    }

    const message = `
🚀 New Booking Request

Project: ${projectName}
Twitter: ${twitterHandle}
Community: ${communityLink}
Package: ${pkg}
Contact: ${contact}
`

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${Deno.env.get("TELEGRAM_BOT_TOKEN")}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: Deno.env.get("TELEGRAM_CHAT_ID"),
          text: message,
        }),
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram error:", errorData)

      return new Response(
        JSON.stringify({ error: "Failed to send Telegram message" }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
})