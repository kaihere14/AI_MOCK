import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flag, ChevronRight, MoreVertical } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const PracticeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { loadTestSession, testSessions, fetchUserData } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        let { hours, minutes, seconds } = prev;

        seconds++;

        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }

        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      if (isLoadingTest) return;

      await fetchUserData();

      if (!testSessions || !testSessions._id || testSessions._id !== testId) {
        setIsLoadingTest(true);
        await loadTestSession(testId);
        setIsLoadingTest(false);
      }
    };
    fetchTestData();
  }, [testId]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleQuestionNavigate = (index) => {
    if (index <= currentQuestionIndex) {
      setCurrentQuestionIndex(index);
    }
  };

  const saveAnswerToBackend = async (questionIndex, answer) => {
    try {
      if (
        !testSessions ||
        !testSessions.questions ||
        !testSessions.questions[questionIndex]
      ) {
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      const questionSubdocId = testSessions.questions[questionIndex]._id;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/update-answer`,
        {
          testSessionId: testId,
          questionId: questionSubdocId,
          userAnswer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {}
  };

  const handleNext = async () => {
    setIsLoadingNext(true);
    const currentAnswer = selectedAnswers[currentQuestionIndex];

    if (currentAnswer) {
      await saveAnswerToBackend(currentQuestionIndex, currentAnswer);
    }

    if (
      testSessions &&
      currentQuestionIndex < testSessions.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setIsLoadingNext(false);
  };

  const handleFlagForReview = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const finalizeTest = async () => {
    try {
      const currentAnswer = selectedAnswers[currentQuestionIndex];

      if (currentAnswer) {
        await saveAnswerToBackend(currentQuestionIndex, currentAnswer);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/finalize-test/${testId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/report/" + response.data.testResultId);
    } catch (error) {
      throw error;
    }
  };

  const handleEndTest = async () => {
    if (globalThis.confirm("Are you sure you want to end the test?")) {
      await finalizeTest();
    }
  };

  const getQuestionStatus = (index) => {
    if (index === currentQuestionIndex) return "current";
    if (selectedAnswers[index] !== undefined) return "answered";
    return "not-answered";
  };

  if (
    !testSessions ||
    !testSessions.questions ||
    testSessions.questions.length === 0
  ) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading test...</p>
        </div>
      </div>
    );
  }

  const currentQuestionData =
    testSessions.questions[currentQuestionIndex]?.questionId;
  const totalQuestions = testSessions.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="w-full min-h-screen bg-black text-white pb-20 lg:pb-0">
      {/* Header - Desktop */}
      <div className="hidden lg:flex border-b border-gray-800 px-4 sm:px-6 md:px-10 py-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5h2v4h4v2h-4v4H9v-4H5V9h4z" />
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-semibold">
            {testSessions.testName || "Practice Test"} -{" "}
            {currentQuestionData?.type || "Aptitude"} Round
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEndTest}
            className="px-4 sm:px-6 py-2 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            End Test
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Mobile Header with Submit and End buttons */}
      <div className="lg:hidden border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-cyan-500 rounded flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5h2v4h4v2h-4v4H9v-4H5V9h4z" />
              </svg>
            </div>
            <h1 className="text-sm font-semibold">
              {testSessions.testName || "Practice Test"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={finalizeTest}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 text-sm"
            >
              Submit
            </button>
            <button
              onClick={handleEndTest}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-semibold transition-all duration-300 text-sm"
            >
              End
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 md:p-10 pt-6 sm:pt-8 md:pt-10">
        {/* Questions Grid - Hidden on mobile */}
        <div className="hidden lg:block lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {testSessions.questions.map((_, i) => {
              const status = getQuestionStatus(i);
              const isDisabled = i > currentQuestionIndex;
              return (
                <button
                  key={i}
                  onClick={() => handleQuestionNavigate(i)}
                  disabled={isDisabled}
                  className={`w-full aspect-square rounded-lg font-medium transition-all duration-300 ${
                    status === "current"
                      ? "bg-cyan-500 text-white border-2 border-cyan-400"
                      : status === "answered"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-cyan-400"></div>
              <span className="text-sm text-gray-400">Current</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50"></div>
              <span className="text-sm text-gray-400">Answered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gray-800 border border-gray-700"></div>
              <span className="text-sm text-gray-400">Not Answered</span>
            </div>
          </div>
        </div>

        {/* Question and Answer Section */}
        <div className="lg:col-span-6 bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8">
          {/* Question Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-2 sm:px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-xs font-semibold">
                {currentQuestionData?.topic}
              </span>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                  currentQuestionData?.difficulty === "Easy"
                    ? "bg-green-500/20 text-green-400"
                    : currentQuestionData?.difficulty === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {currentQuestionData?.difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8">
            {currentQuestionData?.question}
          </p>

          {/* Answer Options */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {currentQuestionData?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? "bg-cyan-500/20 border-cyan-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedAnswers[currentQuestionIndex] === option && (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm sm:text-base">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Next Button */}
          <div className="hidden lg:flex items-center justify-between pt-6 border-t border-gray-800">
            {currentQuestionIndex === totalQuestions - 1 ? (
              <div className="flex items-center gap-2 text-sm text-cyan-400">
                <svg
                  className="w-4 h-4 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Last question! Click Submit button on the right to finish.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Answer will be saved on next.</span>
              </div>
            )}
            <button
              onClick={handleNext}
              disabled={
                currentQuestionIndex === totalQuestions - 1 ||
                !selectedAnswers[currentQuestionIndex] ||
                isLoadingNext
              }
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold"
            >
              {isLoadingNext ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timer and Actions - Desktop Only */}
        <div className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Time Elapsed</h2>
            <div className="flex gap-2 justify-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-2">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-2">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-2">Seconds</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-semibold">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answeredCount / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleFlagForReview}
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-700"
          >
            <Flag
              className={`w-5 h-5 ${
                flaggedQuestions.has(currentQuestionIndex)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-400"
              }`}
            />
            <span className="font-semibold">Flag for Review</span>
          </button>

          <button
            onClick={finalizeTest}
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
        {/* Last Question Indicator */}
        {currentQuestionIndex === totalQuestions - 1 && (
          <div className="mb-3 p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center gap-2">
            <svg
              className="w-4 h-4 text-cyan-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-cyan-400 font-medium">
              Last question! Click Submit button at the top to finish.
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {/* Next Button - Bottom Left */}
          <button
            onClick={handleNext}
            disabled={
              currentQuestionIndex === totalQuestions - 1 ||
              !selectedAnswers[currentQuestionIndex] ||
              isLoadingNext
            }
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 font-semibold text-sm flex-1"
          >
            {isLoadingNext ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Timer Display - Compact */}
          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 rounded-lg flex-1">
            <svg
              className="w-4 h-4 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-mono text-gray-300">
              {String(timeRemaining.hours).padStart(2, "0")}:
              {String(timeRemaining.minutes).padStart(2, "0")}:
              {String(timeRemaining.seconds).padStart(2, "0")}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 rounded-lg flex-1">
            <span className="text-xs font-semibold text-gray-300">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
