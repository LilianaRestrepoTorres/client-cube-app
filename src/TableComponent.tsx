import React from "react";
import Table from "react-bootstrap/Table";

function TableComponent({ files }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) =>
          file.lines.map((line, index) => (
            <tr key={`${file.filename}-${index}`}>
              <td>{line.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default TableComponent;
