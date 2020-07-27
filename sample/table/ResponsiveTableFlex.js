import React, { useEffect } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  @media all and (max-width: @breakpoint) {
    .hiddenSmall {
      display: none;
    }
  }

  /* Tab Styling
==================================== */
  @tabColour: darkcyan;

  .Tablist {
    display: flex;
    flex-direction: row;
    margin-left: -@bw;
    @media all and (min-width: @breakpoint) {
      display: none;
    }
  }
  .Tab {
    padding: 0.6em 1em;
    margin: 0 @bw @bw 0;
    text-align: center;
    background-color: @tabColour;
    border: solid @bw @tabColour;
    border-bottom-width: 0;
    border-radius: 0.5em 0.5em 0 0;
    font-weight: bold;
    color: darken(@tabColour, 20%);
    text-decoration: none;
    transition: background-color 0.1s;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: mix(white, @tabColour, 10%);
      border-color: mix(white, @tabColour, 10%);
      outline: none;
    }
    &[aria-selected='false']:active {
      margin-top: 0.2em;
      padding-bottom: 0.4em;
    }
    &[aria-selected='true'] {
      background: mix(white, @tabColour, 90%);
      cursor: default;
    }
  }

  /* Accordion Styling
==================================== */
  @accordionColour: darkcyan;
  @iconSize: 2em;

  .Accordion {
    position: relative;
    top: -@bw;
    left: -@bw; //compensate for border offset
    width: 100%;
    margin: 0 0 0.5em 0;
    padding: 0.6em 0.6em 0.6em (@iconSize);
    border-radius: 0.5em;
    text-align: left;
    border: solid @bw mix(black, @accordionColour, 15%);
    background-color: @accordionColour;
    font-weight: bold;
    color: darken(@accordionColour, 20%);
    text-decoration: none;
    transition: background-color 0.1s;
    cursor: pointer;
    @media all and (min-width: @breakpoint) {
      display: none;
    }
    &:hover,
    &:focus {
      outline: none;
      filter: contrast(150%);
    }
    &[aria-selected='true'] {
      margin-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-width: 0;
      background: mix(white, @accordionColour, 70%);
    }
    &:before {
      content: '+';
      position: absolute;
      top: 50%;
      left: 0.3em;
      margin-top: -(@iconSize / 1.75);
      font-weight: normal;
      font-size: @iconSize;
      line-height: @iconSize;
      background-size: @iconSize @iconSize;
    }
    &[aria-selected='true']:before {
      content: '-';
    }
  }

  .js-RtableTabs,
  .js-RtableAccordions {
    min-width: 240px;
  }
