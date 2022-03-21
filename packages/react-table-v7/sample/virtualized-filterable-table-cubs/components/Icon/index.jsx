import React from 'react';
import PropTypes from 'prop-types';

import _AlertFilledIcon from './_AlertFilledIcon';
import _ApplicationIcon from './_ApplicationIcon';
import _AttentionIcon from './_AttentionIcon';
import _BanIcon from './_BanIcon';
import _BankIcon from './_BankIcon';
import _CalendarIcon from './_CalendarIcon';
import _CheckBookIcon from './_CheckBookIcon';
import _CheckMarkIcon from './_CheckMarkIcon';
import _ChevronDownIcon from './_ChevronDownIcon';
import _ChevronRightIcon from './_ChevronRightIcon';
import _ChurchPersonIcon from './_ChurchPersonIcon';
import _CircledCheckmarkFilledIcon from './_CircledCheckmarkFilledIcon';
import _CircledCheckmarkIcon from './_CircledCheckmarkIcon';
import _CircledMinusIcon from './_CircledMinusIcon';
import _CircledPlusIcon from './_CircledPlusIcon';
import _ClipboardIcon from './_ClipboardIcon';
import _ClockIcon from './_ClockIcon';
import _CollapseIcon from './_CollapseIcon';
import _ColumnsIcon from './_ColumnsIcon';
import _CopyIcon from './_CopyIcon';
import _CrossMarkIcon from './_CrossMarkIcon';
import _DepositBookIcon from './_DepositBookIcon';
import _ExpandIcon from './_ExpandIcon';
import _ExternalIcon from './_ExternalIcon';
import _FilterIcon from './_FilterIcon';
import _FilterRemoveIcon from './_FilterRemoveIcon';
import _FirstArrowIcon from './_FirstArrowIcon';
import _FolderCheckIcon from './_FolderCheckIcon';
import _FolderIcon from './_FolderIcon';
import _GearIcon from './_GearIcon';
import _InfoFilledIcon from './_InfoFilledIcon';
import _InfoIcon from './_InfoIcon';
import _LastArrowIcon from './_LastArrowIcon';
import _LockIcon from './_LockIcon';
import _MagnifyingGlassIcon from './_MagnifyingGlassIcon';
import _MenuIcon from './_MenuIcon';
import _MinusIcon from './_MinusIcon';
import _MoreMenuIcon from './_MoreMenuIcon';
import _NewReportIcon from './_NewReportIcon';
import _NextArrowIcon from './_NextArrowIcon';
import _NotesExistIcon from './_NotesExistIcon';
import _NotesIcon from './_NotesIcon';
import _OptionsIcon from './_OptionsIcon';
import _OverrideIcon from './_OverrideIcon';
import _PageArrowIcon from './_PageArrowIcon';
import _PageIcon from './_PageIcon';
import _PageSearchIcon from './_PageSearchIcon';
import _PencilIcon from './_PencilIcon';
import _PersonIcon from './_PersonIcon';
import _PlusIcon from './_PlusIcon';
import _PrevArrowIcon from './_PrevArrowIcon';
import _PrinterIcon from './_PrinterIcon';
import _QuestionFilledIcon from './_QuestionFilledIcon';
import _QuestionIcon from './_QuestionIcon';
import _RefreshIcon from './_RefreshIcon';
import _RowSizeIcon from './_RowSizeIcon';
import _SortAscIcon from './_SortAscIcon';
import _SortDescIcon from './_SortDescIcon';
import _TableResetIcon from './_TableResetIcon';
import _TableSyncIcon from './_TableSyncIcon';
import _TransactionIcon from './_TransactionIcon';
import _TrashIcon from './_TrashIcon';
import _UnlockedIcon from './_UnlockedIcon';
import _WarningFilledIcon from './_WarningFilledIcon';

