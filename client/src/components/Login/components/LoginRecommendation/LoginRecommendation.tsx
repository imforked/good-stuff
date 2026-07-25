import { type Recommendation } from "./LoginRecommendation.types";

export const LoginRecommendation = ({
  recommendation,
  isNextRecommendation,
}: {
  recommendation: Recommendation;
  isNextRecommendation?: boolean;
}) => {
  return (
    <div
      className={`relative w-full h-[70svh] ${
        isNextRecommendation ? "absolute" : ""
      }`}
    >
      <div
        key={recommendation.title}
        className="absolute inset-0 overflow-hidden"
      >
        <img
          src={recommendation.backgroundImg.src}
          alt={recommendation.backgroundImg.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
        <div className="absolute left-10 bottom-0 pb-15 text-left text-white">
          <h2 className="font-serif text-3xl tracking-wide leading-none text-balance">
            {recommendation.title}
          </h2>
          <p className="text-base leading-7 text-white/90">
            {recommendation.description}
          </p>
          <p className="text-sm text-white/70">
            Recommended by {recommendation.recommendedBy}
          </p>
        </div>
      </div>
    </div>
  );
};
