'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CodeRunner from "@/components/code-runner"

export default function SimpleLlamaCoder() {
  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateCode = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      const data = await response.json()
      setCode(data.code)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Simple Code Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Describe your app</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Build me a calculator app..."
                className="w-full h-32 p-3 border rounded-lg resize-none"
              />
              <Button 
                onClick={generateCode}
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Code'}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated App</CardTitle>
            </CardHeader>
            <CardContent>
              {code ? (
                <div className="h-96 border rounded-lg overflow-hidden">
                  <CodeRunner language="tsx" code={code} />
                </div>
              ) : (
                <div className="h-96 border rounded-lg flex items-center justify-center text-gray-500">
                  Generated app will appear here
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}