/**
 * Grounding reference for the CCU Support Assistant chatbot.
 *
 * This is a curated summary of PUBLICLY AVAILABLE national policy --
 * College of Policing Authorised Professional Practice (APP) and the
 * College of Policing Code of Ethics, plus IOPC public guidance. It is
 * not the full text of any document, and it is not a substitute for
 * force-specific policy.
 *
 * Important limitation, stated plainly rather than papered over: the
 * detailed Counter Corruption APP itself is security-marked
 * OFFICIAL-SENSITIVE and only available to counter-corruption
 * professionals via the Police Knowledge Hub -- it is not public, and
 * nothing in this file claims to reproduce it. Exact CCU grading
 * criteria, thresholds and force-specific procedures are NOT covered
 * here on purpose; the chatbot's system prompt is instructed to say so
 * rather than invent detail when asked about them.
 *
 * Sources (all public, checked September 2026):
 * - College of Policing, "Vetting authorised professional practice",
 *   May 2025 (assets.college.police.uk/s3fs-public/2024-12/Vetting-authorised-professional-practice.pdf)
 * - College of Policing, "Ethical policing principles" (college.police.uk/ethics/code-of-ethics/principles), published 24 Jan 2024
 * - College of Policing, "Counter corruption" APP overview page (college.police.uk/app/professional-standards/counter-corruption)
 * - IOPC, "Learning the Lessons" issue 44 -- Culture and practice: preventing and identifying police corruption (policeconduct.gov.uk/learning-lessons-44-corruption)
 *
 * Maintenance note: this is a snapshot, not a live feed. Vetting APP was
 * itself mid-update in 2026 following the Police (Vetting) Regulations
 * 2025 (in force 13 July 2026) -- re-check the source PDF periodically
 * and update this file by hand. No code changes needed elsewhere.
 */

