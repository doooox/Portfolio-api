const MongoClient = require('mongodb').MongoClient;

(async () => {
  const url =
    'mongodb+srv://dtopic12:dtopic12@myWebsite.2ts2qui.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url, {});
  try {
    await client.connect();
    const collection = client.db().collection('technologies');
    const technologies = [
      {
        name: 'React',
      },
      {
        name: 'Laravel',
      },
      {
        name: 'Symfony',
      },
      {
        name: 'PHP',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'TypeScript',
      },
      {
        name: 'Node.js',
      },
      {
        name: 'Express',
      },
      {
        name: 'MySql',
      },
      {
        name: 'MongoDB',
      },
      {
        name: 'React Redux',
      },
      {
        name: 'React Query',
      },
      {
        name: 'Socket.io',
      },
      {
        name: 'Axios',
      },
      {
        name: 'Orchid',
      },
      {
        name: 'Material UI',
      },
      {
        name: 'Express Session',
      },
      {
        name: 'Json Web Token',
      },
    ];
    await collection.deleteMany();
    await collection.insertMany(technologies);
    console.log(`${technologies.length} genres seeded`);
    process.exit(0);
  } catch (error) {
    console.log(error.stack);
    process.exit(1);
  }
})();
