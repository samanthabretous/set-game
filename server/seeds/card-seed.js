const db = require('../models');
const Card = require('../models').card;

Card.sync({ force: true })
.then(() => db.sequelize.sync())
// add the following post to the database:
.then(() => Card.bulkCreate(
  [
    // ------------squiggle solid------------
    { card: 1, number: 1, color: 'red', shade: 'solid', shape: 'squiggle' },
    { card: 2, number: 2, color: 'red', shade: 'solid', shape: 'squiggle' },
    { card: 3, number: 3, color: 'red', shade: 'solid', shape: 'squiggle' },
    { card: 4, number: 1, color: 'green', shade: 'solid', shape: 'squiggle' },
    { card: 5, number: 2, color: 'green', shade: 'solid', shape: 'squiggle' },
    { card: 6, number: 3, color: 'green', shade: 'solid', shape: 'squiggle' },
    { card: 7, number: 1, color: 'purple', shade: 'solid', shape: 'squiggle' },
    { card: 8, number: 2, color: 'purple', shade: 'solid', shape: 'squiggle' },
    { card: 9, number: 3, color: 'purple', shade: 'solid', shape: 'squiggle' },

    // ------------diamond solid------------

     { card: 10, number: 1, color: 'red', shade: 'solid', shape: 'diamond' },
     { card: 11, number: 2, color: 'red', shade: 'solid', shape: 'diamond' },
     { card: 12, number: 3, color: 'red', shade: 'solid', shape: 'diamond' },
     { card: 13, number: 1, color: 'green', shade: 'solid', shape: 'diamond' },
     { card: 14, number: 2, color: 'green', shade: 'solid', shape: 'diamond' },
     { card: 15, number: 3, color: 'green', shade: 'solid', shape: 'diamond' },
     { card: 16, number: 1, color: 'purple', shade: 'solid', shape: 'diamond' },
     { card: 17, number: 2, color: 'purple', shade: 'solid', shape: 'diamond' },
     { card: 18, number: 3, color: 'purple', shade: 'solid', shape: 'diamond' },

    // ------------oval solid------------

     { card: 19, number: 1, color: 'red', shade: 'solid', shape: 'oval' },
     { card: 20, number: 2, color: 'red', shade: 'solid', shape: 'oval' },
     { card: 21, number: 3, color: 'red', shade: 'solid', shape: 'oval' },
     { card: 22, number: 1, color: 'green', shade: 'solid', shape: 'oval' },
     { card: 23, number: 2, color: 'green', shade: 'solid', shape: 'oval' },
     { card: 24, number: 3, color: 'green', shade: 'solid', shape: 'oval' },
     { card: 25, number: 1, color: 'purple', shade: 'solid', shape: 'oval' },
     { card: 26, number: 2, color: 'purple', shade: 'solid', shape: 'oval' },
     { card: 27, number: 3, color: 'purple', shade: 'solid', shape: 'oval' },

    // ------------squiggle striped------------

     { card: 28, number: 1, color: 'red', shade: 'striped', shape: 'squiggle' },
     { card: 29, number: 2, color: 'red', shade: 'striped', shape: 'squiggle' },
     { card: 30, number: 3, color: 'red', shade: 'striped', shape: 'squiggle' },
     { card: 31, number: 1, color: 'green', shade: 'striped', shape: 'squiggle' },
     { card: 32, number: 2, color: 'green', shade: 'striped', shape: 'squiggle' },
     { card: 33, number: 3, color: 'green', shade: 'striped', shape: 'squiggle' },
     { card: 34, number: 1, color: 'purple', shade: 'striped', shape: 'squiggle' },
     { card: 35, number: 2, color: 'purple', shade: 'striped', shape: 'squiggle' },
     { card: 36, number: 3, color: 'purple', shade: 'striped', shape: 'squiggle' },

    // ------------diamond striped------------

     { card: 37, number: 1, color: 'red', shade: 'striped', shape: 'diamond' },
     { card: 38, number: 2, color: 'red', shade: 'striped', shape: 'diamond' },
     { card: 39, number: 3, color: 'red', shade: 'striped', shape: 'diamond' },
     { card: 40, number: 1, color: 'green', shade: 'striped', shape: 'diamond' },
     { card: 41, number: 2, color: 'green', shade: 'striped', shape: 'diamond' },
     { card: 42, number: 3, color: 'green', shade: 'striped', shape: 'diamond' },
     { card: 43, number: 1, color: 'purple', shade: 'striped', shape: 'diamond' },
     { card: 44, number: 2, color: 'purple', shade: 'striped', shape: 'diamond' },
     { card: 45, number: 3, color: 'purple', shade: 'striped', shape: 'diamond' },

    // ------------oval striped------------

     { card: 46, number: 1, color: 'red', shade: 'striped', shape: 'oval' },
     { card: 47, number: 2, color: 'red', shade: 'striped', shape: 'oval' },
     { card: 48, number: 3, color: 'red', shade: 'striped', shape: 'oval' },
     { card: 49, number: 1, color: 'green', shade: 'striped', shape: 'oval' },
     { card: 50, number: 2, color: 'green', shade: 'striped', shape: 'oval' },
     { card: 51, number: 3, color: 'green', shade: 'striped', shape: 'oval' },
     { card: 52, number: 1, color: 'purple', shade: 'striped', shape: 'oval' },
     { card: 53, number: 2, color: 'purple', shade: 'striped', shape: 'oval' },
     { card: 54, number: 3, color: 'purple', shade: 'striped', shape: 'oval' },

    // ------------squiggles outline------------
    { card: 55, number: 1, color: 'red', shade: 'outline', shape: 'squiggle' },
    { card: 56, number: 2, color: 'red', shade: 'outline', shape: 'squiggle' },
    { card: 57, number: 3, color: 'red', shade: 'outline', shape: 'squiggle' },
    { card: 58, number: 1, color: 'red', shade: 'outline', shape: 'squiggle' },
    { card: 59, number: 2, color: 'green', shade: 'outline', shape: 'squiggle' },
    { card: 60, number: 3, color: 'green', shade: 'outline', shape: 'squiggle' },
    { card: 61, number: 1, color: 'purple', shade: 'outline', shape: 'squiggle' },
    { card: 62, number: 2, color: 'purple', shade: 'outline', shape: 'squiggle' },
    { card: 63, number: 3, color: 'purple', shade: 'outline', shape: 'squiggle' },

    // ----------------diamond outline---------------
    { card: 64, number: 1, color: 'red', shade: 'outline', shape: 'diamond' },
    { card: 65, number: 2, color: 'red', shade: 'outline', shape: 'diamond' },
    { card: 66, number: 3, color: 'red', shade: 'outline', shape: 'diamond' },
    { card: 67, number: 1, color: 'red', shade: 'outline', shape: 'diamond' },
    { card: 68, number: 2, color: 'green', shade: 'outline', shape: 'diamond' },
    { card: 69, number: 3, color: 'green', shade: 'outline', shape: 'diamond' },
    { card: 70, number: 1, color: 'purple', shade: 'outline', shape: 'diamond' },
    { card: 71, number: 2, color: 'purple', shade: 'outline', shape: 'diamond' },
    { card: 72, number: 3, color: 'purple', shade: 'outline', shape: 'diamond' },

    // ------------------oval outline---------------
    { card: 73, number: 1, color: 'red', shade: 'outline', shape: 'oval' },
    { card: 74, number: 2, color: 'red', shade: 'outline', shape: 'oval' },
    { card: 75, number: 3, color: 'red', shade: 'outline', shape: 'oval' },
    { card: 76, number: 1, color: 'red', shade: 'outline', shape: 'oval' },
    { card: 77, number: 2, color: 'green', shade: 'outline', shape: 'oval' },
    { card: 78, number: 3, color: 'green', shade: 'outline', shape: 'oval' },
    { card: 79, number: 1, color: 'purple', shade: 'outline', shape: 'oval' },
    { card: 80, number: 2, color: 'purple', shade: 'outline', shape: 'oval' },
    { card: 81, number: 3, color: 'purple', shade: 'outline', shape: 'oval' },
  ], { validate: true }
));
