"use client";
import Image from "next/image";
import { useRef } from "react";
import { LICENCE_LOOPS } from "./loops";
import { useLoops } from "./useLoops";

/** What teams often pay for today (five contracts) flowing into one Exeevo licence. Script-driven 12s loop (see useLoops); decorative. */
export function LicenceStack() {
  const ref = useRef<HTMLDivElement>(null);
  useLoops(ref, LICENCE_LOOPS);
  return (
    <div className="relative">
      <div
        ref={ref}
        aria-hidden="true"
        className="srg c12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12,minmax(0,1fr))",
          columnGap: "20px",
          rowGap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "0 4px 6px",
            }}
          >
            <span style={{ fontSize: "15px", fontWeight: "500", color: "#56636C" }}>
              What teams often pay for today
            </span>
            <span style={{ fontSize: "12px", color: "#56636C" }}>5 contracts · 5 logins</span>
          </div>
          <div
            className="li-l0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.6)",
              boxShadow: "inset 0 0 0 1px rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
                background: "#ECEFF1",
                color: "#56636C",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 7h14M5 12h14M5 17h9"></path>
              </svg>
            </span>
            <span style={{ flex: "1", fontSize: "13.5px", color: "#333F48" }}>CRM</span>
            <span
              style={{
                fontSize: "11px",
                color: "#56636C",
                padding: "3px 8px",
                borderRadius: "999px",
                boxShadow: "inset 0 0 0 1px #D9E0E5",
              }}
            >
              Separate licence
            </span>
          </div>
          <div
            className="li-l1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.6)",
              boxShadow: "inset 0 0 0 1px rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
                background: "#ECEFF1",
                color: "#56636C",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 7h14M5 12h14M5 17h9"></path>
              </svg>
            </span>
            <span style={{ flex: "1", fontSize: "13.5px", color: "#333F48" }}>
              Marketing automation tool
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#56636C",
                padding: "3px 8px",
                borderRadius: "999px",
                boxShadow: "inset 0 0 0 1px #D9E0E5",
              }}
            >
              Separate licence
            </span>
          </div>
          <div
            className="li-l2"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.6)",
              boxShadow: "inset 0 0 0 1px rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
                background: "#ECEFF1",
                color: "#56636C",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 7h14M5 12h14M5 17h9"></path>
              </svg>
            </span>
            <span style={{ flex: "1", fontSize: "13.5px", color: "#333F48" }}>Event platform</span>
            <span
              style={{
                fontSize: "11px",
                color: "#56636C",
                padding: "3px 8px",
                borderRadius: "999px",
                boxShadow: "inset 0 0 0 1px #D9E0E5",
              }}
            >
              Separate licence
            </span>
          </div>
          <div
            className="li-l3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.6)",
              boxShadow: "inset 0 0 0 1px rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
                background: "#ECEFF1",
                color: "#56636C",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 7h14M5 12h14M5 17h9"></path>
              </svg>
            </span>
            <span style={{ flex: "1", fontSize: "13.5px", color: "#333F48" }}>
              Content and approvals tool
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#56636C",
                padding: "3px 8px",
                borderRadius: "999px",
                boxShadow: "inset 0 0 0 1px #D9E0E5",
              }}
            >
              Separate licence
            </span>
          </div>
          <div
            className="li-l4"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.6)",
              boxShadow: "inset 0 0 0 1px rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
                background: "#ECEFF1",
                color: "#56636C",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 7h14M5 12h14M5 17h9"></path>
              </svg>
            </span>
            <span style={{ flex: "1", fontSize: "13.5px", color: "#333F48" }}>AI add-on</span>
            <span
              style={{
                fontSize: "11px",
                color: "#56636C",
                padding: "3px 8px",
                borderRadius: "999px",
                boxShadow: "inset 0 0 0 1px #D9E0E5",
              }}
            >
              Separate licence
            </span>
          </div>
        </div>
        <div
          className="hide-md"
          aria-hidden="true"
          style={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            color: "#9AA7AF",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "2px",
              borderRadius: "2px",
              background: "#D9E0E5",
              overflow: "hidden",
            }}
          >
            <span className="li-flow"></span>
          </div>
          <span style={{ fontSize: "12px", color: "#56636C", whiteSpace: "nowrap" }}>
            Consolidated into
          </span>
        </div>
        <div
          className="glass"
          style={{
            gridColumn: "span 5",
            borderRadius: "26px",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 2px 10px",
              borderBottom: "1px solid rgba(29,38,45,.08)",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "16px",
                fontWeight: "500",
                letterSpacing: "-.02em",
                color: "#1D262D",
              }}
            >
              <Image
                src="/brand/exeevo-icon.png"
                alt=""
                width={26}
                height={26}
                style={{ width: "26px", height: "26px" }}
              />
              One Exeevo licence
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#006B4B",
                padding: "4px 10px",
                borderRadius: "999px",
                background: "#E3F7EF",
              }}
            >
              1 contract · 1 login
            </span>
          </div>
          <div
            className="li-r0"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            <span
              className="li-ck0"
              style={{
                display: "flex",
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13.5px", color: "#1D262D" }}>Sales and Medical CRM</span>
          </div>
          <div
            className="li-r1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            <span
              className="li-ck1"
              style={{
                display: "flex",
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13.5px", color: "#1D262D" }}>Marketing Automation</span>
          </div>
          <div
            className="li-r2"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            <span
              className="li-ck2"
              style={{
                display: "flex",
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13.5px", color: "#1D262D" }}>Event Management</span>
          </div>
          <div
            className="li-r3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            <span
              className="li-ck3"
              style={{
                display: "flex",
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13.5px", color: "#1D262D" }}>
              Content Management, MLR in Teams
            </span>
          </div>
          <div
            className="li-r4"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            <span
              className="li-ck4"
              style={{
                display: "flex",
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            <span style={{ fontSize: "13.5px", color: "#1D262D" }}>Ask-Nova AI, included</span>
          </div>
          <div
            style={{
              marginTop: "8px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(29,38,45,.08)",
              fontSize: "12.5px",
              color: "#56636C",
            }}
          >
            No bolt-on modules and no separate contracts as teams grow.
          </div>
        </div>
      </div>
    </div>
  );
}
