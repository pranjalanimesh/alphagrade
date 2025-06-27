import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, FileText, Calculator } from 'lucide-react';

const EvaluationResults = ({ evaluationData }) => {

  // Validate that evaluationData is an array
  if (!evaluationData || !Array.isArray(evaluationData)) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Invalid evaluation data. Please provide a valid array of evaluation results.
        </AlertDescription>
      </Alert>
    );
  }

  const calculateTotalMarks = (data) => {
    let totalMarks = 0;
    let totalPossible = 0;
    
    data.forEach(page => {
      if (page.grading?.grading?.question_grades) {
        page.grading.grading.question_grades.forEach(question => {
          totalPossible += question.total_marks || 0;
          totalMarks += question.grading?.marks_awarded || 0;
        });
      }
    });
    
    return { totalMarks, totalPossible };
  };

  const getGradeColor = (awarded, total) => {
    const percentage = (awarded / total) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const renderQuestionCard = (question, pageNum) => {
    const { grading } = question;
    const percentage = grading?.total_marks ? (grading.marks_awarded / grading.total_marks) * 100 : 0;
    
    return (
      <Card key={`${pageNum}-${question.question_number?.question_number?.[0]}`} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Question {question.question_number?.question_number?.[0] || 'N/A'} {question.question_number?.question_number?.[1] || ''} {question.question_number?.question_number?.[2] || ''}
              <Badge variant="outline">Page {pageNum}</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getGradeColor(grading?.marks_awarded || 0, grading?.total_marks || 0)}>
                {grading?.marks_awarded || 0}/{grading?.total_marks || 0} marks
              </Badge>
              <Badge variant="secondary">
                {percentage.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {question.answer && (
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Student Answer:</h4>
              <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                {question.answer}
              </div>
            </div>
          )}
          
          {grading?.student_steps && grading.student_steps.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Solution Steps:
              </h4>
              <ul className="space-y-1">
                {grading.student_steps.map((step, index) => (
                  <li key={index} className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-400">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {grading?.errors && grading.errors.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-red-600 mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                Errors Found:
              </h4>
              <ul className="space-y-1">
                {grading.errors.map((error, index) => (
                  <li key={index} className="text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderResults = () => {
    // Filter pages that have questions
    const pagesWithQuestions = evaluationData.filter(
      page => page.grading?.grading?.question_grades?.length > 0
    );

    // Sort pages by page number
    pagesWithQuestions.sort((a, b) => a.page - b.page);

    const { totalMarks, totalPossible } = calculateTotalMarks(evaluationData);
    const overallPercentage = totalPossible > 0 ? (totalMarks / totalPossible) * 100 : 0;

    return (
      <div className="space-y-6">
        {/* Overall Summary */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calculator className="h-6 w-6 text-blue-600" />
              Evaluation Summary
            </CardTitle>
            <CardDescription>
              Overall performance across all questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{totalMarks}</div>
                <div className="text-sm text-blue-600">Total Marks Earned</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-700">{totalPossible}</div>
                <div className="text-sm text-gray-600">Total Possible Marks</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{overallPercentage.toFixed(1)}%</div>
                <div className="text-sm text-green-600">Overall Percentage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Question Details ({pagesWithQuestions.length} questions found)</h3>
          {pagesWithQuestions.map(page => 
            page.grading.grading.question_grades.map(question => 
              renderQuestionCard(question, page.page)
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluation Results</h1>
        <p className="text-gray-600">Detailed breakdown of scoring and performance</p>
      </div>

      {renderResults()}
    </div>
  );
};

export default EvaluationResults;