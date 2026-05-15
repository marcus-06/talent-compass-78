import React, { createContext, useContext, useState, useEffect } from "react";

type Perspective = "admin" | "ceo";

interface PerspectiveContextType {
  perspective: Perspective;
  setPerspective: (p: Perspective) => void;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export function PerspectiveProvider({ children }: { children: React.ReactNode }) {
  const [perspective, setPerspectiveState] = useState<Perspective>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("app_perspective") as Perspective) || "admin";
    }
    return "admin";
  });

  const setPerspective = (p: Perspective) => {
    setPerspectiveState(p);
    localStorage.setItem("app_perspective", p);
  };

  return (
    <PerspectiveContext.Provider value={{ perspective, setPerspective }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (context === undefined) {
    throw new Error("usePerspective must be used within a PerspectiveProvider");
  }
  return context;
}
