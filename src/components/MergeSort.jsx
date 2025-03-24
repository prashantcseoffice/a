import React, { useState } from "react";
import "./MergeSort.css";

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);

  const handleSort = () => {
    const arr = array.map(Number);
    const recordedSteps = [];
    mergeSort([...arr], 0, arr.length - 1, recordedSteps);
    setSteps(recordedSteps);
  };

  const mergeSort = (arr, left, right, recordedSteps) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);

    // Record division step
    recordedSteps.push({
      array: [...arr],
      type: "divide",
      left,
      mid,
      right,
    });

    mergeSort(arr, left, mid, recordedSteps);
    mergeSort(arr, mid + 1, right, recordedSteps);
    merge(arr, left, mid, right, recordedSteps);
  };

  const merge = (arr, left, mid, right, recordedSteps) => {
    let temp = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
      if (arr[i] < arr[j]) temp.push(arr[i++]);
      else temp.push(arr[j++]);
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
      arr[k] = temp[k - left];
    }

    recordedSteps.push({
      array: [...arr],
      type: "merge",
      left,
      mid,
      right,
    });
  };

  return (
    <div className="merge-sort-container">
      <h2>Merge Sort Step-by-Step Visualization</h2>
      <input
        type="text"
        onChange={(e) => setArray(e.target.value.split(","))}
        placeholder="Enter numbers (e.g., 6,5,12,10,9,1)"
      />
      <button onClick={handleSort}>Sort</button>

      <div className="merge-sort-steps">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="step-container">
            <p className="step-title">
              Step {stepIndex + 1}: {step.type.toUpperCase()} (Left: {step.left}, Mid: {step.mid}, Right: {step.right})
            </p>
            <div className="array-display">
              {step.array.map((num, index) => (
                <div
                  key={index}
                  className={`merge-box ${
                    index >= step.left && index <= step.right
                      ? step.type === "divide"
                        ? "divide-step"
                        : "merge-step"
                      : ""
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MergeSort;
