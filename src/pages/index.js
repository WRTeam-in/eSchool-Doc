import React, { useEffect, useRef } from 'react';
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import logo from "../../static/images/logo/logo.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const headerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const createIcon = (x, y, velocityX = 0, velocityY = 0) => {
      const el = document.createElement("div");
      el.className = styles.cursorIcon;
      const randomIcon = Math.floor(Math.random() * 3); // 0: book, 1: pencil, 2: graduation
      const size = Math.random() * 6 + 14; // Random size between 14-20px

      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="${getIconPath(randomIcon)}" stroke="currentColor" stroke-width="1.2" fill="none"/>
      </svg>`;

      // Calculate position with velocity influence
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 20 + 5; // Closer to cursor (5-25px)
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      el.style.left = `${x + offsetX}px`;
      el.style.top = `${y + offsetY}px`;
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.color = 'rgba(255, 255, 255, 0.85)';
      el.style.transform = 'scale(0) rotate(0deg)';
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.filter = 'blur(0px)';
      el.style.opacity = '0';

      document.body.appendChild(el);

      // Calculate random rotation and movement
      const rotation = (Math.random() - 0.5) * 180; // Less rotation
      const moveX = (Math.random() - 0.5) * 60 + velocityX; // Less spread
      const moveY = -Math.random() * 60 - 30 + velocityY; // Less vertical movement

      // Trigger animation
      requestAnimationFrame(() => {
        el.style.transform = `scale(1) rotate(${rotation}deg) translate(${moveX}px, ${moveY}px)`;
        el.style.opacity = '1';
        el.style.filter = 'blur(0.5px)'; // Less blur
      });

      // Remove after animation
      setTimeout(() => {
        el.remove();
      }, 800);
    };

    const handleMouseMove = (e) => {
      // Calculate velocity
      const currentX = e.clientX;
      const currentY = e.clientY;
      velocity.current = {
        x: currentX - lastMousePos.current.x,
        y: currentY - lastMousePos.current.y
      };
      lastMousePos.current = { x: currentX, y: currentY };

      // Create icons based on velocity
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const numIcons = Math.min(Math.floor(speed / 8), 3); // Fewer icons, higher speed threshold

      for (let i = 0; i < numIcons; i++) {
        setTimeout(() => {
          createIcon(currentX, currentY, velocity.current.x, velocity.current.y);
        }, i * 40);
      }
    };

    const handleMouseEnter = (e) => {
      // Create initial burst of icons
      for (let i = 0; i < 8; i++) { // Fewer initial icons
        setTimeout(() => {
          createIcon(e.clientX, e.clientY);
        }, i * 40);
      }
    };

    header.addEventListener("mousemove", handleMouseMove);
    header.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      header.removeEventListener("mousemove", handleMouseMove);
      header.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Helper function to get SVG path data
  const getIconPath = (idx) => {
    switch (idx) {
      case 0: // book
        return "M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235 M8 7H16 M8 10.5H13 M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12";
      case 1: // pencil
        return "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z";
      case 2: // graduation
        return "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z";
      default:
        return "";
    }
  };

  return (
    <header ref={headerRef} className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="eSchool Logo"
            width="120"
            height="120"
            className={styles.logo}
          />
        </div>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/mobileApp/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}


function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z" />
                  </svg>
                </div>
                <h3>Mobile Application</h3>
              </div>
              <div className="card__body">
                <p>
                  Comprehensive step-by-step guide to setup both Flutter application codes with detailed configuration instructions.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/mobileApp/intro"
                >
                  Mobile App Setup
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5z" />
                  </svg>
                </div>
                <h3>Admin Panel</h3>
              </div>
              <div className="card__body">
                <p>
                  Complete backend code installation guide and admin panel setup instructions
                  for managing the entire eSchool ecosystem efficiently.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/adminPanel/intro"
                >
                  Admin Panel Setup
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6z" />
                  </svg>
                </div>
                <h3>Web Pages</h3>
              </div>
              <div className="card__body">
                <p>
                  Detailed school website setup and content management guide to customize
                  and maintain your institution's web presence effectively.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/webPage/intro"
                >
                  Web Pages Setup
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                </div>
                <h3>Features</h3>
              </div>
              <div className="card__body">
                <p>
                  Comprehensive feature guide with video tutorials on using all aspects of the eSchool project,
                  showcasing the complete functionality available to all user roles.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/features/intro"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className={styles.support}>
      <div className="container text--center">
        <h2>Need Help?</h2>
        <p>
          Our support team is ready to assist you with any questions or issues.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to="/support/"
          >
            Support
          </Link>
          <Link className="button button--secondary button--lg" to="/faqs/">
            FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <SupportSection />
      </main>
    </Layout>
  );
}
