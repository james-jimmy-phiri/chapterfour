"use client"

import * as React from "react"

/**
 * Paper Curl Carousel — JSX Edition
 *
 * Displays React node pages one at a time with a realistic paper-curl page-turn
 * animation. Each page folds away like a real sheet of paper being turned,
 * revealing the next page underneath. Supports drag/swipe gestures, keyboard
 * navigation, and autoplay.
 *
 * Adapted from the PaperCurlCarousel concept but using CSS 3D transforms to
 * render React JSX content instead of WebGL image textures.
 */

export type PaperCurlPageItem = {
  /** React node to render as the page content */
  content: React.ReactNode
  title?: string
  caption?: string
}

export type PaperCurlCarouselProps = {
  items: PaperCurlPageItem[]
  /** Total height of the carousel. */
  height?: string
  /** Milliseconds between automatic turns. 0 (default) is off. */
  autoplay?: number
  /** Wrap past the ends. */
  loop?: boolean
  /** The paper stock color on the back of each sheet. */
  paper?: string
  /** Show the caption rail (counter, title, controls). */
  rail?: boolean
  /** Controlled index. Omit for uncontrolled. */
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  className?: string
}

const pad = (i: number) => String(i).padStart(2, "0")

function wrapIdx(i: number, n: number, loop: boolean): number {
  if (n <= 0) return 0
  return loop ? ((i % n) + n) % n : Math.min(Math.max(i, 0), n - 1)
}

type TurnState = "idle" | "turning-next" | "turning-prev"

