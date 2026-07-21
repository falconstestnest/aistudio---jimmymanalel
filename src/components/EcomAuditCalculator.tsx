/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Truck, TrendingDown, HelpCircle, ShieldAlert, BadgeInfo, CheckCircle, Scale, DollarSign } from "lucide-react";
import { EcomMetrics } from "../types";
import EmailResultsCapture from "./leads/EmailResultsCapture";

export default function EcomAuditCalculator() {
  const [metrics, setMetrics] = useState<EcomMetrics>({
    avgOrderValue: 180, // AED
    monthlyOrders: 800,
    cogsPercent: 35, // 35%
    deliveryCost: 35, // AED per order
    cac: 40, // AED Customer Acquisition Cost
    repeatPurchaseRate: 15 // 15%
  });

  const handleSliderChange = (name: keyof EcomMetrics, val: number) => {
    setMetrics((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  // Perform operational financial audits
  const calculations = useMemo(() => {
    const { avgOrderValue, monthlyOrders, cogsPercent, deliveryCost, cac, repeatPurchaseRate } = metrics;

    const cogsValue = avgOrderValue * (cogsPercent / 100);
    const grossMarginPerOrder = avgOrderValue - cogsValue;
    
    // Net Margin per first order (AOV - COGS - Shipping - CAC)
    const netFirstOrderMargin = grossMarginPerOrder - deliveryCost - cac;
    
    // Logistics Expense Ratio (Shipping / AOV)
    const logisticsRatio = (deliveryCost / avgOrderValue) * 100;
    
    // Estimated Customer Lifetime Value (Simplified 1-year with repeat rate multiplier)
    const repeatMultiplier = 1 / (1 - (repeatPurchaseRate / 100));
    const estimatedLtv = grossMarginPerOrder * repeatMultiplier;
    
    // LTV to CAC Ratio
    const ltvToCacRatio = cac > 0 ? estimatedLtv / cac : estimatedLtv;
    
    // Total monthly contributions (incorporating repeat order frequency)
    // Active customer pool gets additional lifetime organic contributions
    const monthlyRevenue = avgOrderValue * monthlyOrders;
    const monthlyGrossProfit = grossMarginPerOrder * monthlyOrders;
    
    // Total monthly CAC cost
    const monthlyCacExpense = cac * (monthlyOrders * (1 - (repeatPurchaseRate / 100)));
    const monthlyDeliveryExpense = deliveryCost * monthlyOrders;
    
    const monthlyNetProfit = monthlyGrossProfit - monthlyDeliveryExpense - monthlyCacExpense;

    return {
      cogsValue,
      grossMarginPerOrder,
      netFirstOrderMargin,
      logisticsRatio,
      estimatedLtv,
      ltvToCacRatio,
      monthlyRevenue,
      monthlyNetProfit,
      monthlyGrossProfit
    };
  }, [metrics]);

  // Compute 12-month cumulative cash flow trend for a custom SVG chart
  const chartData = useMemo(() => {
    const data = [];
    let cumulativeNet = 0;
    const monthlyNet = calculations.monthlyNetProfit;

    for (let month = 1; month <= 12; month++) {
      cumulativeNet += monthlyNet;
      data.push({
        month: `M${month}`,
        cumulative: Math.round(cumulativeNet),
        net: Math.round(monthlyNet)
      });
    }
    return data;
  }, [calculations.monthlyNetProfit]);

  // Jimmy's custom responsive coaching alerts
  const advisoryTake = useMemo(() => {
    const { logisticsRatio, ltvToCacRatio } = calculations;
    const { repeatPurchaseRate, deliveryCost, avgOrderValue } = metrics;

    if (logisticsRatio > 20) {
      return {
        type: "danger",
        title: "Logistics Cash Leak Alert",
        text: `Your delivery cost represents ${logisticsRatio.toFixed(0)}% of your basket value (AOV). Jimmy's Rule: Keep shipping below 15-20%! In the Middle East, last-mile logistics are fierce. You need to bundle items, increase minimum order for free delivery, or raise pricing to dilute shipping weight.`
      };
    }
    if (ltvToCacRatio < 3) {
      return {
        type: "warning",
        title: "Uneconomic Squeezed Funnel",
        text: `Your LTV-to-CAC ratio is ${ltvToCacRatio.toFixed(1)}x. A viable company requires at least 3x. Your Customer Acquisition Cost is consuming too much margin. Don't pour water into a leaky bucket! Prioritize retention and organic reviews to increase repeat buys above 25% or raise AOV immediately.`
      };
    }
    if (repeatPurchaseRate < 12) {
      return {
        type: "info",
        title: "Transactional Single-Shot Model Danger",
        text: `Your repeat purchase rate is ${repeatPurchaseRate}%. E-commerce brands survive on post-purchase cycles. Re-advertising on Google/Meta is too expensive for single purchases. Create unboxing delights, personalized newsletters, and email sequences to bring customers back.`
      };
    }
    return {
      type: "success",
      title: "Strong Operational Unit Health",
      text: "Your unit economics look incredibly solid. Your logistics are disciplined (<15%), and your LTV/CAC ratio is sound. This is an investor-aligned, fundable system setup. Focus on expanding vendor lines and ramping customer trust operations."
    };
  }, [calculations, metrics]);

  // SVG Chart Dimensions & Helpers
  const width = 500;
  const height = 180;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const points = useMemo(() => {
    if (chartData.length === 0) return "";
    
    // Scale calculations
    const values = chartData.map(d => d.cumulative);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1000);
    const range = maxVal - minVal;

    return chartData.map((d, i) => {
      const x = paddingLeft + (i / (chartData.length - 1)) * (width - paddingLeft - paddingRight);
      const y = paddingTop + (1 - (d.cumulative - minVal) / range) * (height - paddingTop - paddingBottom);
      return `${x},${y}`;
    }).join(" ");
  }, [chartData]);

  const fillPoints = useMemo(() => {
    if (chartData.length === 0) return "";
    const scaledPoints = points;
    const values = chartData.map(d => d.cumulative);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1000);
    const range = maxVal - minVal;

    const startX = paddingLeft;
    const endX = width - paddingRight;
    const zeroY = paddingTop + (1 - (0 - minVal) / range) * (height - paddingTop - paddingBottom);

    return `${startX},${zeroY} ${scaledPoints} ${endX},${zeroY}`;
  }, [points, chartData]);

  return (
    <div id="calculator-section" className="scroll-mt-24 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-6 md:p-10 shadow-sm">
      <div className="mb-8">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
          Tactical Tools
        </span>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-white mt-2">
          Store Economics <span className="serif-italic text-amber-500">Diagnostics</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Tweak your operational metrics below to test the viability of your business model. This simulator uses Jimmy's real-world Plantshop.ae unit economics constants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input sliders */}
        <div className="lg:col-span-5 space-y-6 bg-[#090909] p-6 rounded-2xl border border-[#1f1f1f]">
          <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-500" />
            <span>Store Economics Parameters</span>
          </h3>

          <div className="space-y-4">
            {/* Avg Order Value Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-350 font-medium mb-1.5">
                <span className="flex items-center gap-1">
                  Average Order Value (AOV)
                  <span title="The average price a customer paid at checkout." className="inline-flex">
                    <HelpCircle className="w-3 h-3 text-zinc-500" aria-hidden="true" />
                  </span>
                </span>
                <span className="font-mono text-amber-500 bg-[#050505] border border-[#1f1f1f] px-2.5 py-0.5 rounded font-bold">
                  {metrics.avgOrderValue} AED
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1a1a1a] rounded-lg appearance-none"
                min="50"
                max="500"
                step="5"
                id="param-aov"
                value={metrics.avgOrderValue}
                onChange={(e) => handleSliderChange("avgOrderValue", Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>50 AED</span>
                <span>275 AED</span>
                <span>500 AED</span>
              </div>
            </div>

            {/* Delivery/Shipping Cost Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-350 font-medium mb-1.5">
                <span>Last-Mile Delivery Cost</span>
                <span className={`font-mono px-2.5 py-0.5 rounded font-bold ${calculations.logisticsRatio > 20 ? "bg-red-950/40 text-red-450 border border-red-900/30" : "bg-[#050505] text-amber-500 border border-[#1f1f1f]"}`}>
                  {metrics.deliveryCost} AED
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1a1a1a] rounded-lg appearance-none"
                min="10"
                max="80"
                step="2"
                id="param-shipping"
                value={metrics.deliveryCost}
                onChange={(e) => handleSliderChange("deliveryCost", Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>10 AED</span>
                <span>45 AED</span>
                <span>80 AED</span>
              </div>
            </div>

            {/* Customer Acquisition Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-350 font-medium mb-1.5">
                <span>CAC (Acquisition Spend)</span>
                <span className="font-mono text-amber-500 bg-[#050505] border border-[#1f1f1f] px-2.5 py-0.5 rounded font-bold">
                  {metrics.cac} AED
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1a1a1a] rounded-lg appearance-none"
                min="5"
                max="150"
                step="5"
                id="param-cac"
                value={metrics.cac}
                onChange={(e) => handleSliderChange("cac", Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>5 AED</span>
                <span>75 AED</span>
                <span>150 AED</span>
              </div>
            </div>

            {/* Product COGS percent Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-350 font-medium mb-1.5">
                <span>COGS % (Stock cost)</span>
                <span className="font-mono text-amber-500 bg-[#050505] border border-[#1f1f1f] px-2.5 py-0.5 rounded font-bold">
                  {metrics.cogsPercent}%
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1a1a1a] rounded-lg appearance-none"
                min="10"
                max="75"
                step="1"
                id="param-cogs"
                value={metrics.cogsPercent}
                onChange={(e) => handleSliderChange("cogsPercent", Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>10%</span>
                <span>42%</span>
                <span>75%</span>
              </div>
            </div>

            {/* Repeat customer purchase rate */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-355 font-medium mb-1.5">
                <span>Repeat Purchase Rate (12-Mo)</span>
                <span className="font-mono text-amber-500 bg-[#050505] border border-[#1f1f1f] px-2.5 py-0.5 rounded font-bold">
                  {metrics.repeatPurchaseRate}%
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1a1a1a] rounded-lg appearance-none"
                min="5"
                max="60"
                step="1"
                id="param-repeat"
                value={metrics.repeatPurchaseRate}
                onChange={(e) => handleSliderChange("repeatPurchaseRate", Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>5%</span>
                <span>32%</span>
                <span>60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-time Reports & Custom SVG Trend Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric indicators layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#090909] border border-[#1f1f1f] p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase block font-semibold">
                  Logistics Spend Ratio
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl md:text-2xl font-sans font-black ${calculations.logisticsRatio > 20 ? "text-red-400" : "text-white"}`}>
                    {calculations.logisticsRatio.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${calculations.logisticsRatio > 20 ? "bg-red-500 w-full" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(calculations.logisticsRatio * 3.3, 100)}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono mt-1.5 block font-medium ${calculations.logisticsRatio > 20 ? "text-red-400" : "text-emerald-500"}`}>
                  {calculations.logisticsRatio > 20 ? "Exceeds 20% limit" : "Healthy margins preserved"}
                </span>
              </div>
            </div>

            <div className="bg-[#090909] border border-[#1f1f1f] p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase block font-semibold">
                  Estimated LTV / CAC
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl md:text-2xl font-sans font-black ${calculations.ltvToCacRatio < 3 ? "text-amber-500" : "text-emerald-450"}`}>
                    {calculations.ltvToCacRatio.toFixed(1)}x
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => {
                    const threshold = calculations.ltvToCacRatio;
                    let dotColor = "bg-zinc-800";
                    if (dot <= 3 && threshold >= dot - 0.5) dotColor = threshold < 3 ? "bg-amber-500" : "bg-emerald-500";
                    if (dot > 3 && threshold >= dot - 0.5) dotColor = "bg-emerald-500";
                    return <span key={dot} className={`w-2 h-2 rounded-full ${dotColor}`} />;
                  })}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono block mt-1.5">
                  Target threshold: &gt;3.0x
                </span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-amber-500 text-black p-4 rounded-xl shadow-md shadow-amber-500/15 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-3 translate-y-3">
                <DollarSign className="w-24 h-24 text-black" />
              </div>
              <div>
                <span className="text-[#050505] font-mono text-[10px] tracking-wider uppercase block font-bold">
                  Monthly Net Cash Flow
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl md:text-2xl font-sans font-black">
                    {calculations.monthlyNetProfit < 0 ? "" : "+"}{calculations.monthlyNetProfit.toLocaleString()} AED
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-[10px] text-zinc-950/80 font-mono block">
                  Based on {metrics.monthlyOrders} orders/mo
                </span>
              </div>
            </div>
          </div>

          {/* SVG Multi-month cumulative chart */}
          <div className="bg-[#090909] border border-[#1f1f1f] p-5 rounded-2xl relative">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />
              <span>Projected 12-Month Cumulative Contribution Profile</span>
            </h4>
            
            <div className="w-full overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={calculations.monthlyNetProfit >= 0 ? "#f59e0b" : "#ef4444"} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={calculations.monthlyNetProfit >= 0 ? "#f59e0b" : "#ef4444"} stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="#1f1f1f" strokeDasharray="3,3" />
                <line x1={paddingLeft} y1={(height - paddingBottom + paddingTop) / 2} x2={width - paddingRight} y2={(height - paddingBottom + paddingTop) / 2} stroke="#1f1f1f" strokeDasharray="3,3" />
                <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#1f1f1f" strokeDasharray="3,3" />

                {/* Shaded Area fill under line */}
                <polygon points={fillPoints} fill="url(#areaGrad)" />

                {/* Profit/Loss Area Line */}
                <polyline points={points} fill="none" stroke={calculations.monthlyNetProfit >= 0 ? "#f59e0b" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Interactive Dot Markers */}
                {chartData.map((d, index) => {
                  const values = chartData.map(c => c.cumulative);
                  const minVal = Math.min(...values, 0);
                  const maxVal = Math.max(...values, 1000);
                  const range = maxVal - minVal;
                  const x = paddingLeft + (index / (chartData.length - 1)) * (width - paddingLeft - paddingRight);
                  const y = paddingTop + (1 - (d.cumulative - minVal) / range) * (height - paddingTop - paddingBottom);

                  if (index === 0 || index === 5 || index === 11) {
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="5" fill="#050505" stroke={calculations.monthlyNetProfit >= 0 ? "#f59e0b" : "#ef4444"} strokeWidth="2" />
                        <text x={x} y={y - 12} textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#ffffff">
                          {d.cumulative >= 0 ? "+" : ""}{(d.cumulative / 1000).toFixed(0)}k
                        </text>
                        <text x={x} y={height - paddingBottom + 13} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#52525b">
                          {d.month}
                        </text>
                      </g>
                    );
                  }
                  return null;
                })}

                {/* Y-Axis scale comments */}
                <text x="10" y={paddingTop + 4} fontSize="8" fontFamily="monospace" fill="#52525b">12-Mo High</text>
                <text x="10" y={height - paddingBottom + 4} fontSize="8" fontFamily="monospace" fill="#52525b">0 AED</text>
              </svg>
            </div>
          </div>

          {/* Advisory comment box */}
          <div className={`p-5 rounded-2xl border flex gap-3.5 items-start ${
            advisoryTake.type === "danger"
              ? "bg-red-500/5 border-red-500/10 text-zinc-300"
              : advisoryTake.type === "warning"
              ? "bg-amber-500/5 border-amber-500/10 text-zinc-300"
              : "bg-emerald-500/5 border-emerald-500/10 text-zinc-300"
          }`}>
            <span className="flex-shrink-0 mt-0.5">
              {advisoryTake.type === "danger" ? (
                <ShieldAlert className="w-5 h-5 text-red-500" />
              ) : advisoryTake.type === "warning" ? (
                <BadgeInfo className="w-5 h-5 text-amber-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              )}
            </span>
            <div>
              <h4 className={`text-sm font-bold font-sans tracking-tight ${advisoryTake.type === "danger" ? "text-red-400" : advisoryTake.type === "warning" ? "text-amber-500" : "text-emerald-400"}`}>
                {advisoryTake.title}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed mt-1">{advisoryTake.text}</p>
            </div>
          </div>

          <EmailResultsCapture
            toolUsed="Commerce Infrastructure Analytics"
            assessmentScore={`${calculations.ltvToCacRatio.toFixed(1)}x LTV:CAC`}
            assessmentSummary={`${advisoryTake.title}. Monthly net ${calculations.monthlyNetProfit.toLocaleString()} AED. Logistics ${calculations.logisticsRatio.toFixed(1)}% of AOV. ${advisoryTake.text}`}
            serviceInterest="Commerce Infrastructure Review"
            componentSource="ecom-audit-calculator"
          />
        </div>
      </div>
    </div>
  );
}
