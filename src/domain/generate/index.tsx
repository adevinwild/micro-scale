"use client";

import { Download, FlaskConical, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
import { fadeIn, fadeInUp } from "~/lib/animations";

const initialState: Record<"original" | "improved", string | null> = {
  original: null,
  improved: null,
};

const demoState: Record<"original" | "improved", string | null> = {
  original: "/demo/before.png",
  improved: "/demo/after.png",
};

const Generate = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [longTime, setLongTime] = useState(false);
  const [images, setImages] = useState(initialState);

  const { form, submit, reset } = useGenerateForm({ onFormSuccess: setImages });

  const { isSubmitting } = form.formState;

  const hasFile = Boolean(form.watch("file"));
  const hasGenerated = Boolean(images.original && images.improved);

  const showDemo = () => {
    setImages(demoState);
  };

  /**
   * ? Handle long generation times
   */
  useEffect(() => {
    if (!isSubmitting) {
      setLongTime(false);
      return;
    }

    const LONG_GENERATION_TIME = 5000; // 5s

    const timer = setTimeout(() => {
      if (!isSubmitting) return;
      setLongTime(true);
    }, LONG_GENERATION_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [isSubmitting]);

  return (
    <section
      aria-label="Image Upscaling Section"
      className="flex flex-col items-center gap-y-4 h-full w-[90vw] sm:w-[24rem] transition-all lg:w-[32rem] mt-44 lg:mt-20"
    >
      <AnimatePresence mode="popLayout">
        {!hasGenerated && (
          <Form key="form-root" {...form}>
            <motion.form
              key="form"
              onSubmit={submit}
              className=" bg-white border p-4 place-items-center rounded-xl grid gap-y-2 w-full"
              aria-label="Image Upload Form"
            >
              {hasFile && <Preview file={form.watch("file")} />}

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select / Paste an image</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputFileRef}
                        type="file"
                        className="cursor-pointer w-full"
                        accept=".jpg,.png,.webp"
                        disabled={isSubmitting}
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        aria-describedby="imageInputDescription"
                        aria-labelledby="imageInputLabel"
                      />
                    </FormControl>

                    <FormDescription
                      id="imageInputDescription"
                      className="text-xs text-zinc-500"
                    >
                      Supported formats: JPG, PNG, WEBP. Max size: 4MB.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!form.formState.errors.root?.serverError?.message && (
                <div className="w-full flex justify-start">
                  <small className="text-red-500 text-left" role="alert">
                    {form.formState.errors.root?.serverError.message}
                  </small>
                </div>
              )}
              <div className="flex items-center gap-x-2 justify-end w-full mt-4">
                {!hasFile && !isSubmitting && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-x-2"
                    onClick={showDemo}
                    aria-label="Show demo"
                  >
                    <FlaskConical size={16} />
                    <span>Show demo</span>
                  </Button>
                )}
                {hasFile && !isSubmitting && (
                  <Button
                    type="reset"
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={reset}
                    className="flex items-center gap-x-2"
                    aria-label="Reset form"
                  >
                    Reset
                  </Button>
                )}
                <Button
                  size="sm"
                  type="submit"
                  variant={isSubmitting ? "ghost" : "default"}
                  disabled={isSubmitting}
                  className="flex items-center gap-x-2"
                  aria-label="Upscale image"
                >
                  {!isSubmitting && (
                    <>
                      <Sparkles size={16} />
                      <span>Upscale</span>
                    </>
                  )}

                  {isSubmitting && <span>Upscaling image...</span>}
                </Button>
              </div>
            </motion.form>
          </Form>
        )}
        {hasGenerated && (
          <motion.div
            {...fadeInUp}
            key="generated"
            className=" bg-white border p-4  rounded-xl flex flex-col gap-y-2 w-full"
            aria-label="Image Upscaled Result"
          >
            <p className="text-base text-zinc-600 font-medium">
              Tada!{" "}
              <span role="img" aria-label="Party popper">
                🎉
              </span>
            </p>
            <p className="text-sm text-zinc-500">
              Your image has been upscaled, check it out below.
            </p>
            <p className="text-sm text-zinc-500">
              If you like the app please consider{" "}
              <a
                href="https://github.com/adevinwild/micro-scale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 font-medium underline"
              >
                staring the repository
              </a>
            </p>

            <div className="flex items-center justify-end gap-x-2 w-full mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-x-2"
                aria-label="Restart upscaling process"
                onClick={() => {
                  reset();
                  setImages(initialState);
                }}
              >
                <RefreshCw size={16} />
                <span>Restart</span>
              </Button>

              <a href={images.improved!} download="improved.jpeg">
                <Button
                  variant="default"
                  size="sm"
                  aria-label="Download upscaled image"
                  className="flex items-center gap-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </Button>
              </a>
            </div>
          </motion.div>
        )}
        {longTime && !hasGenerated && (
          <motion.div
            {...fadeInUp}
            key="long-time"
            className="flex flex-col w-full gap-y-1 bg-white rounded-xl border p-4"
            aria-label="Upscaling Note"
          >
            <small className="text-zinc-500 text-xs font-medium">Note</small>
            <small className="text-zinc-400 text-xs">
              Upscaling can take up to a minute, do not refresh the page.
            </small>
          </motion.div>
        )}
        {!isSubmitting && !!images.original && !!images.improved && (
          <motion.div
            {...fadeInUp}
            key="compare"
            className="border p-4 rounded-xl grid w-full content-start gap-y-2 bg-white"
            aria-label="Image Comparison Slider"
          >
            <CompareSlider
              original={images.original}
              improved={images.improved}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Generate;
