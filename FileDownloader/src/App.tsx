import axios from 'axios'
import { Info } from 'phosphor-react'
import { useState } from 'react'
import { ModalContent } from './components/Modal/ModalContent'


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

  const handleOnClickConfirm = () => {
    console.log("teste")
  }

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => getData()}>
          Download File
        </button>
      </div>
      <div className="card">

        <ModalContent
          modal={{
            title: "Are you sure?",
            description:
              "Do you really want to delete these records? This process cannot be undone.",
            icon: <Info size={80} className="text-info" />,

          }}
          button={{
            title: "Alert Modal",
            icon: <Info size={18} className="text-light" />,
            backgroundColor: "btn-primary",
            textColor: "text-light",
          }}
          buttonConfirmModal={{
            title: "Confirm",
            onClick: () => handleOnClickConfirm,
            backgroundColor: "btn-info",
            textColor: "text-light",
          }}
        >
          teste
        </ModalContent>

        <button onClick={() => getData()}>
          Open Receipt
        </button>
      </div>
    </div>
  )
}

export default App
