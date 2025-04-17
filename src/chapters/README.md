--Struttura dei JSON:
stepN: {                                                    // step identifier
    "text":                                                 // Text to display in the textbox
    "options": [                                            // You can have a lot of options. When you don't 
                                                               have the attributes required, the option won't appear
        {
            "text":                                         // Text to display in the choicebox
            "attributes": [
                {
                    "attribute":                            // Attribute identifier
                    "value":                                // Requested attribute value
                    "type":                                 // If it has to be ">=" or "<" of the value

                }
            ],         
            "items": [
                {
                    "item":                                 // Item identifier
                    "quantity":                             // Quantity requested
                    "remove":                               // If it has to be taken away "true" or not "false"

                }
            ],
            "flags": [
                {
                    "flag":                                 // Flag identifier
                    "value":                                // Required value
                }
            ],
            "effects": [{
                "getitem": [{                                // Get a certain quantity of that item
                    "item":
                    "quantity":
                }]
                "getattribute": [{                           // Adds to the attribute a certain quantity
                    "attribute":
                    "quantity":
                }]
                setflag: [{                                  // Set flag to a value
                    "flag":                                  
                    "value":                                                             
                }]
            }],                                
            "action": "jump",                                // "default": change scene. "jump": change doc
            "target": [step,location,day]
        }
    ],
    "image":                                                 // path of the image to put
    "ost":                                                   // path of the ost to play
}       