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
    <div className="min-h-screen bg-page-warm font-body flex flex-col justify-between">
      <div>
        {/* Top Navbar */}
        <Navbar activeLabel="Compare" />

        {/* Hero & Breadcrumb Header */}
        <CompareHeader />

        {/* Main Section with Cream Background */}
        <main className="bg-cream py-10 px-5 lg:px-20 min-h-[700px]">
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
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
