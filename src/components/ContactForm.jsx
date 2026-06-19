import { useState } from "react";
import { LoaderCircle, Mail, Send, ShieldCheck } from "lucide-react";
import { contactEmail } from "../data/tidaContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";
import { Button } from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Textarea from "./ui/Textarea.jsx";

const contactFields = [
  { id: "contact-name", key: "name", name: "Name", type: "text", autoComplete: "name" },
  { id: "contact-phone", key: "phone", name: "Phone Number", type: "tel", autoComplete: "tel" },
  { id: "contact-whatsapp", key: "whatsapp", name: "WhatsApp Number", type: "tel", autoComplete: "tel" },
];

export default function ContactForm() {
  const { copy, language } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const formCopy = copy.contact.form;

  return (
    <Reveal className="contact-form-panel glass-card">
      <span className="card-kicker">{formCopy.eyebrow}</span>
      <h3>{formCopy.title}</h3>
      <p>{formCopy.description}</p>

      <form
        className="contact-form"
        action={`https://formsubmit.co/${contactEmail}`}
        method="POST"
        acceptCharset="UTF-8"
        onSubmit={() => setSubmitting(true)}
      >
        <input type="hidden" name="_subject" value={formCopy.subject} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="Language" value={language.toUpperCase()} />
        <input
          type="text"
          name="_honey"
          hidden
          autoComplete="off"
        />

        {contactFields.map((field) => (
          <label className="form-field" htmlFor={field.id} key={field.id}>
            <span>{formCopy.fields[field.key]}</span>
            <Input
              id={field.id}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              inputMode={field.type === "tel" ? "tel" : undefined}
              minLength={field.type === "tel" ? 7 : 2}
              maxLength={field.type === "tel" ? 20 : 80}
              dir={field.type === "tel" ? "ltr" : undefined}
              required
            />
          </label>
        ))}

        <label className="form-field form-field-message" htmlFor="contact-message">
          <span>{formCopy.fields.message}</span>
          <Textarea
            id="contact-message"
            maxLength={1000}
            name="Message"
            required
            rows={5}
          />
        </label>

        <Button
          aria-busy={submitting}
          className="contact-submit"
          disabled={submitting}
          type="submit"
        >
          {submitting ? formCopy.submitting : formCopy.submit}
          {submitting ? <LoaderCircle className="submit-spinner" size={17} /> : <Send size={17} />}
        </Button>
        <span aria-live="polite" className="sr-only">
          {submitting ? formCopy.submitting : ""}
        </span>
      </form>

      <div className="contact-form-note">
        <ShieldCheck size={16} />
        <span>{formCopy.privacy}</span>
      </div>
      <a className="contact-email" href={`mailto:${contactEmail}`}>
        <Mail size={16} />
        {formCopy.emailLabel}
      </a>
    </Reveal>
  );
}
