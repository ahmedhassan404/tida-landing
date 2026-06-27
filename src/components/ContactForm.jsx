import { useState } from "react";
import { LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { serviceCatalog } from "../data/siteContent.js";
import { contactEmail } from "../data/tidaContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";
import { Button } from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Textarea from "./ui/Textarea.jsx";

const labels = {
  en: {
    eyebrow: "Consultation request",
    title: "Tell us what the business needs.",
    description: "A short, specific note helps us direct your request to the right specialist.",
    fields: {
      name: "Full name", company: "Company name", email: "Email", phone: "Phone",
      country: "Country", service: "Service interested in", message: "Message",
      method: "Preferred contact method",
    },
    choose: "Choose an option",
    countries: ["Egypt", "Saudi Arabia", "UAE", "Other"],
    methods: ["Phone", "WhatsApp", "Email"],
    submit: "Send request",
    submitting: "Sending request…",
    privacy: "Your details are used only to review and follow up on this request.",
    subject: "New consultation request from TIDA website",
  },
  ar: {
    eyebrow: "طلب استشارة",
    title: "شاركنا احتياج شركتك.",
    description: "تساعدنا رسالة قصيرة ومحددة على توجيه طلبك إلى المتخصص المناسب.",
    fields: {
      name: "الاسم الكامل", company: "اسم الشركة", email: "البريد الإلكتروني", phone: "رقم الهاتف",
      country: "الدولة", service: "الخدمة المطلوبة", message: "الرسالة",
      method: "طريقة التواصل المفضلة",
    },
    choose: "اختر من القائمة",
    countries: ["مصر", "السعودية", "الإمارات", "دولة أخرى"],
    methods: ["مكالمة هاتفية", "واتساب", "البريد الإلكتروني"],
    submit: "إرسال الطلب",
    submitting: "جارٍ إرسال الطلب…",
    privacy: "تُستخدم بياناتك فقط لمراجعة الطلب والتواصل معك.",
    subject: "طلب استشارة جديد من موقع تيدا",
  },
};

export default function ContactForm() {
  const { language } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const copy = labels[language];

  return (
    <Reveal className="contact-form-panel glass-card">
      <span className="card-kicker">{copy.eyebrow}</span>
      <h3>{copy.title}</h3>
      <p>{copy.description}</p>
      <form
        acceptCharset="UTF-8"
        action={`https://formsubmit.co/${contactEmail}`}
        className="contact-form"
        method="POST"
        onSubmit={() => setSubmitting(true)}
      >
        <input type="hidden" name="_subject" value={copy.subject} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="Language" value={language.toUpperCase()} />
        <input type="text" name="_honey" hidden autoComplete="off" />

        <label className="form-field" htmlFor="contact-name">
          <span>{copy.fields.name}</span>
          <Input id="contact-name" name="Full name" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label className="form-field" htmlFor="contact-company">
          <span>{copy.fields.company}</span>
          <Input id="contact-company" name="Company" autoComplete="organization" maxLength={120} required />
        </label>
        <label className="form-field" htmlFor="contact-email">
          <span>{copy.fields.email}</span>
          <Input id="contact-email" name="Email" type="email" autoComplete="email" maxLength={160} required />
        </label>
        <label className="form-field" htmlFor="contact-phone">
          <span>{copy.fields.phone}</span>
          <Input id="contact-phone" name="Phone" type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={20} dir="ltr" required />
        </label>
        <label className="form-field" htmlFor="contact-country">
          <span>{copy.fields.country}</span>
          <select className="input" defaultValue="" id="contact-country" name="Country" required>
            <option disabled value="">{copy.choose}</option>
            {copy.countries.map((country) => <option key={country}>{country}</option>)}
          </select>
        </label>
        <label className="form-field" htmlFor="contact-service">
          <span>{copy.fields.service}</span>
          <select className="input" defaultValue="" id="contact-service" name="Service" required>
            <option disabled value="">{copy.choose}</option>
            {serviceCatalog[language].map((service) => <option key={service.id}>{service.title}</option>)}
          </select>
        </label>
        <label className="form-field" htmlFor="contact-method">
          <span>{copy.fields.method}</span>
          <select className="input" defaultValue="" id="contact-method" name="Preferred contact method" required>
            <option disabled value="">{copy.choose}</option>
            {copy.methods.map((method) => <option key={method}>{method}</option>)}
          </select>
        </label>
        <label className="form-field form-field-message" htmlFor="contact-message">
          <span>{copy.fields.message}</span>
          <Textarea id="contact-message" maxLength={1200} name="Message" required rows={5} />
        </label>
        <Button aria-busy={submitting} className="contact-submit" disabled={submitting} type="submit">
          {submitting ? copy.submitting : copy.submit}
          {submitting ? <LoaderCircle className="submit-spinner" size={17} /> : <Send size={17} />}
        </Button>
        <span aria-live="polite" className="sr-only">{submitting ? copy.submitting : ""}</span>
      </form>
      <div className="contact-form-note"><ShieldCheck size={16} /><span>{copy.privacy}</span></div>
    </Reveal>
  );
}
