export type ButtonProps = {
  variant: ButtonVariant;
  onClick: () => void;
  text: string;
  className?: string;
};

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export type ButtonStyles = Record<ButtonVariant, string>;
