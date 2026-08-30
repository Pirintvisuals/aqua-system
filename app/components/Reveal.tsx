"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Delay between staggered children, in ms. */
  step?: number;
};

export default function Reveal({
  children,
  className,
  stagger = false,
  step = 80,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (stagger) {
    return (
      <div ref={ref} className={className}>
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return child;
          const el = child as ReactElement<HTMLAttributes<HTMLElement>>;
          return cloneElement(el, {
            className: `${el.props.className ?? ""} reveal ${inView ? "is-in" : ""}`,
            style: { ...(el.props.style ?? {}), transitionDelay: `${i * step}ms` },
          });
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
