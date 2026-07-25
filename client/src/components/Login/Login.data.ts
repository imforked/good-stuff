import { type Recommendation } from "./components/LoginRecommendation/LoginRecommendation.types";
import {
  forestPark,
  japaneseGarden,
  kensBakery,
  powellsBooks,
} from "./assets";

export const RECOMMENDATIONS: Recommendation[] = [
  {
    title: "Forest Park",
    description: "Quiet trails, even on weekends.",
    recommendedBy: "Sarah",
    backgroundImg: {
      src: forestPark,
      alt: "A misty path through Forest Park",
    },
  },
  {
    title: "Powell's City of Books",
    description: "Get lost in the stacks for an afternoon.",
    recommendedBy: "Marcus",
    backgroundImg: {
      src: powellsBooks,
      alt: "Tall bookshelves inside Powell's City of Books",
    },
  },
  {
    title: "Japanese Garden",
    description: "Still water and soft light after rain.",
    recommendedBy: "Aiko",
    backgroundImg: {
      src: japaneseGarden,
      alt: "A still pond in the Portland Japanese Garden",
    },
  },
  {
    title: "Ken's Artisan Bakery",
    description: "The morning bun worth the wait.",
    recommendedBy: "Elena",
    backgroundImg: {
      src: kensBakery,
      alt: "Fresh morning buns at Ken's Artisan Bakery",
    },
  },
];
