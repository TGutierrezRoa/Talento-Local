
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RatingStars = ({ rating, onRatingChange, readOnly = false, size = "medium" }) => {
  const stars = [1, 2, 3, 4, 5];
  
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readOnly}
          className={cn(
            "focus:outline-none transition-colors",
            !readOnly && "cursor-pointer hover:scale-110"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
