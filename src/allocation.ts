export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let assignedProducers = 2;

type ShiftResults = {
  assignedProducers: number;
  production: number;
  consumption: number;
  balance: number;
};

// Calculation helpers
function calculateProduction(assignedProducers: number): number {
  return assignedProducers * 3;
}

function calculateConsumption(): number {
  return 6;
}

function calculateBalance(
  production: number,
  consumption: number,
): number {
  return production - consumption;
}

function calculateShiftResults(assignedProducers: number): ShiftResults {
  const production = calculateProduction(assignedProducers);
  const consumption = calculateConsumption();
  const balance = calculateBalance(production, consumption);

  return {
    assignedProducers,
    production,
    consumption,
    balance,
  };
}

function drawCrewAssignments(assignedProducers: number): void {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < assignedProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < assignedProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
}

// Update HTML
function updateAllocationReadout(results: ShiftResults): void {
  readout.textContent =
    `Assigned: ${results.assignedProducers}/6 · Production: ${results.production} · Consumption: ${results.consumption} · Balance: ${
      results.balance > 0 ? "+" : ""
    }${results.balance}`;
}

function drawAllocationCanvas(results: ShiftResults): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(results.assignedProducers);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${results.assignedProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${results.production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, results.production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${results.consumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, results.consumption * 14, 20);
}

// Main update
function updateAllocationDisplay() {
  const results = calculateShiftResults(assignedProducers);

  drawAllocationCanvas(results);
  updateAllocationReadout(results);
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedProducers = Math.max(0, assignedProducers - 1);
  updateAllocationDisplay();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedProducers = Math.min(6, assignedProducers + 1);
  updateAllocationDisplay();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedProducers = 2;
    updateAllocationDisplay();
  };
updateAllocationDisplay();
