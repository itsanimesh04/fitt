import { useState } from "react";
import { scrollToSection } from "../lib/helpers";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", target: "features" },
      { label: "Pricing", target: "pricing" },
      { label: "Demo", target: "demo" },
      { label: "How It Works", target: "how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", target: "faq" },
      { label: "Testimonials", target: "testimonials" },
      { label: "Blog", target: "hero" },
      { label: "Documentation", target: "hero" },
    ],
  },
];

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer
      style={{
        padding: "64px clamp(1.5rem, 5vw, 3rem) 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "clamp(24px, 4vw, 60px)",
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                cursor: "pointer",
              }}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background:
                    "linear-gradient(135deg, #E8C547, #F0A500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 2L13 5V11L8 14L3 11V5L8 2Z"
                    fill="#0A0A0F"
                  />
                  <circle cx="8" cy="8" r="2" fill="#E8C547" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#F5F5F0",
                }}
              >
                Fitt<span style={{ color: "#E8C547" }}>.</span>
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(245,245,240,0.35)",
                lineHeight: 1.65,
                maxWidth: 300,
                marginBottom: 20,
              }}
            >
              AI-powered virtual try-on for fashion e-commerce. Convert more,
              return less.
            </p>
            <a
              href="mailto:hello@fitt.ai"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#E8C547",
                textDecoration: "none",
              }}
            >
              hello@fitt.ai
            </a>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(245,245,240,0.5)",
                  letterSpacing: "0.5px",
                  marginBottom: 16,
                }}
              >
                {section.title}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.target);
                    }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,245,240,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "rgba(245,245,240,0.65)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "rgba(245,245,240,0.35)")
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(245,245,240,0.2)",
            }}
          >
            © {year} Fitt Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Security"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "rgba(245,245,240,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(245,245,240,0.6)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(245,245,240,0.3)")
                  }
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
