import React from 'react';
import classNames from 'classnames';
import { Pagination } from '@components';
import _ from 'lodash';

const THEAD_KEYS = [
  'subject_name', 'tag', 'description', 'version', 'active_yn', 'version_count'
];
const TD_KEYS = [
  'tag', 'description', 'version', 'active_yn'
];

const PromptTable = (props) => {
  const { data, searchParams, onDetail, onPage } = props;

  const onClickRow = (item) => {
    onDetail(item);
  };

  const generatorTD = (list, item, rowIndex, prompts) => {
    // list - THEAD_KEYS
    // item - 데이터의 object
    // rowIndex - 데이터의 index
    // prompts - data(array)
    
    const alcKeys = _.without(THEAD_KEYS, 'tag', 'description');
    return _.map(list, (key, j) => {
      // rowSpan할 key만 sumByObj에 담음 (subject_name, version_count)
      let sumByObj = {};
      if (key === 'subject_name') {
        sumByObj = {
          subject_name: item.subject_name
        }
      }

      if (key === 'version_count') {
        sumByObj = {
          subject_name: item.subject_name,
          tag: item.tag,
          version_count: item.version_count
        }
      }
      
      // rowSpan의 총 사이즈를 구함
      const size = _.sumBy(prompts, sumByObj)
      let rowSpan = {};
      // rowSpan의 첫번째 인덱스값을 구함
      const idx = _.findIndex(prompts, sumByObj);

      let display = '';
      if (_.includes(['subject_name', 'version_count'], key)) {
        if (typeof size === 'number') {
          rowSpan = { rowSpan: size === 0 ? 1 : size }
        }
        display = rowIndex === idx ? '' : 'none';
      }

      return (
        <td
          key={j}
          className={classNames('nohover', { al_c: _.includes(alcKeys, key), mousep: _.includes(TD_KEYS, key) })}
          {...rowSpan}
          style={{ display }}
          onClick={() => {
            if (_.includes(TD_KEYS, key)) {
              onClickRow(item);
            }
          }}
        >
          {item[key]}
        </td>
      )
    })
  };

  return (
    <>
      <div className="board_cont">
        <span>(전체 {data?.cond_tot_cnt}건)</span>
      </div>
      <table className="table_list">
        <caption className="hide-caption">과제 List</caption>
        <colgroup>
          <col width="15%" /><col width="15%" /><col width="*" /><col width="10%" /><col width="10%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col"><span>과제명</span></th>
            <th scope="col"><span>태그</span></th>
            <th scope="col"><span>설명</span></th>
            <th scope="col"><span>버전</span></th>
            <th scope="col"><span>사용중</span></th>
            <th scope="col"><span>총 버전 수</span></th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(data?.prompts, (item, i) => (
              <tr key={i}>
                {generatorTD(THEAD_KEYS, item, i, data?.prompts)}
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination
        total={data?.cond_tot_cnt}
        page={searchParams.cur}
        onPage={onPage}
        showCnt={10}
      />
    </>
  );
};

export default PromptTable;
