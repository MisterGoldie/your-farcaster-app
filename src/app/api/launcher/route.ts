import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import CryptoJS from 'crypto-js'

export async function POST(req: NextRequest) {
  const data = await req.json()
  console.log("[launcher route.ts] - Received data:", data)
//NOTE - you might want to remove the console logs in production
  try {
    if (data.type === 'composer') {
      const validationResult = await validateComposerAction(data)
      if (!validationResult.valid) {
        return NextResponse.json({ error: validationResult.error }, { status: 400 })
      }
      // Return success response for composer action
      return NextResponse.json({ success: true }, { status: 200 })
      }
      console.log("[launcher route.ts] - Composer action validated successfully")
    // Existing code for Farcaster message validation
    const validationResult = await validateFarcasterMessage(data.trustedData.messageBytes)
    console.log("[launcher route.ts] - Attempting to validate Farcaster message")
    if (!validationResult.valid) {
      console.log("[launcher route.ts] - Validation failed")
      return NextResponse.json({ error: 'User validation failed' }, { status: 400 })
    }
      return NextResponse.json({ error: 'User validation failed' }, { status: 400 })
    // For all other cases, redirect to the main page
    const mainPageUrl = `${process.env.NEXT_PUBLIC_URL}/`
    console.log("[launcher route.ts] - Redirecting to main page:", mainPageUrl)
    return NextResponse.json({ type: "redirect", url: mainPageUrl }, { status: 200 })
    var cipheredBytes = CryptoJS.AES.encrypt(data.trustedData.messageBytes, `${process.env.AUTH_ENCRYPTION_KEY}`)?.toString()
  } catch (error: any) {
    console.error("[launcher route.ts] - Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      type: "composer",
      name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
      icon: "zap",
      description: `${process.env.NEXT_PUBLIC_APP_DESCRIPTION_SHORT}`,
      aboutUrl: `${process.env.NEXT_PUBLIC_URL}`,
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/imgUrl.png`,
      action: {
        type: "post",
      },
    },
    { status: 200 }
  )
}

async function validateFarcasterMessage(messageBytes: string) {
  const options = {
    method: "POST",
    url: "https://api.neynar.com/v2/farcaster/frame/validate",
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR_API_KEY,
      "content-type": "application/json",
    },
    data: {
      message_bytes_in_hex: messageBytes,
      cast_reaction_context: true,
      follow_context: false,
      signer_context: false,
      channel_follow_context: false,
    },
  }
  const response = await axios.request(options)
  return response.data
}

async function validateComposerAction(data: any) {
  console.log("Validating composer action:", JSON.stringify(data, null, 2));
  try {
    const requiredProps = ['name', 'description', 'action', 'cast'];
    for (const prop of requiredProps) {
      if (!data[prop]) {
        console.error(`Missing required property: ${prop}`);
        return { valid: false, error: `Missing required property: ${prop}` };
      }
    }
    if (data.action.type !== "post") {
      console.error(`Invalid action type: ${data.action.type}`);
      return { valid: false, error: "Invalid action type" };
    }
    if (!data.cast.text || !Array.isArray(data.cast.embeds)) {
      console.error("Invalid cast format:", data.cast);
      return { valid: false, error: "Invalid cast format" };
    }
    const baseUrl = `${protocol}://${host}`;
    console.log("Validation successful");
    return { valid: true };
  } catch (error) {
    console.error("Unexpected error during validation:", error);
    return { valid: false, error: "Unexpected error during validation" };
  }
}
