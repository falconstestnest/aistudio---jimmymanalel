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
      title: "Founder Strategic Advisory",
      tagline: "High-leverage support on cross-border business models & narrative positioning",
      bullets: ["Ecosystem strategic placement review", "Systemic scaling bottleneck diagnostic", "Ecosystem cross-connections"],
      duration: "45 Mins",
      target: "Growth-stage tech founders",
      focus: "Narrative & corridor positioning"
    },
    {
      slug: "pitch",
      title: "Investor Narrative Architecture",
      tagline: "Structured review of your institutional story, decks & fundability metrics",
      bullets: ["Cross-border venture positioning audit", "Investor-grade storytelling diagnostics", "SLA & economics structural validation"],
      duration: "60 Mins",
      target: "Founders seeking institutional backing",
      focus: "Venture-ready narrative logic"
    },
    {
      slug: "fundraising",
      title: "Venture Readiness Intensive",
      tagline: "High-touch mapping of strategic global expansion corridors & capital entry points",
      bullets: ["Bilateral corridor target maps", "Valuation narrative optimization", "Institutional pitch mechanics analysis"],
      duration: "90 Mins",
      target: "Founders eyes on Middle East & global growth",
      focus: "Corridor expansion alignment"
    },
    {
      slug: "ecommerce",
      title: "Commerce Infrastructure Review",
      tagline: "Logistics, supply chain warehousing & SLA optimization across multi-zone nodes",
      bullets: ["Fulfillment density & cash-flow speed check", "Multi-tier supplier contract loops", "Unit-economic leak tracing"],
      duration: "60 Mins",
      target: "Platform & marketplace builders",
      focus: "Preserving operating margins"
    },
    {
      slug: "gcc-expansion",
      title: "GCC Expansion Pathways",
      tagline: "Establish market entry pathways, corporate partnerships & regulatory routing",
      bullets: ["GCC business licensing navigation", "Asset transfer & localized distribution alignment", "Ecosystem integration channels"],
      duration: "60 Mins",
      target: "Global businesses entering the GCC",
      focus: "Regulatory entry & network corridors"
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

    // Prepare HubSpot Lead Payload
    const syncPayload = {
      email: founderEmail,
      firstname: founderName.split(" ")[0] || "Founder",
      lastname: founderName.split(" ").slice(1).join(" ") || "User",
      company: startupName,
      message: bottleneck || "General bottleneck discussion requested.",
      source: "Strategic Corridor Booking Form",
      details: `Service audit requested: ${selectedService.title}. Scheduled slot: ${selectedDate} at ${selectedTimeSlot}.`
    };

    // 1. Process HubSpot Server-Side Sync
    fetch("/api/hubspot/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(syncPayload)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Automatic HubSpot synchronization response:", data);
        
        // Log client-side sandbox feedback
        const conversionLogs = localStorage.getItem("jimmy_conversion_logs");
        let parsedLogs = [];
        if (conversionLogs) {
          try { parsedLogs = JSON.parse(conversionLogs); } catch (err) {}
        }
        const newLog = {
          id: Math.random().toString(),
          time: new Date().toLocaleTimeString(),
          action: data.dryRun 
            ? `HubSpot dry-run contact sync: ${founderEmail}`
            : `HubSpot live contact synced successfully: ${founderEmail}`,
          status: "success" as const,
          payload: data.payloadSent || data.rawResponse
        };
        localStorage.setItem("jimmy_conversion_logs", JSON.stringify([newLog, ...parsedLogs].slice(0, 8)));
      })
      .catch(err => {
        console.error("HubSpot automatic sync error:", err);
      });

    // 2. Process Google Ads DataLayer Trigger
    if (typeof window !== "undefined") {
      const storedGadsId = localStorage.getItem("jimmy_gads_measurement_id") || "";
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_form_conversion",
        gads_id: storedGadsId || "unsigned_corridor_lead",
        conversion_value: 0.00
      });
    }

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
    <div id="booking-section" className="scroll-mt-24 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-6 md:p-10 shadow-sm text-zinc-300">
      <div className="mb-8">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
          Ecosystem Navigation
        </span>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-white mt-2">
          Request Strategic <span className="serif-italic text-amber-500">Corridor Access</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Align your investor story, optimize your multi-node commerce infrastructure, or activate your Middle East market expansion pathways.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Services selector */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
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
                      ? "bg-amber-500 border-amber-500 text-black shadow-md shadow-amber-500/10"
                      : "bg-[#090909] hover:bg-[#121212] border-[#1f1f1f] text-zinc-300"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-sans font-bold text-sm md:text-base">
                      {service.title}
                    </span>
                    <span className={`text-[10px] font-mono whitespace-nowrap px-2 py-0.5 rounded ${
                      isActive ? "bg-black/20 text-black font-semibold" : "bg-[#050505] text-amber-500 border border-amber-500/10"
                    }`}>
                      {service.duration}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isActive ? "text-zinc-900" : "text-zinc-450"}`}>
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Form & Calendar */}
        <div className="lg:col-span-7 bg-[#090909] p-6 md:p-8 rounded-2xl border border-[#1f1f1f] relative">
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
                  <Check className="w-8 h-8 font-black" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl text-white">Session Request Received</h4>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed mt-2 font-sans">
                    I have registered your startup, <strong className="text-white">{startupName || "Your Startup"}</strong>, for the <strong className="text-amber-500">{selectedService.title}</strong>.
                  </p>
                  <div className="mt-4 bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs text-zinc-300 max-w-xs mx-auto space-y-1 font-mono">
                    <div>DATE: {getReadableDate(selectedDate)}</div>
                    <div>TIME: {selectedTimeSlot}</div>
                    <div className="text-emerald-500 font-bold uppercase mt-1">STATUS: Scheduled (Pending confirmation)</div>
                  </div>
                </div>
                <button
                  type="button"
                  id="book-another-session-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-amber-500 text-black hover:bg-amber-400 font-sans font-semibold rounded-xl text-sm transition cursor-pointer"
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
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
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
                              ? "bg-amber-500 border-amber-500 text-black shadow-md shadow-amber-500/10"
                              : "bg-[#050505] hover:bg-zinc-950 border-[#1f1f1f] text-zinc-300"
                          }`}
                        >
                          <Calendar className={`w-4 h-4 mx-auto mb-1 opacity-80 ${isSelected ? "text-black" : "text-amber-500"}`} />
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
                              ? "bg-amber-500 border-amber-500 text-black font-bold"
                              : "bg-[#050505] hover:bg-[#121212] border-[#1f1f1f] text-zinc-400"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 03. Founder Details */}
                <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                    03. Your Metrics & Identity
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-550 pointer-events-none" />
                      <input
                        type="text"
                        required
                        id="form-founder-name"
                        placeholder="Founder Name *"
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-550 pointer-events-none" />
                      <input
                        type="email"
                        required
                        id="form-founder-email"
                        placeholder="Work Email *"
                        value={founderEmail}
                        onChange={(e) => setFounderEmail(e.target.value)}
                        className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Landmark className="absolute left-3 top-3.5 w-4 h-4 text-zinc-550 pointer-events-none" />
                    <input
                      type="text"
                      required
                      id="form-startup-name"
                      placeholder="Startup / Company Name *"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                      className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      id="form-bottleneck"
                      placeholder="Describe your single biggest startup bottleneck right now (1 sentence)..."
                      value={bottleneck}
                      onChange={(e) => setBottleneck(e.target.value)}
                      className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="form-booking-submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-sans font-bold text-sm py-3.5 rounded-xl cursor-pointer shadow flex items-center justify-center gap-2 transition duration-200"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <CalendarCheck2 className="w-4 h-4 text-black" />
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
         <div className="mt-10 border-t border-[#1f1f1f] pt-8">
           <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
             <History className="w-4 h-4 text-amber-500" />
             <span>Active Schedule Requests ({activeBookings.length})</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {activeBookings.map((b) => (
                <div key={b.id} className="bg-[#090909] border border-[#1f1f1f] p-4 rounded-xl flex justify-between items-start hover:border-amber-500/10 transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-500 font-bold block uppercase bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded w-max">
                      {b.serviceName}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-white mt-1">
                      {b.startupName}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate max-w-[280px]">
                      "{b.bottleneck}"
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 pt-1">
                      <span>DATE: {getReadableDate(b.date)}</span>
                      <span>•</span>
                      <span>TIME: {b.timeSlot}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
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
