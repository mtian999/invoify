"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter } from "next-intl/client";

// ShadCn Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Icons
import { Globe, Check } from "lucide-react";

// Variables
import { LOCALES } from "@/lib/variables";

const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  // 获取当前语言名称
  const currentLanguage = LOCALES.find(lang => lang.code === currentLocale)?.name || "English";

  const handleLanguageChange = (lang: string) => {
    // 获取当前路径并保持在同一路径，只改变语言
    const pathname = window.location.pathname;
    // 从路径中移除当前语言代码部分 (例如 /en/invoice 变成 /invoice)
    const pathWithoutLocale = pathname.replace(new RegExp(`^\/${currentLocale}`), '');
    
    // 导航到相同路径但使用新的语言
    router.push(pathWithoutLocale || '/', { locale: lang });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {LOCALES.map((language) => (
          <DropdownMenuItem 
            key={language.code} 
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between w-full cursor-pointer"
          >
            <span>{language.name}</span>
            {currentLocale === language.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
