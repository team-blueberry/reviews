module.exports.generateRandomEndpoint = (context, events, next) => {
  const MIN = 0;
  const MAX = 10000000;
  let target = `/${Math.floor(Math.random() * (MAX - MIN))}/`;
  context.vars['endpoint'] = target;
  next();
};
