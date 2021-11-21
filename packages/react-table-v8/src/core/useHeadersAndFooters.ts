import React from 'react';
import {
  Footer,
  FooterGroup,
  Header,
  HeaderGroup,
  TableInstance,
} from '../types';

//

import { flattenBy, buildHeaderGroups, recurseHeaderForSpans } from '../utils';

export default function useHeadersAndFooters(instance: TableInstance) {
  const { columns, leafColumns } = instance;

  instance.headerGroups = React.useMemo(() => {
    if (process.env.NODE_ENV !== 'production' && instance.options.debug)
      console.info('Building Headers and Footers');

    return buildHeaderGroups(columns, leafColumns, { instance });
  }, [columns, instance, leafColumns]);

  instance.headerGroups =
    instance.plugs.useReduceHeaderGroups(instance.headerGroups, {
      instance,
    }) ?? [];

  instance.headerGroups[0].headers.forEach((header) =>
    recurseHeaderForSpans(header),
  );

  instance.footerGroups = React.useMemo(
    () => [...instance.headerGroups].reverse(),
    [instance.headerGroups],
  ) as unknown as FooterGroup[];

  instance.footerGroups =
    instance.plugs.useReduceFooterGroups(instance.footerGroups, {
      instance,
    }) ?? [];

  instance.flatHeaders = React.useMemo(
    () =>
      flattenBy<HeaderGroup[], Header[]>(
        instance.headerGroups,
        'headers',
        true,
      ),
    [instance.headerGroups],
  );

  instance.flatHeaders =
    instance.plugs.useReduceFlatHeaders(instance.flatHeaders, {
      instance,
    }) ?? [];

  instance.flatHeaders.forEach((header) => {
    // Give columns/headers a default getHeaderProps
    header.getHeaderProps = (props = {}) =>
      instance.plugs.reduceHeaderProps(props, { instance, header });

    // Give columns/headers a default getFooterProps
    header.getFooterProps = (props = {}) =>
      instance.plugs.reduceFooterProps(props, {
        instance,
        header,
      });

    instance.plugs.decorateHeader(header, { instance });
  });

  instance.flatFooters = React.useMemo(
    () =>
      flattenBy<FooterGroup[], Footer[]>(
        instance.footerGroups,
        'footers',
        true,
      ),
    [instance.footerGroups],
  );
}
