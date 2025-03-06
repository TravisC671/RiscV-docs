const inputArea = document.getElementById("inputArea");
const newBtn = document.getElementById("newBtn")!;
const saveBtn = document.getElementById("saveBtn")!;

let input = 0
function addInput(): void {
  const container = document.createElement("div");
  container.innerHTML = `      
    <div class="input-wrapper">
      <div class="name-wrapper">
        <input type="text" id="name${input}" placeholder="Instruction Name" required>
        
        <input type="text" id="description${input}" placeholder="Short Description" required>
      </div>
      
      <input type="number" id="page${input}" name="page" placeholder="Page Number" required>
      
      <textarea id="syntax${input}" name="syntax" rows="3" placeholder="Syntax" required></textarea>
      
      <textarea id="details${input}" name="details" rows="5" placeholder="Details" required></textarea>
    </div>`;
    input++
    //<button class="close-btn" id="close${input}">X</button>
    inputArea?.appendChild(container)
}


function saveToJson() {
  let instructions = [];
  for (let i = 0; i <= input; i++) {
      const name = (<HTMLInputElement>document.getElementById(`name${i}`))?.value;
      const description = (<HTMLInputElement>document.getElementById(`description${i}`))?.value;
      const page = (<HTMLInputElement>document.getElementById(`page${i}`))?.value;
      const syntax = (<HTMLInputElement>document.getElementById(`syntax${i}`))?.value;
      const details = (<HTMLInputElement>document.getElementById(`details${i}`))?.value;

      console.log(name, description, page, syntax, details)
      if (name !== undefined && description !== undefined && page !== undefined && syntax !== undefined && details !== undefined) {
        instructions.push({ name, description, page: Number(page), syntax, details });
      }
  }
  const jsonBlob = new Blob([JSON.stringify({"instructions": instructions}, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(jsonBlob);
  link.download = "instructions.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

newBtn.addEventListener("click", addInput);
saveBtn.addEventListener("click", saveToJson);
