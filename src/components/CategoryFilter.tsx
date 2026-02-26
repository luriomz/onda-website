import { useRef } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

interface CategoryFilterProps {
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 -mx-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selected === cat.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
