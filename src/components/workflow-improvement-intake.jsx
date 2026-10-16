import { useState } from "react";

const sections = [
  {
    id: "overview",
    title: "01 — Process Overview",
    icon: "◈",
    color: "#2D6A4F",
    fields: [
      { id: "org_name", label: "Organization Name", type: "text", placeholder: "e.g., Greenfield Community Center" },
      { id: "process_name", label: "Name of the Process / Workflow", type: "text", placeholder: "e.g., Monthly Donor Reporting, Volunteer Onboarding" },
      { id: "process_owner", label: "Who owns or manages this process?", type: "text", placeholder: "e.g., Development Director, Operations Manager" },
      { id: "departments", label: "Which teams or departments are involved?", type: "text", placeholder: "e.g., Finance, Programs, Volunteer Coordination" },
      { id: "frequency", label: "How often does this process run?", type: "select", options: ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annually", "Ad hoc / on-demand"] },
      { id: "duration", label: "How long does one full cycle of this process typically take?", type: "text", placeholder: "e.g., 3 days, 2 hours, 1 week" },
      { id: "summary", label: "Describe the process in 2–4 sentences. What is its purpose, and what does it accomplish?", type: "textarea", placeholder: "e.g., Each month we compile program data from staff, reconcile it with our donor database, and generate a report for our board and funders..." },
    ]
  },
  {
    id: "current_state",
    title: "02 — Current Workflow Steps",
    icon: "◎",
    color: "#1B4332",
    fields: [
      { id: "steps", label: "List the key steps of the current workflow in order. Be as specific as possible.", type: "textarea", placeholder: "Step 1: Program staff submit data via email each month\nStep 2: Operations manager compiles data manually in Excel\nStep 3: Finance reconciles numbers with QuickBooks\nStep 4: Draft report is reviewed by Executive Director\nStep 5: Final report is emailed to board and funders" },
      { id: "tools", label: "What tools, systems, or software are currently used? (List all, even informal ones like email or spreadsheets)", type: "textarea", placeholder: "e.g., Google Sheets, Salesforce, QuickBooks, email, paper forms, Dropbox..." },
      { id: "manual_steps", label: "Which steps require significant manual work or human intervention?", type: "textarea", placeholder: "e.g., Data is manually copy-pasted from 6 different spreadsheets into a master sheet..." },
      { id: "handoffs", label: "Where does work get handed off between people or teams? Who passes what to whom?", type: "textarea", placeholder: "e.g., Staff email data to the manager → manager sends draft to ED → ED sends to finance for sign-off..." },
    ]
  },
  {
    id: "pain_points",
    title: "03 — Pain Points & Bottlenecks",
    icon: "◉",
    color: "#40916C",
    fields: [
      { id: "biggest_pain", label: "What is the single biggest frustration with this process today?", type: "textarea", placeholder: "e.g., We spend 8+ hours manually compiling data that should be automatic. Errors happen constantly and we often miss the deadline..." },
      { id: "bottlenecks", label: "Where does work get stuck or slow down? What causes delays?", type: "textarea", placeholder: "e.g., Waiting for staff to submit their data, finance takes 3 days to reconcile..." },
      { id: "errors", label: "Where do errors, inconsistencies, or quality issues occur most often?", type: "textarea", placeholder: "e.g., Data entry mistakes when copying between spreadsheets, formatting inconsistencies across staff submissions..." },
      { id: "time_waste", label: "Roughly how many person-hours per cycle are spent on this process? How much of that feels wasteful?", type: "text", placeholder: "e.g., ~12 hours total; at least 6 of those feel avoidable" },
      { id: "workarounds", label: "Are there any workarounds, patches, or informal fixes people have invented to cope?", type: "textarea", placeholder: "e.g., One staff member maintains a personal cheat sheet. We have an unwritten rule about never editing the master file directly..." },
      { id: "complaints", label: "What do staff or stakeholders complain about most regarding this process?", type: "textarea", placeholder: "e.g., Staff feel the process is unclear, managers feel they're always chasing people for information..." },
    ]
  },
  {
    id: "inputs_outputs",
    title: "04 — Inputs, Outputs & Data",
    icon: "⬡",
    color: "#52B788",
    fields: [
      { id: "inputs", label: "What goes INTO this process? List all data sources, documents, forms, or approvals needed to start.", type: "textarea", placeholder: "e.g., Program attendance data from staff, donor records from Salesforce, prior month financials from QuickBooks, board roster..." },
      { id: "outputs", label: "What comes OUT of this process? List all deliverables, reports, records, or notifications produced.", type: "textarea", placeholder: "e.g., Monthly board report (PDF), updated donor database, grant compliance spreadsheet, email to funders..." },
      { id: "data_sensitivity", label: "Does this process involve sensitive data? (donor PII, financial records, client information, etc.)", type: "select", options: ["No sensitive data", "Some sensitive data (donor/member info)", "Financial/payment data", "Client or beneficiary data", "Multiple types of sensitive data"] },
      { id: "data_volume", label: "What's the approximate volume of records or transactions involved per cycle?", type: "text", placeholder: "e.g., ~200 donor records, 6 program reports, 40 volunteer entries" },
      { id: "external_parties", label: "Are any external parties involved? (vendors, funders, volunteers, clients, government agencies)", type: "textarea", placeholder: "e.g., We submit a compliance report to our city funder; volunteers submit hours through a third-party portal..." },
    ]
  },
  {
    id: "success",
    title: "05 — What Success Looks Like",
    icon: "◆",
    color: "#74C69D",
    fields: [
      { id: "ideal_outcome", label: "Describe your ideal version of this process. What would 'fixed' look like in plain terms?", type: "textarea", placeholder: "e.g., Data flows automatically from staff submissions into a single dashboard. Reports are generated with one click. No chasing people. No manual data entry. Reports go out on time every month..." },
      { id: "time_goal", label: "How much time should this process take per cycle in the ideal state?", type: "text", placeholder: "e.g., Under 2 hours total, mostly automated" },
      { id: "metrics", label: "How would you measure success? What does 'better' look like concretely?", type: "textarea", placeholder: "e.g., Report delivered by the 5th of each month (currently delivered by the 15th), zero data entry errors, staff satisfaction survey improves..." },
      { id: "priority_improvements", label: "If you could only fix one or two things, what would matter most?", type: "textarea", placeholder: "e.g., Eliminating manual data compilation is #1. Reducing approval back-and-forth is #2..." },
      { id: "quick_wins", label: "Are there any improvements that feel simple or obviously fixable right now?", type: "textarea", placeholder: "e.g., We could create a standard submission form so staff stop sending unformatted emails..." },
    ]
  },
  {
    id: "constraints",
    title: "06 — Constraints & Context",
    icon: "⬟",
    color: "#95D5B2",
    fields: [
      { id: "budget", label: "Is there a budget for tools or solutions?", type: "select", options: ["No budget available", "Small budget ($0–$500/yr)", "Moderate budget ($500–$2,000/yr)", "Larger budget ($2,000+/yr)", "Unsure / TBD"] },
      { id: "tech_comfort", label: "What's the overall technical comfort level of the people involved in this process?", type: "select", options: ["Low — prefer simple, familiar tools", "Medium — comfortable learning new software", "High — open to technical solutions", "Mixed across the team"] },
      { id: "existing_systems", label: "What existing tools or systems must any solution integrate with or respect?", type: "textarea", placeholder: "e.g., We're locked into Salesforce for CRM. Our board uses Google Workspace. We can't add new software without IT approval..." },
      { id: "timeline", label: "Is there a timeline or urgency for this improvement?", type: "text", placeholder: "e.g., Need something in place before Q4 reporting season (October)" },
      { id: "change_resistance", label: "Are there any staff, cultural, or organizational factors that could affect adoption of a new approach?", type: "textarea", placeholder: "e.g., One key staff member is resistant to change. Leadership has tried to fix this before without success. Team is overwhelmed and capacity is tight..." },
      { id: "tried_before", label: "Has anything been tried before to improve this process? What happened?", type: "textarea", placeholder: "e.g., We tried using Airtable in 2022 but it didn't stick because nobody was trained on it and the champion left the organization..." },
      { id: "other_notes", label: "Anything else Claude should know before recommending a solution?", type: "textarea", placeholder: "e.g., We're a small shop with 4 staff. We're in the middle of a leadership transition. Our fiscal year ends June 30th..." },
    ]
  }
];

const fieldTypes = {
  text: ({ field, value, onChange }) => (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "6px",
        border: "1.5px solid #d1fae5", background: "#f0fdf4",
        fontSize: "14px", color: "#1a2e1a", outline: "none",
        fontFamily: "inherit", boxSizing: "border-box",
        transition: "border-color 0.2s"
      }}
      onFocus={e => e.target.style.borderColor = "#40916C"}
      onBlur={e => e.target.style.borderColor = "#d1fae5"}
    />
  ),
  textarea: ({ field, value, onChange }) => (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={4}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "6px",
        border: "1.5px solid #d1fae5", background: "#f0fdf4",
        fontSize: "14px", color: "#1a2e1a", outline: "none",
        fontFamily: "inherit", boxSizing: "border-box", resize: "vertical",
        lineHeight: "1.6", transition: "border-color 0.2s"
      }}
      onFocus={e => e.target.style.borderColor = "#40916C"}
      onBlur={e => e.target.style.borderColor = "#d1fae5"}
    />
  ),
  select: ({ field, value, onChange }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "6px",
        border: "1.5px solid #d1fae5", background: "#f0fdf4",
        fontSize: "14px", color: value ? "#1a2e1a" : "#6b7280", outline: "none",
        fontFamily: "inherit", boxSizing: "border-box", cursor: "pointer"
      }}
    >
      <option value="">— Select an option —</option>
      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
};

