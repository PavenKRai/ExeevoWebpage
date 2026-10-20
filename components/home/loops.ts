import type { Loop } from "./useLoops";

/** Keyframes copied from the CCO Home design (adoption phone, 14s; licence stack, 12s). Static look of each element lives in home.css. */
export const ADOPTION_LOOPS: Loop[] = [
  {
    selector: ".ad-touch",
    duration: 14000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,4%{left:180px;top:294px;opacity:0;scale:1}8%{opacity:1}13%{left:140px;top:174px;scale:1}14.5%{scale:.7}16%{scale:1}22%{left:170px;top:394px;opacity:.0}36%{left:140px;top:488px;opacity:0}40%{left:140px;top:548px;opacity:1;scale:1}41.5%{scale:.7}43%{scale:1}47%{opacity:0}100%{left:140px;top:548px;opacity:0}",
  },
  {
    selector: ".ad-bbtn",
    duration: 14000,
    easing: "linear",
    frames: "0%,14.5%{background:#F4F8FD}15%,18%{background:#DCEAFB}22%,100%{background:#F4F8FD}",
  },
  {
    selector: ".ad-brief",
    duration: 14000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames: "0%,15%{opacity:0;translate:0 14px}19%,92%{opacity:1;translate:0 0}96%,100%{opacity:0}",
  },
  {
    selector: ".ad-off",
    duration: 14000,
    easing: "linear",
    frames: "0%,30%{opacity:0}33%,66%{opacity:1}68%,100%{opacity:0}",
  },
  {
    selector: ".ad-on",
    duration: 14000,
    easing: "linear",
    frames: "0%,30%{opacity:1}33%,66%{opacity:0}68%,100%{opacity:1}",
  },
  {
    selector: ".ad-mic",
    duration: 14000,
    easing: "linear",
    frames:
      "0%,41.5%{background:#1D262D;box-shadow:0 14px 24px -12px rgba(29,38,45,.6)}42%,56%{background:#DF1995;box-shadow:0 0 0 8px rgba(223,25,149,.15),0 14px 24px -12px rgba(223,25,149,.6)}58%,100%{background:#1D262D;box-shadow:0 14px 24px -12px rgba(29,38,45,.6)}",
  },
  {
    selector: ".ad-wave",
    duration: 14000,
    easing: "linear",
    frames: "0%,42%{opacity:0;height:0}43%,56%{opacity:1;height:20px}58%,100%{opacity:0;height:0}",
  },
  {
    selector: ".ad-bar",
    duration: 600,
    easing: "ease-in-out",
    frames: "0%,100%{height:4px}50%{height:18px}",
  },
  {
    selector: ".ad-ch",
    duration: 14000,
    easing: "linear",
    frames: "0%,44%{font-size:0}44.2%,93%{font-size:11.5px}93.2%,100%{font-size:0}",
  },
  {
    selector: ".ad-text",
    duration: 14000,
    easing: "ease-in-out",
    frames: "0%,42%{opacity:0}43%,87%{opacity:1}91%,100%{opacity:0}",
  },
  {
    selector: ".ad-saved",
    duration: 14000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames: "0%,58%{opacity:0;translate:0 4px}61%,67%{opacity:1;translate:0 0}69%,100%{opacity:0}",
  },
  {
    selector: ".ad-sync",
    duration: 14000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames: "0%,68%{opacity:0;translate:0 4px}71%,92%{opacity:1;translate:0 0}96%,100%{opacity:0}",
  },
  {
    selector: ".ad-toast",
    duration: 14000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,74%{opacity:0;translate:0 -16px}78%,90%{opacity:1;translate:0 0}94%,100%{opacity:0;translate:0 -16px}",
  },
];

