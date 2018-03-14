# ScratchPadGroceryList
A Phonegap/Node.js app for more easily communicating grocery lists.


## Important info
### Database model
#### Table: users
user_name text, // Human Name

username  text, // uniqueUsername

private_list json,

families text[],

cart json,

settings json

#### Table: families
family_key text, // unique idendifier key 7 digit

family_name text, // any string

public_list json,

members text[], // list of member usernames in the family