function exportToText(responses) {
  let out = `NONPROFIT WORKFLOW IMPROVEMENT INTAKE\n${"=".repeat(50)}\n\n`;
  out += `Completed: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}\n\n`;
  sections.forEach(sec => {
    out += `${sec.title}\n${"-".repeat(40)}\n`;
    sec.fields.forEach(f => {
      const val = responses[f.id] || "(not answered)";
      out += `\n${f.label}\n→ ${val}\n`;
    });
    out += "\n";
  });
  out += `${"=".repeat(50)}\nHOW TO USE THIS WITH CLAUDE\n${"=".repeat(50)}\n\n`;
  out += `Copy everything above this line and paste it into a new Claude conversation with this prompt:\n\n`;
  out += `"I've completed a workflow improvement intake form for my nonprofit. Based on everything below, please analyze our current process, identify the most impactful opportunities for improvement, and recommend a practical solution with specific next steps we can realistically implement. Consider our constraints carefully.\n\n[PASTE YOUR COMPLETED FORM HERE]"\n`;
  return out;
}

export default function App() {
  const [responses, setResponses] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [exported, setExported] = useState(false);

  const set = (id, val) => setResponses(r => ({ ...r, [id]: val }));

  const completionCount = Object.values(responses).filter(v => v && v.trim()).length;
  const totalFields = sections.reduce((sum, s) => sum + s.fields.length, 0);
  const pct = Math.round((completionCount / totalFields) * 100);

  const handleExport = () => {
    const text = exportToText(responses);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow-improvement-intake.txt";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const sec = sections[activeSection];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fffe", fontFamily: "'Georgia', serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#1B4332", minHeight: "100vh", padding: "32px 0", flexShrink: 0, position: "sticky", top: 0, alignSelf: "flex-start", height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#74C69D", fontFamily: "monospace", marginBottom: "6px" }}>NONPROFIT</div>
          <div style={{ fontSize: "16px", color: "#fff", fontWeight: "bold", lineHeight: "1.3" }}>Workflow Intake</div>
        </div>

        <div style={{ padding: "16px 20px 8px" }}>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginBottom: "6px" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#74C69D", borderRadius: "2px", transition: "width 0.4s" }} />
          </div>
          <div style={{ fontSize: "11px", color: "#74C69D", fontFamily: "monospace" }}>{pct}% complete</div>
        </div>

        <nav style={{ padding: "8px 0" }}>
          {sections.map((s, i) => {
            const filled = s.fields.filter(f => responses[f.id]?.trim()).length;
            return (
              <button key={s.id} onClick={() => setActiveSection(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 20px", background: activeSection === i ? "rgba(116,198,157,0.15)" : "transparent",
                border: "none", borderLeft: activeSection === i ? "3px solid #74C69D" : "3px solid transparent",
                cursor: "pointer", transition: "all 0.2s"
              }}>
                <div style={{ fontSize: "10px", color: s.color, fontFamily: "monospace", marginBottom: "2px" }}>{s.icon} {filled}/{s.fields.length}</div>
                <div style={{ fontSize: "12px", color: activeSection === i ? "#fff" : "rgba(255,255,255,0.6)", lineHeight: "1.3" }}>
                  {s.title.split("—")[1]?.trim()}
                </div>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "20px", marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={handleExport} style={{
            width: "100%", padding: "10px", background: exported ? "#52B788" : "#40916C",
            color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px", transition: "background 0.3s"
          }}>
            {exported ? "✓ Downloaded!" : "↓ Export File"}
          </button>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "6px", lineHeight: "1.4", textAlign: "center" }}>
            Download to share with Claude
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", maxWidth: "720px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#40916C", fontFamily: "monospace", marginBottom: "8px" }}>
            {sec.icon} SECTION {activeSection + 1} OF {sections.length}
          </div>
          <h1 style={{ fontSize: "28px", color: "#1B4332", margin: "0 0 8px", fontWeight: "normal" }}>
            {sec.title.split("—")[1]?.trim()}
          </h1>
          <div style={{ height: "2px", width: "48px", background: sec.color, borderRadius: "1px" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sec.fields.map(field => {
            const Component = fieldTypes[field.type];
            return (
              <div key={field.id}>
                <label style={{ display: "block", fontSize: "14px", color: "#2D3748", marginBottom: "8px", lineHeight: "1.5", fontFamily: "Georgia, serif" }}>
                  {field.label}
                </label>
                <Component field={field} value={responses[field.id] || ""} onChange={v => set(field.id, v)} />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #d1fae5" }}>
          <button
            onClick={() => setActiveSection(i => Math.max(0, i - 1))}
            disabled={activeSection === 0}
            style={{
              padding: "10px 20px", background: "transparent", border: "1.5px solid #40916C",
              borderRadius: "6px", color: "#40916C", cursor: activeSection === 0 ? "default" : "pointer",
              opacity: activeSection === 0 ? 0.3 : 1, fontSize: "13px", fontFamily: "inherit"
            }}
          >← Previous</button>

          {activeSection < sections.length - 1 ? (
            <button onClick={() => setActiveSection(i => i + 1)} style={{
              padding: "10px 24px", background: "#2D6A4F", border: "none",
              borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "13px", fontFamily: "inherit"
            }}>Next Section →</button>
          ) : (
            <button onClick={handleExport} style={{
              padding: "10px 24px", background: "#1B4332", border: "none",
              borderRadius: "6px", color: "#74C69D", cursor: "pointer", fontSize: "13px",
              fontWeight: "bold", fontFamily: "inherit"
            }}>↓ Export Completed File</button>
          )}
        </div>

        {/* Instructions Panel (last section) */}
        {activeSection === sections.length - 1 && (
          <div style={{ marginTop: "40px", background: "#1B4332", borderRadius: "12px", padding: "28px", color: "#d1fae5" }}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#74C69D", fontFamily: "monospace", marginBottom: "12px" }}>WHAT TO DO NEXT</div>
            <h3 style={{ color: "#fff", margin: "0 0 16px", fontSize: "18px", fontWeight: "normal" }}>How to use this with Claude</h3>
            <ol style={{ margin: 0, paddingLeft: "20px", lineHeight: "2", fontSize: "14px" }}>
              <li>Click <strong style={{ color: "#74C69D" }}>Export File</strong> to download your completed intake as a <code>.txt</code> file.</li>
              <li>Open a new conversation with Claude at <strong style={{ color: "#74C69D" }}>claude.ai</strong>.</li>
              <li>Upload the <code>.txt</code> file or copy-paste its contents.</li>
              <li>Use the prompt below to get your solution:</li>
            </ol>
            <div style={{ marginTop: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid #74C69D" }}>
              <div style={{ fontSize: "11px", color: "#74C69D", fontFamily: "monospace", marginBottom: "8px" }}>SUGGESTED PROMPT</div>
              <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", fontStyle: "italic", color: "#d1fae5" }}>
                "I've completed a workflow improvement intake form for my nonprofit. Based on everything in this document, please analyze our current process, identify the highest-impact improvement opportunities, and recommend a practical solution with specific, actionable next steps we can realistically implement given our constraints."
              </p>
            </div>
            <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(209,250,229,0.7)", lineHeight: "1.6" }}>
              The more completely you fill out each section, the more targeted and useful Claude's recommendations will be. You don't need to be perfect — Claude can work with partial information and ask follow-up questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
