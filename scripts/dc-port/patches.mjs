/**
 * Product wiring applied on top of the designs during conversion, so a fresh
 * design export can be re-converted without losing it. Each entry is
 * [find, replace]; every occurrence of `find` is replaced and it must exist in
 * the design (the converter fails otherwise, which flags design drift that
 * needs a look). `find` may also be a RegExp. `prelude` is code placed before
 * the logic class; `vals` is a function (this = logic, arg = the design's
 * renderVals result) whose returned object is merged into renderVals().
 * `after` is code placed after the class (e.g. `Component = wireX(Component)`
 * from lib/dc/wiring, which seeds state from the API and syncs changes back).
 *
 * Props the app passes in (see components/relay-app/*):
 *   Dashboard: initialRoute, route, onRoute, plan, user, onLogout, onUpgradePlan
 *   Login / Sign Up: onAuth(kind, fields) → Promise
 *   user = { name, firstName, email, initials, avatarUrl, company }
 * With no props (the site's product shots) everything falls back to the design's demo data.
 */
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Give a control that has no handler in the design (span/div with this exact text) an onClick. */
const click = (text, handler) => [
  new RegExp(`<(span|div)((?:\\s+style(?:-hover)?="[^"]*")+)>((?:<svg(?:(?!</svg>)[\\s\\S])*?</svg>)?)${esc(text)}<`, 'g'),
  `<$1 onClick="{{ ${handler} }}"$2>$3${text}<`,
]

/** Point a placeholder `href="#"` link (identified by its text) somewhere real. */
const link = (text, to) => [new RegExp(`href="#"([^>]*>)${esc(text)}`, 'g'), `href="${to}"$1${text}`]

/**
 * Sign-up CTAs follow the pre-launch switch (lib/launch.ts): the waitlist and its
 * copy while sign up is closed, the Sign up page after launch. `label` is a
 * LAUNCH key to swap the text, or omitted to keep the design's text.
 */
const cta = (text, label) => [
  new RegExp(`href="#"([^>]*>)${esc(text)}`, 'g'),
  `href="{{ launch.href }}"$1${label ? `{{ launch.${label} }}` : text}`,
]

