import { RECOMMENDATIONS } from "../../Login.data";

export const getNextRecIndex = (recIndex: number): number => {
  if (recIndex === RECOMMENDATIONS.length - 1) {
    return 0;
  }

  return recIndex + 1;
};
