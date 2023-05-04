import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/files/data");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setFiles(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand>React Test App</Navbar.Brand>
      </Navbar>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-files">
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
        </div>
      )}
    </>
  );
}

export default App;
