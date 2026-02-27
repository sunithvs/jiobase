# Supabase DNS Block in India - Research Document
## Compiled: February 27, 2026

---

## 1. KEY FACTS AND STATISTICS

### The Incident
- **Date started:** February 24, 2026 at 14:46 UTC
- **What:** The domain `supabase.co` (API domain) became inaccessible across multiple Indian ISPs due to a ministry order
- **supabase.com** (marketing site) remains accessible -- only the `.co` API domain is blocked
- **Cause:** ISP-level DNS poisoning pursuant to a Ministry of Electronics and Information Technology (MeitY) order
- **Specific grounds for the order:** Unknown/undisclosed as of Feb 27, 2026
- **Government response:** None. Neither Minister Ashwini Vaishnaw nor MeitY has publicly responded

### Affected ISPs (Confirmed)
| ISP | Subscribers | Blocking Mechanism |
|-----|-------------|-------------------|
| Reliance Jio (incl. JioFiber) | ~500 million | DNS poisoning to sinkhole IP `49.44.79.236` |
| Airtel | ~380 million | DNS RPZ (Response Policy Zone) redirecting to `restricted.rpz.airtelspam.com` (IP: `13.127.247.216`) |
| ACT Fibernet | ~2 million | Displays explicit "Ministry of Electronics and Information Technology" block page |

### Supabase Platform Statistics (for context on scale of impact)
- **4+ million developers** worldwide use Supabase (grew from 1M to 4.5M in under a year)
- **3.5+ million databases** managed on the platform
- **55% of the most recent Y Combinator batch** uses Supabase
- **1,000+ YC companies** total use Supabase
- **$5 billion valuation** (Series E, October 2025, led by Accel and Peak XV)
- **$70M ARR** (estimated, late 2025)
- **$500M+ total funding** raised
- **124 employees** worldwide
- **Stack Overflow Developer Survey 2025:** Usage grew from 3.8% to 5.4%

### Estimated Impact in India
- India is one of the largest developer markets globally
- Jio alone has ~500 million subscribers; combined with Airtel (~380M) and ACT (~2M), the block potentially affects **880+ million internet connections**
- Thousands of production apps, startups, student projects, and SaaS products rely on Supabase in India
- Not just Supabase dashboard access -- **end-user-facing apps** that call Supabase APIs are broken for Indian users on these ISPs
- Firebase (Google) also reported blocked alongside Supabase

---

## 2. NOTABLE TWEETS AND POSTS

### Official Supabase Tweets

**Tweet 1 - Initial Acknowledgment (Feb 24):**
- URL: https://x.com/supabase/status/2026374754438087119
- From: @supabase
- Content summary: Advised JioFiber users in India to use a VPN or switch DNS to 1.1.1.1. Confirmed infrastructure fully operational. Stated the issue appears to be ISP-level block. Said they reached out to Jio.

**Tweet 2 - Appeal to IT Minister (Feb 27):**
- URL: https://x.com/supabase/status/2027249469545386102
- From: @supabase, directed at @AshwiniVaishnaw
- Content summary: Stated they became aware that supabase.co is inaccessible across Jio, Airtel, and ACT Fibernet due to a ministry order. Noted Supabase is used by millions of developers worldwide and millions of users in India are affected. Requested a conversation with someone from the Minister's team.

### Supabase Team Member Tweet

**Raminder Singh (@HashRust) - Technical Confirmation:**
- URL: https://x.com/HashRust/status/2026534997046473078
- Content summary: Confirmed JioFiber has configured their DNS to resolve *.supabase.co to IP addresses that do not belong to Supabase. Said they reached out to Jio to fix it.

### Developer Community Tweets

**Omkar (@psomkar1) - Viral Developer Reaction:**
- URL: https://x.com/psomkar1/status/2027291138550559082
- Content summary: "India just blocked access to Supabase and Firebase. Thousands of apps. Startups. Student projects. Production systems. All suddenly at risk. No clear communication. No technical transition plan. No consideration for the developers building on top of these services."

