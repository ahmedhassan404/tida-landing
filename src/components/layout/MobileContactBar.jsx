import { MessageCircle } from "lucide-react";
import { whatsappNumber } from "../../data/tidaContent.js";
import { useLanguage } from "../../hooks/useLanguage.js";

export default function MobileContactBar() {
  const { language } = useLanguage();

  return (
    <a
      className="mobile-contact-bar"
      href={`https://wa.me/${whatsappNumber}`}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={19} />
      <span>{language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
    </a>
  );
}
