# ScratchPadGroceryList
A Phonegap/Node.js app for more easily communicating grocery lists.

---

## Terms
##### gList
Stands for grocery list, this is the family's "public" (viewable by anyone in the family) grocery list.

##### pList
Stands for private list, this is a users private list, only visible to them.

##### cList
Stands for cart list, only visible to its user.

##### sList
Stands for settings list.

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

`authToken` : `string`

#### Table: `families`
`family_key`: `string` // unique identifier key 7 digit

`family_name`: `string` // any string

`public_list`: `json`

`members`: `[string, string, ...]` // list of member usernames in the family

`family_settings`: `json`

### Client Storage Model
```json
{
  "user": {
    "name": "John Smith",
    "username": "jsmith244",
    "pList": {
      "p-7374rjaskK": {
        "name": "Apples",
        "notes": "and grapes",
        "quant": "10",
        "tags": ["Apples", "Grapes"]
      },
      "p-2Hyd3y73Ht": {
        "name": "Grapes",
        "notes": "and apples",
        "quant": "10",
        "tags": ["Apples", "Grapes"]
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
      "g-a7H77snw3k": {
        "name": "Yogurt",
        "notes": "I need a pretty long notes text so I will just write a ton of nonsense here just to fill in the space that I need to properly asses the compatibility of the current layout of the list items",
        "quant": "20",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"]
      },
      "g-8hh2dKKtw4": {
        "name": "Milk",
        "notes": "3x 1%, 1x skim",
        "quant": null,
        "tags": ["I wrote a small essay in this tag, its really long and I need to make sure it doesnt make the UI look stupid."]
      },
      "g-188FhUqm84": {
        "name": "Oranges",
        "notes": null,
        "quant": null,
        "tags": []
      },
      "g-Aii38Uy7Et": {
        "name": "Tostitos",
        "notes": null,
        "quant": "4",
        "tags": ["/~Kevin~/", "Never Enough"]
      }
    }
  }
}
```
Note: quant is a string.

### Socket.io Requests and Pushes
#### Model
- `callIdentifier`
  - description
  - call contains
  - reciever does
  - response is
  - [caller does]

```json
{
  "sample api call object": "contents"
}
```
Note: all calls should be json for the sake of consistency.

#### Requests (client to server communication)
- `init`
  - Sent when someone opens the app
  - Contains user authentication info, active family key
  - server authenticates using **both username and auth token**, adds to active clients, does other init stuff
  - Server sends private list, family grocery list, and family settings.

```json
{
  "username": "jSmith244",
  "authToken": "234kjg5h2g34h12k5jh2l3kj5h52lk3jh51ljh43g25kj3hg46",
  "activeFamilyKey" : "276Hjs6urn"
}
```

- `addItem`
  - Sent when someone adds an item to a list
  - contains info about item
  - server adds item to storage
  - Server sends back confirmation
  - client alert

```json
{
  "type": "gList | pList",
  "item": {
    "key": "g-8JksY6Juus",
    "name": "Item Name",
    "notes": "notes",
    "quant": "10",
    "tags": ["tag1", "tag2"]
  }
}
```

- `removeItem`
  - Sent when someone removes an item from a list (using the delete button)
  - contains the item that was removed
  - server removes item from database
  - server sends confirmation
  - confirmation alert

```json 
{
  "origin": "pList | gList | cart",
  "item": {
    "key": "g-ajuUm22k72"
  }
}
```

- `cartItem`
  - Sent when a client adds an item to the `gList`
  - contains item that was carted, and from which list.
  - server removes from respective list, adds it to user's `cart`, sends a remove event to relevent (only action user if from pList, all active users if from gList) active clients with the reason `cart`.

```json
{
  "origin": "pList | gList",
  "item": {
    "key": "g-iu2HtUTj7s"
  }
}
```

- `uncartItem`
  - Sent when someone modifys an item
  - contains list, username, new item details
  - server applies changes in database and sends and appropriate addItem message to all relevant active clients in the family.
```json
{
  "list": "pList | gList",
  "username": "jSmith244",
  "item": {
    "key": "g-8JksY6Juus",
    "name": "Item Name",
    "notes": "notes",
    "quant": "10",
    "tags": ["tag1", "tag2"]
  }
}
```

#### Pushes (server to client communication)
###### `addItem` and `removeItem` serve as confirmation messages to clients perfomring actions as well as keeping other active clients up to date.
- `removeItem`
  - Server sends to all active clients in a family when either an item is added to `cart` or an item is removed from the `gList`. Server sends to only relevant client when an item is removed from `pList` or `cart`
  - contains list that it was deleted from, reason for removal, username of person who performed the action, name and the key of the item removed.

```json
{
  "list": "pList | gList | cart",
  "reason": "cart | delete",
  "username": "jSmith244",
  "item": {
    "name": "Apples",
    "key": "g-w3hU6YEk7U"
  }
}
```

- `addItem`
  - Server sends to all active clients when added to `gList`. Server sends to only relevant client when added to `pList`.
  - Contains list added to, user that added it, item info.

```json
{
  "list": "pList | gList",
  "username": "jSmith244",
  "reason": "add | uncart",
  "item": {
    "key": "g-8JksY6Juus",
    "name": "Item Name",
    "notes": "notes",
    "quant": "10",
    "tags": ["tag1", "tag2"]
  }
}
```

- `modifyItem`
  - Server sends to all relevant active clients when someone modifies an item in the `gList` or `pList`.
  - Contains item key, new info

```json
{
  "username": "jSmith244",
  "item": {
    "key": "g-345jd6J3uV",
    "name": "Item Name",
    "notes": "notes",
    "quant": "10",
    "tags": ["tag1", "tag2"]
  }
}
```