export default function PaperCurlCarousel({
  items,
  height = "520px",
  autoplay = 0,
  loop = true,
  paper = "#EDEEE9",
  rail = true,
  index,
  defaultIndex = 0,
  onIndexChange,
  className = "",
}: PaperCurlCarouselProps) {
  const n = items.length
  const [uncontrolled, setUncontrolled] = React.useState(() => wrapIdx(defaultIndex, n, loop))
  const active = index === undefined ? wrapIdx(uncontrolled, n, loop) : wrapIdx(index, n, loop)

  const [turnState, setTurnState] = React.useState<TurnState>("idle")
  const [displayedActive, setDisplayedActive] = React.useState(active)
  const [displayedUnder, setDisplayedUnder] = React.useState(active)
  const [direction, setDirection] = React.useState<1 | -1>(1)

  const [dragX, setDragX] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)

  const stageRef = React.useRef<HTMLDivElement>(null)
  const dragStart = React.useRef<{ x: number; time: number } | null>(null)
  const animTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoplayTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [stopped, setStopped] = React.useState(false)
  const prevActiveRef = React.useRef(active)

  const go = React.useCallback(
    (next: number) => {
      if (turnState !== "idle") return
      const w = wrapIdx(next, n, loop)
      if (w === active) return
      if (index === undefined) setUncontrolled(w)
      onIndexChange?.(w)
    },
    [turnState, active, index, n, loop, onIndexChange]
  )

  const goNext = () => { setStopped(true); go(active + 1) }
  const goPrev = () => { setStopped(true); go(active - 1) }

  const atStart = !loop && active === 0
  const atEnd = !loop && active === n - 1

  // When active changes, start the turn animation
  React.useEffect(() => {
    if (prevActiveRef.current === active) return
    const prev = prevActiveRef.current
    const forward = loop
      ? ((active - prev + n) % n) * 2 <= n
      : active > prev

    const dir: 1 | -1 = forward ? 1 : -1
    setDirection(dir)
    setDisplayedActive(prev)       // the page that curls away
    setDisplayedUnder(active)      // the page revealed underneath
    setTurnState(dir === 1 ? "turning-next" : "turning-prev")
    prevActiveRef.current = active

    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    animTimerRef.current = setTimeout(() => {
      setTurnState("idle")
      setDisplayedActive(active)
    }, 680)
  }, [active, n, loop])

  // Autoplay
  React.useEffect(() => {
    if (!autoplay || stopped || atEnd) return
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current)
    autoplayTimerRef.current = setTimeout(() => go(active + 1), autoplay)
    return () => { if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current) }
  }, [autoplay, active, stopped, atEnd, go])

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goNext() }
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev() }
  }

  // Drag/swipe
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragStart.current = { x: e.clientX, time: e.timeStamp }
    setIsDragging(true)
    setDragX(0)
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !isDragging) return
    setDragX(e.clientX - dragStart.current.x)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dt = e.timeStamp - dragStart.current.time
    const velocity = dx / Math.max(dt, 1)
    const threshold = stageRef.current ? stageRef.current.clientWidth * 0.2 : 60
    setIsDragging(false)
    setDragX(0)
    dragStart.current = null
    const isFlick = Math.abs(velocity) > 0.35
    const isFar = Math.abs(dx) > threshold
    if ((isFlick || isFar) && dx < 0 && !atEnd) { setStopped(true); go(active + 1) }
    else if ((isFlick || isFar) && dx > 0 && !atStart) { setStopped(true); go(active - 1) }
  }

  const clearDrag = () => {
    setIsDragging(false); setDragX(0); dragStart.current = null
  }

  if (n === 0) return null

  const current = items[displayedActive]
  const underItem = items[displayedUnder]
  const liveProgress = isDragging && dragX !== 0
    ? Math.abs(dragX) / (stageRef.current?.clientWidth ?? 300)
    : 0

  const isTurning = turnState !== "idle"

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
        height,
        background: "#FFFFFF",
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Book pages carousel"
    >
      {/* Keyframes */}
      <style>{`
        @keyframes pcj-turn-next {
          0%   { transform: perspective(1200px) rotateY(0deg); }
          45%  { transform: perspective(1200px) rotateY(-90deg); filter: drop-shadow(-8px 0 16px rgba(0,0,0,0.28)); }
          100% { transform: perspective(1200px) rotateY(-180deg); }
        }
        @keyframes pcj-turn-prev {
          0%   { transform: perspective(1200px) rotateY(0deg); }
          45%  { transform: perspective(1200px) rotateY(90deg); filter: drop-shadow(8px 0 16px rgba(0,0,0,0.28)); }
          100% { transform: perspective(1200px) rotateY(180deg); }
        }
        @keyframes pcj-shadow-in {
          0%   { opacity: 0; }
          35%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pcj-shade-front {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pcj-turn-next { from { opacity:1 } to { opacity:0 } }
          @keyframes pcj-turn-prev { from { opacity:0 } to { opacity:1 } }
          @keyframes pcj-shadow-in { from { opacity:0 } to { opacity:0 } }
        }
      `}</style>

      {/* Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        style={{
          position: "relative",
          flex: "1 1 auto",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-y",
          outline: "none",
        }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={clearDrag}
        onPointerLeave={() => { if (isDragging) clearDrag() }}
      >
        {/* Layer 1: The page being revealed underneath during a turn */}
        {isTurning && underItem && (
          <div
            key={`under-${displayedUnder}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            {underItem.content}
          </div>
        )}

        {/* Layer 2: The resting current page (when idle) */}
        {!isTurning && (
          <div
            key={`rest-${displayedActive}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              overflow: "hidden",
              // Live drag peek
              transform: isDragging && Math.abs(dragX) > 4
                ? `perspective(1200px) rotateY(${dragX < 0
                    ? Math.min(liveProgress * 18, 14)
                    : -Math.min(liveProgress * 18, 14)}deg)`
                : "none",
              transformOrigin: dragX < 0 ? "right center" : "left center",
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {current?.content}
            {/* Edge shading during drag */}
            {isDragging && Math.abs(dragX) > 8 && (
              <div style={{
                position: "absolute",
                inset: 0,
                background: dragX < 0
                  ? "linear-gradient(to left, rgba(0,0,0,0.14) 0%, transparent 35%)"
                  : "linear-gradient(to right, rgba(0,0,0,0.14) 0%, transparent 35%)",
                pointerEvents: "none",
                zIndex: 10,
              }} />
            )}
          </div>
        )}

        {/* Layer 3: The page curling away during a turn */}
        {isTurning && current && (
          <>
            {/* Shadow on the under-page */}
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              background: direction === 1
                ? "linear-gradient(to left, rgba(0,0,0,0.32) 0%, transparent 65%)"
                : "linear-gradient(to right, rgba(0,0,0,0.32) 0%, transparent 65%)",
              animation: "pcj-shadow-in 0.68s cubic-bezier(0.4,0,0.2,1) forwards",
              pointerEvents: "none",
            }} />

            {/* The curling page itself */}
            <div style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              transformStyle: "preserve-3d",
              transformOrigin: direction === 1 ? "left center" : "right center",
              animation: `${direction === 1 ? "pcj-turn-next" : "pcj-turn-prev"} 0.68s cubic-bezier(0.4,0,0.2,1) forwards`,
            }}>
              {/* Front face */}
              <div style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}>
                {current.content}
                {/* Shading gradient sweeping as page curls */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: direction === 1
                    ? "linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 40%)"
                    : "linear-gradient(to left, rgba(0,0,0,0.18) 0%, transparent 40%)",
                  animation: "pcj-shade-front 0.68s cubic-bezier(0.4,0,0.2,1) forwards",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Back face — paper stock with ghost print */}
              <div style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: paper,
                overflow: "hidden",
              }}>
                {/* Paper grain */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                  opacity: 0.05,
                  pointerEvents: "none",
                }} />
                {/* Horizontal fibers */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)",
                  pointerEvents: "none",
                }} />
                {/* Ghost print of the page showing through */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  transform: direction === 1 ? "scaleX(-1)" : "scaleX(1)",
                  opacity: 0.06,
                  overflow: "hidden",
                  filter: "blur(1px)",
                }}>
                  {current.content}
                </div>
                {/* Light reflection band */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          </>
        )}

        {/* Subtle edge shadow indicating more pages exist */}
        {!isDragging && !isTurning && (
          <>
            {!atStart && (
              <div style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: "5px",
                background: "linear-gradient(to right, rgba(0,0,0,0.07), transparent)",
                zIndex: 20,
                pointerEvents: "none",
              }} />
            )}
            {!atEnd && (
              <div style={{
                position: "absolute",
                right: 0, top: 0, bottom: 0,
                width: "5px",
                background: "linear-gradient(to left, rgba(0,0,0,0.07), transparent)",
                zIndex: 20,
                pointerEvents: "none",
              }} />
            )}
          </>
        )}
      </div>

      {/* Caption Rail */}
      {rail && n > 0 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          height: "52px",
          flexShrink: 0,
          padding: "0 12px 0 18px",
          borderTop: "1px solid #E8E1D5",
          background: "#FDFBF7",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: 0 }}>
            <span style={{
              flexShrink: 0,
              width: "48px",
              fontSize: "11px",
              letterSpacing: "0.05em",
              fontVariantNumeric: "tabular-nums",
              color: "#888",
              fontFamily: "sans-serif",
            }}>
              <b style={{ fontWeight: 700, color: "#222" }}>{pad(isTurning ? displayedUnder + 1 : active + 1)}</b>
              {" / "}{pad(n)}
            </span>
            {items[isTurning ? displayedUnder : active]?.title && (
              <span style={{
                flexShrink: 0,
                fontWeight: 700,
                fontSize: "12px",
                fontFamily: "Georgia, serif",
                color: "#444",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "160px",
              }}>
                {items[isTurning ? displayedUnder : active]?.title}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            {/* Prev */}
            <button
              type="button"
              onClick={goPrev}
              disabled={atStart || n < 2 || isTurning}
              aria-label="Previous page"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                padding: 0,
                borderRadius: "50%",
                border: "1px solid #D4D4D4",
                background: "transparent",
                cursor: (atStart || isTurning) ? "default" : "pointer",
                opacity: (atStart || n < 2) ? 0.35 : 1,
                transition: "border-color 0.2s ease, opacity 0.2s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {/* Next */}
            <button
              type="button"
              onClick={goNext}
              disabled={atEnd || n < 2 || isTurning}
              aria-label="Next page"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                padding: 0,
                borderRadius: "50%",
                border: "1px solid #D4D4D4",
                background: "transparent",
                cursor: (atEnd || isTurning) ? "default" : "pointer",
                opacity: (atEnd || n < 2) ? 0.35 : 1,
                transition: "border-color 0.2s ease, opacity 0.2s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
