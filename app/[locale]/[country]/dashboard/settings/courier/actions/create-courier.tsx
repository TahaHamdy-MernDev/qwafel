import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useCreateCourierMutation } from "@/redux/services/settings/courier-api";
import useCountry from "@/hooks/use-country";
import { useTranslations } from "next-intl";

// Validation schema with additional fields
const createCourierSchema = z.object({
  name: z.string().min(1, "Name is required").max(20, "Name is too long"),
  our_api_key: z.string().min(1, "API Key is required"),
  courier_api_key: z.string().min(1, "Courier API Key is required"),
});

// Form input type
type FormInputs = z.infer<typeof createCourierSchema>;

export default function CreateCourier() {
  const t = useTranslations("Pages.Settings");
  const { toast } = useToast();
  const country = useCountry();
  const [createCourier, { isLoading }] = useCreateCourierMutation();
  const global = useTranslations("global");
  const [open, setOpen] = useState(false);
  const res_status = useTranslations("res_status");

  const createForm = useForm<FormInputs>({
    resolver: zodResolver(createCourierSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      our_api_key: "",
      courier_api_key: "", 
    },
  });

  const onSubmitCreate = async (data: FormInputs) => {
    await createCourier({
      payload: data,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("created_successfully"),
        });
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
        toast({
          description: err?.data?.message || "An error occurred",
          variant: "destructive",
        });
      });
    createForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="flat_main">{global("add_new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_new_courier")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onSubmitCreate)}
            className="space-y-4"
          >
            {/* Name Field */}
            <FormField
              name="name"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" pb-2">{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Our API Key Field */}
            <FormField
              name="our_api_key"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("our_api_key")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Courier API Key Field */}
            <FormField
              name="courier_api_key"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("courier_api_key")}</FormLabel>
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
  );
}