export const LICENCE_LOOPS: Loop[] = [
  {
    selector: ".li-l0",
    duration: 12000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,8%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}10%,14%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1.5px #0762C8}17%,88%{opacity:.7;translate:10px 0;filter:grayscale(1);box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}95%,100%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}",
  },
  {
    selector: ".li-r0",
    duration: 12000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,10%{opacity:.6;background:transparent;box-shadow:none}13%,16%{opacity:1;background:rgba(255,255,255,.85);box-shadow:0 0 0 1.5px #0762C8}19%,88%{opacity:1;background:rgba(255,255,255,.7);box-shadow:none}95%,100%{opacity:.6;background:transparent;box-shadow:none}",
  },
  {
    selector: ".li-ck0",
    duration: 12000,
    easing: "linear",
    frames:
      "0%,10%{background:#ECEFF1;color:#B6C1C8}13%,88%{background:#E3F7EF;color:#008A61}95%,100%{background:#ECEFF1;color:#B6C1C8}",
  },
  {
    selector: ".li-l1",
    duration: 12000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,22%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}24%,28%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1.5px #0762C8}31%,88%{opacity:.7;translate:10px 0;filter:grayscale(1);box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}95%,100%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}",
  },
  {
    selector: ".li-r1",
    duration: 12000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,24%{opacity:.6;background:transparent;box-shadow:none}27%,30%{opacity:1;background:rgba(255,255,255,.85);box-shadow:0 0 0 1.5px #0762C8}33%,88%{opacity:1;background:rgba(255,255,255,.7);box-shadow:none}95%,100%{opacity:.6;background:transparent;box-shadow:none}",
  },
  {
    selector: ".li-ck1",
    duration: 12000,
    easing: "linear",
    frames:
      "0%,24%{background:#ECEFF1;color:#B6C1C8}27%,88%{background:#E3F7EF;color:#008A61}95%,100%{background:#ECEFF1;color:#B6C1C8}",
  },
  {
    selector: ".li-l2",
    duration: 12000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,36%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}38%,42%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1.5px #0762C8}45%,88%{opacity:.7;translate:10px 0;filter:grayscale(1);box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}95%,100%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}",
  },
  {
    selector: ".li-r2",
    duration: 12000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,38%{opacity:.6;background:transparent;box-shadow:none}41%,44%{opacity:1;background:rgba(255,255,255,.85);box-shadow:0 0 0 1.5px #0762C8}47%,88%{opacity:1;background:rgba(255,255,255,.7);box-shadow:none}95%,100%{opacity:.6;background:transparent;box-shadow:none}",
  },
  {
    selector: ".li-ck2",
    duration: 12000,
    easing: "linear",
    frames:
      "0%,38%{background:#ECEFF1;color:#B6C1C8}41%,88%{background:#E3F7EF;color:#008A61}95%,100%{background:#ECEFF1;color:#B6C1C8}",
  },
  {
    selector: ".li-l3",
    duration: 12000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,50%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}52%,56%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1.5px #0762C8}59%,88%{opacity:.7;translate:10px 0;filter:grayscale(1);box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}95%,100%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}",
  },
  {
    selector: ".li-r3",
    duration: 12000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,52%{opacity:.6;background:transparent;box-shadow:none}55%,58%{opacity:1;background:rgba(255,255,255,.85);box-shadow:0 0 0 1.5px #0762C8}61%,88%{opacity:1;background:rgba(255,255,255,.7);box-shadow:none}95%,100%{opacity:.6;background:transparent;box-shadow:none}",
  },
  {
    selector: ".li-ck3",
    duration: 12000,
    easing: "linear",
    frames:
      "0%,52%{background:#ECEFF1;color:#B6C1C8}55%,88%{background:#E3F7EF;color:#008A61}95%,100%{background:#ECEFF1;color:#B6C1C8}",
  },
  {
    selector: ".li-l4",
    duration: 12000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames:
      "0%,64%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}66%,70%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1.5px #0762C8}73%,88%{opacity:.7;translate:10px 0;filter:grayscale(1);box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}95%,100%{opacity:1;translate:0 0;filter:none;box-shadow:inset 0 0 0 1px rgba(29,38,45,.08)}",
  },
  {
    selector: ".li-r4",
    duration: 12000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames:
      "0%,66%{opacity:.6;background:transparent;box-shadow:none}69%,72%{opacity:1;background:rgba(255,255,255,.85);box-shadow:0 0 0 1.5px #0762C8}75%,88%{opacity:1;background:rgba(255,255,255,.7);box-shadow:none}95%,100%{opacity:.6;background:transparent;box-shadow:none}",
  },
  {
    selector: ".li-ck4",
    duration: 12000,
    easing: "linear",
    frames:
      "0%,66%{background:#ECEFF1;color:#B6C1C8}69%,88%{background:#E3F7EF;color:#008A61}95%,100%{background:#ECEFF1;color:#B6C1C8}",
  },
  {
    selector: ".li-flow",
    duration: 1600,
    easing: "linear",
    frames: "0%{left:-30%}100%{left:100%}",
  },
];

