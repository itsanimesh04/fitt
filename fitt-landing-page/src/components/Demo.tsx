import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../lib/animations";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function CTABanner() {
  const [ref, inView] = useInViewAnimation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section
      id="cta"
      style={{ padding: "80px clamp(1.5rem, 5vw, 3rem)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            background:
              "linear-gradient(135deg, rgba(232,197,71,0.12) 0%, rgba(240,165,0,0.06) 100%)",
            border: "1px solid rgba(232,197,71,0.2)",
            borderRadius: 24,
            padding: "clamp(40px, 6vw, 72px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,197,71,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
              position: "relative",
            }}
          >
            Ready to convert more, return less?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(245,245,240,0.5)",
              margin: "0 auto 40px",
              maxWidth: 480,
              lineHeight: 1.65,
              position: "relative",
            }}
          >
            Book a 30-minute demo. We'll show Fitt live on your own catalog
            and model out your projected ROI.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  position: "relative",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(232,197,71,0.2)",
                    border: "2px solid #E8C547",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  ✓
                </motion.div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#E8C547",
                  }}
                >
                  Demo request sent!
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(245,245,240,0.5)",
                  }}
                >
                  We'll reach out to {email} within 24 hours.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  maxWidth: 520,
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    padding: "14px 20px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(10,10,15,0.6)",
                    color: "#F5F5F0",
                    flex: "1 1 260px",
                    minWidth: 0,
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor =
                      "rgba(232,197,71,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor =
                      "rgba(255,255,255,0.12)")
                  }
                />
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(232,197,71,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    background: "#E8C547",
                    color: "#0A0A0F",
                    padding: "14px 32px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Book a Demo →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "rgba(245,245,240,0.3)",
                marginTop: 16,
                position: "relative",
              }}
            >
              No credit card required • 30-minute call • See ROI projections
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
