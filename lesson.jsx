  
  import React, { useState } from 'react';
  import { Triangle, ArrowRight, ArrowLeft, Play, FileText, HelpCircle } from 'lucide-react';

  // Mock lesson data
  const lessonData = {
    triangles: {
      id: 'triangles',
      title: 'त्रिभुज',
      description: 'त्रिभुज का क्षेत्रफल और कोण सीखें।',
      content: {
        video: 'https://example.com/triangle-video',
        notes: 'त्रिभुज एक तीन भुजाओं वाला समतल आकृति है। एक त्रिभुज के तीन कोण होते हैं जिनका योग 180 डिग्री होता है।',
        quiz: [
          { 
            question: 'एक समबाहु त्रिभुज के सभी कोणों का माप क्या होता है?', 
            options: ['30 डिग्री', '45 डिग्री', '60 डिग्री', '90 डिग्री'],
            answer: 2
          }
        ]
      },
      isPremium: false,
      icon: Triangle
    }
  };

  export default function LessonCards() {
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
    const [currentLesson, setCurrentLesson] = useState(null);
    const [activeTab, setActiveTab] = useState('video'); // 'video', 'notes', 'quiz'
    
    // Function to handle clicking the explore button
    const handleExplore = (lessonId) => {
      if (lessonData[lessonId]) {
        setCurrentLesson(lessonData[lessonId]);
        setCurrentView('detail');
        setActiveTab('video');
      }
    };
    
    // Function to go back to the lesson list
    const handleBackToList = () => {
      setCurrentView('list');
      setCurrentLesson(null);
    };
    
    // Render lesson details view
    const renderLessonDetail = () => {
      if (!currentLesson) return null;
      
      const LessonIcon = currentLesson.icon;
      
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Back button */}
          <button 
            onClick={handleBackToList}
            className="flex items-center text-purple-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            वापस जाएं
          </button>
          
          {/* Lesson header */}
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <LessonIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
              <p className="text-gray-600">{currentLesson.description}</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 mr-2 ${activeTab === 'video' ? 'border-b-2 border-orange-500 text-orange-500 font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('video')}
            >
              <div className="flex items-center">
                <Play className="h-4 w-4 mr-1" />
                वीडियो
              </div>
            </button>
            <button 
              className={`px-4 py-2 mr-2 ${activeTab === 'notes' ? 'border-b-2 border-orange-500 text-orange-500 font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('notes')}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                नोट्स
              </div>
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'quiz' ? 'border-b-2 border-orange-500 text-orange-500 font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('quiz')}
            >
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-1" />
                क्विज
              </div>
            </button>
          </div>
          
          {/* Tab content */}
          <div className="mb-6">
            {activeTab === 'video' && (
              <div>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-16 w-16 text-purple-600" />
                </div>
                <p className="text-center text-gray-600">त्रिभुज के बारे में वीडियो देखें</p>
              </div>
            )}
            
            {activeTab === 'notes' && (
              <div className="bg-white p-4 rounded-lg">
                <p className="mb-4">{currentLesson.content.notes}</p>
                <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
                  <h4 className="font-bold mb-2">याद रखने योग्य बातें:</h4>
                  <ul className="list-disc pl-5">
                    <li>त्रिभुज के कोणों का योग 180° होता है</li>
                    <li>समबाहु त्रिभुज के सभी भुजाएँ बराबर होती हैं</li>
                    <li>समद्विबाहु त्रिभुज की दो भुजाएँ बराबर होती हैं</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-4">अपने ज्ञान की जांच करें</h3>
                {currentLesson.content.quiz.map((q, index) => (
                  <div key={index} className="mb-6">
                    <p className="font-bold mb-2">{index + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center p-2 border rounded hover:bg-purple-50 cursor-pointer">
                          <div className="h-5 w-5 rounded-full border border-gray-400 mr-2 flex items-center justify-center">
                            {optIndex === q.answer && <div className="h-3 w-3 rounded-full bg-purple-600"></div>}
                          </div>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md mt-4">
                  उत्तर जमा करें
                </button>
              </div>
            )}
          </div>
          
          {/* Premium upgrade prompt - show only if the current lesson is premium */}
          {currentLesson.isPremium && (
            <div className="bg-orange-100 p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">प्रीमियम सामग्री</h3>
              <p className="mb-4">इस पाठ की पूरी सामग्री देखने के लिए प्रीमियम अनलॉक करें</p>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md">
                ₹50 में अनलॉक करें
              </button>
            </div>
          )}
        </div>
      );
    };
    
    // Render lesson list view
    const renderLessonList = () => {
      return (
        <>
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center mb-8">उपलब्ध पाठ</h2>
          
          {/* Subject Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-4 py-2 bg-purple-700 text-white rounded-md">गणित</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">विज्ञान</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">हिंदी</button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">सामाजिक अध्ययन</button>
          </div>
          
          {/* Section Title for the specific subject */}
          <h3 className="text-2xl font-bold mb-6">गणित के पाठ</h3>
          
          {/* Lesson Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card 1: Triangles */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <Triangle className="h-12 w-12 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">त्रिभुज</h4>
              <p className="text-gray-600 mb-4">त्रिभुज का क्षेत्रफल और कोण सीखें।</p>
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">नि:शुल्क</span>
                </div>
                <button 
                  onClick={() => handleExplore('triangles')}
                  className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md flex items-center justify-center gap-2"
                >
                  अन्वेषण करें
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Card 2: Lines */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="16 8 20 12 16 16" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">रेखाएँ</h4>
              <p className="text-gray-600 mb-4">रेखाओं के प्रकार और गुण समझें।</p>
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">आने वाला</span>
                </div>
                <button className="w-full py-2 bg-gray-300 text-gray-600 font-bold rounded-md flex items-center justify-center gap-2 cursor-not-allowed">
                  अन्वेषण करें
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Card 3: Coming Soon Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <div className="text-gray-400 mb-2">
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-400">अधिक जल्द ही</h4>
            </div>
            
            {/* Card 4: Coming Soon Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <div className="text-gray-400 mb-2">
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-400">अधिक जल्द ही</h4>
            </div>
          </div>
          
          {/* Pagination - only show when needed */}
          <div className="flex justify-center mt-8 gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 cursor-not-allowed">पिछला</button>
            <button className="px-4 py-2 bg-purple-700 text-white rounded-md">अगला</button>
          </div>
          
          {/* Premium Unlock Section */}
          <div className="mt-12 bg-orange-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">प्रीमियम सामग्री अनलॉक करें</h3>
            <p className="mb-4">सिर्फ ₹50 में सभी पाठों तक असीमित पहुंच प्राप्त करें</p>
            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-md">
              प्रीमियम अनलॉक करें
            </button>
          </div>
        </>
      );
    };
    
    return (
      <div className="container mx-auto px-4 py-8">
        {currentView === 'list' ? renderLessonList() : renderLessonDetail()}
      </div>
    );
  }