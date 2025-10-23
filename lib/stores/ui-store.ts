/**
 * UI Store - Manages UI state (panels, modals, etc.)
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ============================================================================
// STATE INTERFACE
// ============================================================================

interface UIState {
  // Sidebars
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
  leftSidebarTab: 'elements' | 'components' | 'pages';
  rightSidebarTab: 'properties' | 'settings' | 'layers';

  // Panels
  isMediaLibraryOpen: boolean;
  isDesignSystemOpen: boolean;
  isCodeExportOpen: boolean;

  // Modals
  activeModal: string | null;
  modalData: any;

  // Zoom
  zoomLevel: number;

  // Other UI
  isCommandPaletteOpen: boolean;
}

interface UIActions {
  // Sidebars
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setLeftSidebarTab: (tab: 'elements' | 'components' | 'pages') => void;
  setRightSidebarTab: (tab: 'properties' | 'settings' | 'layers') => void;

  // Panels
  toggleMediaLibrary: () => void;
  toggleDesignSystem: () => void;
  toggleCodeExport: () => void;

  // Modals
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;

  // Zoom
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // Command Palette
  toggleCommandPalette: () => void;
}

type UIStore = UIState & UIActions;

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: UIState = {
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  leftSidebarTab: 'elements',
  rightSidebarTab: 'properties',
  isMediaLibraryOpen: false,
  isDesignSystemOpen: false,
  isCodeExportOpen: false,
  activeModal: null,
  modalData: null,
  zoomLevel: 100,
  isCommandPaletteOpen: false,
};

// ============================================================================
// STORE
// ============================================================================

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Sidebars
        toggleLeftSidebar: () =>
          set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),

        toggleRightSidebar: () =>
          set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),

        setLeftSidebarTab: (tab) => set({ leftSidebarTab: tab }),

        setRightSidebarTab: (tab) => set({ rightSidebarTab: tab }),

        // Panels
        toggleMediaLibrary: () =>
          set((state) => ({ isMediaLibraryOpen: !state.isMediaLibraryOpen })),

        toggleDesignSystem: () =>
          set((state) => ({ isDesignSystemOpen: !state.isDesignSystemOpen })),

        toggleCodeExport: () =>
          set((state) => ({ isCodeExportOpen: !state.isCodeExportOpen })),

        // Modals
        openModal: (modalId, data) =>
          set({ activeModal: modalId, modalData: data }),

        closeModal: () => set({ activeModal: null, modalData: null }),

        // Zoom
        setZoomLevel: (level) =>
          set({ zoomLevel: Math.max(25, Math.min(200, level)) }),

        zoomIn: () =>
          set((state) => ({ zoomLevel: Math.min(200, state.zoomLevel + 10) })),

        zoomOut: () =>
          set((state) => ({ zoomLevel: Math.max(25, state.zoomLevel - 10) })),

        resetZoom: () => set({ zoomLevel: 100 }),

        // Command Palette
        toggleCommandPalette: () =>
          set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
      }),
      {
        name: 'ui-store',
        // Only persist certain UI preferences
        partialize: (state) => ({
          isLeftSidebarOpen: state.isLeftSidebarOpen,
          isRightSidebarOpen: state.isRightSidebarOpen,
          leftSidebarTab: state.leftSidebarTab,
          rightSidebarTab: state.rightSidebarTab,
          zoomLevel: state.zoomLevel,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);
