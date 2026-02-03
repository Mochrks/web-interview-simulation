// ========================================
// REPORT EXPORT UTILITIES
// Generate reports in CSV, Excel, PDF, and DOCX
// ========================================

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableCell, TableRow, WidthType } from 'docx';

export interface InterviewReport {
  userProfile: {
    name: string;
    email: string;
    date: string;
    position: string;
  };
  stages: {
    stage: string;
    score: number;
    questions: {
      question: string;
      answer: string;
      score: number;
      feedback: string;
    }[];
  }[];
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// ========================================
// CSV EXPORT
// ========================================

export function generateCSV(report: InterviewReport): string {
  const rows: string[][] = [];
  
  // Header
  rows.push(['Interview Report']);
  rows.push(['Date', report.userProfile.date]);
  rows.push(['Candidate', report.userProfile.name]);
  rows.push(['Email', report.userProfile.email]);
  rows.push(['Position', report.userProfile.position]);
  rows.push(['Overall Score', report.overallScore.toString()]);
  rows.push([]);
  
  // Stages
  report.stages.forEach(stage => {
    rows.push([`Stage: ${stage.stage}`, `Score: ${stage.score}`]);
    rows.push(['Question', 'Answer', 'Score', 'Feedback']);
    
    stage.questions.forEach(q => {
      rows.push([
        q.question,
        q.answer.replace(/,/g, ';'), // Replace commas to avoid CSV issues
        q.score.toString(),
        q.feedback.replace(/,/g, ';')
      ]);
    });
    
    rows.push([]);
  });
  
  // Strengths and Weaknesses
  rows.push(['Strengths']);
  report.strengths.forEach(s => rows.push([s]));
  rows.push([]);
  
  rows.push(['Weaknesses']);
  report.weaknesses.forEach(w => rows.push([w]));
  rows.push([]);
  
  rows.push(['Recommendations']);
  report.recommendations.forEach(r => rows.push([r]));
  
  // Convert to CSV string
  return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

export function downloadCSV(report: InterviewReport, filename: string = 'interview_report.csv'): void {
  const csv = generateCSV(report);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ========================================
// EXCEL EXPORT
// ========================================

export function generateExcel(report: InterviewReport): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  
  // Summary Sheet
  const summaryData = [
    ['Interview Report'],
    [],
    ['Date', report.userProfile.date],
    ['Candidate', report.userProfile.name],
    ['Email', report.userProfile.email],
    ['Position', report.userProfile.position],
    ['Overall Score', report.overallScore],
    [],
    ['Stage', 'Score'],
    ...report.stages.map(s => [s.stage, s.score]),
    [],
    ['Strengths'],
    ...report.strengths.map(s => [s]),
    [],
    ['Weaknesses'],
    ...report.weaknesses.map(w => [w]),
    [],
    ['Recommendations'],
    ...report.recommendations.map(r => [r])
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // Detailed Sheets for each stage
  report.stages.forEach(stage => {
    const stageData = [
      [`${stage.stage} - Score: ${stage.score}`],
      [],
      ['Question', 'Answer', 'Score', 'Feedback'],
      ...stage.questions.map(q => [q.question, q.answer, q.score, q.feedback])
    ];
    
    const stageSheet = XLSX.utils.aoa_to_sheet(stageData);
    XLSX.utils.book_append_sheet(wb, stageSheet, stage.stage);
  });
  
  return wb;
}

export function downloadExcel(report: InterviewReport, filename: string = 'interview_report.xlsx'): void {
  const wb = generateExcel(report);
  XLSX.writeFile(wb, filename);
}

// ========================================
// PDF EXPORT
// ========================================

export function generatePDF(report: InterviewReport): jsPDF {
  const doc = new jsPDF();
  let yPos = 20;
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Interview Report', 105, yPos, { align: 'center' });
  yPos += 15;
  
  // User Profile
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${report.userProfile.date}`, 20, yPos);
  yPos += 7;
  doc.text(`Candidate: ${report.userProfile.name}`, 20, yPos);
  yPos += 7;
  doc.text(`Email: ${report.userProfile.email}`, 20, yPos);
  yPos += 7;
  doc.text(`Position: ${report.userProfile.position}`, 20, yPos);
  yPos += 10;
  
  // Overall Score
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Overall Score: ${report.overallScore}/100`, 20, yPos);
  yPos += 15;
  
  // Stage Scores Table
  doc.setFontSize(14);
  doc.text('Stage Scores', 20, yPos);
  yPos += 5;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Stage', 'Score']],
    body: report.stages.map(s => [s.stage, s.score.toString()]),
    theme: 'grid',
    headStyles: { fillColor: [220, 53, 69] }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Detailed Responses
  report.stages.forEach((stage, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stage.stage} (Score: ${stage.score}/100)`, 20, yPos);
    yPos += 5;
    
    autoTable(doc, {
      startY: yPos,
      head: [['Question', 'Score', 'Feedback']],
      body: stage.questions.map(q => [
        q.question,
        q.score.toString(),
        q.feedback
      ]),
      theme: 'striped',
      headStyles: { fillColor: [13, 110, 253] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20 },
        2: { cellWidth: 80 }
      }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
  });
  
  // Strengths and Weaknesses
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Strengths', 20, yPos);
  yPos += 7;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  report.strengths.forEach(strength => {
    doc.text(`• ${strength}`, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Areas for Improvement', 20, yPos);
  yPos += 7;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  report.weaknesses.forEach(weakness => {
    doc.text(`• ${weakness}`, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', 20, yPos);
  yPos += 7;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  report.recommendations.forEach(rec => {
    const lines = doc.splitTextToSize(rec, 170);
    doc.text(`• ${lines[0]}`, 25, yPos);
    yPos += 6;
    for (let i = 1; i < lines.length; i++) {
      doc.text(lines[i], 30, yPos);
      yPos += 6;
    }
  });
  
  return doc;
}

export function downloadPDF(report: InterviewReport, filename: string = 'interview_report.pdf'): void {
  const doc = generatePDF(report);
  doc.save(filename);
}

// ========================================
// DOCX EXPORT
// ========================================

export async function generateDOCX(report: InterviewReport): Promise<Blob> {
  const children: any[] = [];
  
  // Title
  children.push(
    new Paragraph({
      text: 'Interview Report',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 }
    })
  );
  
  // User Profile
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Date: ', bold: true }),
        new TextRun(report.userProfile.date)
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Candidate: ', bold: true }),
        new TextRun(report.userProfile.name)
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Email: ', bold: true }),
        new TextRun(report.userProfile.email)
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Position: ', bold: true }),
        new TextRun(report.userProfile.position)
      ],
      spacing: { after: 200 }
    })
  );
  
  // Overall Score
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Overall Score: ${report.overallScore}/100`, bold: true, size: 28 })
      ],
      spacing: { after: 300 }
    })
  );
  
  // Stage Scores
  children.push(
    new Paragraph({
      text: 'Stage Scores',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 }
    })
  );
  
  const stageTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({ 
            children: [new Paragraph({ 
              children: [new TextRun({ text: 'Stage', bold: true })] 
            })] 
          }),
          new TableCell({ 
            children: [new Paragraph({ 
              children: [new TextRun({ text: 'Score', bold: true })] 
            })] 
          })
        ]
      }),
      ...report.stages.map(s => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(s.stage)] }),
          new TableCell({ children: [new Paragraph(s.score.toString())] })
        ]
      }))
    ]
  });
  
  children.push(stageTable);
  
  // Detailed Responses
  report.stages.forEach(stage => {
    children.push(
      new Paragraph({
        text: `${stage.stage} (Score: ${stage.score}/100)`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      })
    );
    
    stage.questions.forEach((q, idx) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Q${idx + 1}: `, bold: true }),
            new TextRun(q.question)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Answer: ', bold: true }),
            new TextRun(q.answer)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Score: ', bold: true }),
            new TextRun(`${q.score}/100`)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Feedback: ', bold: true }),
            new TextRun(q.feedback)
          ],
          spacing: { after: 200 }
        })
      );
    });
  });
  
  // Strengths
  children.push(
    new Paragraph({
      text: 'Strengths',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 }
    })
  );
  
  report.strengths.forEach(s => {
    children.push(
      new Paragraph({
        text: `• ${s}`,
        spacing: { after: 100 }
      })
    );
  });
  
  // Weaknesses
  children.push(
    new Paragraph({
      text: 'Areas for Improvement',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 }
    })
  );
  
  report.weaknesses.forEach(w => {
    children.push(
      new Paragraph({
        text: `• ${w}`,
        spacing: { after: 100 }
      })
    );
  });
  
  // Recommendations
  children.push(
    new Paragraph({
      text: 'Recommendations',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 }
    })
  );
  
  report.recommendations.forEach(r => {
    children.push(
      new Paragraph({
        text: `• ${r}`,
        spacing: { after: 100 }
      })
    );
  });
  
  const doc = new Document({
    sections: [{
      properties: {},
      children
    }]
  });
  
  return await Packer.toBlob(doc);
}

export async function downloadDOCX(report: InterviewReport, filename: string = 'interview_report.docx'): Promise<void> {
  const blob = await generateDOCX(report);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getReportFilename(format: 'csv' | 'xlsx' | 'pdf' | 'docx'): string {
  const date = new Date().toISOString().split('T')[0];
  return `interview_report_${date}.${format}`;
}
