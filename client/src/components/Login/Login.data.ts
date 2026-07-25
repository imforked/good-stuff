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
    recommendedBy: "Jordan",
    backgroundImg: {
      src: forestPark,
      alt: "A misty path through Forest Park",
    },
  },
  {
    title: "Powell's City of Books",
    description: "Easy to lose a whole afternoon in here.",
    recommendedBy: "Sam",
    backgroundImg: {
      src: powellsBooks,
      alt: "Tall bookshelves inside Powell's City of Books",
    },
  },
  {
    title: "Japanese Garden",
    description: "Worth going even when it's gray out.",
    recommendedBy: "Casey",
    backgroundImg: {
      src: japaneseGarden,
      alt: "A still pond in the Portland Japanese Garden",
    },
  },
  {
    title: "Ken's Artisan Bakery",
    description: "Get there early for the morning bun.",
    recommendedBy: "Riley",
    backgroundImg: {
      src: kensBakery,
      alt: "Fresh morning buns at Ken's Artisan Bakery",
    },
  },
];
