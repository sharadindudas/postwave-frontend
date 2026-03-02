import rocket from "@/assets/rocket.svg";
import star from "@/assets/star.svg";
import bulb from "@/assets/bulb.svg";
import type { SelectOption } from "@/types/common";

export const TOTAL_STEPS = 6;

export const JOURNEY = [
  {
    id: "experienced",
    name: "Experienced",
    description: "I have an existing newsletter",
    icon: star
  },
  {
    id: "beginner",
    name: "Beginner",
    description: "I'm starting a newsletter",
    icon: rocket
  },
  {
    id: "curious",
    name: "Curious",
    description: "I'm unsure, but interested in newsletter",
    icon: bulb
  }
];

export const PLATFORMS_USED = [
  { id: "substack", name: "Substack", isPopular: true },
  { id: "ghost", name: "Ghost", isPopular: true },
  { id: "wordpress", name: "WordPress", isPopular: true },
  { id: "mailchimp", name: "Mailchimp", isPopular: true },
  { id: "campaign-monitor", name: "Campaign Monitor" },
  { id: "convertkit", name: "ConvertKit" },
  { id: "mailerlite", name: "MailerLite" },
  { id: "active-campaign", name: "Active Campaign" },
  { id: "clavijo", name: "Clavijo" },
  { id: "beehiiv", name: "Beehiiv" },
  { id: "medium", name: "Medium" },
  { id: "notion", name: "Notion" }
];

export const CATEGORIES: SelectOption[] = [
  { id: "accessibility", name: "Accessibility" },
  { id: "addiction", name: "Addiction" },
  { id: "art", name: "Art" },
  { id: "business", name: "Business" },
  { id: "career", name: "Career" },
  { id: "design", name: "Design" },
  { id: "education", name: "Education" },
  { id: "finance", name: "Finance" },
  { id: "food", name: "Food" },
  { id: "health", name: "Health" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "marketing", name: "Marketing" },
  { id: "music", name: "Music" },
  { id: "news", name: "News" },
  { id: "photography", name: "Photography" },
  { id: "politics", name: "Politics" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technology" },
  { id: "travel", name: "Travel" },
  { id: "writing", name: "Writing" },
  { id: "entertainment", name: "Entertainment" },
  { id: "fashion", name: "Fashion" },
  { id: "gaming", name: "Gaming" },
  { id: "history", name: "History" },
  { id: "literature", name: "Literature" },
  { id: "philosophy", name: "Philosophy" },
  { id: "psychology", name: "Psychology" }
];

export const PUBLISH_PLANS: SelectOption[] = [
  { id: "daily", name: "Daily" },
  { id: "2-3times", name: "2-3 times a week" },
  { id: "weekly", name: "Weekly" },
  { id: "biweekly", name: "Biweekly (Every 2 weeks)" },
  { id: "monthly", name: "Monthly" },
  { id: "occasionally", name: "Occasionally / Irregularly" },
  { id: "not-sure", name: "Not sure yet" }
];

export const HEAR_ABOUT_US: SelectOption[] = [
  { id: "newsletter", name: "Newsletter" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "banner-ad", name: "Banner Ad" },
  { id: "influencer", name: "Influencer" },
  { id: "reddit", name: "Reddit" },
  { id: "agency-partner", name: "Agency partner" },
  { id: "tiktok", name: "TikTok" },
  { id: "billboard", name: "Billboard" },
  { id: "word-of-mouth", name: "Word-of-Mouth" },
  { id: "news-press", name: "News/Press" },
  { id: "podcast", name: "Podcast" },
  { id: "affiliate-partner", name: "Affiliate Partner" },
  { id: "twitter-x", name: "Twitter/X" },
  { id: "instagram", name: "Instagram" },
  { id: "search-engine", name: "Search Engine" },
  { id: "subway-billboard", name: "Subway Billboard" },
  { id: "youtube", name: "YouTube" },
  { id: "webinar-virtual-events", name: "Webinar/Virtual Events" },
  { id: "spotify-audio-ad", name: "Spotify/Audio ad" },
  { id: "conference", name: "Conference" },
  { id: "facebook", name: "Facebook" },
  { id: "others", name: "Others" }
];

export const PRIMARY_GOALS: SelectOption[] = [
  { id: "trusted-news-source", name: "Become a trusted sources of news" },
  { id: "sustainable-income", name: "Generate sustainable income" },
  { id: "influence-opinion", name: "Influence public opinion and drive change" },
  { id: "reduce-social-media-reliance", name: "Rely less on social media to reach my audience" },
  { id: "community-connections", name: "Builder deeper connections within my community" },
  { id: "nurture-customers", name: "Nurture prospective customers" },
  { id: "grow-brand", name: "Grow my personal or professional brand" },
  { id: "explore-hobby", name: "Explore a hobby or personal interest" },
  { id: "inform-stakeholders", name: "Keep stakeholders informed" }
];
