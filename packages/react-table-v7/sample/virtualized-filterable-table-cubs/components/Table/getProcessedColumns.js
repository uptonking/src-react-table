import { formatCurrency, formatDate } from '../../utils';

import { TextColumnFilter, filterText } from './filters/TextColumnFilter';
import { NumberColumnFilter, filterNumber } from './filters/NumberColumnFilter';
import { DateColumnFilter, filterDate } from './filters/DateColumnFilter';
import { SetColumnFilter, filterSet } from './filters/SetColumnFilter';

const getProcessedColumns = (columns, defaultColumn = {}) => {
  const processColumn = (col) => {
    const column = { ...defaultColumn, ...col };

    if (column.type === 'currency') {
      column.Cell = ({ value }) => formatCurrency(value);
      column.align = 'end';
      column.filter = 'number';
    }

    if (column.type === 'date') {
      column.Cell = ({ value }) => formatDate(value.toISOString());
      column.filter = 'date';
      column.sortType = (a, b, key) => {
        var a1 = new Date(a.values[key]).getTime();
        var b1 = new Date(b.values[key]).getTime();
        if (a1 < b1) return 1;
        else if (a1 > b1) return -1;
        else return 0;
      };
    }

    if (column.filter === false) {
      return column;
    }

    if (column.filter === 'set') {
      column.Filter = SetColumnFilter;
      column.filter = filterSet;
    }

    if (column.filter === 'number') {
      column.Filter = NumberColumnFilter;
      column.filter = filterNumber;
    }

    if (column.filter === 'date') {
      column.Filter = DateColumnFilter;
      column.filter = filterDate;
    }

    if (!column.filter || column.filter === 'string') {
      column.Filter = TextColumnFilter;
      column.filter = filterText;
    }

    return column;
  };

  return columns.map((col) => {
    const processedCol = processColumn(col);

    if (processedCol.columns) {
      processedCol.columns = getProcessedColumns(
        processedCol.columns,
        defaultColumn,
      );
    }

    return processedCol;
  });
};

export default getProcessedColumns;
