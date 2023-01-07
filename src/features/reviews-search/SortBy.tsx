import React from "react";

export type SortByTypes = "newest" | "oldest" | "highest" | "lowest";
type Props = {
  sortBy: SortByTypes;
  setSortBy: (sortBy: SortByTypes) => void;
};

function SortBy({ sortBy, setSortBy }: Props) {
  return (
    <div className="sort-by">
      <label htmlFor="sort">Order by:</label>
      <select
        name="sort"
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortByTypes)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>
    </div>
  );
}

export default SortBy;
