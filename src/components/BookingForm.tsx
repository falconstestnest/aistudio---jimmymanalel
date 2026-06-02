/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Check, User, Mail, Landmark, Compass, HelpCircle, CalendarCheck2, History } from "lucide-react";
import { BookingRequest, ServiceDetail } from "../types";

export default function BookingForm() {
  const services: ServiceDetail[] = [
    {
      slug: "strategy",
      title: "Founder Strategy Session",
      tagline: "A deep 1-on-1 strategy audit to clarify business model & positioning",
      bullets: ["Business model architecture review", "Strategic placement diagnostics", "Candid market viability feedback"],
      duration: "45 Mins",
      target: "Early-stage founders",
      focus: "Model and direction clarity"
    },
    {
      slug: "pitch",
      title: "Pitch Deck Review",
      tagline: "Direct review of investor deck, narrative structure & storytelling",
      bullets: ["VC story flow diagnostics", "Elevator pitch & hook optimization", "Data room & metrics narrative check"],
      duration: "60 Mins",
      target: "Founders seeking seed / Series A",
      focus: "Storytelling & fundraising readiness"
    },
    {
      slug: "fundraising",
      title: "Fundraising Readiness Sprint",
      tagline: "Focused engagement to map out story, valuation positioning, & outreach",
      bullets: ["Structured investor target criteria", "Valuation narrative alignment", "Pitch delivery rehearsal feedback"],
      duration: "90 Mins",
      target: "Founders actively raising in 2026",
      focus: "Fundraising prep operations"
    },
    {
      slug: "ecommerce",
      title: "E-commerce Growth Audit",
      tagline: "Practical review of marketplace operations, logistics density, and margins",
      bullets: ["Logistics SLA & fulfillment review", "CAC & repeat-purchase loop diagnostic", "Vendor systems audit"],
      duration: "60 Mins",
      target: "E-comm & Marketplace builders",
      focus: "Unit economics and scale bottlenecks"
    },
    {
      slug: "gcc-expansion",
      title: "Middle East Market Access Advisory",
      tagline: "Guidance for founders entering UAE and Middle East startup ecosystems",
      bullets: ["Local business licensing navigation", "B2B partnership pathways", "Ecosystem network introductions"],
      duration: "60 Mins",
      target: "Indian & global startups expanding",
      focus: "Localization & networking corridors"
    }
  ];

  // Calendar setup - next 4 business days
  const getNextBusinessDays = () => {
    const days = [];
    const date = new Date();
    // Start from tomorrow
    let count = 0;
    while (count < 4) {
      date.setDate(date.getDate() + 1);
      // Skip weekends (Friday/Saturday/Sunday depending on UAE vs International)
      // We will skip Saturday and Sunday
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        days.push({
          formatted: date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }),
          raw: date.toISOString().split('T')[0]
        });
        count++;
      }
    }
    return days;
  };

  const [dateSlots] = useState(getNextBusinessDays());
  const [timeSlots] = useState(["10:00 AM GST", "11:30 AM GST", "2:00 PM GST", "4:30 PM GST"]);
  
  const [selectedService, setSelectedService] = useState<ServiceDetail>(services[0]);
  const [selectedDate, setSelectedDate] = useState(dateSlots[0].raw);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);
  
  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [bottleneck, setBottleneck] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeBookings, setActiveBookings] = useState<BookingRequest[]>([]);

  // Load existing bookings from client cache
  useEffect(() => {
    const cached = localStorage.getItem("jimmy_active_bookings");
    if (cached) {
      try {
        setActiveBookings(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    }
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderName || !founderEmail || !startupName) return;

    setIsLoading(true);

    const newRequest: BookingRequest = {
      id: `bk-${Date.now()}`,
      serviceName: selectedService.title,
      founderName,
      founderEmail,
      startupName,
      bottleneck: bottleneck || "General business model clarity sparring",
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      const updatedList = [newRequest, ...activeBookings];
      setActiveBookings(updatedList);
      localStorage.setItem("jimmy_active_bookings", JSON.stringify(updatedList));
      setIsLoading(false);
      setIsSuccess(true);

      // Clean inputs
      setFounderName("");
      setFounderEmail("");
      setStartupName("");
      setBottleneck("");
    }, 1200);
  };

  const getReadableDate = (rawDate: string) => {
    const found = dateSlots.find(d => d.raw === rawDate);
    return found ? found.formatted : rawDate;
  };

  return (
    <div id="booking-section" className="scroll-mt-24 bg-white rounded-2xl border border-slate-100 p-6 md:p-10 shadow-sm">
      <div className="mb-8">
        <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-mono font-medium tracking-wider uppercase">
          Advisory Sessions
        </span>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 mt-2">
          Book a Founder Clarity Session
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Need custom feedback on your deck, marketplace unit economics, or Middle East launch model? Choose a signature session below to reserve your review slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Services selector */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748b]">
            01. Select Your Service Audit
          </span>
          <div className="space-y-3">
            {services.map((service) => {
              const isActive = service.slug === selectedService.slug;
              return (
                <button
                  key={service.slug}
                  id={`service-select-${service.slug}`}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-950/10"
                      : "bg-slate-50/50 hover:bg-slate-50 border-slate-150 text-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-sans font-bold text-sm md:text-base">
                      {service.title}
                    </span>
                    <span className={`text-[10px] font-mono whitespace-nowrap px-2 py-0.5 rounded ${
                      isActive ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600 border border-slate-150"
                    }`}>
                      {service.duration}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Form & Calendar */}
        <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-150 relative">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl text-slate-950">Session Request Received</h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed mt-2">
                    Thanks! I have registered your startup, **{startupName || "Your Startup"}**, for the **{selectedService.title}**.
                  </p>
                  <div className="mt-4 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-650 max-w-xs mx-auto space-y-1 font-mono">
                    <div>DATE: {getReadableDate(selectedDate)}</div>
                    <div>TIME: {selectedTimeSlot}</div>
                    <div className="text-emerald-600 font-bold uppercase mt-1">STATUS: Scheduled (Pending confirmation)</div>
                  </div>
                </div>
                <button
                  type="button"
                  id="book-another-session-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-sans font-semibold shadow hover:bg-slate-800 transition cursor-pointer"
                >
                  Book New Slot
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="booking-form"
                onSubmit={handleBookingSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="booking-form-element"
              >
                {/* 02. Date / Calendar */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748b] block">
                    02. Choose Slot Date & Time (GST Time)
                  </span>
                  
                  {/* Dates Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {dateSlots.map((d) => {
                      const isSelected = selectedDate === d.raw;
                      return (
                        <button
                          key={d.raw}
                          type="button"
                          id={`date-select-${d.raw}`}
                          onClick={() => setSelectedDate(d.raw)}
                          className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white shadow"
                              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                        >
                          <Calendar className={`w-4 h-4 mx-auto mb-1 opacity-70 ${isSelected ? "text-white" : "text-slate-700"}`} />
                          <span className="block text-xs font-sans font-semibold">
                            {d.formatted.split(',')[1]}
                          </span>
                          <span className="block text-[10px] font-mono opacity-80 mt-0.5">
                            {d.formatted.split(',')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Times grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTimeSlot === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          id={`time-select-${time}`}
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-mono transition cursor-pointer ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white font-bold"
                              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 03. Founder Details */}
                <div className="space-y-4 pt-2 border-t border-slate-200">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748b] block">
                    03. Your Metrics & Identity
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        id="form-founder-name"
                        placeholder="Founder Name *"
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        id="form-founder-email"
                        placeholder="Work Email *"
                        value={founderEmail}
                        onChange={(e) => setFounderEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950"
                      />
                    </div>
                  </div>

                  <div className="relative animate-none">
                    <Landmark className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      id="form-startup-name"
                      placeholder="Startup / Company Name *"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      id="form-bottleneck"
                      placeholder="Describe your single biggest startup bottleneck right now (1 sentence)..."
                      value={bottleneck}
                      onChange={(e) => setBottleneck(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="form-booking-submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-sm py-3.5 rounded-xl cursor-pointer shadow flex items-center justify-center gap-2 transition"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CalendarCheck2 className="w-4 h-4" />
                      <span>Request Clarity Session Slot</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking History section */}
      {activeBookings.length > 0 && (
         <div className="mt-10 border-t border-slate-100 pt-8">
           <h3 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
             <History className="w-4 h-4 text-slate-705" />
             <span>Active Schedule Requests ({activeBookings.length})</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {activeBookings.map((b) => (
                <div key={b.id} className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase bg-white border border-slate-150 px-2 py-0.5 rounded w-max">
                      {b.serviceName}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-slate-950 mt-1">
                      {b.startupName}
                    </h4>
                    <p className="text-xs text-slate-500 truncate max-w-[280px]">
                      "{b.bottleneck}"
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                      <span>DATE: {getReadableDate(b.date)}</span>
                      <span>•</span>
                      <span>TIME: {b.timeSlot}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-150">
                      Pending
                    </span>
                  </div>
                </div>
             ))}
           </div>
         </div>
      )}
    </div>
  );
}
