import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useQueryParamState } from "./useQueryParamState.js";

function QueryStateControls() {
  const [solution, selectSolution] = useQueryParamState(
    "solution",
    "accounting",
    ["accounting", "erp"]
  );

  return (
    <>
      <span>{solution}</span>
      <button onClick={() => selectSolution("accounting")} type="button">
        select accounting
      </button>
    </>
  );
}

describe("useQueryParamState", () => {
  test("selecting the default removes the query parameter", () => {
    window.history.replaceState({}, "", "/?solution=erp");
    render(<QueryStateControls />);

    expect(screen.getByText("erp")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "select accounting" }));

    expect(screen.getByText("accounting")).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });
});
