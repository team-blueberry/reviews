module.exports.generateRandomEndpoint = (context, events, next) => {
  const MIN = 0;
  const MAX = 10000000;
  let target = `/${Math.floor(Math.random() * (MAX - MIN))}/`;
<<<<<<< HEAD
  context.vars['htmlEndpoint'] = target;
  context.vars['bundleEndpoint'] = target + 'bundle.js';
=======
  context.vars['endpoint'] = target;
>>>>>>> b744a2db102dc187e0253611ff96902405e9ffa5
  next();
};
