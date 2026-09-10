/**
 * SINGLE SOURCE OF TRUTH for site navigation, the home page grid, and progress tracking.
 * To add a new topic: add one object here (any position) and create the matching .html file
 * (copy template.html). Every page's sidebar, prev/next links, and the home page grid rebuild
 * from this array automatically — no other file needs to change.
 *
 * Fields:
 *   id     - unique slug, also the localStorage progress key
 *   title  - shown in sidebar + home grid
 *   file   - the .html filename (flat, same folder as everything else)
 *   icon   - FontAwesome class, e.g. "fa-solid fa-database"
 *   color  - a Tailwind color name (blue/indigo/emerald/amber/teal/pink/cyan/violet/yellow/rose/...)
 *   group  - section heading used to cluster the sidebar (e.g. "Core Guide", "Deep Dives")
 *   desc   - one-line description used on the home page card
 */
const TOPICS = [
  {
    id: 'big-picture',
    title: 'The Big Picture',
    file: 'big-picture.html',
    icon: 'fa-solid fa-earth-americas',
    color: 'blue',
    group: 'Core Guide',
    desc: 'The end-to-end Order-to-Cash process flow and how config, master data, and transactions relate.'
  },
  {
    id: 'enterprise-structure',
    title: 'Enterprise Structure',
    file: 'enterprise-structure.html',
    icon: 'fa-solid fa-sitemap',
    color: 'indigo',
    group: 'Core Guide',
    desc: 'Sales Org, Distribution Channel, Division, Plants, Customer Master views, and Partner Functions.'
  },
  {
    id: 'master-data',
    title: 'Master Data & Config',
    file: 'master-data.html',
    icon: 'fa-solid fa-database',
    color: 'emerald',
    group: 'Core Guide',
    desc: 'Account groups, units of measure, and the customer/material master data priority chain.'
  },
  {
    id: 'sales-documents',
    title: 'Sales Documents',
    file: 'sales-documents.html',
    icon: 'fa-solid fa-file-invoice',
    color: 'amber',
    group: 'Core Guide',
    desc: 'Header/Item/Schedule Line architecture, the determination chain, and copy control t-codes.'
  },
  {
    id: 'doc-type-config',
    title: 'Configuring a Sales Document Type',
    file: 'doc-type-config.html',
    icon: 'fa-solid fa-sliders',
    color: 'orange',
    group: 'Core Guide',
    desc: 'VOV8 field-by-field walkthrough, number ranges, OVAZ sales area assignment, and the standard special document types.'
  },
  {
    id: 'pricing',
    title: 'Configure Pricing',
    file: 'pricing.html',
    icon: 'fa-solid fa-tags',
    color: 'rose',
    group: 'Core Guide',
    desc: 'The condition technique, pricing procedures, procedure determination, exclusion groups, and pricing limits.'
  },
  {
    id: 'atp',
    title: 'Available-to-Promise (ATP)',
    file: 'atp.html',
    icon: 'fa-solid fa-boxes-packing',
    color: 'teal',
    group: 'Deep Dives',
    desc: 'Backward/forward scheduling, cumulative ATP, first-come-first-served, aATP, ATP vs MRP.'
  },
  {
    id: 'simulator',
    title: 'Determination Simulator',
    file: 'simulator.html',
    icon: 'fa-solid fa-gears',
    color: 'pink',
    group: 'Deep Dives',
    desc: 'Interactive tool: pick a doc type + item category group + MRP type, see the determined categories.'
  },
  {
    id: 'scenario',
    title: 'Worked Scenario: Northstar',
    file: 'scenario.html',
    icon: 'fa-solid fa-route',
    color: 'cyan',
    group: 'Deep Dives',
    desc: 'A single end-to-end case tying enterprise structure, master data, and document flow together.'
  },
  {
    id: 'tables',
    title: 'Technical Table Reference',
    file: 'tables.html',
    icon: 'fa-solid fa-table',
    color: 'violet',
    group: 'Reference',
    desc: 'Searchable list of the SD tables you actually query in SE16/SE16N (VBAK, VBAP, LIKP, VBFA...).'
  },
  {
    id: 'quiz',
    title: 'Practice Checkpoint',
    file: 'quiz.html',
    icon: 'fa-solid fa-graduation-cap',
    color: 'yellow',
    group: 'Reference',
    desc: 'Flashcard-style questions with instant answer reveals to test what stuck.'
  }
];
