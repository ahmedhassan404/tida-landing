import { useState } from "react";
import { LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { serviceCatalog } from "../data/siteContent.js";
import { contactEndpoint } from "../data/siteAssets.js";
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
      name: "Full name", company: "Company name", phone: "Phone",
      service: "Service interested in", message: "Message",
      method: "Preferred contact method",
    },
    choose: "Choose an option",
    methods: ["Phone", "WhatsApp"],
    submit: "Send request",
    submitting: "Sending request…",
    privacy: "Your details are used only to review and follow up on this request.",
    success: "Your request is ready. We will follow up shortly.",
    missingEndpoint: "Request captured. Contact endpoint is not configured yet.",
    error: "We could not send the request. Please try again.",
    subject: "New consultation request from Masar Global website",
  },
  ar: {
    eyebrow: "طلب استشارة",
    title: "شاركنا احتياج شركتك.",
    description: "تساعدنا رسالة قصيرة ومحددة على توجيه طلبك إلى المتخصص المناسب.",
    fields: {
      name: "الاسم الكامل", company: "اسم الشركة", phone: "رقم الهاتف",
      service: "الخدمة المطلوبة", message: "الرسالة",
      method: "طريقة التواصل المفضلة",
    },
    choose: "اختر من القائمة",
    methods: ["مكالمة هاتفية", "واتساب"],
    submit: "إرسال الطلب",
    submitting: "جارٍ إرسال الطلب…",
    privacy: "تُستخدم بياناتك فقط لمراجعة الطلب والتواصل معك.",
    subject: "طلب استشارة جديد من موقع مسار جلوبال",
  },
};

export default function ContactForm() {
  const { language } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const copy = labels[language];
  const statusCopy = {
    success: copy.success || labels.en.success,
    missingEndpoint: copy.missingEndpoint || labels.en.missingEndpoint,
    error: copy.error || labels.en.error,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString() || "",
      phone: data.get("phone")?.toString() || "",
      company: data.get("company")?.toString() || "",
      service: data.get("Service")?.toString() || "",
      preferredContactMethod: data.get("Preferred contact method")?.toString() || "",
      message: data.get("message")?.toString() || "",
    };

    setSubmitting(true);
    setStatus("");

    if (!contactEndpoint) {
      console.warn("VITE_CONTACT_ENDPOINT is not configured.", payload);
      setSubmitting(false);
      setStatus(statusCopy.missingEndpoint);
      return;
    }

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);
      form.reset();
      setStatus(statusCopy.success);
    } catch (error) {
      console.error(error);
      setStatus(statusCopy.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Reveal className="contact-form-panel glass-card">
      <span className="card-kicker">{copy.eyebrow}</span>
      <h3>{copy.title}</h3>
      <p>{copy.description}</p>
      <form
        acceptCharset="UTF-8"
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="Language" value={language.toUpperCase()} />
        <input type="text" name="_honey" hidden autoComplete="off" />

        <label className="form-field" htmlFor="contact-name">
          <span>{copy.fields.name}</span>
          <Input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label className="form-field" htmlFor="contact-company">
          <span>{copy.fields.company}</span>
          <Input id="contact-company" name="company" autoComplete="organization" maxLength={120} required />
        </label>
        <label className="form-field" htmlFor="contact-phone">
          <span>{copy.fields.phone}</span>
          <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={20} dir="ltr" required />
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
          <Textarea id="contact-message" maxLength={1200} name="message" required rows={5} />
        </label>
        <Button aria-busy={submitting} className="contact-submit" disabled={submitting} type="submit">
          {submitting ? copy.submitting : copy.submit}
          {submitting ? <LoaderCircle className="submit-spinner" size={17} /> : <Send size={17} />}
        </Button>
        <span aria-live="polite" className="sr-only">{submitting ? copy.submitting : status}</span>
      </form>
      {status && <p className="contact-form-status" role="status">{status}</p>}
      <div className="contact-form-note"><ShieldCheck size={16} /><span>{copy.privacy}</span></div>
    </Reveal>
  );
}
