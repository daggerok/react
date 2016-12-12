const authors = [
  {
    email: 'daggerok@gmail.com',
    name: 'Max',
  },
  {
    email: 'bbt@mail.com',
    name: 'Billy Bob Thornton',
  },
];

module.exports = {
  get: function get() {
    return JSON.parse(JSON.stringify(authors));
  },
  getById: function getById(email) {
    const res = authors.filter(function(a, i) {
      return email === a.email;
    });

    if (res.length > 0) {
      return res[0];
    }
    return null;
  },
  add: function add(author) {
    authors.push(author);
  },
};
