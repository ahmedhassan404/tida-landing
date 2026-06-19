import { Languages } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu.jsx";

export default function LanguageToggle() {
  const { language, copy, toggleLanguage } = useLanguage();
  const label = language === "en" ? copy.a11y.switchArabic : copy.a11y.switchEnglish;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="icon-toggle language-toggle" type="button" aria-label={label}>
          <Languages size={17} />
          <span>{copy.nav.language}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem checked={language === "en"} onSelect={language === "ar" ? toggleLanguage : undefined}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem checked={language === "ar"} onSelect={language === "en" ? toggleLanguage : undefined}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