`;

/**
 * 在表格中显示tab或accordion。
 * Tab and accordion markup is inside the table in a logical position
 */
function ResponsiveTableFlex(props) {
  useEffect(() => {
    // (function ($) {
    $.fn.responsiveTable = function () {
      let toggleColumns = function ($table) {
        let selectedControls = [];
        $table.find('.Accordion, .Tab').each(function () {
          selectedControls.push($(this).attr('aria-selected'));
        });
        let cellCount = 0;
        let colCount = 0;
        let setNum =
          $table.find('.Rtable-cell').length /
          Math.max(
            $table.find('.Tab').length,
            $table.find('.Accordion').length,
          );
        $table.find('.Rtable-cell').each(function () {
          $(this).addClass('hiddenSmall');
          if (selectedControls[colCount] === 'true')
            $(this).removeClass('hiddenSmall');
          cellCount++;
          if (cellCount % setNum === 0) colCount++;
        });
      };
      $(this).each(function () {
        toggleColumns($(this));
      });

      $(this)
        .find('.Tab')
        .click(function () {
          $(this)
            .attr('aria-selected', 'true')
            .siblings()
            .attr('aria-selected', 'false');
          toggleColumns($(this).parents('.Rtable'));
        });

      $(this)
        .find('.Accordion')
        .click(function () {
          $(this).attr(
            'aria-selected',
            $(this).attr('aria-selected') !== 'true',
          );
          toggleColumns($(this).parents('.Rtable'));
        });
    };
    // })(jQuery);

    $('.js-RtableTabs, .js-RtableAccordions').responsiveTable();
  });
  return (
    <StyledDiv>
      <h2>Collapse to Tabs</h2>
      <div className='Rtable Rtable--3cols Rtable--collapse js-RtableTabs'>
        <div className='Tablist' role='tablist'>
          <button className='Tab' role='tab' aria-selected='true'>
            Ned
          </button>
          <button className='Tab' role='tab' aria-selected='false'>
            Jon
          </button>
          <button className='Tab' role='tab' aria-selected='false'>
            Arya
          </button>
        </div>

        <div style={{ order: 0 }} className='Rtable-cell Rtable-cell--head'>
          <h3>Eddard Stark</h3>
        </div>
        <div style={{ order: 1 }} className='Rtable-cell'>
          Has a sword named Ice
        </div>
        <div style={{ order: 2 }} className='Rtable-cell'>
          No direwolf
        </div>
        <div style={{ order: 3 }} className='Rtable-cell Rtable-cell--foot'>
          <strong>Lord of Winterfell</strong>
        </div>

        <div style={{ order: 0 }} className='Rtable-cell Rtable-cell--head'>
          <h3>Jon Snow</h3>
        </div>
        <div style={{ order: 1 }} className='Rtable-cell'>
          Has a sword named Longclaw
        </div>
        <div style={{ order: 2 }} className='Rtable-cell'>
          Direwolf: Ghost
        </div>
        <div style={{ order: 3 }} className='Rtable-cell Rtable-cell--foot'>
          <strong>Knows nothing</strong>
        </div>

        <div style={{ order: 0 }} className='Rtable-cell Rtable-cell--head'>
          <h3>Arya Stark</h3>
        </div>
        <div style={{ order: 1 }} className='Rtable-cell'>
          Has a sword named Needle
        </div>
        <div style={{ order: 2 }} className='Rtable-cell'>
          Direwolf: Nymeria
        </div>
        <div style={{ order: 3 }} className='Rtable-cell Rtable-cell--foot'>
          <strong>No one</strong>
        </div>
      </div>

      <h2>Collapse to Accordions</h2>
      <div className='Rtable Rtable--4cols Rtable--collapse js-RtableAccordions'>
        <button className='Accordion' role='tab' aria-selected='true'>
          Ned
        </button>
        <div className='Rtable-cell  Rtable-cell--head'>
          <h3>Eddard Stark</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Ice</div>
        <div className='Rtable-cell'>No direwolf</div>
        <div className='Rtable-cell  Rtable-cell--foot'>
          <strong>Lord of Winterfell</strong>
        </div>

        <button className='Accordion' role='tab' aria-selected='false'>
          Jon
        </button>
        <div className='Rtable-cell  Rtable-cell--head'>
          <h3>Jon Snow</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Longclaw</div>
        <div className='Rtable-cell'>Direwolf: Ghost</div>
        <div className='Rtable-cell  Rtable-cell--foot'>
          <strong>Knows nothing</strong>
        </div>

        <button className='Accordion' role='tab' aria-selected='false'>
          Arya
        </button>
        <div className='Rtable-cell  Rtable-cell--head'>
          <h3>Arya Stark</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Needle</div>
        <div className='Rtable-cell'>Direwolf: Nymeria</div>
        <div className='Rtable-cell  Rtable-cell--foot'>
          <strong>No one</strong>
        </div>
      </div>

      <ul>
        <li>
          Tab and accordion markup sits IN the table in a logical position
        </li>
        <li>Toggle either row or column depending on table content</li>
        <li>
          Use display:none to toggle for both visual users and screen readers
        </li>
      </ul>
    </StyledDiv>
  );
}

export default ResponsiveTableFlex;
