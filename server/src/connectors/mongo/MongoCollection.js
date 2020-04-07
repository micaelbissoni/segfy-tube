import mongo from './mongo';
import { ClientSession } from 'mongodb'

export default class MongoCollection {
  constructor(name) {
    this.name = name;
    this.col = mongo.db && mongo.db.collection(this.name);
  }

  getCol() {
    if (!this.col) {
      this.col = mongo.db && mongo.db.collection(this.name);
    }

    return this.col;
  }

  async getAutoIncrement(){
    const name = this.name;
    const field = name+'id';
    const step = 1;
    const result = await this.getCol().findOneAndUpdate(
      {
        name,
        field,
      },
      { $inc: { current: step } },
      { upsert: true, returnOriginal: false, ClientSession },
    )
  
    return result.value && result.value.current
  }
}
