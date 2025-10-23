/**
 * Canvas Store - Manages the builder canvas state
 * Handles elements, selection, undo/redo, device preview
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ElementNode } from '@/types/element';
import { generateId } from '@/lib/utils';

// ============================================================================
// STATE INTERFACE
// ============================================================================

interface CanvasState {
  // Page & Content
  pageId: string;
  elements: ElementNode[];

  // Selection
  selectedElementId: string | null;
  hoveredElementId: string | null;

  // History (undo/redo)
  history: ElementNode[][];
  historyIndex: number;
  maxHistorySize: number;

  // Device preview
  device: 'desktop' | 'tablet' | 'mobile';

  // UI State
  isPreviewMode: boolean;
  isDragging: boolean;
}

interface CanvasActions {
  // Page Management
  setPageId: (pageId: string) => void;
  loadElements: (elements: ElementNode[]) => void;

  // Selection
  selectElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;

  // Element Management
  addElement: (element: ElementNode, parentId?: string, index?: number) => void;
  updateElement: (id: string, updates: Partial<ElementNode>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  moveElement: (id: string, newParentId: string | null, index: number) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Device Preview
  setDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;

  // UI State
  setPreviewMode: (enabled: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;

  // Utility
  findElement: (id: string) => ElementNode | null;
  findParent: (id: string) => ElementNode | null;
  reset: () => void;
}

type CanvasStore = CanvasState & CanvasActions;

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: CanvasState = {
  pageId: '',
  elements: [],
  selectedElementId: null,
  hoveredElementId: null,
  history: [[]],
  historyIndex: 0,
  maxHistorySize: 50,
  device: 'desktop',
  isPreviewMode: false,
  isDragging: false,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Add snapshot to history for undo/redo
 */
function addToHistory(state: CanvasState): Partial<CanvasState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(JSON.parse(JSON.stringify(state.elements)));

  if (newHistory.length > state.maxHistorySize) {
    newHistory.shift();
  }

  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

/**
 * Find element by ID (recursive)
 */