export default function Icon({ type, fixedSize, style, ...props }) {
  switch (type) {
    case 'alert-filled':
      return <_AlertFilledIcon {...props} fixedSize={fixedSize} />;

    case 'application':
      return <_ApplicationIcon {...props} fixedSize={fixedSize} />;

    case 'attention':
      return <_AttentionIcon {...props} fixedSize={fixedSize} />;

    case 'ban':
      return <_BanIcon {...props} fixedSize={fixedSize} />;

    case 'bank':
      return <_BankIcon {...props} fixedSize={fixedSize} />;

    case 'calendar':
      return <_CalendarIcon {...props} fixedSize={fixedSize} />;

    case 'columns':
      return <_ColumnsIcon {...props} fixedSize={fixedSize} />;

    case 'check-book':
      return <_CheckBookIcon {...props} fixedSize={fixedSize} />;

    case 'circled-minus':
      return <_CircledMinusIcon {...props} fixedSize={fixedSize} />;

    case 'circled-check-mark-filled':
      return <_CircledCheckmarkFilledIcon {...props} fixedSize={fixedSize} />;

    case 'circled-check-mark':
      return <_CircledCheckmarkIcon {...props} fixedSize={fixedSize} />;

    case 'circled-cross':
      return <_CircledPlusIcon {...props} fixedSize={fixedSize} />;

    case 'copy':
      return <_CopyIcon {...props} fixedSize={fixedSize} />;

    case 'collapse':
      return <_CollapseIcon {...props} fixedSize={fixedSize} />;

    case 'check-mark':
      return <_CheckMarkIcon {...props} fixedSize={fixedSize} />;

    case 'chevron-down':
      return <_ChevronDownIcon {...props} fixedSize={fixedSize} />;

    case 'chevron-right':
      return <_ChevronRightIcon {...props} fixedSize={fixedSize} />;

    case 'church-person':
      return <_ChurchPersonIcon {...props} fixedSize={fixedSize} />;

    case 'clipboard':
      return <_ClipboardIcon {...props} fixedSize={fixedSize} />;

    case 'clock':
      return <_ClockIcon {...props} fixedSize={fixedSize} />;

    case 'cross-mark':
      return <_CrossMarkIcon {...props} fixedSize={fixedSize} />;

    case 'deposit-book':
      return <_DepositBookIcon {...props} fixedSize={fixedSize} />;

    case 'expand':
      return <_ExpandIcon {...props} fixedSize={fixedSize} />;

    case 'external':
      return <_ExternalIcon {...props} fixedSize={fixedSize} />;

    case 'filter':
      return <_FilterIcon {...props} fixedSize={fixedSize} />;

    case 'first-arrow':
      return <_FirstArrowIcon {...props} fixedSize={fixedSize} />;

    case 'folder-check':
      return <_FolderCheckIcon {...props} fixedSize={fixedSize} />;

    case 'folder':
      return <_FolderIcon {...props} fixedSize={fixedSize} />;

    case 'gear':
      return <_GearIcon {...props} fixedSize={fixedSize} />;

    case 'info-filled':
      return <_InfoFilledIcon {...props} fixedSize={fixedSize} />;

    case 'info':
      return <_InfoIcon {...props} fixedSize={fixedSize} />;

    case 'last-arrow':
      return <_LastArrowIcon {...props} fixedSize={fixedSize} />;

    case 'lock':
      return <_LockIcon {...props} fixedSize={fixedSize} />;

    case 'magnifying-glass':
      return <_MagnifyingGlassIcon {...props} fixedSize={fixedSize} />;

    case 'minus':
      return <_MinusIcon {...props} fixedSize={fixedSize} />;

    case 'menu':
      return <_MenuIcon {...props} fixedSize={fixedSize} />;

    case 'more-menu':
      return <_MoreMenuIcon {...props} fixedSize={fixedSize} />;

    case 'new-report':
      return <_NewReportIcon {...props} fixedSize={fixedSize} />;

    case 'next-arrow':
      return <_NextArrowIcon {...props} fixedSize={fixedSize} />;

    case 'notes':
      return <_NotesIcon {...props} fixedSize={fixedSize} />;

    case 'notes-exist':
      return <_NotesExistIcon {...props} fixedSize={fixedSize} />;

    case 'notes-exist-red':
      return <_NotesExistIcon {...props} useRedCircle fixedSize={fixedSize} />;

    case 'options':
      return <_OptionsIcon {...props} fixedSize={fixedSize} />;

    case 'override':
      return <_OverrideIcon {...props} fixedSize={fixedSize} />;

    case 'page':
      return <_PageIcon {...props} fixedSize={fixedSize} />;

    case 'page-arrow':
      return <_PageArrowIcon {...props} fixedSize={fixedSize} />;

    case 'page-search':
      return <_PageSearchIcon {...props} fixedSize={fixedSize} />;

    case 'pencil':
      return <_PencilIcon {...props} fixedSize={fixedSize} />;

    case 'person':
      return <_PersonIcon {...props} fixedSize={fixedSize} />;

    case 'plus':
      return <_PlusIcon {...props} fixedSize={fixedSize} />;

    case 'prev-arrow':
      return <_PrevArrowIcon {...props} fixedSize={fixedSize} />;

    case 'printer':
      return <_PrinterIcon {...props} fixedSize={fixedSize} />;

    case 'question':
      return <_QuestionIcon {...props} fixedSize={fixedSize} />;

    case 'question-filled':
      return <_QuestionFilledIcon {...props} fixedSize={fixedSize} />;

    case 'refresh':
      return <_RefreshIcon {...props} fixedSize={fixedSize} />;

    case 'row-size':
      return <_RowSizeIcon {...props} fixedSize={fixedSize} />;

    case 'filter-remove':
      return <_FilterRemoveIcon {...props} fixedSize={fixedSize} />;

    case 'sort-asc':
      return <_SortAscIcon {...props} fixedSize={fixedSize} />;

    case 'sort-desc':
      return <_SortDescIcon {...props} fixedSize={fixedSize} />;

    case 'table-reset':
      return <_TableResetIcon {...props} fixedSize={fixedSize} />;

    case 'table-sync':
      return <_TableSyncIcon {...props} fixedSize={fixedSize} />;

    case 'transaction':
      return <_TransactionIcon {...props} fixedSize={fixedSize} />;

    case 'trash':
      return <_TrashIcon {...props} fixedSize={fixedSize} />;

    case 'unlocked':
      return <_UnlockedIcon {...props} fixedSize={fixedSize} />;

    case 'warning-filled':
      return <_WarningFilledIcon {...props} fixedSize={fixedSize} />;

    default:
      return <_QuestionIcon {...props} fixedSize={fixedSize} />;
  }
}