**Ayush Chugh (@aayushchugh):**
- URL: https://x.com/aayushchugh/status/2026521512690544994
- Content summary: Reported issues with multiple services on Jio SIM -- Cursor, GitHub, Supabase all don't work. Had to buy a separate Airtel SIM just for hotspot. Tagged @reliancejio asking them to fix infrastructure.

**Akash Singh (@SkySingh04) - Humor:**
- URL: https://x.com/SkySingh04/status/2026638162546827415
- Content: "ambani ji is firebase gang"

**Rishi (@thelifeofrishi):**
- URL: https://x.com/thelifeofrishi/status/2026407833885974654
- Content summary: "imagine India's biggest telecom blocking one prominent DB provider"

**Amit Verma (@whocares0412) - Workaround Share:**
- URL: https://x.com/whocares0412/status/2026626931693875215
- Content summary: Shared a guide on fixing the Supabase down issue using a Cloudflare Worker proxy at a custom subdomain, routing all traffic through it, and replacing browser-side Supabase calls.

**Firoj Alam (@firojalam2):**
- URL: https://x.com/firojalam2/status/2026450686901412240
- Content summary: "Supabase Still Down in India region? My Waitlist system facing connectivity problem with Supabase Network"

**Indra (@IndraVahan):**
- URL: https://x.com/IndraVahan/status/2026570818143285300
- Content summary: Confirmed Supabase is also down for Jio mobile carrier (not just JioFiber)

---

## 3. TECHNICAL TIMELINE OF EVENTS

| Date/Time (UTC) | Event |
|-----------------|-------|
| **Feb 24, 14:46** | Supabase status page: Investigation begins after connectivity reports from AP South 1, particularly India |
| **Feb 24, 15:13** | DNS resolution issues identified; certain ISP DNS servers unavailable |
| **Feb 24, 16:00** | Confirmed as ISP-level blocking affecting Indian users |
| **Feb 24, 16:39** | Supabase confirms projects accessible outside India; infrastructure fully operational |
| **Feb 24, ~17:00** | Supabase tweets initial advisory about JioFiber, suggests VPN or DNS 1.1.1.1 |
| **Feb 24** | GitHub Issue #43142 opened by @nocodetalks: "Supabase down on JIO ISP" |
| **Feb 24** | GitHub Issue #43155 opened by @maazkhanxo: "Auth endpoint timing out on Jio & Airtel networks" |
| **Feb 25, 18:27** | Supabase escalates efforts to contact ISPs; advises users to report to their providers |
| **Feb 25** | Raminder Singh (Supabase) tweets confirmation of DNS poisoning by JioFiber |
| **Feb 26, 14:56** | Supabase status update: Multiple Indian ISPs potentially affected; continued ISP engagement |
| **Feb 26** | MediaNama publishes first news article about the block |
| **Feb 26, 23:36** | Supabase offers Custom Domain workaround; advises switching DNS and enabling proxying |
| **Feb 27** | Supabase tweets directly to @AshwiniVaishnaw requesting conversation |
| **Feb 27** | News9, OfficeChai, Cyber Kendra, Analytics India Mag all publish coverage |
| **Feb 27** | India Broadband Forum thread opened confirming block across ISPs |
| **Feb 27** | Hacker News thread reaches front page (13+ points) |
| **Feb 27** | DEV.to articles published with Cloudflare Workers workaround guides |
| **As of Feb 27** | No public response from Minister Vaishnaw or MeitY |

---

## 4. TECHNICAL DETAILS OF THE BLOCKING

### DNS Poisoning (Primary Mechanism)

**How it works:**
1. Indian ISPs operate their own DNS resolvers (the default for their subscribers)
2. When a user's device queries `*.supabase.co`, the ISP DNS resolver returns a **fake IP address** instead of the real AWS IP
3. The fake IP is either a sinkhole (Jio: `49.44.79.236`) or a redirect server showing a block page (ACT Fibernet)

**Evidence from nslookup:**
```
# On Jio network (blocked):
nslookup <project_id>.supabase.co
Name: <project_id>.supabase.co
Address: 49.44.79.236    <-- Jio-owned sinkhole IP (NOT Supabase)

# On clean DNS (working):
nslookup <project_id>.supabase.co 8.8.8.8
Name: <project_id>.supabase.co
Address: <actual AWS IP>
```

