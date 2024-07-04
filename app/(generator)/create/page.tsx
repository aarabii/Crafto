import { Output } from "../_components/Output";
import { UserInput } from "../_components/UserInput";

export default function Generator() {
  return (
    <main className="grid relative grid-cols-2 p-24 gap-24">
      <UserInput />
      <Output />
    </main>
  );
}
