import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const steps = [
  {
    num: "01",
    title: "Shopper uploads a photo",
    desc: "A single selfie or full-body photo. Processed entirely on our privacy-first infrastructure — never stored or shared.",
    detail:
      "Our system accepts JPEG, PNG, and WebP formats. The AI automatically detects body pose and proportions in under 500ms.",
  },
  {
    num: "02",
    title: "AI generates the try-on",
    desc: "Our photorealistic model renders your catalog clothing onto the shopper's body in under 4 seconds.",
    detail:
      "Using a proprietary diffusion model fine-tuned on fashion data, we handle fabric drape, lighting consistency, and body-type accuracy.",
  },
  {
    num: "03",
    title: "Shopper buys with confidence",
    desc: "They see how it fits, how it drapes, how it looks on their body type — and they convert.",
    detail:
      "Shoppers can try multiple items, compare looks, and share results — all within your product page. No app download needed.",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInViewAnimation();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px clamp(1.5rem, 5vw, 3rem)",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            How It Works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 72,
              maxWidth: 520,
            }}
          >
            From product page to purchase in three steps.
          </motion.h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 28,
                top: 48,
                bottom: 48,
                width: 1,
                background:
                  "linear-gradient(to bottom, rgba(232,197,71,0.3), transparent)",
              }}
            />
            {steps.map(({ num, title, desc, detail }, idx) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={idx}
                onClick={() =>
                  setActiveStep(activeStep === idx ? null : idx)
                }
                style={{
                  display: "flex",
                  gap: "clamp(20px, 4vw, 40px)",
                  padding: "36px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  animate={
                    activeStep === idx
                      ? {
                          scale: 1.1,
                          borderColor: "rgba(232,197,71,0.5)",
                        }
                      : {
                          scale: 1,
                          borderColor: "rgba(232,197,71,0.2)",
                        }
                  }
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background:
                      activeStep === idx
                        ? "rgba(232,197,71,0.2)"
                        : "rgba(232,197,71,0.1)",
                    border: "1px solid rgba(232,197,71,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#E8C547",
                    }}
                  >
                    {num}
                  </span>
                </motion.div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#F5F5F0",
                      margin: "0 0 10px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      color: "rgba(245,245,240,0.5)",
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: 520,
                    }}
                  >
                    {desc}
                  </p>
                  <AnimatePresence>
                    {activeStep === idx && (
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
                            fontSize: 14,
                            color: "#E8C547",
                            lineHeight: 1.7,
                            marginTop: 14,
                            padding: "12px 16px",
                            background: "rgba(232,197,71,0.06)",
                            borderRadius: 10,
                            border: "1px solid rgba(232,197,71,0.12)",
                            maxWidth: 520,
                          }}
                        >
                          💡 {detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
