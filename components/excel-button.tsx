import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "./reusable/Image";

interface IExcelButtonProps {
  className?: string;
  variant?: "excel";
  disabled?: boolean;
  onClick?: () => void;
}

const ExcelButton: React.FC<IExcelButtonProps> = ({
  className,
  variant = "excel",
  onClick,
  disabled,
  ...props
}) => {
  return (
   
      
        <Button
        disabled={disabled}
          className={cn("flex items-center justify-center",className)}
          variant={variant}
          onClick={onClick}
          size={"icon"}
          {...props}
        >
            
          <Image
            width={30}
            height={30}
            src={"/images/excel.png"}
            alt="excel.png"
            className=" w-6 h-6"
          />
         
        </Button>
    
  );
};

export default ExcelButton;
