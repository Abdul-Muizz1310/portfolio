/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "whileDrag",
  "viewport",
  "layoutId",
  "layout",
  "drag",
  "dragConstraints",
  "onAnimationStart",
  "onAnimationComplete",
]);

function filterMotionProps(props: Record<string, any>) {
  const filtered: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROPS.has(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

export const motion = new Proxy(
  {},
  {
    get: (_target: any, prop: string) => {
      const Component = React.forwardRef(({ children, ...props }: any, ref: any) => {
        return React.createElement(
          prop,
          { ...filterMotionProps(props), ref },
          children,
        );
      });
      Component.displayName = `motion.${prop}`;
      return Component;
    },
  },
);

export function AnimatePresence({ children }: any) {
  return <>{children}</>;
}
