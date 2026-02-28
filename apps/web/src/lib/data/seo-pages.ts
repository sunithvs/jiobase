// ============================================================
// SEO Pages Data - Central data store for programmatic pages
// ============================================================

// === Types ===

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedPage {
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeColor: string;
}

export interface IspPageData {
  type: 'isp';
  slug: string;
  name: string;
  shortName: string;
  subscribers: string;
  networkTypes: string[];
  blockConfirmed: boolean;
  blockType: string;
  servicesBlocked: string[];
  dnsWorkaroundWorks: boolean;
  whatHappened: string;
  howTheyBlock: string;
  diagnosticCommand: string;
  additionalNotes: string;
  faqs: FaqItem[];
  relatedPages: RelatedPage[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface ErrorPageData {
  type: 'error';
  slug: string;
  errorCode: string;
  displayName: string;
  whatItMeans: string;
  whyItHappens: string;
  diagnosticSteps: { step: string; command: string; expected: string }[];
  faqs: FaqItem[];
  relatedPages: RelatedPage[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface FeaturePageData {
  type: 'feature';
  slug: string;
  featureName: string;
  shortName: string;
  supabasePath: string;
  whatBreaks: string;
  userImpact: string;
  codeExample: string;
  codeFilename: string;
  faqs: FaqItem[];
  relatedPages: RelatedPage[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface FrameworkPageData {
  slug: string;
  name: string;
  shortName: string;
  language: string;
  envPrefix: string;
  initFile: string;
  envFile: string;
  codeBefore: string;
  codeAfter: string;
  packageManager: string;
  additionalSteps: string[];
  faqs: FaqItem[];
  relatedGuides: RelatedPage[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export type FixPageData = IspPageData | ErrorPageData | FeaturePageData;

// === ISP Pages Data ===

export const ISP_PAGES: IspPageData[] = [
  {
    type: 'isp',
    slug: 'jio',
    name: 'Reliance Jio',
    shortName: 'Jio',
    subscribers: '500M+',
    networkTypes: ['4G mobile data', '5G mobile data', 'JioFiber broadband'],
    blockConfirmed: true,
    blockType: 'DNS poisoning with possible DPI',
    servicesBlocked: ['*.supabase.co (all Supabase services)'],
    dnsWorkaroundWorks: true,
    whatHappened: 'Reliance Jio, India\'s largest telecom operator with over 500 million subscribers, began DNS-blocking all *.supabase.co domains in February 2026. The block was issued under Section 69A of the IT Act through a government ministry order. Jio\'s DNS resolvers return a sinkhole IP (49.44.79.236) instead of the actual Supabase AWS servers, making all Supabase API calls fail silently. This affects every Jio user - both mobile data and JioFiber broadband customers.',
    howTheyBlock: 'Jio uses DNS poisoning as the primary blocking mechanism. When a Jio user\'s device queries *.supabase.co, Jio\'s internal DNS resolvers return a Jio-owned IP address instead of the real Supabase server IP. This causes all HTTP and WebSocket connections to time out. Some users report that changing DNS to 1.1.1.1 or 8.8.8.8 restores access for development, but this does not fix the issue for your end users who are on Jio\'s default DNS. There are also reports of deep packet inspection (DPI) being used alongside DNS poisoning on some Jio networks.',
    diagnosticCommand: '# Check if Jio is blocking Supabase DNS\nnslookup your-project.supabase.co\n# If blocked: returns 49.44.79.236 (Jio sinkhole)\n# If working: returns an AWS IP like 13.233.x.x\n\n# Compare with Google DNS\nnslookup your-project.supabase.co 8.8.8.8\n# Should return the real AWS IP\n\n# Test HTTP connectivity\ncurl -I https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY"',
    additionalNotes: 'Jio is the most impactful block because it serves the largest subscriber base in India. If your app serves Indian users, there is a very high probability that a significant portion of your users are on Jio. The block affects both JioFiber broadband and Jio mobile data connections.',
    faqs: [
      {
        question: 'Is Supabase blocked on all Jio connections?',
        answer: 'Yes. The block affects Jio 4G/5G mobile data and JioFiber broadband connections across India. Some regions may experience the block at different times due to how Jio rolls out DNS changes, but as of February 2026, the block is confirmed nationwide.'
      },
      {
        question: 'Will changing DNS to 1.1.1.1 fix it for my users?',
        answer: 'No. Changing DNS only fixes it on your own device for development purposes. Your end users on Jio will still be using Jio\'s default DNS resolvers and will not be able to reach *.supabase.co. You need a reverse proxy that routes traffic through an unblocked domain.'
      },
      {
        question: 'Does the Jio block affect Supabase Realtime/WebSockets?',
        answer: 'Yes. The DNS block affects all traffic to *.supabase.co, including REST API, Auth, Storage, Realtime WebSocket connections, and Edge Functions. Everything that connects to the supabase.co domain is blocked.'
      },
      {
        question: 'How quickly can I fix my Jio-blocked app?',
        answer: 'With JioBase, you can fix it in under 5 minutes. Create a free account at jiobase.com/register, set up a proxy app, and swap your Supabase URL - one line of code. Your Jio users will be able to access your app immediately.'
      }
    ],
    relatedPages: [
      { title: 'Fix on Airtel', description: 'Supabase is also blocked on Airtel networks', href: '/fix/airtel', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Fix on ACT Fibernet', description: 'ACT Fibernet users are affected too', href: '/fix/act', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'ERR_CONNECTION_TIMED_OUT', description: 'Understand the timeout error you see', href: '/fix/err-connection-timed-out', badge: 'Error', badgeColor: 'red' },
      { title: 'Full fix guide', description: 'Detailed blog post on the Supabase block', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'blue' }
    ],
    metaTitle: 'Supabase Blocked on Jio - Fix It in 5 Minutes | JioBase',
    metaDescription: 'Supabase is DNS-blocked on Reliance Jio (4G, 5G, JioFiber). Fix your app for 500M+ Jio users with a one-line proxy change. No VPN needed.',
    metaKeywords: 'supabase blocked jio, supabase jio fix, supabase not working jio, jiofiber supabase blocked, supabase dns block jio'
  },
  {
    type: 'isp',
    slug: 'airtel',
    name: 'Bharti Airtel',
    shortName: 'Airtel',
    subscribers: '380M+',
    networkTypes: ['4G mobile data', '5G mobile data', 'Airtel Xstream Fiber broadband'],
    blockConfirmed: true,
    blockType: 'DNS poisoning',
    servicesBlocked: ['*.supabase.co (all Supabase services)'],
    dnsWorkaroundWorks: true,
    whatHappened: 'Bharti Airtel, India\'s second-largest telecom operator, joined the Supabase block following the same government ministry order under Section 69A. Airtel\'s DNS resolvers redirect *.supabase.co queries to incorrect IPs, causing connection timeouts for all Supabase API calls. This affects Airtel\'s 380 million+ subscribers across both mobile data and broadband connections.',
    howTheyBlock: 'Airtel implements the block through DNS poisoning. Their DNS resolvers return incorrect IP addresses for *.supabase.co domains, preventing connections from reaching Supabase\'s actual servers. Unlike Jio, Airtel has not been reported to use deep packet inspection - switching to an alternative DNS like Google (8.8.8.8) or Cloudflare (1.1.1.1) typically restores access on individual devices for development.',
    diagnosticCommand: '# Check if Airtel is blocking Supabase DNS\nnslookup your-project.supabase.co\n# If blocked: returns incorrect IP\n# If working: returns AWS IP\n\n# Test with Google DNS\nnslookup your-project.supabase.co 8.8.8.8\n\n# Test HTTP connectivity\ncurl -m 5 https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY" 2>&1 | head -5',
    additionalNotes: 'Airtel is India\'s second-largest ISP. Combined with Jio, the block affects over 880 million internet subscribers. If your app targets the Indian market, you cannot rely on *.supabase.co being accessible.',
    faqs: [
      {
        question: 'Is Supabase blocked on Airtel broadband and mobile?',
        answer: 'Yes. Both Airtel mobile data (4G/5G) and Airtel Xstream Fiber broadband connections are affected. The DNS poisoning is applied at the network level, so all connection types are impacted.'
      },
      {
        question: 'Does changing DNS fix Supabase on Airtel?',
        answer: 'For your own device (development), yes - switching to Google DNS (8.8.8.8) or Cloudflare (1.1.1.1) typically works on Airtel. But this does not fix the problem for your end users. They will still be on Airtel\'s default DNS. You need a reverse proxy solution.'
      },
      {
        question: 'Is Airtel also blocking Firebase?',
        answer: 'As of February 2026, Firebase is not blocked on Airtel. The Firebase block is primarily on BSNL networks. However, this could change at any time - the same Section 69A mechanism could be used to block any domain on any ISP.'
      }
    ],
    relatedPages: [
      { title: 'Fix on Jio', description: 'Jio is the largest affected ISP', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Fix on BSNL', description: 'BSNL has separate Firebase blocks', href: '/fix/bsnl', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Test if blocked', description: 'Diagnose ISP blocks step by step', href: '/blog/test-if-backend-blocked-india', badge: 'Blog', badgeColor: 'blue' },
      { title: 'Proxy tutorial', description: 'Build your own Cloudflare Worker proxy', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' }
    ],
    metaTitle: 'Supabase Blocked on Airtel - Fix It in 5 Minutes | JioBase',
    metaDescription: 'Supabase is DNS-blocked on Bharti Airtel (mobile and broadband). Fix your app for 380M+ Airtel users with a one-line proxy change.',
    metaKeywords: 'supabase blocked airtel, supabase airtel fix, supabase not working airtel, airtel supabase dns block'
  },
  {
    type: 'isp',
    slug: 'bsnl',
    name: 'BSNL',
    shortName: 'BSNL',
    subscribers: '100M+',
    networkTypes: ['Bharat Fiber broadband', 'Mobile data', 'FTTH'],
    blockConfirmed: true,
    blockType: 'DNS poisoning',
    servicesBlocked: ['*.supabase.co (Supabase)', 'Some Firebase endpoints'],
    dnsWorkaroundWorks: true,
    whatHappened: 'BSNL, India\'s state-owned telecom operator, has a history of blocking developer platforms. In August 2025, BSNL blocked several developer tools including raw GitHub content, certain Firebase endpoints, and other SaaS APIs. BSNL has also implemented the Supabase block following the ministry order. Additionally, BSNL is the primary ISP where Firebase services are blocked, making it the only major ISP where both Firebase and Supabase are unreachable.',
    howTheyBlock: 'BSNL uses DNS poisoning similar to other ISPs. Their resolvers return incorrect addresses for blocked domains. BSNL\'s blocking has historically been inconsistent across regions - users in some cities may have access while others do not. Switching DNS typically restores access for development purposes.',
    diagnosticCommand: '# Check BSNL DNS resolution\nnslookup your-project.supabase.co\n\n# Test with Cloudflare DNS\nnslookup your-project.supabase.co 1.1.1.1\n\n# Also test Firebase (blocked on BSNL)\nnslookup firebaseio.com\nnslookup firebaseio.com 1.1.1.1',
    additionalNotes: 'BSNL is the only major Indian ISP where both Supabase AND Firebase are blocked. If your app uses either backend and serves BSNL users, a proxy is essential. BSNL\'s blocking is often inconsistent across regions.',
    faqs: [
      {
        question: 'Is both Firebase and Supabase blocked on BSNL?',
        answer: 'Yes. BSNL is unique in blocking both platforms. Firebase endpoints have been blocked since August 2025, and Supabase was added to the block list in February 2026. This makes BSNL the most restrictive ISP for developers using BaaS platforms.'
      },
      {
        question: 'Why does BSNL block more services than other ISPs?',
        answer: 'As a government-owned telecom operator, BSNL tends to implement blocking orders more aggressively. BSNL was also the first ISP to block several developer tools in August 2025, including raw GitHub content and Telegram-related domains.'
      },
      {
        question: 'Can JioBase fix both Firebase and Supabase on BSNL?',
        answer: 'JioBase is specifically designed for Supabase proxying - it handles REST, Auth, Storage, Realtime, and Edge Functions. For Firebase, you would need a separate Cloudflare Worker proxy. Our Worker Generator Tool can help you get started with a DIY proxy for Firebase.'
      }
    ],
    relatedPages: [
      { title: 'Firebase + Supabase crisis', description: 'Both backends blocked in India', href: '/blog/firebase-supabase-blocked-india', badge: 'Blog', badgeColor: 'red' },
      { title: 'Fix on Jio', description: 'Largest affected ISP', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Supabase alternatives', description: 'Compare backend options', href: '/blog/supabase-alternatives-india', badge: 'Comparison', badgeColor: 'purple' },
      { title: 'DIY Worker proxy', description: 'Build your own proxy', href: '/tools/worker-generator', badge: 'Tool', badgeColor: 'amber' }
    ],
    metaTitle: 'Supabase & Firebase Blocked on BSNL - Fix Both | JioBase',
    metaDescription: 'BSNL blocks both Supabase and Firebase. Fix your app for BSNL users with a reverse proxy. Works for all BSNL connections - Bharat Fiber, mobile, FTTH.',
    metaKeywords: 'supabase blocked bsnl, firebase blocked bsnl, bsnl blocking developer tools, bsnl supabase fix'
  },
  {
    type: 'isp',
    slug: 'act',
    name: 'ACT Fibernet',
    shortName: 'ACT',
    subscribers: '2M+',
    networkTypes: ['Fiber broadband'],
    blockConfirmed: true,
    blockType: 'DNS poisoning',
    servicesBlocked: ['*.supabase.co (all Supabase services)'],
    dnsWorkaroundWorks: true,
    whatHappened: 'ACT Fibernet, a popular broadband provider in major Indian cities like Bengaluru, Hyderabad, Chennai, and Delhi, confirmed the Supabase block following the ministry order. However, the block has been inconsistent - TechCrunch verified that supabase.co was inaccessible on ACT in Delhi but some users in Bengaluru reported it still worked. This inconsistency is typical of how Indian ISPs implement blocking orders.',
    howTheyBlock: 'ACT Fibernet uses DNS-level blocking. Their DNS resolvers intercept queries for *.supabase.co and return incorrect results. The implementation appears to be region-dependent, with some ACT networks implementing the block before others.',
    diagnosticCommand: '# Check ACT Fibernet DNS\nnslookup your-project.supabase.co\n\n# Compare with Cloudflare DNS\nnslookup your-project.supabase.co 1.1.1.1\n\n# Quick HTTP test\ncurl -m 5 -s -o /dev/null -w "%{http_code}" \\\n  https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY"',
    additionalNotes: 'ACT Fibernet is popular among tech professionals and developers in Tier-1 cities. The inconsistent blocking means your app may work for some ACT users but not others, making it especially frustrating to debug.',
    faqs: [
      {
        question: 'Is Supabase blocked on all ACT Fibernet connections?',
        answer: 'The block is inconsistent across ACT regions. Users in Delhi and some other cities have confirmed the block, while some users in Bengaluru reported intermittent access. If your app serves ACT users, you should assume the block can appear at any time in any region.'
      },
      {
        question: 'Does ACT Fibernet block Firebase too?',
        answer: 'No. As of February 2026, Firebase works on ACT Fibernet. The Firebase block is primarily on BSNL. However, given ACT\'s compliance with the Supabase ministry order, future blocking of other services is possible.'
      },
      {
        question: 'My Supabase app works on ACT but my users say it does not. Why?',
        answer: 'ACT\'s block rollout is region-dependent. Your ACT connection may not be affected yet while your users in a different city are blocked. Always test from multiple networks and consider adding a proxy proactively.'
      }
    ],
    relatedPages: [
      { title: 'Fix on Jio', description: 'Block confirmed on India\'s largest ISP', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Fix on Airtel', description: 'Block confirmed on Airtel too', href: '/fix/airtel', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Test if blocked', description: 'Step-by-step ISP block diagnosis', href: '/blog/test-if-backend-blocked-india', badge: 'Guide', badgeColor: 'blue' },
      { title: 'India status', description: 'Check live block status', href: '/india-status', badge: 'Status', badgeColor: 'amber' }
    ],
    metaTitle: 'Supabase Blocked on ACT Fibernet - How to Fix | JioBase',
    metaDescription: 'ACT Fibernet is blocking Supabase in some Indian cities. Fix your app for ACT users with a one-line proxy change. No VPN needed.',
    metaKeywords: 'supabase blocked act fibernet, act fibernet supabase fix, supabase not working act broadband'
  },
  {
    type: 'isp',
    slug: 'vodafone-idea',
    name: 'Vodafone Idea (Vi)',
    shortName: 'Vi',
    subscribers: '230M+',
    networkTypes: ['4G mobile data', 'Vi-Fi broadband'],
    blockConfirmed: false,
    blockType: 'Potential DNS blocking - unconfirmed',
    servicesBlocked: ['*.supabase.co (reports vary)'],
    dnsWorkaroundWorks: true,
    whatHappened: 'Vodafone Idea (now branded as Vi) has not been officially confirmed as blocking Supabase. However, given that the ministry order applies to all ISPs licensed in India, Vi may implement the block at any time. Some users have reported intermittent access issues on Vi networks, but these have not been consistently reproduced.',
    howTheyBlock: 'If Vi implements the block, it would likely use DNS poisoning similar to Jio and Airtel. Vi has historically been slower to implement blocking orders compared to larger ISPs.',
    diagnosticCommand: '# Test Vi DNS resolution\nnslookup your-project.supabase.co\n\n# Compare with public DNS\nnslookup your-project.supabase.co 8.8.8.8\n\n# Test connectivity\ncurl -m 10 https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY" -v 2>&1 | grep -i "connect"',
    additionalNotes: 'Even if Vi has not yet implemented the block, proactively adding a proxy protects your app against the possibility. The ministry order applies to all ISPs, so it is a matter of when, not if.',
    faqs: [
      {
        question: 'Is Supabase definitely blocked on Vi?',
        answer: 'As of February 2026, the block on Vi is not confirmed. However, the government ministry order applies to all Indian ISPs. Vi may implement the block at any time. Proactively adding a proxy is the safest approach.'
      },
      {
        question: 'Should I add a proxy even if Vi is not blocking yet?',
        answer: 'Yes. The ministry order under Section 69A applies to all ISPs. Even if Vi has not implemented it yet, they may at any time. Adding a proxy now means zero downtime if and when the block is enforced. JioBase is free to set up and takes 5 minutes.'
      },
      {
        question: 'My Vi users say the app works fine. Should I still worry?',
        answer: 'If your app also serves users on Jio, Airtel, ACT, or BSNL, those users are already blocked. Even if Vi works today, a single ISP implementing the block means a significant portion of your user base cannot access your app.'
      }
    ],
    relatedPages: [
      { title: 'Fix on Jio', description: 'Block confirmed on Jio', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Fix on Airtel', description: 'Block confirmed on Airtel', href: '/fix/airtel', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Why you need a proxy', description: 'The case for proxy infrastructure', href: '/blog/why-indian-developers-need-supabase-proxy', badge: 'Blog', badgeColor: 'amber' },
      { title: 'India status', description: 'Check current block status', href: '/india-status', badge: 'Status', badgeColor: 'amber' }
    ],
    metaTitle: 'Supabase on Vodafone Idea (Vi) - Block Status & Fix | JioBase',
    metaDescription: 'Is Supabase blocked on Vodafone Idea (Vi)? Check status and proactively protect your app with a reverse proxy. Free setup, no VPN needed.',
    metaKeywords: 'supabase vodafone idea, supabase vi blocked, supabase vi india, vodafone idea supabase fix'
  }
];

// === Error Pages Data ===

export const ERROR_PAGES: ErrorPageData[] = [
  {
    type: 'error',
    slug: 'err-connection-timed-out',
    errorCode: 'ERR_CONNECTION_TIMED_OUT',
    displayName: 'ERR_CONNECTION_TIMED_OUT',
    whatItMeans: 'ERR_CONNECTION_TIMED_OUT means your browser tried to connect to a server but the server did not respond within the timeout period. The connection attempt was made but no response was received. This is different from a DNS error - it means the DNS resolved to an IP address, but that IP address is either unreachable or intentionally dropping connections.',
    whyItHappens: 'In India, this error appears when your ISP (Jio, Airtel, ACT) DNS-poisons *.supabase.co domains. Instead of returning the real Supabase server IP, your ISP\'s DNS returns a sinkhole IP - an address that either does not exist or intentionally drops all connections. Your browser resolves the domain to this sinkhole IP and tries to connect, but the connection hangs until it times out. This is why the error appears after a long delay (usually 10-30 seconds) rather than immediately.',
    diagnosticSteps: [
      {
        step: 'Check DNS resolution',
        command: 'nslookup your-project.supabase.co',
        expected: 'If blocked: returns an ISP-owned IP (e.g., 49.44.79.236 for Jio). If working: returns an AWS IP like 13.233.x.x'
      },
      {
        step: 'Compare with public DNS',
        command: 'nslookup your-project.supabase.co 8.8.8.8',
        expected: 'Should return the real Supabase IP (AWS). If this differs from step 1, your ISP is DNS-poisoning.'
      },
      {
        step: 'Test with curl and timeout',
        command: 'curl -m 5 -v https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY" 2>&1',
        expected: 'If blocked: "Connection timed out after 5000 milliseconds". If working: HTTP 200 with JSON response.'
      },
      {
        step: 'Test on a different network',
        command: '# Disconnect WiFi, use mobile data from a different ISP\n# Or use a VPN like Cloudflare WARP\ncurl -m 5 https://your-project.supabase.co/rest/v1/ \\\n  -H "apikey: YOUR_ANON_KEY"',
        expected: 'If the request succeeds on a different network, the issue is ISP-specific DNS blocking.'
      }
    ],
    faqs: [
      {
        question: 'Why does my Supabase app show ERR_CONNECTION_TIMED_OUT only in India?',
        answer: 'Indian ISPs (Jio, Airtel, ACT, BSNL) are DNS-blocking *.supabase.co following a government ministry order under Section 69A. The DNS poisoning causes your browser to connect to a sinkhole IP that never responds, resulting in a connection timeout. Supabase infrastructure is fully operational - the block is at the ISP level.'
      },
      {
        question: 'Can I fix ERR_CONNECTION_TIMED_OUT by changing my DNS?',
        answer: 'On your own device, yes - switching to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) bypasses the poisoned DNS and restores access for development. But your end users on these ISPs will still see the error. For a production fix, you need a reverse proxy like JioBase that routes traffic through an unblocked domain.'
      },
      {
        question: 'Is ERR_CONNECTION_TIMED_OUT the same as ERR_NAME_NOT_RESOLVED?',
        answer: 'No. ERR_NAME_NOT_RESOLVED means DNS could not find any IP for the domain at all. ERR_CONNECTION_TIMED_OUT means DNS returned an IP, but that IP did not respond. In the Indian ISP blocking case, you typically see ERR_CONNECTION_TIMED_OUT because the DNS returns a sinkhole IP that silently drops connections.'
      }
    ],
    relatedPages: [
      { title: 'Fix on Jio', description: 'Most common ISP causing this error', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'DNS_PROBE_FINISHED_NXDOMAIN', description: 'Another common error from the block', href: '/fix/dns-probe-finished-nxdomain', badge: 'Error', badgeColor: 'red' },
      { title: 'Test if blocked', description: 'Full diagnostic guide', href: '/blog/test-if-backend-blocked-india', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full fix guide', description: 'Complete Supabase block fix', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase ERR_CONNECTION_TIMED_OUT in India - Fix | JioBase',
    metaDescription: 'Getting ERR_CONNECTION_TIMED_OUT with Supabase in India? Your ISP is DNS-blocking supabase.co. Here is why it happens and how to fix it in 5 minutes.',
    metaKeywords: 'supabase ERR_CONNECTION_TIMED_OUT, supabase connection timed out india, supabase timeout jio, supabase not connecting india'
  },
  {
    type: 'error',
    slug: 'dns-probe-finished-nxdomain',
    errorCode: 'DNS_PROBE_FINISHED_NXDOMAIN',
    displayName: 'DNS_PROBE_FINISHED_NXDOMAIN',
    whatItMeans: 'DNS_PROBE_FINISHED_NXDOMAIN means your browser asked the DNS server to look up a domain name and the DNS server responded that the domain does not exist (NXDOMAIN = Non-Existent Domain). This is an immediate failure - your browser does not even attempt to connect because the DNS lookup failed entirely.',
    whyItHappens: 'Some Indian ISPs implement the Supabase block by returning NXDOMAIN instead of a sinkhole IP. When the ISP\'s DNS resolver receives a query for *.supabase.co, it responds with "this domain does not exist" rather than forwarding the query to upstream DNS servers. This causes your browser to show DNS_PROBE_FINISHED_NXDOMAIN immediately, without the long timeout you would see with connection-based blocking.',
    diagnosticSteps: [
      {
        step: 'Verify the domain exists',
        command: 'nslookup your-project.supabase.co 8.8.8.8',
        expected: 'If the domain exists (it should), you will get a valid IP. This confirms the domain is real and your ISP is lying.'
      },
      {
        step: 'Check your ISP DNS',
        command: 'nslookup your-project.supabase.co',
        expected: 'If your ISP is blocking: "** server can not find your-project.supabase.co: NXDOMAIN" or similar error.'
      },
      {
        step: 'Try Cloudflare DNS',
        command: 'nslookup your-project.supabase.co 1.1.1.1',
        expected: 'Should return a valid IP, confirming the block is ISP-specific.'
      }
    ],
    faqs: [
      {
        question: 'Does DNS_PROBE_FINISHED_NXDOMAIN mean Supabase is down?',
        answer: 'No. Supabase is fully operational. The NXDOMAIN error means your ISP\'s DNS is falsely reporting that the domain does not exist. You can verify this by using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) - the domain resolves correctly on public DNS.'
      },
      {
        question: 'Why do I see this error instead of ERR_CONNECTION_TIMED_OUT?',
        answer: 'Different ISPs implement the block differently. Some return a sinkhole IP (causing timeout), while others return NXDOMAIN (causing this error). Both are DNS-level blocks. The fix is the same - use a reverse proxy to route traffic through an unblocked domain.'
      },
      {
        question: 'Can clearing browser cache fix this?',
        answer: 'No. The error comes from your ISP\'s DNS resolver, not your browser cache. Clearing cache, cookies, or restarting your browser will not help. You need to either change your DNS for development or use a proxy for production.'
      }
    ],
    relatedPages: [
      { title: 'ERR_CONNECTION_TIMED_OUT', description: 'The other common error from ISP blocking', href: '/fix/err-connection-timed-out', badge: 'Error', badgeColor: 'red' },
      { title: 'Fix on Jio', description: 'Most impactful ISP block', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Fix on Airtel', description: 'Block on Airtel networks', href: '/fix/airtel', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Full fix guide', description: 'Complete Supabase block fix', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase DNS_PROBE_FINISHED_NXDOMAIN in India - Fix | JioBase',
    metaDescription: 'Getting DNS_PROBE_FINISHED_NXDOMAIN with Supabase in India? Your ISP is blocking the domain. Here is what it means and how to fix it.',
    metaKeywords: 'supabase DNS_PROBE_FINISHED_NXDOMAIN, supabase nxdomain india, supabase dns error india, supabase domain not found india'
  },
  {
    type: 'error',
    slug: 'err-name-not-resolved',
    errorCode: 'ERR_NAME_NOT_RESOLVED',
    displayName: 'ERR_NAME_NOT_RESOLVED',
    whatItMeans: 'ERR_NAME_NOT_RESOLVED means your device could not translate the domain name (e.g., your-project.supabase.co) into an IP address. This is similar to DNS_PROBE_FINISHED_NXDOMAIN but may appear on different browsers or operating systems. The underlying cause is the same - the DNS lookup failed.',
    whyItHappens: 'Indian ISPs blocking *.supabase.co can cause this error when their DNS resolvers either return NXDOMAIN, fail to respond, or return SERVFAIL for Supabase domains. The exact error message varies by browser (Chrome shows ERR_NAME_NOT_RESOLVED, Firefox shows "Hmm. We are having trouble finding that site.") but the root cause is identical - ISP-level DNS blocking.',
    diagnosticSteps: [
      {
        step: 'Test DNS with nslookup',
        command: 'nslookup your-project.supabase.co',
        expected: 'If blocked: error message or incorrect IP. If working: valid AWS IP.'
      },
      {
        step: 'Test with alternative DNS',
        command: 'nslookup your-project.supabase.co 1.1.1.1',
        expected: 'Should return valid IP, confirming ISP block.'
      },
      {
        step: 'Flush DNS cache and retry',
        command: '# Windows\nipconfig /flushdns\n\n# macOS\nsudo dscacheutil -flushcache\n\n# Linux\nsudo systemd-resolve --flush-caches',
        expected: 'If the error persists after flushing, it confirms the ISP is actively blocking (not a stale cache).'
      }
    ],
    faqs: [
      {
        question: 'Is ERR_NAME_NOT_RESOLVED the same as DNS_PROBE_FINISHED_NXDOMAIN?',
        answer: 'Essentially yes. Both mean your device cannot resolve the domain name to an IP address. Different browsers and operating systems display different error messages for the same underlying DNS failure. The fix is identical.'
      },
      {
        question: 'I see this error on my phone but not on my laptop. Why?',
        answer: 'Your phone and laptop may be using different DNS servers. If your laptop has been configured to use Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1), it bypasses the ISP block. Your phone on mobile data uses the ISP\'s default DNS, which is blocking supabase.co.'
      }
    ],
    relatedPages: [
      { title: 'ERR_CONNECTION_TIMED_OUT', description: 'Another common error variant', href: '/fix/err-connection-timed-out', badge: 'Error', badgeColor: 'red' },
      { title: 'DNS_PROBE_FINISHED_NXDOMAIN', description: 'Similar DNS resolution error', href: '/fix/dns-probe-finished-nxdomain', badge: 'Error', badgeColor: 'red' },
      { title: 'Test if blocked', description: 'Full diagnostic guide', href: '/blog/test-if-backend-blocked-india', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Quick Jio fix', description: 'Fix for the most common ISP', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase ERR_NAME_NOT_RESOLVED in India - Fix | JioBase',
    metaDescription: 'Getting ERR_NAME_NOT_RESOLVED with Supabase in India? Your ISP is blocking DNS for supabase.co. Here is how to fix it for your users.',
    metaKeywords: 'supabase ERR_NAME_NOT_RESOLVED, supabase name not resolved india, supabase dns failure india'
  }
];

// === Feature Pages Data ===

export const FEATURE_PAGES: FeaturePageData[] = [
  {
    type: 'feature',
    slug: 'auth-blocked',
    featureName: 'Supabase Auth',
    shortName: 'Auth',
    supabasePath: '/auth/v1/',
    whatBreaks: 'When your ISP blocks *.supabase.co, all Supabase Auth endpoints become unreachable. This means sign up, sign in, password reset, magic links, OAuth flows (Google, GitHub, etc.), session refresh, and token verification all fail. Users see infinite loading spinners, "network error" messages, or get silently logged out. Auth cookies and JWTs may still be valid locally, but any server-side verification or token refresh fails.',
    userImpact: 'Authentication is typically the first thing a user interacts with. If Auth is blocked, new users cannot create accounts, existing users cannot log in, active sessions eventually expire without refresh, and OAuth redirects fail because the callback URL points to a blocked domain. This is a complete app lockout for affected ISP users.',
    codeExample: `import { createClient } from '@supabase/supabase-js'

// Before (blocked on Indian ISPs):
// const supabase = createClient('https://xyz.supabase.co', 'your-anon-key')

// After (proxied through JioBase):
const supabase = createClient('https://myapp.jiobase.com', 'your-anon-key')

// Auth works exactly the same - no code changes needed:
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})`,
    codeFilename: 'lib/supabase.ts',
    faqs: [
      {
        question: 'Will my existing user sessions break?',
        answer: 'Active sessions with valid JWTs will continue to work until they expire. However, token refresh will fail because it requires calling the Auth endpoint. Once the JWT expires (default: 1 hour), users will be logged out and cannot log back in. Fix the block before sessions expire.'
      },
      {
        question: 'Does OAuth (Google, GitHub login) work through the proxy?',
        answer: 'Yes. JioBase proxies all Auth endpoints including OAuth callbacks. You do not need to change your OAuth provider settings. The proxy transparently handles the redirect flow. Just swap the Supabase URL in your client code.'
      },
      {
        question: 'Do I need to change my Supabase anon key?',
        answer: 'No. Your anon key stays exactly the same. The proxy forwards all headers including the apikey. Your RLS policies, auth settings, and database rules are completely unaffected.'
      }
    ],
    relatedPages: [
      { title: 'Storage blocked', description: 'File uploads also fail', href: '/fix/storage-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Realtime blocked', description: 'WebSocket subscriptions fail', href: '/fix/realtime-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Fix on Jio', description: 'Most common ISP causing this', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' },
      { title: 'Full fix guide', description: 'Complete Supabase block fix', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase Auth Not Working in India - Fix Login Issues | JioBase',
    metaDescription: 'Supabase Auth blocked in India? Sign up, login, OAuth, and session refresh all fail due to ISP DNS blocking. Fix it in 5 minutes with a proxy.',
    metaKeywords: 'supabase auth not working india, supabase login blocked india, supabase oauth india fix, supabase sign in error india'
  },
  {
    type: 'feature',
    slug: 'storage-blocked',
    featureName: 'Supabase Storage',
    shortName: 'Storage',
    supabasePath: '/storage/v1/',
    whatBreaks: 'The ISP block on *.supabase.co prevents all Supabase Storage operations. File uploads fail, file downloads time out, signed URLs cannot be generated, bucket listing returns errors, and image transformations are unreachable. Any feature in your app that depends on file storage - profile pictures, document uploads, media galleries - breaks completely.',
    userImpact: 'Users experience broken images (placeholder icons where photos should be), failed file uploads with no clear error message, download links that hang indefinitely, and media-heavy pages that load without any media content. Apps that rely heavily on Storage (like file-sharing tools or social platforms) become essentially unusable.',
    codeExample: `import { createClient } from '@supabase/supabase-js'

// Proxied through JioBase - Storage works identically:
const supabase = createClient('https://myapp.jiobase.com', 'your-anon-key')

// Upload a file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('user-123/photo.jpg', file)

// Get a signed URL
const { data: url } = await supabase.storage
  .from('avatars')
  .createSignedUrl('user-123/photo.jpg', 3600)`,
    codeFilename: 'lib/storage.ts',
    faqs: [
      {
        question: 'Will large file uploads work through the proxy?',
        answer: 'Yes. JioBase streams request and response bodies, so file uploads of any size work through the proxy. Cloudflare Workers handle streaming efficiently without buffering the entire file in memory.'
      },
      {
        question: 'Do signed URLs generated through the proxy work?',
        answer: 'Yes. Signed URLs are generated server-side by Supabase and returned through the proxy. The URLs themselves point to your proxy domain, so they remain accessible to your users on blocked ISPs.'
      },
      {
        question: 'Will image transformations work?',
        answer: 'Yes. Supabase Storage image transformations (resize, crop, format conversion) are handled server-side by Supabase. The proxy forwards the transformation parameters and returns the processed image.'
      }
    ],
    relatedPages: [
      { title: 'Auth blocked', description: 'Login and signup also affected', href: '/fix/auth-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Realtime blocked', description: 'WebSocket connections affected', href: '/fix/realtime-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Proxy tutorial', description: 'Build your own proxy', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' },
      { title: 'Fix on Jio', description: 'Fix for Jio users', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase Storage Not Working in India - Fix Uploads | JioBase',
    metaDescription: 'Supabase Storage blocked in India? File uploads, downloads, and signed URLs all fail. Fix it with a one-line proxy change.',
    metaKeywords: 'supabase storage blocked india, supabase file upload not working india, supabase storage fix india'
  },
  {
    type: 'feature',
    slug: 'realtime-blocked',
    featureName: 'Supabase Realtime',
    shortName: 'Realtime',
    supabasePath: '/realtime/v1/',
    whatBreaks: 'Supabase Realtime uses WebSocket connections to deliver live updates, presence tracking, and broadcast messages. When *.supabase.co is DNS-blocked, the WebSocket handshake fails because it starts as an HTTP upgrade request to the blocked domain. All real-time subscriptions, presence channels, and broadcast channels stop working. Your app falls silent - no live updates, no typing indicators, no online status, no collaborative features.',
    userImpact: 'Apps that depend on real-time features become static and unresponsive. Chat applications stop receiving new messages. Collaborative documents stop syncing. Live dashboards freeze. Notification systems go silent. The app appears "stuck" or "lagging" to users, who may think the app itself is broken rather than the connection.',
    codeExample: `import { createClient } from '@supabase/supabase-js'

// Proxied through JioBase - Realtime works including WebSockets:
const supabase = createClient('https://myapp.jiobase.com', 'your-anon-key')

// Subscribe to real-time changes (works through proxy)
const channel = supabase
  .channel('room-1')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => console.log('New message:', payload)
  )
  .subscribe()

// Presence tracking (works through proxy)
const presence = supabase.channel('online-users')
presence.on('presence', { event: 'sync' }, () => {
  console.log('Online:', presence.presenceState())
})`,
    codeFilename: 'lib/realtime.ts',
    faqs: [
      {
        question: 'Does JioBase support WebSocket proxying?',
        answer: 'Yes. JioBase fully proxies WebSocket connections using Cloudflare\'s WebSocketPair API. Supabase Realtime subscriptions, presence, and broadcast all work through the proxy with minimal latency overhead (1-5ms).'
      },
      {
        question: 'Will the DIY Cloudflare Worker also proxy WebSockets?',
        answer: 'The basic Worker from our generator tool handles HTTP only. WebSocket proxying requires additional code using the WebSocketPair API. JioBase\'s managed proxy includes full WebSocket support out of the box.'
      },
      {
        question: 'How much latency does the proxy add to real-time events?',
        answer: 'Typically 1-5ms. Cloudflare Workers execute at the edge location closest to the user, so the additional hop is negligible. This is far less than VPN overhead (50-200ms+) and imperceptible in most real-time applications.'
      }
    ],
    relatedPages: [
      { title: 'Auth blocked', description: 'Login and signup also fail', href: '/fix/auth-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Storage blocked', description: 'File operations also blocked', href: '/fix/storage-blocked', badge: 'Feature', badgeColor: 'amber' },
      { title: 'Proxy tutorial', description: 'Build a proxy with WebSocket support', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' },
      { title: 'Fix on Jio', description: 'Fix for Jio users', href: '/fix/jio', badge: 'ISP Fix', badgeColor: 'brand' }
    ],
    metaTitle: 'Supabase Realtime Not Working in India - Fix WebSockets | JioBase',
    metaDescription: 'Supabase Realtime and WebSocket subscriptions blocked in India? Live updates, presence, and broadcast all fail. Fix with a WebSocket-capable proxy.',
    metaKeywords: 'supabase realtime blocked india, supabase websocket not working india, supabase live updates india fix'
  }
];

// === Framework Pages Data ===

export const FRAMEWORK_PAGES: FrameworkPageData[] = [
  {
    slug: 'nextjs',
    name: 'Next.js',
    shortName: 'nextjs',
    language: 'TypeScript',
    envPrefix: 'NEXT_PUBLIC_',
    initFile: 'lib/supabase.ts',
    envFile: '.env.local',
    codeBefore: `// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)`,
    codeAfter: `// .env.local
# Before (blocked):
# NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co

# After (proxied through JioBase):
NEXT_PUBLIC_SUPABASE_URL=https://myapp.jiobase.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`,
    packageManager: 'npm',
    additionalSteps: [
      'If you use Supabase in Server Components or API routes, ensure the server-side also uses the proxied URL. Next.js server-side code runs on your hosting provider (Vercel, etc.) which may not be affected by the ISP block, but using the proxy URL everywhere keeps your setup consistent.',
      'For SSR with createServerClient from @supabase/ssr, use the same NEXT_PUBLIC_SUPABASE_URL environment variable. The proxy handles both client-side and server-side requests identically.',
      'If you use next/image with Supabase Storage URLs, update your next.config.js remotePatterns to include your JioBase domain.'
    ],
    faqs: [
      {
        question: 'Do I need to change my Next.js API routes?',
        answer: 'Only if they reference the Supabase URL directly. If your API routes use the same environment variable (NEXT_PUBLIC_SUPABASE_URL), just changing the env value is enough. No code changes needed.'
      },
      {
        question: 'Will Supabase SSR (@supabase/ssr) work with the proxy?',
        answer: 'Yes. The @supabase/ssr package uses the same createClient pattern. Point it at your JioBase URL and everything works - cookie-based auth, server-side data fetching, and middleware auth checks.'
      },
      {
        question: 'Does this work on Vercel, Netlify, and Cloudflare?',
        answer: 'Yes. The proxy URL works from any hosting provider. Your server-side code may not even need the proxy (servers are not affected by ISP blocks), but using the proxy URL consistently avoids confusion and works everywhere.'
      }
    ],
    relatedGuides: [
      { title: 'React guide', description: 'Vite + React setup', href: '/guides/react', badge: 'Guide', badgeColor: 'blue' },
      { title: 'SvelteKit guide', description: 'SvelteKit proxy setup', href: '/guides/sveltekit', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full proxy tutorial', description: 'Build your own Worker', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' },
      { title: 'Worker generator', description: 'Generate proxy code instantly', href: '/tools/worker-generator', badge: 'Tool', badgeColor: 'amber' }
    ],
    metaTitle: 'Fix Supabase in Next.js for Indian Users - Proxy Guide | JioBase',
    metaDescription: 'Supabase blocked in India? Fix your Next.js app with a one-line env change. Works with App Router, Pages Router, SSR, and API routes.',
    metaKeywords: 'nextjs supabase proxy india, next.js supabase blocked fix, supabase next.js india'
  },
  {
    slug: 'react',
    name: 'React (Vite)',
    shortName: 'react',
    language: 'TypeScript',
    envPrefix: 'VITE_',
    initFile: 'src/lib/supabase.ts',
    envFile: '.env',
    codeBefore: `// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)`,
    codeAfter: `// .env
# Before (blocked):
# VITE_SUPABASE_URL=https://xyz.supabase.co

# After (proxied through JioBase):
VITE_SUPABASE_URL=https://myapp.jiobase.com
VITE_SUPABASE_ANON_KEY=your-anon-key`,
    packageManager: 'npm',
    additionalSteps: [
      'React apps built with Vite are fully client-side, so the ISP block affects 100% of your users on blocked networks. A proxy is essential.',
      'If you use Create React App (CRA) instead of Vite, the env prefix is REACT_APP_ instead of VITE_. Update accordingly.',
      'After changing the env variable, rebuild and redeploy your app. The Supabase client reads the URL at build time, so a restart or rebuild is required.'
    ],
    faqs: [
      {
        question: 'I use Create React App, not Vite. Does this still work?',
        answer: 'Yes. The only difference is the environment variable prefix. CRA uses REACT_APP_ (e.g., REACT_APP_SUPABASE_URL) while Vite uses VITE_. The proxy setup and Supabase client code are identical.'
      },
      {
        question: 'Do I need to rebuild my React app after changing the URL?',
        answer: 'Yes. Vite and CRA both inline environment variables at build time. After updating the SUPABASE_URL in your .env file, you need to rebuild (npm run build) and redeploy. The change takes effect immediately for all users after redeployment.'
      },
      {
        question: 'Will React Query / TanStack Query work with the proxy?',
        answer: 'Yes. React Query works at the data-fetching layer above Supabase. It does not care what URL the Supabase client connects to. The proxy is transparent to all client-side libraries.'
      }
    ],
    relatedGuides: [
      { title: 'Next.js guide', description: 'Next.js SSR setup', href: '/guides/nextjs', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Flutter guide', description: 'Flutter/Dart setup', href: '/guides/flutter', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full proxy tutorial', description: 'Build your own Worker', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' },
      { title: 'Worker generator', description: 'Generate proxy code', href: '/tools/worker-generator', badge: 'Tool', badgeColor: 'amber' }
    ],
    metaTitle: 'Fix Supabase in React for Indian Users - Proxy Guide | JioBase',
    metaDescription: 'Supabase blocked in India? Fix your React (Vite/CRA) app with a one-line env change. Works with all React libraries and state managers.',
    metaKeywords: 'react supabase proxy india, react supabase blocked fix, vite supabase india, supabase react india'
  },
  {
    slug: 'flutter',
    name: 'Flutter',
    shortName: 'flutter',
    language: 'Dart',
    envPrefix: '',
    initFile: 'lib/supabase.dart',
    envFile: 'lib/constants.dart',
    codeBefore: `// lib/supabase.dart
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    url: 'https://xyz.supabase.co',
    anonKey: 'your-anon-key',
  );
}

final supabase = Supabase.instance.client;`,
    codeAfter: `// lib/supabase.dart
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    // Proxied through JioBase:
    url: 'https://myapp.jiobase.com',
    anonKey: 'your-anon-key',
  );
}

final supabase = Supabase.instance.client;`,
    packageManager: 'flutter pub',
    additionalSteps: [
      'Flutter apps run on the user\'s device (mobile or web), so the ISP block directly affects your Indian users. This is especially critical for Android apps since most Indian Android users are on Jio or Airtel.',
      'For Flutter web builds, the fix is identical - the supabase_flutter package uses the same URL configuration.',
      'After changing the URL, rebuild your app (flutter build apk / flutter build web) and publish an update. Existing app installations will continue to fail until they update.'
    ],
    faqs: [
      {
        question: 'Do I need to publish a new app version to the Play Store?',
        answer: 'If the Supabase URL is hardcoded in your Dart code, yes - you need to publish an update. Consider using a remote config or environment variable approach for future flexibility, so you can change the URL without an app update.'
      },
      {
        question: 'Does the supabase_flutter package work with a proxy URL?',
        answer: 'Yes. The supabase_flutter package does not validate the URL format. It works with any URL that responds with the Supabase API format. Simply replace the supabase.co URL with your JioBase proxy URL.'
      },
      {
        question: 'Will Supabase Realtime work in my Flutter app through the proxy?',
        answer: 'Yes. JioBase proxies WebSocket connections. The supabase_flutter package handles the WebSocket upgrade automatically, and the proxy transparently forwards it. Realtime subscriptions, presence, and broadcast all work.'
      }
    ],
    relatedGuides: [
      { title: 'React Native guide', description: 'React Native/Expo setup', href: '/guides/react-native', badge: 'Guide', badgeColor: 'blue' },
      { title: 'React guide', description: 'React web app setup', href: '/guides/react', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full fix guide', description: 'Complete block fix guide', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'brand' },
      { title: 'Worker generator', description: 'DIY proxy option', href: '/tools/worker-generator', badge: 'Tool', badgeColor: 'amber' }
    ],
    metaTitle: 'Fix Supabase in Flutter for Indian Users - Proxy Guide | JioBase',
    metaDescription: 'Supabase blocked in India? Fix your Flutter app (Android, iOS, Web) by changing one URL. Works with supabase_flutter package.',
    metaKeywords: 'flutter supabase proxy india, flutter supabase blocked fix, supabase flutter india, dart supabase india'
  },
  {
    slug: 'sveltekit',
    name: 'SvelteKit',
    shortName: 'sveltekit',
    language: 'TypeScript',
    envPrefix: 'PUBLIC_',
    initFile: 'src/lib/supabase.ts',
    envFile: '.env',
    codeBefore: `// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
)`,
    codeAfter: `# .env
# Before (blocked):
# PUBLIC_SUPABASE_URL=https://xyz.supabase.co

# After (proxied through JioBase):
PUBLIC_SUPABASE_URL=https://myapp.jiobase.com
PUBLIC_SUPABASE_ANON_KEY=your-anon-key`,
    packageManager: 'npm',
    additionalSteps: [
      'SvelteKit uses $env/static/public for client-exposed variables and $env/static/private for server-only variables. Use the PUBLIC_ prefixed URL for client-side Supabase calls.',
      'If you use server-side load functions (+page.server.ts) with Supabase, the server may not be affected by ISP blocks. But using the proxy URL everywhere ensures consistency.',
      'After changing the env, restart your dev server (npm run dev) and rebuild for production.'
    ],
    faqs: [
      {
        question: 'Does this work with SvelteKit SSR?',
        answer: 'Yes. Server-side rendering happens on your hosting provider (Vercel, Cloudflare, etc.) which is not affected by Indian ISP blocks. But client-side hydration and subsequent API calls happen in the browser, where the block applies. Using the proxy URL for all calls ensures both SSR and CSR work.'
      },
      {
        question: 'I use @supabase/ssr with SvelteKit. Does the proxy work?',
        answer: 'Yes. The @supabase/ssr package creates a Supabase client that works identically with a proxy URL. Cookie-based auth, server hooks, and load functions all work through JioBase.'
      },
      {
        question: 'Can I deploy this on Cloudflare Pages?',
        answer: 'Yes. SvelteKit with adapter-cloudflare works perfectly with JioBase. In fact, JioBase itself is built on SvelteKit + Cloudflare Pages. The proxy URL is just a configuration change.'
      }
    ],
    relatedGuides: [
      { title: 'Next.js guide', description: 'Next.js SSR setup', href: '/guides/nextjs', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Nuxt guide', description: 'Nuxt.js setup', href: '/guides/nuxt', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full proxy tutorial', description: 'Build your own proxy', href: '/blog/proxy-supabase-cloudflare-workers', badge: 'Tutorial', badgeColor: 'purple' },
      { title: 'Supabase alternatives', description: 'Compare backend options', href: '/blog/supabase-alternatives-india', badge: 'Comparison', badgeColor: 'purple' }
    ],
    metaTitle: 'Fix Supabase in SvelteKit for Indian Users - Proxy Guide | JioBase',
    metaDescription: 'Supabase blocked in India? Fix your SvelteKit app with a one-line env change. Works with SSR, CSR, and @supabase/ssr.',
    metaKeywords: 'sveltekit supabase proxy india, sveltekit supabase blocked fix, svelte supabase india'
  },
  {
    slug: 'nuxt',
    name: 'Nuxt.js',
    shortName: 'nuxt',
    language: 'TypeScript',
    envPrefix: 'NUXT_PUBLIC_',
    initFile: 'plugins/supabase.ts',
    envFile: '.env',
    codeBefore: `// plugins/supabase.ts (or nuxt.config.ts for @nuxtjs/supabase)
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  supabase: {
    url: 'https://xyz.supabase.co',
    key: 'your-anon-key'
  }
})`,
    codeAfter: `// .env
# Before (blocked):
# SUPABASE_URL=https://xyz.supabase.co

# After (proxied through JioBase):
SUPABASE_URL=https://myapp.jiobase.com
SUPABASE_KEY=your-anon-key`,
    packageManager: 'npm',
    additionalSteps: [
      'If you use the @nuxtjs/supabase module, the URL and key are read from environment variables by default. Just update your .env file.',
      'For manual Supabase client setup (without the module), update the URL wherever you call createClient().',
      'Nuxt 3\'s server-side rendering is not affected by ISP blocks, but client-side hydration and API calls are. Use the proxy URL for all calls.'
    ],
    faqs: [
      {
        question: 'Does @nuxtjs/supabase work with a proxy URL?',
        answer: 'Yes. The @nuxtjs/supabase module passes the URL directly to createClient. Any URL that serves the Supabase API format works, including JioBase proxy URLs.'
      },
      {
        question: 'Do I need to change my nuxt.config.ts?',
        answer: 'If you hardcoded the URL in nuxt.config.ts, move it to .env so you can change it per environment. The @nuxtjs/supabase module reads SUPABASE_URL and SUPABASE_KEY from environment variables automatically.'
      }
    ],
    relatedGuides: [
      { title: 'SvelteKit guide', description: 'SvelteKit setup', href: '/guides/sveltekit', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Next.js guide', description: 'Next.js SSR setup', href: '/guides/nextjs', badge: 'Guide', badgeColor: 'blue' },
      { title: 'Full fix guide', description: 'Complete block fix guide', href: '/blog/supabase-blocked-india-fix', badge: 'Blog', badgeColor: 'brand' },
      { title: 'Worker generator', description: 'DIY proxy option', href: '/tools/worker-generator', badge: 'Tool', badgeColor: 'amber' }
    ],
    metaTitle: 'Fix Supabase in Nuxt.js for Indian Users - Proxy Guide | JioBase',
    metaDescription: 'Supabase blocked in India? Fix your Nuxt.js app with a one-line env change. Works with @nuxtjs/supabase module and manual setup.',
    metaKeywords: 'nuxt supabase proxy india, nuxtjs supabase blocked fix, nuxt supabase india'
  }
];

// === Lookup Maps ===

export const FIX_PAGES_MAP = new Map<string, FixPageData>();
for (const page of ISP_PAGES) FIX_PAGES_MAP.set(page.slug, page);
for (const page of ERROR_PAGES) FIX_PAGES_MAP.set(page.slug, page);
for (const page of FEATURE_PAGES) FIX_PAGES_MAP.set(page.slug, page);

export const FRAMEWORK_PAGES_MAP = new Map<string, FrameworkPageData>();
for (const page of FRAMEWORK_PAGES) FRAMEWORK_PAGES_MAP.set(page.slug, page);

// === Slug Arrays (for sitemap) ===

export const ALL_FIX_SLUGS = [
  ...ISP_PAGES.map(p => p.slug),
  ...ERROR_PAGES.map(p => p.slug),
  ...FEATURE_PAGES.map(p => p.slug)
];

export const ALL_FRAMEWORK_SLUGS = FRAMEWORK_PAGES.map(p => p.slug);
