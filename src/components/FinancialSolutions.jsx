import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Building2,
  ChartNoAxesCombined,
  Landmark,
  Plane,
  ReceiptText,
  Scale,
  ShieldCheck,
  Store,
  Workflow,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useQueryParamState } from "../hooks/useQueryParamState.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import TabList from "./ui/TabList.jsx";

const TAB_ICONS = {
  advisory: Landmark,
  operations: ChartNoAxesCombined,
  compliance: ShieldCheck,
  automation: Bot,
};

const CAPABILITY_ICONS = {
  structure: Building2,
  systems: Workflow,
  bookkeeping: ReceiptText,
  tourism: Plane,
  setup: Landmark,
  tax: Scale,
  audit: ShieldCheck,
  ai: Bot,
};

const AUDIENCE_ICONS = {
  investors: Landmark,
  tourism: Plane,
  smes: Store,
};

function CapabilityCard({ capability }) {
  const Icon = CAPABILITY_ICONS[capability.id];

  return (
    <article className="financial-capability">
      <div className="financial-capability-icon">
        <Icon size={18} />
      </div>
      <div>
        <h4>{capability.title}</h4>
        <p>{capability.description}</p>
      </div>
    </article>
  );
}

function FinancialSignal({ signal }) {
  return (
    <div className="financial-signal" aria-hidden="true">
      <div className="financial-signal-head">
        <span>{signal.label}</span>
        <i />
      </div>
      <div className="financial-signal-bars">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="financial-signal-grid">
        {signal.metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
    </div>
  );
}

function FinancialPanel({ reduceMotion, tab }) {
  const Icon = TAB_ICONS[tab.id];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="financial-panel"
      exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      key={tab.id}
      transition={{ duration: reduceMotion ? 0.01 : 0.32 }}
    >
      <div className="financial-panel-copy">
        <div className="card-icon">
          <Icon size={22} />
        </div>
        <h3>{tab.title}</h3>
        <p>{tab.description}</p>
        <div className="financial-capabilities">
          {tab.capabilities.map((capability) => (
            <CapabilityCard capability={capability} key={capability.id} />
          ))}
        </div>
      </div>
      <FinancialSignal signal={tab.signal} />
    </motion.div>
  );
}

export default function FinancialSolutions() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const tabIds = copy.financial.tabs.map((tab) => tab.id);
  const [activeId, setActiveId] = useQueryParamState("finance", "advisory", tabIds);
  const activeTab = copy.financial.tabs.find((tab) => tab.id === activeId);

  return (
    <section
      aria-labelledby="financial-solutions-title"
      className="section financial-section"
      id="financial-solutions"
    >
      <Container>
        <SectionHeader
          description={copy.financial.description}
          eyebrow={copy.financial.eyebrow}
          split
          title={copy.financial.title}
          titleId="financial-solutions-title"
        />

        <div className="financial-shell glass-card">
          <TabList
            activeId={activeId}
            className="financial-tabs"
            id="financial-solutions-tabs"
            onChange={setActiveId}
            tabs={copy.financial.tabs}
          />
          <div
            aria-labelledby={`financial-solutions-tabs-tab-${activeId}`}
            id="financial-solutions-tabs-panel"
            role="tabpanel"
          >
            <AnimatePresence mode="wait">
              <FinancialPanel reduceMotion={reduceMotion} tab={activeTab} />
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="financial-audience">
          <div className="financial-audience-copy">
            <span className="card-kicker">{copy.financial.audience.eyebrow}</span>
            <h3>{copy.financial.audience.title}</h3>
            <p>{copy.financial.audience.description}</p>
          </div>
          <div className="financial-audience-grid">
            {copy.financial.audience.groups.map((group) => {
              const Icon = AUDIENCE_ICONS[group.id];
              return (
                <article key={group.id}>
                  <Icon size={19} />
                  <h4>{group.title}</h4>
                  <p>{group.description}</p>
                </article>
              );
            })}
          </div>
          <div className="financial-delivery">
            {copy.financial.delivery.map((model) => (
              <span key={model}>{model}</span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
