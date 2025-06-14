import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: ''
    });
    
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [submitted, setSubmitted] = useState(false);

    // Use useCallback to prevent handleSubmit recreation on every render
    const handleSubmit = useCallback((e) => {
        if (e) e.preventDefault(); // Prevent default only if called from submit button
        
        if (submitted) return; // Prevent multiple submissions
        
        setSubmitted(true);
        console.log('Answers submitted:', answers);
        
        // Here you would typically send data to your backend
        alert("Quiz submitted successfully!");
        // Optional: navigate to results page
        // navigate('/results');
    }, [answers, submitted]);

    useEffect(() => {
        // Exit early if already submitted
        if (submitted) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [handleSubmit, submitted]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    };

    const allAnswered = Object.values(answers).every(answer => answer !== '');

    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Multiple Choice Test</h2>
                    <div className="text-center mb-4 text-lg font-semibold">
                        Time Left: <span className="text-blue-600">{formatTimeLeft(timeLeft)}</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="font-medium">1. What is the time complexity of linear search?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q1" 
                                        value="O(log n)" 
                                        checked={answers.q1 === "O(log n)"}
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(log n)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q1" 
                                        value="O(n)" 
                                        checked={answers.q1 === "O(n)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(n)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q1" 
                                        value="O(1)" 
                                        checked={answers.q1 === "O(1)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(1)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q1" 
                                        value="O(n^2)" 
                                        checked={answers.q1 === "O(n^2)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(n<sup>2</sup>)
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">2. Which data structure is used in BFS?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q2" 
                                        value="Queue" 
                                        checked={answers.q2 === "Queue"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Queue
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q2" 
                                        value="Stack" 
                                        checked={answers.q2 === "Stack"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Stack
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q2" 
                                        value="Linkedlist" 
                                        checked={answers.q2 === "Linkedlist"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Linkedlist
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q2" 
                                        value="Array" 
                                        checked={answers.q2 === "Array"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Array
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">3. What is the worst-case time complexity of merge sort?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q3" 
                                        value="O(n)" 
                                        checked={answers.q3 === "O(n)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(n)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q3" 
                                        value="O(2^n)" 
                                        checked={answers.q3 === "O(2^n)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(2<sup>n</sup>)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q3" 
                                        value="O(n log n)" 
                                        checked={answers.q3 === "O(n log n)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(n log n)
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q3" 
                                        value="O(n^2)" 
                                        checked={answers.q3 === "O(n^2)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    O(n<sup>2</sup>)
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">4. Which of the following data structures uses LIFO (Last In, First Out) principle?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q4" 
                                        value="Queue" 
                                        checked={answers.q4 === "Queue"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Queue
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q4" 
                                        value="Stack" 
                                        checked={answers.q4 === "Stack"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Stack
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q4" 
                                        value="Array" 
                                        checked={answers.q4 === "Array"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Array
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q4" 
                                        value="Linkedlist" 
                                        checked={answers.q4 === "Linkedlist"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Linkedlist
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">5. Which sorting algorithm has the best average-case time complexity?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q5" 
                                        value="Bubble Sort" 
                                        checked={answers.q5 === "Bubble Sort"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Bubble Sort
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q5" 
                                        value="Selection Sort" 
                                        checked={answers.q5 === "Selection Sort"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Selection Sort
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q5" 
                                        value="Quick Sort" 
                                        checked={answers.q5 === "Quick Sort"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Quick Sort
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q5" 
                                        value="Insertion Sort" 
                                        checked={answers.q5 === "Insertion Sort"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Insertion Sort
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">6. Which of the following algorithms is used to find the shortest path in a weighted graph?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q6" 
                                        value="Dijkstra's Algorithm" 
                                        checked={answers.q6 === "Dijkstra's Algorithm"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Dijkstra's Algorithm
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q6" 
                                        value="Prim's Algorithm" 
                                        checked={answers.q6 === "Prim's Algorithm"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Prim's Algorithm
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q6" 
                                        value="Kruskal's Algorithm" 
                                        checked={answers.q6 === "Kruskal's Algorithm"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Kruskal's Algorithm
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q6" 
                                        value="Bellman-Ford Algorithm" 
                                        checked={answers.q6 === "Bellman-Ford Algorithm"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Bellman-Ford Algorithm
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">7. Which data structure is used for implementing depth-first search?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q7" 
                                        value="Stack" 
                                        checked={answers.q7 === "Stack"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Stack
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q7" 
                                        value="Queue" 
                                        checked={answers.q7 === "Queue"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Queue
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q7" 
                                        value="Linkedlist" 
                                        checked={answers.q7 === "Linkedlist"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Linkedlist
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q7" 
                                        value="Array" 
                                        checked={answers.q7 === "Array"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Array
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">8. Which of the following is a self-balancing binary search tree?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q8" 
                                        value="Binary Tree" 
                                        checked={answers.q8 === "Binary Tree"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Binary Tree
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q8" 
                                        value="AVL Tree" 
                                        checked={answers.q8 === "AVL Tree"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    AVL Tree
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q8" 
                                        value="B-Tree" 
                                        checked={answers.q8 === "B-Tree"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    B-Tree
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q8" 
                                        value="Red-Black Tree" 
                                        checked={answers.q8 === "Red-Black Tree"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Red-Black Tree
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">9. In a binary tree, how many nodes can a node with k levels below it have?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q9" 
                                        value="K" 
                                        checked={answers.q9 === "K"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    K
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q9" 
                                        value="(2^k)" 
                                        checked={answers.q9 === "(2^k)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    2<sup>k</sup>
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q9" 
                                        value="2^(k-1)" 
                                        checked={answers.q9 === "2^(k-1)"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    2<sup>(k-1)</sup>
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q9" 
                                        value="K^2" 
                                        checked={answers.q9 === "K^2"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    K<sup>2</sup>
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">10. Which data structure is used for implementing Dijkstra's algorithm?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q10" 
                                        value="Min Heap" 
                                        checked={answers.q10 === "Min Heap"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Min Heap
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q10" 
                                        value="Max Heap" 
                                        checked={answers.q10 === "Max Heap"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Max Heap
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q10" 
                                        value="Binary Search Tree" 
                                        checked={answers.q10 === "Binary Search Tree"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Binary Search Tree
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio" 
                                        name="q10" 
                                        value="Depth First Search" 
                                        checked={answers.q10 === "Depth First Search"} 
                                        onChange={handleChange} 
                                        className="mr-2" 
                                    />
                                    Depth First Search
                                </label>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                disabled={!allAnswered || submitted}
                                className={`
                                    py-2 px-6 rounded-lg text-white font-semibold 
                                    ${submitted ? 'bg-green-500 cursor-not-allowed' : 
                                      allAnswered ? 'bg-blue-600 hover:bg-blue-700' : 
                                      'bg-gray-400 cursor-not-allowed'}
                                `}
                            >
                                {submitted ? 'Submitted' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizPage;