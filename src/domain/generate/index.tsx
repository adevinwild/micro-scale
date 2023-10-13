"use client";

import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { Download, FlaskConical, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

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
import { fadeInUp } from "~/lib/animations";
import { CompareSlider } from "./components/compare-slider";
import LongTimeNote from "./components/long-time-note";
import Preview from "./components/preview";
import { GenerationResponse } from "./use-generate";
import useGenerateForm from "./use-generate-form";
import FirstVisitDialog from "./components/first-visit-dialog";

const initialState: Record<"original" | "improved", string | null> = {
  original: null,
  improved: null,
};

const demoState: Record<"original" | "improved", string | null> = {
  original: "/demo/before.png",
  improved: "/demo/after.png",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Generate = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [longTime, setLongTime] = useState(false);
  const [images, setImages] = useState(initialState);

  const [isPolling, setIsPolling] = useState(false);
  const [predictionId, setPredictionId] = useState<string | null>(null);

  const [showFirstVisitDialog, setShowFirstVisitDialog] = useState(false);

  const onFormSuccess = (response: GenerationResponse) => {
    setPredictionId(response.id);
    setIsPolling(true);
  };

  const pollingQuery = useSWR(
    !!predictionId ? `/api/predictions/${predictionId}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { form, submit, reset } = useGenerateForm({ onFormSuccess });

  const { isSubmitting } = form.formState;

  const hasFile = Boolean(form.watch("file"));
  const hasGenerated = Boolean(images.original && images.improved);

  const isGenerating = isSubmitting || isPolling;

  const showDemo = () => {
    setImages(demoState);
  };

  /**
   * ? Handle long generation times
   */
  useEffect(() => {
    if (!isGenerating) {
      setLongTime(false);
      return;
    }

    const LONG_GENERATION_TIME = 5000; // 5s

    const timer = setTimeout(() => {
      if (!isGenerating) return;
      setLongTime(true);
    }, LONG_GENERATION_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [isGenerating]);

  /**
   * ? Handle polling success
   */
  useEffect(() => {
    if (!pollingQuery.data) {
      return;
    }

    const { prediction } = pollingQuery.data as {
      prediction: {
        is_generated: boolean;
        output: string;
        input: string;
      };
      time: number;
    };

    if (prediction.is_generated) {
      setImages({
        original: prediction.input,
        improved: prediction.output,
      });
      setPredictionId(null);
      setIsPolling(false);
    }
  }, [pollingQuery.data, pollingQuery.data?.time]);

  /**
   * ? Handle first visit
   */
  useEffect(() => {
    const firstVisit = Cookies.get("firstVisit");
    if (!firstVisit) {
      Cookies.set("firstVisit", "true", { expires: 365 });
      setShowFirstVisitDialog(true);
    }
  }, []);

  return (
    <section
      aria-label="Image Upscaling Section"
      className="flex flex-col items-center gap-y-4 h-full w-[90vw] sm:w-[24rem] smooth lg:w-[32rem] mt-32 lg:mt-20"
    >
      {showFirstVisitDialog && (
        <FirstVisitDialog close={() => setShowFirstVisitDialog(false)} />
      )}
      <AnimatePresence mode="popLayout">
        {!hasGenerated && (
          <Form {...form}>
            <motion.form
              key="form"
              onSubmit={submit}
              className="grid w-full p-4 bg-white border place-items-center rounded-[20px] gap-y-2 dark:bg-zinc-900 dark:border-zinc-700 smooth dark:shadow-2xl dark:shadow-black"
              aria-label="Image Upload Form"
            >
              {hasFile && <Preview file={form.watch("file")} />}

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="dark:text-zinc-50 dark:placeholder:text-zinc-50 smooth ">
                      Select / Paste an image
                    </FormLabel>
                    <FormControl className="dark:text-zinc-400 dark:placeholder:text-zinc-400 smooth ">
                      <Input
                        ref={inputFileRef}
                        type="file"
                        className="w-full cursor-pointer "
                        accept=".jpg,.png,.webp"
                        disabled={isGenerating}
                        onChange={(e) => {
                          if (isGenerating) return;
                          return field.onChange(
                            e.target.files ? e.target.files[0] : null
                          );
                        }}
                        aria-describedby="imageInputDescription"
                        aria-labelledby="imageInputLabel"
                      />
                    </FormControl>

                    <FormDescription
                      id="imageInputDescription"
                      className="text-xs text-zinc-500 dark:text-zinc-400 smooth"
                    >
                      Supported formats: JPG, PNG. Max size: 4MB
                    </FormDescription>
                    <FormDescription className="p-2 text-xs text-blue-800 rounded smooth bg-blue-50">
                      <b>Note</b>: Images with a high resolution will not be
                      processed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!form.formState.errors.root?.serverError?.message && (
                <div className="flex justify-start w-full">
                  <small
                    className="text-left text-red-500 dark:text-red-600"
                    role="alert"
                  >
                    {form.formState.errors.root?.serverError.message}
                  </small>
                </div>
              )}
              <div className="flex items-center justify-end w-full mt-4 gap-x-2 ">
                {!hasFile && !isGenerating && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-x-2 dark:text-zinc-50"
                    onClick={showDemo}
                    aria-label="Show demo"
                  >
                    <FlaskConical size={16} />
                    <span>Show demo</span>
                  </Button>
                )}
                {hasFile && !isGenerating && (
                  <Button
                    size="sm"
                    type="reset"
                    variant="outline"
                    onClick={reset}
                    className="flex items-center gap-x-2 dark:text-zinc-50"
                    aria-label="Reset form"
                  >
                    <>
                      <RefreshCw size={16} />
                      <span>Reset</span>
                    </>
                  </Button>
                )}
                <Button
                  size="sm"
                  type="submit"
                  variant={isGenerating ? "ghost" : "default"}
                  disabled={isGenerating}
                  className="flex items-center gap-x-2"
                  aria-label="Upscale image"
                >
                  {!isGenerating && (
                    <>
                      <Sparkles size={16} />
                      <span>Upscale</span>
                    </>
                  )}

                  {isGenerating && <span>Upscaling image...</span>}
                </Button>
              </div>
            </motion.form>
          </Form>
        )}
        {longTime && !hasGenerated && <LongTimeNote key="long-time-note" />}

        {hasGenerated && (
          <motion.div
            {...fadeInUp}
            key="generated"
            className="flex flex-col w-full p-4 bg-white border rounded-xl gap-y-2 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-2xl dark:shadow-black"
            aria-label="Image Upscaled Result"
          >
            <p className="text-base font-medium text-zinc-600 dark:text-zinc-50">
              Tada!{" "}
              <span role="img" aria-label="Party popper">
                🎉
              </span>
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your image has been upscaled, check it out below.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              If you like the app please consider{" "}
              <a
                href="https://github.com/adevinwild/micro-scale"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline text-zinc-600 dark:text-zinc-50"
              >
                staring the repository
              </a>
            </p>

            <div className="flex items-center justify-end w-full mt-4 gap-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-x-2 dark:text-zinc-50"
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

        {!isGenerating && !!images.original && !!images.improved && (
          <motion.div
            {...fadeInUp}
            key="compare"
            className="grid content-start w-full p-4 bg-white border rounded-[20px] gap-y-2 dark:bg-zinc-900 dark:border-zinc-700  dark:shadow-2xl dark:shadow-black"
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
