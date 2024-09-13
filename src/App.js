import { useState } from "react";

function App() {
  const [loans, setLoans] = useState([
    {
      title: "application 1",
      id: `${Date.now()}-${Math.random()}`,
      documents: [
        {
          title: "document 1",
          id: `${Date.now()}-${Math.random()}`,
        },
      ],
    },
  ]);
  const [selectedLoanIndex, setSelectedLoanIndex] = useState(0);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedLoanIndex(index);
    setSelectedDocumentIndex(0);
  };

  const addLoans = () => {
    const nextIndex = loans.length + 1;
    const newLoan = {
      title: `application ${nextIndex}`,
      id: `${Date.now()}-${Math.random()}`,
      documents: [],
    };
    setLoans([...loans, newLoan]);
  };

  const addDocument = () => {
    const selectedLoan = loans[selectedLoanIndex];

    const newDocument = {
      title: `document ${selectedLoan.documents.length + 1}`,
      id: `${Date.now()}-${Math.random()}`,
    };

    const updatedLoan = {
      ...selectedLoan,
      documents: [...selectedLoan.documents, newDocument],
    };

    setLoans(
      loans.map((loan, index) =>
        index === selectedLoanIndex ? updatedLoan : loan
      )
    );
  };

  const handleClickDoc = (index) => {
    setSelectedDocumentIndex(index);
  };

  const removeLoanApp = (index) => {
    setLoans(loans.filter((_, i) => i !== index));
    if (index === selectedLoanIndex && index > 0) {
      setSelectedLoanIndex(index - 1);
      setSelectedDocumentIndex(0);
    }
  };

  const handleNext = () => {
    const selectedLoan = loans[selectedLoanIndex];
    if (selectedDocumentIndex < selectedLoan.documents.length - 1) {
      setSelectedDocumentIndex(selectedDocumentIndex + 1);
    } else if (selectedLoanIndex < loans.length - 1) {
      setSelectedLoanIndex(selectedLoanIndex + 1);
      setSelectedDocumentIndex(0);
    }
  };

  const handleBack = () => {
    if (selectedDocumentIndex > 0) {
      setSelectedDocumentIndex(selectedDocumentIndex - 1);
    } else if (selectedLoanIndex > 0) {
      const previousLoan = loans[selectedLoanIndex - 1];
      setSelectedLoanIndex(selectedLoanIndex - 1);
      setSelectedDocumentIndex(previousLoan.documents.length - 1);
    }
  };

  const removeDocument = (index) => {
    const updatedLoan = {
      ...loans[selectedLoanIndex],
      documents: loans[selectedLoanIndex].documents.filter(
        (_, docIndex) => docIndex !== index
      ),
    };

    setLoans(
      loans.map((loan, i) =>
        i === selectedLoanIndex ? updatedLoan : loan
      )
    );
  }

  const selectedLoan = loans[selectedLoanIndex];
  const selectedDocument =
    selectedLoan.documents[selectedDocumentIndex] || {};

  return (
    <div className="container mt-5">
      <div className="">
        {loans.map((loan, index) => (
          <button
            key={loan.id}
            className={`btn ${
              index === selectedLoanIndex ? "btn-primary" : "btn-outline-dark"
            } ms-2`}
            onClick={() => handleClick(index)}
          >
            {loan.title}
            <i
              className="bi bi-x-circle text-end ms-1"
              onClick={() => removeLoanApp(index)}
            ></i>
          </button>
        ))}

        <button
          type="button"
          className="btn btn-success ms-1"
          onClick={addLoans}
        >
          Add
        </button>
      </div>
      <div className="row">
        <div className="col-2 mt-4">
          {selectedLoan && (
            <div>
              {selectedLoan.documents.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => handleClickDoc(index)}
                  type="button"
                  className={`btn ${
                    index === selectedDocumentIndex
                      ? "btn-warning"
                      : "btn-outline-dark"
                  } mt-2`}
                >
                  {doc.title}
                  <i className="bi bi-x-circle text-end ms-1" onClick={() => removeDocument(index)}></i>
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn btn-success ms-1 mt-3"
            onClick={addDocument}
          >
            Add
          </button>
        </div>
        <div className="col-10 mt-4">
          {selectedLoan.documents.length > 0 && (
            <>
              <div
                className="border rounded p-3 d-flex flex-column justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <p>
                  Upload file for {selectedLoan.title + " - " + selectedDocument.title}
                </p>
                <input type="file" className="mb-3 text-center" />
                <div>
                </div>
              </div>
            </>
          )}
          <div className="w-100 d-flex justify-content-between">
            <button
              className="btn btn-dark me-2"
              onClick={handleBack}
              hidden={
                selectedLoanIndex === 0 && selectedDocumentIndex === 0
              }
            >
              Back
            </button>
          { selectedLoan.documents.length > 0 &&
            <button
              className="btn btn-success text-end"
              onClick={handleNext}
              hidden={
                selectedLoanIndex === loans.length - 1 &&
                selectedDocumentIndex ===
                  selectedLoan.documents.length - 1
              }
             >
              Next
            </button>
          }
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
