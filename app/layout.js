export const metadata = {
  title: 'Oddwork Mailgenerator',
  description: 'AI-driven säljmailgenerator baserad på 44 609 analyserade mail',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
