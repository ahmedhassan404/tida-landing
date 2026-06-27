import { MessageCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage.js";

export default function MobileContactBar() {
  const { language } = useLanguage();

  return (
    <a className="mobile-contact-bar" href="#contact">
      <MessageCircle aria-hidden="true" size={19} />
      <span>{language === "ar" ? "تواصل معنا" : "Contact Us"}</span>
    </a>
  );
}
