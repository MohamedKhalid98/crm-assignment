import React from "react";
import _ from "lodash";
const Table = props => {
  function getCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }
  function createKey(item, column) {
    return item._id + (column.path || column.key);
  }
  const { columns, data } = props;

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.path || column.key}>{column.label || null}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={createKey(item, column)}>{getCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
