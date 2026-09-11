import nplogo from './np-logo.png';
import React, { useState, useRef, useEffect } from "react";
import { CCU_POLICY_REFERENCE } from "./ccuPolicyReference";

// ─── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b0c15;--s1:#111220;--s2:#191a2e;--s3:#20213a;
  --b1:#252645;--b2:#32335c;
  --t1:#e2e4f2;--t2:#8b8db8;--t3:#4e5075;
  --pr:#5b7fff;--pr-dim:rgba(91,127,255,.12);--pr-b:rgba(91,127,255,.32);
  --am:#f59e0b;--rd:#ef4444;--gr:#22c55e;--or:#f97316;
}
body{background:var(--bg);color:var(--t1);font-family:'Calibri',sans-serif}
input,select,textarea,button{font-family:'Calibri',sans-serif}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes slidein{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
.app{min-height:100vh;background:var(--bg);background-image:
  radial-gradient(ellipse 60% 40% at 10% 15%,rgba(91,127,255,.05) 0%,transparent 70%),
  radial-gradient(ellipse 50% 60% at 85% 80%,rgba(168,85,247,.04) 0%,transparent 70%)}
.hdr{position:fixed;top:0;left:0;right:0;z-index:100;height:54px;
  background:rgba(11,12,21,.9);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--b1);padding:0 20px;
  display:flex;align-items:center;justify-content:space-between;gap:12px}
.logo{display:flex;align-items:center;gap:28px;cursor:pointer;
  font-family:'Calibri',sans-serif;font-size:16px;font-weight:700;
  letter-spacing:.1em;color:var(--t1);flex-shrink:0}
.logo-ic{width:28px;height:28px;display:flex;align-items:center;justify-content:center}
.badge{font-size:8px;font-weight:700;letter-spacing:.08em;
  padding:2px 7px;border-radius:3px;text-transform:uppercase;white-space:nowrap}
.badge-green{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:var(--gr)}
.badge-amber{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);color:var(--am)}
.badge-blue{background:var(--pr-dim);border:1px solid var(--pr-b);color:var(--pr)}
.badge-red{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:var(--rd)}
.main{padding-top:54px;min-height:100vh}
.page{max-width:1100px;margin:0 auto;padding:32px 20px;animation:fadein .25s ease}
.back{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);
  cursor:pointer;background:none;border:none;padding:0;margin-bottom:22px;transition:color .15s}
.back:hover{color:var(--t1)}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:22px;margin-bottom:16px}
.card:hover{border-color:var(--b2)}
.card-t{font-size:17px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.lbl{font-size:11px;font-weight:600;letter-spacing:.07em;color:var(--t2);
  text-transform:uppercase;margin-bottom:7px;display:block}
.fg{margin-bottom:16px}
.inp,.sel,.ta{width:100%;background:var(--s2);border:1px solid var(--b1);
  border-radius:8px;color:var(--t1);font-size:14px;outline:none;transition:border-color .15s}
.inp{padding:10px 13px}.sel{padding:10px 13px}.ta{padding:11px 13px;resize:vertical;line-height:1.6}
.inp:focus,.sel:focus,.ta:focus{border-color:var(--pr);box-shadow:0 0 0 3px rgba(91,127,255,.1)}
.btn{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:8px;
  font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:none;outline:none}
.btn-p{background:var(--pr);color:#fff}.btn-p:hover{background:#4a6ef0;transform:translateY(-1px)}
.btn-p:disabled{opacity:.45;cursor:not-allowed;transform:none}
.btn-g{background:transparent;color:var(--t2);border:1px solid var(--b1)}
.btn-g:hover{border-color:var(--b2);color:var(--t1)}
.btn-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
@media(max-width:700px){.grid2,.grid3{grid-template-columns:1fr}}
.tool-card{background:var(--s1);border:1px solid var(--b1);border-radius:12px;
  padding:22px;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;gap:10px}
.tool-card:hover{border-color:var(--pr);transform:translateY(-2px);box-shadow:0 8px 28px rgba(91,127,255,.12)}
.tool-ic{font-size:28px;margin-bottom:4px}
.tool-t{font-size:16px;font-weight:700;color:var(--t1)}
.tool-d{font-size:13px;color:var(--t2);line-height:1.5}
.sec{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--t2);margin-bottom:14px;display:flex;align-items:center;gap:7px}
.dvdr{height:1px;background:var(--b1);margin:20px 0}
.spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
.spin-blue{width:14px;height:14px;border:2px solid rgba(91,127,255,.3);
  border-top-color:var(--pr);border-radius:50%;animation:spin .7s linear infinite}

/* Chat */
.chat-wrap{display:flex;flex-direction:column;height:calc(100vh - 180px);max-height:700px}
.chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
.chat-msgs::-webkit-scrollbar{width:3px}
.chat-msgs::-webkit-scrollbar-thumb{background:var(--b1);border-radius:2px}
.msg{max-width:85%;padding:12px 15px;border-radius:10px;font-size:13px;line-height:1.6;animation:fadein .2s ease}
.msg.ai{background:var(--pr-dim);border:1px solid var(--pr-b);align-self:flex-start;border-radius:4px 10px 10px 10px}
.msg.user{background:var(--s3);border:1px solid var(--b2);align-self:flex-end;border-radius:10px 4px 10px 10px}
.msg-src{font-size:10px;font-weight:700;letter-spacing:.04em;margin-bottom:5px;text-transform:uppercase}
.msg-time{font-size:9px;color:var(--t3);margin-top:5px}
.chat-input{border-top:1px solid var(--b1);padding:14px;display:flex;gap:10px;align-items:flex-end}
.chat-input .ta{min-height:44px;max-height:120px;flex:1;margin:0}
.typing{display:flex;gap:5px;align-items:center;padding:12px 15px}
.typing span{width:6px;height:6px;border-radius:50%;background:var(--pr);animation:pulse .8s infinite}
.typing span:nth-child(2){animation-delay:.15s}
.typing span:nth-child(3){animation-delay:.3s}

/* Wizard */
.wiz-step{animation:fadein .2s ease}
.wiz-progress{display:flex;gap:6px;margin-bottom:22px;align-items:center}
.wiz-dot{width:8px;height:8px;border-radius:50%;background:var(--b2);transition:all .2s}
.wiz-dot.on{background:var(--pr);width:24px;border-radius:4px}
.wiz-dot.done{background:var(--gr)}
.choice-btn{width:100%;text-align:left;padding:14px 16px;background:var(--s2);
  border:1px solid var(--b1);border-radius:10px;color:var(--t1);font-size:14px;
  cursor:pointer;transition:all .15s;margin-bottom:9px;display:flex;align-items:center;gap:10px}
.choice-btn:hover{border-color:var(--pr);background:var(--pr-dim)}
.choice-btn.sel{border-color:var(--pr);background:var(--pr-dim);color:var(--t1)}
.result-box{border-radius:10px;padding:20px;margin-top:16px}
.result-box.high{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25)}
.result-box.medium{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25)}
.result-box.low{background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.25)}

