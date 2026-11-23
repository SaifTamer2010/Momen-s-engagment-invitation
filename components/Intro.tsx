"use client";

import { wedding } from "@/data/wedding";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { useInvitation } from "@/components/InvitationProvider";
import SealBurst from "@/components/SealBurst";

// Envelope intro: falling petals, wax seal, "Open" button.
// Click Open -> seal breaks + burst, envelope flies away, invitation appears, music starts.
export default function Intro() {
  const { open, revealed } = useInvitation();
  const { t, date, amp } = useI18n();
  const [stage, setStage] = useState<"idle" | "breaking" | "away" | "gone">("idle");

  const onOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (stage !== "idle") return;
    open(); // starts music now, reveals content after the animation
    setStage("breaking");
    setTimeout(() => setStage("away"), 580);
    setTimeout(() => setStage("gone"), 1390 + 520);
  };

  if (stage === "gone" && revealed) return null;
  const burst = stage !== "idle";
  const sealAnimation = burst ? "seal-break .6s ease-out forwards" : "seal-pulse 2s ease-in-out infinite";
  const envelopeStyle: React.CSSProperties = stage === "away" || stage === "gone" ? { animation: "envelope-away .8s ease-in forwards" } : {};
  const overlayStyle: React.CSSProperties = revealed ? { opacity: 0, transition: "opacity .5s ease", pointerEvents: "none" } : {};

  return (
    <div dir="ltr" lang="en" style={{ display: "contents" }}>
      <div style={{ background: "linear-gradient(to bottom right, #5992b0, #005885, #003f60)", ...overlayStyle }} data-landing-screenshot-id="invite-envelope" className="jsx-353cb38c53e4a74a fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div style={{ zIndex: "1" }} className="jsx-353cb38c53e4a74a absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ left: "25.452050478197634%", top: "-30px", bottom: "auto", color: "#33799d", fontSize: "15.007006538566202px", "--sway": "-8.459479920566082px", animation: "ambient-fall 21.963888101279736s ease-in-out -14.158808318990664s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "88.38539468823001%", top: "-30px", bottom: "auto", color: "#ffffff", fontSize: "15.27182001201436px", "--sway": "16.312729851342738px", animation: "ambient-fall 25.238135404884815s ease-in-out -7.024779369812243s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "29.004992549307644%", top: "-30px", bottom: "auto", color: "#005885", fontSize: "13.039998340886086px", "--sway": "6.97245541960001px", animation: "ambient-fall 20.055739058181643s ease-in-out -16.085425538104598s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "65.7459561759606%", top: "-30px", bottom: "auto", color: "#ffffff", fontSize: "16.261633888818324px", "--sway": "16.321625970304012px", animation: "ambient-fall 20.071068458259106s ease-in-out -19.10793475425293s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "91.90487039741129%", top: "-30px", bottom: "auto", color: "#005885", fontSize: "15.092103925999254px", "--sway": "20.994266644120216px", animation: "ambient-fall 25.2587063126266s ease-in-out -24.07113760368353s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "28.961116806603968%", top: "-30px", bottom: "auto", color: "#33799d", fontSize: "14.215949929319322px", "--sway": "-2.9930042568594217px", animation: "ambient-fall 20.697685221210122s ease-in-out -3.0906405585198127s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "48.89610924059525%", top: "-30px", bottom: "auto", color: "#99bcce", fontSize: "15.882312011439353px", "--sway": "-3.140653660520911px", animation: "ambient-fall 22.37275079637766s ease-in-out -14.468556306260071s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "94.91339025553316%", top: "-30px", bottom: "auto", color: "#33799d", fontSize: "20.163862473331392px", "--sway": "-15.392423858866096px", animation: "ambient-fall 23.80219050310552s ease-in-out -10.842506381535422s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "90.43589639477432%", top: "-30px", bottom: "auto", color: "#005885", fontSize: "20.10720789153129px", "--sway": "-5.851194555871189px", animation: "ambient-fall 24.972542630508542s ease-in-out -1.2347808251115526s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "88.2924273959361%", top: "-30px", bottom: "auto", color: "#669bb6", fontSize: "19.157594034913927px", "--sway": "4.472960522398353px", animation: "ambient-fall 23.307894939556718s ease-in-out -10.745764225427646s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "51.58204581355676%", top: "-30px", bottom: "auto", color: "#ffffff", fontSize: "11.035505250561982px", "--sway": "17.878506272099912px", animation: "ambient-fall 23.76237553358078s ease-in-out -15.145185823416718s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
          <div style={{ left: "69.5292898803018%", top: "-30px", bottom: "auto", color: "#005885", fontSize: "21.75520630273968px", "--sway": "19.579349225386977px", animation: "ambient-fall 18.36844327673316s ease-in-out -1.9751207480616357s infinite" } as React.CSSProperties} className="jsx-353cb38c53e4a74a absolute">
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)"></ellipse>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)"></ellipse>
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45"></circle>
            </svg>
          </div>
        </div>
        <div style={{ zIndex: "10", ...envelopeStyle }} className="jsx-353cb38c53e4a74a relative">
          <div className="jsx-353cb38c53e4a74a relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div className="jsx-353cb38c53e4a74a absolute left-1/2 rounded-full flex items-center justify-center" style={{ top: "50px", width: "72px", height: "72px", transform: "translate(-50%, -50%)", background: "radial-gradient(circle at 30% 30%, #005885, rgb(0, 58, 103))", "--shadow-color": "rgba(0, 88, 133, 0.5)", boxShadow: "0 4px 20px rgba(0, 88, 133, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)", zIndex: "30" , animation: sealAnimation } as React.CSSProperties}>
            {/* wax seal initials (data/wedding.ts → sealInitials) */}
            <span dir="ltr" className="seal-initials" style={{ color: "#fdfbf5", fontFamily: "\"Alex Brush\", cursive", fontSize: 12, lineHeight: 1, whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(0,0,0,.25)" }}>
              {wedding.sealInitials}
            </span>
          </div>
          {burst && <SealBurst top={"50px"} />}
            <div style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 88, 133, 0.15)" }} className="jsx-353cb38c53e4a74a relative rounded-lg">
              <div style={{ background: "#fdfbf5", border: "1px solid rgba(0, 88, 133, 0.15)", clipPath: "inset(0 round 8px)" }} className="jsx-353cb38c53e4a74a absolute inset-0 rounded-lg overflow-hidden">
                <img src="/images/themes/riviera-blue/envelope-scene.webp" alt="" aria-hidden="true" className="jsx-353cb38c53e4a74a absolute pointer-events-none h-130 md:h-240 w-auto max-w-none bottom-[-55px] md:bottom-[-220px] right-[-85px] md:right-[-166px] opacity-35" />
              </div>
              <div className="jsx-353cb38c53e4a74a relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
                <h1 style={{ color: "#005885", fontFamily: "\"Viaoda Libre\", \"EB Garamond\", ChungDoiIndic, cursive" }} className="names jsx-353cb38c53e4a74a mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl">
                  <span style={{ fontFamily: "\"Viaoda Libre\", \"EB Garamond\", ChungDoiIndic, cursive" }} className="jsx-353cb38c53e4a74a block w-full text-center">
                    {t(wedding.couple[0])}
                  </span>
                  <span style={{ fontFamily: "\"Alex Brush\", \"The Nautigal\", ChungDoiIndic, cursive" }} className="jsx-353cb38c53e4a74a block w-full text-center text-lg leading-none sm:text-xl">
                    {amp}
                  </span>
                  <span style={{ fontFamily: "\"Viaoda Libre\", \"EB Garamond\", ChungDoiIndic, cursive" }} className="jsx-353cb38c53e4a74a block w-full text-center">
                    {t(wedding.couple[1])}
                  </span>
                </h1>
                <div className="jsx-353cb38c53e4a74a flex items-center justify-center gap-3 mb-2">
                  <div style={{ background: "linear-gradient(to right, transparent, #005885)" }} className="jsx-353cb38c53e4a74a w-10 h-px"></div>
                  <span style={{ color: "#005885", opacity: "0.7" }} className="jsx-353cb38c53e4a74a text-sm">
                    ❦
                  </span>
                  <div style={{ background: "linear-gradient(to left, transparent, #005885)" }} className="jsx-353cb38c53e4a74a w-10 h-px"></div>
                </div>
                <div style={{ color: "rgba(0, 0, 0, 0.82)", fontFamily: "\"Lora\", \"Times New Roman\", ChungDoiIndic, serif" }} className="jsx-353cb38c53e4a74a text-[18px] mb-5 flex flex-col items-center">
                  <span dir="auto">
                    {date.long}
              </span>
              <span className="text-[14px]" style={{ opacity: 0.7 }}>
                {t(wedding.cityLine)}
                  </span>
                </div>
                <div className="jsx-353cb38c53e4a74a mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
                  <p style={{ color: "rgba(0, 0, 0, 0.82)", fontFamily: "\"Lora\", \"Times New Roman\", ChungDoiIndic, serif" }} className="jsx-353cb38c53e4a74a text-[18px] font-light mb-2">
                    <span dir="auto">
                      {t(wedding.text.introLine)}
                    </span>
                  </p>
                </div>
                <a rel="nofollow" aria-busy="false" style={{ backgroundColor: "#005885", color: "#fdfbf5", boxShadow: "0 4px 14px rgba(0, 88, 133, 0.35)", fontFamily: "\"Lora\", \"Times New Roman\", ChungDoiIndic, serif", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }} className="jsx-353cb38c53e4a74a relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg no-underline cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden" role="button" onClick={onOpen}>
                  <span dir="auto">
                    {t(wedding.text.open)}
                  </span>
                  <div style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", animation: "shine 3s ease-in-out infinite" }} className="jsx-353cb38c53e4a74a absolute top-0 h-full w-8 pointer-events-none"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
