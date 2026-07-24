import { type LoginRecommendationProps } from "./LoginRecommendation.types";

export const LoginRecommendation = ({
  recommendations,
}: LoginRecommendationProps) => {
  return (
    <div className="relative w-full h-[70svh]">
      {recommendations.map(
        ({ title, description, recommendedBy, backgroundImg }) => {
          return (
            <div key={title} className="absolute inset-0 overflow-hidden">
              <img
                src={backgroundImg.src}
                alt={backgroundImg.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
              <div className="absolute left-10 bottom-0 pb-15 text-left text-white">
                <h2 className="font-serif text-3xl tracking-wide leading-none text-balance">
                  {title}
                </h2>
                <p className="text-base leading-7 text-white/90">
                  {description}
                </p>
                <p className="text-sm text-white/70">
                  Recommended by {recommendedBy}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
