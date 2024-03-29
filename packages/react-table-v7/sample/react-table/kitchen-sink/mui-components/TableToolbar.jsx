// import PropTypes from 'prop-types';
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import AddUserDialog from './AddUserDialog';
import GlobalFilter from './GlobalFilter';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    addUserHandler,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props;

  const toolbarHighlightStyle = numSelected > 0 ? classes.highlight : '';
  return (
    <Toolbar className={`${classes.root} ${toolbarHighlightStyle}`}>
      <AddUserDialog addUserHandler={addUserHandler} />
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h6' id='tableTitle'>
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete' onClick={deleteUserHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

// TableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   addUserHandler: PropTypes.func.isRequired,
//   deleteUserHandler: PropTypes.func.isRequired,
//   setGlobalFilter: PropTypes.func.isRequired,
//   preGlobalFilteredRows: PropTypes.array.isRequired,
//   globalFilter: PropTypes.string.isRequired,
// };

export default TableToolbar;
