/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Check, User, Mail, Landmark, Compass, HelpCircle, CalendarCheck2, History } from "lucide-react";
import { BookingRequest, ServiceDetail } from "../types";
import { motionInitial } from "../utils/motion";

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

  type DaySlot = { formatted: string; raw: string };

  const TIME_SLOT_OPTIONS = [
    "10:00 AM GST",
    "11:30 AM GST",
    "2:00 PM GST",
    "4:30 PM GST",
  ] as const;

  // Calendar setup - next 4 business days (client-only; never baked into prerender)
  const getNextBusinessDays = (): DaySlot[] => {
    const days: DaySlot[] = [];
    const date = new Date();
    let count = 0;
    while (count < 4) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      // Skip Saturday and Sunday
      if (day !== 0 && day !== 6) {
        days.push({
          formatted: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          raw: date.toISOString().split("T")[0],
        });
        count++;
      }
    }
    return days;
  };

  // Empty until the browser calculates live availability — keeps dist/index.html free of stale dates.
  const [dateSlots, setDateSlots] = useState<DaySlot[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceDetail>(services[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availabilityReady, setAvailabilityReady] = useState(false);

  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [bottleneck, setBottleneck] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [activeBookings, setActiveBookings] = useState<BookingRequest[]>([]);

  // Calculate availability only in the browser after mount
  useEffect(() => {
    const days = getNextBusinessDays();
    setDateSlots(days);
    if (days[0]) {
      setSelectedDate(days[0].raw);
    }
    setSelectedTimeSlot(TIME_SLOT_OPTIONS[0]);
    setAvailabilityReady(true);
  }, []);

  // Load existing bookings from client cache
  useEffect(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") return;
    const cached = localStorage.getItem("jimmy_active_bookings");
    if (cached) {
      try {
        setActiveBookings(JSON.parse(cached));
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse bookings", e);
        }
      }
    }
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderName || !founderEmail || !startupName) return;
    if (!availabilityReady || !selectedDate || !selectedTimeSlot || isLoading) return;

    setIsLoading(true);
    setSubmitError(false);

    try {
      const newRequest: BookingRequest = {
        id: `bk-${Date.now()}`,
        serviceName: selectedService.title,
        founderName,
        founderEmail,
        startupName,
        bottleneck: bottleneck || "General business model clarity sparring",
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        createdAt: new Date().toISOString(),
      };

      const updatedList = [newRequest, ...activeBookings];
      setActiveBookings(updatedList);
      localStorage.setItem("jimmy_active_bookings", JSON.stringify(updatedList));

      if (typeof window !== "undefined") {
        const storedGadsId = localStorage.getItem("jimmy_gads_measurement_id") || "";
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "lead_form_conversion",
          gads_id: storedGadsId || "unsigned_corridor_lead",
          conversion_value: 0.0,
        });
      }

      setIsSuccess(true);
      setFounderName("");
      setFounderEmail("");
      setStartupName("");
      setBottleneck("");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Booking form submission failed:", error);
      }
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
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
            {submitError && !isSuccess ? (
              <motion.div
                key="error"
                initial={motionInitial({ opacity: 0, scale: 0.95 })}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                role="alert"
              >
                <div className="w-16 h-16 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-8 h-8" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl text-white">The message could not be sent.</h4>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed mt-2 font-sans">
                    Your message is still with you. Please try again, or use the alternative contact option below.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitError(false)}
                    className="px-5 py-2.5 bg-amber-500 text-black hover:bg-amber-400 font-sans font-semibold rounded-xl text-sm transition cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                  >
                    Try Again
                  </button>
                  <a
                    href="mailto:jimmymanalel@gmail.com"
                    className="px-5 py-2.5 border border-[#1f1f1f] text-zinc-300 hover:text-white hover:bg-zinc-900 font-sans font-semibold rounded-xl text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                  >
                    Email jimmymanalel@gmail.com
                  </a>
                </div>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                initial={motionInitial({ opacity: 0, scale: 0.95 })}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Check className="w-8 h-8 font-black" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl text-white">
                    Your request has been received.
                  </h4>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed mt-2 font-sans">
                    I’ll review the details and follow up regarding the meeting.
                  </p>
                  <div className="mt-4 bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs text-zinc-300 max-w-xs mx-auto space-y-1 font-mono">
                    <div>SERVICE: {selectedService.title}</div>
                    <div>DATE: {getReadableDate(selectedDate)}</div>
                    <div>TIME: {selectedTimeSlot}</div>
                    <div className="text-emerald-500 font-bold uppercase mt-1">STATUS: Received</div>
                  </div>
                </div>
                <button
                  type="button"
                  id="book-another-session-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-amber-500 text-black hover:bg-amber-400 font-sans font-semibold rounded-xl text-sm transition cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Book New Slot
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="booking-form"
                onSubmit={handleBookingSubmit}
                initial={motionInitial({ opacity: 0 })}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="booking-form-element"
              >
                {/* 02. Date / Calendar — date values only after client mount */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                    02. Choose Slot Date & Time (GST Time)
                  </span>

                  {!availabilityReady ? (
                    <div
                      id="booking-availability-loading"
                      role="status"
                      aria-live="polite"
                      className="rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-8 text-center"
                    >
                      <Clock className="mx-auto mb-2 h-5 w-5 text-amber-500" aria-hidden="true" />
                      <p className="text-sm font-sans font-medium text-zinc-300">
                        Loading current availability…
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Live session dates are prepared when this page loads in your browser.
                      </p>
                    </div>
                  ) : (
                    <>
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
                              <Calendar
                                className={`w-4 h-4 mx-auto mb-1 opacity-80 ${
                                  isSelected ? "text-black" : "text-amber-500"
                                }`}
                                aria-hidden="true"
                              />
                              <span className="block text-xs font-sans font-semibold">
                                {d.formatted.split(",")[1]}
                              </span>
                              <span className="block text-[10px] font-mono opacity-80 mt-0.5">
                                {d.formatted.split(",")[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                        {TIME_SLOT_OPTIONS.map((time) => {
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
                    </>
                  )}
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
                  disabled={isLoading || !availabilityReady || !selectedDate || !selectedTimeSlot}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-sans font-bold text-sm py-3.5 rounded-xl cursor-pointer shadow flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
