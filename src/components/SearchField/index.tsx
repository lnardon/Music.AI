/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const portalRoot = document.getElementById("root");

  function handleFiltering() {
    if (search.length > 0) {
      setResults(
        options.filter((option) =>
          option.song.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      console.log(results, options);
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
    fetch("/songs").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOptions(data.songs || []);
        });
      }
    });
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-[24rem]">
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
        portalRoot &&
        searchRef.current &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute bg-gray-800 p-4 shadow-lg rounded-md z-50`}
            style={{
              width: `${searchRef.current.getBoundingClientRect().width}px`,
              top: `${searchRef.current.getBoundingClientRect().bottom + 8}px`,
              left: `${searchRef.current.getBoundingClientRect().left}px`,
            }}
          >
            {results?.map((result, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer"
                onClick={() => {
                  alert("Clicked");
                  setShowResults(false);
                }}
              >
                {result.song.title}
              </div>
            ))}
          </div>,
          portalRoot
        )}
    </div>
  );
};

export default SearchField;
