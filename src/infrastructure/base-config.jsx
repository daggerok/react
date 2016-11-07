const base = document.createElement('base');
const heads = document.getElementsByTagName('head');

base.setAttribute('href', '/');
heads[0].append(base);
