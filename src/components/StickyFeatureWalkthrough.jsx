import { useLanguage } from "../hooks/useLanguage.js";
import ProcessVisual from "./process/ProcessVisual.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion.jsx";

export default function StickyFeatureWalkthrough() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="process-title" className="section walkthrough" id="process">
      <Container>
        <SectionHeader
          description={copy.walkthrough.description}
          eyebrow={copy.walkthrough.eyebrow}
          title={copy.walkthrough.title}
          titleId="process-title"
        />

        <Accordion className="process-accordion" collapsible defaultValue="discover" type="single">
          {copy.walkthrough.steps.map((step, index) => (
            <AccordionItem key={step.id} value={step.id}>
              <AccordionTrigger>
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{step.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="process-panel">
                  <div className="process-panel-copy">
                    <p>{step.description}</p>
                    <a href="#services">{copy.walkthrough.stepLink}</a>
                  </div>
                  <ProcessVisual step={step} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
