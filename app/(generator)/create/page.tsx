import { Output } from "../_components/Output";
import { UserInput } from "../_components/UserInput";

import { ContextProvider } from "@/context/Context";

export default function Generator() {
  return (
    <main className="grid relative grid-cols-1 slg:grid-cols-2 gap-12 px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <ContextProvider>
        <UserInput />
        <Output />
      </ContextProvider>
    </main>
  );
}
