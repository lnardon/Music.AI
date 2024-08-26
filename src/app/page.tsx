"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Header from "../components/Header";
import SearchField from "../components/SearchField";
import Switch from "../components/Switch";
import { useFavoritesStore } from "../stores/favorites";
import SongCard from "@/components/SongCard";
import "./globals.css";

function Home() {
  const [songs, setSongs] = useState<any[]>([]);
  const [originalSongs, setOriginalSongs] = useState<any[]>([]);
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites } = useFavoritesStore();

  useEffect(() => {
    fetch("/api/songs").then((response) => {
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
        setSongs(sortedSongs.filter((song) => favorites.includes(song.id)));
        return;
      }

      setSongs(sortedSongs);
    } else {
      if (showFavorites) {
        setSongs(originalSongs.filter((song) => favorites.includes(song.id)));
        return;
      }

      setSongs(originalSongs);
    }
  }, [alphabeticalOrder, favorites, originalSongs, showFavorites]);

  return (
    <div className="w-full px-8 py-0 xl:px-44">
      <Header showSearch={false} />

      <div className="w-full flex flex-col lg:flex-row items-center justify-between mt-32 mb-2 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 w-full">
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
        <div className="flex items-start lg:items-center lg:justify-end gap-4 lg:gap-2 w-full flex-col-reverse lg:flex-row">
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

      <div className="w-full grid gap-4 mb-32 auto-fill-minmax">
        {songs?.map((song, idx) => (
          <SongCard
            key={song.id}
            id={song.id}
            title={song.song.title}
            artist={song.song.artist}
            cover={song.song.files.coverArt}
            files={song.song.files}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
