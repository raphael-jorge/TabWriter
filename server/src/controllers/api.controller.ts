import express, { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import { ControllerBase } from '../interfaces/ControllerBase.interface';

export class ApiController implements ControllerBase {
  public readonly routePrefix = '/api';
  public readonly router = express.Router();

  constructor() {
    this.router.get('/', this.test);
  }

  private test(req: Request, res: Response): void {
    res.sendStatus(httpStatusCodes.OK);
  }
}