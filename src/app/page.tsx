'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'

// Agents Section Component
function AgentsSection({ agents, onUpdatePrompt, onUpdateStyle, onSave, onDelete }) {
  const responseStyles = [
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'amical', label: 'Amical' },
    { value: 'technique', label: 'Technique' },
    { value: 'créatif', label: 'Créatif' },
    { value: 'concis', label: 'Concis' },
    { value: 'détaillé', label: 'Détaillé' }
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🤖 Gestion des Agents Autonomes
            <Badge variant="outline" className="text-xs text-green-400 border-green-400/50">
              {agents.filter(a => a.status === 'actif').length} actifs
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-black border border-green-400/20 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-green-300 font-medium flex items-center gap-2">
                        {agent.emoji} {agent.name}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            agent.status === 'actif' 
                              ? 'text-green-400 border-green-400/50' 
                              : 'text-red-400 border-red-400/50'
                          }`}
                        >
                          {agent.status}
                        </Badge>
                      </h3>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                                onClick={() => onSave(agent.id)}
                              >
                                💾
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black border border-green-400/30 text-green-300">
                              Sauvegarder l'agent
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                                onClick={() => onDelete(agent.id)}
                              >
                                🗑️
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black border border-red-400/30 text-red-300">
                              Supprimer l'agent
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-green-400/80 flex items-center gap-1">
                        Prompt Système
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                            <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                              Définissez les instructions de base pour l'agent IA
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Textarea
                        value={agent.systemPrompt}
                        onChange={(e) => onUpdatePrompt(agent.id, e.target.value)}
                        className="bg-black border border-green-400/30 text-green-300 placeholder-green-400/50 focus:border-green-400 min-h-[80px] text-sm"
                        placeholder="Entrez le prompt système..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-green-400/80 flex items-center gap-1">
                        Style de Réponse
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                            <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                              Choisissez comment l'agent doit répondre en temps réel
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Select value={agent.responseStyle} onValueChange={(value) => onUpdateStyle(agent.id, value)}>
                        <SelectTrigger className="bg-black border border-green-400/30 text-green-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-green-400/30">
                          {responseStyles.map((style) => (
                            <SelectItem 
                              key={style.value} 
                              value={style.value}
                              className="text-green-300 hover:bg-green-400/10 focus:bg-green-400/20"
                            >
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-xs text-green-400/60">
                      Dernière activité: {agent.lastActivity}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

// Performance Section Component
function PerformanceSection({ agentPerformance, alerts, performanceSettings, onDismissAlert, onUpdatePerformanceSettings, onUpdateAlertThreshold, onExportReport }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      default: return 'text-green-400 bg-green-400/10 border-green-400/30'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return '🚨'
      case 'warning': return '⚠️'
      default: return 'ℹ️'
    }
  }

  const topPerformers = agentPerformance
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const needsAttention = agentPerformance
    .filter(agent => agent.status === 'critical' || agent.status === 'warning')

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {agentPerformance.length}
            </div>
            <div className="text-sm text-green-400/80">Agents Actifs</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {Math.floor(agentPerformance.reduce((sum, agent) => sum + agent.score, 0) / agentPerformance.length)}%
            </div>
            <div className="text-sm text-green-400/80">Score Moyen</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">🚨</div>
            <div className="text-2xl font-bold text-red-400 mb-1">
              {alerts.filter(alert => alert.type === 'critical').length}
            </div>
            <div className="text-sm text-green-400/80">Alertes Critiques</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {Math.floor(agentPerformance.reduce((sum, agent) => sum + agent.requestsPerMinute, 0) / agentPerformance.length)}
            </div>
            <div className="text-sm text-green-400/80">Requêtes/min</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🚨 Alertes Système
            <Badge variant="outline" className="text-xs text-red-400 border-red-400/50">
              {alerts.length} actives
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-64">
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border flex items-center justify-between ${
                  alert.type === 'critical' ? 'border-red-400/30 bg-red-400/5' :
                  alert.type === 'warning' ? 'border-yellow-400/30 bg-yellow-400/5' :
                  'border-blue-400/30 bg-blue-400/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getAlertIcon(alert.type)}</span>
                    <div>
                      <div className={`font-medium ${
                        alert.type === 'critical' ? 'text-red-400' :
                        alert.type === 'warning' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`}>
                        {alert.agent}
                      </div>
                      <div className="text-sm text-green-400/60">{alert.message}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400/60">{alert.timestamp}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-400/60 hover:text-green-300"
                      onClick={() => onDismissAlert(alert.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-black border border-green-400/30 rounded-lg">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              🏆 Meilleurs Performeurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((agent, index) => (
                <div key={agent.agentId} className="flex items-center justify-between p-3 rounded-lg border border-green-400/20 bg-green-400/5">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-green-300">#{index + 1}</div>
                    <div>
                      <div className="font-medium text-green-300">{agent.agentName}</div>
                      <div className="text-sm text-green-400/60">Score: {agent.score}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(agent.score)}`}>
                      {agent.score}%
                    </div>
                    <Progress value={agent.score} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Needs Attention */}
        <Card className="bg-black border border-green-400/30 rounded-lg">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              ⚠️ Nécessite Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttention.length > 0 ? needsAttention.map((agent) => (
                <div key={agent.agentId} className="flex items-center justify-between p-3 rounded-lg border border-green-400/20 bg-green-400/5">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-green-300">{agent.agentName}</div>
                      <div className="text-sm text-green-400/60">CPU: {agent.cpu}% | RAM: {agent.memory}%</div>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(agent.score)}`}>
                    {agent.score}%
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-green-400/60">
                  ✅ Tous les agents fonctionnent normalement
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Settings */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            ⚙️ Paramètres de Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alert Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-green-300">Activer les alertes automatiques</label>
              <Switch
                checked={performanceSettings.alertsEnabled}
                onCheckedChange={(checked) => onUpdatePerformanceSettings('alertsEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-green-300">Notifications push</label>
              <Switch
                checked={performanceSettings.pushNotifications}
                onCheckedChange={(checked) => onUpdatePerformanceSettings('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-green-300">Notifications email</label>
              <Switch
                checked={performanceSettings.emailNotifications}
                onCheckedChange={(checked) => onUpdatePerformanceSettings('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-green-300">Rapports automatiques</label>
              <Switch
                checked={performanceSettings.autoReports}
                onCheckedChange={(checked) => onUpdatePerformanceSettings('autoReports', checked)}
              />
            </div>
          </div>

          {/* Alert Thresholds */}
          <div className="space-y-4">
            <h3 className="text-green-300 font-medium">Seuils d'alerte</h3>
            
            <div className="space-y-2">
              <label className="text-green-300 text-sm">CPU: {performanceSettings.alertThresholds.cpu}%</label>
              <Slider
                value={[performanceSettings.alertThresholds.cpu]}
                onValueChange={(value) => onUpdateAlertThreshold('cpu', value[0])}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-green-300 text-sm">Mémoire: {performanceSettings.alertThresholds.memory}%</label>
              <Slider
                value={[performanceSettings.alertThresholds.memory]}
                onValueChange={(value) => onUpdateAlertThreshold('memory', value[0])}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-green-300 text-sm">Temps de réponse: {performanceSettings.alertThresholds.responseTime}ms</label>
              <Slider
                value={[performanceSettings.alertThresholds.responseTime]}
                onValueChange={(value) => onUpdateAlertThreshold('responseTime', value[0])}
                max={5000}
                min={500}
                step={100}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-green-300 text-sm">Taux d'erreur: {performanceSettings.alertThresholds.errorRate}%</label>
              <Slider
                value={[performanceSettings.alertThresholds.errorRate]}
                onValueChange={(value) => onUpdateAlertThreshold('errorRate', value[0])}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Export Report */}
          <div className="flex gap-4">
            <Button 
              onClick={onExportReport}
              className="bg-green-400/10 border border-green-400/30 text-green-300 hover:bg-green-400/20"
            >
              📊 Exporter Rapport
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Predictions Section Component
function PredictionsSection({ predictions, agentPerformance }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '📈'
      case 'declining': return '📉'
      default: return '➡️'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-green-400'
      case 'declining': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'optimize': return 'text-orange-400'
      case 'monitor': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  const sortedPredictions = predictions.sort((a, b) => b.predicted24h - a.predicted24h)

  return (
    <div className="space-y-6">
      {/* AI Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">🔮</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {predictions.length}
            </div>
            <div className="text-sm text-green-400/80">Agents Analysés</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {Math.floor(predictions.reduce((sum, pred) => sum + pred.predicted24h, 0) / predictions.length)}%
            </div>
            <div className="text-sm text-green-400/80">Prévision Moyenne</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {Math.floor(predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length)}%
            </div>
            <div className="text-sm text-green-400/80">Confiance IA</div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-green-400/30 rounded-lg p-4">
          <CardContent className="p-0">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-2xl font-bold text-green-300 mb-1">
              {predictions.filter(pred => pred.trend === 'improving').length}
            </div>
            <div className="text-sm text-green-400/80">Tendance Positive</div>
          </CardContent>
        </Card>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Predictions */}
        <Card className="bg-black border border-green-400/30 rounded-lg">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              🚀 Meilleures Prédictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedPredictions.slice(0, 5).map((prediction, index) => (
                <div key={prediction.agentId} className="flex items-center justify-between p-3 rounded-lg border border-green-400/20 bg-green-400/5">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-green-300">#{index + 1}</div>
                    <div>
                      <div className="font-medium text-green-300">{prediction.agentName}</div>
                      <div className="text-sm text-green-400/60">
                        Actuel: {prediction.currentPerformance}% → Prévu: {prediction.predicted24h}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span>{getTrendIcon(prediction.trend)}</span>
                      <span className={`text-sm font-medium ${getTrendColor(prediction.trend)}`}>
                        {prediction.predicted24h}%
                      </span>
                    </div>
                    <div className="text-xs text-green-400/60">
                      {prediction.confidence}% confiance
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-black border border-green-400/30 rounded-lg">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              💡 Recommandations IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predictions.map((prediction) => (
                <div key={prediction.agentId} className="flex items-center justify-between p-3 rounded-lg border border-green-400/20 bg-green-400/5">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-green-300">{prediction.agentName}</div>
                      <div className="text-sm text-green-400/60">
                        {getTrendIcon(prediction.trend)} {prediction.trend === 'improving' ? 'Amélioration' : prediction.trend === 'declining' ? 'Déclin' : 'Stable'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getRecommendationColor(prediction.recommendation)}`}>
                      {prediction.recommendation === 'optimize' ? 'Optimiser' : prediction.recommendation === 'monitor' ? 'Surveiller' : 'Stable'}
                    </div>
                    <div className="text-xs text-green-400/60">
                      {prediction.confidence}% confiance
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🧠 Insights IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-green-400/20 bg-green-400/5">
              <div className="text-lg font-bold text-green-300 mb-2">Performance Globale</div>
              <div className="text-sm text-green-400/60">
                Les agents montrent une tendance positive avec {predictions.filter(pred => pred.trend === 'improving').length} agents en amélioration.
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-green-400/20 bg-green-400/5">
              <div className="text-lg font-bold text-green-300 mb-2">Confiance Moyenne</div>
              <div className="text-sm text-green-400/60">
                Le système IA maintient une confiance moyenne de {Math.floor(predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length)}% dans ses prédictions.
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-green-400/20 bg-green-400/5">
              <div className="text-lg font-bold text-green-300 mb-2">Actions Recommandées</div>
              <div className="text-sm text-green-400/60">
                {predictions.filter(pred => pred.recommendation === 'optimize').length} agents nécessitent une optimisation immédiate.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Themes Section Component
