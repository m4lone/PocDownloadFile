import axios from 'axios'
import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'

interface data {

  id: string
  description: string
  date: Date
  status: string
  number: number
  employeeId: string
  deviceId: string
  customerId: string
  departmentId: string
  createdAt: Date
  updatedAt: Date
  deleteddAt: Date
  excluded: boolean

}

function App() {
  const [count, setCount] = useState(0)

  function formatData(data: data) {
    return `
id: ${data.id}
description: ${data.description}
date: ${data.date}
status: ${data.status}
number: ${data.number}
employeeId: ${data.employeeId}
deviceId: ${data.deviceId}
customerId: ${data.customerId}
departmentId: ${data.departmentId}
createdAt: ${data.createdAt}
updatedAt: ${data.updatedAt}
deleteddAt: ${data.deleteddAt}
    `
  }
  function getData() {
    axios.get<data>(`http://localhost:5000/api/Order/49365e02-3d8f-415b-b36d-f53811a7a462`)
      // .then((response) => new Blob([response as unknown as BlobPart]))
      .then(res => {
        console.log(res.data)
        const obj = []
        obj.push(res.data)

        const element = document.createElement("a");
        const file = new Blob([formatData(res.data)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

      })
  }
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getData()}>
          Download File
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
