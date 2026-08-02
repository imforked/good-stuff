import { type PostProps } from "./Post.types";
import fpHero from "./assets/hero/forest-park-hero.png";
import recommendedBy from "./assets/headshots/headshot-01.png";
import * as headshotsImgs from "./assets/headshots";
import { useNavigate } from "react-router";
import { BookmarkIcon } from "./assets/BookmarkIcon";
import { useState } from "react";

export const Post = ({}: PostProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDescriptionActive, setIsDescriptionActive] = useState(false);

  const navigate = useNavigate();

  const headshots = Object.values(headshotsImgs);

  return (
    <button
      onClick={() => setIsDescriptionActive(!isDescriptionActive)}
      className="relative w-full rounded-md shadow bg-white overflow-hidden text-left cursor-pointer"
    >
      <button
        className="absolute top-3 right-3 z-1 cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          setIsBookmarked(!isBookmarked);
        }}
      >
        <BookmarkIcon filled={isBookmarked} className="text-white" />
      </button>
      <div className="relative w-full aspect-3/2">
        <img
          src={fpHero}
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute flex items-center inset-0 bg-black/55 text-white text-left cursor-pointer z-10 p-5 transition-opacity duration-200 ${
            isDescriptionActive ? "pointer-events-auto" : "pointer-events-none"
          } ${isDescriptionActive ? "opacity-100" : "opacity-0"}`}
        >
          {/* TODO: YOU MUST CAP THIS AT 200 CHARACTERS */}
          <span>
            I come back to Forest Park whenever Portland feels too loud. Trails
            stay quiet even on weekends, and the mossy light feels far from the
            city. An hour resets your head—easy beauty I’d send a friend to.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="text-[10px] font-medium uppercase text-gray-500">
          Hike &#8226; NorthWest
        </span>
        <h2 className="font-serif text-4xl leading-none -mb-1">Forest Park</h2>
        <span className="block text-gray-500 text-[15px]">
          Quiet trails, even on weekends
        </span>
        <div className={`flex justify-between w-full items-center`}>
          <div className="flex items-center gap-[5px]">
            <button
              onClick={(event) => {
                event?.stopPropagation();
                navigate("add profile path here");
              }}
            >
              <img
                src={recommendedBy}
                className="w-[25px] rounded-full cursor-pointer"
              />
            </button>
            <span className="text-[10px] text-gray-500">
              Recommended by <span className="font-extrabold">Sarah</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {headshots.slice(1, 4).map((headshot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log(
                      "eventually this will open a list of people who saved the recommendation"
                    );
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={headshot}
                    alt=""
                    className="size-5 rounded-full object-cover ring-1 ring-white"
                  />
                </button>
              ))}
            </div>
            <span className="text-[10px] text-gray-500">
              {headshots.length - 1} saved
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
