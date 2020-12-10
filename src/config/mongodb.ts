import Mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
Mongoose.Promise = Promise;

const mongoOptions: Mongoose.ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DATABASE,
  keepAlive: true,
  poolSize: 20,
};

export default () => {
  if (process.env.NODE_ENV === "test") {
    const mongoServer = new MongoMemoryServer();
    mongoServer.getUri().then((mongoTestURI) => {
      Mongoose.connect(mongoTestURI, mongoOptions).then(
        () => {
          console.log(`connected to TEST MONGODB DATABASE at: ${mongoTestURI}`);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  } else {
    let uri =
      process.env.NODE_ENV === "production"
        ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jont5.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
        : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

    Mongoose.connect(uri, mongoOptions).then(
      () => {
        console.log(`connected to mongodb at: ${uri}`);
      },
      (err) => {
        console.log(err);
      }
    );

    Mongoose.connection.on("error", (err) => {
      console.log(err);
    });

    Mongoose.connection.on("close", () => {
      console.log("MONGOOSE: connection close");
    });
  }
};