export default {
  'Relay Dashboard': {
    prelude: "import { getReportEntry } from '@/lib/reports'\nimport { wireDashboard, dashboardVals } from '@/lib/dc/wiring'",
    vals: `function (v) {
      const rep = this.state.page === 'report' ? getReportEntry(this.state.params.slug, 'app') : null;
      return {
        appOpenReport: (slug) => this.go('report', { slug }, 'intelligence'),
        ...(rep ? { title: rep.cardTitle, activeKey: 'intelligence', page: 'intelligence' } : {}),
        ...dashboardVals.call(this, v),
      };
    }`,
    after: 'Component = wireDashboard(Component)',
    logic: [
      [
        "state = { page: 'overview', params: {}, activeKey: 'overview',",
        "state = { page: this.props.initialRoute?.page ?? 'overview', params: this.props.initialRoute?.params ?? {}, activeKey: this.props.initialRoute?.page ?? 'overview',",
      ],
      [
        "plan: /[?&]plan=pro/i.test(window.location.search) ? 'Pro' : 'Free'",
        "plan: this.props.plan ?? (/[?&]plan=pro/i.test(window.location.search) ? 'Pro' : 'Free')",
      ],
      [
        'go(page, params = {}, key) { this.setState({ page, params, activeKey: key ?? page, navOpen: false }); }',
        `go(page, params = {}, key) { this.setState({ page, params, activeKey: key ?? page, navOpen: false }); this.props.onRoute?.(page, params); }
  componentDidUpdate(prev) {
    const r = this.props.route;
    if (r && r !== prev.route && (r.page !== this.state.page || !same(r.params, this.state.params))) this.setState({ page: r.page, params: r.params, activeKey: r.page, navOpen: false });
    if (this.props.plan && this.props.plan !== prev.plan) this.setState({ plan: this.props.plan });
  }`,
      ],
      [
        "confirmUpgrade: () => { this.setState({ modal: null, plan: 'Pro' });",
        "confirmUpgrade: () => { this.setState({ modal: null, plan: 'Pro' }); this.props.onUpgradePlan?.();",
      ],
    ],
    template: [
      ['<dc-import name="Relay Topbar" ', '<dc-import name="Relay Topbar" plan="{{ plan }}" user="{{ user }}" on-logout="{{ onLogout }}" '],
      [
        '<dc-import name="Relay Overview" ',
        '<dc-import name="Relay Overview" plan="{{ plan }}" user="{{ user }}" on-navigate="{{ onNavigate }}" on-create-list="{{ createList }}" on-upgrade="{{ openUpgrade }}" ',
      ],
      ['<dc-import name="Relay Inbox" ', '<dc-import name="Relay Inbox" on-open-provider="{{ openProvider }}" '],
      ['<dc-import name="Relay Compare" ', '<dc-import name="Relay Compare" on-navigate="{{ onNavigate }}" '],
      // Top bar search → Directory filtered by the query.
      ['<dc-import name="Relay Directory" ', '<dc-import name="Relay Directory" query="{{ params.q }}" query-key="{{ params.t }}" '],
      // Real Relay Research reports (config/reports.json) in Intelligence › Reports, read in-app on a "report" page.
      ['<dc-import name="Relay Intelligence" ', '<dc-import name="Relay Intelligence" real-reports="{{ realReports }}" on-open-report="{{ appOpenReport }}" '],
      [
        '\n      <sc-if value="{{ is.profile }}">',
        '\n      <sc-if value="{{ is.report }}">\n        <dc-import name="Relay Report Reader" slug="{{ params.slug }}" on-navigate="{{ onNavigate }}" on-open-report="{{ appOpenReport }}"></dc-import>\n      </sc-if>\n      <sc-if value="{{ is.profile }}">',
      ],
      ['<dc-import name="Relay Requests" ', '<dc-import name="Relay Requests" on-navigate="{{ onNavigate }}" '],
      ['<dc-import name="Relay Profile" ', '<dc-import name="Relay Profile" user="{{ user }}" '],
      ['<dc-import name="Relay Settings" ', '<dc-import name="Relay Settings" user="{{ user }}" '],
      ['<dc-import name="Relay Sidebar" ', '<dc-import name="Relay Sidebar" inbox-unread="{{ appInboxUnread }}" '],
      ['<dc-import name="Relay Inbox" ', '<dc-import name="Relay Inbox" on-navigate="{{ onNavigate }}" '],
      // The signed-in workspace (lib/dc/app-bridge) for every screen; undefined on the website's product shots.
      [
        /<dc-import name="(Relay (?:Sidebar|Topbar|Overview|Inbox|Compare|Directory|Providers|Shortlists|Provider|Requests|Intelligence|Profile|Settings|Modals))" /g,
        '<dc-import name="$1" app="{{ app }}" ',
      ],
    ],
  },

  'Relay Topbar': {
    template: [
      ['src="https://randomuser.me/api/portraits/women/44.jpg"', 'src="{{ avatar }}"'],
      ['alt="Sarah Mitchell"', 'alt="{{ userName }}"'],
      ['>Sarah Mitchell<', '>{{ userName }}<'],
      [
        '<div onClick="{{ closeMenus }}" style="display:flex;align-items:center;height:30px;padding:0 8px;border-radius:6px;cursor:pointer;font-size:13px;color:#d4d6da" style-hover="background:#2a2b2e;color:#f7f8f8">Log out</div>',
        '<div onClick="{{ logOut }}" style="display:flex;align-items:center;height:30px;padding:0 8px;border-radius:6px;cursor:pointer;font-size:13px;color:#d4d6da" style-hover="background:#2a2b2e;color:#f7f8f8">Log out</div>',
      ],
      [/<span (style="[^"]*" style-hover="[^"]*">\{\{ n\.action \}\})/, '<span onClick="{{ n.appAction }}" $1'],
      [/<span (style="[^"]*">Dismiss<\/span>)/, '<span onClick="{{ n.appDismiss }}" $1'],
      // Search results under the search field, in the style of the Topbar's other menus.
      [
        '<label data-r="m-hide" style="display:flex;align-items:center;gap:10px;flex:0 1 380px;width:380px;min-width:140px;height:34px;',
        '<div data-r="m-hide" style="position:relative;flex:0 1 380px;width:380px;min-width:140px"><label style="display:flex;align-items:center;gap:10px;width:100%;height:34px;',
      ],
      ['onBlur="{{ onBlur }}" placeholder="Search Providers…"', 'onBlur="{{ onBlur }}" onKeyDown="{{ appSearchKey }}" placeholder="Search Providers…"'],
      [
        'opacity:{{ kbdOp }}">⌘K</span>\n    </label>',
        `opacity:{{ kbdOp }}">⌘K</span>
    </label>
    <sc-if value="{{ appSearchOpen }}">
      <div style="position:absolute;top:40px;left:0;right:0;max-height:380px;overflow-y:auto;padding:4px;background:rgba(32,33,37,.78);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);border:1px solid rgba(255,255,255,.08);border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.5),0 2px 6px rgba(0,0,0,.3)">
        <sc-for list="{{ appResults }}" as="r">
          <sc-if value="{{ r.head }}"><div style="padding:8px 8px 4px;font-size:11px;font-weight:500;color:#62666d">{{ r.label }}</div></sc-if>
          <sc-if value="{{ r.item }}"><div onMouseDown="{{ r.run }}" onMouseEnter="{{ r.hover }}" style="display:flex;align-items:center;gap:8px;height:34px;padding:0 8px;border-radius:6px;cursor:pointer;font-size:13px;color:{{ r.fg }};background:{{ r.bg }}"><dc-import name="Relay App Icon" kind="{{ r.kind }}" size="20" hint-size="20px,20px"></dc-import><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ r.label }}</span><span style="font-size:11.5px;color:#62666d;white-space:nowrap">{{ r.meta }}</span></div></sc-if>
        </sc-for>
      </div>
    </sc-if>
    </div>`,
      ],
    ],
    logic: [
      [
        "planLabel: /[?&]plan=pro/i.test(window.location.search) ? 'Pro plan' : 'Free plan',",
        `planLabel: (this.props.plan ? this.props.plan === 'Pro' : /[?&]plan=pro/i.test(window.location.search)) ? 'Pro plan' : 'Free plan',
      userName: userName(this.props.user), avatar: userAvatar(this.props.user, 'https://randomuser.me/api/portraits/women/44.jpg'),
      logOut: () => { this.setState({ menu: null }); this.props.onLogout?.(); },`,
      ],
      // Bell notifications come from the API when signed in.
      [/(?<!const )\bNOTES\b/g, '(this.props.app?.data.notifications ?? NOTES)'],
    ],
    prelude: "import { wireTopbar, topbarVals, searchVals } from '@/lib/dc/wiring'",
    vals: 'function (v) { return { ...searchVals.call(this, v), ...topbarVals.call(this, v) } }',
    after: 'Component = wireTopbar(Component)',
  },

  'Relay Overview': {
    template: [
      ['{{ greeting }}, Sarah', '{{ greeting }}, {{ firstName }}'],
      ['From $49 / month', 'From {{ appFromPrice }} / month'],
      click('New shortlist', 'appNewShortlist'),
      click('Request intro', 'appRequestIntro'),
      click('Upgrade to Pro', 'appUpgrade'),
      click('Compare plans', 'appComparePlans'),
      click('View directory', 'appDirectory'),
      [/(<span) (style="font-size:12\.5px;font-weight:500;color:\{\{ c\.accent \}\}">Unlock →<\/span>)/, '$1 onClick="{{ appUpgrade }}" $2'],
      // Live catalog totals in-app; marketing copy stays region-first (no country-count claims).
      [
        '>Providers across every region we cover · Scored',
        '>{{ appTotal }} Providers across North America, Europe, Asia, LATAM, Africa and beyond · Scored',
      ],
      [
        '>More Providers across every region we cover.<',
        '>{{ appMore }} more Providers across every region we cover.<',
      ],
      [
        'font-weight:500">Preview</span> on Free<',
        'font-weight:500">{{ appVisible }}</span> of {{ appTotal }} visible on Free<',
      ],
      ['<span style="width:2%;min-width:6px;', '<span style="width:{{ appVisiblePct }};min-width:6px;'],
      ['color:#f7f8f8">Global</div>', 'color:#f7f8f8">{{ appTotal }}</div>'],
      ['Multi-region coverage</div>', 'Providers in the directory</div>'],
      // Shortlists card: the workspace's shortlists, as rows styled like the Activity feed.
      ['font-weight:500">Shortlists</span><span style="font-size:12px;color:#62666d">0</span>', 'font-weight:500">Shortlists</span><span style="font-size:12px;color:#62666d">{{ appListCount }}</span>'],
      [
        '<div style="flex:1;min-height:260px;border-radius:12px;box-shadow:0 0 0 1px rgba(255,255,255,.06);background:rgba(255,255,255,.012);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px;text-align:center">',
        '<sc-if value="{{ appNoLists }}"><div style="flex:1;min-height:260px;border-radius:12px;box-shadow:0 0 0 1px rgba(255,255,255,.06);background:rgba(255,255,255,.012);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px;text-align:center">',
      ],
      [
        'New shortlist</span>\n      </div>\n    </section>',
        `New shortlist</span>
      </div></sc-if>
      <sc-if value="{{ appHasLists }}">
      <div style="flex:1;min-height:260px;border-radius:12px;box-shadow:0 0 0 1px rgba(255,255,255,.06);background:rgba(255,255,255,.012);padding:8px 0;display:flex;flex-direction:column;justify-content:flex-start">
        <sc-for list="{{ appLists }}" as="l">
          <div onClick="{{ l.open }}" style="display:flex;align-items:center;gap:12px;padding:9px 16px;cursor:pointer;transition:background-color .12s" style-hover="background:rgba(255,255,255,.025)">
            <dc-import name="Relay App Icon" kind="{{ l.kind }}" size="26" hint-size="26px,26px"></dc-import>
            <div style="flex:1;min-width:0;font-size:13px;color:#8a8f98;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span style="color:#f7f8f8;font-weight:500">{{ l.name }}</span> {{ l.note }}</div>
            <span style="font-size:12px;color:#62666d;font-variant-numeric:tabular-nums;flex:none">{{ l.count }}</span>
          </div>
        </sc-for>
      </div>
      </sc-if>
    </section>`,
      ],
      ['padding:8px 0;display:flex;flex-direction:column;justify-content:center">', 'padding:8px 0;display:flex;flex-direction:column;justify-content:flex-start">'],
    ],
    prelude: "import { overviewVals } from '@/lib/dc/wiring'",
    vals: `function (v) {
      const nav = (k, p) => () => this.props.onNavigate?.(k, p);
      return { appNewShortlist: () => this.props.onCreateList?.(), appRequestIntro: nav('requests'), appUpgrade: () => this.props.onUpgrade?.(), appComparePlans: nav('settings', { section: 'billing' }), appDirectory: nav('directory'), ...overviewVals.call(this, v) };
    }`,
    logic: [
      [
        'state = { banner: !/[?&]plan=pro/i.test(window.location.search) };',
        `state = { banner: this.props.plan ? this.props.plan !== 'Pro' : !/[?&]plan=pro/i.test(window.location.search) };
  componentDidUpdate(prev) { if (prev.plan !== this.props.plan && this.props.plan === 'Pro' && this.state.banner) this.setState({ banner: false }); }`,
      ],
      [
        "greeting: h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening',",
        "greeting: h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening', firstName: this.props.user?.firstName || 'Sarah',",
      ],
    ],
  },

  'Relay Profile': {
    template: [
      ['src="https://randomuser.me/api/portraits/women/44.jpg"', 'src="{{ avatar }}"'],
      ['<option value="{{ o }}">{{ o }}</option>', '<option value="{{ o.v }}">{{ o.l }}</option>'],
    ],
    logic: [
      [
        'state = { saved: INIT, draft: INIT, flash: false, ask: false };',
        `state = { saved: withUser(INIT, this.props.user), draft: withUser(INIT, this.props.user), flash: false, ask: false };`,
      ],
      [
        "isSelect: k === 'timezone', isText: k !== 'timezone', options: TZ,",
        "isSelect: k === 'timezone' || k === 'title', isText: k !== 'timezone' && k !== 'title', options: k === 'title' ? roleOptions(S.draft.title) : TZ.map(o => ({ v: o, l: o })),",
      ],
    ],
    vals: "function (v) { return { avatar: userAvatar(this.props.user, 'https://randomuser.me/api/portraits/women/44.jpg'), ...profileVals.call(this, v) } }",
    prelude: `import { wireProfile, profileVals } from '@/lib/dc/wiring'
const withUser = (init, u) => u ? { ...init, name: u.name || init.name, email: u.email || init.email } : init;
const ROLES = ['Founder / CEO', 'CTO', 'CFO', 'Head of payments', 'Payments manager', 'Product manager', 'Engineering lead', 'Software engineer', 'Finance & treasury', 'Operations', 'Compliance & risk', 'Partnerships', 'Other'];
const roleOptions = (cur) => [...(!cur ? [{ v: '', l: 'Select a role' }] : ROLES.includes(cur) ? [] : [{ v: cur, l: cur }]), ...ROLES.map(o => ({ v: o, l: o }))];`,
    after: 'Component = wireProfile(Component)',
  },

  // Phones: list and message become two full-screen views (tap a message to open it, "Inbox"
  // to go back) so there's one scroll instead of a 44vh list scrolling inside the page.
  // Layout rules live in app/relay-app-mobile.css (data-mview / data-inbox).
  'Relay Inbox': {
    template: [
      click('View provider', 'appViewProvider'),
      [/<span (style="[^"]*" style-hover="[^"]*">\{\{ sel\.primary \}\})/, '<span onClick="{{ appPrimary }}" $1'],
      ['<div data-r="m-col" style="height:100%;min-height:560px;display:flex;', '<div data-r="m-col" data-mview="{{ appMView }}" style="height:100%;min-height:560px;display:flex;'],
      ['<div data-r="m-pane" style="flex:0 1 380px;', '<div data-r="m-pane" data-inbox="list" style="flex:0 1 380px;'],
      [
        '<div style="flex:1 1 360px;min-width:320px;overflow-y:auto">',
        '<div data-inbox="detail" style="flex:1 1 360px;min-width:320px;overflow-y:auto">\n    <span data-r="m-show" onClick="{{ appBack }}" style="display:none;width:fit-content;align-items:center;gap:6px;height:32px;margin:14px 0 -12px 12px;padding:0 10px 0 6px;border-radius:7px;font-size:13px;font-weight:500;color:#8a8f98;cursor:pointer" style-hover="color:#f7f8f8;background:rgba(255,255,255,.04)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>Inbox</span>',
      ],
    ],
    logic: [
      [/(?<!const )\bMSGS\b/g, '(this.props.app?.data.inbox ?? MSGS)'],
      ['componentDidMount() { this.read(1); }', 'componentDidMount() { if (this.state.sel != null) this.read(this.state.sel); }'],
      [
        'open: () => this.read(m.id),',
        "open: () => { this.read(m.id); this.setState({ appDetail: true }); if (window.matchMedia?.('(max-width: 768px)').matches) document.querySelector('main [style*=\"overflow-y\"]')?.scrollTo({ top: 0 }); },",
      ],
    ],
    prelude: "import { wireInbox, inboxVals } from '@/lib/dc/wiring'",
    vals: `function (v) {
      return {
        appViewProvider: () => { const p = RELAY.providers.find(x => x.name === v.sel?.from); if (p) this.props.onOpenProvider?.(p.id, 'inbox'); },
        appMView: this.state.appDetail ? 'detail' : 'list',
        appBack: () => this.setState({ appDetail: false }),
        ...inboxVals.call(this, v),
      };
    }`,
    after: 'Component = wireInbox(Component)',
  },

  'Relay Requests': {
    template: [click('Open in Inbox', 'appOpenInbox')],
    prelude: "import { wireRequests, requestsVals } from '@/lib/dc/wiring'",
    vals: "function (v) { return { appOpenInbox: () => this.props.onNavigate?.('inbox'), ...requestsVals.call(this, v) } }",
    after: 'Component = wireRequests(Component)',
  },

  // The workspace's real Providers pipeline (relay-api WsPipeline) in the design's ROWS shape.
  'Relay Providers': {
    logic: [[/(?<!const )\bROWS\b/g, '(this.props.app ? pipelineRows(this.props.app) : ROWS)']],
    prelude: "import { wireProviders, providersVals, pipelineRows } from '@/lib/dc/wiring'",
    vals: 'function (v) { return providersVals.call(this, v) }',
    after: 'Component = wireProviders(Component)',
  },

  'Relay Compare': {
    prelude: "import { wireCompare, compareVals } from '@/lib/dc/wiring'",
    vals: 'function (v) { return compareVals.call(this, v) }',
    after: 'Component = wireCompare(Component)',
  },

  // Phones: the region tabs (413px) were wider than the screen, so the whole panel slid
  // sideways while scrolling. At <=768px only "All regions" and "Europe" stay as tabs;
  // North America and Asia-Pacific move into More with the other regions.
  'Relay Directory': {
    prelude: "import { wireDirectory, directoryVals } from '@/lib/dc/wiring'\nconst narrow = () => typeof window !== 'undefined' && !!window.matchMedia?.('(max-width: 768px)').matches;",
    logic: [
      ["state = { q: '',", "state = { q: this.props.query ?? '',"],
      ["const MAIN = ['All regions', 'Europe', 'North America', 'Asia-Pacific']", "const MAIN_ALL = ['All regions', 'Europe', 'North America', 'Asia-Pacific']"],
      ['const extra = R.REGIONS.filter(r => !MAIN.includes(r))', 'const MAIN = narrow() ? MAIN_ALL.slice(0, 2) : MAIN_ALL, extra = R.REGIONS.filter(r => !MAIN.includes(r))'],
      [
        'componentDidMount() { if (!window.RELAY)',
        "componentDidUpdate(prev) { if (this.props.queryKey !== prev.queryKey && this.props.query != null) this.setState({ q: this.props.query, page: 0, cat: 'all', region: 'All regions' }); }\n  componentDidMount() { this._appMq = window.matchMedia?.('(max-width: 768px)'); this._appMqFn = () => this.forceUpdate(); this._appMq?.addEventListener?.('change', this._appMqFn); this.forceUpdate(); if (!window.RELAY)",
      ],
      ['componentWillUnmount() { ', "componentWillUnmount() { this._appMq?.removeEventListener?.('change', this._appMqFn); "],
    ],
    vals: 'function (v) { return directoryVals.call(this, v) }',
    after: 'Component = wireDirectory(Component)',
  },

  'Relay Provider': {
    template: [['>Indicative list pricing collected by Relay. Final terms depend on volume and risk review.<', '>{{ appPricingNote }}<']],
    prelude: "import { providerVals } from '@/lib/dc/wiring'",
    vals: 'function (v) { return providerVals.call(this, v) }',
  },

  'Relay Modals': {
    template: [['>€39<', '>{{ appPrice }}<']],
    prelude: "import { PRICE } from '@/lib/site-content'",
    vals: 'function () { return { appPrice: PRICE.yearly } }',
  },

  'Relay Pricing': {
    logic: [
      ["plan('Free', '€0', 'forever', 'For founders exploring their first partners.', 'Start for free'", "plan('Free', PRICE.free, 'forever', 'For founders exploring their first partners.', LAUNCH.startFree"],
      ["plan('Pro', yr ? '€39' : '€49'", "plan('Pro', yr ? PRICE.yearly : PRICE.monthly"],
      ["false, '#')", 'false, LAUNCH.href)'],
      ["true, '#')", 'true, LAUNCH.href)'],
    ],
    template: [['>−20%<', '>−{{ appSave }}%<']],
    prelude: "import { PRICE } from '@/lib/site-content'\nimport { LAUNCH } from '@/lib/launch'",
    vals: 'function () { return { appSave: PRICE.savePct } }',
  },

  // Admin-managed website content (relay-api /api/site/content); the design's constants are the defaults.
  'Relay Changelog': { prelude: "import { cmsBind } from '@/lib/site-content'", after: "cmsBind('changelog.entries', E)" },
  'Relay Customers': {
    prelude: "import { cmsBind } from '@/lib/site-content'",
    after: "cmsBind('customers.stories', STORIES)\ncmsBind('customers.logos', LOGOS)",
  },
  'Relay Careers': { prelude: "import { cmsBind } from '@/lib/site-content'", after: "cmsBind('careers.roles', ROLES)" },

  'Relay Contact': {
    logic: [
      [
        'setTimeout(() => this.setState({ sending: false, done: true }), 900);',
        `this.setState({ apiErr: null });
        sendContact({ ...S.f, size: S.size, needs: S.needs, message: S.msg })
          .then(() => this.setState({ sending: false, done: true }))
          .catch(e => this.setState({ sending: false, apiErr: (e && e.message) || 'Could not send. Try again or email us.' }));`,
      ],
    ],
    prelude: "import { sendContact } from '@/lib/api/site'",
    vals: "function (v) { return this.state.apiErr ? { hint: this.state.apiErr, hintFg: '#ff7b7b' } : {} }",
  },


  'Relay Landing': {
    // Categories: each category gets an equal "hold" where it's fully sharp (first 60% of its
    // scroll step), then moves to the next; the last one holds like the others instead of only
    // resolving at the final pixel. Max blur is halved and starts later.
    prelude: "import { cmsBind } from '@/lib/site-content'",
    after: "cmsBind('customers.quotes', QUOTES)\ncmsBind('customers.marquee', MARQUEE)",
    // The hero preview iframe is in the server HTML, so it can finish loading before
    // React attaches onLoad; start the readiness check on mount as well.
    logic: [
      [
        'const pos2 = S.catP * (n - 1);',
        `const pos2 = (() => { const p = Math.max(0, Math.min(n - 1, S.catP * n - 0.5)), k = Math.floor(p), f = p - k; if (k >= n - 1) return n - 1; const t = f < 0.6 ? 0 : (f - 0.6) / 0.4; return k + t * t * (3 - 2 * t); })();`,
      ],
      ["blur: (Math.min(1, ad * 1.6) * 6).toFixed(2) + 'px'", "blur: (Math.max(0, Math.min(1, (ad - 0.12) * 1.6)) * 3).toFixed(2) + 'px'"],
      ['top: top + span * (i / (n - 1))', 'top: top + span * ((i + 0.8) / n)'],
      [
        'this._t5 = setTimeout(() => this.setState({ dash: true }), 6000);',
        'this._t5 = setTimeout(() => this.setState({ dash: true }), 6000); this.renderVals().dashLoaded();',
      ],
    ],
    template: [
      cta('Start for free', 'startFree'),
      link('Talk to sales', 'Relay%20Contact.dc.html'),
      [/href="#"([^>]*><span style="color:#f7f8f8;font-weight:500">New<\/span>Banks in the directory)/, 'href="Relay%20Category.dc.html?kind=bank"$1'],
      link('Read customer stories', 'Relay%20Customers.dc.html'),
    ],
  },
  // Mobile menu: close on link tap and Escape, and release the scroll lock when the page
  // changes (client-side navigation unmounts the nav while the menu is open).
  'Relay Site Nav': {
    template: [
      [/href="Relay%20Waitlist\.dc\.html"([^>]*>)Join waitlist</g, 'href="{{ launch.href }}"$1{{ launch.navCta }}<'],['<sc-if value="{{ mOpen }}">\n    <div data-r="m-show" ', '<sc-if value="{{ mOpen }}">\n    <div data-r="m-show" onClick="{{ appMenuClick }}" ']],
    logic: [
      [
        'componentWillUnmount() { window.removeEventListener(\'scroll\', this._s);',
        `componentWillUnmount() { document.removeEventListener('keydown', this._appKey); if (this.state.m) document.documentElement.style.overflow = ''; window.removeEventListener('scroll', this._s);`,
      ],
    ],
    vals: `function () {
      const close = () => { document.documentElement.style.overflow = ''; this.setState({ m: false }); };
      if (!this._appKey && typeof document !== 'undefined') {
        this._appKey = (e) => { if (e.key === 'Escape' && this.state.m) close(); };
        document.addEventListener('keydown', this._appKey);
      }
      return { appMenuClick: (e) => { if (e.target.closest && e.target.closest('a')) close(); } };
    }`,
  },
  // Latest reports: real Relay Research reports (config/reports.json, public only), each linking to its page.
  // Phones: the region tabs (413px) were wider than the screen, so the whole panel slid
  // sideways while scrolling. At <=768px only "All regions" and "Europe" stay as tabs;
  // North America and Asia-Pacific move into More with the other regions.

  'Relay Intelligence': {
    prelude: "import { cmsBind } from '@/lib/site-content'",
    after: [
      "cmsBind('intelligence.signals', SIG)",
      "cmsBind('intelligence.news', NEWS)",
      "cmsBind('intelligence.benchmarks', BENCH)",
      "cmsBind('intelligence.licenceCatalog', CAT)",
      "cmsBind('intelligence.licenceChanges', LIC, ([provider, kind, licence, reg, st, region]) => ({ provider, kind, licence, reg, st: LST[String(st).toLowerCase()] ? String(st).toLowerCase() : 'pending', region }))",
    ].join('\n'),
    template: [click('Download PDF', 'appPrint')],
    vals: "function () { return { appPrint: () => window.print() } }",
    logic: [
      ['reps = REPORTS.filter(r => inScope(r[3]))', 'reps = (this.props.realReports ?? REPORTS).filter(r => inScope(r[3]))'],
      [
        'full: e => { e.stopPropagation(); this.openFull({ tag: type,',
        'full: e => { e.stopPropagation(); if (reps[i][6]) return this.props.onOpenReport?.(reps[i][6]); this.openFull({ tag: type,',
      ],
    ],
  },

  'Relay Intelligence Page': {
    template: [
      ['<section data-screen-label="Latest reports" ', '<section id="latest-reports" data-screen-label="Latest reports" '],
      ['<a href="#" data-r="m-row" ', '<a href="{{ r.href }}" data-r="m-row" '],
    ],
    logic: [
      [
        'reports: REPORTS.filter(r => inS(r[5])).map(([kind, title, desc, type, date]) => ({ kind, title, desc, type, date }))',
        'reports: (this.props.reports ?? REPORTS.map(([kind, title, desc, type, date, scope]) => ({ kind, title, desc, type, date, scope, href: \'#\' }))).filter(r => inS(r.scope))',
      ],
    ],
  },

  'Relay Site Footer': { template: [cta('Start for free', 'startFree')] },
  'Relay Directory Page': {
    template: [cta('Explore the full directory')],
    prelude: "import { LAUNCH } from '@/lib/launch'",
    logic: [
      [
        'matching Providers. Sign up free to see the full directory.`',
        'matching Providers. ${LAUNCH.seeAll}`',
      ],
    ],
  },
  'Relay Developers': { template: [cta('Get an API key')] },
  'Relay Security': { template: [link('security@relay.gratebridge.com', 'mailto:security@relay.gratebridge.com')] },

  'Relay Settings': {
    template: [
      click('Change password', 'appChangePassword'),
      ['letter-spacing:-0.01em">Free</div>', 'letter-spacing:-0.01em">{{ appPlanName }}</div>'],
      ['>Upgrade to Relay Pro for unlimited compares, intros and market signals.<', '>{{ appPlanNote }}<'],
      ['>Last changed 3 months ago<', '>{{ appPwNote }}<'],
    ],
    prelude: "import { wireSettings, settingsVals } from '@/lib/dc/wiring'",
    vals: `function (v) {
      return { appChangePassword: () => dcNavigate('Relay%20Forgot%20Password.dc.html'), appPlanName: 'Free', appPlanNote: 'Upgrade to Relay Pro for unlimited compares, intros and market signals.', appPwNote: 'Last changed 3 months ago', ...settingsVals.call(this, v) };
    }`,
    after: 'Component = wireSettings(Component)',
    logic: [
      [
        "members: [['Sarah Mitchell', 'sarah.mitchell@relay.so', 'Admin', P('women/44')],",
        "members: [this.props.user ? [userName(this.props.user), this.props.user.email, 'Admin', userAvatar(this.props.user, P('women/44'))] : ['Sarah Mitchell', 'sarah.mitchell@relay.so', 'Admin', P('women/44')],",
      ],
    ],
  },

  'Relay Login': {
    template: [
      link('Forgot password?', 'Relay%20Forgot%20Password.dc.html'),
      ['<sc-if value="{{ hasErr }}">', '<sc-if value="{{ showErr }}">'],
      ['{{ err }}</div>', '{{ errText }}</div>'],
      [/href="Relay%20Waitlist\.dc\.html"([^>]*>)Join the waitlist</, 'href="{{ launch.href }}"$1{{ launch.loginCta }}<'],
      // The waitlisted notice is announced like an error.
      ['<sc-if value="{{ waitlisted }}"><div style=', '<sc-if value="{{ waitlisted }}"><div role="status" style='],
    ],
    logic: [
      [
        "go(kind) { this.setState({ busy: kind }); this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html?plan=pro'; }, 900); }",
        `go(kind) {
    this.setState({ busy: kind, apiErr: null, waitlisted: false });
    if (!this.props.onAuth) { this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html?plan=pro'; }, 900); return; }
    Promise.resolve(this.props.onAuth(kind, { email: this.state.email, password: this.state.pw }))
      .catch(e => e && e.code === 'WAITLISTED'
        ? this.setState({ busy: null, waitlisted: true })
        : this.setState({ busy: null, apiErr: (e && e.message) || 'Something went wrong. Try again.' }));
  }`,
      ],
      [
        "hasErr: S.tried && !(eOk && pOk), err: !eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.',",
        `hasErr: S.tried && !(eOk && pOk), err: !eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.',
      showErr: !S.waitlisted && (!!(this.props.error || S.apiErr) || (S.tried && !(eOk && pOk))), errText: S.apiErr || (S.tried && !(eOk && pOk) ? (!eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.') : this.props.error),`,
      ],
      // Demo ?state=waitlisted only without the API. Live Google waitlist lands on ?error=WAITLISTED.
      [
        "if (/[?&]state=waitlisted/.test(location.search)) this.setState({ email: 'pending@northwind.io', pw: 'password1', waitlisted: true });",
        `if (!this.props.onAuth && /[?&]state=waitlisted/.test(location.search)) this.setState({ email: 'pending@northwind.io', pw: 'password1', waitlisted: true });
    else if (this.props.onAuth && /[?&]error=WAITLISTED/.test(location.search)) {
      const em = new URLSearchParams(location.search).get('email');
      this.setState({ waitlisted: true, ...(em ? { email: em } : {}) });
    }`,
      ],
      ['if (/^pending@/i.test(S.email)) {', 'if (!this.props.onAuth && /^pending@/i.test(S.email)) {'],
      ['onEmail: e => this.setState({ email: e.target.value, waitlisted: false })', 'onEmail: e => this.setState({ email: e.target.value, waitlisted: false, apiErr: null })'],
    ],
  },

  // Reached only with an invite link while sign up is closed (middleware redirects the rest to
  // /waitlist), so the design's own redirect is dropped. `?email=` from the invite is filled in and
  // locked, and Google sign-up is hidden until launch.
  'Relay Sign Up': {
    template: [
      ['<sc-if value="{{ hasErr }}">', '<sc-if value="{{ showErr }}">'],
      ['{{ err }}</div>', '{{ errText }}</div>'],
      [
        /(<span onClick="\{\{ google \}\}"[\s\S]*?or<span style="flex:1;height:1px;background:rgba\(255,255,255,\.08\)"><\/span><\/div>)/,
        '<sc-if value="{{ launch.open }}">$1</sc-if>',
      ],
    ],
    logic: [
      [
        "if (!/[?&]open=1/.test(location.search)) { location.replace('Relay%20Waitlist.dc.html'); return; }",
        "{ const m = /[?&]email=([^&#]+)/.exec(location.search); if (m) { this._lockEmail = true; this.setState({ email: decodeURIComponent(m[1]) }); } }",
      ],
      ['onChange: e => this.setState({ [k]: e.target.value })', "onChange: e => { if (!(k === 'email' && this._lockEmail)) this.setState({ [k]: e.target.value }); }"],
      [
        "go(kind) { this.setState({ busy: kind }); this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html'; }, 1000); }",
        `go(kind) {
    this.setState({ busy: kind, apiErr: null });
    if (!this.props.onAuth) { this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html'; }, 1000); return; }
    Promise.resolve(this.props.onAuth(kind, { name: this.state.name, email: this.state.email, password: this.state.pw }))
      .catch(e => this.setState({ busy: null, apiErr: (e && e.message) || 'Something went wrong. Try again.' }));
  }`,
      ],
      [
        "hasErr: S.tried && !ok, err:",
        "showErr: !!(this.props.error || S.apiErr) || (S.tried && !ok), errText: S.apiErr || (S.tried && !ok ? (!nOk ? 'Enter your full name.' : !eOk ? 'Enter a valid work email.' : !pOk ? 'Password must be at least 8 characters.' : 'Please accept the Terms to continue.') : this.props.error), hasErr: S.tried && !ok, err:",
      ],
    ],
  },

  // Pre-launch waitlist (design/relay-handoff/WAITLIST.md). onSubmit(answers) → 'created' | 'exists'
  // comes from components/relay-app/WaitlistScreen. Adds the spec's accessibility: radiogroups with
  // arrow keys, a pressed-button group for goals, keyboard buttons, the error linked to its field and
  // announced, focus on the heading at each step, a honeypot, and opacity-only steps for reduced motion.
  'Relay Waitlist': {
    prelude: "import { track } from '@/lib/analytics'",
    template: [
      [/<div style="display:flex;gap:6px">(\s*<sc-for list="\{\{ bars \}\}")/, '<div role="progressbar" aria-label="{{ appA11y.progress }}" aria-valuemin="1" aria-valuemax="3" aria-valuenow="{{ appA11y.stepNum }}" style="display:flex;gap:6px">$1'],
      [/<h1 style="margin:0;font-size:30px;line-height:1\.1;font-weight:500;letter-spacing:-0\.035em/g, '<h1 data-wl-title tabindex="-1" style="outline:none;margin:0;font-size:30px;line-height:1.1;font-weight:500;letter-spacing:-0.035em'],
      ...['name', 'email', 'company'].map((k) => [`onChange="{{ on.${k} }}"`, `onChange="{{ on.${k} }}" aria-invalid="{{ appA11y.inv.${k} }}" aria-describedby="{{ appA11y.desc.${k} }}"`]),
      ['rows="3"', 'rows="3" maxlength="500"'],
      ...[['role', 'Your role'], ['volume', 'Monthly payment volume'], ['category', 'Most important category']].map(([k, t]) => [`color:{{ lab.${k} }}">${t}<`, `color:{{ lab.${k} }}" id="wl-${k}">${t}<`]),
      ['color:{{ lab.goals }}">What are you looking for?', 'color:{{ lab.goals }}" id="wl-goals">What are you looking for?'],
      ...[['roles', 'role', 'radiogroup'], ['volumes', 'volume', 'radiogroup'], ['cats', 'category', 'radiogroup'], ['goals', 'goals', 'group']].map(([list, k, role]) => [
        new RegExp(`<div style="([^"]*)">(\\s*<sc-for list="\\{\\{ ${list} \\}\\}")`),
        `<div role="${role}" aria-labelledby="wl-${k}" aria-describedby="{{ appA11y.desc.${k} }}"${list === 'volumes' ? ' data-wl="vol"' : ''} style="$1">$2`,
      ]),
      [/<(span|div) onClick="\{\{ (o|c)\.pick \}\}"/g, '<$1 onClick="{{ $2.pick }}" role="{{ $2.role }}" aria-checked="{{ $2.checked }}" aria-pressed="{{ $2.pressed }}" tabindex="{{ $2.tab }}" onKeyDown="{{ $2.key }}" data-wl-opt'],
      ['<div onClick="{{ c.pick }}"', '<div onClick="{{ c.pick }}" data-wl="cat"'],
      ['<div onClick="{{ toggleAgree }}"', '<div onClick="{{ toggleAgree }}" role="checkbox" aria-checked="{{ appA11y.agree }}" aria-describedby="{{ appA11y.desc.agree }}" tabindex="0" onKeyDown="{{ appA11y.agreeKey }}" data-wl-opt'],
      [
        '<sc-if value="{{ hasErr }}"><div style="',
        '<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" value="{{ appHpVal }}" onChange="{{ appHp }}" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"><sc-if value="{{ hasErr }}"><div id="wl-err" role="alert" style="',
      ],
      ...['back', 'next'].map((h) => [`<span onClick="{{ ${h} }}"`, `<span onClick="{{ ${h} }}" role="button" tabindex="0" aria-disabled="{{ appA11y.busy }}" onKeyDown="{{ appA11y.btnKey }}" data-wl-opt`]),
    ],
    logic: [
      // Demo states (?state=step2 …) only without the API.
      ['if (m) {', 'if (m && !this.props.onSubmit) {'],
      ['this._t = setTimeout(() => this.setState({ ready: true }), 60);\n    const m', "this._t = setTimeout(() => this.setState({ ready: true }), 60); track('waitlist_step_viewed', { step: 1 });\n    const m"],
      ['if (S.step < 2) return this.move(S.step + 1);', "track('waitlist_step_completed', { step: S.step + 1 }); if (S.step < 2) return this.move(S.step + 1);"],
      [
        "this._b = setTimeout(() => this.setState({ busy: false, done: /^(taken|sarah)@/i.test(S.email.trim()) ? 'dup' : 'new' }), 1100);",
        "this.submit();",
      ],
      [
        'this._s = setTimeout(() => this.setState({ step: to, tried: false, shown: true }), 180);',
        "this._s = setTimeout(() => { this.setState({ step: to, tried: false, shown: true, apiErr: null }); track('waitlist_step_viewed', { step: to + 1 }); this.focusTitle(); }, 180);",
      ],
      [
        '  move(to) {',
        `  submit() {
    const S = this.state;
    if (!this.props.onSubmit) { this._b = setTimeout(() => this.setState({ busy: false, done: /^(taken|sarah)@/i.test(S.email.trim()) ? 'dup' : 'new' }), 1100); return; }
    this.setState({ apiErr: null });
    const a = { name: S.name, email: S.email, company: S.company, role: S.role, volume: S.volume, category: S.category, goals: S.goals, notes: S.notes, hp: S.hp || '' };
    Promise.resolve(this.props.onSubmit(a))
      .then(r => { this.setState({ busy: false, done: r === 'exists' ? 'dup' : 'new' }); this.focusTitle(); })
      .catch(e => this.setState({ busy: false, apiErr: (e && e.message) || 'Something went wrong. Try again.' }));
  }
  focusTitle() { requestAnimationFrame(() => document.querySelector('[data-wl-title]')?.focus({ preventScroll: true })); }
  move(to) {`,
      ],
    ],
    vals: `function (v) {
      const S = this.state, msg = S.apiErr || v.err || null;
      const FIELD = { 'Enter your full name.': 'name', 'Enter a valid work email.': 'email', 'Enter your company name.': 'company', 'Choose your role.': 'role', 'Choose your monthly volume.': 'volume', 'Choose the category that matters most.': 'category', 'Pick at least one thing you\\u2019re looking for.': 'goals', 'Please accept the Terms to continue.': 'agree' };
      const bad = msg && FIELD[msg];
      const desc = {}, inv = {};
      for (const k of ['name', 'email', 'company', 'role', 'volume', 'category', 'goals', 'agree']) { desc[k] = bad === k ? 'wl-err' : undefined; inv[k] = bad === k; }
      const press = (e) => e.key === ' ' || e.key === 'Enter';
      // Radios: arrows move and select (roving tabindex); goals: arrows only move focus.
      const keys = (n, i, pick, select) => (e) => {
        if (press(e)) { e.preventDefault(); pick(); return; }
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const next = e.currentTarget.parentElement.children[(i + d + n) % n];
        if (next) { next.focus(); if (select) next.click(); }
      };
      const radios = (items, cur) => {
        const si = items.findIndex((o) => (o.kind ?? o.label) === cur);
        return items.map((o, i) => ({ ...o, role: 'radio', checked: i === si, tab: (si < 0 ? i === 0 : i === si) ? 0 : -1, key: keys(items.length, i, o.pick, true) }));
      };
      const reduce = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      return {
        hasErr: !!msg, err: msg,
        anim: reduce ? { op: v.anim.op, tf: 'none' } : v.anim,
        roles: radios(v.roles, S.role),
        volumes: radios(v.volumes, S.volume),
        cats: radios(v.cats, S.category),
        goals: v.goals.map((o, i) => ({ ...o, role: 'button', pressed: S.goals.includes(o.label), tab: 0, key: keys(v.goals.length, i, o.pick, false) })),
        appHpVal: S.hp || '', appHp: (e) => this.setState({ hp: e.target.value }),
        appA11y: {
          progress: 'Step ' + (S.step + 1) + ' of 3', stepNum: S.step + 1, desc, inv, agree: !!S.agree, busy: !!S.busy,
          agreeKey: (e) => { if (press(e)) { e.preventDefault(); this.setState((s) => ({ agree: !s.agree })); } },
          btnKey: (e) => { if (press(e)) { e.preventDefault(); e.currentTarget.click(); } },
        },
      };
    }`,
  },
}
