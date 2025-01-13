import React from "react";
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
import useCountry from "@/hooks/use-country";
import { useTranslations } from "next-intl";
import {
  ICourier,
  useUpdateCourierMutation,
} from "@/redux/services/settings/courier-api";
import { Edit2 } from "lucide-react";

// Validation schema with additional fields
const editSchema = z.object({
  name: z.string().min(1, "Name is required").max(20, "Name is too long"),
  our_api_key: z.string().min(1, "Our API Key is required"),
  courier_api_key: z.string().min(1, "Courier API Key is required"),
  currencyId: z
    .number()
    .positive("Currency ID must be positive")
    .int("Currency ID must be an integer"),
});

// Form input type
type FormInputs = z.infer<typeof editSchema>;

export default function EditCourier({
  courier,
}: Readonly<{ courier: ICourier }>) {
  const t = useTranslations("Pages.Settings");
  const { toast } = useToast();
  const country = useCountry();
  const [updateCourier, { isLoading }] = useUpdateCourierMutation();
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");

  const editForm = useForm<FormInputs>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
    defaultValues: {
      name: courier.name,
      our_api_key: courier.our_api_key || "",
      courier_api_key: courier.courier_api_key || "", 
    },
  });

  const onSubmitEdit = async (data: FormInputs) => {
    await updateCourier({
      id: Number(courier.id),
      payload: data,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("updated_successfully"),
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          description: err?.data?.message || "An error occurred",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit_courier")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmitEdit)}
            className="space-y-4"
          >
            {/* Name Field */}
            <FormField
              name="name"
              control={editForm.control}
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

            {/* Our API Key Field */}
            <FormField
              name="our_api_key"
              control={editForm.control}
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
              control={editForm.control}
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
                {global("save_changes")}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
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
