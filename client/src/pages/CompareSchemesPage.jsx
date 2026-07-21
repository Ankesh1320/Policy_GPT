import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useCompareSchemes } from "../hooks/useCompareSchemes";
import CompareHeader from "../components/compare/CompareHeader";
import CompareSelectionCard from "../components/compare/CompareSelectionCard";
import CompareTableMatrix from "../components/compare/CompareTableMatrix";

export default function CompareSchemesPage() {
  const {
    allCompareSchemes,
    selectedSchemes,
    isEditingSelection,
    setSchemeAt,
    swapSchemes,
    confirmCompare,
    editSelection,
  } = useCompareSchemes();

  return (
    <div className="min-h-screen bg-white font-body flex flex-col justify-between">
      <div>
        {/* Top Navbar */}
        <Navbar activeLabel="Compare" />

        {/* Hero & Breadcrumb Header */}
        <CompareHeader />

        {/* Main Section with Light Warm Beige Background */}
        <section className="bg-[#FAF5E4] py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 min-h-[700px]">
          <div className="w-full max-w-[1440px] mx-auto">
            {/* Top Selection Card (Switchable between edit mode and summary mode) */}
            <CompareSelectionCard
              allSchemes={allCompareSchemes}
              selectedSchemes={selectedSchemes}
              onSetSchemeAt={setSchemeAt}
              onSwap={swapSchemes}
              isEditing={isEditingSelection}
              onEditSelection={editSelection}
              onConfirmCompare={confirmCompare}
            />

            {/* Comparison Matrix Table */}
            <CompareTableMatrix selectedSchemes={selectedSchemes} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
