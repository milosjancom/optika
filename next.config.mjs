/** @type {import('next').NextConfig} */
const isPreview = process.env.PREVIEW_EXPORT === '1'

const nextConfig = {
  // Static export is only used for the shareable design preview.
  // Inside Payload this file is replaced by the template's withPayload() config.
  ...(isPreview ? { output: 'export', trailingSlash: true } : {}),
  images: { unoptimized: true },
}

export default nextConfig
