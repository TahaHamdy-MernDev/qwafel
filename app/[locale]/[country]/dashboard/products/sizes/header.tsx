"use client";
import React, { useEffect } from "react";
import Typography from "@/components/reusable/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSizeMutation } from "@/redux/services/products/sizes-api";
import { useToast } from "@/hooks/use-toast";
const createSizeForm = z.object({
  name: z.string().min(1).max(20),
});
type formInputs = z.infer<typeof createSizeForm>;

const Header: React.FC = () => {
  const [createSize, { isLoading }] = useCreateSizeMutation();
  const { toast } = useToast();
  const global = useTranslations("global");
  const t = useTranslations("Pages.Sizes");
  const createForm = useForm<formInputs>({
    resolver: zodResolver(createSizeForm),
    mode: "onChange",
    defaultValues: { name: "" },
  });
  const onSubmitCreate = async (data: formInputs) => {
    console.log("Form submitted with data:", data);
    await createSize(data)
      .unwrap()
      .then(() => {
        createForm.reset();
        toast({
          description: "Successfully created the size!",
        });
      })
      .catch((err) => {
        toast({
          description: err?.data?.message || "An error occurred!",
        });
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center justify-between">
      <Typography as={"h1"} variant={"title"}>
        {t("sizes")}
      </Typography>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"flat_main"}>{global("add_new")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("add_new_size")}</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <Form {...createForm}>
            <form
              onSubmit={createForm.handleSubmit(onSubmitCreate)}
              className="space-y-4"
            >
              <FormField
                name="name"
                control={createForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" isLoading={isLoading}>
                  {global("create")}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {global("cancel")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
