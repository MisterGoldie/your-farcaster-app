import { NextRequest, NextResponse } from 'next/server'
import { validateWithNeynar, createFrame } from '@/app/helpers/helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    //NOTE - only use trustedData to be sure that incoming data is true //
    const { trustedData } = body
    console.log('[home route.ts] - Trusted data:', trustedData)

    const validationResult = await validateWithNeynar(trustedData.messageBytes)

    if (!validationResult.valid) {
      return NextResponse.json({ message: "Invalid frame message" }, { status: 400 })
    }

    //NOTE - Extract relevant information from the validation result
    const { fid, verifications } = validationResult.action.interactor

    console.log('[home route.ts] - trustedData', trustedData)
    console.log('[home route.ts] - verifications', verifications)

    const generatedImage = `${process.env.NEXT_PUBLIC_URL}/api/frame/services/imggen?fid=${fid}`

    let frameHtml = await createFrame(`
      <meta property="fc:frame:image" content="${generatedImage}"/> 
      <meta property="fc:frame:button:1" content="🕹️ Play" />
      <meta property="fc:frame:button:1:action" content="post_redirect" />
      <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_URL}/api/launcher" />
    `)
    console.log('[home route.ts] - Generated Frame HTML:', frameHtml)

    return new NextResponse(frameHtml, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.log('[home route.ts] - Error processing frame:', error)
    return NextResponse.json({ message: "Error processing frame" }, { status: 400 })
  }
}
