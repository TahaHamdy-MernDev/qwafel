
//   import { useCreateOrUpdateStockLogMutation, useDeleteStockLogMutation } from "@/redux/services/stock/stock-log-api";



type StockLogInputs = z.infer<typeof stockLogSchema>;

export function StockLogForm() {
 
}

export function DeleteStockLog({
  stockLogId,
}: Readonly<{ stockLogId: string }>) {
  const { toast } = useToast();
  //   const [deleteStockLog, { isLoading }] = useDeleteStockLogMutation();
  const t = useTranslations("Pages.StockLogs");

  const handleDelete = async () => {
    // await deleteStockLog({ id: stockLogId })
    //   .unwrap()
    //   .then(() => {
    //     toast({
    //       description: t("deleted_successfully"),
    //     });
    //   })
    //   .catch((err) => {
    //     toast({
    //       description: err?.data?.message || "An error occurred!",
    //     });
    //   });
  };

  return (
    <Button
      onClick={handleDelete}
      // isLoading={isLoading}
      variant="destructive"
    >
      {t("delete")}
    </Button>
  );
}
