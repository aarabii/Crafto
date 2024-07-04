import { Footer } from "./_components/Footer";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
