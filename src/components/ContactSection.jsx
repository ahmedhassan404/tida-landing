import { MapPin, Phone } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import ContactForm from "./ContactForm.jsx";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";

function phoneHref(phone) {
  return phone.startsWith("00") ? `tel:+${phone.slice(2)}` : `tel:${phone}`;
}

export default function ContactSection() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="contact-title" className="section contact-section" id="contact">
      <h2 className="sr-only" id="contact-title">{copy.contact.title}</h2>
      <Container>
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
                <a href={phoneHref(office.phone)}>
                  <Phone size={15} />
                  <span>{copy.contact.callLabel}</span>
                  <b dir="ltr">{office.phone}</b>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
