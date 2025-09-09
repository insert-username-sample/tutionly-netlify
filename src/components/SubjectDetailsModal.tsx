import { FC } from 'react';

interface SubjectDetailsModalProps {
  subject: {
    name: string;
    chapters: { name: string; mastery: number }[];
  };
  onClose: () => void;
}

const SubjectDetailsModal: FC<SubjectDetailsModalProps> = ({ subject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{subject.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            &times;
          </button>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-300">Chapters</h3>
          <ul className="space-y-2">
            {subject.chapters.map((chapter, index) => (
              <li key={index} className="flex justify-between items-center text-gray-300">
                <span>{chapter.name}</span>
                <span className="font-semibold">{chapter.mastery}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailsModal;
