import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mall Genesis - NFT with Pi",
  description: "Buy NFT pake Pi coin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
      </head>
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
