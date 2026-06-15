export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  )
        }