/** The three outcome visuals (call cycle, one HCP, launch): from the design's `oc-*` keyframes. */
export const OUTCOME_LOOPS: Loop[] = [
  {
    selector: ".oc-seg:not(:nth-child(7))",
    duration: 6000,
    easing: "ease-in-out",
    frames: "0%,8%{background:#E6EBEE}14%,88%{background:#0762C8}96%,100%{background:#E6EBEE}",
  },
  {
    selector: ".oc-seg:nth-child(7)",
    duration: 6000,
    easing: "ease-in-out",
    frames:
      "0%,60%{background:#E6EBEE;box-shadow:none}66%,88%{background:#FBE8F3;box-shadow:inset 0 0 0 1.5px #DF1995}96%,100%{background:#E6EBEE;box-shadow:none}",
  },
  {
    selector: ".oc-flag",
    duration: 6000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames: "0%,62%{opacity:0;translate:0 6px}68%,90%{opacity:1;translate:0 0}96%,100%{opacity:0}",
  },
  {
    selector: ".oc-bar",
    duration: 4000,
    easing: "cubic-bezier(.45,.05,.25,1)",
    frames: "0%{width:0}70%,90%{width:100%}100%{width:100%;opacity:0}",
  },
  {
    selector: ".oc-dash",
    duration: 1200,
    easing: "linear",
    frames: "0%{stroke-dashoffset:14}100%{stroke-dashoffset:0}",
  },
];

/** "Microsoft underneath" card visuals: floating chips and the cycling list of Microsoft releases. */
export const UNDERNEATH_LOOPS: Loop[] = [
  {
    selector: ".tt-chip",
    duration: 4500,
    easing: "ease-in-out",
    frames: "0%,100%{translate:0 0}50%{translate:0 -6px}",
  },
  {
    selector: ".up-item",
    duration: 8000,
    easing: "cubic-bezier(.2,.8,.2,1)",
    frames:
      "0%{transform:translateY(110%);opacity:0}6%,22%{transform:translateY(0);opacity:1}28%,100%{transform:translateY(-110%);opacity:0}",
  },
];

/** Tenant diagram: data packets flow inside the boundary; the shared-AI packet is stopped at its edge. */
export const TENANT_LOOPS: Loop[] = [
  {
    selector: ".t-pk:not(.t-up)",
    duration: 4800,
    easing: "cubic-bezier(.45,.05,.55,.95)",
    frames:
      "0%{top:30px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:calc(100% - 38px);opacity:0}",
  },
  {
    selector: ".t-pk.t-up",
    duration: 4800,
    easing: "cubic-bezier(.45,.05,.55,.95)",
    frames:
      "0%{top:calc(100% - 38px);opacity:0}10%{opacity:1}90%{opacity:1}100%{top:30px;opacity:0}",
  },
  {
    selector: ".t-out",
    duration: 8000,
    easing: "cubic-bezier(.45,.05,.55,.95)",
    frames:
      "0%,40%{top:calc(100% - 38px);opacity:0;scale:1}46%{opacity:1}62%{top:calc(100% + 52px);scale:1;opacity:1}65%{scale:1.6 .6}68%{top:calc(100% + 40px);scale:1;opacity:1}76%{top:calc(100% - 38px);opacity:0}100%{opacity:0}",
  },
  {
    selector: ".t-box",
    duration: 8000,
    easing: "linear",
    frames:
      "0%,61%{border-color:#9AA7AF;box-shadow:none}64%{border-color:#DF1995;box-shadow:0 0 0 6px rgba(223,25,149,.1)}80%,100%{border-color:#9AA7AF;box-shadow:none}",
  },
  {
    selector: ".t-tag",
    duration: 8000,
    easing: "cubic-bezier(.16,1,.3,1)",
    frames: "0%,62%{opacity:0;translate:0 6px}66%,88%{opacity:1;translate:0 0}94%,100%{opacity:0}",
  },
  {
    selector: ".t-x",
    duration: 8000,
    easing: "linear",
    frames: "0%,62%{scale:1}65%{scale:1.15}68%{scale:.95}71%,100%{scale:1}",
  },
];
