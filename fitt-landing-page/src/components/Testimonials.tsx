import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const testimonials = [
  {
    quote:
      "Our return rate dropped from 31% to 19% within 60 days of going live. The integration took half a day.",
    name: "Priya Mehta",
    role: "Head of Growth, Loom & Co.",
    avatar: "PM",
  },
  {
    quote:
      "We tried three different AR try-on tools. Fitt is the only one where the results actually looked photorealistic on our customers.",
    name: "Arjun Sinha",
    role: "Co-founder, Thread House",
    avatar: "AS",
  },
  {
    quote:
      "The conversion analytics dashboard alone is worth it. We finally have data on which items people try on and abandon.",
    name: "Swati Rao",
    role: "E-commerce Lead, House of Pret",
    avatar: "SR",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInViewAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.2px",
              marginBottom: 20,
              maxWidth: 480,
            }}
          >
            What our brands say.
          </motion.h2>

          {/* Dot indicators */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: 8, marginBottom: 40 }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: activeIndex === i ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    activeIndex === i
                      ? "#E8C547"
                      : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {testimonials.map(({ quote, name, role, avatar }, idx) => (
              <motion.div
                key={name}
                variants={fadeUp}
                custom={idx}
                animate={{
                  borderColor:
                    activeIndex === idx
                      ? "rgba(232,197,71,0.3)"
                      : "rgba(255,255,255,0.07)",
                  background:
                    activeIndex === idx
                      ? "rgba(232,197,71,0.05)"
                      : "rgba(255,255,255,0.03)",
                }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#E8C547",
                    marginBottom: 16,
                  }}
                >
                  ❝
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "rgba(245,245,240,0.7)",
                    lineHeight: 1.7,
                    margin: "0 0 28px",
                  }}
                >
                  {quote}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(232,197,71,0.15)",
                      border: "1px solid rgba(232,197,71,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#E8C547",
                      }}
                    >
                      {avatar}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#F5F5F0",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "rgba(245,245,240,0.35)",
                      }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
