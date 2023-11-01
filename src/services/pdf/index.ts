import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

export const UPLOADED_DOCUMENTS: string[] = [];

export function onUpload(uploadedFile: File, callback: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const data = atob(e.target.result.replace(/.*base64,/, ''));
        if (uploadedFile.type === 'application/pdf') {
            renderPDF(data, callback);
        } else {
            // return data;
            UPLOADED_DOCUMENTS.push(data);
            callback(data);
        }
    };
    reader.readAsDataURL(uploadedFile);
}

export async function renderPDF(data: any, callback: any) {
    GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const pdfObj = getDocument({ data });
    const pdf = await pdfObj.promise;

    for (let i = 1; i <= pdf.numPages; i += 1) {
        const image = document.createElement('img');
        document.body.appendChild(image);

        pdf.getPage(i).then((page: any) => {
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('2d');
            if (canvasContext) {
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({ canvasContext, viewport }).promise.then(() => {
                    const imageData = canvas.toDataURL('image/png');
                    UPLOADED_DOCUMENTS.push(imageData);
                    // image.src = imageData;
                    // image.style.width = '100%';
                    // window.location.href = '/qna';
                    callback(data);
                });
            }
        });
    }
}

export default { onUpload, renderPDF };
