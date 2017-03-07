// const base = document.querySelector('base') || { getAttribute: () => '/' };
const base = document.querySelector('base');
export const href = base.getAttribute('href');
