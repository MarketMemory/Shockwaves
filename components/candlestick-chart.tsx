"use client"

interface CandlestickProps {
  data: any
  x: number
  y: number
  width: number
  height: number
  payload: {
    open: number
    high: number
    low: number
    close: number
  }
  theme: any
}

export function Candlestick({ data, x, y, width, height, payload, theme }: CandlestickProps) {
  const { open, high, low, close } = payload
  const isUp = close > open
  const color = isUp ? theme.candlestick.up : theme.candlestick.down
  const wickColor = theme.candlestick.wick

  // Calculate positions
  const bodyHeight = Math.abs(close - open)
  const bodyY = Math.min(close, open)
  const wickX = x + width / 2

  return (
    <g>
      {/* High-Low Wick */}
      <line
        x1={wickX}
        y1={y + (1 - high / (high - low)) * height}
        x2={wickX}
        y2={y + (1 - low / (high - low)) * height}
        stroke={wickColor}
        strokeWidth={1}
      />

      {/* Body */}
      <rect
        x={x + 1}
        y={y + (1 - Math.max(open, close) / (high - low)) * height}
        width={width - 2}
        height={Math.max(1, (bodyHeight / (high - low)) * height)}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  )
}
