"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "ae_windshield_intro_seen_session";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function ChipToClearIntro() {
  const [show, setShow] = useState(false); // Start as false, will be set to true if conditions met

  const introRef = useRef<HTMLDivElement | null>(null);
  const rockRef = useRef<SVGGElement | null>(null);
  const rippleRef = useRef<SVGCircleElement | null>(null);
  const rippleRef2 = useRef<SVGCircleElement | null>(null);
  const chipCoreRef = useRef<SVGCircleElement | null>(null);
  const cracksRef = useRef<SVGGElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const impact = useMemo(() => ({ x: 530, y: 370 }), []); // Centered in sedan windshield

  useEffect(() => {
    // Only show on homepage
    if (typeof window === 'undefined' || window.location.pathname !== '/') {
      setShow(false);
      return;
    }

    // Respect reduced motion
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setShow(false);
      return;
    }

    // Allow forcing with query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get('show-intro') === 'true';
    
    // If forcing, clear sessionStorage
    if (forceShow) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
      setShow(true);
    } else {
      // Recommended: only run once per session (unless forced)
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === "1") {
          setShow(false);
          return;
        }
      } catch {
        // ignore storage errors; just play intro
      }
      setShow(true);
    }
  }, []);

  // Separate effect for animation - only runs when show is true
  useEffect(() => {
    if (!show) return;

    let cleanupFn: (() => void) | null = null;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const introEl = introRef.current;
      const rockEl = rockRef.current;
      const rippleEl = rippleRef.current;
      const rippleEl2 = rippleRef2.current;
      const chipCoreEl = chipCoreRef.current;
      const cracksEl = cracksRef.current;
      if (!introEl || !rockEl || !rippleEl || !rippleEl2 || !chipCoreEl || !cracksEl) return;

      const crackPaths = Array.from(cracksEl.querySelectorAll("path"));
      crackPaths.forEach((p) => {
        const len = p.getTotalLength();
        (p.style as any).strokeDasharray = `${len} ${len}`;
        (p.style as any).strokeDashoffset = `${len}`;
      });

      function setTransform(el: SVGGElement, x: number, y: number, rotDeg: number) {
        el.setAttribute("transform", `translate(${x},${y}) rotate(${rotDeg})`);
      }

      // Rock trajectory - adjusted for sedan windshield
      function rockPos(t: number) {
        const x0 = -120,
          y0 = 250;
        const x1 = impact.x - 30,
          y1 = impact.y - 50;

        const x = x0 + (x1 - x0) * t;
        const arc = Math.sin(Math.PI * t) * -80;
        const y = y0 + (y1 - y0) * t + arc;
        const rot = t * 420;
        return { x, y, rot };
      }

      // Timeline (ms)
      const T_HIT = 800;
      const T_RIPPLE = 420;
      const T_CRACK = 650;
      const T_HOLD = 650;
      const T_FADE = 550;

      function finish() {
        if (doneRef.current) return;
        doneRef.current = true;

        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}

        // Let CSS handle final fade/visibility
        introEl.classList.add("introDone");
        // Hard-hide after animation to avoid catching clicks
        window.setTimeout(() => setShow(false), 650);
      }

      function animate(ts: number) {
        if (startRef.current === null) startRef.current = ts;
        const elapsed = ts - startRef.current;

        // 1) Rock flight
        const tFly = clamp01(elapsed / T_HIT);
        const flyE = easeInOutQuad(tFly);
        const rp = rockPos(flyE);
        setTransform(rockEl, rp.x, rp.y, rp.rot);

        if (elapsed >= T_HIT) {
          // hide rock quickly after impact
          const rockFade = clamp01((elapsed - T_HIT) / 140);
          (rockEl.style as any).opacity = String(1 - rockFade);

          // 2) Ripple (dual layer for depth)
          const tR = clamp01((elapsed - T_HIT) / T_RIPPLE);
          const rE = easeOutCubic(tR);
          const rippleRadius = 8 + rE * 120;
          rippleEl.setAttribute("r", String(rippleRadius));
          rippleEl.setAttribute("opacity", String(0.9 * (1 - tR)));
          rippleEl.setAttribute("stroke-width", String(5 - 2 * tR));
          rippleEl2.setAttribute("r", String(rippleRadius * 0.85));
          rippleEl2.setAttribute("opacity", String(0.7 * (1 - tR)));
          rippleEl2.setAttribute("stroke-width", String(3 - 1.2 * tR));

          // 3) Chip core
          const coreOn = clamp01((elapsed - T_HIT) / 180);
          chipCoreEl.setAttribute("opacity", String(0.95 * coreOn));

          // 4) Crack draw - make them more visible
          const cracksOn = clamp01((elapsed - (T_HIT + 80)) / 200);
          cracksEl.setAttribute("opacity", String(1.0 * cracksOn));

          const tC = clamp01((elapsed - (T_HIT + 120)) / T_CRACK);
          const draw = easeOutCubic(tC);
          crackPaths.forEach((p) => {
            const len = p.getTotalLength();
            (p.style as any).strokeDashoffset = String(len * (1 - draw));
          });

          // 5) Fade out overlay
          const tAll = elapsed - (T_HIT + T_RIPPLE + T_CRACK + T_HOLD);
          if (tAll > 0) {
            const tF = clamp01(tAll / T_FADE);
            introEl.style.opacity = String(1 - tF);
            if (tF >= 1) {
              finish();
              return;
            }
          }
        }

        rafRef.current = requestAnimationFrame(animate);
      }

      // Reset animation state
      doneRef.current = false;
      startRef.current = null;
      rafRef.current = requestAnimationFrame(animate);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          introEl.style.opacity = "0";
          finish();
        }
      };
      window.addEventListener("keydown", onKeyDown);

      // Store cleanup function
      cleanupFn = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener("keydown", onKeyDown);
      };
    }, 50);

    return () => {
      clearTimeout(timer);
      if (cleanupFn) cleanupFn();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [impact, show]);

  if (!show) return null;

  return (
    <div ref={introRef} className="introWrap" aria-hidden="true">
      <div className="introCard">
        {/* Your real homepage is underneath this overlay */}
        <div className="introHint">Press Esc to skip</div>

        <svg className="introSvg" viewBox="0 0 1100 620" width="100%" height="100%">
          <defs>
            {/* Professional windshield glass with realistic tint */}
            <linearGradient id="windshieldGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(200,220,240,0.25)" />
              <stop offset="20%" stopColor="rgba(180,210,235,0.20)" />
              <stop offset="50%" stopColor="rgba(170,200,230,0.18)" />
              <stop offset="80%" stopColor="rgba(180,210,235,0.20)" />
              <stop offset="100%" stopColor="rgba(200,220,240,0.25)" />
            </linearGradient>

            {/* Realistic glass reflection with gradient */}
            <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="25%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="75%" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
            </linearGradient>

            {/* Realistic sky/road background */}
            <linearGradient id="skyRoad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(135,206,250,0.6)" />
              <stop offset="30%" stopColor="rgba(176,224,230,0.5)" />
              <stop offset="60%" stopColor="rgba(144,238,144,0.4)" />
              <stop offset="100%" stopColor="rgba(105,105,105,0.7)" />
            </linearGradient>

            {/* Realistic rock gradient */}
            <radialGradient id="rockGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(180,180,180,0.9)" />
              <stop offset="50%" stopColor="rgba(100,100,100,0.95)" />
              <stop offset="100%" stopColor="rgba(60,60,60,1)" />
            </radialGradient>

            {/* Enhanced crack glow for visibility */}
            <filter id="crackGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        1 0 0 0 0
                        1 0 0 0 0
                        0 0 0 1.0 0"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Realistic chip/impact glow */}
            <filter id="chipGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        1 0 0 0 0
                        1 0 0 0 0
                        0 0 0 0.8 0"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Impact shockwave */}
            <radialGradient id="shockwaveGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="30%" stopColor="rgba(200,220,255,0.6)" />
              <stop offset="70%" stopColor="rgba(150,180,220,0.3)" />
              <stop offset="100%" stopColor="rgba(100,140,200,0)" />
            </radialGradient>
          </defs>

          {/* SEDAN - Clear Side Profile - Unmistakably a Car */}
          
          {/* Main sedan body - lower, sleeker profile */}
          <rect x="280" y="320" width="540" height="200" fill="rgba(0,0,0,1)" rx="3" stroke="rgba(60,60,60,1)" strokeWidth="4" />
          
          {/* ROOF - Lower, sleeker sedan roof */}
          <rect x="320" y="320" width="460" height="140" fill="rgba(5,5,5,1)" rx="2" stroke="rgba(70,70,70,1)" strokeWidth="3" />
          
          {/* WINDSHIELD - Large trapezoid, clearly visible */}
          <polygon points="360,320 700,320 680,420 380,420" fill="url(#skyRoad)" stroke="rgba(0,0,0,1)" strokeWidth="12" />
          <polygon points="360,320 700,320 680,420 380,420" fill="url(#windshieldGlass)" />
          <polygon points="360,320 700,320 680,420 380,420" fill="url(#glassReflection)" opacity="0.5" />
          <polygon points="370,330 690,330 670,410 390,410" fill="none" stroke="rgba(80,80,80,1)" strokeWidth="4" />
          
          {/* SIDE WINDOWS - Sedan windows (front and rear) */}
          {/* Front door window */}
          <rect x="340" y="340" width="80" height="80" fill="rgba(5,5,5,0.95)" stroke="rgba(50,50,50,1)" strokeWidth="3" rx="1" />
          {/* Rear door window */}
          <rect x="520" y="340" width="80" height="80" fill="rgba(5,5,5,0.95)" stroke="rgba(50,50,50,1)" strokeWidth="3" rx="1" />
          {/* Small rear window (C-pillar area) */}
          <rect x="600" y="350" width="40" height="60" fill="rgba(5,5,5,0.95)" stroke="rgba(50,50,50,1)" strokeWidth="2" rx="1" />
          
          {/* HOOD - Sleeker, lower front section */}
          <rect x="820" y="340" width="120" height="140" fill="rgba(3,3,3,1)" rx="2" stroke="rgba(60,60,60,1)" strokeWidth="4" />
          <rect x="830" y="350" width="100" height="120" fill="rgba(8,8,8,1)" />
          
          {/* FRONT GRILLE - Horizontal bars (sedan style) */}
          <rect x="880" y="380" width="50" height="60" fill="rgba(10,10,10,1)" stroke="rgba(70,70,70,1)" strokeWidth="3" />
          {[400, 410, 420, 430].map((y) => (
            <line key={y} x1="880" y1={y} x2="928" y2={y} stroke="rgba(100,100,100,1)" strokeWidth="4" />
          ))}
          
          {/* HEADLIGHT - Sleeker, more angular */}
          <ellipse cx="920" cy="400" rx="30" ry="20" fill="rgba(150,150,150,0.9)" stroke="rgba(100,100,100,1)" strokeWidth="4" />
          <ellipse cx="920" cy="400" rx="22" ry="15" fill="rgba(180,180,180,0.7)" />
          
          {/* TRUNK - Sedan trunk (no bed) */}
          <rect x="700" y="380" width="120" height="140" fill="rgba(2,2,2,1)" stroke="rgba(60,60,60,1)" strokeWidth="3" rx="2" />
          <rect x="710" y="390" width="100" height="120" fill="rgba(8,8,8,1)" />
          
          {/* WHEELS - Large, clear, unmistakable */}
          {/* Front wheel - detailed tire */}
          <circle cx="450" cy="520" r="55" fill="rgba(20,20,20,1)" stroke="rgba(50,50,50,1)" strokeWidth="5" />
          <circle cx="450" cy="520" r="48" fill="rgba(30,30,30,1)" />
          <circle cx="450" cy="520" r="40" fill="rgba(15,15,15,1)" />
          <circle cx="450" cy="520" r="32" fill="rgba(25,25,25,1)" />
          <circle cx="450" cy="520" r="24" fill="rgba(10,10,10,1)" />
          <circle cx="450" cy="520" r="16" fill="rgba(20,20,20,1)" />
          <circle cx="450" cy="520" r="10" fill="rgba(35,35,35,1)" />
          <circle cx="450" cy="520" r="6" fill="rgba(45,45,45,1)" />
          
          {/* Rear wheel - detailed tire */}
          <circle cx="750" cy="520" r="55" fill="rgba(20,20,20,1)" stroke="rgba(50,50,50,1)" strokeWidth="5" />
          <circle cx="750" cy="520" r="48" fill="rgba(30,30,30,1)" />
          <circle cx="750" cy="520" r="40" fill="rgba(15,15,15,1)" />
          <circle cx="750" cy="520" r="32" fill="rgba(25,25,25,1)" />
          <circle cx="750" cy="520" r="24" fill="rgba(10,10,10,1)" />
          <circle cx="750" cy="520" r="16" fill="rgba(20,20,20,1)" />
          <circle cx="750" cy="520" r="10" fill="rgba(35,35,35,1)" />
          <circle cx="750" cy="520" r="6" fill="rgba(45,45,45,1)" />
          
          {/* SIDE MIRROR - Driver side */}
          <ellipse cx="270" cy="360" rx="25" ry="30" fill="rgba(0,0,0,1)" stroke="rgba(70,70,70,1)" strokeWidth="4" />
          <ellipse cx="270" cy="360" rx="18" ry="22" fill="rgba(10,10,10,1)" />
          
          {/* DOOR HANDLES - Visible on sedan doors */}
          <rect x="440" y="380" width="45" height="8" fill="rgba(20,20,20,1)" stroke="rgba(60,60,60,1)" strokeWidth="2" rx="2" />
          <rect x="620" y="380" width="45" height="8" fill="rgba(20,20,20,1)" stroke="rgba(60,60,60,1)" strokeWidth="2" rx="2" />
          
          {/* Dashboard visible through windshield */}
          <rect x="420" y="440" width="300" height="40" fill="rgba(8,8,8,0.8)" rx="2" />
          <circle cx="480" cy="460" r="18" fill="none" stroke="rgba(70,70,70,0.9)" strokeWidth="4" />
          
          {/* Windshield wiper */}
          <line x1="480" y1="340" x2="560" y2="335" stroke="rgba(100,100,100,1)" strokeWidth="6" strokeLinecap="round" />

          {/* Professional rock with realistic shading - adjusted for sedan */}
          <g ref={rockRef} transform="translate(-120,250)">
            {/* Shadow */}
            <ellipse cx="3" cy="3" rx="18" ry="12" fill="rgba(0,0,0,0.4)" opacity="0.6" />
            {/* Main rock body */}
            <circle r="18" cx="0" cy="0" fill="url(#rockGradient)" />
            {/* Highlights */}
            <circle r="12" cx="-4" cy="-4" fill="rgba(220,220,220,0.4)" />
            <circle r="6" cx="-6" cy="-6" fill="rgba(255,255,255,0.6)" />
            {/* Texture details */}
            <circle r="3" cx="4" cy="3" fill="rgba(80,80,80,0.7)" />
            <circle r="2" cx="-3" cy="5" fill="rgba(70,70,70,0.6)" />
          </g>

          {/* Realistic impact shockwave - dual layer - centered in sedan windshield */}
          <circle
            ref={rippleRef}
            cx="530"
            cy="370"
            r="0"
            stroke="url(#shockwaveGradient)"
            strokeWidth="5"
            fill="none"
            opacity="0"
          />
          <circle
            ref={rippleRef2}
            cx="530"
            cy="370"
            r="0"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="3"
            fill="none"
            opacity="0"
          />

          {/* Realistic chip/impact point - centered in sedan windshield */}
          <circle
            ref={chipCoreRef}
            cx="530"
            cy="370"
            r="5"
            fill="rgba(255,255,255,0.98)"
            opacity="0"
            filter="url(#chipGlow)"
          />
          <circle
            cx="530"
            cy="370"
            r="3"
            fill="rgba(240,245,255,0.95)"
            opacity="0"
          />
          <circle
            cx="530"
            cy="370"
            r="1.5"
            fill="rgba(200,220,255,0.9)"
            opacity="0"
          />

          {/* Professional windshield cracks - more realistic pattern - centered in sedan windshield */}
          <g
            ref={cracksRef}
            stroke="rgba(255,255,255,0.98)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0"
            filter="url(#crackGlow)"
          >
            {/* Primary cracks - main damage lines */}
            <path d="M530 370 L530 330" strokeWidth="5" />
            <path d="M530 370 L570 345" strokeWidth="5" />
            <path d="M530 370 L580 385" strokeWidth="5" />
            <path d="M530 370 L560 410" strokeWidth="5" />
            <path d="M530 370 L510 415" strokeWidth="5" />
            <path d="M530 370 L480 410" strokeWidth="5" />
            <path d="M530 370 L470 385" strokeWidth="5" />
            <path d="M530 370 L480 345" strokeWidth="5" />

            {/* Secondary cracks - branching damage */}
            <path d="M530 370 L505 335" strokeWidth="4" opacity="0.9" />
            <path d="M530 370 L555 350" strokeWidth="4" opacity="0.9" />
            <path d="M530 370 L550 400" strokeWidth="4" opacity="0.9" />
            <path d="M530 370 L495 400" strokeWidth="4" opacity="0.9" />
            <path d="M530 370 L515 330" strokeWidth="4" opacity="0.85" />
            <path d="M530 370 L545 355" strokeWidth="4" opacity="0.85" />
            
            {/* Fine cracks - detail lines */}
            <path d="M530 370 L520 340" strokeWidth="3" opacity="0.8" />
            <path d="M530 370 L560 348" strokeWidth="3" opacity="0.8" />
            <path d="M530 370 L540 405" strokeWidth="3" opacity="0.8" />
            <path d="M530 370 L490 395" strokeWidth="3" opacity="0.8" />
            <path d="M530 370 L510 332" strokeWidth="2.5" opacity="0.75" />
            <path d="M530 370 L545 360" strokeWidth="2.5" opacity="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}
