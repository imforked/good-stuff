import { type PostProps } from "./Post.types";
import { useNavigate } from "react-router";
import { BookmarkIcon } from "./assets/BookmarkIcon";
import { useState } from "react";

const formatLabel = (value: string) => value.replaceAll("_", " ");

export const Post = ({
  heroImgS3Url,
  title,
  shortDescription,
  longDescription,
  type,
  location,
  isBookmarked: initialIsBookmarked,
  user,
  saves,
  _count,
}: PostProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isDescriptionActive, setIsDescriptionActive] = useState(false);

  const navigate = useNavigate();

  const recommenderName = user.profile?.displayName ?? user.name;
  const recommenderImage =
    user.profile?.pfpS3Url ?? user.image ?? undefined;

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
          src={heroImgS3Url}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute flex items-center inset-0 bg-black/55 text-white text-left cursor-pointer z-10 p-5 transition-opacity duration-200 ${
            isDescriptionActive ? "pointer-events-auto" : "pointer-events-none"
          } ${isDescriptionActive ? "opacity-100" : "opacity-0"}`}
        >
          <span>{longDescription}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="text-[10px] font-medium uppercase text-gray-500">
          {formatLabel(type)} &#8226; {formatLabel(location)}
        </span>
        <h2 className="font-serif text-4xl leading-none -mb-1">{title}</h2>
        <span className="block text-gray-500 text-[15px]">
          {shortDescription}
        </span>
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-[5px]">
            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate("add profile path here");
              }}
            >
              {recommenderImage ? (
                <img
                  src={recommenderImage}
                  alt=""
                  className="w-[25px] rounded-full cursor-pointer"
                />
              ) : null}
            </button>
            <span className="text-[10px] text-gray-500">
              Recommended by{" "}
              <span className="font-extrabold">{recommenderName}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {saves.map((save) => {
                const saverImage =
                  save.user.profile?.pfpS3Url ?? save.user.image ?? undefined;

                if (!saverImage) {
                  return null;
                }

                return (
                  <button
                    key={save.id}
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
                      src={saverImage}
                      alt=""
                      className="size-5 rounded-full object-cover ring-1 ring-white"
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] text-gray-500">
              {_count.saves} saved
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
