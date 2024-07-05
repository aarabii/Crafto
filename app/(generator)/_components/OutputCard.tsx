import { Copy } from "./Copy";

export const OutputCard = ({ text }: { text: string }) => {
  return (
    <li className="w-full text-base border border-primary/20 rounded-md p-4 relative bg-background">
      {text}
      <span className="absolute top-[99%] right-0">
        <Copy result={text} />
      </span>
    </li>
  );
};