**Airtel uses Response Policy Zone (RPZ):**
```
# Airtel DNS response:
restricted.rpz.airtelspam.com -> 13.127.247.216
```

### Possible Deep Packet Inspection (DPI) - Secondary Mechanism
- Some developers report that changing DNS alone does not restore access
- This suggests ISPs may also be performing DPI on HTTPS connections
- DPI can inspect the SNI (Server Name Indication) field in TLS handshakes to identify `supabase.co` traffic even when using third-party DNS
- VPN (encrypts all traffic including SNI) is the most reliable user-side workaround
- Cloudflare WARP specifically recommended

### What's Blocked vs. What's Not
| Domain | Status | Notes |
|--------|--------|-------|
| `*.supabase.co` | BLOCKED | All project API endpoints, auth, edge functions, storage |
| `supabase.com` | ACCESSIBLE | Marketing website, documentation |
| Custom domains pointing to Supabase | ACCESSIBLE | e.g., `api.myapp.com` -> Supabase (if proxied) |

### Impact on Applications
- `ERR_CONNECTION_TIMED_OUT` for all API calls from affected ISPs
- Auth endpoints (`/auth/v1/token`) fail silently
- Real-time subscriptions (WebSocket) fail to connect
- Edge Functions unreachable
- Storage/file access broken
- End-user-facing apps show skeleton screens or hang indefinitely (no explicit error)

---

## 5. GITHUB ISSUES

### Issue #43142: "Supabase down on JIO ISP"
- **URL:** https://github.com/supabase/supabase/issues/43142
- **Reporter:** @nocodetalks
- **Date:** February 24, 2026
- **Status:** Open
- **Comments:** 50+
- **Key content:**
  - Detailed nslookup output showing DNS poisoning to `49.44.79.236`
  - curl tests timing out after 5+ seconds
  - traceroute dying within Reliance's network infrastructure
  - Community-contributed code-level DNS patching workaround (Node.js `dns.lookup()` interception)
  - **Supabase response** (Hallidayo, contributor): Directed users to status page incident tracking
  - Notable contributor @snehbodar provided detailed technical workarounds
  - @BMoatDev reported ACT Fibernet showing explicit MeitY block messages
  - @NesanSelvan confirmed custom domains partially resolve the issue

### Issue #43155: "Auth endpoint timing out on Jio & Airtel networks in India"
- **URL:** https://github.com/supabase/supabase/issues/43155
- **Reporter:** @maazkhanxo
- **Date:** February 24, 2026
- **Status:** Open
- **Comments:** 11
- **Key content:**
  - Specifically about auth endpoint `POST /auth/v1/token?grant_type=password` returning `ERR_CONNECTION_TIMED_OUT`
  - Confirmed working when using dns.google (8.8.8.8/8.8.4.4)
  - **Supabase responses:**
    - @Hallidayo acknowledged and linked to status page
    - @7ttp expressed sympathy and confirmed active investigation
  - @dhruv-m1 suggested blocking is likely due to a legal request by the Government of India
  - Additional reporters: @pingaura, @khulnerd, @bazookaBaron

---

## 6. DEV.TO ARTICLES

### Article 1: "Why Your App Breaks for Indian Users (And How to Build Infrastructure That Doesn't)"
- **URL:** https://dev.to/codedpool/why-your-app-breaks-for-indian-users-and-how-to-build-infrastructure-that-doesnt-3l05
- **Author:** Romanch Roshan Singh
- **Date:** February 26, 2026
- **Engagement:** 1 like, 3 comments
- **Key arguments:**
  - Apps fail for Indian users due to ISP-level blocking, not code bugs
  - Developers must abstract third-party vendor URLs to create resilient infrastructure
  - Direct calls to services like Supabase expose apps to ISP-level disruption
  - Jio's 500M subscribers represent a massive affected user base
- **Technical approach:** Cloudflare Workers proxy that intercepts requests and forwards them server-side
- **Core pattern:** `Browser -> api.yourdomain.com (Worker) -> *.supabase.co (server-side, invisible to ISP)`

