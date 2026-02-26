import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { BookOpen, MessageSquare, BrainCircuit, ArrowLeft } from "lucide-react";
import Card, { CardHeader, CardBody } from "../../components/common/Card";
import ChatBox from "../../components/features/chat/ChatBox";
import QuizGenerator from "../../components/features/quiz/QuizGenerator";

const AIStudySpace = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const location = useLocation();
  const navigate = useNavigate();

  const currentDoc = location.state?.currentDoc;

  if (!currentDoc) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div>
      {/* Nội dung của bạn giữ nguyên */}
    </div>
  );
};

export default AIStudySpace;