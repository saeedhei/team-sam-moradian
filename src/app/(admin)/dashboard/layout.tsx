import { TRPCProvider } from '@/providers/trpc-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body style={{ margin: 0, fontFamily: 'Tahoma' }}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
