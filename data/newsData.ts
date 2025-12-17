export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  duration?: string;
  views?: number;
  isBreaking?: boolean;
  index?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  hasSubmenu?: boolean;
}

export const categories: Category[] = [
  { id: '1', name: 'Politics', slug: 'politics', count: 156 },
  { id: '2', name: 'Business', slug: 'business', count: 89 },
  { id: '3', name: 'Technology', slug: 'technology', count: 124 },
  { id: '4', name: 'Health', slug: 'health', count: 67 },
  { id: '5', name: 'Sports', slug: 'sports', count: 203 },
  { id: '6', name: 'Entertainment', slug: 'entertainment', count: 178 },
  { id: '7', name: 'World', slug: 'world', count: 145 },
  { id: '8', name: 'Lifestyle', slug: 'lifestyle', count: 92 },
  { id: '9', name: 'Education', slug: 'education', count: 56 },
  { id: '10', name: 'Environment', slug: 'environment', count: 34 },
  { id: '11', name: 'Crime', slug: 'crime', count: 78 },
  { id: '12', name: 'Travel', slug: 'travel', count: 45 },
  { id: '13', name: 'General', slug: 'general', count: 234 },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'India To Roll Out Free 30-Day E-Tourist And Group Visas For Russian Citizens',
    excerpt: 'In a major diplomatic move, India announces simplified visa procedures for Russian tourists to boost bilateral relations and tourism.',
    content: `In a significant diplomatic gesture, India has announced the rollout of free 30-day e-tourist visas and group visas for Russian citizens, effective from next month. This landmark decision is expected to significantly boost tourism between the two nations and strengthen bilateral ties.

The Ministry of External Affairs confirmed that the new visa policy will allow Russian nationals to obtain electronic tourist visas without any processing fee for stays up to 30 days. Additionally, group visas will be available for tour groups of 5 or more travelers.

## Key Highlights

The new visa policy includes several benefits:
- Free e-tourist visa for stays up to 30 days
- Simplified group visa procedures for tour operators
- Multiple entry options for frequent travelers
- Expedited processing within 72 hours

## Impact on Tourism

Tourism experts predict this move will increase Russian tourist arrivals by 40% in the coming year. Popular destinations like Goa, Kerala, and Rajasthan are expected to see the highest influx of Russian visitors.

The decision comes amid strengthening India-Russia relations and is seen as a reciprocal gesture following Russia's simplified visa procedures for Indian travelers earlier this year.`,
    category: 'Travel',
    author: 'Rajesh Kumar',
    date: '15 December 2025',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Stock Markets Trade Lower In Early Deals Amid Foreign Fund Outflows And Weak Global Cues',
    excerpt: 'Indian equity markets opened in the red on Monday as foreign institutional investors continued their selling spree amid global uncertainties.',
    content: `Indian stock markets opened lower on Monday, with both benchmark indices trading in the red amid persistent foreign fund outflows and weak global cues. The BSE Sensex fell 234 points to 72,456 in early trade, while the Nifty50 slipped below the 21,900 mark.

## Market Overview

Foreign Institutional Investors (FIIs) have been net sellers for the fifth consecutive session, pulling out over ₹5,000 crore from Indian equities last week. The selling pressure comes amid rising US Treasury yields and a stronger dollar.

## Sector Performance

- Banking stocks led the decline with the Nifty Bank index down 0.8%
- IT stocks showed relative strength amid stable rupee
- Metal and energy stocks traded mixed
- FMCG sector showed resilience

## Expert Analysis

Market analysts suggest that the correction is healthy and provides buying opportunities in quality stocks. "The long-term India growth story remains intact. Current volatility is more driven by global factors than domestic fundamentals," said a leading market strategist.

Investors are advised to maintain a balanced portfolio and use the dips to accumulate fundamentally strong stocks with a medium to long-term view.`,
    category: 'Business',
    author: 'Priya Sharma',
    date: '15 December 2025',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Bondi Beach Shooting: Bystander Who Tackled Attacker Hailed As Hero',
    excerpt: 'A brave bystander who confronted the armed attacker at Bondi Beach shopping center is being praised worldwide for his heroic actions.',
    content: `In the aftermath of the tragic Bondi Beach shopping center incident, attention has turned to the heroic actions of a bystander who confronted the armed attacker, potentially saving numerous lives.

The individual, who has been identified as a 45-year-old security professional, tackled the attacker shortly after the incident began, preventing further casualties. His quick thinking and bravery have earned him praise from law enforcement and the public alike.

## The Heroic Intervention

Witnesses describe how the man, despite the danger, moved towards the attacker while others fled. "He didn't hesitate. He just ran towards the danger when everyone else was running away," said an eyewitness.

## Community Response

The local community has rallied together in support of the victims and to honor the hero. A crowdfunding campaign started in his name has already raised significant funds for victim support services.

## Official Recognition

The Prime Minister has announced that the brave individual will receive the highest civilian honor for his selfless act. "His actions embody the best of humanity - courage in the face of danger and selfless concern for others," the PM stated.`,
    category: 'World',
    author: 'Sarah Mitchell',
    date: '14 December 2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Government Announces Major Healthcare Reform Package Worth ₹50,000 Crore',
    excerpt: 'The Union Cabinet approves comprehensive healthcare reform aimed at strengthening primary healthcare infrastructure across rural India.',
    content: `The Union Cabinet has approved a landmark healthcare reform package worth ₹50,000 crore, aimed at transforming primary healthcare infrastructure across India. The initiative focuses on rural areas and underserved communities.

## Key Components

The reform package includes:
- Construction of 10,000 new primary health centers
- Upgrading existing district hospitals
- Digital health records for all citizens
- Free essential medicines at government facilities

## Implementation Timeline

The program will be rolled out in three phases over the next five years, with the first phase focusing on the most underserved districts identified by NITI Aayog.

## Expected Impact

Health ministry officials estimate that the reforms will:
- Reduce out-of-pocket healthcare expenses by 30%
- Improve maternal and child health outcomes
- Create 2 lakh new jobs in the healthcare sector
- Achieve universal health coverage targets ahead of schedule`,
    category: 'Health',
    author: 'Dr. Anita Desai',
    date: '14 December 2025',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '5',
    title: 'Indian Cricket Team Secures Historic Series Win Against Australia',
    excerpt: 'In a thrilling finale, Team India clinched the test series 3-1 against Australia, marking their first series win Down Under in a decade.',
    content: `The Indian cricket team has created history by winning the test series against Australia 3-1, their first series victory Down Under in over a decade. The triumph comes after a nail-biting final test at the Sydney Cricket Ground.

## Match Highlights

India needed 287 runs on the final day and achieved the target with just 2 wickets remaining. The hero of the chase was the young opener who scored a magnificent 156 not out under immense pressure.

## Captain's Reaction

The jubilant captain praised his team's resilience: "This team has shown incredible character. We came here with belief and executed our plans perfectly. This win belongs to the entire nation."

## Records Broken

The series witnessed several records:
- Highest successful run chase by India in Australia
- Most centuries by an Indian batsman in a single series in Australia
- Best bowling figures by an Indian spinner in Sydney

The victory has put India at the top of the World Test Championship standings with a clear path to the final.`,
    category: 'Sports',
    author: 'Vikram Singh',
    date: '13 December 2025',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '6',
    title: 'New AI Regulations Proposed By Parliament To Ensure Ethical Development',
    excerpt: 'A cross-party committee presents comprehensive AI governance framework focusing on transparency, accountability, and innovation balance.',
    content: `A cross-party parliamentary committee has unveiled a comprehensive framework for regulating artificial intelligence in India. The proposed regulations aim to balance innovation with ethical considerations and public safety.

## Key Provisions

The draft framework includes:
- Mandatory AI impact assessments for high-risk applications
- Transparency requirements for AI decision-making systems
- Data protection standards specific to AI training
- Establishment of a National AI Regulatory Authority

## Industry Response

Tech industry leaders have cautiously welcomed the framework, noting that clear regulations will provide the certainty needed for long-term investments. However, some have expressed concerns about potential innovation barriers.

## Global Context

India joins a growing list of nations developing comprehensive AI governance frameworks. The approach draws inspiration from the EU AI Act while being tailored to India's unique context and development priorities.

The bill is expected to be tabled in the next parliamentary session for debate and discussion.`,
    category: 'Technology',
    author: 'Amit Patel',
    date: '13 December 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '7',
    title: 'Bollywood Blockbuster Breaks Box Office Records In Opening Weekend',
    excerpt: 'The much-anticipated action thriller collects ₹250 crore in its opening weekend, becoming the highest-grossing opener of all time.',
    content: `The highly anticipated Bollywood action thriller has shattered all previous records, collecting an unprecedented ₹250 crore in its opening weekend. The film's success marks a new era for Indian cinema at the box office.

## Record-Breaking Numbers

The film achieved several milestones:
- Highest single-day collection: ₹95 crore
- Best opening weekend ever for a Hindi film
- Highest overseas collection for an Indian film opening
- 100% occupancy in premium formats

## Critical Acclaim

Critics have praised the film's technical achievements and performances. The lead actor's portrayal has been called "career-defining," with Oscar buzz already beginning in film circles.

## Industry Impact

Trade analysts predict the film could cross the ₹500 crore mark domestically, potentially challenging the all-time collection record. The success is seen as a positive sign for the industry's post-pandemic recovery.`,
    category: 'Entertainment',
    author: 'Meera Joshi',
    date: '12 December 2025',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    readTime: '3 min read',
  },
  {
    id: '8',
    title: 'Climate Summit Concludes With Historic Agreement On Carbon Emissions',
    excerpt: 'World leaders reach consensus on ambitious new targets to reduce global carbon emissions by 60% before 2040.',
    content: `The Global Climate Summit has concluded with a historic agreement that commits participating nations to reduce carbon emissions by 60% before 2040. The ambitious target represents a significant escalation from previous commitments.

## Agreement Highlights

The landmark deal includes:
- Legally binding emission reduction targets
- $500 billion climate finance commitment for developing nations
- Technology transfer provisions for clean energy
- Enhanced monitoring and reporting mechanisms

## India's Role

India played a pivotal role in bridging the gap between developed and developing nations. The Indian delegation's proposal for differentiated responsibilities was incorporated into the final text.

## Implementation Challenges

While the agreement is being celebrated as a breakthrough, experts caution that implementation will require unprecedented global cooperation and massive investments in clean technology.

Environmental groups have welcomed the deal while calling for even more ambitious action to limit global warming to 1.5°C.`,
    category: 'Environment',
    author: 'Dr. Ramesh Kumar',
    date: '12 December 2025',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
    readTime: '6 min read',
  },
  {
    id: '9',
    title: 'Major Education Policy Changes Announced For School Curriculum',
    excerpt: 'The Ministry of Education unveils comprehensive curriculum reforms emphasizing skill-based learning and vocational education.',
    content: `The Ministry of Education has announced sweeping changes to the national school curriculum, emphasizing skill-based learning and vocational education from an early age. The reforms align with the National Education Policy goals.

## Key Changes

The new curriculum framework includes:
- Introduction of coding and AI basics from Class 6
- Mandatory vocational courses from Class 8
- Reduced textbook content with focus on conceptual learning
- Flexible assessment patterns replacing annual exams

## Implementation Schedule

The new curriculum will be implemented in phases:
- 2025-26: Pilot in 500 schools
- 2026-27: Expansion to all central schools
- 2027-28: Full nationwide implementation

## Stakeholder Response

Educators have largely welcomed the reforms, though concerns about teacher training and infrastructure remain. Parent groups have emphasized the need for gradual transition and support systems.`,
    category: 'Education',
    author: 'Prof. Sunita Verma',
    date: '11 December 2025',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '10',
    title: 'Cybercrime Unit Busts Major Online Fraud Network Operating Across States',
    excerpt: 'Police arrest 15 individuals involved in a sophisticated online fraud scheme that defrauded thousands of victims across India.',
    content: `The Cybercrime Division has dismantled a major online fraud network that operated across multiple states, arresting 15 individuals allegedly involved in a sophisticated scheme that defrauded thousands of victims.

## Operation Details

The operation, codenamed "Digital Shield," was conducted simultaneously in five states with the coordination of state police forces. The investigation had been ongoing for eight months.

## Modus Operandi

The fraud network operated through:
- Fake investment platforms promising high returns
- Phishing websites mimicking major banks
- Social media scams targeting elderly victims
- Cryptocurrency fraud schemes

## Recovery and Arrests

Authorities have:
- Recovered ₹25 crore in fraudulent proceeds
- Seized 50+ mobile phones and computers
- Identified over 5,000 victim accounts
- Frozen 100+ bank accounts linked to the network

The arrested individuals face charges under the IT Act and IPC sections related to fraud and criminal conspiracy.`,
    category: 'Crime',
    author: 'Inspector Raj Malhotra',
    date: '11 December 2025',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '11',
    title: 'Opposition Leaders Meet To Discuss Pre-Poll Alliance Strategy',
    excerpt: 'Major opposition parties convene to finalize seat-sharing arrangements and common minimum program ahead of upcoming elections.',
    content: `Leaders of major opposition parties met in New Delhi to discuss and finalize their alliance strategy for the upcoming general elections. The meeting focused on seat-sharing arrangements and developing a common agenda.

## Key Discussions

The meeting addressed:
- Seat distribution across 543 parliamentary constituencies
- Common minimum program on key issues
- Joint campaign strategy and resource sharing
- Leadership coordination mechanisms

## Participating Parties

Representatives from over 20 opposition parties attended the meeting, marking one of the largest gatherings of opposition leaders in recent years.

## Challenges Ahead

While the meeting was described as "productive" by participants, observers note that finalizing seat-sharing in key states remains a challenge due to competing claims and historical rivalries.

The alliance partners are expected to announce their final arrangements next month.`,
    category: 'Politics',
    author: 'Deepak Sharma',
    date: '10 December 2025',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '12',
    title: 'Luxury Train Journey Through Rajasthan Attracts Record Tourists',
    excerpt: 'The Palace on Wheels records highest occupancy in its history as heritage tourism sees unprecedented growth in the region.',
    content: `The iconic Palace on Wheels luxury train has recorded its highest occupancy rates in history, reflecting the growing global interest in heritage tourism in Rajasthan. The train, which offers a week-long journey through the royal state, has been fully booked for the next six months.

## Tourist Surge

Key statistics reveal:
- 98% occupancy rate this season
- 40% increase in international bookings
- New demographic: younger travelers seeking experiential travel
- Strong demand from European and American markets

## Enhanced Experience

The train management has introduced several new features:
- Upgraded suites with modern amenities
- Curated cultural performances onboard
- Exclusive access to heritage properties
- Gourmet dining featuring royal Rajasthani cuisine

## Economic Impact

The tourism surge has positively impacted local economies along the train's route, with handicraft sales and hospitality services seeing significant growth.

Rajasthan Tourism is planning to introduce additional luxury train options to meet the growing demand.`,
    category: 'Travel',
    author: 'Kavita Mehra',
    date: '10 December 2025',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '13',
    title: 'Wellness Trends: Ayurvedic Retreats See 200% Growth In Bookings',
    excerpt: 'Traditional Indian wellness practices gain global recognition as international visitors flock to authentic Ayurvedic treatment centers.',
    content: `Ayurvedic wellness retreats across India have witnessed a remarkable 200% increase in bookings over the past year, as traditional Indian healing practices gain mainstream global acceptance. Kerala and Uttarakhand lead this wellness tourism boom.

## Driving Factors

The surge is attributed to:
- Post-pandemic focus on holistic health
- Celebrity endorsements of Ayurvedic practices
- Scientific validation of traditional treatments
- Affordable luxury compared to Western alternatives

## Popular Treatments

Most sought-after therapies include:
- Panchakarma detoxification
- Stress management programs
- Chronic condition management
- Beauty and rejuvenation treatments

## Quality Standards

The government has introduced new certification standards for Ayurvedic wellness centers to ensure authentic and safe treatments for international visitors.

Industry experts predict the wellness tourism sector could reach $10 billion by 2027.`,
    category: 'Lifestyle',
    author: 'Dr. Sanjay Gupta',
    date: '9 December 2025',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '14',
    title: 'Tech Giants Announce Major Investments In Indian Semiconductor Manufacturing',
    excerpt: 'Global technology companies commit over $10 billion to establish semiconductor fabrication facilities in India.',
    content: `In a major boost to India's semiconductor ambitions, leading global technology companies have announced investments totaling over $10 billion to establish fabrication facilities in the country. The move is part of the government's semiconductor mission.

## Investment Details

The investments include:
- Two new fab facilities in Gujarat and Tamil Nadu
- ATMP (Assembly, Testing, Marking, Packaging) units
- Research and development centers
- Training institutes for skilled workforce

## Government Support

The government has approved:
- 50% capital subsidy for fab facilities
- Tax incentives for 10 years
- Single-window clearance system
- Land and infrastructure support

## Strategic Importance

This development positions India in the global semiconductor supply chain, reducing dependence on imports and creating an estimated 100,000 direct jobs.

Production is expected to commence by 2027, with full capacity operations by 2030.`,
    category: 'Technology',
    author: 'Rahul Verma',
    date: '9 December 2025',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: '15',
    title: 'Rural Employment Scheme Shows Record Job Creation In November',
    excerpt: 'MGNREGA generates 45 million person-days of employment in November, highest in five years as rural economy strengthens.',
    content: `The Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA) has achieved record job creation in November, generating 45 million person-days of employment. This marks the highest monthly figure in five years.

## Key Highlights

The achievement includes:
- 45 million person-days of work generated
- 12 million households benefited
- ₹8,500 crore disbursed as wages
- Focus on water conservation and rural infrastructure

## Regional Distribution

Top performing states:
1. Uttar Pradesh - 8 million person-days
2. Madhya Pradesh - 6 million person-days
3. Rajasthan - 5.5 million person-days
4. West Bengal - 5 million person-days

## Government Response

The Rural Development Ministry has allocated additional funds to sustain the momentum. "This shows the program's continued relevance in providing livelihood security to rural households," said the ministry spokesperson.

The increased employment is also linked to extensive pre-monsoon preparation works undertaken across states.`,
    category: 'General',
    author: 'Suresh Yadav',
    date: '8 December 2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    readTime: '4 min read',
  },
  {
    id: '16',
    title: 'Rural Employment Scheme Shows Record Job Creation In November',
    excerpt: 'MGNREGA generates 45 million person-days of employment in November, highest in five years as rural economy strengthens.',
    content: `The Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA) has achieved record job creation in November, generating 45 million person-days of employment. This marks the highest monthly figure in five years.

## Key Highlights

The achievement includes:
- 45 million person-days of work generated
- 12 million households benefited
- ₹8,500 crore disbursed as wages
- Focus on water conservation and rural infrastructure

## Regional Distribution

Top performing states:
1. Uttar Pradesh - 8 million person-days
2. Madhya Pradesh - 6 million person-days
3. Rajasthan - 5.5 million person-days
4. West Bengal - 5 million person-days

## Government Response

The Rural Development Ministry has allocated additional funds to sustain the momentum. "This shows the program's continued relevance in providing livelihood security to rural households," said the ministry spokesperson.

The increased employment is also linked to extensive pre-monsoon preparation works undertaken across states.`,
    category: 'General',
    author: 'Suresh Yadav',
    date: '8 December 2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    readTime: '4 min read',
  },
];

export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return articles.filter(
    (article) => article.category.toLowerCase() === categorySlug.toLowerCase()
  );
};

export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};

export const getRelatedArticles = (currentId: string, category: string, limit: number = 3): Article[] => {
  return articles
    .filter((article) => article.id !== currentId && article.category === category)
    .slice(0, limit);
};

export const getFeaturedArticles = (limit: number = 5): Article[] => {
  return articles.slice(0, limit);
};

export const getLatestArticles = (limit: number = 10): Article[] => {
  return articles.slice(0, limit);
};
