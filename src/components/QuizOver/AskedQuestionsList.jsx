import React from 'react';

const AskedQuestionsList = ({
  askedQuestions,
  showModal,
  dataLabel
}) => {
  return (
    <React.Fragment>
      {
        askedQuestions.map(
          current => (
            <tr key={current.id}>
              <td>{current.question}</td>
              <td>{current.answer}</td>
              <td>
                <button className="btnInfo" onClick={showModal(current.heroId)}>
                  {dataLabel}
                </button>
              </td>
            </tr>
          )
        )
      }
    </React.Fragment>
  );
}

export default React.memo(AskedQuestionsList);
