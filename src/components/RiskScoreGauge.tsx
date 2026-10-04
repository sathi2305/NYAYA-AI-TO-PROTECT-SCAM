import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RiskScoreGaugeProps {
  score: number; // 0 to 100
  riskLevel: 'RED' | 'YELLOW' | 'GREEN';
  size?: number;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  riskLevel,
  size = 180,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = size;
    const height = Math.round(size * 0.65);
    const radius = Math.min(width, height * 2) / 2 - 8;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height + 10}`);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height})`);

    // Arc angles: from -PI/2 (-90 deg) to PI/2 (+90 deg)
    const startAngle = -Math.PI / 2;
    const endAngle = Math.PI / 2;
    const totalAngle = endAngle - startAngle;

    // Segment ranges:
    // 0 - 30: Green
    // 30 - 70: Amber/Yellow
    // 70 - 100: Red
    const segments = [
      { startVal: 0, endVal: 30, color: '#10b981', label: 'Safe' },
      { startVal: 30, endVal: 70, color: '#f59e0b', label: 'Suspicious' },
      { startVal: 70, endVal: 100, color: '#f43f5e', label: 'High Risk' },
    ];

    const innerRadius = radius * 0.72;
    const outerRadius = radius;

    // Background track arc
    const backgroundArc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .cornerRadius(4);

    g.append('path')
      .attr('d', backgroundArc as any)
      .attr('fill', '#1e293b')
      .attr('opacity', 0.5);

    // Draw the 3 color-coded segments
    segments.forEach((seg) => {
      const segStart = startAngle + (seg.startVal / 100) * totalAngle;
      const segEnd = startAngle + (seg.endVal / 100) * totalAngle;

      const segArc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(segStart)
        .endAngle(segEnd)
        .padAngle(0.02)
        .cornerRadius(3);

      g.append('path')
        .attr('d', segArc as any)
        .attr('fill', seg.color)
        .attr('opacity', 0.85);
    });

    // Score angle calculation
    const clampedScore = Math.max(0, Math.min(100, score));
    const targetAngle = startAngle + (clampedScore / 100) * totalAngle;

    // Calculate needle points
    const needleLength = radius * 0.78;
    const needleRadius = 5;

    // Animated Needle Group
    const needleGroup = g.append('g');

    // Needle path (triangle)
    const needlePath = d3.path();
    needlePath.moveTo(0, -needleLength);
    needlePath.lineTo(needleRadius, 0);
    needlePath.lineTo(-needleRadius, 0);
    needlePath.closePath();

    const needle = needleGroup
      .append('path')
      .attr('d', needlePath.toString())
      .attr('fill', '#ffffff')
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 1.5)
      .attr('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))');

    // Initial rotation at startAngle
    const initialDeg = (startAngle * 180) / Math.PI + 90;
    const targetDeg = (targetAngle * 180) / Math.PI + 90;

    needleGroup.attr('transform', `rotate(${initialDeg})`);

    needleGroup
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('transform', `rotate(${targetDeg})`);

    // Center pivot circle
    g.append('circle')
      .attr('r', needleRadius + 2)
      .attr('fill', '#0f172a')
      .attr('stroke', '#38bdf8')
      .attr('stroke-width', 2);

    g.append('circle')
      .attr('r', 2.5)
      .attr('fill', '#ffffff');

    // Ticks & Labels
    const tickValues = [0, 50, 100];
    tickValues.forEach((tick) => {
      const angle = startAngle + (tick / 100) * totalAngle;
      const tickLabelRadius = innerRadius - 9;
      const x = Math.sin(angle) * tickLabelRadius;
      const y = -Math.cos(angle) * tickLabelRadius;

      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '8px')
        .attr('font-family', 'JetBrains Mono, monospace')
        .attr('fill', '#94a3b8')
        .text(tick);
    });
  }, [score, size, riskLevel]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg ref={svgRef} className="overflow-visible" />
      </div>
      <div className="mt-0.5 flex items-center justify-center gap-1.5 font-mono-numbers">
        <span
          className={`text-base font-extrabold ${
            score >= 70
              ? 'text-rose-400'
              : score >= 30
              ? 'text-amber-400'
              : 'text-emerald-400'
          }`}
        >
          {score}
        </span>
        <span className="text-[10px] text-slate-500">/ 100</span>
      </div>
      <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
        {riskLevel === 'RED'
          ? 'High Risk'
          : riskLevel === 'YELLOW'
          ? 'Suspicious'
          : 'Verified Safe'}
      </div>
    </div>
  );
};