### Article 2: "Fix Supabase Down on Jio and JioFiber by Hiding Supabase Behind Your Own Domain (Free-Tier Friendly)"
- **URL:** https://dev.to/amit_verma_metefy/fix-supabase-down-on-jio-and-jiofiber-by-hiding-supabase-behind-your-own-domain-free-tier-a15
- **Author:** Amit Verma
- **Date:** February 27, 2026
- **Key content:**
  - Step-by-step Cloudflare Worker proxy implementation
  - Worker preserves auth headers and JWT tokens
  - Forwards client IP via custom headers
  - Adds CORS headers for browser compatibility
  - Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  - Special section on Google OAuth: replace standard flow with ID-token flow to avoid callbacks to blocked Supabase domains
  - Custom domain routing: `api.yourapp.com` -> Supabase (server-side)
  - Emphasizes free-tier friendly approach

---

## 7. NEWS COVERAGE

### MediaNama (Feb 26, updated Feb 27)
- **URL:** https://www.medianama.com/2026/02/223-supabase-isp-level-block-jiofiber-users-india/
- First major tech news outlet to cover the story
- Contacted Jio for comment -- no response received
- Updated to include Airtel and ACT Fibernet confirmation

### News9 Live (Feb 27)
- **URL:** https://www.news9live.com/technology/tech-news/supabase-blocked-india-isp-dns-issue-ashwini-vaishnaw-2936933
- Quoted a startup founder in Bengaluru: even brief downtime disrupts paying customers
- Noted Supabase is a serverless PostgreSQL backend platform compared to Firebase
- Highlighted that Supabase received no prior notice of the block

### OfficeChai (Feb 27)
- **URL:** https://officechai.com/stories/supabase-contacts-ashwini-vaishnaw-on-x-saying-its-website-is-blocked-across-multiple-indian-isps-following-ministry-order/
- Emphasized Supabase is developer infrastructure, not user-generated content platform
- No obvious reason for a blanket domain ban under the IT Act
- Supabase had no formal channel to contest or understand the block

### Cyber Kendra (Feb 27)
- **URL:** https://www.cyberkendra.com/2026/02/supabase-blocked-india-on-jio-network.html
- Provided historical context: Medium.com blocked on Jio/Airtel in October 2025
- BSNL blocked multiple platforms including Dailymotion in August 2025
- Raises net neutrality compliance concerns

### Analytics India Mag (Feb 27)
- **URL:** https://analyticsindiamag.com/ai-news/supabase-appeals-to-ashwini-vaishnaw-after-access-on-jio-airtel-act-gets-blocked
- Covered Supabase's direct appeal to the minister

### Harro (Feb 26)
- **URL:** https://harro.com/2026/02/26/supabase-flags-possible-isp-level-block-affecting-jiofiber-users-in-india/

### Hacker News (Feb 27)
- **URL:** https://news.ycombinator.com/item?id=47176879
- 13+ points, front page
- Posted by user alt-glitch

### India Broadband Forum (Feb 27)
- **URL:** https://broadband.forum/threads/supabase-blocked-by-indian-gov.236227/
- Community confirmation using Airtel DNS showing RPZ blocking
- Historical context: "similar dumb decisions by Ministry/ISPs when they blocked ubuntu mirrors, cloudflare r2 etc."

---

## 8. COMMUNITY SENTIMENT

### Developer Frustration Themes

1. **Production systems broken without warning:**
   - No prior notice given to Supabase or developers
   - Live applications serving paying customers suddenly stopped working
   - End users experience silent failures (skeleton screens, hanging requests)

2. **Collateral damage to innocent apps:**
   - The block targets Supabase infrastructure, but breaks thousands of third-party apps
   - Student projects, hackathon demos, SaaS products, startups all affected
   - Users of those apps (who may not even know what Supabase is) are impacted

3. **Lack of transparency:**
   - No public explanation for why a developer infrastructure platform was blocked
   - Supabase is not a content platform -- no obvious IT Act justification
   - No government response as of Feb 27

4. **Net neutrality concerns:**
   - Pattern of ISP-level blocks on developer tools (previously: Ubuntu mirrors, Cloudflare R2, Medium)
   - BSNL invoked RTI exemptions to avoid explaining blocking decisions
   - Developers see this as undermining India's net neutrality framework

