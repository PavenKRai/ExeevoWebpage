"use client";
import Image from "next/image";
import { useRef } from "react";
import { LoopToggle } from "./LoopToggle";
import { ADOPTION_LOOPS } from "./loops";
import { useLoops } from "./useLoops";

/** The animated phone: a rep opens the Ask-Nova call brief, records a voice note offline, the note syncs and Ask-Nova follows up in Teams. Script-driven 14s loop (see useLoops), decorative and described by `label`. */
export function AdoptionPhone({
  label,
  pause,
  play,
}: {
  label: string;
  pause: string;
  play: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const loop = useLoops(ref, ADOPTION_LOOPS);
  return (
    <div className="group relative">
      <div
        role="img"
        aria-label={label}
        ref={ref}
        style={{
          position: "relative",
          width: "300px",
          height: "610px",
          borderRadius: "46px",
          background: "#1D262D",
          boxShadow: "0 0 0 1px #2A343B,0 50px 80px -40px rgba(29,38,45,.6)",
          margin: "0 auto",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "18px",
            transform: "translateX(-50%)",
            width: "90px",
            height: "24px",
            borderRadius: "999px",
            background: "#0D1216",
            zIndex: "9",
          }}
        ></span>
        <div
          id="ad-screen"
          style={{
            position: "absolute",
            left: "10px",
            top: "10px",
            width: "280px",
            height: "590px",
            borderRadius: "36px",
            background: "linear-gradient(180deg,#FFFFFF,#F6F8F9)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "22px",
              right: "22px",
              top: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: "500",
              color: "#1D262D",
            }}
          >
            <span>9:41</span>
            <span style={{ position: "relative", height: "18px", width: "110px" }}>
              <span
                className="ad-off"
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: "#FFF4E5",
                  color: "#9A5B00",
                  fontSize: "10.5px",
                }}
              >
                Offline
              </span>
              <span
                className="ad-on"
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: "#E3F7EF",
                  color: "#006B4B",
                  fontSize: "10.5px",
                }}
              >
                Online
              </span>
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "20px",
              right: "20px",
              top: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "500", color: "#1D262D" }}>Today</span>
            <Image
              src="/brand/exeevo-icon.png"
              alt=""
              width={24}
              height={24}
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              top: "90px",
              padding: "14px",
              borderRadius: "20px",
              background: "#FFFFFF",
              boxShadow: "0 0 0 1px #E8EDF0,0 14px 24px -20px rgba(29,38,45,.4)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Image
                src="/home/dr-okafor.jpg"
                alt=""
                width={40}
                height={40}
                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
                  Dr. Daniel Okafor
                </span>
                <span style={{ fontSize: "11px", color: "#56636C" }}>
                  10:30 · Riverside General
                </span>
              </div>
            </div>
            <span
              id="ad-brief"
              className="ad-bbtn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                height: "36px",
                borderRadius: "12px",
                background: "#F4F8FD",
                boxShadow: "inset 0 0 0 1px #CFE0F5",
                fontSize: "12.5px",
                fontWeight: "500",
                color: "#0762C8",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  flexShrink: "0",
                  background: "conic-gradient(from 200deg,#DF1995,#0762C8,#00C389,#0762C8,#DF1995)",
                }}
              ></span>
              Open call brief
            </span>
          </div>
          <div
            className="ad-brief"
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              top: "210px",
              padding: "14px",
              borderRadius: "20px",
              background: "#FFFFFF",
              boxShadow: "0 0 0 1px #E8EDF0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12.5px",
                fontWeight: "500",
                color: "#1D262D",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  flexShrink: "0",
                  background: "conic-gradient(from 200deg,#DF1995,#0762C8,#00C389,#0762C8,#DF1995)",
                }}
              ></span>
              Ask-Nova · call prep
            </span>
            <span
              style={{
                display: "flex",
                gap: "8px",
                fontSize: "11.5px",
                lineHeight: "1.4",
                color: "#333F48",
              }}
            >
              <span style={{ color: "#008A61", display: "flex", paddingTop: "1px" }}>
                <svg
                  width="12"
                  height="12"
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
              Last meeting: sample request, follow-up agreed
            </span>
            <span
              style={{
                display: "flex",
                gap: "8px",
                fontSize: "11.5px",
                lineHeight: "1.4",
                color: "#333F48",
              }}
            >
              <span style={{ color: "#008A61", display: "flex", paddingTop: "1px" }}>
                <svg
                  width="12"
                  height="12"
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
              New publication linked to this profile
            </span>
            <span
              style={{
                display: "flex",
                gap: "8px",
                fontSize: "11.5px",
                lineHeight: "1.4",
                color: "#333F48",
              }}
            >
              <span style={{ color: "#008A61", display: "flex", paddingTop: "1px" }}>
                <svg
                  width="12"
                  height="12"
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
              Approved deck ready to present
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              top: "372px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "500", color: "#1D262D", paddingLeft: "4px" }}
            >
              After the visit
            </span>
            <div
              className="ad-note"
              style={{
                minHeight: "62px",
                padding: "10px 12px",
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E8EDF0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                className="ad-wave"
                style={{ display: "flex", alignItems: "center", gap: "3px", height: "20px" }}
              >
                <span className="ad-bar" style={{ animationDelay: "-0.00s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.13s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.26s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.39s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.52s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.65s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.78s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.00s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.13s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.26s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.39s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.52s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.65s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.78s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.00s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.13s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.26s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.39s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.52s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.65s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.78s" }}></span>
                <span className="ad-bar" style={{ animationDelay: "-0.00s" }}></span>
              </div>
              <span
                className="ad-text"
                style={{
                  display: "block",
                  fontSize: "11.5px",
                  lineHeight: "1.45",
                  color: "#1D262D",
                }}
              >
                <span className="ad-ch" style={{ animationDelay: "0.000s" }}>
                  D
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.045s" }}>
                  i
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.090s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.135s" }}>
                  c
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.180s" }}>
                  u
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.225s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.270s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.315s" }}>
                  e
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.360s" }}>
                  d
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.405s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.450s" }}>
                  n
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.495s" }}>
                  e
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.540s" }}>
                  w
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.585s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.630s" }}>
                  d
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.675s" }}>
                  a
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.720s" }}>
                  t
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.765s" }}>
                  a
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.810s" }}>
                  ,
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.855s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.900s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.945s" }}>
                  a
                </span>
                <span className="ad-ch" style={{ animationDelay: "0.990s" }}>
                  m
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.035s" }}>
                  p
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.080s" }}>
                  l
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.125s" }}>
                  e
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.170s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.215s" }}>
                  r
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.260s" }}>
                  e
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.305s" }}>
                  q
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.350s" }}>
                  u
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.395s" }}>
                  e
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.440s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.485s" }}>
                  t
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.530s" }}>
                  ,
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.575s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.620s" }}>
                  f
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.665s" }}>
                  o
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.710s" }}>
                  l
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.755s" }}>
                  l
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.800s" }}>
                  o
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.845s" }}>
                  w
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.890s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.935s" }}>
                  u
                </span>
                <span className="ad-ch" style={{ animationDelay: "1.980s" }}>
                  p
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.025s" }}>
                  {" "}
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.070s" }}>
                  T
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.115s" }}>
                  h
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.160s" }}>
                  u
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.205s" }}>
                  r
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.250s" }}>
                  s
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.295s" }}>
                  d
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.340s" }}>
                  a
                </span>
                <span className="ad-ch" style={{ animationDelay: "2.385s" }}>
                  y
                </span>
              </span>
            </div>
            <span
              className="ad-saved"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#9A5B00",
                paddingLeft: "4px",
              }}
            >
              Saved to call report · syncs when back online
            </span>
            <span
              className="ad-sync"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#006B4B",
                paddingLeft: "4px",
              }}
            >
              <span style={{ display: "flex" }}>
                <svg
                  width="12"
                  height="12"
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
              Synced to Exeevo CRM
            </span>
          </div>
          <span
            id="ad-mic"
            className="ad-mic"
            style={{
              position: "absolute",
              left: "112px",
              top: "520px",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#1D262D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 14px 24px -12px rgba(29,38,45,.6)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3"></path>
            </svg>
          </span>
          <div
            className="ad-toast"
            style={{
              position: "absolute",
              left: "12px",
              right: "12px",
              top: "40px",
              padding: "12px",
              borderRadius: "18px",
              background: "rgba(255,255,255,.96)",
              boxShadow: "0 0 0 1px #E1E6EA,0 20px 34px -18px rgba(29,38,45,.5)",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              zIndex: "5",
            }}
          >
            <Image
              src="/microsoft/teams.png"
              alt=""
              width={28}
              height={28}
              style={{ width: "28px", height: "28px" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "12px", fontWeight: "500", color: "#1D262D" }}>
                Ask-Nova in Teams
              </span>
              <span style={{ fontSize: "11px", color: "#56636C" }}>
                Approved follow-up sent, logged for MLR audit
              </span>
            </div>
          </div>
          <div
            className="ad-touch"
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "38px",
              height: "38px",
              margin: "-19px 0 0 -19px",
              borderRadius: "50%",
              background: "rgba(7,98,200,.22)",
              boxShadow: "0 0 0 2px rgba(255,255,255,.9),0 4px 10px rgba(29,38,45,.25)",
              zIndex: "8",
            }}
          ></div>
        </div>
      </div>
      <LoopToggle paused={loop.paused} onToggle={loop.toggle} pause={pause} play={play} />
    </div>
  );
}
