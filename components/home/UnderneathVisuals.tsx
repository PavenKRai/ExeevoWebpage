import Image from "next/image";

export function TrustVisual() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        background: "#F6F8F9",
        boxShadow: "inset 0 0 0 1px #E8EDF0",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="aura"
        aria-hidden="true"
        style={{
          width: "240px",
          height: "200px",
          right: "-50px",
          top: "-50px",
          background: "#0762C8",
          opacity: ".2",
        }}
      ></div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              boxShadow: "inset 0 0 0 1px rgba(7,98,200,.16)",
            }}
          ></div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              boxShadow: "inset 0 0 0 1px rgba(7,98,200,.08)",
            }}
          ></div>
          <span
            className="glass"
            style={{
              position: "relative",
              display: "flex",
              width: "84px",
              height: "84px",
              borderRadius: "24px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/microsoft/entra.png"
              alt="Microsoft Entra ID"
              width={44}
              height={44}
              style={{ width: "44px", height: "44px" }}
            />
          </span>
          <span
            className="glass tt-chip"
            style={{
              position: "absolute",
              left: "4%",
              top: "22%",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "12.5px",
              color: "#1D262D",
            }}
          >
            Single sign-on
          </span>
          <span
            className="glass tt-chip"
            style={{
              position: "absolute",
              right: "2%",
              top: "30%",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "12.5px",
              color: "#1D262D",
              animationDelay: "-1.5s",
            }}
          >
            Multi-factor authentication
          </span>
          <span
            className="glass tt-chip"
            style={{
              position: "absolute",
              left: "12%",
              bottom: "8%",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "12.5px",
              color: "#1D262D",
              animationDelay: "-3s",
            }}
          >
            Conditional access
          </span>
        </div>
      </div>
    </div>
  );
}

export function ScaleVisual() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        background: "#F6F8F9",
        boxShadow: "inset 0 0 0 1px #E8EDF0",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="aura"
        aria-hidden="true"
        style={{
          width: "240px",
          height: "200px",
          right: "-50px",
          top: "-50px",
          background: "#7A3FC0",
          opacity: ".2",
        }}
      ></div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                lineHeight: "1",
                fontWeight: "250",
                letterSpacing: "-.045em",
                color: "#1D262D",
              }}
            >
              56M
            </span>
            <span style={{ fontSize: "13px", color: "#333F48", textAlign: "right" }}>
              Power Platform monthly active users
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(29,38,45,.08)",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                lineHeight: "1",
                fontWeight: "250",
                letterSpacing: "-.045em",
                color: "#1D262D",
              }}
            >
              1B
            </span>
            <span style={{ fontSize: "13px", color: "#333F48", textAlign: "right" }}>
              Microsoft Entra ID monthly active users
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                lineHeight: "1",
                fontWeight: "250",
                letterSpacing: "-.045em",
                color: "#1D262D",
              }}
            >
              15,000+
            </span>
            <span style={{ fontSize: "13px", color: "#333F48", textAlign: "right" }}>
              life sciences users on Exeevo CRM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UpdatesVisual() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        background: "#F6F8F9",
        boxShadow: "inset 0 0 0 1px #E8EDF0",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="aura"
        aria-hidden="true"
        style={{
          width: "240px",
          height: "200px",
          right: "-50px",
          top: "-50px",
          background: "#00C389",
          opacity: ".2",
        }}
      ></div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "12.5px",
              color: "#56636C",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Image
              src="/microsoft/microsoft-wordmark.webp"
              alt="Microsoft"
              width={65}
              height={13}
              style={{ height: "13px", width: "auto" }}
            />
            releases
          </span>
          <div
            style={{
              position: "relative",
              height: "56px",
              overflow: "hidden",
              borderRadius: "16px",
            }}
          >
            <div
              className="up-item"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E1E6EA,0 14px 26px -20px rgba(29,38,45,.35)",
                animationDelay: "0s",
              }}
            >
              <Image
                src="/microsoft/dynamics-customer-service.png"
                alt=""
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span style={{ flex: "1", fontSize: "13.5px", color: "#1D262D" }}>
                New Dynamics 365 capability
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#006B4B",
                }}
              >
                <span style={{ display: "flex" }}>
                  <svg
                    width="16"
                    height="16"
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
                In Exeevo
              </span>
            </div>
            <div
              className="up-item"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E1E6EA,0 14px 26px -20px rgba(29,38,45,.35)",
                animationDelay: "-2s",
              }}
            >
              <Image
                src="/microsoft/foundry.svg"
                alt=""
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span style={{ flex: "1", fontSize: "13.5px", color: "#1D262D" }}>
                New Microsoft AI model
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#006B4B",
                }}
              >
                <span style={{ display: "flex" }}>
                  <svg
                    width="16"
                    height="16"
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
                In Exeevo
              </span>
            </div>
            <div
              className="up-item"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E1E6EA,0 14px 26px -20px rgba(29,38,45,.35)",
                animationDelay: "-4s",
              }}
            >
              <Image
                src="/microsoft/azure-functions.svg"
                alt=""
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span style={{ flex: "1", fontSize: "13.5px", color: "#1D262D" }}>
                New Azure service
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#006B4B",
                }}
              >
                <span style={{ display: "flex" }}>
                  <svg
                    width="16"
                    height="16"
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
                In Exeevo
              </span>
            </div>
            <div
              className="up-item"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E1E6EA,0 14px 26px -20px rgba(29,38,45,.35)",
                animationDelay: "-6s",
              }}
            >
              <Image
                src="/microsoft/copilot-studio.svg"
                alt=""
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span style={{ flex: "1", fontSize: "13.5px", color: "#1D262D" }}>
                New Copilot capability
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#006B4B",
                }}
              >
                <span style={{ display: "flex" }}>
                  <svg
                    width="16"
                    height="16"
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
                In Exeevo
              </span>
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{ display: "flex", justifyContent: "center", color: "#9AA7AF" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6"></path>
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              borderRadius: "16px",
              padding: "1.5px",
              background: "linear-gradient(135deg,#DF1995,#0762C8 55%,#00C389)",
            }}
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "15px",
                background: "rgba(255,255,255,.95)",
              }}
            >
              <Image
                src="/brand/exeevo-icon.png"
                alt=""
                width={22}
                height={22}
                style={{ width: "22px", height: "22px" }}
              />
              <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#1D262D" }}>
                Exeevo CRM
              </span>
              <span style={{ marginLeft: "auto", fontSize: "12px", color: "#56636C" }}>
                No migration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
