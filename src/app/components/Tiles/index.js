import React, { Component } from 'react';

import _ from 'lodash';

import styles from './style.scss';

export default function Tiles(props) {
  const getTotalExpense = (item) => {
    const expense = _.find(props.expenses, {_id: item.toLowerCase()});
    return expense ? expense.total: 0;
  };

  return (
    <div>
      {
        _.map(props.months, (item, index) => {
          return (
            <div
              key={item}
              className={styles.tile}
              onClick={props.handleTileClick.bind(this, item)}
            >
              <div>
                {item}
                <br/>
                <span>
                  {
                    '$' + getTotalExpense(item)
                  }
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
