import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactEmail, whatsappNumber, workingHours } from "../data/tidaContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import ContactForm from "./ContactForm.jsx";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";

function phoneHref(phone) {
  return phone.startsWith("00") ? `tel:+${phone.slice(2)}` : `tel:${phone}`;
}

export default function ContactSection() {
  const { copy, language } = useLanguage();
  const whatsappLabel = language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp";
  const hoursLabel = language === "ar" ? "ساعات العمل" : "Working hours";
  const mapLabel = language === "ar" ? "افتح الخريطة" : "Open map";

  return (
    <section aria-labelledby="contact-title" className="section contact-section" id="contact">
      <h2 className="sr-only" id="contact-title">{copy.contact.title}</h2>
      <Container>
        <div className="contact-quick-links" aria-label={language === "ar" ? "طرق التواصل المباشر" : "Direct contact options"}>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" size={18} />
            <span>{whatsappLabel}</span>
          </a>
          <a href={`mailto:${contactEmail}`}>
            <Mail aria-hidden="true" size={18} />
            <span>{contactEmail}</span>
          </a>
          <div>
            <Clock3 aria-hidden="true" size={18} />
            <span><b>{hoursLabel}</b>{workingHours[language]}</span>
          </div>
        </div>
        <div className="contact-layout">
          <ContactForm />
          <div className="contact-grid">
            {copy.contact.offices.map((office, index) => (
              <Reveal className="contact-card glass-card" delay={index * 0.08} key={office.id}>
                <div className="contact-card-top">
                  <span className="country-code" aria-hidden="true">{office.code}</span>
                  <span className="contact-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <span className="card-kicker">{office.country}</span>
                <h3>{office.city}</h3>
                <p>
                  <MapPin size={16} />
                  {office.address}
                </p>
                <div className="contact-card-actions">
                  <a href={phoneHref(office.phone)}>
                    <Phone aria-hidden="true" size={15} />
                    <span>{copy.contact.callLabel}</span>
                    <b dir="ltr">{office.phone}</b>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin aria-hidden="true" size={15} />
                    <span>{mapLabel}</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
