import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <h2 className="text-2xl font-bold">DevTinder</h2>

        <p>
          A platform for developers to connect,
          <br />
          collaborate, and build great things together.
          <br />
          <span className="mt-2 block">
            Built by Yuvraj Kumar © {new Date().getFullYear()}
          </span>
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Connect</h6>

        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/yuvrajk-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.009 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          <a
            href="https://yuvrajk-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.9 6h-2.95a15.7 15.7 0 0 0-1.38-3.06A8.03 8.03 0 0 1 18.9 8zM12 4c.83 1.2 1.47 2.55 1.87 4h-3.74C10.53 6.55 11.17 5.2 12 4zM4.26 14A8.1 8.1 0 0 1 4 12c0-.69.09-1.36.26-2h3.23a16.6 16.6 0 0 0 0 4H4.26zm.84 2h2.95c.34 1.1.8 2.13 1.38 3.06A8.03 8.03 0 0 1 5.1 16zm2.95-8H5.1a8.03 8.03 0 0 1 4.33-3.06A15.7 15.7 0 0 0 8.05 8zM12 20c-.83-1.2-1.47-2.55-1.87-4h3.74c-.4 1.45-1.04 2.8-1.87 4zm2.34-6H9.66a14.6 14.6 0 0 1 0-4h4.68a14.6 14.6 0 0 1 0 4zm.23 5.06c.58-.93 1.04-1.96 1.38-3.06h2.95a8.03 8.03 0 0 1-4.33 3.06zM16.51 14a16.6 16.6 0 0 0 0-4h3.23c.17.64.26 1.31.26 2s-.09 1.36-.26 2h-3.23z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/yuvrajkumar01/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.369 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
