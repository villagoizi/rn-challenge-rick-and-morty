import React from "react";

interface useInputProps extends StateChange {}
interface StateChange {
  search?: string;
  filter?: string;
}

export default function useInput(props: useInputProps) {
  const [change, setChange] = React.useState<StateChange>(props || {});

  return { change, setChange };
}
