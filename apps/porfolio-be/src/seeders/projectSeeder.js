const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const NUM_PROJECTS = 5;
const PHOTOS_PER_PROJECT = 3;
const BASE_URL = 'http://localhost:5000';
(async () => {
  const url = 'mongodb://localhost/portfolio';
  const client = new MongoClient(url, {});
  try {
    await client.connect();
    const collection = client.db().collection('projects');

    await collection.deleteMany();

    const projects = [];

    const filePath = path.join(BASE_URL, 'assets', 'images');

    for (let i = 0; i < NUM_PROJECTS; i++) {
      const project = {
        title: `Project ${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus metus aliquam eleifend mi in nulla. Volutpat odio facilisis mauris sit. Congue eu consequat ac felis donec et odio pellentesque. Ipsum dolor sit amet consectetur adipiscing elit. Id venenatis a condimentum vitae. Risus sed vulputate odio ut. Scelerisque in dictum non consectetur. Viverra accumsan in nisl nisi scelerisque eu ultrices. Volutpat consequat mauris nunc congue nisi vitae. Elementum tempus egestas sed sed risus pretium quam vulputate. Nibh sed pulvinar proin gravida hendrerit. Dolor magna eget est lorem. Arcu bibendum at varius vel pharetra. Eu mi bibendum neque egestas.',
        technologies: ['React', 'Node.js'],
        photos: [],
      };

      for (let j = 0; j < PHOTOS_PER_PROJECT; j++) {
        project.photos.push(`${BASE_URL}/assets/images/default_image.png`);
      }

      projects.push(project);
    }

    await collection.insertMany(projects);
    console.log(`${projects.length} projects seeded`);
    process.exit(0);
  } catch (error) {
    console.log(error.stack);
    process.exit(1);
  } finally {
    client.close();
  }
})();
