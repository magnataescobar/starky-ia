"use client"

import { 
  CheckSquare, 
  FolderOpen, 
  Target, 
  DollarSign, 
  BarChart3,
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Circle,
  Activity,
  Zap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  Heart,
  Star,
  Send,
  Mic,
  MicOff,
  Brain,
  Shield,
  Timer,
  Award,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Smartphone,
  QrCode,
  Link,
  Flame,
  Trophy,
  Sparkles,
  Focus,
  Lightbulb,
  Gauge
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ModuleContentProps {
  module: string
}

export function ModuleContent({ module }: ModuleContentProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [diaryEntry, setDiaryEntry] = useState("")
  const [currentMood, setCurrentMood] = useState<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  
  // Neuro-Foco states
  const [focusSession, setFocusSession] = useState({
    isActive: false,
    timeElapsed: 0,
    seedStage: 0,
    selectedTask: null as any,
    isDopamineFast: false,
    phoneDistanced: false
  })
  const [procrastinatorType, setProcrastinatorType] = useState<string | null>(null)
  const [showDiagnosis, setShowDiagnosis] = useState(false)

  // Timer effect for focus session
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (focusSession.isActive) {
      interval = setInterval(() => {
        setFocusSession(prev => {
          const newTimeElapsed = prev.timeElapsed + 1
          const newSeedStage = Math.floor(newTimeElapsed / 600) // Evolui a cada 10 minutos (600 segundos)
          return {
            ...prev,
            timeElapsed: newTimeElapsed,
            seedStage: Math.min(newSeedStage, 5) // Máximo 5 estágios
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [focusSession.isActive])

  // Calendar helper functions
  const today = new Date()
  const currentMonth = selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
  
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setSelectedDate(newDate)
  }

  const moodOptions = [
    { value: 1, icon: Frown, label: 'Ruim', color: 'text-red-400' },
    { value: 2, icon: Meh, label: 'Ok', color: 'text-yellow-400' },
    { value: 3, icon: Smile, label: 'Bom', color: 'text-emerald-400' },
    { value: 4, icon: Heart, label: 'Ótimo', color: 'text-pink-400' },
    { value: 5, icon: Star, label: 'Incrível', color: 'text-cyan-400' }
  ]

  // Neuro-Foco functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSeedIcon = (stage: number) => {
    switch (stage) {
      case 0: return Circle
      case 1: return Circle
      case 2: return Circle
      case 3: return Circle
      case 4: return Circle
      case 5: return Trophy
      default: return Circle
    }
  }

  const getSeedColor = (stage: number) => {
    switch (stage) {
      case 0: return 'text-gray-400'
      case 1: return 'text-green-600'
      case 2: return 'text-green-500'
      case 3: return 'text-emerald-400'
      case 4: return 'text-cyan-400'
      case 5: return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const startFocusSession = (task: any) => {
    setFocusSession({
      isActive: true,
      timeElapsed: 0,
      seedStage: 0,
      selectedTask: task,
      isDopamineFast: false,
      phoneDistanced: false
    })
  }

  const pauseFocusSession = () => {
    setFocusSession(prev => ({ ...prev, isActive: false }))
  }

  const stopFocusSession = () => {
    setFocusSession({
      isActive: false,
      timeElapsed: 0,
      seedStage: 0,
      selectedTask: null,
      isDopamineFast: false,
      phoneDistanced: false
    })
  }

  const procrastinatorTypes = [
    { id: 'perfectionist', name: 'O Perfeccionista', description: 'Adia tarefas por medo de não fazer perfeitamente' },
    { id: 'overwhelmed', name: 'O Sobrecarregado', description: 'Se sente perdido com muitas tarefas ao mesmo tempo' },
    { id: 'dreamer', name: 'O Sonhador', description: 'Prefere planejar a executar' },
    { id: 'rebel', name: 'O Rebelde', description: 'Resiste a fazer o que "deve" ser feito' },
    { id: 'worrier', name: 'O Preocupado', description: 'Adia por ansiedade e medo do resultado' }
  ]

  if (module === "neuro-focus") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Módulo Neuro-Foco</h1>
            <p className="text-gray-400 font-mono">Transforme resistência em impulso através de gamificação neurocientífica</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowDiagnosis(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-purple-500/40 border border-purple-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide"
            >
              <Brain className="w-4 h-4 mr-2" />
              Diagnóstico
            </Button>
            <Button
              onClick={() => setFocusSession(prev => ({ ...prev, isDopamineFast: !prev.isDopamineFast }))}
              className={`font-semibold py-3 px-4 rounded-xl shadow-lg border transition-all duration-300 hover:scale-105 font-mono tracking-wide ${
                focusSession.isDopamineFast
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40 border-red-400/30 text-white'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/40 border-cyan-400/30 text-white'
              }`}
            >
              <Shield className="w-4 h-4 mr-2" />
              {focusSession.isDopamineFast ? 'Parar Fast' : 'Fast Dopamina'}
            </Button>
          </div>
        </div>

        {/* Diagnóstico Modal */}
        {showDiagnosis && (
          <Card className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent backdrop-blur-sm border border-purple-500/20 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                <Brain className="w-6 h-6 mr-3 text-purple-400 drop-shadow-lg" />
                Diagnóstico de Barreira - STARKY.IA
              </CardTitle>
              <p className="text-gray-400 font-mono">Identifique seu tipo de procrastinador para personalizar sua experiência</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {procrastinatorTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setProcrastinatorType(type.id)
                      setShowDiagnosis(false)
                    }}
                    className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30 text-left"
                  >
                    <h3 className="text-white font-medium font-mono tracking-wide mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm font-mono">{type.description}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowDiagnosis(false)}
                  variant="outline"
                  className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 font-mono tracking-wide"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessão de Foco Ativa */}
        {focusSession.selectedTask && (
          <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white flex items-center justify-between font-mono tracking-wide">
                <div className="flex items-center">
                  <Timer className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                  Sessão de Foco Ativa
                </div>
                <div className="flex items-center space-x-2">
                  {focusSession.isActive ? (
                    <Button onClick={pauseFocusSession} size="sm" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/30">
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={() => setFocusSession(prev => ({ ...prev, isActive: true }))} size="sm" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Button onClick={stopFocusSession} size="sm" className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Timer e Semente */}
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-cyan-400 font-mono tracking-wider mb-2">
                      {formatTime(focusSession.timeElapsed)}
                    </div>
                    <p className="text-gray-400 font-mono">Tempo de Foco</p>
                  </div>
                  <div className="flex justify-center mb-4">
                    {(() => {
                      const SeedIcon = getSeedIcon(focusSession.seedStage)
                      return (
                        <div className="relative">
                          <SeedIcon className={`w-16 h-16 ${getSeedColor(focusSession.seedStage)} drop-shadow-lg`} />
                          {focusSession.seedStage > 0 && (
                            <div className="absolute -top-2 -right-2">
                              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                  <p className="text-cyan-400 font-mono">
                    Estágio {focusSession.seedStage}/5
                  </p>
                </div>

                {/* Tarefa Selecionada */}
                <div>
                  <h3 className="text-white font-medium font-mono tracking-wide mb-3">Tarefa Atual</h3>
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                    <p className="text-white font-mono">{focusSession.selectedTask.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/40 font-mono">
                        Inércia: {focusSession.selectedTask.inertia}/10
                      </Badge>
                      <span className="text-cyan-400 font-mono text-sm">+{focusSession.selectedTask.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-white font-medium font-mono tracking-wide mb-3">Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-mono">Escudo de Foco</span>
                      <div className={`w-3 h-3 rounded-full ${focusSession.isActive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-mono">Fast Dopamina</span>
                      <div className={`w-3 h-3 rounded-full ${focusSession.isDopamineFast ? 'bg-red-400 shadow-lg shadow-red-400/50' : 'bg-gray-600'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-mono">Celular Distante</span>
                      <div className={`w-3 h-3 rounded-full ${focusSession.phoneDistanced ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tarefas com Pontuação de Inércia */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                <Target className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                Tarefas com Engine de Baixa Dopamina
              </CardTitle>
              <p className="text-gray-400 font-mono">STARKY.IA calculou a pontuação de inércia para cada tarefa</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {[
                  { title: "Revisar proposta de projeto", inertia: 8, xp: 120, category: "Trabalho", difficulty: "Alta" },
                  { title: "Organizar documentos fiscais", inertia: 9, xp: 150, category: "Pessoal", difficulty: "Muito Alta" },
                  { title: "Estudar novo framework", inertia: 6, xp: 80, category: "Aprendizado", difficulty: "Média" },
                  { title: "Fazer exercícios", inertia: 4, xp: 60, category: "Saúde", difficulty: "Baixa" },
                  { title: "Responder emails", inertia: 7, xp: 90, category: "Trabalho", difficulty: "Alta" }
                ].map((task, index) => (
                  <div key={index} className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-medium font-mono tracking-wide mb-2">{task.title}</h3>
                        <div className="flex items-center space-x-3">
                          <Badge className={`text-xs font-mono tracking-wide ${
                            task.inertia >= 8 ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                            task.inertia >= 6 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                            'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          }`}>
                            Inércia: {task.inertia}/10
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40 text-xs font-mono">
                            {task.category}
                          </Badge>
                          <span className="text-cyan-400 font-mono text-sm">+{task.xp} XP</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => startFocusSession(task)}
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    </div>
                    
                    {/* Boost de Recompensa */}
                    <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-mono text-sm">Boost de Recompensa</span>
                        <div className="flex items-center space-x-2">
                          {task.inertia >= 8 && <Award className="w-4 h-4 text-yellow-400" />}
                          {task.inertia >= 6 && <Flame className="w-4 h-4 text-orange-400" />}
                          <span className="text-purple-400 font-mono text-sm">
                            {task.inertia >= 8 ? 'Triplo XP' : task.inertia >= 6 ? 'Duplo XP' : 'XP Normal'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ferramentas de Foco */}
          <div className="space-y-6">
            {/* Escudo de Foco */}
            <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-bold text-white flex items-center font-mono tracking-wide">
                  <Shield className="w-5 h-5 mr-2 text-cyan-400 drop-shadow-lg" />
                  Escudo de Foco
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-mono">Sites Bloqueados</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/40 text-xs font-mono">
                      5 ativos
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {['Instagram', 'YouTube', 'Twitter', 'TikTok', 'Facebook'].map((site, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 font-mono">{site}</span>
                        <div className="w-2 h-2 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white font-mono">
                  <EyeOff className="w-4 h-4 mr-2" />
                  Ativar Escudo
                </Button>
              </CardContent>
            </Card>

            {/* Distanciamento do Celular */}
            <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-bold text-white flex items-center font-mono tracking-wide">
                  <Smartphone className="w-5 h-5 mr-2 text-cyan-400 drop-shadow-lg" />
                  Distanciamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-cyan-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm font-mono mb-4">
                    Escaneie para confirmar que seu celular está distante
                  </p>
                  <Button
                    onClick={() => setFocusSession(prev => ({ ...prev, phoneDistanced: !prev.phoneDistanced }))}
                    className={`w-full font-mono ${
                      focusSession.phoneDistanced
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                    }`}
                  >
                    {focusSession.phoneDistanced ? 'Celular Distante ✓' : 'Confirmar Distância'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Micro-Recompensas */}
            <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-bold text-white flex items-center font-mono tracking-wide">
                  <Award className="w-5 h-5 mr-2 text-cyan-400 drop-shadow-lg" />
                  Micro-Recompensas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                {[
                  { reward: '5 min de alongamento', icon: Activity, available: true },
                  { reward: 'Chá ou café especial', icon: Heart, available: true },
                  { reward: '10 min de música', icon: Sparkles, available: false }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      disabled={!item.available}
                      className={`w-full p-3 rounded-xl border transition-all duration-300 font-mono text-left ${
                        item.available
                          ? 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400/30 text-white'
                          : 'bg-gray-500/5 border-gray-500/20 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${item.available ? 'text-cyan-400' : 'text-gray-500'}`} />
                        <span>{item.reward}</span>
                        {item.available && (
                          <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs">
                            Disponível
                          </Badge>
                        )}
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Estatísticas e Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent backdrop-blur-sm border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Gauge className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-mono">+15%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">87%</p>
                <p className="text-gray-400 text-sm font-mono">Taxa de Conclusão</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Focus className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-mono">Média</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">42min</p>
                <p className="text-gray-400 text-sm font-mono">Tempo de Foco</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent backdrop-blur-sm border border-purple-500/20 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Lightbulb className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 text-sm font-mono">-23%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">1.2h</p>
                <p className="text-gray-400 text-sm font-mono">Tempo em Distrações</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STARKY.IA Coach */}
        <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
              <Zap className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
              STARKY.IA - Seu Coach Neuro-Científico
            </CardTitle>
            <p className="text-gray-400 font-mono">"Sou o seu impulso, não o seu juiz"</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-emerald-400 font-medium font-mono">Padrão Identificado</p>
                      <p className="text-gray-300 text-sm font-mono">Você foca melhor após exercícios matinais. Sua semente cresce 40% mais rápido!</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium font-mono">Recomendação</p>
                      <p className="text-gray-300 text-sm font-mono">Tarefas de alta inércia funcionam melhor em blocos de 25 minutos para seu perfil.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-medium font-mono">Insight Neuroquímico</p>
                      <p className="text-gray-300 text-sm font-mono">Seu tipo "Perfeccionista" responde bem a micro-recompensas de movimento.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-purple-400 font-medium font-mono">Conquista Desbloqueada</p>
                      <p className="text-gray-300 text-sm font-mono">"Jardineiro Digital" - 10 sementes cultivadas com sucesso!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (module === "calendar") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Calendário</h1>
            <p className="text-gray-400 font-mono">Visualize e gerencie seus compromissos e eventos</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                  <Calendar className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                  {currentMonth}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth('prev')}
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth('next')}
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-400 font-mono p-3 font-medium">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`text-center text-sm p-3 rounded-xl font-mono transition-all duration-300 min-h-[60px] flex flex-col justify-center relative ${
                      day === today.getDate() && selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear()
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                        : day
                        ? 'text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20 cursor-pointer'
                        : ''
                    }`}
                  >
                    {day && (
                      <>
                        <span className="font-medium">{day}</span>
                        {/* Event indicators */}
                        {(day === 15 || day === 22 || day === 28) && (
                          <div className="flex justify-center mt-1 space-x-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                            {day === 22 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events Sidebar */}
          <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg font-bold text-white font-mono tracking-wide">
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {[
                { title: 'Reunião de equipe', time: '09:00', date: 'Hoje', type: 'meeting', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
                { title: 'Revisar proposta', time: '14:30', date: 'Hoje', type: 'task', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
                { title: 'Exercício matinal', time: '07:00', date: 'Amanhã', type: 'habit', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
                { title: 'Apresentação cliente', time: '15:00', date: 'Sexta', type: 'meeting', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' }
              ].map((event, index) => (
                <div key={index} className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium font-mono tracking-wide">{event.title}</h4>
                    <Badge className={`text-xs font-mono tracking-wide ${event.color} shadow-lg`}>
                      {event.type === 'meeting' ? 'Reunião' : event.type === 'task' ? 'Tarefa' : 'Hábito'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400 font-mono">{event.time} - {event.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Views */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Hoje', 'Esta Semana', 'Este Mês'].map((view, index) => (
            <Card key={index} className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-white font-mono tracking-wide">{view}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm font-mono">Eventos</span>
                    <span className="text-cyan-400 font-bold font-mono">{index === 0 ? '3' : index === 1 ? '8' : '15'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm font-mono">Tarefas</span>
                    <span className="text-emerald-400 font-bold font-mono">{index === 0 ? '5' : index === 1 ? '12' : '28'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm font-mono">Hábitos</span>
                    <span className="text-yellow-400 font-bold font-mono">{index === 0 ? '2' : index === 1 ? '14' : '45'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (module === "diary") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Diário & Self-Reflexão</h1>
            <p className="text-gray-400 font-mono">Registre seus pensamentos e acompanhe seu bem-estar emocional</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsRecording(!isRecording)}
              className={`border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 font-mono tracking-wide ${
                isRecording ? 'bg-red-500/20 border-red-500/40 text-red-400' : ''
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isRecording ? 'Parar Gravação' : 'Gravar Voz'}
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
              <Send className="w-4 h-4 mr-2" />
              Salvar Reflexão
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diary Entry */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                <BookOpen className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                Reflexão de Hoje
              </CardTitle>
              <p className="text-gray-400 text-sm font-mono">{today.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-6">
                {/* Mood Selector */}
                <div>
                  <h3 className="text-white font-medium mb-4 font-mono tracking-wide">Como você está se sentindo hoje?</h3>
                  <div className="flex items-center space-x-4">
                    {moodOptions.map((mood) => {
                      const Icon = mood.icon
                      return (
                        <button
                          key={mood.value}
                          onClick={() => setCurrentMood(mood.value)}
                          className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${
                            currentMood === mood.value
                              ? 'bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                              : 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400/30'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${currentMood === mood.value ? 'text-cyan-400' : mood.color}`} />
                        </button>
                      )
                    })}
                  </div>
                  {currentMood && (
                    <p className="text-cyan-400 text-sm mt-2 font-mono">
                      Humor: {moodOptions.find(m => m.value === currentMood)?.label}
                    </p>
                  )}
                </div>

                {/* Text Entry */}
                <div>
                  <h3 className="text-white font-medium mb-4 font-mono tracking-wide">Seus pensamentos</h3>
                  <Textarea
                    placeholder="Escreva sobre seu dia, seus sentimentos, reflexões ou qualquer coisa que esteja em sua mente..."
                    value={diaryEntry}
                    onChange={(e) => setDiaryEntry(e.target.value)}
                    className="min-h-[200px] bg-cyan-500/5 border-cyan-500/20 text-cyan-100 placeholder-cyan-400/50 rounded-xl focus:border-cyan-400/50 focus:ring-cyan-500/20 font-mono resize-none"
                  />
                  <p className="text-gray-400 text-xs mt-2 font-mono">{diaryEntry.length} caracteres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood History & Insights */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-bold text-white font-mono tracking-wide">
                  Histórico de Humor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {[
                  { date: 'Hoje', mood: 4, color: 'text-pink-400' },
                  { date: 'Ontem', mood: 3, color: 'text-emerald-400' },
                  { date: '2 dias atrás', mood: 2, color: 'text-yellow-400' },
                  { date: '3 dias atrás', mood: 5, color: 'text-cyan-400' },
                  { date: '4 dias atrás', mood: 3, color: 'text-emerald-400' }
                ].map((entry, index) => {
                  const moodData = moodOptions.find(m => m.value === entry.mood)
                  const Icon = moodData?.icon || Smile
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                      <span className="text-gray-400 text-sm font-mono">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${entry.color}`} />
                        <span className={`text-sm font-mono ${entry.color}`}>{moodData?.label}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* STARKY.IA Insights */}
            <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-bold text-white flex items-center font-mono tracking-wide">
                  <Zap className="w-5 h-5 mr-2 text-cyan-400 drop-shadow-lg" />
                  STARKY.IA Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-emerald-400 font-medium font-mono">Padrão Positivo</p>
                      <p className="text-gray-300 text-sm font-mono">Seu humor melhora após exercícios matinais</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium font-mono">Tendência</p>
                      <p className="text-gray-300 text-sm font-mono">Humor médio subiu 15% esta semana</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-medium font-mono">Sugestão</p>
                      <p className="text-gray-300 text-sm font-mono">Considere meditar nas quartas-feiras</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Entries */}
        <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-white font-mono tracking-wide">
              Reflexões Anteriores
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {[
                { date: 'Ontem', mood: 3, preview: 'Dia produtivo no trabalho. Consegui finalizar o projeto que estava pendente há semanas...', sentiment: 'Positivo' },
                { date: '2 dias atrás', mood: 2, preview: 'Me senti um pouco sobrecarregado hoje. Muitas reuniões e pouco tempo para focar...', sentiment: 'Neutro' },
                { date: '3 dias atrás', mood: 5, preview: 'Que dia incrível! Acordei cedo, fiz exercícios e me senti muito energizado...', sentiment: 'Muito Positivo' }
              ].map((entry, index) => (
                <div key={index} className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30 cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        entry.mood >= 4 ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' :
                        entry.mood >= 3 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' :
                        'bg-red-400 shadow-lg shadow-red-400/50'
                      }`} />
                      <span className="text-gray-400 text-sm font-mono">{entry.date}</span>
                    </div>
                    <Badge className={`text-xs font-mono tracking-wide ${
                      entry.sentiment === 'Muito Positivo' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                      entry.sentiment === 'Positivo' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                    } shadow-lg`}>
                      {entry.sentiment}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">{entry.preview}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (module === "tasks") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Gestão de Tarefas</h1>
            <p className="text-gray-400 font-mono">Organize e priorize suas tarefas com inteligência artificial</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent backdrop-blur-sm border border-yellow-500/20 shadow-2xl shadow-yellow-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center font-mono tracking-wide">
                <Circle className="w-5 h-5 mr-2 text-yellow-400" />
                Pendentes (12)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {[
                { title: "Revisar proposta de projeto", priority: "Alta", due: "Hoje" },
                { title: "Preparar apresentação", priority: "Média", due: "Amanhã" },
                { title: "Responder emails", priority: "Baixa", due: "Esta semana" }
              ].map((task, index) => (
                <div key={index} className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                  <p className="text-white font-medium font-mono tracking-wide">{task.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={`text-xs font-mono tracking-wide ${
                      task.priority === "Alta" ? "bg-red-500/20 text-red-400 border-red-500/40" :
                      task.priority === "Média" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" :
                      "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    }`}>
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-gray-400 font-mono">{task.due}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent backdrop-blur-sm border border-blue-500/20 shadow-2xl shadow-blue-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center font-mono tracking-wide">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Em Progresso (5)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {[
                { title: "Desenvolver nova funcionalidade", progress: 75 },
                { title: "Análise de mercado", progress: 45 },
                { title: "Reunião com cliente", progress: 90 }
              ].map((task, index) => (
                <div key={index} className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                  <p className="text-white font-medium font-mono tracking-wide">{task.title}</p>
                  <div className="mt-2">
                    <div className="w-full bg-cyan-500/10 border border-cyan-500/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-400 h-2 rounded-full shadow-lg shadow-cyan-500/40" 
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-cyan-400 mt-1 font-mono tracking-wide">{task.progress}% completo</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent backdrop-blur-sm border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center font-mono tracking-wide">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
                Concluídas (28)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {[
                { title: "Finalizar relatório mensal", completed: "Hoje" },
                { title: "Atualizar documentação", completed: "Ontem" },
                { title: "Revisar código", completed: "2 dias atrás" }
              ].map((task, index) => (
                <div key={index} className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl opacity-75 hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                  <p className="text-white font-medium line-through font-mono tracking-wide">{task.title}</p>
                  <span className="text-xs text-gray-400 font-mono">{task.completed}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (module === "projects") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Projetos</h1>
            <p className="text-gray-400 font-mono">Gerencie projetos complexos com marcos e cronogramas</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { 
              name: "Website da Empresa", 
              progress: 75, 
              status: "Em Progresso", 
              deadline: "15 dias",
              tasks: 12,
              completed: 9,
              gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
              borderColor: "border-cyan-500/20",
              glowColor: "shadow-cyan-500/10"
            },
            { 
              name: "App Mobile", 
              progress: 45, 
              status: "Em Progresso", 
              deadline: "30 dias",
              tasks: 18,
              completed: 8,
              gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
              borderColor: "border-blue-500/20",
              glowColor: "shadow-blue-500/10"
            },
            { 
              name: "Sistema de CRM", 
              progress: 90, 
              status: "Quase Pronto", 
              deadline: "5 dias",
              tasks: 15,
              completed: 14,
              gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
              borderColor: "border-emerald-500/20",
              glowColor: "shadow-emerald-500/10"
            }
          ].map((project, index) => (
            <Card key={index} className={`bg-gradient-to-br ${project.gradient} backdrop-blur-sm border ${project.borderColor} shadow-2xl ${project.glowColor} rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-mono tracking-wide">{project.name}</CardTitle>
                  <Badge className={`font-mono tracking-wide ${
                    project.progress >= 80 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20" :
                    project.progress >= 50 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-lg shadow-yellow-500/20" :
                    "bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-lg shadow-blue-500/20"
                  }`}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 font-mono">Progresso</span>
                      <span className="text-white font-medium font-mono">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-cyan-500/10 border border-cyan-500/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-400 h-2 rounded-full shadow-lg shadow-cyan-500/40" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">Tarefas</p>
                      <p className="text-white font-medium font-mono">{project.completed}/{project.tasks}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">Prazo</p>
                      <p className="text-white font-medium font-mono">{project.deadline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (module === "habits") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Hábitos</h1>
            <p className="text-gray-400 font-mono">Construa hábitos consistentes e acompanhe seu progresso</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <Plus className="w-4 h-4 mr-2" />
            Novo Hábito
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Exercício Matinal", streak: 15, target: 30, completed: true, gradient: "from-emerald-500/10 via-green-500/5 to-transparent", borderColor: "border-emerald-500/20", glowColor: "shadow-emerald-500/10" },
            { name: "Leitura Diária", streak: 8, target: 21, completed: false, gradient: "from-blue-500/10 via-cyan-500/5 to-transparent", borderColor: "border-blue-500/20", glowColor: "shadow-blue-500/10" },
            { name: "Meditação", streak: 22, target: 30, completed: true, gradient: "from-purple-500/10 via-indigo-500/5 to-transparent", borderColor: "border-purple-500/20", glowColor: "shadow-purple-500/10" },
            { name: "Beber Água", streak: 5, target: 14, completed: false, gradient: "from-cyan-500/10 via-blue-500/5 to-transparent", borderColor: "border-cyan-500/20", glowColor: "shadow-cyan-500/10" },
            { name: "Estudar Programação", streak: 12, target: 30, completed: true, gradient: "from-yellow-500/10 via-amber-500/5 to-transparent", borderColor: "border-yellow-500/20", glowColor: "shadow-yellow-500/10" },
            { name: "Dormir Cedo", streak: 3, target: 7, completed: false, gradient: "from-indigo-500/10 via-purple-500/5 to-transparent", borderColor: "border-indigo-500/20", glowColor: "shadow-indigo-500/10" }
          ].map((habit, index) => (
            <Card key={index} className={`bg-gradient-to-br ${habit.gradient} backdrop-blur-sm border ${habit.borderColor} shadow-2xl ${habit.glowColor} rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium font-mono tracking-wide">{habit.name}</h3>
                  <div className={`w-4 h-4 rounded-full shadow-lg ${
                    habit.completed ? "bg-emerald-500 shadow-emerald-500/50" : "bg-gray-600 shadow-gray-600/50"
                  }`} />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-sm font-mono">Sequência</span>
                      <span className="text-emerald-400 font-bold font-mono">{habit.streak} dias</span>
                    </div>
                    <div className="w-full bg-cyan-500/10 border border-cyan-500/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full shadow-lg shadow-emerald-500/40" 
                        style={{ width: `${(habit.streak / habit.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-mono">Meta: {habit.target} dias</span>
                    <span className="text-gray-400 font-mono">{Math.round((habit.streak / habit.target) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (module === "finance") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Finanças</h1>
            <p className="text-gray-400 font-mono">Controle suas receitas e despesas com análises inteligentes</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent backdrop-blur-sm border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-mono">+12%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">R$ 8.500</p>
                <p className="text-gray-400 text-sm font-mono">Receitas do Mês</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 via-pink-500/5 to-transparent backdrop-blur-sm border border-red-500/20 shadow-2xl shadow-red-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-6 h-6 text-red-400 rotate-180" />
                <span className="text-red-400 text-sm font-mono">+8%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">R$ 3.200</p>
                <p className="text-gray-400 text-sm font-mono">Despesas do Mês</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-6 h-6 text-cyan-400" />
                <span className="text-emerald-400 text-sm font-mono">Positivo</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">R$ 5.300</p>
                <p className="text-gray-400 text-sm font-mono">Saldo do Mês</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-white font-mono tracking-wide">Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {[
                { type: "receita", description: "Freelance - Website", amount: 2500, date: "Hoje" },
                { type: "despesa", description: "Supermercado", amount: -180, date: "Ontem" },
                { type: "receita", description: "Salário", amount: 5000, date: "2 dias atrás" },
                { type: "despesa", description: "Conta de Luz", amount: -120, date: "3 dias atrás" },
                { type: "despesa", description: "Combustível", amount: -200, date: "4 dias atrás" }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full shadow-lg ${
                      transaction.type === "receita" ? "bg-emerald-400 shadow-emerald-400/50" : "bg-red-400 shadow-red-400/50"
                    }`} />
                    <div>
                      <p className="text-white font-medium font-mono tracking-wide">{transaction.description}</p>
                      <p className="text-gray-400 text-sm font-mono">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold font-mono tracking-wide ${
                    transaction.amount > 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (module === "reports") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-wide mb-2">Relatórios</h1>
            <p className="text-gray-400 font-mono">Análises detalhadas da sua produtividade e performance</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/40 border border-emerald-400/30 transition-all duration-300 hover:scale-105 font-mono tracking-wide">
            <BarChart3 className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent backdrop-blur-sm border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-white font-mono tracking-wide">Produtividade Semanal</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400 font-mono tracking-wider">72%</p>
                  <p className="text-gray-400 font-mono">Média da Semana</p>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Segunda", value: 85 },
                    { day: "Terça", value: 92 },
                    { day: "Quarta", value: 68 },
                    { day: "Quinta", value: 78 },
                    { day: "Sexta", value: 65 }
                  ].map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400 font-mono">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-cyan-500/10 border border-cyan-500/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full shadow-lg shadow-emerald-500/40" 
                            style={{ width: `${day.value}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-8 font-mono">{day.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-white font-mono tracking-wide flex items-center">
                <Zap className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                Insights do STARKY.IA
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/15 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-emerald-400 font-medium font-mono">Ponto Forte</p>
                      <p className="text-gray-300 text-sm font-mono">Você é mais produtivo nas manhãs de terça e quinta-feira</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/15 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-medium font-mono">Oportunidade</p>
                      <p className="text-gray-300 text-sm font-mono">Considere agendar tarefas importantes para as manhãs</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/15 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium font-mono">Sugestão</p>
                      <p className="text-gray-300 text-sm font-mono">Seus hábitos de exercício estão impactando positivamente sua produtividade</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard padrão
  return null
}