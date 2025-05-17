"use client";

import Image from "next/image";
import { useState } from "react";

interface PageTitleWithSearchProps {
  title: string;
  placeholder?: string;
  onSearch?: (term: string) => void;
}

export default function PageTitleWithSearch({
  title,
  placeholder = "Search...",
  onSearch,
}: PageTitleWithSearchProps) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(term);
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <h2 className="text-2xl font-semibold text-black">{title}</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-[250px] h-[40px] rounded-full bg-[#F4F8F7] px-5 text-[16px] placeholder:text-[#aaa] placeholder:text-[18px] text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="w-[40px] h-[40px] bg-[#FFFAA2] rounded-full flex items-center justify-center"
        >
          <Image
            src="/asset/material-symbols_searchSVG.svg"
            alt="search"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
