const game = {
  inventory: ["Water", "Fire", "Earth", "Wind", "Steam"],
  emojis: {
  },
  recipes: {},

  slot1_val: "",
  slot2_val: "",

  async init() {
    await this.loadEmojis();
    await this.loadRecipes();
    this.addButtons();
  },

  async loadRecipes() {
    await fetch("data/recipes.json")
      .then((response) => response.json())
      .then((data) => {
        this.recipes = data;
      })
      .catch((error) => {
        console.error("Error loading recipes: ", error);
      });
  },

  async loadEmojis() {
    await fetch("data/emojis.json")
      .then((response) => response.json())
      .then((data) => {
        this.emojis = data;
      })
      .catch((error) => {
        console.error("Error loading emojis: ", error);
      });
  },

  addToSlot(emoji, val) {
    const slot1 = $("#slot1");
    const slot2 = $("#slot2");

    if (!this.slot1_val) {
      slot1.html(`${emoji} ${val}`);
      this.slot1_val = val;
      this.create();
    } else if (!this.slot2_val) {
      slot2.html(`${emoji} ${val}`);
      this.slot2_val = val;
      this.create();
    } else {
      console.log("Could not place");
    }
  },

  removeFromSlot(id) {
    const slot = $(`#${id}`);
    const resultSlot = $("#resultSlot");

    slot.html("&zwnj;");
    if (id === "slot1") {
      this.slot1_val = "";
    } else {
      this.slot2_val = "";
    }
    resultSlot.html("&zwnj;");
  },

  addButton(emoji, val) {
    $("#sidebar").append(
      ` <button type="button" onclick="game.addToSlot('${emoji}', '${val}')" class="btn btn-light">${emoji} ${val}</button>`
    );
  },

  addButtons() {
    $("#sidebar").html(``);
    for (const item of this.inventory) {
      this.addButton(`${this.emojis[item]}`, `${item}`);
    }
  },

  create() {
    if (this.slot1_val && this.slot2_val) {
      const resultSlot = $("#resultSlot");
      let vals = [this.slot1_val, this.slot2_val].sort();
      let recipe = `${vals[0]}+${vals[1]}`;
      
      if (recipe in this.recipes) {
        resultSlot.html(`${this.emojis[this.recipes[recipe]]} ${this.recipes[recipe]}`);
      }

      if (this.recipes[recipe] in this.inventory === false) {
        this.inventory.push(this.recipes[recipe]);
        this.addButtons();
      }
    }
  }
};

window.onload = () => game.init();
