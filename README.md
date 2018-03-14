# ScratchPad
A Phonegap/Node.js app for more easily communicating grocery lists.

---

## Important Info
### Server Database Model
#### Table: `users`
`user_name`: `string` // Human Name

`username`: `string` // uniqueUsername

`private_list`: `json`

`families`: `[string, string, ...]`

`cart`: `json`

`settings`: `json`

#### Table: `families`
`family_key`: `string` // unique idendifier key 7 digit

`family_name`: `string` // any string

`public_list`: `json`

`members`: `[string, string, ...]` // list of member usernames in the family

### Client Storage Model
```json
{
  "user": {
    "name": "John Smith",
    "username": "jsmith244",
    "pList": {
      "7374rjaskK": {
        "name": "Apples",
        "notes": "and grapes",
        "quant": "10"
      },
      "2Hyd3y73Ht": {
        "name": "Grapes",
        "notes": "and apples",
        "quant": "10"
      }
    }
  },
  
  "settings": {
    "sampleBoolSetting": false,
    "sampleNumSetting": 100,
    "sampleStringSetting": "string"
  },
  
  "family": {
    "gList": {
      "a7H77snw3k": {
        "name": "Yogurt",
        "notes": "I need a pretty long notes text so I will just write a ton of nonsense here just to fill in the space that I need to properly asses the compatability of the current layout of the list items",
        "quant": "20"
      },
      "8hh2dKKtw4": {
        "name": "Milk",
        "notes": "3x 1%, 1x skim",
        "quant": null
      },
      "188FhUqm84": {
        "name": "Oranges",
        "notes": null,
        "quant": null
      },
      "Aii38Uy7Et": {
        "name": "Tostitos",
        "notes": null,
        "quant": "4"
      }
    }
  }
}
```
 
---
