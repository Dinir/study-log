# [Modeling One-to-N relationships][post-1]

## In short

- Will the entities on the “N” side of the One-to-N ever need to stand alone?

- What is the cardinality of the relationship: is it one-to-few; one-to-many; or one-to-squillions?

Based on these, you can pick one of the three basic One-to-N designs

- Embed the N side if the cardinality is one-to-few and there is no need to access the embedded object outside the context of the parent object

- Use an array of references to the N-side objects if the cardinality is one-to-many or if the N-side objects should stand alone for any reasons

- Use a reference to the One-side in the N-side objects if the cardinality is one-to-squillions

## detail

### One-to-Few

An example can be 'addresses for a person'

**Embedding** - Put the addresses in an array inside of the Person object

```js
> db.person.findOne()
{
  name: 'Kate Monster',
  ssn: '123-456-7890',
  addresses : [
    { street: '123 Sesame St', city: 'Anytown', cc: 'USA' },
    { street: '123 Avenue Q', city: 'New York', cc: 'USA' }
  ]
}
```

- \+ you don't have to perform a separate query to get the embedded details
- \- no way of accessing the embedded details as stand-alone entities

### One-to-Many

An example can be 'parts for a product in a replacement parts ordering system'

**Referencing** - Put the ObjectIDs of the parts in an array in product document

Example of each documents
```js
> db.parts.findOne()
{
  _id : ObjectID('AAAA'),
  partno : '123-aff-456',
  name : '#4 grommet',
  qty: 94,
  cost: 0.94,
  price: 3.99
}

> db.products.findOne()
{
  name : 'left-handed smoke shifter',
  manufacturer : 'Acme Corp',
  catalog_number: 1234,
  parts : [     // array of references to Part documents
    ObjectID('AAAA'),    // reference to the #4 grommet above
    ObjectID('F17C'),    // reference to a different Part
    ObjectID('D2AA'),
    // etc
  ]
}
```

example of using an application-level join to retrieve the parts for a particular project
```js
// Fetch the Product document identified by this catalog number
> product = db.products.findOne({catalog_number: 1234});
// Fetch all the Parts that are linked to this Product
> product_parts = db.parts.find({_id: { $in : product.parts } } ).toArray();
```

If `products.catalog_number` has an index on it the operation can be more efficient.

- \+ each part is a stand-alone document: easy to search and update them independently
- \+ this approach lets you have N-to-N schema
- \- need a second query to get details about the parts for a product

### One-to-Squillions

An example can be an event logging system that collects log messages for different machines

**Parent-referencing** - Have a document for each host, then store the ObjectID of the host in the documents for the log messages

```js
> db.hosts.findOne()
{
  _id : ObjectID('AAAB'),
  name : 'goofy.example.com',
  ipaddr : '127.66.66.66'
}

>db.logmsg.findOne()
{
  time : ISODate("2014-03-28T09:42:41.382Z"),
  message : 'cpu is on fire!',
  host: ObjectID('AAAB')       // Reference to the Host document
}
```

example of application-level join to find the most recent 5,000 messages for a host
```js
// find the parent ‘host’ document
> host = db.hosts.findOne({ipaddr : '127.66.66.66'});  // assumes unique index
// find the most recent 5000 log message documents linked to that host
> last_5k_msg = db.logmsg.find({host: host._id}).sort({time : -1}).limit(5000).toArray()
```

- - -

# [Two-way referencing and denormalization][post-2]

## In short

- You can use bi-directional referencing if it optimizes your schema, and if you are willing to pay the price of not having atomic updates
- If you are referencing, you can denormalize data either from the “One” side into the “N” side, or from the “N” side into the “One” side

When deciding whether or not to denormalize, consider the following factors:
- You cannot perform an atomic update on denormalized data
- Denormalization only makes sense when you have a high read to write ratio

## detail

### Two-Way Referencing

Example: a task-tracking system  
'people' collection holding Person documents  
'tasks' collection holding Task documents  
One-to-N from Person -> Task  
Need to reference Person -> Task to track all of the Tasks owned by a Person

```js
> db.person.findOne()
{
  _id: ObjectID("AAF1"),
  name: "Kate Monster",
  tasks: [     // array of references to Task documents
    ObjectID("ADF9"), 
    ObjectID("AE02"),
    ObjectID("AE73") 
    // etc
  ]
}

> db.tasks.findOne()
{
  _id: ObjectID("ADF9"), 
  description: "Write lesson plan",
  due_date:  ISODate("2014-04-01"),
  owner: ObjectID("AAF1")     // Reference to Person document
}
```

