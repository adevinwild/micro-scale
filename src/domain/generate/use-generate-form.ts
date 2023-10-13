import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "~/lib/constants";
import useGenerate, { GenerationResponse } from "./use-generate";
import usePasteFile from "~/hooks/use-paste";

// allow png,jpg

const FormSchema = z.object({
  file: z.any().superRefine((val, ctx) => {
    if (!(val instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload a file",
        path: [],
      });
      return;
    }

    if (val.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File is too large",
        path: [],
      });
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(val.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File type not supported",
        path: [],
      });
      return;
    }

    // now check the image resolution

    const img = document.createElement("img");
    img.src = URL.createObjectURL(val);
    img.classList.add("hidden");
    document.body.appendChild(img);

    return new Promise((resolve) => {
      img.onload = () => {
        const { width, height } = img;
        document.body.removeChild(img);
        if (width >= 1280 || height >= 1280) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Image with higher resolution than 1280x1280 is not supported",
            path: [],
          });
        }

        resolve(null);
      };
    });
  }),
});

export type FormValues = z.infer<typeof FormSchema>;

type UseGenerateFormProps = {
  onFormSuccess: (data: GenerationResponse) => void;
};

export default function useGenerateForm({
  onFormSuccess,
}: UseGenerateFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const generateMutation = useGenerate();

  const onPaste = async (file: File) => {
    form.setValue("file", file);
    await form.trigger("file");
  };

  const pastedFile = usePasteFile({ onPaste });

  const submit = form.handleSubmit(async (data: FormValues) => {
    try {
      const response = await generateMutation.mutateAsync(data.file);
      onFormSuccess(response);
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root.serverError", {
          type: "error",
          message: error.message,
        });
      }
    }
  });

  const reset = () => {
    form.reset();
  };

  return {
    form,
    submit,
    reset,
  };
}
