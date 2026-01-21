const ExamFilter = ({ exams, selectedExam, onExamChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {exams.map((exam) => (
        <button
          key={exam}
          onClick={() => onExamChange(exam)}
          className={`px-4 py-2 rounded-md font-medium text-xs tracking-wide uppercase border ${
            selectedExam === exam
              ? 'bg-primary-600 text-white border-primary-500 shadow-sm shadow-primary-900/40'
              : 'bg-slate-800/70 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:border-slate-500'
          }`}
        >
          {exam}
        </button>
      ))}
    </div>
  );
};

export default ExamFilter;
