import * as HttpStatus from 'http-status-codes';
import { InvalidInstructionError } from './invalidInstructionError.model';
import { ResponseErrorInvalidInstructions } from './responseErrorInvalidInstructions.model';
import { InstructionWriteResult } from '../../../services/tabWriter.service';

const getDefaultInvalidInstructionResponseErrors = (): InvalidInstructionError[] => {
  const invalidInstructionWriteResult: InstructionWriteResult = {
    success: false,
    error: 'test error',
    instruction: 'test',
    readFromIdx: 0,
    readToIdx: 2,
    name: 'instrução test',
  };
  return [new InvalidInstructionError(invalidInstructionWriteResult)];
};

describe(`[${ResponseErrorInvalidInstructions.name}]`, () => {
  it('should set the message', () => {
    const responseError = new ResponseErrorInvalidInstructions(
      getDefaultInvalidInstructionResponseErrors()
    );

    expect(responseError.message).toBeDefined();
    expect(responseError.message.trim().length).toBeGreaterThan(0);
  });

  it('should set the errors to the given invalid instruction errors', () => {
    const invalidInstructionsResponseErrors = getDefaultInvalidInstructionResponseErrors();
    const responseError = new ResponseErrorInvalidInstructions(
      invalidInstructionsResponseErrors
    );

    expect(responseError.errors).toEqual(invalidInstructionsResponseErrors);
  });

  it('should return an unprocessable entity status code', () => {
    const responseError = new ResponseErrorInvalidInstructions(
      getDefaultInvalidInstructionResponseErrors()
    );

    expect(responseError.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });
});