export const CCU_POLICY_REFERENCE = `
== GIFTS, GRATUITIES AND HOSPITALITY (Vetting APP, May 2025) ==
- All gifts, discounts or hospitality offered or given must be recorded, even if declined -- this includes gifts refused, not just accepted ones.
- Gifts must not be accepted where they would compromise integrity.
- Report any gift, discount or hospitality (excluding light refreshments) to your supervisor per local policy.
- The "GIFT" test to apply when offered something:
  - Genuine? Is it genuine appreciation, or did you solicit it, or does the donor feel obliged?
  - Independent? Would a reasonable member of the public be confident you can stay impartial?
  - Free? Would you feel free of any obligation to reciprocate?
  - Transparent? Would you be comfortable if your acceptance were made public?

== BUSINESS INTERESTS AND ADDITIONAL OCCUPATIONS (Vetting APP; Regulation 7, Police Regulations 2003, as amended 2012) ==
- Officers/staff may hold outside business interests, but must seek authorisation BEFORE starting a new one -- this includes secondary employment, property rental, directorships, company secretary roles (paid or not), voluntary positions, and income from social media/blogs/gaming/websites.
- Must notify the Professional Standards Department (PSD) of any business interest or paid/unpaid external activity in addition to the primary police role.
- Also covers a partner or co-resident owning/running a licensed premises (liquor licensing, refreshment houses, betting and gaming, regulated entertainment venues).
- Factors reviewed when assessing a business interest application:
  - Conflict of interest with police duties
  - Adverse effect on trust and confidence in the individual or the force
  - Conflict with the Standards of Professional Behaviour
  - Effect on ability to perform police duties (performance and impartiality)
  - Health, safety and welfare impact, and compliance with the Working Time Regulations 1998 (the well-known reference point is a 48-hour average working week)
- A declined business-interest application does not, by itself, affect a vetting decision -- but unresolved conflicts or non-adherence to conditions on an approved interest are treated as a serious integrity concern.

== NOTIFIABLE ASSOCIATIONS (Vetting APP, May 2025) ==
- "Associating" with someone is defined broadly: any acquaintance, friendship, relationship, intimacy or connection (including simply knowing someone even without current contact), meeting/uniting for a common purpose, keeping company, being an ally/confederate/colleague, or membership of the same group/organisation. It includes contact by phone, social media or other communication, not just in person.
- Must be declared if you know, consider or suspect an association with an individual, group or organisation that is or may be notifiable because it creates a potential conflict of interest -- report to your force's counter corruption unit (CCU).
- Examples given in national guidance of relationships that may need declaring (not exhaustive): people with previous convictions or reasonably suspected of criminal involvement; people involved in tendering/bidding for police contracts; journalists; solicitors/defence legal teams; private investigators; former police officers or staff now working in an investigative role; officers/staff previously dismissed from the police service.
- "Compromise" in this context can include: ignoring an associate's criminal behaviour to protect them or the relationship; accessing police information out of personal interest; sharing police information (breaching the Data Protection Act 2018); accepting cash, benefits, gifts or bribes to look up or share information; giving an inaccurate account to favour an associate; discussing police tactics; or damage to public confidence/reputation.
- The onus is on the individual to report any change of circumstances in a declared association.
- IMPORTANT: never check or ask someone else to check police systems to gather information about your own association for a vetting/declaration form -- that is itself a misuse-of-systems risk.
- Because of the Data Protection Act 2018, a force cannot tell an individual everything it knows about their associate that isn't already in the public domain or already known to the individual -- proactive, full disclosure by the individual is what actually reduces their own risk exposure.

== ABUSE OF POSITION FOR A SEXUAL PURPOSE (APSP) ==
- Defined as any behaviour by a police officer or member of staff, on or off duty, that takes advantage of their position to pursue a sexual or improper emotional relationship with a member of the public -- including sexual acts, initiating or responding to sexually motivated contact, or communication that could be perceived as sexually motivated.
- Treated as a form of serious corruption, not merely a conduct matter.

== PROFESSIONAL BOUNDARIES AND WORKPLACE RELATIONSHIPS ==
- Rank or position must never be used to start a sexual or improper emotional relationship with a member of the public met through police work.
- Workplace relationships are not prohibited but must stay professional; a power imbalance (e.g. tutor/student, line manager/report) must never be used to initiate, control or maintain a personal relationship.
- Where a relationship creates an actual or perceived conflict of interest, it should be declared and managed with both parties' line management.

== MISUSE OF POLICE SYSTEMS AND INFORMATION ==
- The national definition of a "policing purpose": prevention and detection of crime; apprehension and prosecution of offenders; protection of life and property; maintenance of law and order; rendering assistance to the public in line with force policy.
- Anything outside that -- personal curiosity, financial gain, business interest, prohibited by other force policy, or casual browsing -- is a non-policing purpose and a potential misconduct or criminal matter (Computer Misuse Act 1990 is the relevant statute).
- Never share information obtained through police work with friends or family.

== CHANGE OF CIRCUMSTANCES -- WHAT MUST BE REPORTED, AND PROMPTLY ==
Once vetting clearance is granted it must be maintained; the following must be reported as soon as possible:
- Change of partner, marital status or civil partnership; change of name, address or co-residents
- Significant financial changes: county court judgment, debt management plan, unexpected funds
- Being the subject of, or a person of interest in, a criminal investigation
- Any involvement with police outside your own role (other than as victim/witness)
- Changes in notifiable associations, or any new association with someone involved in (or who associates with others involved in) criminal activity
- Involvement in or approaches from a political, religious or protest group whose aims conflict with promoting racial, religious and social equality
- Being subject to civil proceedings or protective measures
- Any arrest, summons, conviction or fixed penalty notice (including road traffic FPNs)

== WHAT COUNTS AS "SERIOUS CORRUPTION" AND MUST BE REFERRED (IOPC public guidance) ==
Forces have a duty to refer serious corruption to the IOPC. This includes, but is not limited to:
- Abuse of position for a sexual purpose (APSP)
- Computer misuse offences
- Theft and fraud
- Criminal associations
- Behaviour amounting to misconduct in public office or perverting the course of justice
Corruption more broadly (per IOPC's public "Learning the Lessons" series) also covers: organised crime links, drug misuse combined with information sharing, inappropriate/undisclosed associations, unauthorised disclosure of police information, misuse of social media, and sexual misconduct.
Officers and staff can also raise concerns anonymously via the IOPC's report line (whistleblowing) -- reportline@policeconduct.gov.uk / 08458 770061 -- separate from a force's own internal CCU referral route. This is for wrongdoing/malpractice, not personnel grievances (pay, hours, promotion), which go through normal HR/grievance routes.

== CORRUPTION RISK INDICATORS (Vetting APP -- factors requiring particular scrutiny) ==
Not exhaustive, but nationally recognised indicators include: financial vulnerability or unmanageable debt; misuse of alcohol or drugs; compulsive/excessive gambling; unauthorised disclosure of police information; coercion; APSP; discriminatory behaviour; theft of police assets or evidence; misuse of social media; unmanaged or undisclosed notifiable associations; adverse counter-corruption intelligence; and patterns of adverse behaviour.

== ETHICAL POLICING PRINCIPLES (College of Policing Code of Ethics, published 24 January 2024 -- supersedes the 2014 nine-principles version) ==
Three principles, each with supporting behaviours:
1. Courage -- taking responsibility, setting an example, challenging unprofessional behaviour and practice (irrespective of rank), being honest/open/accountable, encouraging feedback and scrutiny.
2. Respect and empathy -- acting with respect, listening to different perspectives, understanding the impact of emotions and welfare, responding to individual needs, being fair and impartial.
3. Public service -- delivering a service to be proud of, acting lawfully, understanding and responding to the public's needs, reflecting on and applying knowledge/experience, improving self/peers/profession.
(The 2014 Code's nine principles -- selflessness, integrity, objectivity, accountability, openness, honesty, leadership, fairness, respect -- map onto these three; if someone asks about the "nine principles" by name, you can confirm they were superseded by this three-principle model in 2024.)

== WHAT THIS ASSISTANT CANNOT SPEAK TO ==
- The detailed Counter Corruption APP (grading criteria, investigative thresholds, specific intelligence-handling rules) is security-marked OFFICIAL-SENSITIVE and only available to CCU professionals via the Police Knowledge Hub -- it is not public, and this assistant has not seen it.
- Force-specific policy (exact reporting forms, named internal contacts, local thresholds, disciplinary process specifics) varies by force and is not covered here.
- For either of the above, say so plainly and direct the supervisor to their own force's CCU/PSD or their local intranet policy -- do not guess or improvise specifics that sound plausible.
`;
