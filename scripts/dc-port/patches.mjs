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

const SIGN_UP = 'Relay%20Sign%20Up.dc.html'

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
    prelude: "import { wireTopbar, topbarVals } from '@/lib/dc/wiring'",
    vals: 'function (v) { return topbarVals.call(this, v) }',
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
    template: [['src="https://randomuser.me/api/portraits/women/44.jpg"', 'src="{{ avatar }}"']],
    logic: [
      [
        'state = { saved: INIT, draft: INIT, flash: false, ask: false };',
        `state = { saved: withUser(INIT, this.props.user), draft: withUser(INIT, this.props.user), flash: false, ask: false };`,
      ],
    ],
    vals: "function (v) { return { avatar: userAvatar(this.props.user, 'https://randomuser.me/api/portraits/women/44.jpg'), ...profileVals.call(this, v) } }",
    prelude: `import { wireProfile, profileVals } from '@/lib/dc/wiring'
const withUser = (init, u) => u ? { ...init, name: u.name || init.name, email: u.email || init.email } : init;`,
    after: 'Component = wireProfile(Component)',
  },

  'Relay Inbox': {
    template: [
      click('View provider', 'appViewProvider'),
      [/<span (style="[^"]*" style-hover="[^"]*">\{\{ sel\.primary \}\})/, '<span onClick="{{ appPrimary }}" $1'],
    ],
    logic: [
      [/(?<!const )\bMSGS\b/g, '(this.props.app?.data.inbox ?? MSGS)'],
      ['componentDidMount() { this.read(1); }', 'componentDidMount() { if (this.state.sel != null) this.read(this.state.sel); }'],
    ],
    prelude: "import { wireInbox, inboxVals } from '@/lib/dc/wiring'",
    vals: `function (v) {
      return { appViewProvider: () => { const p = RELAY.providers.find(x => x.name === v.sel?.from); if (p) this.props.onOpenProvider?.(p.id, 'inbox'); }, ...inboxVals.call(this, v) };
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

  'Relay Directory': {
    prelude: "import { wireDirectory, directoryVals } from '@/lib/dc/wiring'",
    vals: 'function (v) { return directoryVals.call(this, v) }',
    after: 'Component = wireDirectory(Component)',
  },

  'Relay Modals': {
    template: [['>€39<', '>{{ appPrice }}<']],
    prelude: "import { PRICE } from '@/lib/site-content'",
    vals: 'function () { return { appPrice: PRICE.yearly } }',
  },

  'Relay Pricing': {
    logic: [
      ["plan('Free', '€0'", "plan('Free', PRICE.free"],
      ["plan('Pro', yr ? '€39' : '€49'", "plan('Pro', yr ? PRICE.yearly : PRICE.monthly"],
      ["false, '#')", `false, '${SIGN_UP}')`],
      ["true, '#')", `true, '${SIGN_UP}')`],
    ],
    template: [['>−20%<', '>−{{ appSave }}%<']],
    prelude: "import { PRICE } from '@/lib/site-content'",
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
    prelude: "import { cmsBind } from '@/lib/site-content'",
    after: "cmsBind('customers.quotes', QUOTES)\ncmsBind('customers.marquee', MARQUEE)",
    // The hero preview iframe is in the server HTML, so it can finish loading before
    // React attaches onLoad; start the readiness check on mount as well.
    logic: [
      [
        'this._t5 = setTimeout(() => this.setState({ dash: true }), 6000);',
        'this._t5 = setTimeout(() => this.setState({ dash: true }), 6000); this.renderVals().dashLoaded();',
      ],
    ],
    template: [
      link('Start for free', SIGN_UP),
      link('Talk to sales', 'Relay%20Contact.dc.html'),
      [/href="#"([^>]*><span style="color:#f7f8f8;font-weight:500">New<\/span>Banks in the directory)/, 'href="Relay%20Category.dc.html?kind=bank"$1'],
      link('Read customer stories', 'Relay%20Customers.dc.html'),
    ],
  },
  // Mobile menu: close on link tap and Escape, and release the scroll lock when the page
  // changes (client-side navigation unmounts the nav while the menu is open).
  'Relay Site Nav': {
    template: [['<sc-if value="{{ mOpen }}">\n    <div data-r="m-show" ', '<sc-if value="{{ mOpen }}">\n    <div data-r="m-show" onClick="{{ appMenuClick }}" ']],
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
  'Relay Intelligence': {
    prelude: "import { cmsBind } from '@/lib/site-content'",
    after: [
      "cmsBind('intelligence.signals', SIG)",
      "cmsBind('intelligence.news', NEWS)",
      "cmsBind('intelligence.benchmarks', BENCH)",
      "cmsBind('intelligence.licenceCatalog', CAT)",
      "cmsBind('intelligence.licenceChanges', LIC)",
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

  'Relay Site Footer': { template: [link('Start for free', SIGN_UP)] },
  'Relay Directory Page': { template: [link('Explore the full directory', SIGN_UP)] },
  'Relay Developers': { template: [link('Get an API key', SIGN_UP)] },
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
      link('Forgot password?', 'Relay%20Forgot%20Password.dc.html'),['<sc-if value="{{ hasErr }}">', '<sc-if value="{{ showErr }}">'], ['{{ err }}</div>', '{{ errText }}</div>']],
    logic: [
      [
        "go(kind) { this.setState({ busy: kind }); this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html?plan=pro'; }, 900); }",
        `go(kind) {
    this.setState({ busy: kind, apiErr: null });
    if (!this.props.onAuth) { this._g = setTimeout(() => { location.href = 'Relay%20Dashboard.dc.html?plan=pro'; }, 900); return; }
    Promise.resolve(this.props.onAuth(kind, { email: this.state.email, password: this.state.pw }))
      .catch(e => this.setState({ busy: null, apiErr: (e && e.message) || 'Something went wrong. Try again.' }));
  }`,
      ],
      [
        "hasErr: S.tried && !(eOk && pOk), err: !eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.',",
        `hasErr: S.tried && !(eOk && pOk), err: !eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.',
      showErr: !!(this.props.error || S.apiErr) || (S.tried && !(eOk && pOk)), errText: S.apiErr || (S.tried && !(eOk && pOk) ? (!eOk ? 'Enter a valid work email.' : 'Password must be at least 8 characters.') : this.props.error),`,
      ],
    ],
  },

  'Relay Sign Up': {
    template: [['<sc-if value="{{ hasErr }}">', '<sc-if value="{{ showErr }}">'], ['{{ err }}</div>', '{{ errText }}</div>']],
    logic: [
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
}
