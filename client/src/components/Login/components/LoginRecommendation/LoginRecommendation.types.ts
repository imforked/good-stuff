export type LoginRecommendationProps = {
  recommendations: Recommendation[];
};

type BackgroundImg = {
  src: string;
  alt: string;
};

export type Recommendation = {
  title: string;
  description: string;
  recommendedBy: string;
  backgroundImg: BackgroundImg;
};