/* Checklist */
.check-item{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;
  background:var(--s2);border:1px solid var(--b1);border-radius:8px;
  margin-bottom:8px;cursor:pointer;transition:all .15s}
.check-item:hover{border-color:var(--b2)}
.check-item.checked{border-color:var(--rd);background:rgba(239,68,68,.06)}
.check-box{width:18px;height:18px;border-radius:4px;border:1px solid var(--b2);
  flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;
  transition:all .15s;background:transparent}
.check-box.on{background:var(--rd);border-color:var(--rd)}
.check-label{font-size:13px;color:var(--t1);line-height:1.5}
.check-cat{font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t2);
  text-transform:uppercase;margin-top:3px}
.score-bar{height:8px;border-radius:4px;background:var(--s3);margin:10px 0;overflow:hidden}
.score-fill{height:100%;border-radius:4px;transition:width .4s ease}

/* Scenarios */
.scenario-card{background:var(--s2);border:1px solid var(--b1);border-radius:10px;
  padding:18px;margin-bottom:12px;cursor:pointer;transition:all .2s}
.scenario-card:hover{border-color:var(--pr);background:var(--s3)}
.scenario-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;
  font-weight:700;letter-spacing:.04em;margin-bottom:8px;text-transform:uppercase}

/* Policy */
.policy-item{background:var(--s2);border:1px solid var(--b1);border-radius:10px;
  padding:16px 18px;margin-bottom:10px;cursor:pointer;transition:all .15s}
.policy-item:hover{border-color:var(--b2)}
.policy-item.open{border-color:var(--pr)}
.policy-answer{font-size:13px;color:var(--t2);line-height:1.65;margin-top:12px;
  padding-top:12px;border-top:1px solid var(--b1)}

/* Welfare */
.welfare-card{background:var(--s1);border:1px solid var(--b1);border-radius:10px;
  padding:18px;display:flex;gap:14px;align-items:flex-start;margin-bottom:10px}
.welfare-ic{font-size:24px;flex-shrink:0;margin-top:2px}
.welfare-t{font-size:14px;font-weight:700;margin-bottom:4px}
.welfare-d{font-size:13px;color:var(--t2);line-height:1.5}
.welfare-link{font-size:12px;color:var(--pr);margin-top:6px;cursor:pointer}

/* Doc builder */
.doc-preview{background:var(--s2);border:1px solid var(--b1);border-radius:8px;
  padding:16px;font-size:13px;line-height:1.8;color:var(--t1);white-space:pre-wrap;
  max-height:320px;overflow-y:auto;margin-top:16px}
.doc-preview::-webkit-scrollbar{width:3px}
.doc-preview::-webkit-scrollbar-thumb{background:var(--b1)}

