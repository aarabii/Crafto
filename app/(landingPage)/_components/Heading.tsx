import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

export const Heading = () => {
  return (
    <div className="max-w-4xl space-y-4 text-center">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Craft, Captivate, Connect. With{" "}
        <span className="hover:underline hover:decoration-wavy hover:text-sky-400 hover:decoration-yellow-200">
          CraftoGram
        </span>
      </h1>
      <h2 className="text-xl lg:text-3xl font-medium">
        <AnimatedShinyText className="">
          Your go-to tool for creating standout Instagram bios and descriptions.
        </AnimatedShinyText>
      </h2>
    </div>
  );
};
