import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useTheme } from "../../hooks/useTheme.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip.jsx";

export default function ThemeToggle() {
  const { copy } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="icon-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? copy.a11y.switchLight : copy.a11y.switchDark}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isDark ? copy.a11y.switchLight : copy.a11y.switchDark}
      </TooltipContent>
    </Tooltip>
  );
}
