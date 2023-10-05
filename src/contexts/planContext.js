import { createContext, useContext } from "react";
import { PLANS } from "../constants/plan";

export const PlanContext = createContext({
  plan: { ...PLANS.KING },
  setPlan: () => {},
});

export const PlanProvder = PlanContext.Provider;

export default function usePlan() {
  return useContext(PlanContext);
}
