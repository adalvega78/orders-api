import { MongoClient, Db, MongoClientOptions } from "mongodb";

class DbClient {
  public db: Db;
  mongoDbUri: string;

  constructor(mongoDbUri: string) {
    this.mongoDbUri = mongoDbUri;
  }

  public async connect() {
    let options = <MongoClientOptions>{
      useUnifiedTopology: true,
      useNewUrlParser: true
    };
    try {
      const client = await MongoClient.connect(this.mongoDbUri, options)
      this.db = client.db("test");
    }
    catch (err) {
      console.log(err);
    }
  }

}

export default new DbClient(process.env.MONGODB_URI);