/* Stats */
.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
@media(max-width:550px){.stat-row{grid-template-columns:1fr 1fr}}
.stat{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:14px 16px}
.stat-v{font-size:32px;font-weight:700;line-height:1;margin-bottom:3px}
.stat-l{font-size:10px;letter-spacing:.06em;color:var(--t2);text-transform:uppercase;font-weight:600}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;animation:pulse 2s infinite;margin-right:5px}
`;

// ─── Data ──────────────────────────────────────────────────────────────────────

const INDICATORS = [
  { id: 1, cat: "Financial", text: "Unexplained improvement in lifestyle — new vehicle, holidays, property beyond apparent means" },
  { id: 2, cat: "Financial", text: "Known financial difficulties — debt, gambling, County Court Judgements" },
  { id: 3, cat: "Financial", text: "Frequent requests for overtime or secondary employment approval without clear explanation" },
  { id: 4, cat: "Associations", text: "Known or suspected association with organised crime group members or their families" },
  { id: 5, cat: "Associations", text: "Unexplained contact with suspects, persons of interest, or former offenders outside duties" },
  { id: 6, cat: "Associations", text: "Social media connections with known criminals or persons under investigation" },
  { id: 7, cat: "Behaviour", text: "Unexplained access to intelligence systems outside areas of responsibility" },
  { id: 8, cat: "Behaviour", text: "Providing advance warning to suspects — operational details leaked before execution" },
  { id: 9, cat: "Behaviour", text: "Reluctance to submit to supervisory oversight or unusual defensiveness about work" },
  { id: 10, cat: "Behaviour", text: "Pattern of arrests not proceeding — charges dropped, evidence lost, witnesses uncontactable" },
  { id: 11, cat: "Behaviour", text: "Unusual interest in particular investigations unrelated to role" },
  { id: 12, cat: "Behaviour", text: "Excessive use of force or complaints from the public — particularly in specific locations" },
  { id: 13, cat: "Personal", text: "Significant unexplained change in attitude, performance, or personality" },
  { id: 14, cat: "Personal", text: "Drug or alcohol misuse concerns" },
  { id: 15, cat: "Personal", text: "Relationship breakdown or significant personal stress that may create vulnerability" },
  { id: 16, cat: "Integrity", text: "Minor dishonesty in reports, expenses, or time recording" },
  { id: 17, cat: "Integrity", text: "Inappropriate handling of property — cash, drugs, or seized goods" },
  { id: 18, cat: "Integrity", text: "Failure to declare conflicts of interest — business interests, relationships with subjects" },
];

const SCENARIOS = [
  {
    id: 1, title: "The Unusual Arrest Pattern",
    difficulty: "Intermediate", category: "Corruption",
    tag_color: "rgba(239,68,68,.2)", tag_text: "#ef4444",
    situation: "PC Jones has made 14 drugs arrests in the past 3 months, all in the same street. However, 11 of them have not resulted in charges. The CPS has noted that evidence is routinely 'insufficient'. Jones always volunteers to work the same area and has recently bought a new car.",
    options: [
      { text: "It's a performance issue — address it through supervision and set targets", outcome: "incorrect", feedback: "This misses significant corruption indicators. The pattern of arrests not proceeding, the geographic focus, and the lifestyle change are classic early warning signs. This requires a different response." },
      { text: "Speak to Jones informally — ask about the low charge rates", outcome: "risky", feedback: "Approaching Jones directly at this stage risks tipping off a potentially corrupt officer and could compromise any subsequent investigation. Intelligence should be gathered before any confrontation." },
      { text: "Document your observations and refer to CCU without speaking to Jones", outcome: "correct", feedback: "Correct. The combination of factors — arrest patterns, no charges, geographic focus, lifestyle change — are sufficient to refer to CCU. Do not confront Jones. Document everything and make a confidential referral." },
      { text: "Wait and see — gather more evidence before doing anything", outcome: "risky", feedback: "Delay creates risk. If corruption is occurring, evidence may be destroyed and further harm caused. A CCU referral does not require certainty — it requires reasonable grounds for concern." },
    ]
  },
  {
    id: 2, title: "The Social Media Connection",
    difficulty: "Foundation", category: "Associations",
    tag_color: "rgba(249,115,22,.2)", tag_text: "#f97316",
    situation: "During routine social media checks for a firearms operation, you notice that one of your officers — DC Williams — is connected on Facebook to the brother of the primary target. Williams has not declared this. When you mention it casually, Williams says 'Yeah I know him from school, it's nothing.'",
    options: [
      { text: "Accept the explanation — it's a coincidence and school friendships happen", outcome: "incorrect", feedback: "Undeclared associations with connected persons are a serious integrity matter regardless of the explanation. The association needed to be declared by Williams proactively. Accept the explanation only after proper process." },
      { text: "Direct Williams to complete a conflict of interest declaration and remove from the operation", outcome: "correct", feedback: "Correct. Williams must be removed from the operation immediately to protect integrity. A formal conflict of interest declaration must be completed. Depending on the nature of the association, a CCU referral may also be appropriate." },
      { text: "Refer immediately to CCU and suspend Williams from duty", outcome: "risky", feedback: "Suspension at this stage would be disproportionate without further assessment. Removing from the operation and obtaining a formal declaration is the right first step. CCU referral may follow depending on further information." },
      { text: "Brief the rest of the team but take no formal action", outcome: "incorrect", feedback: "Briefing the team without formal action creates integrity risk for the operation and for you as supervisor. This requires a formal process, not informal management." },
    ]
  },
  {
    id: 3, title: "The Pressured Supervisor",
    difficulty: "Advanced", category: "Misconduct",
    tag_color: "rgba(168,85,247,.2)", tag_text: "#a855f7",
    situation: "A local businessman contacts you directly and asks you to 'have a word' with one of your officers who has been 'harassing' his business with inspections. He mentions that your officer 'owes him a favour' and that he hopes you can 'sort it out quietly'. He implies he has friends on the local authority licensing committee.",
    options: [
      { text: "Tell the businessman this is inappropriate and end the call — no further action", outcome: "risky", feedback: "While ending the call is right, no further action is insufficient. The approach itself — a direct contact implying corruption and making implicit threats — must be documented and referred." },
      { text: "Investigate whether your officer has a relationship with the businessman before deciding", outcome: "risky", feedback: "You should not conduct your own investigation into potential corruption. This risks tipping off the officer, contaminating evidence, and places you in a difficult position. Refer to CCU." },
      { text: "Document the conversation in full and refer both the approach and your officer to CCU", outcome: "correct", feedback: "Correct. The businessman's approach is itself a corrupt approach to a supervisor. Your officer's potential relationship with him is a separate concern. Both require CCU referral. Document the conversation as contemporaneously as possible." },
      { text: "Comply — speak to the officer informally about the inspections to reduce the risk", outcome: "incorrect", feedback: "Complying with this request would make you complicit in misconduct. This is precisely the situation CCU exist to address. Refer immediately." },
    ]
  },
  {
    id: 4, title: "The Anonymous Tip",
    difficulty: "Foundation", category: "Process",
    tag_color: "rgba(34,197,94,.2)", tag_text: "#22c55e",
    situation: "You receive an anonymous note in your pigeonhole alleging that Sgt Davis has been accepting cash from a local taxi firm in exchange for not enforcing licensing conditions. The note includes specific dates and amounts. Davis is a well-liked officer with 18 years service and no previous complaints.",
    options: [
      { text: "Speak to Davis — give them a chance to explain before escalating", outcome: "incorrect", feedback: "Never confront a potentially corrupt officer with the allegation before CCU are involved. You could destroy evidence, compromise informants, and tip off the subject." },
      { text: "Disregard it — anonymous allegations without evidence are unreliable", outcome: "incorrect", feedback: "Anonymous allegations with specific detail — dates, amounts — carry significant weight. Length of service and lack of prior complaints do not reduce the obligation to refer. Refer to CCU." },
      { text: "Refer to CCU with the original note — document how and when you received it", outcome: "correct", feedback: "Correct. Preserve the original note as potential evidence. Document exactly when and how you found it. Refer to CCU who are trained to assess anonymous intelligence and take appropriate action." },
      { text: "Pass it to Davis's line manager to handle", outcome: "incorrect", feedback: "The line manager faces the same dilemma you do, and may have a relationship with Davis that compromises the referral. CCU are the right destination — not line management." },
    ]
  },
];

const REFERRAL_QUESTIONS = [
  {
    id: 1, question: "What best describes what you have observed or been told?",
    options: [
      { text: "Potential criminal conduct — bribery, fraud, theft, drug involvement", weight: 5 },
      { text: "Serious misconduct — evidence tampering, unlawful disclosure of intelligence", weight: 4 },
      { text: "Association with known criminals or OCG members", weight: 4 },
      { text: "Unexplained lifestyle changes or financial concerns", weight: 3 },
      { text: "Inappropriate behaviour or attitude — not clearly criminal", weight: 2 },
      { text: "Minor policy breach or performance concern", weight: 1 },
    ]
  },
  {
    id: 2, question: "How did you become aware of this concern?",
    options: [
      { text: "I directly witnessed the conduct", weight: 5 },
      { text: "I received credible information from a reliable source", weight: 4 },
      { text: "An anonymous report or allegation was made", weight: 3 },
      { text: "I have a pattern of observations over time", weight: 4 },
      { text: "Rumour or general gossip within the team", weight: 1 },
    ]
  },
  {
    id: 3, question: "Is there an ongoing risk if no action is taken now?",
    options: [
      { text: "Yes — a current operation or investigation could be compromised", weight: 5 },
      { text: "Yes — there is an ongoing pattern of behaviour causing harm", weight: 4 },
      { text: "Possibly — the behaviour may continue but immediate harm is not clear", weight: 3 },
      { text: "No — this appears to be a historical or isolated incident", weight: 1 },
    ]
  },
  {
    id: 4, question: "Have you already spoken to the officer about your concerns?",
    options: [
      { text: "No — I have not raised it with the officer", weight: 0 },
      { text: "No — and I believe doing so would compromise any investigation", weight: 5 },
      { text: "Yes — I raised a performance concern but not the integrity issue", weight: 2 },
      { text: "Yes — I spoke to them directly about the integrity concern", weight: -2 },
    ]
  },
];

const POLICY_FAQ = [
  { q: "What is the difference between CCU and Professional Standards Department?", a: "The Counter Corruption Unit (CCU) focuses specifically on corruption — criminal conduct by officers, serious integrity breaches, and associations with organised crime. Professional Standards Department (PSD) has a broader remit covering all misconduct, complaints from the public, and performance matters. In practice, the two work closely together. If you are unsure which to refer to, contact CCU first — they will advise or direct you appropriately. It is always better to over-refer than to under-refer." },
  { q: "Do I have a legal obligation to report corruption concerns?", a: "Yes. All police officers have a professional duty under the Standards of Professional Behaviour to report conduct by colleagues that falls below the required standard. Failure to report corruption concerns you are aware of can itself constitute gross misconduct. This duty applies regardless of rank, how long you have known the officer, or how serious you think the concern is. If in doubt, refer." },
  { q: "What happens after I make a CCU referral?", a: "CCU will assess the referral and decide on the appropriate action. This may include a preliminary enquiry, a formal investigation, or, in serious cases, an arrest. You may not be told the outcome of any investigation — this protects the integrity of the process. You will not normally be required to give evidence unless the matter proceeds to a formal hearing, and even then your role as referrer can often be managed to protect your position." },
  { q: "Can I refer anonymously through Shield Report?", a: "Yes. Shield Report is available for anonymous reporting and is accessible at the Shield Report URL. You will receive an anonymous token that allows you to check for CCU responses and continue the conversation anonymously. This is available to both the public and police personnel. You do not need to identify yourself to use it." },
  { q: "What is 'duty to cooperate' and does it apply to supervisors?", a: "The duty to cooperate requires officers to assist with professional standards investigations when asked. As a supervisor this includes providing records, statements, and access to information relevant to an investigation into one of your team. You should not obstruct, delay, or seek to influence an investigation. If you believe you are being asked to do something improper during an investigation, seek advice from your Police Federation representative." },
  { q: "How do I challenge unethical behaviour without it becoming confrontational?", a: "Use the 'challenge model': describe the specific behaviour you observed, explain why it is a concern using policy or values language, ask for the officer's account, and be clear about the expected standard going forward. Avoid personal or emotional language. Document the conversation immediately afterwards. If the officer's response suggests a more serious concern — for example they are dismissive, threatening, or claim the behaviour is normal — consider whether a CCU referral is now appropriate." },
  { q: "My officer has significant debt problems. Is this a corruption risk?", a: "Financial vulnerability is a recognised corruption risk factor. Officers in financial difficulty may be targeted by OCGs offering cash for information or other corrupt assistance. Your obligation is not to judge or penalise the officer for their financial situation, but to be aware of it as a risk and to refer any change in behaviour or lifestyle that suggests the vulnerability may have been exploited. Encourage the officer to use force welfare services and document that you have done so." },
  { q: "What is 'noble cause corruption' and how do I recognise it?", a: "Noble cause corruption occurs when an officer commits misconduct believing they are serving a greater good — for example, planting evidence on a suspect they genuinely believe is guilty, or using excessive force to 'send a message'. It is still corruption and still misconduct, regardless of the officer's motivation. Signs include officers who are dismissive of procedural requirements, who express strong personal views about particular offenders, or who produce evidence that seems too convenient. Refer to CCU in the same way as any other corruption concern." },
  { q: "An officer has told me they received a threat from a criminal contact. What do I do?", a: "This requires immediate action. The officer's safety is the first priority — ensure they are aware of force personal safety and threat management procedures. The threat itself is intelligence that must be reported to CCU immediately, as it may indicate an existing criminal association or an attempt to corrupt the officer. Do not treat this as solely a welfare matter — it is both a welfare and an integrity concern requiring CCU involvement." },
  { q: "How do I support my team's wellbeing after making a CCU referral about a colleague?", a: "A CCU referral about a team member is a significant event for the wider team. You cannot share details of the referral, but you can acknowledge that the team is going through a difficult period. Focus on the team's values and professionalism. Be alert to any officer who appears to be struggling and direct them to welfare support. If you are struggling yourself — and this is common, particularly where the subject is someone you know well — Police Care UK and occupational health are available to you too." },
];

const WELFARE = [
  { ic: "🛡️", title: "Police Care UK", desc: "Free, confidential wellbeing support for serving and retired officers and staff. Includes trauma support, counselling, and peer support.", link: "policecare.org.uk", phone: "0300 012 0700" },
  { ic: "🧠", title: "Force Occupational Health", desc: "Confidential support for physical and mental health concerns. Can provide referrals to counselling and other specialist services.", link: "Contact via HR", phone: "Contact your force HR" },
  { ic: "⚖️", title: "Police Federation", desc: "Welfare support, legal advice, and representation for officers facing professional standards processes or who are witnesses in investigations.", link: "polfed.org.uk", phone: "01772 864 200" },
  { ic: "📞", title: "Samaritans", desc: "24/7 confidential listening service for anyone experiencing distress or struggling to cope.", link: "samaritans.org", phone: "116 123" },
  { ic: "💼", title: "Force Legal Services", desc: "For supervisors who need guidance on their legal obligations in relation to a referral or investigation.", link: "Internal — contact via force directory", phone: "Internal" },
  { ic: "🔒", title: "Shield Report (Anonymous)", desc: "Submit concerns anonymously if you are not comfortable making a formal referral. Your identity is never recorded.", link: "ccu-app-ruby.vercel.app", phone: "Web only" },
];

// ─── Components ────────────────────────────────────────────────────────────────

const Header = ({ onHome }) => (
  <header className="hdr">
    <div className="logo" onClick={onHome}>
      <div className="logo-ic"><img src={nplogo} alt="NP Logo" style={{ height: 28, width: "auto" }} /></div>
      CCU SUPERVISOR TOOLKIT
      <span className="badge badge-amber">SUPERVISOR</span>
    </div>
    <div style={{ fontSize: 9, color: "var(--t3)", fontFamily: "'Calibri',sans-serif" }}>v1.0.0</div>
  </header>
);

// ─── Chatbot ──────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the CCU Supervisor Support Assistant — an expert advisor for police supervisors on counter-corruption, professional standards, and integrity matters in UK policing.

You assist supervisors with:
- Recognising early warning signs of corruption in their teams
- Deciding when and how to refer concerns to the Counter Corruption Unit (CCU)
- Challenging unethical behaviour in a professional and legally sound way
- Understanding their legal and professional obligations under the Standards of Professional Behaviour
- Navigating force policy on misconduct, integrity, and professional standards
- Welfare and support for themselves and their teams

Your approach:
- Be direct, practical, and professional — like a trusted senior colleague in professional standards
- Always prioritise anonymity protection and the integrity of any potential investigation
- Never advise a supervisor to confront a potentially corrupt officer directly before CCU involvement
- If a situation sounds urgent or involves immediate risk, direct the supervisor to contact CCU immediately
- Always recommend documentation of concerns
- Be supportive — supervisors in this position often feel isolated and conflicted

GROUNDING — read this before every answer that touches policy:
The reference material below is a curated summary of current PUBLIC national
guidance (College of Policing Vetting APP, Code of Ethics, IOPC guidance). When
a question falls within it, answer from it specifically — name the actual rule,
test or definition (e.g. the GIFT test, the policing-purpose definition, the
notifiable-associations criteria) rather than speaking in vague generalities.

${CCU_POLICY_REFERENCE}

Rules for using this material:
- Prefer the reference above over generic knowledge for anything it covers. Do
  not contradict it.
- The detailed Counter Corruption APP is restricted (OFFICIAL-SENSITIVE) and
  you have not seen it, and force-specific policy varies and is not covered
  here. If a question needs that level of detail — exact CCU grading
  thresholds, a specific force's forms or contacts, disciplinary process
  specifics — say plainly that this isn't something you can speak to
  specifically, and point them to their force's CCU/PSD or local intranet
  policy. Never invent a plausible-sounding specific to fill the gap.
- If a question is genuinely outside UK policing standards/integrity matters
  altogether, say you don't know rather than guessing.

Response style — HARD LIMITS, not a preference:
- 5 sentences maximum, OR up to 4 short bullet points — pick ONE of those
  two formats, never both in the same answer.
- Answer like you're speaking, not writing a memo: one direct answer to the
  actual question, not multiple angles on it.
- No headers, no bold section titles, no restating the question, no
  "practical steps" list bolted onto an "analysis" paragraph — that is two
  answers stitched together. Give one.
- No closing summary, no "worth noting", no softening wrap-up sentence.
- Name the specific rule/test (e.g. "the GIFT test") but do not explain
  every limb of it unless asked to — a named test plus the one-line
  application to their situation is usually enough.
- If they need more after that, they'll ask a follow-up — don't pre-empt it.
- Use plain English, minimal jargon.`;

