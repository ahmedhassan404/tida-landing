import { useCallback, useState } from "react";

function initialQueryValue(paramName, defaultValue, allowedValues) {
  const requestedValue = new URLSearchParams(window.location.search).get(paramName);
  return allowedValues.includes(requestedValue) ? requestedValue : defaultValue;
}

export function useQueryParamState(paramName, defaultValue, allowedValues) {
  const [selectedValue, setSelectedValue] = useState(() =>
    initialQueryValue(paramName, defaultValue, allowedValues)
  );

  const selectValue = useCallback(
    (nextValue) => {
      const nextUrl = new URL(window.location.href);
      if (nextValue === defaultValue) {
        nextUrl.searchParams.delete(paramName);
      } else {
        nextUrl.searchParams.set(paramName, nextValue);
      }

      window.history.replaceState(window.history.state, "", nextUrl);
      setSelectedValue(nextValue);
    },
    [defaultValue, paramName]
  );

  return [selectedValue, selectValue];
}
