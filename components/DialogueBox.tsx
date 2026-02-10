import React, { ReactNode } from "react";

interface DialogueBoxProps {
  children: ReactNode;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-2xl p-6 flex justify-center">
      <p
        className="
          text-white-soft
          text-center
          text-xl
          leading-relaxed
          break-words
          line-clamp-3
          font-extrabold
          drop-shadow-white-glow-str
        "
      >
        {children}
      </p>
    </div>
  );
};

export default DialogueBox;