function findElementById(elements: ElementNode[], id: string): ElementNode | null {
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Find parent of element
 */
function findParentElement(elements: ElementNode[], childId: string, parent: ElementNode | null = null): ElementNode | null {
  for (const element of elements) {
    if (element.children?.some((child) => child.id === childId)) {
      return element;
    }
    if (element.children) {
      const found = findParentElement(element.children, childId, element);
      if (found) return found;
    }
  }
  return parent;
}

/**
 * Delete element by ID (recursive)
 */
function deleteElementById(elements: ElementNode[], id: string): ElementNode[] {
  return elements
    .filter((element) => element.id !== id)
    .map((element) => ({
      ...element,
      children: element.children ? deleteElementById(element.children, id) : undefined,
    }));
}

/**
 * Update element by ID (recursive)
 */
function updateElementById(
  elements: ElementNode[],
  id: string,
  updates: Partial<ElementNode>
): ElementNode[] {
  return elements.map((element) => {
    if (element.id === id) {
      return { ...element, ...updates };
    }
    if (element.children) {
      return {
        ...element,
        children: updateElementById(element.children, id, updates),
      };
    }
    return element;
  });
}

// ============================================================================
// STORE
// ============================================================================

export const useCanvasStore = create<CanvasStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Page Management
      setPageId: (pageId) => set({ pageId }),

      loadElements: (elements) =>
        set((state) => ({
          elements,
          selectedElementId: null,
          ...addToHistory({ ...state, elements }),
        })),

      // Selection
      selectElement: (id) => set({ selectedElementId: id }),
      setHoveredElement: (id) => set({ hoveredElementId: id }),

      // Element Management
      addElement: (element, parentId, index) =>
        set((state) => {
          let newElements = [...state.elements];

          if (parentId) {
            // Add to specific parent
            const addToParent = (elements: ElementNode[]): ElementNode[] => {
              return elements.map((el) => {
                if (el.id === parentId) {
                  const children = el.children || [];
                  const newChildren = [...children];
                  if (index !== undefined) {
                    newChildren.splice(index, 0, element);
                  } else {
                    newChildren.push(element);
                  }
                  return { ...el, children: newChildren };
                }
                if (el.children) {
                  return { ...el, children: addToParent(el.children) };
                }
                return el;
              });
            };
            newElements = addToParent(newElements);
          } else {
            // Add to root
            if (index !== undefined) {
              newElements.splice(index, 0, element);
            } else {
              newElements.push(element);
            }
          }

          return {
            elements: newElements,
            selectedElementId: element.id,
            ...addToHistory({ ...state, elements: newElements }),
          };
        }),

      updateElement: (id, updates) =>
        set((state) => {
          const newElements = updateElementById(state.elements, id, updates);
          return {
            elements: newElements,
            ...addToHistory({ ...state, elements: newElements }),
          };
        }),

      deleteElement: (id) =>
        set((state) => {
          const newElements = deleteElementById(state.elements, id);
          return {
            elements: newElements,
            selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
            ...addToHistory({ ...state, elements: newElements }),
          };
        }),

      duplicateElement: (id) =>
        set((state) => {
          const element = findElementById(state.elements, id);
          if (!element) return state;

          const duplicateWithNewIds = (el: ElementNode): ElementNode => ({
            ...el,
            id: generateId(),
            children: el.children?.map(duplicateWithNewIds),
          });

          const duplicated = duplicateWithNewIds(element);
          const parent = findParentElement(state.elements, id);

          let newElements = [...state.elements];

          if (parent) {
            // Add next to original in parent
            newElements = updateElementById(newElements, parent.id, {
              children: parent.children?.flatMap((child) =>
                child.id === id ? [child, duplicated] : [child]
              ),
            });
          } else {
            // Add next to original in root
            const index = newElements.findIndex((el) => el.id === id);
            newElements.splice(index + 1, 0, duplicated);
          }

          return {
            elements: newElements,
            selectedElementId: duplicated.id,
            ...addToHistory({ ...state, elements: newElements }),
          };
        }),

      moveElement: (id, newParentId, index) =>
        set((state) => {
          // Implementation for drag-and-drop reordering
          // This is a complex operation - for now, just update parent reference
          const element = findElementById(state.elements, id);
          if (!element) return state;

          // Remove from current location
          let newElements = deleteElementById(state.elements, id);

          // Add to new location
          if (newParentId) {
            const addToParent = (elements: ElementNode[]): ElementNode[] => {
              return elements.map((el) => {
                if (el.id === newParentId) {
                  const children = el.children || [];
                  const newChildren = [...children];
                  newChildren.splice(index, 0, element);
                  return { ...el, children: newChildren };
                }
                if (el.children) {
                  return { ...el, children: addToParent(el.children) };
                }
                return el;
              });
            };
            newElements = addToParent(newElements);
          } else {
            newElements.splice(index, 0, element);
          }

          return {
            elements: newElements,
            ...addToHistory({ ...state, elements: newElements }),
          };
        }),

      // History
      undo: () =>
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              elements: JSON.parse(JSON.stringify(state.history[newIndex])),
              historyIndex: newIndex,
            };
          }
          return state;
        }),

      redo: () =>
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              elements: JSON.parse(JSON.stringify(state.history[newIndex])),
              historyIndex: newIndex,
            };
          }
          return state;
        }),

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      // Device Preview
      setDevice: (device) => set({ device }),

      // UI State
      setPreviewMode: (enabled) => set({ isPreviewMode: enabled }),
      setIsDragging: (isDragging) => set({ isDragging }),

      // Utility
      findElement: (id) => findElementById(get().elements, id),
      findParent: (id) => findParentElement(get().elements, id),

      reset: () => set(initialState),
    }),
    { name: 'CanvasStore' }
  )
);
