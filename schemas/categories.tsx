import { useTranslations } from "next-intl";
import { z } from "zod";

export const getSearchCategorySchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z.object({
    name: z.string(),
    is_active: z.string(),
    id: z.string(),
  });
