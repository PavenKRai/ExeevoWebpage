import Image from "next/image";

/** The animated HCP 360 record: a pointer hovers four parts of the screen and each reveals the Microsoft technology underneath. Pure CSS loop (14s), decorative and described by `label`; under reduced motion only the first note shows. */
export function RecordDemo({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "583px",
        maxWidth: "100%",
        height: "508px",
        marginLeft: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          width: "620px",
          transform: "scale(.94)",
          transformOrigin: "top right",
        }}
      >
        <div
          role="img"
          aria-label={label}
          data-orb=""
          style={{
            position: "relative",
            width: "620px",
            height: "540px",
            borderRadius: "20px",
            background: "#FFFFFF",
            boxShadow: "0 0 0 1px #E1E6EA,0 30px 60px -40px rgba(29,38,45,.45)",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              height: "44px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 14px",
              borderBottom: "1px solid #EEF2F4",
              background:
                "linear-gradient(90deg,rgba(223,25,149,.05),rgba(7,98,200,.06) 55%,rgba(0,195,137,.05))",
            }}
          >
            <Image
              src="/brand/exeevo-icon.png"
              alt=""
              width={18}
              height={18}
              style={{ width: "18px", height: "18px" }}
            />
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
              Exeevo CRM
            </span>
            <span style={{ fontSize: "12px", color: "#56636C" }}>· HCP 360</span>
            <span
              style={{
                marginLeft: "auto",
                width: "180px",
                height: "26px",
                borderRadius: "999px",
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #E1E6EA",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: "11px",
                color: "#56636C",
              }}
            >
              Search accounts
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "0", right: "0", top: "44px", bottom: "0" }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "linear-gradient(180deg,#FFFFFF,#FAFBFC)",
              }}
            >
              <div
                className="d-h1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px",
                  borderRadius: "14px",
                }}
              >
                <Image
                  src="/home/dr-okafor.jpg"
                  alt=""
                  width={54}
                  height={54}
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 0 0 3px #FFFFFF,0 0 0 4px #D3DBE0",
                  }}
                />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "500", color: "#1D262D" }}>
                    Dr. Daniel Okafor
                  </span>
                  <span style={{ fontSize: "12px", color: "#56636C" }}>
                    Consultant Cardiologist · Riverside General Hospital
                  </span>
                  <span style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "#E8F1FC",
                        color: "#0762C8",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      Tier 1 HCP
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "#E3F7EF",
                        color: "#006B4B",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      KOL
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "#F6F8F9",
                        color: "#333F48",
                        fontSize: "11px",
                      }}
                    >
                      Territory North 04
                    </span>
                  </span>
                </div>
                <span
                  className="d-h3"
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 14px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg,rgba(223,25,149,.12),rgba(7,98,200,.12) 55%,rgba(0,195,137,.12))",
                    boxShadow: "0 0 0 1px #E1E6EA",
                    fontSize: "12.5px",
                    fontWeight: "500",
                    color: "#1D262D",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background:
                        "conic-gradient(from 200deg,#DF1995,#0762C8,#00C389,#0762C8,#DF1995)",
                    }}
                  ></span>
                  Prep my call
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  padding: "0 6px",
                  borderBottom: "1px solid #EEF2F4",
                  fontSize: "12px",
                  color: "#56636C",
                }}
              >
                <span
                  style={{
                    paddingBottom: "8px",
                    color: "#0762C8",
                    fontWeight: "500",
                    boxShadow: "inset 0 -2px 0 #0762C8",
                  }}
                >
                  Overview
                </span>
                <span>Calls</span>
                <span>Medical</span>
                <span>Consent</span>
                <span>Events</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "#56636C" }}>Last visit</span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    12 days ago
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "#56636C" }}>Next call</span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    Thu · 10:30
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "#56636C" }}>Preferred channel</span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    In person
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "#56636C" }}>Call-plan attainment</span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    <span style={{ color: "#006B4B" }}>On track</span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "#56636C" }}>Consent</span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      Email · Events{" "}
                      <span style={{ color: "#008A61", display: "flex" }}>
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
                    </span>
                  </span>
                </div>
                <div
                  className="d-h2"
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #E8EDF0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "10.5px",
                      color: "#7A3FC0",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M6 11V8a6 6 0 0 1 12 0v3 M5 11h14v10H5z"></path>
                    </svg>
                    Sample allocation
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#1D262D" }}>
                    Visible to your role
                  </span>
                </div>
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: "#FFFFFF",
                  boxShadow: "0 0 0 1px #E8EDF0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "11.5px", fontWeight: "500", color: "#1D262D" }}>
                  Recent activity
                </span>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      marginTop: "4px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      flexShrink: "0",
                      background:
                        "radial-gradient(circle at 35% 30%,rgba(255,255,255,.75),#0762C8 55%)",
                    }}
                  ></span>
                  <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#1D262D" }}>
                      Call logged · product detailing
                    </span>
                    <span style={{ fontSize: "10.5px", color: "#56636C" }}>
                      Approved deck, follow-up agreed
                    </span>
                  </div>
                  <span style={{ fontSize: "10.5px", color: "#56636C", whiteSpace: "nowrap" }}>
                    12d
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      marginTop: "4px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      flexShrink: "0",
                      background:
                        "radial-gradient(circle at 35% 30%,rgba(255,255,255,.75),#00C389 55%)",
                    }}
                  ></span>
                  <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#1D262D" }}>Approved email sent</span>
                    <span style={{ fontSize: "10.5px", color: "#56636C" }}>
                      MLR approved in Teams
                    </span>
                  </div>
                  <span style={{ fontSize: "10.5px", color: "#56636C", whiteSpace: "nowrap" }}>
                    9d
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      marginTop: "4px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      flexShrink: "0",
                      background:
                        "radial-gradient(circle at 35% 30%,rgba(255,255,255,.75),#DF1995 55%)",
                    }}
                  ></span>
                  <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", color: "#1D262D" }}>
                      Invited to cardiology symposium
                    </span>
                    <span style={{ fontSize: "10.5px", color: "#56636C" }}>Event Management</span>
                  </div>
                  <span style={{ fontSize: "10.5px", color: "#56636C", whiteSpace: "nowrap" }}>
                    3d
                  </span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="d-h4"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "#F6F8F9",
                    boxShadow: "0 0 0 1px #E1E6EA",
                    fontSize: "11.5px",
                    color: "#333F48",
                  }}
                >
                  <Image
                    src="/microsoft/azure-regions.png"
                    alt=""
                    width={14}
                    height={14}
                    style={{ width: "14px", height: "14px" }}
                  />
                  Hosted in the EU · Azure
                </span>
                <span style={{ fontSize: "11px", color: "#56636C" }}>Sample record</span>
              </div>
            </div>
            <div
              className="d-t1"
              style={{
                position: "absolute",
                left: "22px",
                top: "104px",
                width: "250px",
                borderRadius: "16px",
                background: "rgba(255,255,255,.96)",
                boxShadow: "0 0 0 1px #E1E6EA,0 24px 40px -24px rgba(29,38,45,.45)",
                overflow: "hidden",
                zIndex: "6",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  src="/microsoft/power-platform.png"
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px", flexShrink: "0" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
                    Microsoft Power Platform
                  </span>
                  <span style={{ fontSize: "11.5px", lineHeight: "1.45", color: "#56636C" }}>
                    This record screen is a Power App on Dataverse, with Exeevo’s pharma data model.
                  </span>
                </div>
              </div>
            </div>
            <div
              className="d-t2"
              style={{
                position: "absolute",
                right: "18px",
                top: "263px",
                width: "250px",
                borderRadius: "16px",
                background: "rgba(255,255,255,.96)",
                boxShadow: "0 0 0 1px #E1E6EA,0 24px 40px -24px rgba(29,38,45,.45)",
                overflow: "hidden",
                zIndex: "6",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  src="/microsoft/dataverse.png"
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px", flexShrink: "0" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
                    Microsoft Dataverse
                  </span>
                  <span style={{ fontSize: "11.5px", lineHeight: "1.45", color: "#56636C" }}>
                    Role-based security down to the record and field. You only see what your role
                    allows.
                  </span>
                </div>
              </div>
            </div>
            <div
              className="d-t3"
              style={{
                position: "absolute",
                right: "16px",
                top: "84px",
                width: "250px",
                borderRadius: "16px",
                background: "rgba(255,255,255,.96)",
                boxShadow: "0 0 0 1px #E1E6EA,0 24px 40px -24px rgba(29,38,45,.45)",
                overflow: "hidden",
                zIndex: "6",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  src="/microsoft/foundry.svg"
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px", flexShrink: "0" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
                    Microsoft Foundry
                  </span>
                  <span style={{ fontSize: "11.5px", lineHeight: "1.45", color: "#56636C" }}>
                    Ask-Nova runs here, on enterprise models. Client data is not used to train them.
                  </span>
                </div>
              </div>
            </div>
            <div
              className="d-t4"
              style={{
                position: "absolute",
                left: "20px",
                top: "338px",
                width: "250px",
                borderRadius: "16px",
                background: "rgba(255,255,255,.96)",
                boxShadow: "0 0 0 1px #E1E6EA,0 24px 40px -24px rgba(29,38,45,.45)",
                overflow: "hidden",
                zIndex: "6",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  src="/microsoft/azure-regions.png"
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px", flexShrink: "0" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#1D262D" }}>
                    Global Azure regions
                  </span>
                  <span style={{ fontSize: "11.5px", lineHeight: "1.45", color: "#56636C" }}>
                    Hosted in the region your regulators require, with EU, APAC and North America
                    residency.
                  </span>
                </div>
              </div>
            </div>
            <div className="d-cur cur" aria-hidden="true">
              <span className="d-cur-rip rip"></span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                style={{
                  position: "relative",
                  filter: "drop-shadow(0 3px 4px rgba(29,38,45,.35))",
                }}
              >
                <path
                  d="M4 2.5l15 8.2-6.6 1.7L9.8 19z"
                  fill="#1D262D"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
