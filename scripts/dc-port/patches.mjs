/**
 * Product wiring applied on top of the designs during conversion, so a fresh
 * design export can be re-converted without losing it. Each entry is
 * [find, replace]; every occurrence of `find` is replaced and it must exist in
 * the design (the converter fails otherwise, which flags design drift that
 * needs a look). `find` may also be a RegExp. `prelude` is code placed before
 * the logic class; `vals` is a function (this = logic, arg = the design's
 * renderVals result) whose returned object is merged into renderVals().
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
      ['<dc-import name="Relay Requests" ', '<dc-import name="Relay Requests" on-navigate="{{ onNavigate }}" '],
      ['<dc-import name="Relay Profile" ', '<dc-import name="Relay Profile" user="{{ user }}" '],
      ['<dc-import name="Relay Settings" ', '<dc-import name="Relay Settings" user="{{ user }}" '],
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
    ],
    logic: [
      [
        "planLabel: /[?&]plan=pro/i.test(window.location.search) ? 'Pro plan' : 'Free plan',",
        `planLabel: (this.props.plan ? this.props.plan === 'Pro' : /[?&]plan=pro/i.test(window.location.search)) ? 'Pro plan' : 'Free plan',
      userName: userName(this.props.user), avatar: userAvatar(this.props.user, 'https://randomuser.me/api/portraits/women/44.jpg'),
      logOut: () => { this.setState({ menu: null }); this.props.onLogout?.(); },`,
      ],
    ],
  },

  'Relay Overview': {
    template: [
      ['{{ greeting }}, Sarah', '{{ greeting }}, {{ firstName }}'],
      click('New shortlist', 'appNewShortlist'),
      click('Request intro', 'appRequestIntro'),
      click('Upgrade to Pro', 'appUpgrade'),
      click('Compare plans', 'appComparePlans'),
      click('View directory', 'appDirectory'),
      [/(<span) (style="font-size:12\.5px;font-weight:500;color:\{\{ c\.accent \}\}">Unlock →<\/span>)/, '$1 onClick="{{ appUpgrade }}" $2'],
    ],
    vals: `function () {
      const nav = (k, p) => () => this.props.onNavigate?.(k, p);
      return { appNewShortlist: () => this.props.onCreateList?.(), appRequestIntro: nav('requests'), appUpgrade: () => this.props.onUpgrade?.(), appComparePlans: nav('settings', { section: 'billing' }), appDirectory: nav('directory') };
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
    vals: "function () { return { avatar: userAvatar(this.props.user, 'https://randomuser.me/api/portraits/women/44.jpg') } }",
    prelude: `const withUser = (init, u) => u ? { ...init, name: u.name || init.name, email: u.email || init.email } : init;`,
  },

  'Relay Inbox': {
    template: [click('View provider', 'appViewProvider')],
    vals: `function (v) {
      return { appViewProvider: () => { const p = RELAY.providers.find(x => x.name === v.sel?.from); if (p) this.props.onOpenProvider?.(p.id, 'inbox'); } };
    }`,
  },

  'Relay Requests': {
    template: [click('Open in Inbox', 'appOpenInbox')],
    vals: "function () { return { appOpenInbox: () => this.props.onNavigate?.('inbox') } }",
  },

  'Relay Intelligence': {
    template: [click('Download PDF', 'appPrint')],
    vals: "function () { return { appPrint: () => window.print() } }",
  },

  'Relay Landing': {
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
  'Relay Site Footer': { template: [link('Start for free', SIGN_UP)] },
  'Relay Directory Page': { template: [link('Explore the full directory', SIGN_UP)] },
  'Relay Developers': { template: [link('Get an API key', SIGN_UP)] },
  'Relay Security': { template: [link('security@relay.gratebridge.com', 'mailto:security@relay.gratebridge.com')] },

  'Relay Settings': {
    template: [click('Change password', 'appChangePassword')],
    vals: "function () { return { appChangePassword: () => dcNavigate('Relay%20Forgot%20Password.dc.html') } }",
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
