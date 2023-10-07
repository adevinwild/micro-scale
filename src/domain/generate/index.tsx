"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const Generate = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xs bg-neutral-50 border p-4 rounded-xl grid gap-y-2"
    >
      <Input type="file" name="file" />
      <Button>Improve</Button>
    </form>
  );
};

export default Generate;
