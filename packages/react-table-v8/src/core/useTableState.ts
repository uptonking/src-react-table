import React from 'react';
import { TableInstance, TableState } from '../types';

export default function useTableState<TInstance extends TableInstance>(
  instance: TInstance,
) {
  // A home for our automatic internal table state
  const [autoState, setAutoState] = React.useState(
    instance.options.initialState,
  );

  // The computed state with any conrolled state overrides from the user
  instance.state = React.useMemo(
    () =>
      ({
        ...autoState,
        ...instance.options.state,
      } as TableState),
    [autoState, instance.options.state],
  );

  // Our super cool setState function with meta and onStateChange callback support
  instance.setState = React.useCallback(
    (updater) => {
      if (instance.options.onStateChange) {
        return instance.options.onStateChange(updater, instance);
      }

      return setAutoState(updater);
    },
    [instance],
  );
}
