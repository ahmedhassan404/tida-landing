import { useRef } from "react";
import { classNames } from "./classNames.js";

function tabIndexForKey(key, currentIndex, tabCount, isRtl) {
  if (key === "ArrowDown" || (key === "ArrowRight" && !isRtl) || (key === "ArrowLeft" && isRtl)) {
    return (currentIndex + 1) % tabCount;
  }
  if (key === "ArrowUp" || (key === "ArrowLeft" && !isRtl) || (key === "ArrowRight" && isRtl)) {
    return (currentIndex - 1 + tabCount) % tabCount;
  }
  if (key === "Home") return 0;
  if (key === "End") return tabCount - 1;
  return null;
}

export default function TabList({ activeId, className, id, onChange, tabs }) {
  const tabRefs = useRef([]);

  const selectFromKeyboard = (event, currentIndex) => {
    const isRtl = document.documentElement.dir === "rtl";
    const nextIndex = tabIndexForKey(event.key, currentIndex, tabs.length, isRtl);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={classNames(className)} role="tablist">
      {tabs.map((tab, index) => {
        const selected = activeId === tab.id;
        return (
          <button
            aria-controls={`${id}-panel`}
            aria-selected={selected}
            className={selected ? "is-active" : ""}
            id={`${id}-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => selectFromKeyboard(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
