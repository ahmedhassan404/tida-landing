import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TabList from "./TabList.jsx";

const tabs = [
  { id: "first", label: "First" },
  { id: "second", label: "Second" },
  { id: "third", label: "Third" },
];

function ControlledTabList() {
  const [activeId, setActiveId] = useState("second");

  return (
    <TabList
      activeId={activeId}
      id="example"
      onChange={setActiveId}
      tabs={tabs}
    />
  );
}

describe("TabList", () => {
  test("right arrow moves to the previous tab in right-to-left mode", () => {
    document.documentElement.dir = "rtl";
    render(<ControlledTabList />);

    fireEvent.keyDown(screen.getByRole("tab", { name: "Second" }), {
      key: "ArrowRight",
    });

    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();
  });
});
