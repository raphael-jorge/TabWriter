import { InstructionMetadata } from './instructionMetadata.model';

describe(`[${InstructionMetadata.name}]`, () => {
  describe(`[${InstructionMetadata.getInstructionMetadata.name}]`, () => {
    it('should set isRead property to false if the instruction pattern cannot be determined', () => {
      const instructionStr = '/-34';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.isRead).toBe(false);
    });

    it('should set readFailDescription property if the instruction pattern cannot be determined', () => {
      const instructionStr = '/-34';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.readFailDescription).toBeDefined();
    });

    it('should set isRead property to true for non method instructions', () => {
      const instructionStr = '1-2';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.isRead).toBe(true);
    });

    it('should not set readFailDescription property for non method instructions', () => {
      const instructionStr = '1-2';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.readFailDescription).not.toBeDefined();
    });

    it('should set isRead property to true for method instructions', () => {
      const instructionsStr = [
        'simpleMethod',
        'methodWithParams ( params ) ',
        'methodWithParamsAndInstructions ( params ) { instructions }',
      ];
      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.isRead).toBe(true);
      });
    });

    it('should not set readFailDescription property for method instructions', () => {
      const instructionsStr = [
        'simpleMethod',
        'methodWithParams ( params ) ',
        'methodWithParamsAndInstructions ( params ) { instructions }',
      ];
      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.readFailDescription).not.toBeDefined();
      });
    });

    it('should set property isMethod to false for non method instructions', () => {
      const instructionStr = '1-2';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.isMethod).toBe(false);
    });

    it('should set property isMethod to true for method instructions', () => {
      const instructionsStr = [
        'simpleMethod',
        'methodWithParams ( params ) ',
        'methodWithParamsAndInstructions ( params ) { instructions }',
      ];
      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.isMethod).toBe(true);
      });
    });

    it('should not set properties chord and note for method instructions', () => {
      const instructionStr = 'methodWithParamsAndInstructions ( params ) { instructions }';

      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.chord).not.toBeDefined();
      expect(instructionMetadata.note).not.toBeDefined();
    });

    it('should not set properties methodName, methodParams and methodInstructionsToApply for non method instructions', () => {
      const instructionStr = '1-2';
      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.methodName).not.toBeDefined();
      expect(instructionMetadata.methodParams).not.toBeDefined();
      expect(instructionMetadata.methodInstructionsToApply).not.toBeDefined();
    });

    it('should set property methodName for method instructions', () => {
      const methodName = 'someMethod';
      const instructionsStr = [
        `${methodName}`,
        `${methodName} ( params ) `,
        `${methodName} ( params ) { instructions }`,
      ];

      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.methodName).toBe(methodName);
      });
    });

    it('should set property methodParams for method instructions with parameters', () => {
      const params = '1, 2 , someTextParam ';
      const expectedParams = params.split(InstructionMetadata.METHOD_PARAMS_SEPARATOR).map(param => param.trim());

      const instructionsStr = [`someMethod ( ${params} )`, `someMethod ( ${params} ) { instructions }`];

      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.methodParams).toEqual(expectedParams);
      });
    });

    it('should not set property methodParams for method instructions without parameters', () => {
      const instructionsStr = ['someMethod', `someMethod { instructions }`];

      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.methodParams).not.toBeDefined();
      });
    });

    it('should set property methodInstructionsToApply for method instructions with instructions specified', () => {
      const instructionsToApply = 'someInstructionsToApply';
      const instructionsStr = [
        `someMethod { ${instructionsToApply} }`,
        `someMethod ( someParams ) { ${instructionsToApply} }`,
      ];

      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.methodInstructionsToApply).toBe(instructionsToApply);
      });
    });

    it('should not set property methodInstructionsToApply for method instructions without instructions specified', () => {
      const instructionsStr = ['someMethod', 'someMethod ( someParams )'];

      const instructionsMetadata = instructionsStr.map(instructionStr =>
        InstructionMetadata.getInstructionMetadata(instructionStr),
      );

      instructionsMetadata.forEach(metadata => {
        expect(metadata.methodInstructionsToApply).not.toBeDefined();
      });
    });

    it('should set properties chord and note for non method instructions', () => {
      const chord = 1;
      const note = '1/2';
      const instructionStr = `${chord}-${note}`;

      const instructionMetadata = InstructionMetadata.getInstructionMetadata(instructionStr);

      expect(instructionMetadata.chord).toBe(chord);
      expect(instructionMetadata.note).toBe(note);
    });
  });
});
