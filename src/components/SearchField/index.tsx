"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Search } from "lucide-react";

const SearchField: React.FC = () => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleFiltering() {
    if (search.length > 0) {
      setResults(
        options.filter((option) =>
          option.song.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showResults]);

  useEffect(() => {
    fetch("/api/songs").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOptions(data.songs || []);
        });
      }
    });
  }, []);

  return (
    <div ref={searchRef} className="relative w-full lg:max-w-[24rem]">
      <div className="flex items-center justify-start gap-2 p-2 rounded-lg shadow-md text-white bg-[rgba(255,255,255,0.1)]">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search in your library"
          className="w-full text-white bg-transparent outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFiltering();
          }}
        />
      </div>
      {showResults &&
        searchRef.current &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute bg-[#2D2D2D] p-4 shadow-lg rounded-md z-50`}
            style={{
              width: `${searchRef.current.getBoundingClientRect().width}px`,
              top: `${searchRef.current.getBoundingClientRect().bottom + 8}px`,
              left: `${searchRef.current.getBoundingClientRect().left}px`,
            }}
          >
            {results?.map((result, index) => (
              <Link key={index} href={`/song/${result.id}`}>
                <div
                  className="px-2 py-3 cursor-pointer rounded last:border-none border-b-[1px] border-[#545454] hover:bg-[#3D3D3D]"
                  style={{
                    transition: "all 0.1s ease",
                  }}
                >
                  {result.song.title}
                </div>
              </Link>
            ))}
          </div>,
          document.getElementById("root")!
        )}
    </div>
  );
};

export default SearchField;
