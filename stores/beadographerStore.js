import { defineStore } from "pinia";

const STORAGE_KEY = "mila_beadographer";

const createGrid = (rows, cols, fill = "") =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));

const defaultPalette = [
  { id: "color-1", name: "White", hex: "#ffffff", symbol: "A" },
  { id: "color-2", name: "Black", hex: "#000000", symbol: "B" },
  { id: "color-3", name: "Red", hex: "#e53935", symbol: "C" },
  { id: "color-4", name: "Blue", hex: "#1e88e5", symbol: "D" },
];

const snapshotState = (state) => ({
  grid: JSON.parse(JSON.stringify(state.grid)),
  palette: JSON.parse(JSON.stringify(state.palette)),
  overlayImage: JSON.parse(JSON.stringify(state.overlayImage)),
  gridSettings: JSON.parse(JSON.stringify(state.gridSettings)),
  selectedTool: state.selectedTool,
  selectedColorId: state.selectedColorId,
  patternMetadata: JSON.parse(JSON.stringify(state.patternMetadata)),
});

export const useBeadographerStore = defineStore("beadographer", {
  state: () => ({
    grid: createGrid(20, 20),
    palette: defaultPalette,
    overlayImage: {
      src: "",
      opacity: 0.4,
      fitToGrid: true,
      position: { x: 0, y: 0 },
      visible: true,
    },
    undoStack: [],
    redoStack: [],
    selectedTool: "pencil",
    selectedColorId: defaultPalette[0].id,
    gridSettings: { rows: 20, cols: 20, zoom: 1 },
    patternMetadata: { name: "Untitled Pattern", description: "", tags: "" },
    savedPatterns: [],
    autoSaveInterval: null,
    lastLoadedId: null,
  }),
  getters: {
    paletteMap(state) {
      return state.palette.reduce((map, color) => {
        map[color.id] = color;
        map[color.symbol] = color;
        return map;
      }, {});
    },
    gridRows(state) {
      return state.gridSettings.rows;
    },
    gridCols(state) {
      return state.gridSettings.cols;
    },
    selectedColor(state) {
      return state.palette.find((c) => c.id === state.selectedColorId);
    },
  },
  actions: {
    init() {
      if (process.client) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            this.applyJsonSnapshot(parsed);
            this.savedPatterns = parsed.savedPatterns || [];
            this.lastLoadedId = parsed.lastLoadedId || null;
          } catch (e) {
            console.warn("Failed to parse stored beadographer state", e);
          }
        }
        this.startAutoSave();
      }
    },
    startAutoSave() {
      if (!process.client) return;
      if (this.autoSaveInterval) {
        clearInterval(this.autoSaveInterval);
      }
      this.autoSaveInterval = setInterval(() => {
        this.persistState();
      }, 1000);
    },
    persistState() {
      if (!process.client) return;
      const payload = {
        grid: this.grid,
        palette: this.palette,
        overlayImage: this.overlayImage,
        gridSettings: this.gridSettings,
        selectedTool: this.selectedTool,
        selectedColorId: this.selectedColorId,
        patternMetadata: this.patternMetadata,
        savedPatterns: this.savedPatterns,
        lastLoadedId: this.lastLoadedId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    resetGrid() {
      this.pushHistory();
      this.grid = createGrid(this.gridSettings.rows, this.gridSettings.cols);
      this.persistState();
    },
    setTool(tool) {
      this.selectedTool = tool;
    },
    setZoom(zoom) {
      this.gridSettings.zoom = Math.min(4, Math.max(0.5, zoom));
    },
    applyTool(payload) {
      const { row, col, colorId } = payload;
      if (row === undefined || col === undefined) return;
      const targetColor = colorId || this.selectedColorId;

      if (this.selectedTool === "eyedropper") {
        const picked = this.grid[row][col];
        if (picked) this.selectedColorId = picked;
        return;
      }
      if (this.selectedTool === "pan") {
        console.log("Pan tool placeholder");
        return;
      }

      this.pushHistory();
      if (this.selectedTool === "eraser") {
        this.grid[row][col] = "";
      } else if (this.selectedTool === "fill-row") {
        this.grid[row] = this.grid[row].map(() => targetColor);
      } else if (this.selectedTool === "fill-col") {
        this.grid.forEach((r) => (r[col] = targetColor));
      } else {
        this.grid[row][col] = targetColor;
      }
      this.persistState();
      console.log("applyTool", this.selectedTool, row, col);
    },
    pushHistory() {
      this.undoStack.push(snapshotState(this));
      this.redoStack = [];
    },
    undo() {
      if (!this.undoStack.length) return;
      const previous = this.undoStack.pop();
      this.redoStack.push(snapshotState(this));
      this.applySnapshot(previous);
    },
    redo() {
      if (!this.redoStack.length) return;
      const next = this.redoStack.pop();
      this.undoStack.push(snapshotState(this));
      this.applySnapshot(next);
    },
    applySnapshot(snapshot) {
      this.grid = snapshot.grid;
      this.palette = snapshot.palette;
      this.overlayImage = snapshot.overlayImage;
      this.gridSettings = snapshot.gridSettings;
      this.selectedTool = snapshot.selectedTool;
      this.selectedColorId = snapshot.selectedColorId;
      this.patternMetadata = snapshot.patternMetadata;
      this.persistState();
    },
    updateGridSize(rows, cols) {
      const newRows = Math.min(300, Math.max(5, Number(rows) || 0));
      const newCols = Math.min(300, Math.max(5, Number(cols) || 0));
      this.pushHistory();
      const newGrid = createGrid(newRows, newCols);
      for (let r = 0; r < Math.min(newRows, this.grid.length); r++) {
        for (let c = 0; c < Math.min(newCols, this.grid[0].length); c++) {
          newGrid[r][c] = this.grid[r]?.[c] || "";
        }
      }
      this.grid = newGrid;
      this.gridSettings.rows = newRows;
      this.gridSettings.cols = newCols;
      this.persistState();
    },
    addColor(color) {
      const id = `color-${Date.now()}`;
      this.palette.push({ id, ...color });
      this.selectedColorId = id;
      this.persistState();
    },
    removeColor(id) {
      this.palette = this.palette.filter((c) => c.id !== id);
      if (this.selectedColorId === id && this.palette.length) {
        this.selectedColorId = this.palette[0].id;
      }
      this.persistState();
    },
    setSelectedColor(id) {
      this.selectedColorId = id;
      this.persistState();
    },
    setOverlayImage(src) {
      this.overlayImage.src = src;
      this.persistState();
    },
    updateOverlay(options) {
      this.overlayImage = { ...this.overlayImage, ...options };
      this.persistState();
    },
    toggleOverlayVisibility() {
      this.overlayImage.visible = !this.overlayImage.visible;
      this.persistState();
    },
    savePattern() {
      const id = `pattern-${Date.now()}`;
      const snapshot = snapshotState(this);
      this.savedPatterns = [
        ...this.savedPatterns.filter((p) => p.id !== id),
        {
          id,
          name: this.patternMetadata.name || "Untitled",
          description: this.patternMetadata.description,
          tags: this.patternMetadata.tags,
          createdAt: new Date().toISOString(),
          snapshot,
        },
      ];
      this.lastLoadedId = id;
      this.persistState();
      console.log("Pattern saved", id);
      return id;
    },
    deletePattern(id) {
      this.savedPatterns = this.savedPatterns.filter((p) => p.id !== id);
      if (this.lastLoadedId === id) {
        this.lastLoadedId = null;
      }
      this.persistState();
    },
    loadPattern(id) {
      const found = this.savedPatterns.find((p) => p.id === id);
      if (!found) return;
      this.applySnapshot(found.snapshot);
      this.lastLoadedId = id;
      this.persistState();
    },
    async generatePDF() {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const name = this.patternMetadata.name || "Pattern";
      const today = new Date().toLocaleDateString();

      doc.setFontSize(18);
      doc.text(name, 20, 30);
      doc.setFontSize(12);
      doc.text(`Author: Mila Portal`, 20, 40);
      doc.text(`Date: ${today}`, 20, 48);
      doc.text(`Description: ${this.patternMetadata.description || "N/A"}`, 20, 58);

      // Grid page
      doc.addPage();
      doc.text("Pattern Grid (colors)", 20, 20);

      // Diagram page
      doc.addPage();
      doc.text("Pattern Diagram (symbols)", 20, 20);

      // Word chart
      doc.addPage();
      doc.text("Word Chart (counts)", 20, 20);

      // Bead count
      doc.addPage();
      doc.text("Bead Count List", 20, 20);

      // Palette list
      doc.addPage();
      doc.text("Palette List", 20, 20);
      this.palette.forEach((color, idx) => {
        doc.text(
          `${idx + 1}. ${color.name} (${color.symbol}) - ${color.hex}`,
          20,
          30 + idx * 8
        );
      });

      // Optional background reference
      if (this.overlayImage.src) {
        doc.addPage();
        doc.text("Background reference", 20, 20);
        const format = this.overlayImage.src.includes("image/jpeg") ? "JPEG" : "PNG";
        doc.addImage(this.overlayImage.src, format, 20, 30, 100, 100, undefined, "FAST");
      }

      doc.save(`${name.replace(/\s+/g, "_")}.pdf`);
    },
    applyJsonSnapshot(payload) {
      if (payload.grid) this.grid = payload.grid;
      if (payload.palette) this.palette = payload.palette;
      if (payload.overlayImage) this.overlayImage = payload.overlayImage;
      if (payload.gridSettings) this.gridSettings = payload.gridSettings;
      if (payload.selectedTool) this.selectedTool = payload.selectedTool;
      if (payload.selectedColorId) this.selectedColorId = payload.selectedColorId;
      if (payload.patternMetadata) this.patternMetadata = payload.patternMetadata;
    },
    importFromJson(jsonData) {
      try {
        const requiredKeys = ["name", "desc", "palette", "beadString", "widthCount", "heightCount"];
        for (const key of requiredKeys) {
          if (!Object.prototype.hasOwnProperty.call(jsonData, key)) {
            throw new Error(`Missing key: ${key}`);
          }
        }
        this.applyJsonMetadata(jsonData);
        this.applyJsonPalette(jsonData.palette);
        this.applyJsonOverlayImage(jsonData.originalimg || "");
        this.applyJsonGrid(jsonData.beadString, jsonData.heightCount, jsonData.widthCount);
        this.persistState();
      } catch (e) {
        console.error("Import failed", e);
        throw e;
      }
    },
    applyJsonPalette(jsonPalette = []) {
      const palette = jsonPalette.length ? jsonPalette : [{ color: "#ffffff", name: "White", letter: "A" }];
      const lettersSeen = {};
      this.palette = palette.map((item, index) => {
        const baseSymbol = item.letter || String.fromCharCode(65 + index);
        let symbol = baseSymbol;
        if (lettersSeen[symbol]) {
          symbol = `${symbol}${lettersSeen[symbol]}`;
        }
        lettersSeen[baseSymbol] = (lettersSeen[baseSymbol] || 0) + 1;
        return {
          id: `color-${Date.now()}-${index}`,
          name: item.name || `Color ${index + 1}`,
          hex: item.color || "#ffffff",
          symbol,
        };
      });
      this.selectedColorId = this.palette[0]?.id || null;
    },
    applyJsonGrid(beadString, heightCount, widthCount) {
      const tokens = (beadString || "").split(",");
      const rows = Math.min(300, Math.max(5, Number(heightCount) || 5));
      const cols = Math.min(300, Math.max(5, Number(widthCount) || 5));
      const newGrid = createGrid(rows, cols);
      const symbolMap = this.palette.reduce((map, color) => {
        map[color.symbol] = color.id;
        return map;
      }, {});
      let cursor = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const token = tokens[cursor] || "";
          newGrid[r][c] = symbolMap[token] || token || "";
          cursor += 1;
        }
      }
      this.grid = newGrid;
      this.gridSettings.rows = rows;
      this.gridSettings.cols = cols;
    },
    applyJsonMetadata(jsonData) {
      this.patternMetadata = {
        name: jsonData.name || "Imported Pattern",
        description: jsonData.desc || "",
        tags: jsonData.tags || "",
      };
    },
    applyJsonOverlayImage(src) {
      this.overlayImage = {
        ...this.overlayImage,
        src: src || "",
        visible: !!src,
      };
    },
    exportToJson() {
      const beadString = this.grid
        .map((row) =>
          row.map((cell) => this.paletteMap[cell]?.symbol || cell || "").join(",")
        )
        .join(",");
      return {
        name: this.patternMetadata.name,
        desc: this.patternMetadata.description,
        palette: this.palette.map((c) => ({
          color: c.hex,
          name: c.name,
          letter: c.symbol,
        })),
        beadString,
        widthCount: this.gridSettings.cols,
        heightCount: this.gridSettings.rows,
        originalimg: this.overlayImage.src,
      };
    },
  },
});