const Chatbot = ({ onBack }) => {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant", content: "Hello. I'm your CCU Support Assistant — here to help you navigate corruption concerns, integrity matters, and difficult supervisory decisions.\n\nYou can ask me anything from 'I think one of my officers might be corrupt, what do I do?' to 'How do I challenge unethical behaviour without it escalating?'\n\nWhat's on your mind?",
      time: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text, time: new Date() };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = msgs.concat(userMsg).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/anthropic-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: history
        })
      });
      const d = await res.json();
      const reply = d.content?.find(b => b.type === "text")?.text || "I'm sorry, I couldn't process that. Please try again.";
      setMsgs(prev => [...prev, { role: "assistant", content: reply, time: new Date() }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment. For urgent concerns, contact CCU directly.", time: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const fmtTime = d => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const PROMPTS = [
    "I think one of my officers might be corrupt. What do I do first?",
    "How do I challenge unethical behaviour without it escalating?",
    "When is something serious enough to refer to CCU?",
    "What are the biggest corruption risks I should watch for?",
  ];

  return (
    <div className="page" style={{ maxWidth: 720 }}>
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{ fontSize: 26 }}>🤖</div>
        <div>
          <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800 }}>CCU Support Assistant</div>
          <div style={{ fontSize: 12, color: "var(--t2)" }}>AI-powered guidance on corruption, integrity, and challenging behaviour</div>
        </div>
        <span className="badge badge-green" style={{ marginLeft: "auto" }}>
          <span className="dot" style={{ background: "var(--gr)" }}></span>Online
        </span>
      </div>
      {msgs.length === 1 && (
        <div style={{ marginBottom: 14 }}>
          <div className="lbl">Suggested questions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {PROMPTS.map((p, i) => (
              <button key={i} className="btn btn-g" style={{ fontSize: 12, textAlign: "left", padding: "9px 13px", lineHeight: 1.4, height: "auto" }}
                onClick={() => { setInput(p); taRef.current?.focus(); }}>{p}</button>
            ))}
          </div>
        </div>
      )}
      <div className="card" style={{ padding: 0 }}>
        <div className="chat-wrap">
          <div className="chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === "assistant" ? "ai" : "user"}`}>
                <div className="msg-src" style={{ color: m.role === "assistant" ? "var(--pr)" : "var(--am)" }}>
                  {m.role === "assistant" ? "🔵 CCU Assistant" : "👤 You"}
                </div>
                {m.content.split("\n").map((line, li) => (
                  <div key={li} style={{ marginBottom: line === "" ? 6 : 0 }}>{line}</div>
                ))}
                <div className="msg-time">{fmtTime(m.time)}</div>
              </div>
            ))}
            {loading && (
              <div className="msg ai">
                <div className="msg-src" style={{ color: "var(--pr)" }}>🔵 CCU Assistant</div>
                <div className="typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input">
            <textarea ref={taRef} className="ta" placeholder="Ask anything about corruption, integrity, or challenging behaviour..." value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button className="btn btn-p" onClick={send} disabled={!input.trim() || loading} style={{ padding: "10px 16px", flexShrink: 0 }}>
              {loading ? <div className="spin" /> : "Send"}
            </button>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--t3)", textAlign: "center", marginTop: 10 }}>
        This assistant provides general guidance only. For urgent concerns, contact CCU directly. Do not confront a potentially corrupt officer before seeking CCU advice.
      </div>
    </div>
  );
};

