import { FC } from "react";

import { GeistMono } from "geist/font/mono";

import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

export const SelectItemContent = ({
  IconComponent,
  name,
  size,
}: {
  IconComponent?: FC<IconProps>;
  name: string;
  size?: string;
}) => {
  return (
    <div className="flex items-start gap-3 text-muted-foreground">
      {IconComponent && <IconComponent className="size-5" />}
      <p className={cn(GeistMono, "font-mono")}>
        <span className={"text-foreground font-sans font-medium mr-2"}>
          {name}
        </span>
      </p>
      {size}
    </div>
  );
};
