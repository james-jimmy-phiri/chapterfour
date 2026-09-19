import * as React from "react";
import { motion, useAnimationControls } from "framer-motion";

export interface InteractiveBookProps {
  width?: number | string;
  height?: number | string;
  frontCover: React.ReactNode;
  backCover: React.ReactNode;
  innerPages?: React.ReactNode[];
  shadow?: {
    color: string;
    opacity: number;
    blur: number;
    offsetX: number;
    offsetY: number;
    spread: number;
  };
  borderRadius?: number;
}

export function InteractiveBook(props: InteractiveBookProps) {
  const {
    width = 400,
    height = 600,
    frontCover,
    backCover,
    innerPages = [],
    shadow = { color: "#000", opacity: 0.4, blur: 10, offsetX: 5, offsetY: 5, spread: 0 },
    borderRadius = 10
  } = props;

  const rawPages = [frontCover, ...innerPages, backCover].filter(Boolean);
  const allPages = rawPages.length % 2 === 0 ? rawPages : [...rawPages, null];
  
  const leafPairs: [React.ReactNode, React.ReactNode][] = [];
  for (let i = 0; i < allPages.length; i += 2) {
    leafPairs.push([allPages[i], allPages[i + 1]]);
  }
  
  const totalLeaves = leafPairs.length;
  const [flippedCount, setFlippedCount] = React.useState(0);
  const [isBookClosed, setIsBookClosed] = React.useState(true);
  const flippedRef = React.useRef(0);
  
  const controlsPool = Array.from({ length: 100 }, () => useAnimationControls());
  const bookContainerControls = useAnimationControls();
  
  const getRgba = (color: string, alpha: number) => {
    if (!color) return `rgba(0,0,0,${alpha})`;
    const hex = color.replace("#", "");
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const shadowCol = getRgba(shadow.color, shadow.opacity);
  const closedBookShadow = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadowCol}`;
  
  const handleClick = async () => {
    if (flippedCount === 0) {
      setIsBookClosed(false);
      const moveX = typeof width === 'number' ? width / 2 : '50%';
      bookContainerControls.start({ x: moveX, transition: { duration: 0.6, ease: "easeInOut" } });
    }
    
    if (flippedCount < totalLeaves) {
      const indexToFlip = flippedCount;
      setFlippedCount((prev) => prev + 1);
      flippedRef.current = flippedCount + 1;
      await controlsPool[indexToFlip].start({ rotateY: -180, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } });
    } else {
      bookContainerControls.start({ x: 0, transition: { duration: 0.8, ease: "easeInOut" } });
      for (let i = totalLeaves - 1; i >= 0; i--) {
        controlsPool[i].start({ rotateY: 0, transition: { duration: 0.5, ease: "easeInOut" } });
        await new Promise((r) => setTimeout(r, 80));
      }
      setFlippedCount(0);
      flippedRef.current = 0;
      setIsBookClosed(true);
    }
  };

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backgroundColor: "white",
    overflow: "hidden"
  };

  const renderPageContent = (content: React.ReactNode) => {
    if (typeof content === 'string' && (content.startsWith('http') || content.startsWith('/'))) {
      return <img src={content} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="" />;
    }
    return content;
  };

  const spineGradient: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "12%",
    background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)",
    pointerEvents: "none"
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 2500,
        cursor: "pointer",
        overflow: "visible"
      }}
      onClick={handleClick}
    >
      <motion.div
        animate={bookContainerControls}
        style={{
          width,
          height,
          position: "relative",
          transformStyle: "preserve-3d",
          boxShadow: isBookClosed ? closedBookShadow : "0px 0px 0px transparent"
        }}
      >
        {leafPairs.map(([frontContent, backContent], index) => {
          const isFlipped = index < flippedCount;
          const isFlipping = index === flippedCount - 1;
          const zOffset = isFlipped ? index * 0.4 : (totalLeaves - index) * 0.4;
          const zIndex = isFlipping ? 100 : isFlipped ? index : totalLeaves - index;
          
          return (
            <motion.div
              key={index}
              animate={controlsPool[index]}
              initial={{ rotateY: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
                transform: `translateZ(${zOffset}px)`,
                willChange: "transform"
              }}
            >
              <div style={{ ...faceStyle, borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px` }}>
                {frontContent && renderPageContent(frontContent)}
                <div style={spineGradient} />
              </div>
              <div style={{ ...faceStyle, transform: "rotateY(180deg) translateZ(0.01px)", borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px` }}>
                {backContent && renderPageContent(backContent)}
                <div style={{ ...spineGradient, left: "auto", right: 0, transform: "scaleX(-1)" }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
