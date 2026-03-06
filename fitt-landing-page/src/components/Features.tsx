import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const faqs = [
  {
    q: "How complex is the integration?",
    a: "For Shopify, it's a one-click app install. For other platforms, it's a single script tag or a React component. The median integration time across our brands is 2.5 days — no backend changes or engineering sprints required.",
  },
  {
    q: "What happens to the shopper's photo?",
    a: "Shopper photos are processed in-memory on our isolated compute infrastructure and are never stored, logged, or used for any other purpose. We are fully GDPR and India DPDP compliant. We can share our Data Processing Agreement on request.",
  },
  {
    q: "How accurate is the try-on?",
    a: "Fitt uses a photorealistic rendering model trained on fashion-specific data. It correctly handles fabric drape, fit variation across body types, and texture fidelity. It's meaningfully different from flat color overlays or AR markers — which is why it actually impacts return rates.",
  },
  {
    q: "Will it actually reduce my return rates?",
    a: "Across our live brand cohort, the average return rate reduction is 35% for items where try-on is used at checkout. The impact is strongest for tops, dresses, and tailored bottoms — categories where fit uncertainty drives most returns.",
  },
  {
    q: "How long does setup take end-to-end?",
    a: "From signed agreement to live widget: 3 business days on average. Day 1 is access and catalog sync. Day 2 is widget configuration and brand customization. Day 3 is QA, UAT, and go-live. Your team needs to spend maybe 2–3 hours total.",
  },
];

export default function FAQ() {
  const [ref, inView] = useInViewAnimation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.2px",
              marginBottom: 48,
            }}
          >
            Common questions.
          </motion.h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                  onMouseEnter={(e) => {
                    const span = e.currentTarget.querySelector(
                      ".faq-q"
                    ) as HTMLElement;
                    if (span) span.style.color = "#E8C547";
                  }}
                  onMouseLeave={(e) => {
                    const span = e.currentTarget.querySelector(
                      ".faq-q"
                    ) as HTMLElement;
                    if (span)
                      span.style.color =
                        open === i ? "#E8C547" : "#F5F5F0";
                  }}
                >
                  <span
                    className="faq-q"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: open === i ? "#E8C547" : "#F5F5F0",
                      transition: "color 0.2s",
                    }}
                  >
                    {q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: 20,
                      color: "#E8C547",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 15,
                          color: "rgba(245,245,240,0.55)",
                          lineHeight: 1.75,
                          margin: "0 0 24px",
                          maxWidth: 620,
                        }}
                      >
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
