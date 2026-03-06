import { motion } from "framer-motion";
import { scrollToSection } from "../lib/helpers";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px clamp(1.5rem, 5vw, 3rem) 80px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(232,197,71,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(232,197,71,0.1)",
              border: "1px solid rgba(232,197,71,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E8C547",
                boxShadow: "0 0 8px #E8C547",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#E8C547",
                letterSpacing: "0.5px",
              }}
            >
              NOW LIVE — SHOPIFY & WOOCOMMERCE
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#F5F5F0",
            margin: "0 0 24px",
            letterSpacing: "-2px",
          }}
        >
          Turn Browsers Into Buyers
          <br />
          <span style={{ color: "#E8C547" }}>With Photorealistic Try-On</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(245,245,240,0.55)",
            lineHeight: 1.65,
            maxWidth: 620,
            margin: "0 auto 44px",
          }}
        >
          Fitt lets shoppers see themselves in your clothing before they buy —
          reducing returns by up to 35% and lifting conversion rates by 2×.
          Plug-and-play integration. Zero engineering required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("cta");
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 30px rgba(232,197,71,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              background: "#E8C547",
              color: "#0A0A0F",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Book a Demo →
          </motion.a>
          <motion.a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("demo");
            }}
            whileHover={{
              scale: 1.03,
              background: "rgba(255,255,255,0.06)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "rgba(245,245,240,0.75)",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "inline-block",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
          >
            See Live Demo
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 56,
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "2.1×", label: "Avg. Conversion Lift" },
            { val: "35%", label: "Return Rate Reduction" },
            { val: "<3 days", label: "Integration Time" },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#F5F5F0",
                  letterSpacing: "-1px",
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(245,245,240,0.4)",
                  letterSpacing: "0.5px",
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
