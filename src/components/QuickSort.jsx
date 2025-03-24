import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./QuickSort.css";

const QuickSort = () => {
  const [numbers, setNumbers] = useState([]);
  const [steps, setSteps] = useState([]);
  const [highlight, setHighlight] = useState({ pivot: -1, i: -1, j: -1 });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setHighlight({ pivot: -1, i: -1, j: -1 });
  }, [numbers]);

  const quicksort = async (arr, first = 0, last = arr.length - 1, trace = []) => {
    if (first < last) {
      let pivotIndex = await partition(arr, first, last, trace);
      await quicksort(arr, first, pivotIndex - 1, trace);
      await quicksort(arr, pivotIndex + 1, last, trace);
    }
    return arr;
  };

  const partition = async (arr, first, last, trace) => {
    let pivot = arr[first];
    let i = first;
    let j = last;

    trace.push({
      message: `Choosing pivot (${pivot}) at index ${first}`,
      array: [...arr],
      highlight: { pivot: first, i: i, j: j }
    });

    while (i < j) {
      while (arr[i] <= pivot && i < last) {
        i++;
        trace.push({
          message: `Moving i → ${i}, arr[i] = ${arr[i]} still ≤ pivot (${pivot})`,
          array: [...arr],
          highlight: { pivot: first, i: i, j: j }
        });
        await delay();
      }

      while (arr[j] > pivot) {
        j--;
        trace.push({
          message: `Moving j ← ${j}, arr[j] = ${arr[j]} still > pivot (${pivot})`,
          array: [...arr],
          highlight: { pivot: first, i: i, j: j }
        });
        await delay();
      }

      if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        trace.push({
          message: `Swapped arr[i]: ${arr[i]} and arr[j]: ${arr[j]}`,
          array: [...arr],
          highlight: { pivot: first, i: i, j: j }
        });
        await delay();
      }
    }

    [arr[first], arr[j]] = [arr[j], arr[first]];
    trace.push({
      message: `Swapped pivot (${pivot}) with arr[j]: ${arr[j]} (New pivot index: ${j})`,
      array: [...arr],
      highlight: { pivot: j, i: -1, j: -1 }
    });
    await delay();

    return j;
  };

  const delay = () => new Promise(resolve => setTimeout(resolve, 10));

  const handleSort = async () => {
    setSteps([]);
    const arrCopy = [...numbers];
    const trace = [];
    await quicksort(arrCopy, 0, arrCopy.length - 1, trace);
    setNumbers(arrCopy);
    setSteps(trace);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetArray = () => {
    const arr = inputValue.split(",").map((num) => parseInt(num.trim(), 10));
    if (arr.every((num) => !isNaN(num))) {
      setNumbers(arr);
      setSteps([]);
      setHighlight({ pivot: -1, i: -1, j: -1 });
    } else {
      alert("Please enter valid numbers separated by commas.");
    }
  };

  return (
    <div className="quicksort-container">
      <h2>QuickSort Visualization (Pivot: First Element)</h2>

      <div className="color-legend">
        <span><span className="color-box pivot"></span> Pivot</span>
        <span><span className="color-box highlight-i"></span> i Pointer</span>
        <span><span className="color-box highlight-j"></span> j Pointer</span>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter numbers (e.g., 5,10,3,8)"
        />
        <button onClick={handleSetArray}>Set Array</button>
      </div>

      <div className="array-container">
        {numbers.map((num, index) => (
          <motion.div
            key={index}
            className={`array-bar ${highlight.pivot === index ? "pivot" : highlight.i === index ? "highlight-i" : highlight.j === index ? "highlight-j" : ""}`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.3, repeat: 1 }}
          >
            {num} <br />
            {index === highlight.pivot ? "Pivot" : index === highlight.i ? "i" : index === highlight.j ? "j" : `Index ${index}`}
          </motion.div>
        ))}
      </div>

      <button onClick={handleSort} className="sort-button">Sort</button>

      <div className="tracing-container">
        <h3>Tracing Steps:</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>
              <strong>{step.message}</strong>
              <div className="trace-array">
                {step.array.map((num, idx) => (
                  <motion.span
                    key={idx}
                    className={`trace-bar ${step.highlight.pivot === idx ? "pivot" : step.highlight.i === idx ? "highlight-i" : step.highlight.j === idx ? "highlight-j" : ""}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {num}
                  </motion.span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickSort;