Basically One-to-Many, with 'owner' reference to Person document

- \+ it's quick and easy to find Task's owner
- \- to reassign a task to another person, you need to perform two updates
  - impossible to reassign a task to a new person with a single atomic update

### Denormalizing With One-to-Many Relationships

- eliminate the need to perform application-level join, at the price of some additional complexity when performing updates
- can save you a lookup of the denormalized data at the cost of a more expensive update: if you've denormalized a property, then when you update the property you must also update every place it occurs
- makes sense if there's an high ratio of reads to updates - if you'll be reading the denormalized data frequently but updating it only rarely

#### Denormalizing from Many -> One

Adding part name in the previous product `parts[]`

```js
> db.products.findOne()
{
  name : 'left-handed smoke shifter',
  manufacturer : 'Acme Corp',
  catalog_number: 1234,
  parts : [
    { id : ObjectID('AAAA'), name : '#4 grommet' },         // Part name is denormalized
    { id: ObjectID('F17C'), name : 'fan blade assembly' },
    { id: ObjectID('D2AA'), name : 'power switch' },
    // etc
  ]
}
```

```js
// Fetch the product document
> product = db.products.findOne({catalog_number: 1234});  
  // Create an array of ObjectID()s containing *just* the part numbers
> part_ids = product.parts.map( function(doc) { return doc.id } );
  // Fetch all the Parts that are linked to this Product
> product_parts = db.parts.find({_id: { $in : part_ids } } ).toArray();
```

#### Denormalizing from One -> Many

- in this case the amount to update increases since update in One should be reflected in Many

```js
> db.parts.findOne()
{
  _id : ObjectID('AAAA'),
  partno : '123-aff-456',
  name : '#4 grommet',
  product_name : 'left-handed smoke shifter',   // Denormalized from the ‘Product’ document
  product_catalog_number: 1234,                 // Ditto
  qty: 94,
  cost: 0.94,
  price: 3.99
}
```

### Denormalizing With One-to-Squillions Relationships

#### Denormalizing into Squillions side

Adding IP address of the host into the individual in the previous log messages

```js
> db.logmsg.findOne()
{
  time : ISODate("2014-03-28T09:42:41.382Z"),
  message : 'cpu is on fire!',
  ipaddr : '127.66.66.66',
  host: ObjectID('AAAB')
}
```
the query for the most recent messages become one instead of two
```js
> last_5k_msg = db.logmsg.find({ipaddr : '127.66.66.66'}).sort({time : -1}).limit(5000).toArray()
```
If there's only a limited amount of information you want to store at the One side, you can denormalize it ALL into squillions side and get rid of the one collection altogether.

#### Denormalizing into One side

keep last 1000 messages in the host document

```js
//  Get log message from monitoring system
logmsg = get_log_msg();
log_message_here = logmsg.msg;
log_ip = logmsg.ipaddr;
// Get current timestamp
now = new Date()
// Find the _id for the host I’m updating
host_doc = db.hosts.findOne({ipaddr: log_ip}, {_id: 1});  // Don’t return the whole document, only return `_id` field
host_id = host_doc._id;
// Insert the log message, the parent reference, and the denormalized data into the ‘many’ side
db.logmsg.save({
  time: now, 
  message: log_message_here, 
  ipaddr: log_ip, 
  host: host_id
});
// Push the denormalized log message onto the ‘one’ side
db.hosts.update( 
  {_id: host_id}, 
  {$push: {logmsgs: {
    $each: [ { time: now, message: log_message_here } ],
    $sort: { time: 1 },  // Only keep the latest ones 
    $slice: -1000        // Only keep the latest 1000
  }}}
);
```

This approach is a bad idea if you want to look at the data less frequently than you update it.

- - -

# [Your guide through the rainbow][post-3]

1. favor embedding unless there is a compelling reason not to

2. needing to access an object on its own is a compelling reason not to embed it

3. Arrays should not grow without bound.  
  If there are more than a couple of hundred documents on the “many” side, don’t embed them;  
  if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.

4. Don’t be afraid of application-level joins: if you index correctly and use the projection specifier (as shown in part 2) then application-level joins are barely more expensive than server-side joins in a relational database.

5. Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.

6. As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it. 

[post-1]: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
[post-2]: http://blog.mongodb.org/post/87892923503/6-rules-of-thumb-for-mongodb-schema-design-part-2
[post-3]: http://blog.mongodb.org/post/88473035333/6-rules-of-thumb-for-mongodb-schema-design-part-3