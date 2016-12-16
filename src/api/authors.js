const authorsDb = [
  {
    email: 'daggerok@gmail.com',
    name: 'Max',
  },
  {
    email: 'bbt@mail.com',
    name: 'Billy Bob Thornton',
  },
];

export const get = () > JSON.parse(JSON.stringify(authorsDb));

export const getById = (email) => {
  const res = authorsDb.filter(function(a, i) {
    return email === a.email;
  });
  return res.length && res.length > 0 ? res[0] : null;
};

export const add = (author) => authorsDb.push(JSON.parse(JSON.stringify(author)));
