import { Fragment } from "react";
import { Button } from "../../../Button";
// TODO: improve imports
import { ButtonVariant } from "../../../Button/Button.types";
import { motion } from "motion/react";
import { type DrawerProps } from "./Drawer.types";
import { SignUpForm } from "../SignUpForm";
import { View } from "../../Login.types";
import { DrawerContent } from "./DrawerContent";
import { type DrawerContentProps } from "./Drawer.types";

export const Drawer = ({
  view,
  setView,
  pendingView,
  setPendingView,
  isRetracting,
  setDrawerIsRetracting,
}: DrawerProps) => {
  const RETRACTED_STYLES = {
    bottom: "-500px",
  };

  const DRAWER_DATA: Record<View, DrawerContentProps> = {
    [View.Welcome]: {
      title: "Good Stuff",
      description: (
        <Fragment>
          Recommendations from people{" "}
          <span className="whitespace-nowrap">you trust.</span>
        </Fragment>
      ),
      content: (
        <Fragment>
          <Button
            onClick={() => {
              setDrawerIsRetracting(true);
              setPendingView(View.SignUp);
            }}
            text="Sign Up"
            variant={ButtonVariant.PRIMARY}
            className="mt-6"
          />
          <Button
            onClick={() => {
              setDrawerIsRetracting(true);
              setPendingView(View.LogIn);
            }}
            text="Log In"
            variant={ButtonVariant.SECONDARY}
            className="mt-3"
          />
        </Fragment>
      ),
    },
    [View.SignUp]: {
      title: "Sign Up",
      content: <SignUpForm />,
    },
    [View.LogIn]: {
      title: "Log In",
      content: "Log In",
    },
  };

  return (
    <motion.div
      className="absolute bottom-0 left-[50%] translate-x-[-50%] backdrop-blur-sm h-[35svh] w-[90%] bg-background/70 rounded-md flex flex-col items-center px-5 z-3"
      transition={{ duration: 0.5 }}
      initial={RETRACTED_STYLES}
      animate={isRetracting ? RETRACTED_STYLES : { bottom: "0px" }}
      onAnimationComplete={() => {
        setDrawerIsRetracting(false);
        setView(pendingView);
      }}
    >
      <DrawerContent {...DRAWER_DATA[view]} />
    </motion.div>
  );
};
