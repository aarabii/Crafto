import RetroGrid from "@/components/magicui/retro-grid";

export default function generatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RetroGrid className="-z-10 opacity-60" />
        {children}
      </body>
    </html>
  );
}
