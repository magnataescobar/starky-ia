'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Mic, MicOff, Zap, MessageSquare, User, Bot, Sparkles, Brain, TrendingUp, Target, Calendar, BookOpen, CheckSquare, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LasyAIChatProps {
  onClose: () => void
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
  insights?: {
    type: 'task' | 'project' | 'habit' | 'finance' | 'diary'
    title: string
    description: string
    action?: string
  }[]
}

export function LasyAIChat({ onClose }: LasyAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá! Sou a STARKY.IA, sua assistente de produtividade. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
      suggestions: [
        'Criar nova tarefa',
        'Analisar minha produtividade',
        'Registrar humor do dia',
        'Verificar próximos eventos'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Auto-focus input when modal opens
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    // Análise de intenção inteligente
    if (input.includes('tarefa') || input.includes('fazer') || input.includes('revisar') || input.includes('completar')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Entendi que você quer criar uma nova tarefa. Vou analisar sua mensagem e organizá-la automaticamente.',
        timestamp: new Date(),
        insights: [{
          type: 'task',
          title: 'Nova Tarefa Identificada',
          description: `"${userInput}" foi categorizada como tarefa de alta prioridade`,
          action: 'Adicionada ao módulo de Tarefas'
        }],
        suggestions: [
          'Definir prazo para esta tarefa',
          'Adicionar subtarefas',
          'Ver todas as tarefas pendentes'
        ]
      }
    }

    if (input.includes('humor') || input.includes('sentindo') || input.includes('dia') || input.includes('reflexão')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Vou registrar seu estado emocional no diário. Como você está se sentindo hoje?',
        timestamp: new Date(),
        insights: [{
          type: 'diary',
          title: 'Registro de Humor',
          description: 'Análise de sentimento detectada na sua mensagem',
          action: 'Salvo no módulo Diário'
        }],
        suggestions: [
          'Ótimo - muito bem hoje',
          'Bom - dia produtivo',
          'Ok - dia normal',
          'Ver histórico de humor'
        ]
      }
    }

    if (input.includes('projeto') || input.includes('planejamento') || input.includes('cronograma')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Detectei que você está falando sobre projetos. Posso ajudar a organizar e acompanhar o progresso.',
        timestamp: new Date(),
        insights: [{
          type: 'project',
          title: 'Gestão de Projeto',
          description: 'Informações sobre projeto identificadas',
          action: 'Organizando no módulo Projetos'
        }],
        suggestions: [
          'Criar novo projeto',
          'Ver projetos ativos',
          'Definir marcos importantes',
          'Analisar riscos'
        ]
      }
    }

    if (input.includes('dinheiro') || input.includes('gasto') || input.includes('receita') || input.includes('financeiro')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Vou registrar essa informação financeira e atualizar seus relatórios de fluxo de caixa.',
        timestamp: new Date(),
        insights: [{
          type: 'finance',
          title: 'Transação Financeira',
          description: 'Movimento financeiro detectado na conversa',
          action: 'Registrado no módulo Finanças'
        }],
        suggestions: [
          'Ver saldo atual',
          'Categorizar despesa',
          'Analisar gastos do mês',
          'Previsão de fluxo de caixa'
        ]
      }
    }

    if (input.includes('hábito') || input.includes('rotina') || input.includes('exercício') || input.includes('meditação')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Ótimo! Vou ajudar você a manter consistência nos seus hábitos. Qual hábito você gostaria de trabalhar?',
        timestamp: new Date(),
        insights: [{
          type: 'habit',
          title: 'Desenvolvimento de Hábito',
          description: 'Novo hábito ou progresso identificado',
          action: 'Adicionado ao rastreamento de Hábitos'
        }],
        suggestions: [
          'Marcar hábito como concluído',
          'Ver sequência atual',
          'Definir novo hábito',
          'Otimizar horários'
        ]
      }
    }

    if (input.includes('produtividade') || input.includes('análise') || input.includes('relatório') || input.includes('performance')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Analisando seus dados de produtividade... Baseado nos últimos 7 dias, identifiquei alguns padrões interessantes.',
        timestamp: new Date(),
        insights: [
          {
            type: 'task',
            title: 'Pico de Produtividade',
            description: 'Você é 23% mais produtivo nas manhãs de terça-feira',
            action: 'Sugestão: agende tarefas importantes para este horário'
          },
          {
            type: 'habit',
            title: 'Correlação Positiva',
            description: 'Exercícios matinais aumentam sua produtividade em 18%',
            action: 'Continue mantendo esta rotina'
          }
        ],
        suggestions: [
          'Ver relatório completo',
          'Otimizar agenda',
          'Definir metas semanais',
          'Analisar tendências'
        ]
      }
    }

    // Resposta padrão
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Entendi sua mensagem. Como sua assistente de produtividade, posso ajudar você a organizar tarefas, projetos, hábitos, finanças e bem-estar. O que você gostaria de fazer?',
      timestamp: new Date(),
      suggestions: [
        'Criar nova tarefa',
        'Analisar produtividade',
        'Registrar humor',
        'Ver agenda de hoje'
      ]
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Aqui seria implementada a funcionalidade de gravação de voz
    if (!isRecording) {
      // Simular captura de voz
      setTimeout(() => {
        setIsRecording(false)
        setInputValue('Criar tarefa: revisar proposta até sexta-feira')
      }, 3000)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'task': return CheckSquare
      case 'project': return Target
      case 'habit': return TrendingUp
      case 'finance': return DollarSign
      case 'diary': return BookOpen
      default: return Sparkles
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40'
      case 'project': return 'text-blue-400 bg-blue-500/20 border-blue-500/40'
      case 'habit': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40'
      case 'finance': return 'text-green-400 bg-green-500/20 border-green-500/40'
      case 'diary': return 'text-purple-400 bg-purple-500/20 border-purple-500/40'
      default: return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-gradient-to-br from-[#0f1419]/95 via-[#0d1117]/95 to-[#0f1419]/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative">
        {/* Holographic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/20">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono tracking-wide">STARKY.IA</h2>
              <p className="text-sm text-gray-400 font-mono">Assistente de Produtividade Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-mono tracking-wide">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-cyan-500/10 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start space-x-3">
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/20 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={`p-4 rounded-2xl font-mono ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-white'
                        : 'bg-cyan-500/5 border border-cyan-500/20 text-gray-100'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                    
                    {/* AI Insights */}
                    {message.insights && (
                      <div className="mt-4 space-y-3">
                        {message.insights.map((insight, index) => {
                          const Icon = getInsightIcon(insight.type)
                          return (
                            <div key={index} className={`p-4 rounded-xl border ${getInsightColor(insight.type)} shadow-lg transition-all duration-300 hover:scale-105`}>
                              <div className="flex items-start space-x-3">
                                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-medium font-mono tracking-wide mb-1">{insight.title}</h4>
                                  <p className="text-sm text-gray-300 font-mono mb-2">{insight.description}</p>
                                  {insight.action && (
                                    <Badge variant="outline" className="text-xs font-mono">
                                      {insight.action}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-2 text-sm bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl text-cyan-300 hover:text-cyan-200 transition-all duration-300 font-mono tracking-wide"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-cyan-500/20 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem ou comando..."
                className="bg-cyan-500/5 border-cyan-500/20 text-cyan-100 placeholder-cyan-400/50 rounded-xl focus:border-cyan-400/50 focus:ring-cyan-500/20 font-mono pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRecording}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg transition-all duration-300 ${
                  isRecording 
                    ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30' 
                    : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/40 border border-cyan-400/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wide"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-red-400 font-mono">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm">Gravando... Fale agora</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}