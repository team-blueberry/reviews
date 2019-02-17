# reviews-component
> Reviews Component for Retail Product Detail Page

![component-screen-capture](documentation/front-end-experience.gif)



This repository extends a colleague's retail product reviews component to perform at production scale - both by creating and efficently quering database entries for 10 Million simulated product listings and by creating a system architecture to handle hundreds of page requests per second.

## Key Tools

- Development
  - [PostgreSQL](https://www.postgresql.org/) Database
  - [Docker](https://www.docker.com) Containerization
  - [Nginx](https://www.nginx.com/) Load Balancing and Caching
  - [Webpack](https://webpack.js.org/) Client Application Bundler
  - [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) web framework
- Testing
  - [Loader.io](http://loader.io) Load Testing
- Monitoring
  - [s-tui](https://github.com/amanusk/s-tui) Terminal based CPU stress and monitoring utility
  - [htop](https://github.com/hishamhm/htop) Terminal based process viewer
  - [node.js with chrome debugger](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27) For node.js profiling

## Simulating Production Scale

- [Database Selection and Query Benchmarking](#database-selection-and-query-benchmarking)
- Generating 70M Mock Database Entries
- Creating A Scalable Architecture with Docker and Nginx
- Serving Static Files Effectively

### Database Selection and Query Benchmarking



### Generating 70M Mock Database Entries



### Creating A Scalable Architecture with Docker and Nginx



### Serving Static Files Effectively



## Authors

* **Jared Ellison** - Refactored back end for production scale deployment - [jaredellison.net](http://jaredellison.net)
* **Ari Efron** - Created client side React component -  [Github](https://github.com/arfyron)

## Acknowledgments

- **Project Team** - *Each re-engineered similar components to build a complete product detail page capable of handling significant traffic*
  - [Charlie Bencivenga](https://github.com/Cbenz88)
  - [Lexi Santoro](https://github.com/lexisantoro)

- **Technical Mentors** - *Provided instruction and guidance on project architecture*
  - [Joseph Martin](https://github.com/jpranaymartin)
  - [Trent Going](https://github.com/trentgoing)

## References

- [Volkan Özçelik on "Scaling Your Node.JS API Like a Boss"](https://www.youtube.com/watch?v=Ogjb60Fg10A)