// ─── Indicators Checklist ─────────────────────────────────────────────────────

const Checklist = ({ onBack }) => {
  const [checked, setChecked] = useState([]);
  const [officer, setOfficer] = useState("");
  const toggle = id => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const score = checked.length;
  const level = score >= 6 ? "high" : score >= 3 ? "medium" : "low";
  const pct = Math.min(100, (score / 18) * 100);
  const fillColor = level === "high" ? "#ef4444" : level === "medium" ? "#f59e0b" : "#22c55e";
  const cats = [...new Set(INDICATORS.map(i => i.cat))];

  const copyReport = () => {
    const items = INDICATORS.filter(i => checked.includes(i.id));
    const text = `CCU CORRUPTION CONCERN — INDICATOR ASSESSMENT\n\nOfficer: ${officer || "[Not specified]"}\nDate: ${new Date().toLocaleDateString("en-GB")}\nIndicators Flagged: ${score} of 18\nRisk Level: ${level.toUpperCase()}\n\nFLAGGED INDICATORS:\n${items.map(i => `- [${i.cat}] ${i.text}`).join("\n")}\n\nPrepared using CCU Supervisor Toolkit`;
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>⚠️ Corruption Indicators Checklist</div>
      <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 22 }}>Tick any indicators you have observed. This assessment is confidential and not automatically submitted anywhere.</div>

      <div className="card">
        <div className="fg">
          <label className="lbl">Officer reference (optional — for your records only)</label>
          <input className="inp" placeholder="e.g. collar number or role — not stored anywhere" value={officer} onChange={e => setOfficer(e.target.value)} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--t2)", marginBottom: 5 }}>
              <span>{score} indicator{score !== 1 ? "s" : ""} flagged</span>
              <span style={{ color: fillColor, fontWeight: 700, textTransform: "uppercase" }}>{level} concern</span>
            </div>
            <div className="score-bar"><div className="score-fill" style={{ width: `${pct}%`, background: fillColor }} /></div>
          </div>
        </div>
      </div>

      {score > 0 && (
        <div className={`result-box ${level}`} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
            {level === "high" ? "🔴 Recommend CCU Referral" : level === "medium" ? "🟠 Consider CCU Consultation" : "🟢 Continue Monitoring"}
          </div>
          <div style={{ fontSize: 13, color: "var(--t1)", lineHeight: 1.55 }}>
            {level === "high" ? `${score} indicators flagged. This represents a significant pattern requiring CCU referral. Do not confront the officer. Document your observations and contact CCU.` :
              level === "medium" ? `${score} indicators flagged. Consider calling CCU for informal advice without necessarily making a formal referral. Continue documenting observations.` :
                `${score} indicator flagged. Continue monitoring. Ensure your observations are documented. Revisit this assessment if further concerns emerge.`}
          </div>
          {score > 0 && <button className="btn btn-g" style={{ marginTop: 12, fontSize: 12 }} onClick={copyReport}>📋 Copy Assessment to Clipboard</button>}
        </div>
      )}

      {cats.map(cat => (
        <div key={cat} style={{ marginBottom: 18 }}>
          <div className="sec">📁 {cat}</div>
          {INDICATORS.filter(i => i.cat === cat).map(item => (
            <div key={item.id} className={`check-item ${checked.includes(item.id) ? "checked" : ""}`} onClick={() => toggle(item.id)}>
              <div className={`check-box ${checked.includes(item.id) ? "on" : ""}`}>
                {checked.includes(item.id) && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <div className="check-label">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─── Referral Wizard ──────────────────────────────────────────────────────────

const ReferralWizard = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const total = REFERRAL_QUESTIONS.length;
  const done = step >= total;
  const score = answers.reduce((s, a) => s + a.weight, 0);
  const level = score >= 14 ? "high" : score >= 8 ? "medium" : "low";

  const next = () => {
    if (selected === null) return;
    setAnswers(prev => [...prev, selected]);
    setSelected(null);
    setStep(prev => prev + 1);
  };

  const reset = () => { setStep(0); setAnswers([]); setSelected(null); };

  const q = REFERRAL_QUESTIONS[step];

  return (
    <div className="page" style={{ maxWidth: 620 }}>
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>🧭 Referral Decision Tool</div>
      <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 22 }}>Answer four questions to get a referral recommendation tailored to your situation.</div>

      <div className="wiz-progress">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`wiz-dot ${i === step ? "on" : i < step ? "done" : ""}`} />
        ))}
        {!done && <span style={{ fontSize: 11, color: "var(--t2)", marginLeft: 8 }}>Question {step + 1} of {total}</span>}
      </div>

      {!done ? (
        <div className="wiz-step">
          <div className="card">
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, lineHeight: 1.4 }}>{q.question}</div>
            {q.options.map((opt, i) => (
              <button key={i} className={`choice-btn ${selected?.text === opt.text ? "sel" : ""}`}
                onClick={() => setSelected(opt)}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected?.text === opt.text ? "var(--pr)" : "var(--b2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected?.text === opt.text && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--pr)" }} />}
                </div>
                {opt.text}
              </button>
            ))}
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button className="btn btn-p" disabled={!selected} onClick={next}>
                {step < total - 1 ? "Next Question →" : "Get Recommendation →"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="wiz-step">
          <div className={`result-box ${level}`}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>
              {level === "high" ? "🔴 Refer to CCU Now" : level === "medium" ? "🟠 Seek CCU Advice" : "🟢 Document and Monitor"}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>
              {level === "high"
                ? "Based on your answers, this situation warrants an immediate CCU referral. Do not confront the officer. Document everything you have observed — dates, times, witnesses, specific behaviours — and contact CCU directly. They will take it from there."
                : level === "medium"
                  ? "Your answers suggest this may be appropriate for CCU referral or at least an informal consultation. Contact CCU and describe what you have observed without necessarily making a formal referral. They will advise you on next steps."
                  : "Based on your answers, formal CCU referral may not be required at this stage. However, document your observations carefully and revisit this assessment if the situation develops. Consider using the Indicators Checklist to structure your monitoring."}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Key actions:</div>
            <div style={{ fontSize: 13, color: "var(--t1)", lineHeight: 1.7 }}>
              {level === "high" ? (
                <>• Document your observations now — contemporaneous notes carry significant evidential weight<br />
                  • Do not discuss your concerns with the officer or their colleagues<br />
                  • Contact CCU directly — treat this as confidential<br />
                  • Preserve any evidence — do not delete or alter any relevant records<br />
                  • Consider using Shield Report for anonymous submission if you have concerns about the referral process</>
              ) : level === "medium" ? (
                <>• Call CCU for informal advice — you do not need to make a formal referral at this stage<br />
                  • Document your observations in case a formal referral becomes necessary<br />
                  • Continue monitoring — review using the Indicators Checklist<br />
                  • Do not raise your concerns with the officer until CCU have advised</>
              ) : (
                <>• Start a contemporaneous log of observations — even minor concerns<br />
                  • Run the Indicators Checklist monthly to track any developing pattern<br />
                  • Ensure normal supervisory activity is maintained and documented<br />
                  • If the situation changes, return to this tool</>
              )}
            </div>
          </div>
          <button className="btn btn-g" style={{ marginTop: 8 }} onClick={reset}>← Start Again</button>
        </div>
      )}
    </div>
  );
};

