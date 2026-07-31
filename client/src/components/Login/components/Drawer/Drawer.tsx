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
import { CloseButton } from "../../../CloseButton/CloseButton";
import { LogInForm } from "../LogInForm";

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
            variant={ButtonVariant.PRIMARY}
            className="mt-6"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setDrawerIsRetracting(true);
              setPendingView(View.LogIn);
            }}
            variant={ButtonVariant.SECONDARY}
            className="mt-3"
          >
            Log In
          </Button>
        </Fragment>
      ),
    },
    [View.SignUp]: {
      title: "Sign Up",
      content: <SignUpForm />,
    },
    [View.LogIn]: {
      title: "Log In",
      content: <LogInForm />,
    },
  };

  return (
    <motion.div
      className="absolute bottom-0 left-[50%] z-3 w-[90%] translate-x-[-50%]"
      transition={{ duration: 0.5 }}
      initial={RETRACTED_STYLES}
      animate={isRetracting ? RETRACTED_STYLES : { bottom: "0px" }}
      onAnimationComplete={() => {
        setDrawerIsRetracting(false);
        setView(pendingView);
      }}
    >
      <div className="relative flex min-h-[275px] h-fit w-full flex-col items-center rounded-md bg-background/70 p-5 py-8 backdrop-blur-sm">
        <div
          className={`${
            view === View.Welcome ? "hidden" : "absolute"
          } top-4 right-4`}
        >
          <CloseButton
            onClick={() => {
              setDrawerIsRetracting(true);
              setPendingView(View.Welcome);
            }}
          />
        </div>
        <DrawerContent {...DRAWER_DATA[view]} />
      </div>
    </motion.div>
  );
};