5. **Economic impact concern:**
   - Indian SaaS ecosystem heavily depends on tools like Supabase
   - Startups face customer churn from unexpected downtime
   - India positioning itself as a tech hub while blocking developer infrastructure

### Tone of Reactions
- **Angry/frustrated:** "We pay millions in taxes, yet critical platforms get blocked without notice"
- **Resigned/cynical:** Developers already experienced with workarounds due to previous blocks
- **Darkly humorous:** "ambani ji is firebase gang"
- **Solution-oriented:** Quick pivot to sharing Cloudflare Worker proxy guides and VPN recommendations

---

## 9. WORKAROUND APPROACHES PEOPLE ARE USING

### For End Users (Quick Fixes)
1. **Change DNS settings:** Switch from ISP default to Cloudflare (1.1.1.1), Google (8.8.8.8), or Quad9 (9.9.9.9)
2. **Use a VPN:** Cloudflare WARP (free), or any VPN that encrypts DNS + traffic
3. **Switch ISP/network:** Use a mobile hotspot from an unaffected carrier

### For Developers (Application-Level Fixes)

**Approach 1: Cloudflare Workers Reverse Proxy (Most Popular)**
- Deploy a Cloudflare Worker that proxies requests from `api.yourdomain.com` to `*.supabase.co`
- Browser never sees the blocked domain -- all traffic routes through your own domain
- Free tier friendly (Cloudflare Workers free tier: 100K requests/day)
- Handles HTTP APIs, Auth endpoints, Storage
- Requires special handling for Google OAuth redirect flows
- Two detailed DEV.to guides available (see Section 6)

**Approach 2: Supabase Custom Domains (Paid Feature)**
- Supabase offers a custom domains add-on on paid plans
- Route API calls through `api.myapp.com` instead of `<project>.supabase.co`
- Partially effective -- need to switch custom domain DNS to alternative provider AND enable proxying
- Charged by the hour while active
- Does not cover all use cases (e.g., OAuth callbacks may still reference `.co` domain)

**Approach 3: Node.js DNS Patching (Server-Side Only)**
- Override `dns.lookup()` in Node.js to use Google/Cloudflare DNS instead of system DNS
- Only works for server-side code (not browser clients)
- Contributed by @snehbodar in GitHub Issue #43142

**Approach 4: Nginx/Caddy Reverse Proxy (Self-Hosted)**
- Deploy a reverse proxy on a non-Indian server
- Route `api.yourdomain.com` -> `*.supabase.co`
- More control but requires server infrastructure

---

## 10. HISTORICAL PRECEDENTS IN INDIA

| Date | Platform Blocked | ISPs | Notes |
|------|-----------------|------|-------|
| Aug 2025 | Dailymotion + others | BSNL | Pan-India block; BSNL cited RTI exemptions |
| Oct 2025 | Medium.com | Jio, Airtel | Intermittent access; some ISPs showed block pages |
| Feb 2026 | Supabase (.co) | Jio, Airtel, ACT | Current incident; ministry order cited |
| Feb 2026 | Firebase (Google) | Jio (reported) | Reported alongside Supabase block |
| Various | Ubuntu mirrors | ISPs | Referenced by Broadband Forum users |
| Various | Cloudflare R2 | ISPs | Referenced by Broadband Forum users |

---

## 11. BLOG POST CONTENT MAPPING

### Blog 1: "Supabase Blocked in India: What Happened and How to Fix It"
**Relevant sections:** 1 (Key Facts), 3 (Timeline), 4 (Technical Details), 7 (News Coverage), 9 (Workarounds)
**Angle:** Comprehensive explainer for affected developers. Lead with the breaking news, explain the technical mechanism, provide all workaround options from quick (DNS change) to robust (Cloudflare Worker proxy).
**SEO keywords:** supabase blocked india, supabase down jio, supabase not working india, supabase dns block, fix supabase india