// ─── Scenarios ────────────────────────────────────────────────────────────────

const Scenarios = ({ onBack }) => {
  const [sel, setSel] = useState(null);
  const [choice, setChoice] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const reset = () => { setSel(null); setChoice(null); setRevealed(false); };

  if (!sel) return (
    <div className="page">
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>🎯 Scenario-Based Learning</div>
      <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 22 }}>Work through realistic situations and test your decision-making. Select a scenario to begin.</div>
      <div className="grid2">
        {SCENARIOS.map(s => (
          <div key={s.id} className="scenario-card" onClick={() => setSel(s)}>
            <div>
              <span className="scenario-tag" style={{ background: s.tag_color, color: s.tag_text }}>{s.category}</span>
              <span style={{ fontSize: 10, color: "var(--t3)", marginLeft: 8 }}>{s.difficulty}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--t1)", marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.5 }}>{s.situation.substring(0, 100)}…</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: 680 }}>
      <button className="back" onClick={reset}>← All Scenarios</button>
      <div>
        <span className="scenario-tag" style={{ background: sel.tag_color, color: sel.tag_text }}>{sel.category}</span>
        <span style={{ fontSize: 10, color: "var(--t3)", marginLeft: 8 }}>{sel.difficulty}</span>
      </div>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, margin: "10px 0 6px" }}>{sel.title}</div>
      <div className="card" style={{ background: "var(--s2)" }}>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--t1)" }}>{sel.situation}</div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: "var(--t2)" }}>What do you do?</div>
      {sel.options.map((opt, i) => {
        const isChosen = choice === i;
        const showFeedback = revealed && isChosen;
        const borderColor = showFeedback
          ? opt.outcome === "correct" ? "var(--gr)" : opt.outcome === "incorrect" ? "var(--rd)" : "var(--am)"
          : isChosen ? "var(--pr)" : "var(--b1)";
        return (
          <div key={i}>
            <button className="choice-btn" onClick={() => { if (!revealed) setChoice(i); }}
              style={{ borderColor, background: isChosen ? "var(--s3)" : "var(--s2)", opacity: revealed && !isChosen ? 0.5 : 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {isChosen && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--pr)" }} />}
              </div>
              {opt.text}
            </button>
            {showFeedback && (
              <div style={{ background: opt.outcome === "correct" ? "rgba(34,197,94,.08)" : opt.outcome === "incorrect" ? "rgba(239,68,68,.08)" : "rgba(245,158,11,.08)", border: `1px solid ${opt.outcome === "correct" ? "rgba(34,197,94,.25)" : opt.outcome === "incorrect" ? "rgba(239,68,68,.25)" : "rgba(245,158,11,.25)"}`, borderRadius: 8, padding: "12px 14px", margin: "0 0 8px", fontSize: 13, lineHeight: 1.6 }}>
                <div style={{ fontWeight: 700, marginBottom: 5, color: opt.outcome === "correct" ? "var(--gr)" : opt.outcome === "incorrect" ? "var(--rd)" : "var(--am)" }}>
                  {opt.outcome === "correct" ? "✓ Good decision" : opt.outcome === "incorrect" ? "✗ Not recommended" : "⚠️ Risky approach"}
                </div>
                {opt.feedback}
              </div>
            )}
          </div>
        );
      })}
      <div className="btn-row" style={{ marginTop: 8 }}>
        {!revealed && choice !== null && (
          <button className="btn btn-p" onClick={() => setRevealed(true)}>Reveal Feedback</button>
        )}
        {revealed && (
          <button className="btn btn-g" onClick={reset}>← Try Another Scenario</button>
        )}
      </div>
    </div>
  );
};

