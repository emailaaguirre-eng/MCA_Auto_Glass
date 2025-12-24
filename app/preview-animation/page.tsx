'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PreviewAnimationPage() {
  const [showIntro, setShowIntro] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const startAnimation = () => {
    setHasStarted(true)
    setShowIntro(true)
    setIsAnimating(true)

      // Hide after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => setShowIntro(false), 400) // Fade out delay
        setTimeout(() => setHasStarted(false), 600) // Reset after fade
      }, 4000) // Total animation duration (increased for healing)

    return () => clearTimeout(timer)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Chip-to-Clear Animation Preview
        </h1>
        <p className="text-gray-300 mb-8">
          Click the button below to see the rock chip repair animation
        </p>
        <button
          onClick={startAnimation}
          disabled={hasStarted}
          className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {hasStarted ? 'Animation Playing...' : '🎬 Play Rock Chip Animation'}
        </button>
        <div className="mt-8">
          <Link
            href="/"
            className="text-primary-400 hover:text-primary-300 underline"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>

      {/* Animation Overlay */}
      {showIntro && (
        <div
          className="fixed inset-0 z-[100] bg-white transition-opacity duration-400"
          style={{
            opacity: isAnimating ? 1 : 0,
            pointerEvents: isAnimating ? 'auto' : 'none',
          }}
          aria-hidden="true"
        >
          {/* Realistic Glass Surface */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>

          {/* Center Glass Panel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="relative"
              style={{
                width: '600px',
                height: '400px',
                maxWidth: '90vw',
                maxHeight: '60vh',
              }}
            >
              {/* Glass panel with realistic depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/80 via-blue-100/60 to-slate-300/80 rounded-2xl shadow-2xl border-4 border-slate-300/50 backdrop-blur-sm">
                {/* Glass shine/reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute top-4 left-4 right-4 h-20 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
                
                {/* Impact point - realistic chip */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  
                  {/* Rock/Pebble - appears first */}
                  {isAnimating && (
                    <div 
                      className="absolute rounded-full"
                      style={{
                        width: '12px',
                        height: '12px',
                        marginLeft: '-6px',
                        marginTop: '-20px',
                        background: 'radial-gradient(circle at 30% 30%, #8B7355 0%, #6B5D4F 30%, #4A3E35 60%, #2F2A23 100%)',
                        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.4)',
                        animation: 'rockFall 0.6s ease-in',
                        zIndex: 10,
                      }}
                    />
                  )}

                  {/* Impact flash - when rock hits */}
                  {isAnimating && (
                    <div 
                      className="absolute inset-0 rounded-full bg-white"
                      style={{
                        width: '10px',
                        height: '10px',
                        marginLeft: '-5px',
                        marginTop: '-5px',
                        animation: 'impactFlash 0.2s ease-out 0.6s',
                        boxShadow: '0 0 25px rgba(255, 255, 255, 0.9)',
                      }}
                    />
                  )}

                  {/* Realistic chip/crack pattern - appears after impact */}
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    className="absolute"
                    style={{
                      marginLeft: '-60px',
                      marginTop: '-60px',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  >
                    {/* Main impact point */}
                    <circle
                      cx="60"
                      cy="60"
                      r="3"
                      fill="rgba(0, 0, 0, 0.5)"
                      style={{
                        opacity: isAnimating ? 1 : 0,
                        transition: 'opacity 0.2s ease-out 0.7s',
                      }}
                    />
                    
                    {/* Realistic crack lines radiating outward - draw in */}
                    <g style={{
                      opacity: isAnimating ? 1 : 0,
                      transition: 'opacity 0.3s ease-out 0.8s',
                    }}>
                      {/* Primary crack */}
                      <path
                        d="M 60 60 L 60 45"
                        stroke="rgba(0, 0, 0, 0.6)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 15,
                          strokeDashoffset: isAnimating ? 0 : 15,
                          transition: 'stroke-dashoffset 0.5s ease-out 0.9s',
                        }}
                      />
                      {/* Secondary cracks */}
                      <path
                        d="M 60 60 L 50 70 M 60 60 L 70 70 M 60 60 L 55 75"
                        stroke="rgba(0, 0, 0, 0.5)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 20,
                          strokeDashoffset: isAnimating ? 0 : 20,
                          transition: 'stroke-dashoffset 0.6s ease-out 1s',
                        }}
                      />
                      {/* Micro cracks */}
                      <path
                        d="M 60 45 L 58 43 M 60 45 L 62 43 M 50 70 L 48 72 M 70 70 L 72 72"
                        stroke="rgba(0, 0, 0, 0.4)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 5,
                          strokeDashoffset: isAnimating ? 0 : 5,
                          transition: 'stroke-dashoffset 0.4s ease-out 1.2s',
                        }}
                      />
                    </g>
                  </svg>

                  {/* Repair resin injection effect - fills the crack */}
                  {isAnimating && (
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        marginLeft: '-4px',
                        marginTop: '-4px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.95) 0%, rgba(59, 130, 246, 0.7) 50%, transparent 100%)',
                        animation: 'resinFill 1s ease-out 2s',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
                      }}
                    />
                  )}

                  {/* Crack healing - cracks fade away */}
                  {isAnimating && (
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      className="absolute"
                      style={{
                        marginLeft: '-60px',
                        marginTop: '-60px',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                        opacity: 1,
                        animation: 'crackHeal 1.5s ease-out 2.5s',
                      }}
                    >
                      {/* Primary crack - fades out */}
                      <path
                        d="M 60 60 L 60 45"
                        stroke="rgba(0, 0, 0, 0.6)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 15,
                          strokeDashoffset: 0,
                        }}
                      />
                      {/* Secondary cracks - fade out */}
                      <path
                        d="M 60 60 L 50 70 M 60 60 L 70 70 M 60 60 L 55 75"
                        stroke="rgba(0, 0, 0, 0.5)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 20,
                          strokeDashoffset: 0,
                        }}
                      />
                      {/* Micro cracks - fade out */}
                      <path
                        d="M 60 45 L 58 43 M 60 45 L 62 43 M 50 70 L 48 72 M 70 70 L 72 72"
                        stroke="rgba(0, 0, 0, 0.4)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 5,
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                  )}

                  {/* Repair completion glow - shows healing is complete */}
                  {isAnimating && (
                    <div
                      className="absolute rounded-full bg-blue-400/40"
                      style={{
                        width: '50px',
                        height: '50px',
                        marginLeft: '-25px',
                        marginTop: '-25px',
                        animation: 'repairComplete 1s ease-out 3.2s',
                        filter: 'blur(10px)',
                      }}
                    />
                  )}
                </div>

                {/* Glass surface texture overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}></div>
              </div>

              {/* Professional text overlay */}
              <div 
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transition: 'opacity 0.5s ease-out 3.5s',
                }}
              >
                <p className="text-primary-700 font-semibold text-lg">Chip to Clear</p>
                <p className="text-primary-600 text-sm mt-1">Professional Auto Glass Repair</p>
              </div>
            </div>
          </div>

          {/* Fade to homepage */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.4s ease-out 3.6s',
            }}
          />

          <style jsx>{`
            @keyframes rockFall {
              0% {
                transform: translateY(-80px) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(0) rotate(180deg);
                opacity: 1;
              }
            }

            @keyframes impactFlash {
              0% {
                transform: scale(0);
                opacity: 1;
              }
              50% {
                transform: scale(3);
                opacity: 0.9;
              }
              100% {
                transform: scale(4);
                opacity: 0;
              }
            }

            @keyframes resinFill {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              30% {
                transform: scale(2);
                opacity: 1;
              }
              70% {
                transform: scale(2.5);
                opacity: 0.8;
              }
              100% {
                transform: scale(3);
                opacity: 0.4;
              }
            }

            @keyframes crackHeal {
              0% {
                opacity: 1;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
              }
              50% {
                opacity: 0.3;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
              }
              100% {
                opacity: 0;
                filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
              }
            }

            @keyframes repairComplete {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              50% {
                transform: scale(1.5);
                opacity: 0.7;
              }
              100% {
                transform: scale(2.5);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {/* Description */}
      <div className="max-w-2xl w-full mt-12 text-left">
        <div className="bg-gray-800 rounded-xl p-6 text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">
            Animation Sequence
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Rock Falls:</strong> Realistic brown/stone-colored pebble falls from above and hits the glass
            </li>
            <li>
              <strong>Impact Flash:</strong> Bright white flash when the rock hits the glass surface
            </li>
            <li>
              <strong>Crack Forms:</strong> Realistic crack pattern appears and draws outward from impact point
            </li>
            <li>
              <strong>Resin Injection:</strong> Blue repair resin fills the chip (realistic repair process)
            </li>
            <li>
              <strong>Crack Heals:</strong> Cracks visibly fade away as the repair completes
            </li>
            <li>
              <strong>Repair Complete:</strong> Subtle glow indicates successful repair
            </li>
            <li>
              <strong>Fade to Homepage:</strong> Smooth transition to your white hero section
            </li>
          </ol>
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> On the actual homepage, this animation
              only plays once per visitor (stored in localStorage). It respects
              the user's{' '}
              <code className="bg-gray-600 px-2 py-1 rounded">
                prefers-reduced-motion
              </code>{' '}
              setting for accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


