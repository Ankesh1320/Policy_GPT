import { useState } from "react";
import { allCompareSchemes } from "../services/compareService";

export const useCompareSchemes = () => {
  const [selectedSchemeIds, setSelectedSchemeIds] = useState([
    "scheme-1",
    "scheme-2",
  ]);
  const [isEditingSelection, setIsEditingSelection] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const selectedSchemes = selectedSchemeIds
    .map((id) => allCompareSchemes.find((s) => s.id === id))
    .filter(Boolean);

  const availableSchemes = allCompareSchemes.filter(
    (s) => !selectedSchemeIds.includes(s.id)
  );

  const setSchemeAt = (index, schemeId) => {
    setSelectedSchemeIds((prev) => {
      const next = [...prev];
      next[index] = schemeId;
      return next;
    });
  };

  const swapSchemes = () => {
    if (selectedSchemeIds.length >= 2) {
      setSelectedSchemeIds((prev) => [prev[1], prev[0], ...prev.slice(2)]);
    }
  };

  const addScheme = (schemeId) => {
    if (selectedSchemeIds.length < 4 && !selectedSchemeIds.includes(schemeId)) {
      setSelectedSchemeIds((prev) => [...prev, schemeId]);
    }
  };

  const removeScheme = (schemeId) => {
    if (selectedSchemeIds.length > 1) {
      setSelectedSchemeIds((prev) => prev.filter((id) => id !== schemeId));
    }
  };

  const confirmCompare = () => {
    setIsEditingSelection(false);
  };

  const editSelection = () => {
    setIsEditingSelection(true);
  };

  return {
    selectedSchemes,
    allCompareSchemes,
    availableSchemes,
    isEditingSelection,
    searchQuery,
    selectedCategory,
    setSchemeAt,
    swapSchemes,
    addScheme,
    removeScheme,
    confirmCompare,
    editSelection,
    setSearchQuery,
    setSelectedCategory,
  };
};
