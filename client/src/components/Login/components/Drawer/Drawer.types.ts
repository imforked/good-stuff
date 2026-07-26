import { type Dispatch, type SetStateAction, type ReactNode } from "react";
import { View } from "../../Login.types";

export type DrawerProps = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  pendingView: View;
  setPendingView: Dispatch<SetStateAction<View>>;
  isRetracting: boolean;
  setDrawerIsRetracting: SetDrawerIsRetracting;
};

export type SetDrawerIsRetracting = Dispatch<SetStateAction<boolean>>;

export type DrawerContentProps = {
  title: string;
  description?: ReactNode;
  content: ReactNode;
};
