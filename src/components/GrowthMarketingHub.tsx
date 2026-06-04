import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Send, 
  Terminal, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Globe,
  Check,
  RefreshCw
} from "lucide-react";

export default function GrowthMarketingHub() {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [gadsId, setGadsId] = useState<string>(() => localStorage.getItem("jimmy_gads_measurement_id") || "");
  const [testLogs, setTestLogs] = useState<Array<{ id: string; time: string; action: string; status: "success" | "warning"; payload?: any }>>([]);
  
  // Test Sync form fields
  const [testEmail, setTestEmail] = useState("founder@example.com");
  const [testFirstName, setTestFirstName] = useState("Elena");
  const [testLastName, setTestLastName] = useState("Vasiliev");
  const [testCompany, setTestCompany] = useState("Dubai Logistics AI");
  const [testMessage, setTestMessage] = useState("Looking to synchronize unit economics model and enter GCC corridor.");
  const [sendingTest, setSendingTest] = useState(false);
  const [syncOutcome, setSyncOutcome] = useState<any | null>(null);

  useEffect(() => {
    fetchStatus();
    loadConversionLogs();
  }, []);

  const fetchStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await fetch("/api/hubspot/status");
      if (res.ok) {
        const data = await res.json();
        setIsConfigured(data.connected);
        setStatusMessage(data.message);
      }
    } catch (e) {
      console.error("Failed to query HubSpot configuration:", e);
      setIsConfigured(false);
      setStatusMessage("Unable to connect to advisory backend. Safe local offline simulation mode active.");
    } finally {
      setCheckingStatus(false);
    }
  };

  const loadConversionLogs = () => {
    const cached = localStorage.getItem("jimmy_conversion_logs");
    if (cached) {
      try {
        setTestLogs(JSON.parse(cached));
      } catch (e) {
        setTestLogs([]);
      }
    } else {
      const initialLogs = [
        {
          id: "1",
          time: new Date(Date.now() - 3600000 * 2).toLocaleTimeString(),
          action: "Local UI Interaction Initialized",
          status: "success" as const
        }
      ];
      setTestLogs(initialLogs);
      localStorage.setItem("jimmy_conversion_logs", JSON.stringify(initialLogs));
    }
  };

  const addLog = (action: string, status: "success" | "warning", payload?: any) => {
    const newLog = {
      id: Math.random().toString(),
      time: new Date().toLocaleTimeString(),
      action,
      status,
      payload
    };
    const updated = [newLog, ...testLogs].slice(0, 8);
    setTestLogs(updated);
    localStorage.setItem("jimmy_conversion_logs", JSON.stringify(updated));
  };

  const handleSaveGadsId = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("jimmy_gads_measurement_id", gadsId);
    addLog(`Stored Google Ads Conversion ID: ${gadsId || "(cleared)"}`, "success");
    
    // Push developer event simulator if window.dataLayer exists
    if (gadsId && typeof window !== "undefined") {
      // Create dataLayer if not exists
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "gads_config_updated",
        measurementId: gadsId
      });
    }
  };

  const handleTriggerMockConversion = () => {
    addLog("Event fired: Form conversion triggered", "success", {
      event: "lead_form_conversion",
      google_ads_conversion_id: gadsId || "NOT_CONFIGURED",
      timestamp: Date.now(),
      category: "strategic_lead"
    });
    
    // Simulate real window.dataLayer.push for Google Tag Manager mapping
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_form_conversion",
        gads_id: gadsId || "fallback_sandbox_id",
        conversion_value: 0.00
      });
    }
  };

  const handleTestSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;

    setSendingTest(true);
    setSyncOutcome(null);

    const payload = {
      email: testEmail,
      firstname: testFirstName,
      lastname: testLastName,
      company: testCompany,
      message: testMessage,
      source: "hubspot_sandbox_tester",
      details: "Triggered from the Interactive Growth & Lead Hub Panel."
    };

    try {
      const res = await fetch("/api/hubspot/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Integrator server returned ${res.status}`);
      }

      const data = await res.json();
      setSyncOutcome(data);
      
      const logMsg = data.dryRun
        ? "Lead logged to Local Sandbox (Dry-Run payload checked)"
        : "Lead pushed with real HubSpot API endpoint";

      addLog(logMsg, data.success ? "success" : "warning", data.payloadSent || data.rawResponse);
    } catch (e: any) {
      console.error("Test sync failure:", e);
      addLog("Failed server connection during HubSpot sync", "warning", { error: e.message });
      setSyncOutcome({
        success: false,
        error: "Server-side integration proxy error",
        details: e.message
      });
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Row */}
      <div className="border-b border-[#1f1f1f] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase inline-block">
            LEAD & MARTECH CORRIDOR
          </span>
          <h2 className="text-3xl font-sans font-bold text-white mt-1">
            Growth & <span className="serif-italic text-amber-500">Lead Hub</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Integrate HubSpot CRM pipelines, monitor conversion signals, test lead capture schemas, and deploy optimized Google Ads setups.
          </p>
        </div>
        <button
          onClick={fetchStatus}
          className="px-4 py-2 border border-[#1f1f1f] text-zinc-400 hover:text-white rounded-xl text-xs font-mono flex items-center gap-2 hover:bg-zinc-900 transition-all w-max h-max cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${checkingStatus ? "animate-spin" : ""}`} />
          <span>Reload Connection Status</span>
        </button>
      </div>

      {/* 2. Integrations Bento Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: HubSpot and Pixels config */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* HubSpot Status Card */}
          <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className={`p-2.5 rounded-xl ${isConfigured ? "bg-emerald-500/15" : "bg-amber-500/15"}`}>
                  <Settings className={`w-5 h-5 ${isConfigured ? "text-emerald-500" : "text-amber-500"}`} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-white text-base">HubSpot CRM Integration Status</h3>
                  <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                    Automatically synchronize customer meetings and narrative audits straight to HubSpot contacts.
                  </p>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  isConfigured 
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                    : "bg-zinc-800 text-zinc-400 border border-[#1f1f1f]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConfigured ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"}`} />
                  {isConfigured ? "Connected & Active" : "Dry-Run Simulator Active"}
                </span>
              </div>
            </div>

            <div className="bg-[#050505] rounded-xl border border-[#1f1f1f] p-4 text-xs space-y-2.5 font-sans">
              <p className="text-zinc-300 leading-relaxed">
                {statusMessage || "Checking credentials state..."}
              </p>
              {!isConfigured && (
                <div className="text-zinc-500 text-[11px] leading-relaxed flex gap-2 pt-1 border-t border-[#1f1f1f] mt-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    To activate <strong>live HubSpot synchronization</strong>, enter your Private App Access Token as <code className="bg-zinc-900 text-amber-500 px-1 py-0.5 rounded font-mono">HUBSPOT_ACCESS_TOKEN</code> inside your AI Studio Workspace Secrets panel.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* HubSpot Playground simulation */}
          <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-sans font-bold text-white text-base flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-500" />
                <span>Interactive CRM Payload Sandbox</span>
              </h3>
              <p className="text-zinc-400 text-xs mt-1">
                Simulate contact creation schemas. See exactly how the platform formats properties and transfers logs.
              </p>
            </div>

            <form onSubmit={handleTestSync} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Founder Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Venture / Company Name
                </label>
                <input
                  type="text"
                  value={testCompany}
                  onChange={(e) => setTestCompany(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={testFirstName}
                  onChange={(e) => setTestFirstName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={testLastName}
                  onChange={(e) => setTestLastName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Message / Bottleneck Context
                </label>
                <textarea
                  rows={2}
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all resize-none placeholder-zinc-650"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={sendingTest}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-sans font-bold cursor-pointer transition flex items-center gap-1.5"
                >
                  {sendingTest ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch HubSpot API Call</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {syncOutcome && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="border border-[#1f1f1f] rounded-xl overflow-hidden text-xs font-mono"
                >
                  <div className={`p-3 select-none flex items-center justify-between text-[11px] font-semibold font-sans ${
                    syncOutcome.success ? "bg-emerald-500/10 text-emerald-500 border-b border-emerald-500/15" : "bg-red-500/10 text-red-400 border-b border-red-500/15"
                  }`}>
                    <span>API DISPATCH STATUS: {syncOutcome.success ? "SUCCESS" : "ERROR"}</span>
                    <span>{syncOutcome.dryRun ? "SANDBOX DRY-RUN" : "LIVE LINK"}</span>
                  </div>
                  
                  <div className="bg-black p-4 space-y-3 max-h-[180px] overflow-y-auto scrollbar-none">
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      {syncOutcome.message || syncOutcome.error}
                    </p>
                    
                    {syncOutcome.payloadSent && (
                      <div className="space-y-1">
                        <span className="text-zinc-550 text-[10px] uppercase font-bold tracking-wider block">Generated JSON Properties sent:</span>
                        <pre className="text-amber-500 text-[10px] leading-tight select-all">
                          {JSON.stringify(syncOutcome.payloadSent, null, 2)}
                        </pre>
                      </div>
                    )}

                    {syncOutcome.rawResponse && (
                      <div className="space-y-1">
                        <span className="text-zinc-550 text-[10px] uppercase font-bold tracking-wider block">Raw HubSpot Gateway API response:</span>
                        <pre className="text-emerald-500 text-[10px] leading-tight select-all">
                          {JSON.stringify(syncOutcome.rawResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Google Ads Integrator */}
          <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
            <div className="flex gap-3">
              <div className="p-2.5 bg-amber-500/15 rounded-xl h-max">
                <Globe className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-white text-base">Google Ads Conversion Track Gateway</h3>
                <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed font-sans">
                  Configure conversion actions for Google Ads. The app automatically dispatches conversion tags dynamically via standard browser <code className="bg-black text-amber-500 px-1 py-0.5 rounded font-mono">dataLayer</code> formats.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveGadsId} className="flex gap-2 items-end pt-2">
              <div className="flex-1">
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Google Ads / GTAG Conversion ID (e.g., AW-109283746)
                </label>
                <input
                  type="text"
                  placeholder="e.g., AW-109283746"
                  value={gadsId}
                  onChange={(e) => setGadsId(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-[#090909] transition-all placeholder-zinc-650"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 border border-[#1f1f1f] text-white hover:bg-zinc-805 rounded-xl text-xs font-sans font-bold transition cursor-pointer"
              >
                Store Conversion ID
              </button>
            </form>

            <div className="pt-2 border-t border-[#1f1f1f] flex flex-wrap gap-3 items-center justify-between">
              <span className="text-[11px] text-zinc-500 leading-relaxed font-sans block max-w-sm">
                Fires on: (1) Strategic Corridor access request bookings, (2) Startup Pitch diagnostics submissions.
              </span>
              <button
                type="button"
                onClick={handleTriggerMockConversion}
                className="px-4 py-1.5 border border-amber-500/20 hover:border-amber-500/40 text-amber-500 hover:text-amber-400 rounded-lg text-xs font-mono tracking-wide transition cursor-pointer"
              >
                Trigger Simulated pixel_conversion Event
              </button>
            </div>
          </div>

        </div>

        {/* Right 5 Columns: Console Monitor & Advisory Stack */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live DataLayer Monitor Console */}
          <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4 mb-4">
              <h3 className="font-sans font-bold text-white text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500 animate-pulse" />
                <span>Conversion Console Logs</span>
              </h3>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Observe client-side browser actions and tracking events fired to conversion tag listeners.
              </p>
            </div>

            <div className="bg-black border border-[#1f1f1f] rounded-xl p-4 min-h-[160px] font-mono text-[10px] space-y-3.5 max-h-[250px] overflow-y-auto scrollbar-none">
              {testLogs.length === 0 ? (
                <div className="text-zinc-600 text-xs py-8 text-center">
                  No active transaction conversion logs found.
                </div>
              ) : (
                testLogs.map((log) => (
                  <div key={log.id} className="space-y-1.5 border-b border-zinc-950 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-zinc-550">
                      <span>[{log.time}]</span>
                      <span className={`px-1 py-0.2 rounded font-bold uppercase ${
                        log.status === "success" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-400 bg-amber-400/10"
                      }`}>{log.status}</span>
                    </div>
                    <p className="text-zinc-300 font-bold">{log.action}</p>
                    {log.payload && (
                      <pre className="text-zinc-500 text-[9px] leading-tight mt-1 bg-zinc-955 p-1.5 rounded-md text-wrap max-h-[80px] overflow-y-auto scrollbar-none select-all">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Martech Advisor Stack Panel */}
          <div className="bg-zinc-950 border border-[#1f1f1f] rounded-2xl p-6 space-y-5">
            <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Jimmy's Martech Strategy Suite</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5 font-sans">
                <h4 className="text-xs text-white font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Why HubSpot is Elite for B2B Startups</span>
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed pl-5">
                  If your model relies on high-ticket enterprise contracts, relationship building, or fundraising data rooms, HubSpot is unmatched for deal stage tracking, corporate emails logging, and pipeline attribution.
                </p>
              </div>

              <div className="space-y-1.5 font-sans">
                <h4 className="text-xs text-white font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>The Lean Alternative: Tally + Make</span>
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed pl-5">
                  For rapid market validations, bypass deep CRM configurations. Stand up a form with <strong>Tally.so</strong> and link it via <strong>Make.com</strong> straight to Google Sheets or Slack to action leads with 0 lines of custom code.
                </p>
              </div>

              <div className="space-y-1.5 font-sans">
                <h4 className="text-xs text-white font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>De-Risking GCC Google Ads Budgets</span>
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed pl-5">
                  GCC performance clicks are expensive due to high regional purchasing power. <strong>Never</strong> target broad keywords. Use ultra-focused high-intent phrase mapping, and pass feedback conversion loops straight from your database to train Gads algorithms.
                </p>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f] pt-4 flex justify-between items-center text-xs">
              <span className="text-zinc-500">MarTech Version: 1.0.4</span>
              <a 
                href="https://developers.hubspot.com/" 
                target="_blank" 
                rel="noreferrer"
                className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-1"
              >
                <span>HubSpot Doc Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
