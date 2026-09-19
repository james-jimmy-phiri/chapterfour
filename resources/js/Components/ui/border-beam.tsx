import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BorderBeamProps {
  /** Length of the travelling dash in px */
  beamLength?: number;
  /** Duration of one full clockwise lap in seconds */
  duration?: number;
  /** Stroke colour of the beam — defaults to near-black */
  color?: string;
  /** Stroke width in px */
  strokeWidth?: number;
  /** Run counter-clockwise instead */
  reverse?: boolean;
}

/**
 * BorderBeam — a solid dark line that marches clockwise around the exact
 * border of its parent container, non-stop. Works on any `relative` parent.
 *
 * Implementation: SVG <rect> with animated stroke-dashoffset. The perimeter
 * is computed dynamically via ResizeObserver so it always fits the card.
 */
export function BorderBeam({
  beamLength = 120,
  duration = 3,
  color = "#111111",
  strokeWidth = 2,
  reverse = false,
}: BorderBeamProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const parent = wrapperRef.current?.parentElement;
    if (!parent) return;

    const update = () => {
      const { width, height } = parent.getBoundingClientRect();
      setDims({ w: width, h: height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const perimeter = 2 * (w + h);
  const sw = strokeWidth;

  // The rect sits inset by half a stroke-width so it's fully visible
  const rx = sw / 2;
  const ry = sw / 2;
  const rw = Math.max(0, w - sw);
  const rh = Math.max(0, h - sw);

  // Gap = rest of perimeter so only `beamLength` px is visible at any time
  const dashGap = Math.max(0, perimeter - beamLength);

  // Clockwise: offset goes from 0 → -perimeter
  const offsetFrom = 0;
  const offsetTo = reverse ? perimeter : -perimeter;

  if (w === 0 || h === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 10 }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        <motion.rect
          x={rx}
          y={ry}
          width={rw}
          height={rh}
          rx={0}
          ry={0}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeDasharray={`${beamLength} ${dashGap}`}
          initial={{ strokeDashoffset: offsetFrom }}
          animate={{ strokeDashoffset: offsetTo }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />
      </svg>
    </div>
  );
}

