import { useEffect } from 'react';

const useScrollSync = (panes, options = {}) => {
  useEffect(() => {
    const syncXAxis =
      !options.axis || options.axis === 'both' || options.axis === 'x';
    const syncYAxis =
      !options.axis || options.axis === 'both' || options.axis === 'y';

    const handleScroll = (e) => {
      window.requestAnimationFrame(() => {
        panes.forEach((pane) => {
          if (!pane) return;
          if (pane !== e.target) {
            pane.removeEventListener('scroll', handleScroll);
            if (syncXAxis) pane.scrollLeft = e.target.scrollLeft;
            if (syncYAxis) pane.scrollTop = e.target.scrollTop;
            window.requestAnimationFrame(() => {
              pane.addEventListener('scroll', handleScroll);
            });
          }
        });
      });
    };

    panes.forEach((pane) => {
      if (!pane) return;
      pane.addEventListener('scroll', handleScroll);
    });

    return () => {
      panes.forEach((pane) => {
        if (!pane) return;
        pane.removeEventListener('scroll', handleScroll);
      });
    };
  }, [panes, options]);
};

export default useScrollSync;
