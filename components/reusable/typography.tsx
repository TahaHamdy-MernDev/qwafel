// Typography.tsx
import React, { ElementType } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const typographyVariants = cva("text-gray-500 dark:text-gray-100", {
  variants: {
    variant: {
      title: "text-2xl text-black font-semibold tracking-tight",
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      table: "my-6 w-full overflow-y-auto",
      th: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      td: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  as?: ElementType;
  children?: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  variant = "p",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
