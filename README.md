# ScratchPadGroceryList
A Phonegap/Node.js app for more easily communicating grocery lists.



### Database model:

#### table users:

user_name text,

username  text,

private_list json,

families text[],

cart json,

settings json

#### table families:

family_key text,

family_name text,

public_list json,

users text[],
