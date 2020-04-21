import { DefaultInstruction } from './defaultInstruction.model';
import { InvalidInstruction } from './invalidInstruction';
import { MergeInstruction } from './mergeInstruction.model';
import { BreakInstruction } from './breakInstruction.model';
import { ParserService } from './../../services/parser.service';
import { InstructionFactory } from './instructionFactory.model';
import { MergeableInstruction } from './mergeableInstruction.model';

describe(`[${InstructionFactory.name}]`, () => {
  describe('[getInstruction]', () => {
    it('should return a default instruction for a parsed <:chord-:note > instruction', () => {
      const instructionStr = '1-1/2';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult) as MergeableInstruction;

        expect(instruction).toBeInstanceOf(DefaultInstruction);
      });
    });

    it('should return an invalid instruction for a parsed <:chord-:note > instruction with invalid chord or note', () => {
      const instructionStr = '1 -1 1- f-1';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(InvalidInstruction);
      });
    });

    it('should return a break instruction for a parsed <BREAK> method', () => {
      const instructionStr = 'break';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(BreakInstruction);
      });
    });

    it('should return a merge instruction for a parsed < MERGE > or < M > methods with valid mergeable targets', () => {
      const instructionStr = 'merge { 1-2 2-2 } m { 1-2 2-2 }';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(MergeInstruction);
      });
    });

    it('should return an invalid instruction for a parsed < MERGE > or < M > method without targets', () => {
      const instructionStr = 'merge m';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(InvalidInstruction);
      });
    });

    it('should return an invalid instruction for a parsed < MERGE > or < M > method with empty targets', () => {
      const instructionStr = 'merge {} m{}';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(InvalidInstruction);
      });
    });

    it('should return an invalid instruction for a parsed < MERGE > or < M > method with unmergeable targets', () => {
      const instructionStr = 'merge {{}} m{{}} merge { break 1-2 } m { break 1-2 }';
      const parser = new ParserService();
      const parserResults = parser.parse(instructionStr);

      parserResults.forEach(parserResult => {
        const instruction = InstructionFactory.getInstruction(parserResult);

        expect(instruction).toBeInstanceOf(InvalidInstruction);
      });
    });
  });
});
