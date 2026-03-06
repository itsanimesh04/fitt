import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { scrollToSection } from "../lib/helpers";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function Pricing() {
  const [ref, inView] = useInViewAnimation();
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Pilot",
      price: annual ? "₹7,999" : "₹9,999",
      period: "/month",
      desc: "For brands ready to test try-on on a single product line.",
      highlight: false,
      features: [
        "Up to 500 try-ons/month",
        "1 storefront integration",
        "Shopify & WooCommerce",
        "Basic analytics dashboard",
        "Email support",
        "3-day onboarding",
      ],
      cta: "Start Pilot",
    },
    {
      name: "Growth",
      price: annual ? "₹23,999" : "₹29,999",
      period: "/month",
      desc: "For brands scaling conversion across their full catalog.",
      highlight: true,
      features: [
        "Up to 5,000 try-ons/month",
        "3 storefront integrations",
        "All platforms + REST API",
        "Advanced analytics + return tracking",
        "Priority Slack support",
        "Custom widget branding",
        "A/B testing toolkit",
      ],
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large catalogs, high traffic, and custom requirements.",
      highlight: false,
      features: [
        "Unlimited try-ons",
        "Unlimited storefronts",
        "Custom model fine-tuning",
        "Dedicated infrastructure",
        "SLA & uptime guarantee",
        "Dedicated success manager",
        "White-label option",
      ],
      cta: "Talk to Sales",
    },
  ];

  return (
    <section
      id="pricing"
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
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 12,
            }}
          >
            Simple, ROI-positive pricing.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(245,245,240,0.45)",
              marginBottom: 32,
              maxWidth: 440,
            }}
          >
            Most brands recover their Fitt subscription cost within the first
            week through reduced returns alone.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: annual ? "rgba(245,245,240,0.35)" : "#F5F5F0",
                fontWeight: annual ? 400 : 600,
                transition: "all 0.2s",
              }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                background: annual ? "#E8C547" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.3s",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <motion.div
                animate={{ x: annual ? 24 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: annual ? "#0A0A0F" : "#F5F5F0",
                  position: "absolute",
                  top: 3,
                }}
              />
            </button>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: annual ? "#F5F5F0" : "rgba(245,245,240,0.35)",
                fontWeight: annual ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              Annual
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#E8C547",
                  background: "rgba(232,197,71,0.1)",
                  padding: "3px 10px",
                  borderRadius: 100,
                  border: "1px solid rgba(232,197,71,0.2)",
                }}
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {plans.map(
              (
                { name, price, period, desc, highlight, features, cta },
                idx
              ) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  custom={idx}
                  whileHover={{ y: -6 }}
                  style={{
                    background: highlight
                      ? "rgba(232,197,71,0.07)"
                      : "rgba(255,255,255,0.03)",
                    border: highlight
                      ? "1px solid rgba(232,197,71,0.3)"
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18,
                    padding: "36px 28px",
                    position: "relative",
                    transition: "transform 0.2s",
                  }}
                >
                  {highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#E8C547",
                        borderRadius: 100,
                        padding: "3px 14px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#0A0A0F",
                        }}
                      >
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <div style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: highlight
                          ? "#E8C547"
                          : "rgba(245,245,240,0.5)",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2.4rem",
                        fontWeight: 700,
                        color: "#F5F5F0",
                        letterSpacing: "-1px",
                      }}
                    >
                      {price}
                    </motion.span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "rgba(245,245,240,0.4)",
                      }}
                    >
                      {period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,245,240,0.45)",
                      lineHeight: 1.6,
                      margin: "0 0 28px",
                    }}
                  >
                    {desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 32,
                    }}
                  >
                    {features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            color: "#E8C547",
                            fontSize: 13,
                            marginTop: 1,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "rgba(245,245,240,0.6)",
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  <motion.a
                    href="#cta"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("cta");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      padding: "12px",
                      borderRadius: 10,
                      textDecoration: "none",
                      background: highlight
                        ? "#E8C547"
                        : "rgba(255,255,255,0.06)",
                      color: highlight
                        ? "#0A0A0F"
                        : "rgba(245,245,240,0.75)",
                      border: highlight
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                      transition: "background 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    {cta}
                  </motion.a>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
