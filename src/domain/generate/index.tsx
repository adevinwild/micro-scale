"use client";

import { Download, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { CompareSlider } from "./components/compare-slider";
import Preview from "./components/preview";
import useGenerateForm from "./use-generate-form";

const initialState: Record<string, string | null> = {
  original: null,
  improved: null,
};

const Generate = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState(initialState);

  const { form, submit, reset } = useGenerateForm({ onFormSuccess: setImages });

  const { isSubmitting } = form.formState;

  const hasFile = Boolean(form.watch("file"));

  return (
    <section className="flex flex-col items-center gap-y-4 h-full w-[90vw] sm:w-[24rem] transition-all lg:w-[32rem] mt-44 lg:mt-20">
      <Form {...form}>
        <form
          onSubmit={submit}
          className=" bg-white shadow-xs border p-4 place-items-center rounded-xl grid gap-y-2 w-full"
        >
          {hasFile && <Preview file={form.watch("file")} />}

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an image</FormLabel>
                <FormControl>
                  <Input
                    ref={inputFileRef}
                    type="file"
                    className="cursor-pointer"
                    accept=".jpg,.png,.webp"
                    disabled={isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-400">
                  Supported formats: JPG, PNG, WEBP. Max size: 4MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2 justify-end w-full">
            {hasFile && !isSubmitting && (
              <Button
                type="reset"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={reset}
                className="mt-4 flex items-center gap-x-2"
              >
                Reset
              </Button>
            )}
            <Button
              size="sm"
              type="submit"
              variant={isSubmitting ? "ghost" : "default"}
              disabled={isSubmitting || !hasFile}
              className="mt-4 flex items-center gap-x-2"
            >
              {!isSubmitting && (
                <>
                  <Sparkles size={16} />
                  <span>Upscale it!</span>
                </>
              )}

              {isSubmitting && <span>Upscaling image...</span>}
            </Button>
          </div>
        </form>
      </Form>
      {!isSubmitting && !!images.original && !!images.improved && (
        <div className="border p-4 rounded-xl grid w-full content-start gap-y-2 bg-white shadow-xs">
          <CompareSlider
            original={images.original}
            improved={images.improved}
          />
          <a href={images.improved} download="improved.jpeg" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center gap-x-2"
            >
              <Download size={16} />
              <span>Download upscaled image</span>
            </Button>
          </a>
        </div>
      )}
    </section>
  );
};

export default Generate;
