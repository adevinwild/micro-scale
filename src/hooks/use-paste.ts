import { useEffect, useState } from "react";

type Props = {
  onPaste: (file: File) => void;
};
export default function usePasteFile({ onPaste }: Props) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const { items } = e.clipboardData || (window as any).clipboardData;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const blob = item.getAsFile();
          if (!blob) return;
          setFile(blob);
          onPaste(blob);
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return file;
}
