"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Heart, Pause, Play } from "lucide-react";
import Header from "../../../components/Header";
import SongCard from "@/components/SongCard";
import { useFavoritesStore } from "@/stores/favorites";

function Song() {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const path = usePathname();

  const { setFavorites, favorites } = useFavoritesStore();

  const handleTimeUpdate = (): void => {
    const audio = audioRef.current;
    if (audio) {
      const { currentTime, duration } = audio;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };

  function formatTime(seconds = 0): string {
    if (isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${minutes}:${paddedSeconds}`;
  }

  useEffect(() => {
    const id = path.split("/").pop();
    fetch(`/api/getSong?id=${id}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setCurrentSong(data || null);

          fetch("/api/songs").then((response) => {
            if (response.ok) {
              response.json().then((res) => {
                const relatedSongs = res.songs.filter((song: any) =>
                  data?.related?.includes(song?.id)
                );
                setRecommendedSongs(relatedSongs);
              });
            }
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {}, 1000);
    if (audioRef.current?.paused) {
      setIsPlaying(false);
      if (interval) clearInterval(interval);
    } else {
      setIsPlaying(true);
      interval = setInterval(handleTimeUpdate, 1000);
    }

    return () => clearInterval(interval);
  }, [audioRef.current?.paused, currentSong]);

  return (
    <div className="w-full px-8 xl:px-44">
      <Header showSearch={true} />

      <img
        src={`/assets/images/${currentSong?.song.files.poster}`}
        alt="cover"
        className="hidden xl:block absolute top-44 right-8 xl:right-44 rounded w-1/5 z-[-1]"
      />

      <div className="w-full flex flex-col md:flex-row items-center justify-start mt-44 mb-32 gap-8 z-20">
        <img
          src={`/assets/images/${currentSong?.song.files.coverArt}`}
          alt="cover"
          className="rounded w-64 h-64 fadeIn"
        />
        <div className="w-full lg:w-auto">
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mb-12">
            <button
              className="flex items-center justify-center p-4 rounded-full bg-white"
              onClick={() => {
                if (isPlaying) {
                  audioRef.current?.pause();
                } else {
                  audioRef.current?.play();
                }
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <Pause size={32} color="black" fill="black" />
              ) : (
                <Play size={32} color="black" fill="black" />
              )}
            </button>
            <div className="w-full">
              <h1 className="flex items-center gap-4 text-3xl font-semibold mb-4">
                {currentSong?.song.title}
                <Heart
                  className="cursor-pointer"
                  size={24}
                  fill={
                    favorites.includes(currentSong?.id) ? "#F8594E" : "none"
                  }
                  stroke={
                    favorites.includes(currentSong?.id) ? "#F8594E" : "white"
                  }
                  onClick={() => {
                    if (favorites.includes(currentSong?.id)) {
                      setFavorites(
                        favorites.filter((fav: any) => fav !== currentSong?.id)
                      );
                    } else {
                      setFavorites([...favorites, currentSong?.id]);
                    }
                  }}
                />
              </h1>
              <p className="font-medium color-[rgba(255, 255, 255, 0.9)]">
                {currentSong?.song.artist} | {currentSong?.song.album.title} |{" "}
                {currentSong?.song.album.year}
              </p>
            </div>
          </div>

          <div
            className="w-full h-1 bg-[rgba(255,255,255,0.7)] rounded-lg mb-2 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = x / rect.width;
              audioRef.current!.currentTime =
                audioRef.current!.duration * percentage;
              handleTimeUpdate();
            }}
          >
            <div
              className="relative h-full bg-[#00F2D5] rounded-lg"
              style={{
                width: `${progress}%`,
              }}
            >
              <span className="w-4 h-4 rounded-full absolute translate-y-[-50%] top-[50%] right-[-0.5rem] bg-white "></span>
            </div>
          </div>

          <div className="w-full flex justify-between items-center px-2 py-0 mb-2 color-[rgba(255,255,255,0.8)]">
            <span>
              {audioRef.current
                ? formatTime(audioRef.current.currentTime)
                : "0:00"}
            </span>
            <span>
              {audioRef.current
                ? formatTime(audioRef.current.duration)
                : "0:00"}
            </span>
          </div>

          <audio
            ref={audioRef}
            src={`/assets/audio/${currentSong?.song.files.audio}`}
          ></audio>
        </div>
      </div>

      <p className="font-medium text-[rgba(255,255,255,0.7)] mb-4">
        Related songs
      </p>
      <div className="w-full grid gap-4 mb-32 auto-fill-minmax">
        {recommendedSongs?.map((song, idx) => (
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

export default Song;
