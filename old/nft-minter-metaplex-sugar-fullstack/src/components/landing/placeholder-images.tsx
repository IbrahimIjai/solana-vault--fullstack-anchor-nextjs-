'use client'
import React from 'react'

// This component creates SVG placeholders for NFT images until we download actual Bored Ape images
export function generatePlaceholderNFT(id: string, name: string) {
  // Generate a unique but deterministic color based on the id
  const hue = parseInt(id, 10) * 137.5 % 360
  const saturation = 70 + (parseInt(id, 10) * 11) % 30
  const lightness = 45 + (parseInt(id, 10) * 7) % 15
  
  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const patternColor = `hsl(${(hue + 180) % 360}, ${saturation}%, ${lightness + 20}%)`
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      width="300"
      height="300"
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="300" height="300" fill={backgroundColor} />
      
      {/* Generate a unique pattern based on the id */}
      <g fill={patternColor}>
        {Array.from({ length: 5 }).map((_, i) => {
          const x = (parseInt(id, 10) * (i + 1) * 17) % 300
          const y = (parseInt(id, 10) * (i + 1) * 23) % 300
          const size = 20 + (parseInt(id, 10) * (i + 1)) % 40
          
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r={size} 
              opacity="0.6" 
            />
          )
        })}
      </g>
      
      {/* Ape-like silhouette */}
      <path
        d="M150,80 C190,80 220,110 220,150 C220,170 210,190 190,200 C180,205 170,210 150,210 C130,210 120,205 110,200 C90,190 80,170 80,150 C80,110 110,80 150,80 Z"
        fill="rgba(0,0,0,0.7)"
      />
      
      {/* Eyes */}
      <circle cx="130" cy="140" r="10" fill="white" />
      <circle cx="170" cy="140" r="10" fill="white" />
      <circle cx="130" cy="140" r="5" fill="black" />
      <circle cx="170" cy="140" r="5" fill="black" />
      
      {/* Mouth */}
      <path
        d="M120,170 C130,180 170,180 180,170"
        stroke="white"
        strokeWidth="3"
        fill="transparent"
      />
      
      {/* Text */}
      <text
        x="150"
        y="250"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
        fill="white"
      >
        {name}
      </text>
    </svg>
  )
}

export function getPlaceholderImage(id: string, name: string): string {
  // For server-side or static rendering, create a simple colored rectangle with text
  // This avoids issues with ReactDOMServer not being available during SSR
  const hue = parseInt(id, 10) * 137.5 % 360
  const saturation = 70 + (parseInt(id, 10) * 11) % 30
  const lightness = 45 + (parseInt(id, 10) * 7) % 15
  
  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  
  // Create a simple SVG as a string
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
      <rect width="300" height="300" fill="${backgroundColor}" />
      <circle cx="150" cy="120" r="50" fill="rgba(0,0,0,0.7)" />
      <circle cx="130" cy="110" r="10" fill="white" />
      <circle cx="170" cy="110" r="10" fill="white" />
      <circle cx="130" cy="110" r="5" fill="black" />
      <circle cx="170" cy="110" r="5" fill="black" />
      <path d="M120,150 C130,160 170,160 180,150" stroke="white" stroke-width="3" fill="transparent" />
      <text x="150" y="220" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">${name}</text>
    </svg>
  `
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
}
