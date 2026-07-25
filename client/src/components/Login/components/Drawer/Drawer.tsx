import { Button } from "../../../Button";
// TODO: improve imports
import { ButtonVariant } from "../../../Button/Button.types";
import { motion } from "motion/react";

export const Drawer = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-[50%] translate-x-[-50%] backdrop-blur-sm h-[35svh] w-[90%] bg-background/70 rounded-md flex flex-col items-center px-5 z-3"
      initial={{ bottom: "-500px" }}
      animate={{ bottom: "0px", transition: { duration: 0.5 } }}
    >
      <h2 className="w-fit font-serif text-5xl tracking-wide leading-none text-balance mt-8 text-center">
        Good Stuff
      </h2>
      <p className="w-fit text-md text-center">
        Recommendations from people{" "}
        <span className="whitespace-nowrap">you trust.</span>
      </p>

      <Button
        onClick={() => {}}
        text="Sign Up"
        variant={ButtonVariant.PRIMARY}
        className="mt-6"
      />
      <Button
        onClick={() => {}}
        text="Log In"
        variant={ButtonVariant.SECONDARY}
        className="mt-3"
      />
    </motion.div>
  );
};
