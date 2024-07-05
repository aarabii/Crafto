import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export const Copy = ({ result }: { result: string }) => {
  const [label, setLabel] = useState<string>("copy");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleClick = () => {
    copyToClipboard(result);
    setLabel("copied!");
    setTimeout(() => {
      setLabel("copy");
    }, 1500);
  };
  return (
    <Button
      variant="outline"
      className="text-sm text-muted-foreground bg-background my-0 h-auto rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:bg-primary hover:text-primary-foreground pb-0.5 pt-0"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
