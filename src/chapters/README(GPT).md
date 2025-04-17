# 🕹️ Game Script Format (JSON)

This project uses a structured JSON format to define scenes, choices, and interactions in a branching narrative game. Each scene (or "step") is an object with text, optional choices, and additional metadata like images or music.

---

## 📁 Structure

Each key (e.g. `step1`, `step2`, etc.) represents a scene in the story.

```json
"stepN": {
  "text": "",             // Text shown in the dialogue box
  "options": [ ... ],     // Choices available to the player (optional)
  "image": "",            // Path or ID of the image shown (optional)
  "ost": ""               // Path or ID of the soundtrack (optional)
}
```

---

## 🎮 Options

If the scene includes choices, the `options` array contains multiple objects like the one below:

```json
{
  "text": "Go make breakfast",         // Text shown in the choice box
  "attributes": [                      // Optional: attribute requirements
    {
      "attribute": "strength",         // Attribute ID
      "value": 5,                      // Required value
      "type": ">="                     // Comparison: >=, <, etc.
    }
  ],
  "items": [                           // Optional: item requirements
    {
      "item": "key",                   // Item ID
      "quantity": 1,                   // Required quantity
      "remove": true                   // If true, item is consumed
    }
  ],
  "flags": [                           // Optional: flag requirements
    {
      "flag": "hasMetNPC",             // Flag ID
      "value": true                    // Required value
    }
  ],
  "effects": {                         // Optional: effects on selection
    "getitem": [
      { "item": "bread", "quantity": 1 }
    ],
    "getattribute": [
      { "attribute": "hunger", "quantity": -10 }
    ],
    "setflag": [
      { "flag": "ateBreakfast", "value": true }
    ]
  },
  "action": "default",                 // "default" = same doc, "jump" = change doc
  "target": ["step3", "location1"]     // Target step or scene (can contain multiple IDs)
}
```

---

## 🧠 Conditional Logic

Choices are only shown if all conditions are met:

- **Attributes**: Player must meet a stat requirement.
- **Items**: Player must have (and optionally lose) specific items.
- **Flags**: Game state flags must have specific values.

---

## 🧬 Effects

When a player selects an option, the following effects can be triggered:

- **`getitem`**: Adds items to the player's inventory.
- **`getattribute`**: Increases or decreases player stats.
- **`setflag`**: Sets a flag in the game state.

---

## 🗺️ Navigation

- **`action`**:
  - `"default"`: change scene within the same JSON file
  - `"jump"`: go to a different file or storyline

- **`target`**:  
  A list of identifiers used by your engine to route the next step (e.g. `[step, location, day]`).

---

## 📷 Media

- **`image`**:  
  Path or reference to the image shown during the scene.

- **`ost`**:  
  Path or reference to the background music played during the scene.

---

## ✅ Example

```json
"step1": {
  "text": "You are in the game!",
  "options": [
    {
      "text": "Go back to sleep",
      "attributes": [],
      "items": [],
      "flags": [],
      "effects": {},
      "action": "jump",
      "target": ["step1", "base", "day2"]
    },
    {
      "text": "Go make breakfast",
      "attributes": [],
      "items": [],
      "flags": [],
      "effects": {},
      "action": "default",
      "target": ["step3"]
    }
  ],
  "image": "Immagine qui",
  "ost": "OST qui"
}
```

---

> 🛠️ You can expand this format with additional systems like timers, random events, or dialogue trees, depending on your engine.