### Blog 2: "How to Proxy Supabase Through Cloudflare Workers"
**Relevant sections:** 4 (Technical Details), 6 (DEV.to Articles), 9 (Workarounds - Approach 1)
**Angle:** Step-by-step technical tutorial. Show the exact Cloudflare Worker code, custom domain setup, environment variable configuration, and special OAuth handling. Reference the DEV.to articles as prior art but provide the JioBase-specific solution.
**SEO keywords:** supabase cloudflare worker proxy, proxy supabase india, supabase reverse proxy cloudflare, hide supabase behind custom domain

### Blog 3: "Why Indian Developers Need a Supabase Proxy"
**Relevant sections:** 5 (GitHub Issues), 8 (Community Sentiment), 10 (Historical Precedents), 1 (Statistics)
**Angle:** Thought leadership on infrastructure resilience. Argue that the India block is a wake-up call -- any third-party service can be blocked at the ISP level. Developers need an abstraction layer (like JioBase) between their apps and backend services. Reference the pattern of blocks (Medium, Ubuntu, Cloudflare R2) and the economic impact on India's startup ecosystem.
**SEO keywords:** supabase india proxy, indian developers supabase, supabase isp block solution, supabase alternative india

---

## 12. SOURCE URLS (Complete List)

### News Articles
- https://www.medianama.com/2026/02/223-supabase-isp-level-block-jiofiber-users-india/
- https://www.news9live.com/technology/tech-news/supabase-blocked-india-isp-dns-issue-ashwini-vaishnaw-2936933
- https://officechai.com/stories/supabase-contacts-ashwini-vaishnaw-on-x-saying-its-website-is-blocked-across-multiple-indian-isps-following-ministry-order/
- https://www.cyberkendra.com/2026/02/supabase-blocked-india-on-jio-network.html
- https://analyticsindiamag.com/ai-news/supabase-appeals-to-ashwini-vaishnaw-after-access-on-jio-airtel-act-gets-blocked
- https://harro.com/2026/02/26/supabase-flags-possible-isp-level-block-affecting-jiofiber-users-in-india/

### GitHub Issues
- https://github.com/supabase/supabase/issues/43142
- https://github.com/supabase/supabase/issues/43155

### DEV.to Articles
- https://dev.to/codedpool/why-your-app-breaks-for-indian-users-and-how-to-build-infrastructure-that-doesnt-3l05
- https://dev.to/amit_verma_metefy/fix-supabase-down-on-jio-and-jiofiber-by-hiding-supabase-behind-your-own-domain-free-tier-a15

### Tweets / X Posts
- https://x.com/supabase/status/2026374754438087119 (Initial advisory)
- https://x.com/supabase/status/2027249469545386102 (Appeal to Vaishnaw)
- https://x.com/HashRust/status/2026534997046473078 (Raminder Singh / Supabase team)
- https://x.com/psomkar1/status/2027291138550559082 (Omkar viral thread)
- https://x.com/aayushchugh/status/2026521512690544994 (Ayush Chugh)
- https://x.com/SkySingh04/status/2026638162546827415 (Akash Singh humor)
- https://x.com/thelifeofrishi/status/2026407833885974654 (Rishi)
- https://x.com/whocares0412/status/2026626931693875215 (Amit Verma workaround)
- https://x.com/firojalam2/status/2026450686901412240 (Firoj Alam)
- https://x.com/IndraVahan/status/2026570818143285300 (Indra - Jio mobile confirmation)
- https://x.com/News9Tweets/status/2027361636504449125 (News9 coverage tweet)

### Community Discussions
- https://news.ycombinator.com/item?id=47176879 (Hacker News)
- https://broadband.forum/threads/supabase-blocked-by-indian-gov.236227/ (India Broadband Forum)

### Supabase Official
- https://status.supabase.com (Status page)
- https://supabase.com/docs/guides/platform/custom-domains (Custom Domains docs)

### Supabase Statistics Sources
- https://devgraphiq.com/supabase-statistics/
- https://taptwicedigital.com/stats/supabase
- https://articles.uvnetware.com/software-engineering/supabase-backend-platform-architecture/
- https://www.craftventures.com/articles/inside-supabase-breakout-growth
- https://techcrunch.com/2025/10/03/supabase-nabs-5b-valuation-four-months-after-hitting-2b/
