import React, { useEffect } from 'react';
import jQuery from 'jquery';
import styled from 'styled-components';
import { darken, mix } from 'polished';

const StyledDiv = styled('div')`
  /* @bw: 3px;  // border width */
  /* @tableColour: slategrey; #708090*/
  /* @breakpoint: 500px; */
  /* @tabColour: darkcyan; #008b8b */

  /* css reset */
  max-width: 1080px;
  padding: 2em;
  font-family: sans-serif;
  font-size: 1.2em;
  border: double 3px #ddd;
  border-top: none;
  border-bottom: none;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
  h3 {
    font-size: 1.2em;
  }
  h4 {
    font-size: 1em;
  }
  strong {
    color: ${darken(0.2, '#708090')};
  }
  button {
    font-size: 100%;
  }

  /* Tables by rows=============================== */
  .Rtable {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 3em 0;
    padding: 0;
  }
  .Rtable-cell {
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    padding: 0.8em 1.2em;
    overflow: hidden;
    list-style: none;
    border: solid 3px white;
    /* background: fade(slategrey, 20%); */
    background: #70809033;
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      margin: 0;
    }
  }

  /* Table column sizing========================== */
  .Rtable--2cols > .Rtable-cell {
    width: 50%;
  }
  .Rtable--3cols > .Rtable-cell {
    width: 33.33%;
  }
  .Rtable--4cols > .Rtable-cell {
    width: 25%;
  }
  .Rtable--5cols > .Rtable-cell {
    width: 20%;
  }
  .Rtable--6cols > .Rtable-cell {
    width: 16.6%;
  }

  /* @tableColour: slategrey; */

  /* Apply styles================================= */
  .Rtable {
    /* position: relative; top: @bw; left: @bw;  */
    position: relative;
    top: 3px;
    left: 3px;
  }
  .Rtable-cell {
    /* 减小单元格间距，也是减小边框宽度 */
    /* margin: -@bw 0 0 -@bw;   */
    margin: -3px 0 0 -3px;
    /* .Rtable-cell--light; */
  }

  /* Cell styles================================ */

  /* 普通单元格白底黑字，样式要放在前面，否则会覆盖其他cell背景色 */
  .Rtable-cell,
  .Rtable-cell--light {
    background-color: white;
    /* border-color: mix(white,@tableColour,80%); */
    border-color: ${mix(0.8, '#fff', '#708090')};
  }

  /* 表头单元格深色，白字 */
  .Rtable-cell--head,
  .Rtable-cell--dark {
    color: white;
    background-color: slategrey;
    /* border-color: darken(@tableColour,10%); */
    border-color: ${darken(0.1, '#708090')};
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      color: white;
    }
  }

  /* 表尾单元格浅深色 */
  .Rtable-cell--foot,
  .Rtable-cell--medium {
    /* background-color: mix(white,@tableColour,50%); */
    background-color: ${mix(0.5, '#fff', '#708090')};
    /* border-color: mix(white,@tableColour,40%); */
    border-color: ${mix(0.4, '#fff', '#708090')};
  }

  /* .Rtable-cell--highlight {
    background-color: lightgreen;
    border-color: darken(lightgreen,10%);
  }
  .Rtable-cell--alert {
    background-color: darkorange;
    border-color: darken(darkorange,10%);
    color: white; > h1, > h2, > h3, > h4, > h5, > h6 { color: white; }
  } */

  /* Inherit header and footer styles */
  /* .Rtable-cell--head { .Rtable-cell--dark; } */
  /* .Rtable-cell--foot { .Rtable-cell--medium; } */

  /* Responsive==================================== */
  /* @media all and (max-width: @breakpoint) { */
  @media all and (max-width: 640px) {
    .Rtable--collapse {
      /* 对于移动端小屏幕，每个单元格显示一行 */
      display: block;
      > .Rtable-cell {
        width: 100% !important;
      }
      > .Rtable-cell--foot {
        margin-bottom: 1em;
      }
    }
  }

  /* Non-Flex modernizer fallback */
  /* .no-flexbox .Rtable {
    display: block;
    > .Rtable-cell {
      width: 100%;
    }
    > .Rtable-cell--foot {
      margin-bottom: 1em;
    }
  } */

  /* @media all and (max-width: @breakpoint) { */
  @media all and (max-width: 640px) {
    .hiddenSmall {
      display: none;
    }
  }

  /* Tab Styling==================================== */

  .Tablist {
    display: flex;
    flex-direction: row;
    /* margin-left: -@bw; */
    margin-left: -3px;
    /* @media all and (min-width: @breakpoint) { */
    @media all and (min-width: 640px) {
      display: none;
    }
  }
  .Tab {
    padding: 0.6em 1em;
    /* margin: 0 @bw @bw 0; */
    margin: 0 3px 3px 0;
    /* border: solid @bw @tabColour; */
    border: solid 3px #008b8b;
    border-bottom-width: 0;
    border-radius: 0.5em 0.5em 0 0;
    /* color: darken(@tabColour, 20%); */
    color: ${darken(0.2, '#008b8b')};
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    /* background-color: @tabColour; */
    background-color: #008b8b;
    transition: background-color 0.1s;
    cursor: pointer;
    &:hover,
    &:focus {
      /* background-color: mix(white, @tabColour, 10%); */
      background-color: ${mix(0.1, '#fff', '#008b8b')};
      /* border-color: mix(white, @tabColour, 10%); */
      border-color: ${mix(0.1, '#fff', '#008b8b')};
      outline: none;
    }
    &[aria-selected='false']:active {
      margin-top: 0.2em;
      padding-bottom: 0.4em;
    }
    &[aria-selected='true'] {
      /* background: mix(white, @tabColour, 90%); */
      background: ${mix(0.9, '#fff', '#008b8b')};
      cursor: default;
    }
  }

  /* Accordion Styling=================================== */
  /* @accordionColour: darkcyan; */
  /* @iconSize: 2em; */

  .Accordion {
    position: relative;
    top: -3px;
    left: -3px;
    width: 100%;
    /* padding: 0.6em 0.6em 0.6em (@iconSize); */
    padding: 0.6em 0.6em 0.6em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 0.5em;
    /* border: solid @bw mix(black, @accordionColour, 15%); */
    border: solid 3px ${mix(0.15, '#000', '#008b8b')};
    text-align: left;
    font-weight: bold;
    /* color: darken(@accordionColour, 20%); */
    color: ${darken(0.2, '#008b8b')};
    text-decoration: none;
    /* background-color: @accordionColour; */
    background-color: #008b8b;
    transition: background-color 0.1s;
    cursor: pointer;
    /* @media all and (min-width: @breakpoint) { */
    @media all and (min-width: 640px) {
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
      /* background: mix(white, @accordionColour, 70%); */
      background: ${mix(0.7, '#fff', '#008b8b')};
    }
    &:before {
      content: '+';
      position: absolute;
      top: 50%;
      left: 0.3em;
      /* margin-top: -(@iconSize / 1.75); */
      margin-top: -1.1em;
      /* padding-right: 0.9em; */
      /* 加号默认是加粗的，normal会变细一点 */
      font-weight: normal;
      /* font-size: @iconSize; */
      font-size: 2em;
      /* line-height: @iconSize; */
      line-height: 2em;
      /* background-size: @iconSize @iconSize; */
      background-size: 2em 2em;
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
 * 基于flex实现的表格，只有两层div。
 * 第一个示例在表格中显示tab或accordion。
 * Tab and accordion markup is inside the table in a logical position
 */
function TableTabAccordion(props) {
  // 隐藏表格部分内容，实现tab和accordion的功能
  useEffect(() => {
    (function ($) {
      $.fn.responsiveTable = function () {
        // 声明一个方法，用来显示或隐藏一组单元格，显示的单元格的列索引等于表头索引
        let toggleColumns = function ($table) {
          // console.log('==$table ', $table);
          // 先获取并存放所有tab表头的选中情况
          let selectedControls = [];
          $table.find('.Accordion, .Tab').each(function () {
            selectedControls.push($(this).attr('aria-selected'));
          });
          console.log('==selectedControls, ', selectedControls);
          // 所有单元格计数
          let cellCount = 0;
          // 列计数，第一列为0，根据表头列aria-selected是否为true来显示或隐藏
          let colCount = 0;
          // 每列的单元格数
          let setNum =
            $table.find('.Rtable-cell').length /
            Math.max(
              $table.find('.Tab').length,
              $table.find('.Accordion').length,
            );
          // console.log('==setNum, ', setNum);

          // 遍历所有单元格，然后只显示表头true所在列下的单元格
          $table.find('.Rtable-cell').each(function () {
            $(this).addClass('hiddenSmall');
            // 只有表头为true的列下的单元格才会显示出来
            if (selectedControls[colCount] === 'true') {
              $(this).removeClass('hiddenSmall');
            }
            cellCount++;
            // 处理完一列的单元格，列计数加1
            if (cellCount % setNum === 0) {
              colCount++;
            }
          });
        };

        // 默认显示表头aria-selected为true的列下的单元格，默认只显示第一列
        $(this).each(function () {
          toggleColumns($(this));
        });

        // 给每个tab添加click事件，设置当前选中表头为true，其他未选中表头为false
        $(this)
          .find('.Tab')
          .click(function () {
            $(this)
              .attr('aria-selected', 'true')
              .siblings()
              .attr('aria-selected', 'false');
            toggleColumns($(this).parents('.Rtable'));
          });

        // 给每个表头添加click事件，切换当前所选择列显示隐藏的开关
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
    })(jQuery);

    jQuery('.js-RtableTabs, .js-RtableAccordions').responsiveTable();
  }, []);

  return (
    <StyledDiv>
      <h2>Collapse to Tabs (breakpoint 640px)</h2>
      <div className='Rtable Rtable--3cols Rtable--collapse js-RtableTabs'>
        {/* 所有tab选项卡组成的一行 */}
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
        {/* 第一行数据，对应第一个tab */}
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
        {/* 一个折叠展开按钮和一行数据 */}
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

      <h4>ui实现说明：</h4>
      <ul>
        <li>
          Tab and accordion markup sits IN the table in a logical position
        </li>
        <li>Toggle either row or column depending on table content</li>
        <li>
          Use display:none to toggle for both visual users and screen readers
        </li>
      </ul>

      {/* ----普通按行排列的表格 */}
      <h2>Row oriented table</h2>
      <div className='Rtable Rtable--4cols Rtable--collapse'>
        <div className='Rtable-cell'>
          <h3>Eddard Stark</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Ice</div>
        <div className='Rtable-cell'>No direwolf</div>
        <div className='Rtable-cell'>
          <strong>Lord of Winterfell</strong>
        </div>

        <div className='Rtable-cell'>
          <h3>Jon Snow</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Longclaw</div>
        <div className='Rtable-cell'>Direwolf: Ghost</div>
        <div className='Rtable-cell'>
          <strong>Knows nothing</strong>
        </div>

        <div className='Rtable-cell'>
          <h3>Arya Stark</h3>
        </div>
        <div className='Rtable-cell'>Has a sword named Needle</div>
        <div className='Rtable-cell'>Direwolf: Nymeria</div>
        <div className='Rtable-cell'>
          <strong>No one</strong>
        </div>
      </div>

      {/* ------装饰单元格后的表格 */}
      <h2>Example table cell styling</h2>
      <div className='Rtable Rtable--3cols'>
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
    </StyledDiv>
  );
}

export default TableTabAccordion;