function ThemesSection({ themeSettings, onUpdateThemeSettings }) {
  const themes = [
    {
      name: 'Matrix',
      value: 'matrix',
      colors: {
        primary: '#00ff66',
        secondary: '#ff0066',
        background: '#000000',
        accent: '#00ccff'
      }
    },
    {
      name: 'Cyberpunk',
      value: 'cyberpunk',
      colors: {
        primary: '#ff0066',
        secondary: '#00ff66',
        background: '#1a0033',
        accent: '#ff6600'
      }
    },
    {
      name: 'Neon Blue',
      value: 'neon-blue',
      colors: {
        primary: '#00ccff',
        secondary: '#ff00cc',
        background: '#000011',
        accent: '#66ff00'
      }
    },
    {
      name: 'Fire',
      value: 'fire',
      colors: {
        primary: '#ff6600',
        secondary: '#ffcc00',
        background: '#220000',
        accent: '#ff3366'
      }
    },
    {
      name: 'Nature',
      value: 'nature',
      colors: {
        primary: '#66ff00',
        secondary: '#00cc66',
        background: '#001100',
        accent: '#66ffcc'
      }
    },
    {
      name: 'Royal',
      value: 'royal',
      colors: {
        primary: '#9966ff',
        secondary: '#ff66cc',
        background: '#110022',
        accent: '#66ccff'
      }
    }
  ]

  const applyTheme = (theme) => {
    Object.entries(theme.colors).forEach(([key, value]) => {
      onUpdateThemeSettings(key, value)
    })
    onUpdateThemeSettings('currentTheme', theme.value)
  }

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🎨 Sélection du Thème
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.value}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  themeSettings.currentTheme === theme.value
                    ? 'border-green-400 bg-green-400/10'
                    : 'border-green-400/30 hover:border-green-400/50'
                }`}
                onClick={() => applyTheme(theme)}
              >
                <div className="font-medium text-green-300 mb-3">{theme.name}</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-green-400/30"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span className="text-xs text-green-400/60">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-green-400/30"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <span className="text-xs text-green-400/60">Secondaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-green-400/30"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span className="text-xs text-green-400/60">Accent</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Colors */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🎨 Couleurs Personnalisées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Color */}
          <div className="space-y-2">
            <label className="text-green-300">Couleur Principale</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={themeSettings.primaryColor}
                onChange={(e) => onUpdateThemeSettings('primaryColor', e.target.value)}
                className="w-12 h-12 rounded border border-green-400/30 bg-black"
              />
              <span className="text-green-400/60">{themeSettings.primaryColor}</span>
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <label className="text-green-300">Couleur Secondaire</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={themeSettings.secondaryColor}
                onChange={(e) => onUpdateThemeSettings('secondaryColor', e.target.value)}
                className="w-12 h-12 rounded border border-green-400/30 bg-black"
              />
              <span className="text-green-400/60">{themeSettings.secondaryColor}</span>
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <label className="text-green-300">Couleur de Fond</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={themeSettings.backgroundColor}
                onChange={(e) => onUpdateThemeSettings('backgroundColor', e.target.value)}
                className="w-12 h-12 rounded border border-green-400/30 bg-black"
              />
              <span className="text-green-400/60">{themeSettings.backgroundColor}</span>
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-green-300">Couleur d'Accent</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) => onUpdateThemeSettings('accentColor', e.target.value)}
                className="w-12 h-12 rounded border border-green-400/30 bg-black"
              />
              <span className="text-green-400/60">{themeSettings.accentColor}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            👁️ Prévisualisation du Thème
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border-2"
            style={{
              backgroundColor: themeSettings.backgroundColor,
              borderColor: themeSettings.primaryColor
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: themeSettings.primaryColor }}
                >
                  Aperçu du Thème
                </h3>
                <div 
                  className="px-3 py-1 rounded text-sm font-medium"
                  style={{ 
                    backgroundColor: themeSettings.primaryColor + '20',
                    color: themeSettings.primaryColor,
                    borderColor: themeSettings.primaryColor + '50'
                  }}
                >
                  Actif
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-3 rounded text-center"
                  style={{ 
                    backgroundColor: themeSettings.primaryColor + '10',
                    color: themeSettings.primaryColor
                  }}
                >
                  Élément Principal
                </div>
                <div 
                  className="p-3 rounded text-center"
                  style={{ 
                    backgroundColor: themeSettings.secondaryColor + '10',
                    color: themeSettings.secondaryColor
                  }}
                >
                  Élément Secondaire
                </div>
              </div>
              
              <div 
                className="p-3 rounded text-center"
                style={{ 
                  backgroundColor: themeSettings.accentColor + '10',
                  color: themeSettings.accentColor
                }}
              >
                Élément d'Accent
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
function SettingsSection({ ledSettings, matrixSettings, onUpdateLedSettings, onUpdateMatrixSettings, onExport, onImport }) {
  const bannerStyles = [
    { value: 'matrix', label: 'Matrix', preview: 'text-green-400 font-mono bg-black' },
    { value: 'cyberpunk', label: 'Cyberpunk', preview: 'text-pink-400 font-bold bg-purple-900/20' },
    { value: 'classique', label: 'Classique', preview: 'text-blue-400 font-sans bg-blue-900/20' }
  ]

  const fonts = [
    { value: 'monospace', label: 'Monospace' },
    { value: 'orbitron', label: 'Orbitron' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'courier', label: 'Courier' }
  ]

  const colors = [
    { name: 'Vert Matrix', value: '#00ff66' },
    { name: 'Bleu Néon', value: '#00ccff' },
    { name: 'Rose Cyber', value: '#ff0066' },
    { name: 'Jaune Alert', value: '#ffcc00' },
    { name: 'Rouge Danger', value: '#ff4444' },
    { name: 'Blanc Pur', value: '#ffffff' }
  ]

  return (
    <div className="space-y-6">
      {/* LED Banner Settings */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🎛️ Gestion de la Bannière LED
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <label className="text-green-300 flex items-center gap-2">
              Activer la bannière LED
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Activez ou désactivez l'affichage de la bannière LED en temps réel
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Switch
              checked={ledSettings.enabled}
              onCheckedChange={(checked) => onUpdateLedSettings('enabled', checked)}
            />
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Texte de la bannière
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Entrez le texte qui défilera dans la bannière LED
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              value={ledSettings.text}
              onChange={(e) => onUpdateLedSettings('text', e.target.value)}
              className="bg-black border border-green-400/30 text-green-300 placeholder-green-400/50 focus:border-green-400"
              placeholder="Entrez le texte..."
            />
          </div>

          {/* Style Selection */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Style de la bannière
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Choisissez le style visuel de la bannière LED
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {bannerStyles.map((style) => (
                <button
                  key={style.value}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    ledSettings.style === style.value
                      ? 'border-green-400 bg-green-400/10'
                      : 'border-green-400/30 hover:border-green-400/50'
                  }`}
                  onClick={() => onUpdateLedSettings('style', style.value)}
                >
                  <div className="text-sm text-green-300 mb-2">{style.label}</div>
                  <div className={`text-xs p-2 rounded ${style.preview}`}>
                    {ledSettings.text.substring(0, 20)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Couleur du texte
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Sélectionnez la couleur du texte pour la bannière LED
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    ledSettings.color === color.value
                      ? 'border-white scale-110'
                      : 'border-gray-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => onUpdateLedSettings('color', color.value)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Police de caractères
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Choisissez la police de caractères pour la bannière
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Select value={ledSettings.font} onValueChange={(value) => onUpdateLedSettings('font', value)}>
              <SelectTrigger className="bg-black border border-green-400/30 text-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border border-green-400/30">
                {fonts.map((font) => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    className="text-green-300 hover:bg-green-400/10 focus:bg-green-400/20"
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Taille des caractères: {ledSettings.fontSize}px
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Ajustez la taille du texte dans la bannière LED
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[ledSettings.fontSize]}
              onValueChange={(value) => onUpdateLedSettings('fontSize', value[0])}
              max={32}
              min={12}
              step={2}
              className="w-full"
            />
          </div>

          {/* Text Effect */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Effet du texte
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Choisissez l'effet visuel du texte
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'fixe'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'fixe')}
              >
                📌 Fixe
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'clignotant'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'clignotant')}
              >
                ✨ Clignotant
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'neon'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'neon')}
              >
                💡 Néon
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'arc-en-ciel'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'arc-en-ciel')}
              >
                🌈 Arc-en-ciel
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'pulse'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'pulse')}
              >
                💓 Pulse
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'glitch'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'glitch')}
              >
                📺 Glitch
              </button>
              <button
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  ledSettings.textEffect === 'defilement'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-green-400/30 text-green-400/60 hover:border-green-400/50'
                }`}
                onClick={() => onUpdateLedSettings('textEffect', 'defilement')}
              >
                🌊 Défilement
              </button>
            </div>
          </div>

          {/* Blink/Scroll Speed (only for applicable effects) */}
          {(ledSettings.textEffect === 'clignotant' || ledSettings.textEffect === 'pulse' || ledSettings.textEffect === 'defilement') && (
            <div className="space-y-2">
              <label className="text-green-300 flex items-center gap-2">
                Vitesse de {ledSettings.textEffect === 'clignotant' ? 'clignotement' : ledSettings.textEffect === 'pulse' ? 'pulse' : 'défilement'}: {ledSettings.blinkSpeed}ms
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                    <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                      Ajustez la vitesse de l'effet {ledSettings.textEffect === 'clignotant' ? 'clignotement' : ledSettings.textEffect === 'pulse' ? 'pulse' : 'défilement'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Slider
                value={[ledSettings.blinkSpeed]}
                onValueChange={(value) => onUpdateLedSettings('blinkSpeed', value[0])}
                max={2000}
                min={200}
                step={100}
                className="w-full"
              />
            </div>
          )}

          {/* Glow Effect */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-green-300 flex items-center gap-2">
                Effet de lueur
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                    <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                      Activez l'effet de lueur autour du texte
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Switch
                checked={ledSettings.glowEnabled}
                onCheckedChange={(checked) => onUpdateLedSettings('glowEnabled', checked)}
              />
            </div>

            {ledSettings.glowEnabled && (
              <>
                {/* Glow Intensity */}
                <div className="space-y-2">
                  <label className="text-green-300 flex items-center gap-2">
                    Intensité de la lueur: {ledSettings.glowIntensity}px
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                        <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                          Ajustez l'intensité de l'effet de lueur
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Slider
                    value={[ledSettings.glowIntensity]}
                    onValueChange={(value) => onUpdateLedSettings('glowIntensity', value[0])}
                    max={30}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Glow Color */}
                <div className="space-y-2">
                  <label className="text-green-300 flex items-center gap-2">
                    Couleur de la lueur
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                        <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                          Choisissez la couleur de la lueur
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color) => (
                      <button
                        key={`glow-${color.value}`}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          ledSettings.glowColor === color.value
                            ? 'border-white scale-110'
                            : 'border-gray-600 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => onUpdateLedSettings('glowColor', color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Glow Spread */}
                <div className="space-y-2">
                  <label className="text-green-300 flex items-center gap-2">
                    Diffusion de la lueur: {ledSettings.glowSpread}px
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                        <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                          Ajustez la diffusion de la lueur
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Slider
                    value={[ledSettings.glowSpread]}
                    onValueChange={(value) => onUpdateLedSettings('glowSpread', value[0])}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          {/* Speed Slider */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Vitesse de défilement: {ledSettings.speed}%
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Ajustez la vitesse de défilement du texte dans la bannière
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[ledSettings.speed]}
              onValueChange={(value) => onUpdateLedSettings('speed', value[0])}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          {/* Live Preview */}
          <div className="space-y-2">
            <label className="text-green-300">Prévisualisation en temps réel</label>
            <div className="p-4 rounded-lg border border-green-400/30 bg-black overflow-hidden">
              <div 
                className={`whitespace-nowrap inline-block ${
                  ledSettings.textEffect === 'clignotant' ? 'animate-blink' :
                  ledSettings.textEffect === 'neon' ? 'animate-neon' :
                  ledSettings.textEffect === 'arc-en-ciel' ? 'animate-rainbow' :
                  ledSettings.textEffect === 'pulse' ? 'animate-pulse' :
                  ledSettings.textEffect === 'glitch' ? 'animate-glitch' :
                  ledSettings.textEffect === 'defilement' ? 'animate-scroll' :
                  ledSettings.textEffect === 'fixe' ? 'animate-marquee' : ''
                }`}
                style={{
                  color: ledSettings.textEffect === 'arc-en-ciel' ? 'transparent' : ledSettings.color,
                  fontFamily: ledSettings.font,
                  fontSize: `${ledSettings.fontSize}px`,
                  fontWeight: ledSettings.textEffect === 'neon' ? 'bold' : 'normal',
                  textShadow: ledSettings.glowEnabled ? `
                    0 0 ${ledSettings.glowIntensity}px ${ledSettings.glowColor},
                    0 0 ${ledSettings.glowIntensity + ledSettings.glowSpread}px ${ledSettings.glowColor},
                    0 0 ${ledSettings.glowIntensity + ledSettings.glowSpread * 2}px ${ledSettings.glowColor}
                  ` : 'none',
                  background: ledSettings.textEffect === 'arc-en-ciel' 
                    ? 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)' 
                    : 'transparent',
                  WebkitBackgroundClip: ledSettings.textEffect === 'arc-en-ciel' ? 'text' : 'none',
                  WebkitTextFillColor: ledSettings.textEffect === 'arc-en-ciel' ? 'transparent' : 'inherit',
                  animationDuration: ledSettings.textEffect === 'clignotant' || ledSettings.textEffect === 'pulse' || ledSettings.textEffect === 'defilement' 
                    ? `${ledSettings.blinkSpeed}ms` 
                    : ledSettings.textEffect === 'arc-en-ciel'
                    ? '3s'
                    : ledSettings.textEffect === 'glitch'
                    ? '0.3s'
                    : `${(110 - ledSettings.speed) * 0.1}s`,
                  animationTimingFunction: ledSettings.textEffect === 'pulse' ? 'ease-in-out' : 'linear',
                  animationIterationCount: 'infinite'
                }}
              >
                {ledSettings.text}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import/Export Settings */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            💾 Gestion des Paramètres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={onExport}
              className="bg-green-400/10 border border-green-400/30 text-green-300 hover:bg-green-400/20"
            >
              📤 Exporter les paramètres
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button 
                variant="outline"
                className="border-green-400/30 text-green-300 hover:bg-green-400/10"
              >
                📥 Importer des paramètres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matrix Background Settings */}
      <Card className="bg-black border border-green-400/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            🌧️ Arrière-plan Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <label className="text-green-300 flex items-center gap-2">
              Activer la pluie de lettres
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Activez ou désactivez l'effet de pluie de lettres Matrix en arrière-plan
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Switch
              checked={matrixSettings.enabled}
              onCheckedChange={(checked) => onUpdateMatrixSettings('enabled', checked)}
            />
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Opacité: {Math.round(matrixSettings.opacity * 100)}%
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Ajustez la transparence de la pluie de lettres
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[matrixSettings.opacity * 100]}
              onValueChange={(value) => onUpdateMatrixSettings('opacity', value[0] / 100)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Vitesse de chute: {matrixSettings.speed}%
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Ajustez la vitesse de chute des lettres
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[matrixSettings.speed]}
              onValueChange={(value) => onUpdateMatrixSettings('speed', value[0])}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
          </div>

          {/* Density */}
          <div className="space-y-2">
            <label className="text-green-300 flex items-center gap-2">
              Densité: {matrixSettings.density}%
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">❓</TooltipTrigger>
                  <TooltipContent className="bg-black border border-green-400/30 text-green-300 max-w-xs">
                    Ajustez le nombre de lettres qui tombent
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[matrixSettings.density]}
              onValueChange={(value) => onUpdateMatrixSettings('density', value[0])}
              max={200}
              min={50}
              step={10}
              className="w-full"
            />
          </div>

          {/* Live Preview */}
          <div className="space-y-2">
            <label className="text-green-300">Prévisualisation</label>
            <div className="p-4 rounded-lg border border-green-400/30 bg-black relative overflow-hidden" style={{ height: '120px' }}>
              {matrixSettings.enabled && (
                <div className="absolute inset-0 pointer-events-none">
                  <MatrixRain 
                    opacity={matrixSettings.opacity}
                    speed={matrixSettings.speed}
                    density={matrixSettings.density}
                  />
                </div>
              )}
              <div className="relative z-10 flex items-center justify-center h-full text-green-400/60 text-sm">
                {matrixSettings.enabled ? 'Pluie de lettres Matrix active' : 'Arrière-plan désactivé'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Matrix Rain Component
function MatrixRain({ opacity, speed, density }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          top: -100%;
          font-family: monospace;
          font-size: 14px;
          color: #00ff66;
          animation: fall linear infinite;
          opacity: ${opacity};
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
      {Array.from({ length: Math.floor(density / 2) }).map((_, i) => (
        <div
          key={i}
          className="matrix-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${(120 - speed) * 0.1}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {Array.from({ length: Math.floor(Math.random() * 20) + 5 }, () => 
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ).join('')}
        </div>
      ))}
    </div>
  )
}

export default function MatrixAdminDashboard() {
  const [currentTime, setCurrentTime] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [agents, setAgents] = useState([])
  const [ledSettings, setLedSettings] = useState({
    enabled: false,
    text: 'MATRIX ADMIN SYSTEM',
    color: '#00ff66',
    speed: 50,
    style: 'matrix',
    font: 'monospace',
    backgroundColor: '#000000',
    fontSize: 16,
    textEffect: 'fixe', // 'fixe', 'clignotant', 'neon', 'arc-en-ciel', 'pulse', 'glitch'
    blinkSpeed: 1000,
    glowEnabled: true,
    glowIntensity: 10,
    glowColor: '#00ff66',
    glowSpread: 5
  })

  const [matrixSettings, setMatrixSettings] = useState({
    enabled: true,
    opacity: 0.3,
    speed: 50,
    density: 100
  })

  const [themeSettings, setThemeSettings] = useState({
    currentTheme: 'matrix',
    primaryColor: '#00ff66',
    secondaryColor: '#ff0066',
    backgroundColor: '#000000',
    accentColor: '#00ccff'
  })

  const [performanceSettings, setPerformanceSettings] = useState({
    alertsEnabled: true,
    alertThresholds: {
      cpu: 80,
      memory: 85,
      responseTime: 2000,
      errorRate: 5
    },
    emailNotifications: true,
    pushNotifications: true,
    autoReports: true,
    reportFrequency: 'daily'
  })

  const [agentPerformance, setAgentPerformance] = useState([])
  const [alerts, setAlerts] = useState([])
  const [predictions, setPredictions] = useState([])

  // Initialize agents and performance data
  useEffect(() => {
    const agentEmojis = ['🤖', '🦾', '⚡', '🔧', '💻', '🎯', '🚀', '🔮', '⚙️', '🎨', '🎭', '🎪', '🎬', '🎮', '🎲', '🎸', '🎺', '🎻', '🥁', '🎹']
    const initialAgents = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Agent ${i + 1}`,
      emoji: agentEmojis[i],
      systemPrompt: `Vous êtes l'Agent ${i + 1}, assistant IA spécialisé dans la gestion système Matrix.`,
      responseStyle: 'professionnel',
      status: 'actif',
      lastActivity: `il y a ${Math.floor(Math.random() * 60)} min`
    }))
    setAgents(initialAgents)

    // Initialize performance data
    const initialPerformance = initialAgents.map(agent => ({
      agentId: agent.id,
      agentName: agent.name,
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      responseTime: Math.floor(Math.random() * 3000),
      errorRate: Math.floor(Math.random() * 10),
      uptime: Math.floor(Math.random() * 100),
      requestsPerMinute: Math.floor(Math.random() * 1000),
      score: Math.floor(Math.random() * 100),
      status: Math.random() > 0.8 ? 'critical' : Math.random() > 0.6 ? 'warning' : 'normal',
      last24h: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
    }))
    setAgentPerformance(initialPerformance)

    // Initialize alerts
    const initialAlerts = [
      { id: 1, type: 'critical', agent: 'Agent 3', message: 'CPU usage critical: 95%', timestamp: 'il y a 2 min' },
      { id: 2, type: 'warning', agent: 'Agent 7', message: 'Memory usage high: 82%', timestamp: 'il y a 5 min' },
      { id: 3, type: 'info', agent: 'System', message: 'Performance report generated', timestamp: 'il y a 10 min' }
    ]
    setAlerts(initialAlerts)

    // Initialize predictions
    const initialPredictions = initialPerformance.map(agent => ({
      agentId: agent.agentId,
      agentName: agent.agentName,
      currentPerformance: agent.score,
      predicted24h: Math.floor(Math.random() * 30) + 70,
      confidence: Math.floor(Math.random() * 30) + 70,
      trend: Math.random() > 0.5 ? 'improving' : 'declining',
      recommendation: Math.random() > 0.7 ? 'optimize' : Math.random() > 0.4 ? 'monitor' : 'stable'
    }))
    setPredictions(initialPredictions)
  }, [])

  // Theme application useEffect
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-primary', themeSettings.primaryColor)
    root.style.setProperty('--theme-secondary', themeSettings.secondaryColor)
    root.style.setProperty('--theme-background', themeSettings.backgroundColor)
    root.style.setProperty('--theme-accent', themeSettings.accentColor)
    
    // Also update the body background for immediate visual feedback
    document.body.style.backgroundColor = themeSettings.backgroundColor
    
    // Apply theme colors to all existing elements with dynamic updates
    const style = document.createElement('style')
    style.id = 'dynamic-theme-styles'
    style.textContent = `
      :root {
        --theme-primary: ${themeSettings.primaryColor};
        --theme-secondary: ${themeSettings.secondaryColor};
        --theme-background: ${themeSettings.backgroundColor};
        --theme-accent: ${themeSettings.accentColor};
      }
      
      body {
        background-color: ${themeSettings.backgroundColor} !important;
      }
      
      .text-green-300, .text-green-400, .text-green-400\\/60, .text-green-400\\/80 {
        color: ${themeSettings.primaryColor} !important;
      }
      
      .border-green-400, .border-green-400\\/20, .border-green-400\\/30, .border-green-400\\/50 {
        border-color: ${themeSettings.primaryColor} !important;
      }
      
      .bg-green-400\\/5, .bg-green-400\\/10, .bg-green-400\\/20 {
        background-color: ${themeSettings.primaryColor}20 !important;
      }
      
      .hover\\:bg-green-400\\/10:hover {
        background-color: ${themeSettings.primaryColor}20 !important;
      }
      
      .hover\\:border-green-400\\/50:hover {
        border-color: ${themeSettings.primaryColor}80 !important;
      }
      
      .focus\\:border-green-400:focus {
        border-color: ${themeSettings.primaryColor} !important;
      }
      
      .focus\\:bg-green-400\\/20:focus {
        background-color: ${themeSettings.primaryColor}33 !important;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${themeSettings.primaryColor}50 !important;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${themeSettings.primaryColor}80 !important;
      }
    `
    
    // Remove existing dynamic styles if any
    const existingStyle = document.getElementById('dynamic-theme-styles')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    // Add new dynamic styles
    document.head.appendChild(style)
  }, [themeSettings])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Agent management functions
  const updateAgentPrompt = (agentId, newPrompt) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, systemPrompt: newPrompt } : agent
    ))
  }

  const updateAgentStyle = (agentId, newStyle) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, responseStyle: newStyle } : agent
    ))
  }

  const saveAgent = (agentId) => {
    // Simulate saving to backend
    console.log(`Agent ${agentId} sauvegardé`)
  }

  const deleteAgent = (agentId) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, status: 'supprimé' } : agent
    ))
  }

  // LED banner functions
  const updateLedSettings = (key, value) => {
    setLedSettings(prev => ({ ...prev, [key]: value }))
  }

  // Matrix background functions
  const updateMatrixSettings = (key, value) => {
    setMatrixSettings(prev => ({ ...prev, [key]: value }))
  }

  // Theme settings functions
  const updateThemeSettings = (key, value) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }))
  }

  // Performance settings functions
  const updatePerformanceSettings = (key, value) => {
    setPerformanceSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateAlertThreshold = (key, value) => {
    setPerformanceSettings(prev => ({
      ...prev,
      alertThresholds: { ...prev.alertThresholds, [key]: value }
    }))
  }

  // Performance monitoring functions
  const generatePerformanceReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      agents: agentPerformance.length,
      averageScore: Math.floor(agentPerformance.reduce((sum, agent) => sum + agent.score, 0) / agentPerformance.length),
      criticalAlerts: alerts.filter(alert => alert.type === 'critical').length,
      warnings: alerts.filter(alert => alert.type === 'warning').length,
      topPerformers: agentPerformance
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(agent => ({ name: agent.agentName, score: agent.score })),
      needsAttention: agentPerformance
        .filter(agent => agent.status === 'critical' || agent.status === 'warning')
        .map(agent => ({ name: agent.agentName, status: agent.status }))
    }
    return report
  }

  const exportPerformanceReport = () => {
    const report = generatePerformanceReport()
    const data = JSON.stringify(report, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  // Alert management
  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update performance data
      setAgentPerformance(prev => prev.map(agent => ({
        ...agent,
        cpu: Math.max(0, Math.min(100, agent.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, agent.memory + (Math.random() - 0.5) * 8)),
        responseTime: Math.max(0, Math.min(3000, agent.responseTime + (Math.random() - 0.5) * 200)),
        score: Math.max(0, Math.min(100, agent.score + (Math.random() - 0.5) * 5)),
        last24h: [...agent.last24h.slice(1), Math.floor(Math.random() * 100)]
      })))

      // Check for new alerts
      if (performanceSettings.alertsEnabled && Math.random() > 0.95) {
        const randomAgent = agentPerformance[Math.floor(Math.random() * agentPerformance.length)]
        const alertTypes = ['critical', 'warning', 'info']
        const messages = [
          'CPU usage critical',
          'Memory usage high',
          'Response time degraded',
          'Error rate increasing',
          'Performance optimized'
        ]
        
        const newAlert = {
          id: Date.now(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          agent: randomAgent.agentName,
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: 'à l\'instant'
        }
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]) // Keep last 10 alerts
        
        // Show push notification (simulated)
        if (performanceSettings.pushNotifications) {
          console.log('🔔 Push Notification:', newAlert)
        }
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [performanceSettings.alertsEnabled, performanceSettings.pushNotifications])

  const exportSettings = () => {
    const data = JSON.stringify({ 
      agents, 
      ledSettings, 
      matrixSettings, 
      themeSettings, 
      performanceSettings 
    }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'matrix-admin-settings.json'
    a.click()
  }

  const importSettings = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.agents) setAgents(data.agents)
          if (data.ledSettings) setLedSettings(data.ledSettings)
          if (data.matrixSettings) setMatrixSettings(data.matrixSettings)
          if (data.themeSettings) setThemeSettings(data.themeSettings)
          if (data.performanceSettings) setPerformanceSettings(data.performanceSettings)
        } catch (error) {
          console.error('Erreur lors de l\'importation:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  const stats = [
    {
      value: '2,847',
      label: 'Utilisateurs actifs',
      variation: '+12%',
      icon: '👥'
    },
    {
      value: '1,429',
      label: 'Sessions actives',
      variation: '+8%',
      icon: '🔐'
    },
    {
      value: '8,924',
      label: 'Réquetes/min',
      variation: '-3%',
      icon: '📊'
    },
    {
      value: '0%',
      label: 'Alertes sécurité',
      variation: '0%',
      icon: '🛡️'
    }
  ]

  const activities = [
    {
      icon: '✅',
      label: 'Connexion système',
      user: 'admin@matrix.com',
      time: 'il y a 2 min',
      status: 'success'
    },
    {
      icon: '📝',
      label: 'Mise à jour profil',
      user: 'user@matrix.com',
      time: 'il y a 5 min',
      status: 'success'
    },
    {
      icon: '🔍',
      label: 'Scan sécurité',
      user: 'system@matrix.com',
      time: 'il y a 8 min',
      status: 'success'
    },
    {
      icon: '❌',
      label: 'Échec connexion',
      user: 'unknown@matrix.com',
      time: 'il y a 12 min',
      status: 'error'
    },
    {
      icon: '⚡',
      label: 'Optimisation base',
      user: 'system@matrix.com',
      time: 'il y a 15 min',
      status: 'success'
    }
  ]

  const services = [
    {
      name: 'Base de données',
      uptime: '99.9%',
      status: 'ONLINE',
      icon: '✅'
    },
    {
      name: 'Serveur web',
      uptime: '99.8%',
      status: 'ONLINE',
      icon: '✅'
    },
    {
      name: 'API Gateway',
      uptime: '100%',
      status: 'ONLINE',
      icon: '✅'
    },
    {
      name: 'Cache Redis',
      uptime: '98.5%',
      status: 'MAINTENANCE',
      icon: '⚠️'
    },
    {
      name: 'File d\'attente',
      uptime: '99.7%',
      status: 'ONLINE',
      icon: '✅'
    },
    {
      name: 'Monitoring',
      uptime: '100%',
      status: 'ONLINE',
      icon: '✅'
    }
  ]

  const menuItems = [
    { icon: '📊', label: 'Tableau de bord', key: 'dashboard' },
    { icon: '🤖', label: 'Gestion Agents', key: 'agents' },
    { icon: '📈', label: 'Performance', key: 'performance' },
    { icon: '🔮', label: 'Prédictions IA', key: 'predictions' },
    { icon: '🎨', label: 'Thèmes', key: 'themes' },
    { icon: '⚙️', label: 'Paramètres', key: 'settings' },
    { icon: '👥', label: 'Utilisateurs', key: 'users' },
    { icon: '👤', label: 'Admin & Modérateurs', key: 'admins' },
    { icon: '💾', label: 'Base de données', key: 'database' },
    { icon: '🔒', label: 'Sécurité', key: 'security' },
    { icon: '📋', label: 'Journaux', key: 'logs' }
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Background */}
      {matrixSettings.enabled && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <MatrixRain 
            opacity={matrixSettings.opacity}
            speed={matrixSettings.speed}
            density={matrixSettings.density}
          />
        </div>
      )}
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-green-400/30 z-20">
        <div className="p-6 border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🛡️</div>
            <h1 className="text-xl font-bold text-green-400">MATRIX ADMIN</h1>
          </div>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
                activeSection === item.key 
                  ? 'bg-green-400/10 text-green-300 border border-green-400/30' 
                  : 'hover:bg-green-400/5'
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 p-4 border border-green-400/30 rounded-lg bg-black">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="text-green-300">23%</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="text-green-300">67%</span>
            </div>
            <div className="flex justify-between">
              <span>Réseau:</span>
              <span className="text-green-300">STABLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="fixed top-0 left-64 right-0 h-12 bg-black border-b border-green-400/30 flex items-center justify-end px-6 z-10">
        <div className="flex items-center gap-6 text-sm">
          <span>{currentTime}</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300">SYSTÈME ACTIF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center text-xs">
              🎼
            </div>
            <span>LikeJust chef d'orchestre</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-12 p-6">
        {activeSection === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-black border border-green-400/30 rounded-lg p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl">{stat.icon}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          stat.variation.startsWith('+') 
                            ? 'text-green-400 border-green-400/50' 
                            : stat.variation.startsWith('-') 
                            ? 'text-red-400 border-red-400/50' 
                            : 'text-yellow-400 border-yellow-400/50'
                        }`}
                      >
                        {stat.variation}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-300 mb-1">{stat.value}</div>
                    <div className="text-sm text-green-400/80">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="bg-black border border-green-400/30 rounded-lg">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
                    📋 Activité récente
                  </h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          activity.status === 'error' 
                            ? 'border-red-400/30 bg-red-400/5' 
                            : 'border-green-400/30 bg-green-400/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{activity.icon}</span>
                          <div>
                            <div className={`font-medium ${
                              activity.status === 'error' ? 'text-red-400' : 'text-green-300'
                            }`}>
                              {activity.label}
                            </div>
                            <div className="text-sm text-green-400/60">{activity.user}</div>
                          </div>
                        </div>
                        <div className="text-xs text-green-400/60">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Status */}
              <Card className="bg-black border border-green-400/30 rounded-lg">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
                    🖥️ État des services
                    <Badge variant="outline" className="text-xs text-green-400 border-green-400/50">
                      Surveillance active
                    </Badge>
                  </h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {services.map((service, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 rounded-lg border border-green-400/30 bg-green-400/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{service.icon}</span>
                          <div>
                            <div className="font-medium text-green-300">{service.name}</div>
                            <div className="text-sm text-green-400/60">{service.uptime}</div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            service.status === 'ONLINE' 
                              ? 'text-green-400 border-green-400/50' 
                              : 'text-yellow-400 border-yellow-400/50'
                          }`}
                        >
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeSection === 'agents' && (
          <AgentsSection agents={agents} onUpdatePrompt={updateAgentPrompt} onUpdateStyle={updateAgentStyle} onSave={saveAgent} onDelete={deleteAgent} />
        )}

        {activeSection === 'settings' && (
          <SettingsSection ledSettings={ledSettings} matrixSettings={matrixSettings} onUpdateLedSettings={updateLedSettings} onUpdateMatrixSettings={updateMatrixSettings} onExport={exportSettings} onImport={importSettings} />
        )}

        {activeSection === 'performance' && (
          <PerformanceSection 
            agentPerformance={agentPerformance} 
            alerts={alerts} 
            performanceSettings={performanceSettings}
            onDismissAlert={dismissAlert}
            onUpdatePerformanceSettings={updatePerformanceSettings}
            onUpdateAlertThreshold={updateAlertThreshold}
            onExportReport={exportPerformanceReport}
          />
        )}

        {activeSection === 'predictions' && (
          <PredictionsSection 
            predictions={predictions} 
            agentPerformance={agentPerformance}
          />
        )}

        {activeSection === 'themes' && (
          <ThemesSection 
            themeSettings={themeSettings}
            onUpdateThemeSettings={updateThemeSettings}
          />
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 0, 0.4);
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 0, 0.7);
          border: 1px solid rgba(0, 255, 0, 0.5);
        }
        ::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes neon {
          0%, 100% { 
            text-shadow: 
              0 0 5px currentColor,
              0 0 10px currentColor,
              0 0 15px currentColor,
              0 0 20px currentColor;
          }
          50% { 
            text-shadow: 
              0 0 10px currentColor,
              0 0 20px currentColor,
              0 0 30px currentColor,
              0 0 40px currentColor;
          }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
        
        .animate-blink {
          animation: blink step-end infinite;
        }
        
        .animate-neon {
          animation: neon ease-in-out infinite;
        }
        
        .animate-rainbow {
          animation: rainbow linear infinite;
          background-size: 200% 200%;
        }
        
        .animate-pulse {
          animation: pulse ease-in-out infinite;
        }
        
        .animate-glitch {
          animation: glitch linear infinite;
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  )
}