import { ImageResponse } from 'next/og'
import { renderSocialImage, socialFonts, socialImageSize } from '@/lib/og'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  return new ImageResponse(renderSocialImage(new URL(request.url).origin), { ...socialImageSize, fonts: await socialFonts() })
}
