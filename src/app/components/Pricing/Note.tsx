import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteProps {
  children: React.ReactNode;
  asteriskAmount?: number;
}

export const Note = ({ children, asteriskAmount = 1 }: NoteProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        "bg-gradient-dark-purple border border-neutral-70",
        "text-(length:--font-size-body-2) text-neutral-20",
        "my-6",
      )}
    >
      <div className="flex gap-1 pt-0.5">
        {asteriskAmount >= 1 && <Asterisk className="w-3 h-3 text-[#a821ff]" />}
        {asteriskAmount >= 2 && <Asterisk className="w-3 h-3 text-[#a821ff]" />}
        {asteriskAmount >= 3 && <Asterisk className="w-3 h-3 text-[#a821ff]" />}
      </div>
      <div>{children}</div>
    </div>
  );
};