// ─── Policy Reference ─────────────────────────────────────────────────────────

const PolicyRef = ({ onBack }) => {
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const filtered = POLICY_FAQ.filter(item => item.q.toLowerCase().includes(q.toLowerCase()) || item.a.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page" style={{ maxWidth: 740 }}>
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>📖 Policy Quick Reference</div>
      <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 18 }}>Searchable answers to common questions on corruption, referrals, and professional standards obligations.</div>
      <div className="fg">
        <input className="inp" placeholder="Search policy questions..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {filtered.map((item, i) => (
        <div key={i} className={`policy-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)", lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ color: "var(--t3)", fontSize: 16, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</div>
          </div>
          {open === i && <div className="policy-answer">{item.a}</div>}
        </div>
      ))}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 20px", color: "var(--t3)", fontSize: 13 }}>
          <div style={{ fontSize: 30, marginBottom: 10 }}>🔍</div>
          No matching questions found. Try the chatbot for more specific guidance.
        </div>
      )}
    </div>
  );
};

// ─── Documentation Assistant ──────────────────────────────────────────────────

const DocBuilder = ({ onBack }) => {
  const [form, setForm] = useState({ date: "", time: "", location: "", behaviour: "", witnesses: "", context: "", action: "", officer: "" });
  const [preview, setPreview] = useState("");
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/anthropic-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: 1000,
          system: "You are a professional standards documentation assistant for UK police supervisors. Generate a structured, evidentially sound concern document based on the information provided. Use professional language. Include only what has been provided. Do not embellish or add assumptions. Format as a clear written record suitable for submission to CCU.",
          messages: [{
            role: "user",
            content: `Generate a structured concern document from these observations:\n\nOfficer reference: ${form.officer || "Not specified"}\nDate observed: ${form.date}\nTime: ${form.time}\nLocation: ${form.location}\nObserved behaviour: ${form.behaviour}\nWitnesses: ${form.witnesses || "None noted"}\nContext/background: ${form.context}\nAction taken so far: ${form.action || "None"}`
          }]
        })
      });
      const d = await res.json();
      setPreview(d.content?.find(b => b.type === "text")?.text || "Unable to generate document. Please try again.");
    } catch {
      setPreview("Unable to connect. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const copy = () => navigator.clipboard?.writeText(preview);
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="page" style={{ maxWidth: 740 }}>
      <button className="back" onClick={onBack}>← Back to Toolkit</button>
      <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>📝 Documentation Assistant</div>
      <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 22 }}>Complete the fields below to generate a structured, evidentially sound concern document ready for CCU submission.</div>
      <div className="card">
        <div className="grid2">
          <div className="fg">
            <label className="lbl">Date observed *</label>
            <input className="inp" type="date" value={form.date} onChange={e => up("date", e.target.value)} />
          </div>
          <div className="fg">
            <label className="lbl">Time (approximate)</label>
            <input className="inp" type="time" value={form.time} onChange={e => up("time", e.target.value)} />
          </div>
        </div>
        <div className="fg">
          <label className="lbl">Location / context</label>
          <input className="inp" placeholder="e.g. custody suite, briefing room, patrol area" value={form.location} onChange={e => up("location", e.target.value)} />
        </div>
        <div className="fg">
          <label className="lbl">Officer reference (optional)</label>
          <input className="inp" placeholder="Collar number or role — not transmitted anywhere" value={form.officer} onChange={e => up("officer", e.target.value)} />
        </div>
        <div className="fg">
          <label className="lbl">What did you observe? *</label>
          <textarea className="ta" style={{ minHeight: 110 }} placeholder="Describe the specific behaviour, words, or actions you witnessed. Be factual — what did you see and hear, not what you inferred." value={form.behaviour} onChange={e => up("behaviour", e.target.value)} />
        </div>
        <div className="fg">
          <label className="lbl">Witnesses present</label>
          <input className="inp" placeholder="Roles only — do not record names here" value={form.witnesses} onChange={e => up("witnesses", e.target.value)} />
        </div>
        <div className="fg">
          <label className="lbl">Background context</label>
          <textarea className="ta" style={{ minHeight: 80 }} placeholder="Any relevant context — previous incidents, patterns of behaviour, relevant history" value={form.context} onChange={e => up("context", e.target.value)} />
        </div>
        <div className="fg">
          <label className="lbl">Action taken so far</label>
          <input className="inp" placeholder="e.g. none, informal conversation, sought advice" value={form.action} onChange={e => up("action", e.target.value)} />
        </div>
        <button className="btn btn-p" disabled={!form.date || !form.behaviour || generating} onClick={generate}>
          {generating ? <><div className="spin" />Generating…</> : "📄 Generate Document"}
        </button>
      </div>
      {preview && (
        <div>
          <div className="sec" style={{ marginTop: 8 }}>Generated Document</div>
          <div className="doc-preview">{preview}</div>
          <div className="btn-row" style={{ marginTop: 12 }}>
            <button className="btn btn-p" onClick={copy}>📋 Copy to Clipboard</button>
            <button className="btn btn-g" onClick={() => setPreview("")}>🗑 Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Welfare ──────────────────────────────────────────────────────────────────

const Welfare = ({ onBack }) => (
  <div className="page" style={{ maxWidth: 720 }}>
    <button className="back" onClick={onBack}>← Back to Toolkit</button>
    <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>💙 Welfare & Support</div>
    <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 8 }}>Referring a colleague to CCU is one of the most difficult things a supervisor can do. Support is available for you, your team, and for officers who may be in difficulty.</div>
    <div style={{ background: "rgba(91,127,255,.07)", border: "1px solid rgba(91,127,255,.18)", borderRadius: 8, padding: "12px 15px", fontSize: 13, color: "var(--t2)", lineHeight: 1.55, marginBottom: 22 }}>
      💡 If you are struggling with the weight of a referral decision, or are concerned about your own wellbeing, please use these resources. Seeking support is not a sign of weakness — it demonstrates the professional resilience the role requires.
    </div>
    {WELFARE.map((w, i) => (
      <div key={i} className="welfare-card">
        <div className="welfare-ic">{w.ic}</div>
        <div>
          <div className="welfare-t">{w.title}</div>
          <div className="welfare-d">{w.desc}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            {w.phone !== "Internal" && w.phone !== "Web only" && (
              <div style={{ fontSize: 12, color: "var(--gr)", fontWeight: 600 }}>📞 {w.phone}</div>
            )}
            <div style={{ fontSize: 12, color: "var(--pr)" }}>🌐 {w.link}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

const TOOLS = [
  { id: "chat", ic: "🤖", title: "CCU Support Chatbot", desc: "Ask anything about corruption, integrity, challenging behaviour, or when to refer. Available 24/7.", badge: "AI-Powered", badgeClass: "badge-blue" },
  { id: "checklist", ic: "⚠️", title: "Corruption Indicators Checklist", desc: "Work through 18 evidence-based indicators to assess whether a concern warrants escalation.", badge: "Self-Assessment", badgeClass: "badge-amber" },
  { id: "wizard", ic: "🧭", title: "Referral Decision Tool", desc: "Answer four questions to get a clear recommendation on whether and how to refer to CCU.", badge: "Decision Support", badgeClass: "badge-blue" },
  { id: "scenarios", ic: "🎯", title: "Scenario Training", desc: "Test your decision-making through realistic counter-corruption scenarios with expert feedback.", badge: "4 Scenarios", badgeClass: "badge-green" },
  { id: "policy", ic: "📖", title: "Policy Quick Reference", desc: "Searchable answers to the most common questions on corruption, referrals, and legal obligations.", badge: "10 Topics", badgeClass: "badge-green" },
  { id: "docs", ic: "📝", title: "Documentation Assistant", desc: "AI-assisted tool to help you produce a structured, evidentially sound concern document for CCU submission.", badge: "AI-Powered", badgeClass: "badge-blue" },
  { id: "welfare", ic: "💙", title: "Welfare & Support", desc: "Support resources for supervisors, officers in difficulty, and teams affected by corruption investigations.", badge: "Support", badgeClass: "badge-green" },
  { id: "report", ic: "🔒", title: "Submit Anonymous Report", desc: "Access Shield Report to submit an anonymous concern directly to CCU without identifying yourself.", badge: "Anonymous", badgeClass: "badge-amber" },
];

export default function App() {
  const [view, setView] = useState("home");

  const go = (id) => {
    if (id === "report") { window.open("https://ccu-app-ruby.vercel.app", "_blank"); return; }
    setView(id);
  };

  const back = () => setView("home");

  if (view === "chat") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><Chatbot onBack={back} /></main></>;
  if (view === "checklist") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><Checklist onBack={back} /></main></>;
  if (view === "wizard") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><ReferralWizard onBack={back} /></main></>;
  if (view === "scenarios") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><Scenarios onBack={back} /></main></>;
  if (view === "policy") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><PolicyRef onBack={back} /></main></>;
  if (view === "docs") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><DocBuilder onBack={back} /></main></>;
  if (view === "welfare") return <><style>{CSS}</style><Header onHome={back} /><main className="main"><Welfare onBack={back} /></main></>;

  return (
    <div className="app"><style>{CSS}</style>
      <Header onHome={back} />
      <main className="main">
        <div className="page">
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'Calibri',sans-serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: ".06em", marginBottom: 8 }}>
              CCU Supervisor Toolkit
            </div>
            <div style={{ fontSize: 14, color: "var(--t2)", maxWidth: 560, lineHeight: 1.6 }}>
              A practical resource for supervisors — recognise corruption early, decide when to refer, challenge unethical behaviour, and protect yourself and your team.
            </div>
          </div>

          <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 26, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>🔴</div>
            <div style={{ fontSize: 13, color: "var(--t1)", lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700 }}>If you have an urgent concern — </span>contact CCU directly. Do not confront a potentially corrupt officer. Use the Referral Decision Tool if you are unsure what to do.
            </div>
          </div>

          <div className="stat-row">
            <div className="stat"><div className="stat-v" style={{ color: "var(--pr)" }}>7</div><div className="stat-l">Tools Available</div></div>
            <div className="stat"><div className="stat-v" style={{ color: "var(--am)" }}>18</div><div className="stat-l">Corruption Indicators</div></div>
            <div className="stat"><div className="stat-v" style={{ color: "var(--gr)" }}>24/7</div><div className="stat-l">Chatbot Support</div></div>
          </div>

          <div className="grid2" style={{ marginBottom: 14 }}>
            {TOOLS.slice(0, 2).map(t => (
              <div key={t.id} className="tool-card" onClick={() => go(t.id)}
                style={{ border: "1px solid var(--pr-b)", background: "var(--pr-dim)" }}>
                <div className="tool-ic">{t.ic}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div className="tool-t">{t.title}</div>
                    <span className={`badge ${t.badgeClass}`}>{t.badge}</span>
                  </div>
                  <div className="tool-d">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid3">
            {TOOLS.slice(2).map(t => (
              <div key={t.id} className="tool-card" onClick={() => go(t.id)}>
                <div className="tool-ic">{t.ic}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, flexWrap: "wrap" }}>
                    <div className="tool-t">{t.title}</div>
                    <span className={`badge ${t.badgeClass}`}>{t.badge}</span>
                  </div>
                  <div className="tool-d">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, fontSize: 11, color: "var(--t3)", lineHeight: 1.6, textAlign: "center" }}>
            This toolkit is for supervisory guidance only. It does not replace force policy, CCU advice, or legal counsel. All information entered is processed locally and not stored or transmitted except where AI features are used.
          </div>
        </div>
      </main>
    </div>
  );
}
