const Book = require('../models/books');
const { connectDB, disconnectDB } = require('../db/connect');

const books = [
  {
    title: 'Martha Speaks',
    description:
      'The adventures of a ten-year-old girl named Helen Finney, who fed her dog Martha some alphabet soup and something very mysterious occurred: Martha can speak!',
    author: '65e620b01284ad74ea8bec37',
    genre: 'Animal Fiction',
    isPictureBook: true,
    numAvailable: 1,
    numTotal: 3,
    yearPublished: 1992,
  },
  {
    title: 'Stellaluna',
    description:
      'The story of a baby bat who loses sight of her mother and winds up raised alongside a trio of tiny birds in a nest.',
    author: '65e620b01284ad74ea8bec38',
    genre: 'Animal Fiction',
    isPictureBook: true,
    numAvailable: 0,
    numTotal: 2,
    yearPublished: 1993,
  },
  {
    title: 'Pinduli',
    description:
      "Pinduli, a young striped hyena, is hurt by the unkind words of Dog, Lion, and Zebra, but her clever trick in return promotes her clan's survival and spreads harmony throughout the savannah.",
    author: '65e620b01284ad74ea8bec38',
    genre: 'Animal Fiction',
    isPictureBook: true,
    numAvailable: 1,
    numTotal: 1,
    yearPublished: 2005,
  },
  {
    title: 'Purple, Green, and Yellow',
    description:
      "The humorous tale of Brigid, a child who gets hold of super-indelible, never-come-off-until-you're-dead colored markers.",
    author: '65e620b01284ad74ea8bec39',
    genre: 'Humor',
    numAvailable: 1,
    numTotal: 3,
    yearPublished: 1992,
  },
  {
    title: 'Where the Wild Things Are',
    description:
      'Tells the story of Max, a rambunctious and sensitive boy who feels misunderstood at home and escapes to an island where he meets mysterious and strange creatures whose emotions are as wild and unpredictable as their actions.',
    author: '65e620b01284ad74ea8bec3a',
    genre: 'Fantasy',
    isPictureBook: true,
    numAvailable: 1,
    numTotal: 2,
    yearPublished: 1963,
  },
  {
    title: 'Dragons Love Tacos',
    description:
      "A boy and his dog get caught up in the 'Dos and Don'ts' of what to serve dragons to eat. Dragons love tacos, but if they accidentally eat spicy salsa...watch out!",
    author: '65e620b01284ad74ea8bec3b',
    genre: 'Humor',
    isPictureBook: true,
    numAvailable: 2,
    numTotal: 4,
    yearPublished: 2012,
  },
  {
    title: 'Fancy Nancy',
    description:
      "Bonjour! (that's fancy for hello), meet Nancy, who ALWAYS loves being fancy.",
    author: '65e620b01284ad74ea8bec3c',
    genre: 'Realistic Fiction',
    isPictureBook: true,
    numAvailable: 0,
    numTotal: 3,
    yearPublished: 2005,
  },
  {
    title: 'Fancy Nancy and the Posh Puppy',
    description:
      'When Nancy decides to get a dog, she is certain that with the right dog, she can be fancier than ever. But her family has other ideas. They want a plain dog. How unglamorous!',
    author: '65e620b01284ad74ea8bec3c',
    genre: 'Realistic Fiction',
    isPictureBook: true,
    numAvailable: 2,
    numTotal: 4,
    yearPublished: 2007,
  },
];

const insertBooks = async () => {
  try {
    // adds all books in array to the db
    const insertedBooks = await Book.insertMany(books);
    console.log('Books inserted:', insertedBooks);
  } catch (error) {
    console.error('Error seeding book data:', error.message);
  } finally {
    // errors also handled internally
    await disconnectDB();
  }
};

connectDB();
insertBooks();
