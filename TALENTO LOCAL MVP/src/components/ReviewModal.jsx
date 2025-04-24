
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RatingStars from "@/components/RatingStars";
import { supabase } from "@/lib/supabase";

const ReviewModal = ({ professional, onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una calificación",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            provider_id: professional.id,
            rating,
            comment: comment.trim() || null
          }
        ]);

      if (error) throw error;

      toast({
        title: "¡Gracias por tu reseña!",
        description: "Tu opinión nos ayuda a mejorar el servicio"
      });

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la reseña",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Calificar a {professional.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación
              </label>
              <RatingStars
                rating={rating}
                onRatingChange={setRating}
                size="large"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentario (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                rows="4"
                placeholder="Comparte tu experiencia..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Enviar reseña
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
