import { useMemo, useRef } from 'react';

const compareInputs = (inputKeys, oldInputs, newInputs) => {
  let changes = {};
  inputKeys.forEach((key) => {
    const oldInput = oldInputs[key];
    const newInput = newInputs[key];
    if (oldInput !== newInput) {
      changes = {
        ...changes,
        [key]: {
          old: oldInput,
          new: newInput,
        },
      };
    }
  });
  if (Object.keys(changes).length) {
    setTimeout(() => {
      console.table('Changes detected', changes);
    });
  }
};

const useDependencyDebugger = (inputs) => {
  const oldInputsRef = useRef(inputs);
  const inputValuesArray = Object.values(inputs);
  const inputKeysArray = Object.keys(inputs);
  useMemo(() => {
    const oldInputs = oldInputsRef.current;

    compareInputs(inputKeysArray, oldInputs, inputs);

    oldInputsRef.current = inputs;
  }, inputValuesArray); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDependencyDebugger;
