import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useCompareSchemes } from "../hooks/useCompareSchemes";
import CompareHeader from "../components/compare/CompareHeader";
import CompareSelectionCard from "../components/compare/CompareSelectionCard";
import CompareTableMatrix from "../components/compare/CompareTableMatrix";
import Sidebar from "../components/navbar/sidebar";
import DashboardNavbar from "../components/navbar/navbar";
import AuthBlocker from "../components/auth/AuthBlocker";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div className="h-screen flex overflow-hidden bg-[#FDF9F2] font-body">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardNavbar
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
            <CompareHeader />
            
            <div className="w-full max-w-[1440px] mx-auto bg-cream p-6 rounded-[24px]">
              <CompareSelectionCard
                allSchemes={allCompareSchemes}
                selectedSchemes={selectedSchemes}
                onSetSchemeAt={setSchemeAt}
                onSwap={swapSchemes}
                isEditing={isEditingSelection}
                onEditSelection={editSelection}
                onConfirmCompare={confirmCompare}
              />
              <CompareTableMatrix selectedSchemes={selectedSchemes} />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-warm font-body flex flex-col justify-between">
      <div>
        {/* Top Navbar */}
        <Navbar activeLabel="Compare" />

        <div className="relative">
          <div className={!token ? "blur-[6px] pointer-events-none select-none" : ""}>
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

          {!token && <AuthBlocker pageName="Compare Schemes" />}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
