"use client";

import { useContext } from "react";

import { CraftoContext } from "@/context/Context";

import { OutputCard } from "./OutputCard";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { BorderBeam } from "@/components/magicui/border-beam";

export const Output = () => {
  const { output, loading } = useContext(CraftoContext);
  return (
    <div className="relative flex min-h-[50vh] mt-2 flex-col rounded-lg bg-muted/60 backdrop-blur-sm overflow-hidden border border-primary/5">
      {loading && (
        <BorderBeam borderWidth={1.5} duration={4} className="z-10" />
      )}
      <Badge variant="outline" className="absolute top-3 right-3 z-50">
        Output
      </Badge>

      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <ul className="flex flex-col items-start justify-start space-y-12 p-16">
          {output.result.map((item, index) => (
            <OutputCard key={index} text={item.text} />
          ))}
        </ul>
      )}
    </div>
  );
};
