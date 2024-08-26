import Link from "next/link";
import { useFavoritesStore } from "@/stores/favorites";
import { Heart } from "lucide-react";

const SongCard = ({
  id,
  title,
  artist,
  cover,
  index = 0,
}: {
  id: string;
  title: string;
  artist: string;
  cover: string;
  files: any[];
  index?: number;
}) => {
  const { favorites, setFavorites } = useFavoritesStore();

  return (
    <div
      key={title}
      className="flex flex-col items-center justify-start bg-[#262626] p-0 rounded-lg shadow-md cursor-pointer opacity-0 slideUp"
      style={{
        animationDelay: `${index * 64}ms`,
      }}
    >
      <Link href={`/song/${id}`} className="w-full">
        <img
          src={`/assets/images/${cover}`}
          alt={title}
          className="w-full rounded-t-lg rounded-b-none mb-2"
        />
        <div className="w-full p-4">
          <h3 className="font-semibold text-lg leading-6 mb-4">{title}</h3>

          <div className="w-full flex items-center justify-between gap-4">
            <p className="text-sm text-[#666666]">{artist}</p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (favorites.includes(id)) {
                  setFavorites(favorites.filter((fav: any) => fav !== id));
                } else {
                  setFavorites([...favorites, id]);
                }
              }}
            >
              <Heart
                size={20}
                fill={favorites.includes(id) ? "#F8594E" : "transparent"}
                stroke={favorites.includes(id) ? "#F8594E" : "white"}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SongCard;
