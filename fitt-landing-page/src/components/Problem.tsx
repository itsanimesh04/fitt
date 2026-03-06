import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const problems = [
  {
    icon: "↩",
    stat: "30%",
    text: "of fashion orders are returned — most because the product looked different than expected.",
  },
  {
    icon: "↓",
    stat: "1.5%",
    text: "average fashion e-commerce conversion. The rest leave without buying.",
  },
  {
    icon: "💸",
    stat: "₹45L+",
    text: "annual revenue lost to return logistics for a ₹10Cr GMV brand.",
  },
];

export default function Problem() {
  const [ref, inView] = useInViewAnimation();

  return (
    <section
      id="problem"
      style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}
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
            The Problem
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 60,
              maxWidth: 600,
            }}
          >
            Uncertainty kills conversions.
            <br />
            Blind purchases drive returns.
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {problems.map(({ icon, stat, text }, idx) => (
              <motion.div
                key={stat}
                variants={fadeUp}
                custom={idx}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(232,197,71,0.2)",
                }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "#E8C547",
                    letterSpacing: "-1px",
                    marginBottom: 10,
                  }}
                >
                  {stat}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "rgba(245,245,240,0.55)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