Icon.propTypes = {
  fixedSize: PropTypes.bool,

  type: PropTypes.oneOf([
    'alert-filled',
    'application',
    'attention',
    'ban',
    'bank',
    'bullet',
    'calendar',
    'caret-up',
    'check-book',
    'check-mark',
    'checkbox',
    'checkbox-check-mark',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'church-person',
    'circled-check-mark-filled',
    'circled-check-mark',
    'circled-cross',
    'circled-minus',
    'clipboard',
    'clock',
    'collapse',
    'columns',
    'copy',
    'cross',
    'cross-mark',
    'deposit-book',
    'document',
    'ellipsis',
    'email',
    'expand',
    'external',
    'file',
    'filter',
    'first-arrow',
    'folder-check',
    'info-filled',
    'info',
    'last-arrow',
    'lock',
    'magnifying-glass',
    'media-next',
    'media-play',
    'media-prev',
    'menu',
    'minus',
    'more-menu',
    'new-report',
    'next-arrow',
    'notes',
    'notes-exist',
    'notes-exist-red',
    'options',
    'override',
    'page-arrow',
    'page-search',
    'pencil',
    'person',
    'plus',
    'prev-arrow',
    'printer',
    'question-filled',
    'question',
    'refresh',
    'radio-container',
    'radio-mark',
    'refresh',
    'row-size',
    'secure',
    'sort-asc',
    'sort-desc',
    'star',
    'table-reset',
    'table-sync',
    'transaction',
    'trash',
    'unlocked',
    'warning-filled',
  ]).isRequired,
};
