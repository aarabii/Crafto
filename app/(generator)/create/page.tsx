import { Output } from "../_components/Output";
import { UserInput } from "../_components/UserInput";

import { ContextProvider } from "@/context/Context";

export default function Generator() {
  return (
    <main className="grid relative grid-cols-2 p-24 gap-24">
      <ContextProvider>
        <UserInput />
        <Output />
      </ContextProvider>
    </main>
  );
}
