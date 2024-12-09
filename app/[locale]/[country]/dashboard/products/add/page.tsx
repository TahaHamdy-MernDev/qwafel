"use client";

import FileUploader from "@/components/file-upload-with-preview";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function Page() {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Hey the title is not long Enough" })
      .max(100, { message: "Hey the title is too long" }),
    price: z.number().min(5, { message: "Hey the title is not long Enough" }),
    description: z
      .string()
      .min(1, { message: "Hey the title is not long Enough" })
      .max(99999, { message: "Hey the title is too long" })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor {...field} />
                  {/* <Tiptap description={field.value} onChange={field.onChange} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>

      <FileUploader name="single-file-upload" />
      <FileUploader name="multiple-files-upload" multiple={true} />

    </div>
  );
}
