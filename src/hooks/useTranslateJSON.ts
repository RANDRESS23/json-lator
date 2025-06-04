import { useState } from "react";

interface Props {
  files: File[]
  targetLang: string
}

export function useTranslateJSON ({ files, targetLang }: Props) {
  const [jsonContent, setJsonContent] = useState('');
  const [jsonString, setJsonString] = useState('');

  const handleReadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result ?? '';
        const jsonObject = JSON.parse(jsonString as string);
        setJsonContent(JSON.stringify(jsonObject, null, 2));
      } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
      }
    };
    reader.readAsText(file);
  }

  const downloadJsonFile = (jsonString: string) => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = files[0].name.split('.')[0] + '_' + targetLang + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { jsonContent, jsonString, handleReadFile, downloadJsonFile, setJsonString }
}