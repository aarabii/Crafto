"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to Crafto</h1>
      <p>
        Crafto-Gram helps you create unique and engaging Instagram bios and
        descriptions with ease.
      </p>
      <Button onClick={() => router.push("/create")}>Get Started</Button>
    </div>
  );
}
