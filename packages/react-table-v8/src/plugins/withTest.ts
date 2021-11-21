import { defaultPlugs } from '../core/makePlugs';
import {
  ReduceTableBodyProps,
  TableInstance,
  TableOptions,
  UseReduceOptions,
} from '../types';

interface WithTestTableOptions extends TableOptions {
  test?: string;
}

const useReduceOptions: UseReduceOptions<WithTestTableOptions, TableInstance> =
  (options: any) => {
    return {
      test: false,
      ...options,
    };
  };

interface WithTestTableBodyProps {
  test: boolean;
}

const reduceTableBodyProps: ReduceTableBodyProps<
  WithTestTableBodyProps,
  TableInstance<WithTestTableOptions>
> = (props: any, { instance }) => ({
  test: instance.options.test,
  ...props,
});

export const withTest = {
  name: 'withTest',
  after: [],
  plugs: {
    ...defaultPlugs,
    useReduceOptions,
    reduceTableBodyProps,
  },
};
