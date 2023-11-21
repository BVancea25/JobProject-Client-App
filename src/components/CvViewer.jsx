import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { auth } = useAuth();
  const {email}=useParams();
  //const [viewerOpen, setViewerOpen] = useState(false);
  useEffect(()=>{
    fetchPDF();
    console.log(email)
  },[])
  const fetchPDF = () => {
    const apiUrl = `http://localhost:8080/cv/${email}`;

    axios.get(apiUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ` + auth.jwt
      }
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
       // setViewerOpen(true);
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  };

  // const closeViewer = () => {
  //   setViewerOpen(false);
  // };

  const downloadPDF = () => {
    // You can create a hidden link and programmatically trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = 'cv.pdf';
    link.click();
  };

  return (
    <div>
      
      
        <div>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="900px" />
          <button onClick={downloadPDF}>Download PDF</button>
          <Link to={"/application/employer"}>Back</Link> 
        </div>
      
    </div>
  );
}

export default PDFViewer;
