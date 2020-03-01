import DbClient from '../../persistence/helpers/dbClient';
import { Db } from "mongodb";
import { mock } from 'jest-mock-extended';

export default class FakeDbClient<T> {

  static FindOneReturns<T>(promise: Promise<T>) {
    DbClient.connect = jest.fn();
    DbClient.db = mock<Db>();
    DbClient.db.collection = jest.fn().mockImplementation(() => {
      return {
        findOne: jest.fn((args) => {
          return promise;
        })
      };
    });
  }
}