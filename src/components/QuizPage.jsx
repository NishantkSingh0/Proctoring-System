import React, { useState, useEffect } from 'react';

const QuizPage = () => {
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
    
    const [timeLeft, setTimeLeft] = useState(300); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Automatically submit when timer runs out
                    return 0; // Prevent going negative
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Clear interval on component unmount
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault(); // Prevent default only if called from submit
        console.log('Answers submitted:', answers);
        // Here you can add more logic to handle submission (e.g., API call)
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
                    <div className="text-center mb-4 text-lg">
                        Time Left: {formatTimeLeft(timeLeft)}
                    </div>
                    <br />

                    <div className="space-y-6">
                        <div>
                            <p className="font-medium">1. What is the time complexity of linear search?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q1" value="O(log n)" onChange={handleChange} required className="mr-2" />
                                    O(log n)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q1" value="O(n)" onChange={handleChange} className="mr-2" />
                                    O(n)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q1" value="O(1)" onChange={handleChange} className="mr-2" />
                                    O(1)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q1" value="O(n^2)" onChange={handleChange} className="mr-2" />
                                    O( n<sup>2</sup> )
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">2. Which data structure is used in BFS?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q2" value="Queue" onChange={handleChange} required className="mr-2" />
                                    Queue
                                </label>
                                <label className="block">
                                    <input type="radio" name="q2" value="Stack" onChange={handleChange} className="mr-2" />
                                    Stack
                                </label>
                                <label className="block">
                                    <input type="radio" name="q2" value="Linkedlist" onChange={handleChange} className="mr-2" />
                                    Linkedlist
                                </label>
                                <label className="block">
                                    <input type="radio" name="q2" value="Array" onChange={handleChange} className="mr-2" />
                                    Array
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">3. What is the worst-case time complexity of merge sort?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q3" value="O(n)" onChange={handleChange} required className="mr-2" />
                                    O(n)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q3" value="O(2^n)" onChange={handleChange} className="mr-2" />
                                    O(2<sup>n</sup>)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q3" value="O(n log n)" onChange={handleChange} className="mr-2" />
                                    O(n log n)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q3" value="O(n^2)" onChange={handleChange} className="mr-2" />
                                    O(n<sup>2</sup>)
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">4. Which of the following data structures uses LIFO (Last In, First Out) principle?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q4" value="Queue" onChange={handleChange} required className="mr-2" />
                                    Queue
                                </label>
                                <label className="block">
                                    <input type="radio" name="q4" value="Stack" onChange={handleChange} className="mr-2" />
                                    Stack
                                </label>
                                <label className="block">
                                    <input type="radio" name="q4" value="Array" onChange={handleChange} className="mr-2" />
                                    Array
                                </label>
                                <label className="block">
                                    <input type="radio" name="q4" value="Linkedlist" onChange={handleChange} className="mr-2" />
                                    Linkedlist
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">5. Which sorting algorithm has the best average-case time complexity?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q5" value="Bubble Sort" onChange={handleChange} required className="mr-2" />
                                    Bubble Sort
                                </label>
                                <label className="block">
                                    <input type="radio" name="q5" value="Selection Sort" onChange={handleChange} className="mr-2" />
                                    Selection Sort
                                </label>
                                <label className="block">
                                    <input type="radio" name="q5" value="Quick Sort" onChange={handleChange} className="mr-2" />
                                    Quick Sort
                                </label>
                                <label className="block">
                                    <input type="radio" name="q5" value="Insertion Sort" onChange={handleChange} className="mr-2" />
                                    Insertion Sort
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">6. Which of the following algorithms is used to find the shortest path in a weighted graph?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q6" value="Dijkstra's Algorithm" onChange={handleChange} required className="mr-2" />
                                    Dijkstra's Algorithm
                                </label>
                                <label className="block">
                                    <input type="radio" name="q6" value="Prim's Algorithm" onChange={handleChange} className="mr-2" />
                                    Prim's Algorithm
                                </label>
                                <label className="block">
                                    <input type="radio" name="q6" value="Kruskal's Algorithm" onChange={handleChange} className="mr-2" />
                                    Kruskal's Algorithm
                                </label>
                                <label className="block">
                                    <input type="radio" name="q6" value="Bellman-Ford Algorithm" onChange={handleChange} className="mr-2" />
                                    Bellman-Ford Algorithm
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">7. Which data structure is used for implementing depth-first search?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q7" value="Stack" onChange={handleChange} className="mr-2" />
                                    Stack
                                </label>
                                <label className="block">
                                    <input type="radio" name="q7" value="Queue" onChange={handleChange} required className="mr-2" />
                                    Queue
                                </label>
                                <label className="block">
                                    <input type="radio" name="q7" value="Linkedlist" onChange={handleChange} className="mr-2" />
                                    Linkedlist
                                </label>
                                <label className="block">
                                    <input type="radio" name="q7" value="Array" onChange={handleChange} className="mr-2" />
                                    Array
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">8. Which of the following is a self-balancing binary search tree?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q8" value="Binary Tree" onChange={handleChange} required className="mr-2" />
                                    Binary Tree
                                </label>
                                <label className="block">
                                    <input type="radio" name="q8" value="AVL Tree" onChange={handleChange} className="mr-2" />
                                    AVL Tree
                                </label>
                                <label className="block">
                                    <input type="radio" name="q8" value="B-Tree" onChange={handleChange} className="mr-2" />
                                    B-Tree
                                </label>
                                <label className="block">
                                    <input type="radio" name="q8" value="Red-Black Tree" onChange={handleChange} className="mr-2" />
                                    Red-Black Tree
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">9. In a binary tree, how many nodes can a node with k levels below it have?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q9" value="K" onChange={handleChange} required className="mr-2" />
                                    K
                                </label>
                                <label className="block">
                                    <input type="radio" name="q9" value="(2^k)" onChange={handleChange} className="mr-2" />
                                    (2<sup>k</sup>)
                                </label>
                                <label className="block">
                                    <input type="radio" name="q9" value="2^(k-1)" onChange={handleChange} className="mr-2" />
                                    2<sup>(k-1)</sup>
                                </label>
                                <label className="block">
                                    <input type="radio" name="q9" value="K^2" onChange={handleChange} className="mr-2" />
                                    K<sup>2</sup>
                                </label>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">10. Which data structure is used for implementing Dijkstra's algorithm?</p>
                            <div className="mt-2 space-y-2">
                                <label className="block">
                                    <input type="radio" name="q10" value="Min Heap" onChange={handleChange} required className="mr-2" />
                                    Min Heap
                                </label>
                                <label className="block">
                                    <input type="radio" name="q10" value="Max Heap" onChange={handleChange} className="mr-2" />
                                    Max Heap
                                </label>
                                <label className="block">
                                    <input type="radio" name="q10" value="Binary Search Tree" onChange={handleChange} className="mr-2" />
                                    Binary Search Tree
                                </label>
                                <label className="block">
                                    <input type="radio" name="q10" value="Depth First Search" onChange={handleChange} className="mr-2" />
                                    Depth First Search
                                </label>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                disabled={!allAnswered}
                                className={`py-2 px-6 rounded-lg text-white font-semibold ${allAnswered ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>                </form>
            </div>
        </div>
    );
};

export default QuizPage;
