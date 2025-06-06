"use client";

import { useState } from "react"
import { Upload, ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languages } from "@/data/languages";
import { toast } from "sonner";
import { Spinner } from "./Spinner";
import { ShinyButton } from "./magicui/shiny-button";
import { useTranslateJSON } from "@/hooks/useTranslateJSON";
import confetti from "canvas-confetti";
import { createPrompt, getJsonTranslated } from "@/services/getJsonTranslated";

export const FormJSON = () => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const { jsonContent, jsonString, handleReadFile, downloadJsonFile, setJsonString } = useTranslateJSON({ files, targetLang })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    const jsonFiles = droppedFiles.filter((file) => file.type === "application/json")
    setFiles(jsonFiles)
    setJsonString("")
    handleReadFile(jsonFiles[0]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files)
      const jsonFiles = uploadedFiles.filter((file) => file.type === "application/json")
      setFiles(jsonFiles)
      setJsonString("")
      handleReadFile(jsonFiles[0]);
    }
  }

  const handleToast = ({ title, description }: { title: string, description: string }) => {
    toast(title, {
      description,
      action: {
        label: "Cerrar",
        onClick: () => console.log("Cerrar"),
      },
    })
  }

  const handleTranslate = async () => {
    try {
      if (!files[0]) {
        return handleToast({
          title: "No se puede traducir un json en este momento.",
          description: "Sube un archivo json para continuar."
        })
      }
  
      if (!targetLang) {
        return handleToast({
          title: "No se puede traducir un json en este momento.",
          description: "Seleccione un idioma para continuar."
        })
      }

      setJsonString("")
      setLoading(true)

      const prompt = createPrompt(JSON.parse(jsonContent), targetLang)
      const response = await getJsonTranslated(prompt);
      const cleanResponse = response.replace(/```json\n|```/g, '');
      const JsonTranslated = JSON.parse(cleanResponse);
      
      setJsonString(JSON.stringify(JsonTranslated, null, 2));
      handleToast({
        title: "Traducción exitosa.",
        description: "El archivo json fue traducido exitosamente."
      })
      confetti()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          dragActive ? "border-primary" : "border-gray-700"
        } p-8 text-center`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="application/json"
          multiple
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 dark:text-gray-400 text-neutral-700" />
          <span className="text-lg font-medium">Arrastre y suelte sus archivos JSON aquí</span>
          <span className="text-sm dark:text-gray-400 text-neutral-700">o haga clic para seleccionar archivos</span>
        </label>
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div key={file.name} className="text-sm dark:text-gray-400 text-neutral-700">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium dark:text-gray-200 text-neutral-700">Seleccionar idioma</label>
          <Select onValueChange={setTargetLang}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {
                languages.map((language) => (
                  <SelectItem key={language.code} value={language.code} className="cursor-pointer">
                    {language.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full cursor-pointer" size="lg" onClick={handleTranslate}>
          {
            loading 
              ? (
                  <Spinner />
                ) 
              : (
                  "Traducir ahora"
                )
          }
        </Button>

        {
          jsonString && (
            <ShinyButton className="w-full flex justify-center items-center py-3" onClick={() => downloadJsonFile(jsonString)}>
              <span className="w-full flex justify-center items-center gap-x-2 text-center">Descargar JSON traducido <ArrowDownToLine className="h-5 w-5" /></span>
            </ShinyButton>
          )
        }
      </div>
    </Card>
  )
}
