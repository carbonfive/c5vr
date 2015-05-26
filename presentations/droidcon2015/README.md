# Getting Started in VR for Anrdoid with Google Cardboard and Unit

A workshop presentation that provides an introduction on Virtual Reality
concepts and how to quickly get started in the field with Google
Cardboard and Unity.

### Running the Presentation

1. Install dependencies
   ```sh
   $ npm install
   ```
1. Serve the presentation and monitor source files for changes
   ```sh
   $ grunt serve
   ```
1. Open <http://localhost:8000> to view your presentation

   You can change the port by using `grunt serve --port 8001`.

## Contributing

This presentation is based on the
[reveal.js](https://github.com/hakimel/reveal.js) system. Instructions on
creating content can be found
[here](https://github.com/hakimel/reveal.js#instructions).

### Folder Structure
- **css/** Core styles without which the project does not function
- **js/** Like above but for JavaScript
- **plugin/** Components that have been developed as extensions to reveal.js
- **lib/** All other third party assets (JavaScript, CSS, fonts)
