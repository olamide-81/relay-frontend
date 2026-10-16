/**
 * Pre-launch switch. While sign up is closed (the default), /signup redirects to
 * /waitlist, every sign-up CTA points at the waitlist with waitlist copy, and
 * Google sign-up is hidden. Set NEXT_PUBLIC_SIGNUP_OPEN=true at launch.
 * Invite links (`/signup?invite=…`) always open the sign-up form.
 */
export const SIGNUP_OPEN = process.env.NEXT_PUBLIC_SIGNUP_OPEN === 'true'

/** Values the ported designs read as `{{ launch.* }}` (see scripts/dc-port/patches.mjs). */
export const LAUNCH = SIGNUP_OPEN
  ? {
      open: true,
      href: 'Relay%20Sign%20Up.dc.html',
      navCta: 'Sign up',
      loginCta: 'Sign up',
      startFree: 'Start for free',
      seeAll: 'Sign up free to see them all.',
    }
  : {
      open: false,
      href: 'Relay%20Waitlist.dc.html',
      navCta: 'Join waitlist',
      loginCta: 'Join the waitlist',
      startFree: 'Join the waitlist',
      seeAll: 'Join the waitlist to see them all.',
    }
