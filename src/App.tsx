/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import { Heart } from "lucide-react";
import "./App.css";
import Switch from "./components/Switch";
import { useFavoritesStore } from "./stores/favorites";

function App() {
  const [songs, setSongs] = useState<any[]>([]);
  const [originalSongs, setOriginalSongs] = useState<any[]>([]);
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, setFavorites } = useFavoritesStore();

  useEffect(() => {
    fetch("/songs").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSongs(data.songs || []);
          setOriginalSongs(data.songs || []);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (alphabeticalOrder) {
      const sortedSongs = [...originalSongs].sort((a, b) =>
        a.song.title.localeCompare(b.song.title)
      );

      if (showFavorites) {
        setSongs(sortedSongs.filter((song) => favorites.includes(song)));
        return;
      }

      setSongs(sortedSongs);
    } else {
      if (showFavorites) {
        setSongs(originalSongs.filter((song) => favorites.includes(song)));
        return;
      }

      setSongs(originalSongs);
    }
  }, [alphabeticalOrder, favorites, originalSongs, showFavorites]);

  return (
    <div className="w-full px-64 py-0">
      <Header showSearch={false} />

      <div className="w-full flex items-center justify-between mt-32 mb-2">
        <div className="flex items-center justify-start gap-4">
          <h2 className="text-white font-bold text-4xl">Your Library</h2>
          <button
            className="flex items-center justify-center px-4 py-2 rounded-3xl gap-2 bg-[#ffffff2c]"
            onClick={() => {
              setShowFavorites(!showFavorites);
            }}
          >
            <Heart
              size={20}
              fill={showFavorites ? "#FF0000" : "transparent"}
              stroke={showFavorites ? "#FF0000" : "white"}
            />
            Favorites
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-fit flex items-center">
            <span className="w-max mr-4 font-semibold">Sort from A-Z</span>
            <Switch
              enabled={alphabeticalOrder}
              onChange={() => {
                setAlphabeticalOrder(!alphabeticalOrder);
              }}
            />
          </div>
          <SearchField />
        </div>
      </div>
      <p className="font-medium opacity-50 mb-8">
        You have {songs.length} songs in your{" "}
        {showFavorites ? "favorites" : "library"}
      </p>

      <div className="w-full grid gap-4 auto-fill-minmax">
        {songs?.map((song) => (
          <div
            key={song}
            className="flex flex-col items-center justify-start bg-[#262626] p-0 rounded-lg shadow-md cursor-pointer"
          >
            <img
              src={`/assets/images/${song.song.files.coverArt}`}
              alt={song.song.name}
              className="w-full rounded-t-lg rounded-b-none mb-2"
            />
            <div className="w-full p-4">
              <h3 className="font-semibold text-lg leading-6 mb-4">
                {song.song.title}
              </h3>
              <div className="w-full flex items-center justify-between gap-4">
                <p className="text-sm text-[#666666]">{song.song.artist}</p>
                <div
                  onClick={() => {
                    if (favorites.includes(song)) {
                      setFavorites(favorites.filter((fav) => fav !== song));
                    } else {
                      setFavorites([...favorites, song]);
                    }
                  }}
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(song) ? "#FF0000" : "transparent"}
                    stroke={favorites.includes(song) ? "#FF0000" : "white"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
