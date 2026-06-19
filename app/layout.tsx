import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'NFT Social',
  description: 'Pi NFT App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head/>
      <body>{children}</body>
     {/* Pi SDK taruh paling bawah */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.addEventListener('load', function() {
        if (window.Pi) {
          window.Pi.init({ version: "2.0", appId: "nft-social-testnet", sandbox: false });
        }
      });
    `
  }}
/>
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
    </html>
  )
}
