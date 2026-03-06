import { motion } from "framer-motion";

const brands = [
  "Loom & Co.",
  "Fabindia Next",
  "Thread House",
  "Clovia Basics",
  "Zeroknot",
  "House of Pret",
];

export default function LogoBar() {
  return (
    <section
      id="logos"
      style={{
        padding: "48px clamp(1.5rem, 5vw, 3rem)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(245,245,240,0.3)",
            textAlign: "center",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Trusted by fast-growing fashion brands
        </p>
        <motion.div
          animate={{ x: [0, -600] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            gap: "clamp(40px, 6vw, 80px)",
            width: "fit-content",
          }}
        >
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(245,245,240,0.2)",
                letterSpacing: "-0.3px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
