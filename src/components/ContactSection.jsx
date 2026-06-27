import { Clock3, MessageCircle } from "lucide-react";
import { workingHours } from "../data/siteAssets.js";
import { useLanguage } from "../hooks/useLanguage.js";
import ContactForm from "./ContactForm.jsx";
import Container from "./ui/Container.jsx";

function phoneHref(phone) {
  return phone.startsWith("00") ? `tel:+${phone.slice(2)}` : `tel:${phone}`;
}

export default function ContactSection() {
  const { copy, language } = useLanguage();
  const phoneLabel = language === "ar" ? "تواصل معنا هاتفيا" : "Talk to us by phone";
  const hoursLabel = language === "ar" ? "ساعات العمل" : "Working hours";
  return (
    <section aria-labelledby="contact-title" className="section contact-section" id="contact">
      <h2 className="sr-only" id="contact-title">{copy.contact.title}</h2>
      <Container>
        <div className="contact-quick-links" aria-label={language === "ar" ? "طرق التواصل المباشر" : "Direct contact options"}>
          <a href={phoneHref(copy.contact.offices[0].phone)}>
            <MessageCircle aria-hidden="true" size={18} />
            <span>{phoneLabel}</span>
          </a>
          <div>
            <Clock3 aria-hidden="true" size={18} />
            <span><b>{hoursLabel}</b>{workingHours[language]}</span>
          </div>
        </div>
        <div className="contact-layout">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
