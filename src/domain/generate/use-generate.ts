import { useState } from "react";

export type GenerationResponse = {
  id: string;
};

export default function useGenerate() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<unknown | null>(null);

  const mutation = async (file: File): Promise<GenerationResponse> => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/generate", {
        method: "POST",
        body: file,
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      return await res.json();
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    mutateAsync: mutation,
    isLoading,
    isError,
  };
}
