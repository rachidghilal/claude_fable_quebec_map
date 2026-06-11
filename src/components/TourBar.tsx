import { ChevronLeft, ChevronRight, X } from "lucide-react";

type TourBarProps = {
  index: number;
  total: number;
  placeName: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

export function TourBar({ index, total, placeName, onPrevious, onNext, onClose }: TourBarProps) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="tour-bar" aria-live="polite">
      <div className="tour-copy">
        <span>
          {index + 1}/{total}
        </span>
        <strong>{placeName}</strong>
      </div>
      <div className="tour-actions">
        <button type="button" onClick={onPrevious} disabled={isFirst} aria-label="Étape précédente">
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <button type="button" className="tour-next" onClick={onNext}>
          <span>{isLast ? "Terminer" : "Suivant"}</span>
          {!isLast && <ChevronRight size={16} aria-hidden="true" />}
        </button>
        <button type="button" onClick={onClose} aria-label="Fermer la visite">
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
