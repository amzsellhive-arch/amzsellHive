// Case-study content — copied verbatim from the client's approved
// developer specs ("Final Page Copy" sheets). Order follows the approved
// Results-page design (01–06). Do not invent figures here.

const IMG = '/images/case-studies';

export const CASE_STUDY_FOOTER_TEXT =
  'We’ll review your account and share actionable opportunities to lower ACoS and increase profitable sales.';

export const caseStudies = [
  {
    slug: 'amazon-brand-store-performance',
    num: '01',
    cardTitle: 'Amazon Brand Store Performance',
    titleLead: 'Amazon Brand Store',
    titleAccent: 'Performance',
    subtitle:
      'Turning Brand Store traffic into meaningful engagement, product discovery, and sales.',
    card: {
      image: `${IMG}/brand-store.webp`,
      headline: '$4,912.01 in Store Sales Through Meaningful Engagement.',
      bullets: ['$4,912.01 in Store Sales', '121 orders', '31,366 product views'],
    },
    problem:
      'A Brand Store shouldn’t be treated as just a branded page. The challenge is to create a shopping journey that helps customers move naturally from discovery to exploration, product, and ultimately purchase. The focus was on understanding how visitors interacted with the Store and how traffic, product engagement, and purchasing behavior worked together.',
    screenshots: [
      {
        src: `${IMG}/brand-store.webp`,
        heading: 'Amazon Brand Store Performance',
        caption: 'Here’s a snapshot of the Brand Store performance for the last 30 days.',
        alt: 'Amazon Brand Store insights dashboard for the last 30 days showing $4,912.01 in sales, 1,144 visitors and 31,366 product views',
      },
    ],
    keyResultsIntro:
      'Over the last 30 days, the Brand Store generated meaningful traffic, engagement, product discovery, and sales:',
    keyResults: [
      '$4,912.01 in Store Sales.',
      '121 orders.',
      '209 units sold.',
      '1,144 visitors.',
      '31,366 product views.',
      '1,425 clicks.',
      '4.5% overall CTR.',
      '76 seconds average dwell time.',
      '15% average bounce rate.',
    ],
    journey: {
      heading: 'The Customer Journey',
      intro: 'A well-structured Brand Store moves shoppers through a natural journey that drives results.',
      steps: [
        { title: 'Discovery', text: 'Attract the right visitors.' },
        { title: 'Exploration', text: 'Help customers explore products.' },
        { title: 'Product', text: 'Drive product engagement.' },
        { title: 'Purchase', text: 'Convert interest into sales.' },
      ],
    },
    insight: {
      text: 'Brand Stores aren’t just about design. They’re another conversion layer.',
      supporting:
        'The important part isn’t one metric. It’s how traffic, product engagement, and purchasing behavior work together. When the customer journey is structured properly, the Store becomes more than a branded page.',
    },
    whatWeDidIntro: 'We focused on creating a clearer customer journey through the Brand Store:',
    actions: [
      'Structured the shopping experience around discovery and exploration.',
      'Made the path to product discovery more intentional.',
      'Focused on product engagement, not just Store traffic.',
      'Evaluated how visitors interacted with products through views and clicks.',
      'Connected Store engagement with purchasing behavior.',
      'Used Store performance data to understand how effectively the Store supports conversion.',
    ],
    outcome:
      'Over the last 30 days, the Brand Store generated $4,912.01 in sales from 1,144 visitors, with 31,366 product views, 1,425 clicks, and 121 orders. The result demonstrates that a Brand Store can function as more than a branded destination. When the customer journey is structured around discovery, exploration, product, and purchase, the Store becomes another layer of the conversion process.',
    footerText:
      'We’ll review your account and share actionable opportunities to increase sales and profitability.',
  },
  {
    slug: 'beauty-brand-ppc-optimization',
    num: '02',
    cardTitle: 'Beauty Brand PPC Optimization',
    titleLead: 'Beauty Brand',
    titleAccent: 'PPC Optimization',
    subtitle:
      'Reducing wasted PPC spend while improving advertising efficiency — from 49% to 29% ACoS in 25 days.',
    card: {
      image: `${IMG}/beauty-before.webp`,
      image2: `${IMG}/beauty-after.webp`,
      headline: 'Reduced ACoS by 20 Percentage Points in 25 Days.',
      bullets: [
        'ACoS reduced 20 points (from 49.14% to 29.72%)',
        'Ad spend reduced 53.6%',
        'PPC sales reached $8,803.55',
      ],
    },
    problem:
      'When we took over the Amazon US Beauty & Personal Care account, PPC was spending aggressively, but the advertising efficiency wasn’t where it needed to be. The focus wasn’t simply to spend less. We needed to understand where the ad budget was going, which traffic was converting, and where spend was being wasted.',
    screenshots: [
      {
        src: `${IMG}/beauty-before.webp`,
        variant: 'before',
        heading: 'Before Optimization',
        period: 'Aug 1 – Aug 31, 2026',
        badge: 'ACoS: 49.14%',
        metrics: 'Spend: $5,639.22 · PPC Sales: $11,475.75 · ACoS: 49.14% · CPC: $0.93',
        alt: 'Amazon Ads performance before optimization, Aug 1 – Aug 31, 2026: spend $5,639.22, sales $11,475.75, CPC $0.93, ACoS 49.14%',
      },
      {
        src: `${IMG}/beauty-after.webp`,
        variant: 'after',
        heading: 'After Optimization',
        period: 'Sep 1 – Sep 25, 2026',
        badge: 'ACoS: 29.72%',
        metrics: 'Spend: $2,616.53 · PPC Sales: $8,803.55 · ACoS: 29.72% · CPC: $0.87',
        alt: 'Amazon Ads performance after optimization, Sep 1 – Sep 25, 2026: spend $2,616.53, sales $8,803.55, CPC $0.87, ACoS 29.72%',
      },
    ],
    keyResultsIntro: 'During the 25-day optimization period, the account achieved:',
    keyResults: [
      'ACoS reduced from 49.14% to 29.72%.',
      '20-point reduction in ACoS.',
      'Ad spend reduced by 53.6%.',
      'PPC sales reached $8,803.55.',
      'CPC improved from $0.93 to $0.87.',
    ],
    whatWeDidIntro:
      'We analyzed search-term performance, campaign structure, targeting, placements, and budget allocation, then:',
    actions: [
      'Cut inefficient traffic.',
      'Harvested converting search terms.',
      'Added negative keywords.',
      'Reworked bids based on conversion data.',
      'Shifted budget toward proven campaigns.',
      'Controlled inefficient placements.',
    ],
    outcome:
      'In 25 days, we brought ACoS down from 49.14% to 29.72% while reducing ad spend by 53.6%. The improvement came from better budget allocation rather than simply cutting bids or shutting down advertising. The account was optimized around where PPC could generate better results, with spending shifted toward proven campaigns and away from inefficient traffic.',
    coreMessage:
      'Don’t optimize Amazon PPC simply around lower spend. Optimize it around better allocation.',
  },
  {
    slug: 'amazon-ppc-sales-growth',
    num: '03',
    cardTitle: 'Amazon PPC Sales Growth',
    titleLead: 'Amazon PPC',
    titleAccent: 'Sales Growth',
    subtitle:
      'Scaling monthly ad sales from under $100K to a record $245K through structured PPC optimization.',
    card: {
      image: `${IMG}/ppc-sales-growth.webp`,
      headline: 'Grew Monthly Ad Sales to $245K Through PPC Optimization.',
      bullets: [
        'Reached $245K monthly ad sales',
        'ASIN Defense/Cross Promotion generated $50K/month sales growth',
        '24.13% average ACoS',
      ],
    },
    problem:
      'The account had strong potential, but PPC sales were below the level they could achieve. The goal was not simply to increase ad spend — it was to build a stronger PPC structure that could consistently capture more profitable traffic and compound results over time. The seller’s team also refreshed the listings, creating a stronger foundation for the PPC improvements.',
    screenshots: [
      {
        src: `${IMG}/ppc-sales-growth.webp`,
        heading: 'Amazon PPC Performance',
        caption: 'Real data from the account showing overall advertising performance.',
        alt: 'Amazon Ads campaign manager chart showing 95,548,037 impressions, $1.21 average CPC and 24.13% average ACoS',
      },
    ],
    keyResultsIntro:
      'Through strategic PPC optimization and a structured growth strategy, the account achieved:',
    keyResults: [
      'Monthly ad sales grew from under $100K to a record $245K in January.',
      'ASIN Defense / Cross Promotion product-targeting campaigns generated $50K/month in sales growth.',
      'The supplied screenshot shows $2.36M+ in sales; the final digits are obscured in the source image.',
      '95,548,037 impressions.',
      '24.13% average ACoS.',
      '$1.21 average CPC.',
    ],
    whatWeDidIntro:
      'We implemented a structured PPC strategy across several areas to drive consistent and profitable growth:',
    actions: [
      'Substantially expanded manual keywords and product targets, many discovered through PPC funnels.',
      'Launched ASIN Defense / Cross Promotion product-targeting campaigns.',
      'Used both high-funnel and low-funnel targeting strategies.',
      'Invested in aggressive ranking and growth campaigns.',
      'Greatly improved placement optimization.',
      'Expanded Top of Search impression share.',
      'Continued optimizing Sponsored Products campaigns based on performance data.',
      'Worked alongside the seller’s team as they refreshed and improved listings.',
    ],
    outcome:
      'PPC sales grew from under $100K to a record $245K in January. The result came from a structured approach where multiple small improvements compounded over time — expanding targeting, defending ASINs, improving placements, increasing Top of Search visibility, and investing in campaigns designed to support ranking and growth.',
    coreMessage: 'Campaign optimization is a process of compounding wins.',
  },
  {
    slug: 'uk-brand-ppc-growth',
    num: '04',
    cardTitle: 'UK Brand PPC Growth',
    titleLead: 'UK Brand',
    titleAccent: 'PPC Growth',
    subtitle:
      'Turning $2.2K in ad spend into $19.8K in sales in 30 days through smart targeting and optimized campaigns.',
    card: {
      image: `${IMG}/uk-brand-ppc.webp`,
      headline: '$19.8K Sales from $2.2K Ad Spend with 8.90 ROAS.',
      bullets: ['$19.8K sales from $2.2K spend', '11.23% ACoS', '8.90 ROAS'],
    },
    problem:
      'The account had good products and potential, but the PPC performance needed improvement. The goal was to increase sales while keeping ACoS low and scaling the best-performing products. We focused on building a stronger campaign structure, improving targeting, and allocating budget to the right opportunities.',
    screenshots: [
      {
        src: `${IMG}/uk-brand-ppc.webp`,
        heading: 'Amazon PPC Performance',
        caption: 'Overall account performance for the last 30 days.',
        alt: 'Amazon Ads portfolio view for the last 30 days showing $2,234.18 spend, $19,894.78 sales, 701,677 impressions, 11.23% ACoS and 819 orders',
      },
    ],
    keyResultsIntro:
      'In just 30 days, the account achieved strong sales with excellent advertising efficiency:',
    keyResults: [
      '$2,234.18 ad spend.',
      '819 orders.',
      '$19,894.78 PPC sales.',
      '11.23% total ACoS.',
      '8.90 ROAS.',
      '701,677 impressions.',
    ],
    products: [
      { name: 'Product A', acos: '2.65%', sales: '$657.63', orders: '26', roas: '37.66' },
      { name: 'Product B', acos: '7.95%', sales: '$11,103.99', orders: '476', roas: '12.58' },
    ],
    insight: {
      text: 'Smart targeting + optimized campaigns = High Sales with low ACOS.',
      supporting:
        'Product A proves scalability, while Product B shows exceptional efficiency — both are growth drivers.',
    },
    whatWeDidIntro:
      'We implemented a focused PPC strategy to improve efficiency and scale sales. The source material supports the following actions:',
    actions: [
      'Optimized campaign structure and budget allocation.',
      'Improved keyword and product targeting.',
      'Identified and scaled best-performing products.',
      'Reduced wasted spend through negatives and better targeting.',
      'Focused on high-converting search terms and product opportunities.',
      'Continuously monitored and optimized campaigns based on performance data.',
    ],
    outcome:
      'In 30 days, we turned $2.2K in ad spend into $19.8K in sales, generating 819 orders with an 11.23% ACoS. The result demonstrates the impact of smart targeting, continuous optimization, and focusing budget on the right products and opportunities.',
    coreMessage:
      'With the right strategy, it’s possible to achieve strong sales growth while maintaining excellent advertising efficiency.',
  },
  {
    slug: 'q4-sales-momentum',
    num: '05',
    cardTitle: 'Q4 Sales Momentum',
    titleLead: 'Q4 Sales',
    titleAccent: 'Momentum',
    subtitle:
      'Driving £163K in sales in the first 10 days of December while maintaining PPC efficiency during the holiday rush.',
    card: {
      image: `${IMG}/q4-sales-momentum.webp`,
      headline: '£163K in Sales in the First 10 Days of December.',
      bullets: ['£163K sales in 10 days', '£75,945 PPC sales', '19.80% ACoS'],
    },
    problem:
      'The holiday season brings a major increase in shopping activity, but it also creates more competition for visibility and ad placements. The challenge was to capture the increased Q4 demand without allowing advertising costs to rise disproportionately. The account needed to maintain strong PPC efficiency while staying aggressive enough to take advantage of high-converting holiday traffic.',
    screenshots: [
      {
        src: `${IMG}/q4-sales-momentum.webp`,
        heading: 'Amazon Sales Performance',
        caption: 'Snapshot of account performance for the first 10 days of December.',
        alt: 'Seller Central sales snapshot taken 12/10/2024 showing 10,772 units ordered and £163,219.89 ordered product sales month to date',
      },
    ],
    keyResultsIntro:
      'In the first 10 days of December, the account achieved strong sales momentum while maintaining controlled advertising efficiency:',
    keyResults: [
      '£163,219.89 in total sales.',
      '10,772 units ordered.',
      '£75,945.00 in PPC sales.',
      '£15,040.16 in PPC spend.',
      '19.80% PPC ACoS.',
      '9.2% TACoS.',
      '£0.50 CPC.',
    ],
    comparison: {
      heading: 'Q4 Comparison',
      rows: [
        { label: 'This month', value: '£163,219.89', note: 'First 10 days of December' },
        { label: 'Last month', value: '£475,583.40', note: 'November, by end of month' },
        { label: 'Same month last year', value: '£305,502.98', note: 'December, by end of month' },
      ],
      note: 'The account was pacing well, with potential to exceed last December’s result significantly. This is a projection, not a confirmed final result.',
    },
    whatWeDidIntro:
      'We implemented a focused PPC strategy to capture holiday demand while keeping advertising costs under control:',
    actions: [
      'Optimized holiday-specific keywords.',
      'Adjusted budgets based on performance.',
      'Maintained aggressive but strategic ad placements.',
      'Capitalized on high-converting keywords.',
      'Prepared campaigns for the expected mid-month holiday surge.',
      'Continuously monitored performance and optimized campaigns.',
    ],
    outcome:
      'In just 10 days, the account generated £163,219.89 in sales while PPC produced £75,945 in attributed sales at a 19.80% ACoS and 9.2% TACoS. The account entered the critical Q4 period with strong sales momentum and controlled advertising efficiency, creating a solid foundation for the remainder of the holiday season.',
    coreMessage:
      'Q4 growth isn’t just about spending more. It’s about being aggressive where demand is strongest while protecting advertising efficiency.',
  },
  {
    slug: 'amazon-account-growth',
    num: '06',
    cardTitle: 'Amazon UK Account Growth',
    titleLead: 'Amazon',
    titleAccent: 'Account Growth',
    subtitle:
      'Consistent sales performance through strategic account management, listing optimization, SEO, and PPC management.',
    card: {
      image: `${IMG}/amazon-account-growth.webp`,
      headline: '£70,982.20 in Sales with 4,752 Units Ordered.',
      bullets: [
        '4,752 units ordered',
        '£70,982.20 ordered product sales',
        '£15.52 average sales/order item',
      ],
    },
    problem:
      'The account had inconsistent sales performance and needed better visibility, optimized listings, and a more effective advertising strategy to improve sales and build a sustainable business.',
    screenshots: [
      {
        src: `${IMG}/amazon-account-growth.webp`,
        heading: 'Amazon Account Screenshot',
        caption: 'Real data from the account showing sales performance.',
        alt: 'Seller Central sales dashboard for 01/07/2026 – 16/09/2026 showing 4,575 order items, 4,752 units ordered and £70,982.20 ordered product sales',
      },
    ],
    keyResultsIntro: 'During the selected period, the account achieved:',
    keyResults: [
      '4,575 total order items.',
      '4,752 units ordered.',
      '£70,982.20 in ordered product sales.',
      '1.04 average units per order item.',
      '£15.52 average sales per order item.',
    ],
    whatWeDidIntro: 'We implemented the following strategies and actions for this account:',
    actions: [
      'Strategic Amazon Account Management.',
      'Listing Optimization.',
      'SEO.',
      'PPC Management.',
      'Data-Driven Strategies.',
    ],
    outcome:
      'The account achieved improved visibility and stronger sales performance through strategic account management, optimized listings, SEO, and effective PPC management, supporting sustainable business growth.',
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const featuredCaseStudies = caseStudies.slice(0, 3);
