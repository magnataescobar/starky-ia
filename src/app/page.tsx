'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Settings, User, BarChart3, CheckSquare, FolderOpen, Target, DollarSign, Plus, Mic, MicOff, Send, X, TrendingUp, Calendar, Clock, Users, Activity, Zap, Home, FileText, PieChart, MessageSquare, BookOpen, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LasyAIChat } from '@/components/LasyAIChat'
import { ModuleContent } from '@/components/ModuleContent'

export default function StarkyIA() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'tasks', name: 'Tarefas', icon: CheckSquare },
    { id: 'projects', name: 'Projetos', icon: FolderOpen },
    { id: 'habits', name: 'Hábitos', icon: Target },
    { id: 'finance', name: 'Finanças', icon: DollarSign },
    { id: 'calendar', name: 'Calendário', icon: Calendar },
    { id: 'diary', name: 'Diário', icon: BookOpen },
    { id: 'neuro-focus', name: 'Neuro-Foco', icon: Brain },
    { id: 'reports', name: 'Relatórios', icon: FileText },
  ]

  const kpiData = [
    {
      title: 'Tarefas Pendentes',
      value: '12',
      change: '+2 hoje',
      icon: CheckSquare,
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      iconColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      glowColor: 'shadow-cyan-500/25'
    },
    {
      title: 'Projetos Ativos',
      value: '3',
      change: '+1 esta semana',
      icon: FolderOpen,
      gradient: 'from-blue-600/20 via-indigo-500/10 to-transparent',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      glowColor: 'shadow-blue-500/25'
    },
    {
      title: 'Score de Hábitos',
      value: '85%',
      change: '+5% semana',
      icon: Target,
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      iconColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/20',
      glowColor: 'shadow-indigo-500/25'
    },
    {
      title: 'Humor Hoje',
      value: 'Ótimo',
      change: 'Reflexão feita',
      icon: BookOpen,
      gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
      iconColor: 'text-teal-400',
      borderColor: 'border-teal-500/20',
      glowColor: 'shadow-teal-500/25'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'task', title: 'Finalizar relatório mensal', time: '2h atrás', status: 'completed' },
    { id: 2, type: 'project', title: 'Reunião de planejamento Q4', time: '4h atrás', status: 'in-progress' },
    { id: 3, type: 'habit', title: 'Exercício matinal concluído', time: '6h atrás', status: 'completed' },
    { id: 4, type: 'diary', title: 'Reflexão diária registrada', time: '8h atrás', status: 'completed' },
  ]

  const quickActions = [
    { title: 'Nova Tarefa', icon: Plus, action: () => setActiveModule('tasks') },
    { title: 'Novo Projeto', icon: FolderOpen, action: () => setActiveModule('projects') },
    { title: 'Registrar Hábito', icon: Target, action: () => setActiveModule('habits') },
    { title: 'Reflexão Diária', icon: BookOpen, action: () => setActiveModule('diary') },
  ]

  const productivityData = [
    { day: 'Seg', value: 85 },
    { day: 'Ter', value: 92 },
    { day: 'Qua', value: 78 },
    { day: 'Qui', value: 95 },
    { day: 'Sex', value: 88 },
    { day: 'Sáb', value: 70 },
    { day: 'Dom', value: 65 },
  ]

  const maxValue = Math.max(...productivityData.map(d => d.value))

  // Widget de Calendário Compacto
  const today = new Date()
  const currentMonth = today.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const eventsToday = [
    { time: '09:00', title: 'Reunião de equipe', type: 'meeting' },
    { time: '14:30', title: 'Revisar proposta', type: 'task' },
    { time: '16:00', title: 'Exercício', type: 'habit' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d1117] to-[#0a0a0a] text-white relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/3 via-blue-500/2 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#0f1419]/95 via-[#0d1117]/95 to-[#0f1419]/95 backdrop-blur-xl border-r border-cyan-500/10 shadow-2xl shadow-cyan-500/5">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono tracking-wide">STARKY.IA</h1>
              <p className="text-xs text-gray-400 font-mono">Produtividade Máxima</p>
            </div>
          </div>

          {/* STARKY.IA Chat Button */}
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-full mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/40 border border-cyan-400/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/60 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageSquare className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10 font-mono tracking-wide">CRONUS Chat</span>
          </Button>

          {/* Navigation */}
          <nav className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon
              const isActive = activeModule === module.id
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-mono tracking-wide relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-lg shadow-cyan-500/50" />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">{module.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 opacity-50" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-500/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <Avatar className="w-10 h-10 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-semibold font-mono">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate font-mono">Usuário</p>
              <p className="text-xs text-gray-400 truncate font-mono">usuario@email.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0f1419]/95 via-[#0d1117]/95 to-[#0f1419]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-xl shadow-cyan-500/5">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/70 w-5 h-5" />
                <Input
                  placeholder="Buscar em tudo..."
                  className="pl-10 bg-cyan-500/5 border-cyan-500/20 text-cyan-100 placeholder-cyan-400/50 rounded-xl focus:border-cyan-400/50 focus:ring-cyan-500/20 font-mono shadow-lg shadow-cyan-500/10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl border border-transparent hover:border-cyan-500/20">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl border border-transparent hover:border-cyan-500/20">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm font-semibold font-mono">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeModule === 'dashboard' ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white font-mono tracking-wide">CRONUS Dashboard</h2>
                  <p className="text-gray-400 mt-1 font-mono">Sistema operacional. Todos os sistemas funcionando normalmente.</p>
                </div>
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-400/30 shadow-lg shadow-emerald-500/40 font-mono tracking-wide">
                  <Activity className="w-4 h-4 mr-1" />
                  STARKY.IA Insights
                </Badge>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => {
                  const Icon = kpi.icon
                  return (
                    <Card key={index} className={`bg-gradient-to-br ${kpi.gradient} backdrop-blur-sm border ${kpi.borderColor} shadow-2xl ${kpi.glowColor} hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden relative group`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-gray-400 text-sm font-medium mb-2 font-mono tracking-wide">{kpi.title}</p>
                            <p className="text-3xl font-bold text-white mb-1 font-mono tracking-wider drop-shadow-lg">{kpi.value}</p>
                            <p className={`text-sm font-medium ${kpi.iconColor} font-mono tracking-wide`}>{kpi.change}</p>
                          </div>
                          <div className={`p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 ${kpi.iconColor} shadow-lg ${kpi.glowColor} group-hover:shadow-xl transition-all duration-300`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Charts, Calendar and Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Productivity Chart */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                      <TrendingUp className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                      Sistema de Produtividade - Análise
                    </CardTitle>
                    <p className="text-gray-400 text-sm font-mono">Últimos 7 dias - Eficiência operacional</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-end space-x-4 h-48">
                      {productivityData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-cyan-500/5 rounded-t-lg relative overflow-hidden border border-cyan-500/10" style={{ height: '160px' }}>
                            <div
                              className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 via-cyan-400 to-blue-400 rounded-t-lg shadow-lg shadow-cyan-500/40 transition-all duration-500 border-t border-cyan-300/30"
                              style={{ height: `${(data.value / maxValue) * 100}%` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-cyan-300/20 opacity-50" />
                          </div>
                          <p className="text-gray-400 text-sm mt-2 font-medium font-mono tracking-wide">{data.day}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                      <Zap className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                      Comandos Rápidos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 relative z-10">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <button
                          key={index}
                          onClick={action.action}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 group/item relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover/item:bg-cyan-500/30 transition-colors shadow-lg shadow-cyan-500/20 relative z-10">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-white group-hover/item:text-cyan-100 font-medium font-mono tracking-wide relative z-10">{action.title}</span>
                        </button>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Calendar Widget and Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar Widget */}
                <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                      <Calendar className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                      {currentMonth}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div key={day} className="text-center text-xs text-gray-400 font-mono p-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((day, index) => (
                        <div
                          key={index}
                          className={`text-center text-sm p-2 rounded-lg font-mono ${
                            day === today.getDate()
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                              : day
                              ? 'text-gray-300 hover:bg-cyan-500/10 transition-colors'
                              : ''
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-400 font-mono">Hoje</h4>
                      {eventsToday.map((event, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                          <span className="text-gray-400 font-mono">{event.time}</span>
                          <span className="text-white font-mono">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-transparent backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl font-bold text-white flex items-center font-mono tracking-wide">
                      <Clock className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-lg" />
                      Log de Atividades Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/30 group/activity">
                          <div className={`w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-blue-400 shadow-lg shadow-blue-400/50'}`} />
                          <div className="flex-1">
                            <p className="text-white font-medium font-mono tracking-wide">{activity.title}</p>
                            <p className="text-gray-400 text-sm font-mono">{activity.time}</p>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className={`font-mono tracking-wide ${activity.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-lg shadow-blue-500/20'}`}>
                            {activity.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <ModuleContent module={activeModule} />
          )}
        </div>
      </div>

      {/* STARKY.IA Chat */}
      {isChatOpen && (
        <LasyAIChat onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  )
}