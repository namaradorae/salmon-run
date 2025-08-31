import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { Fish, BarChart3, Settings, Edit, Plus, Minus } from 'lucide-react'
import './App.css'

interface WeaponStats {
  mobility: number
  painting: number
  inkEfficiency: number
  dosukoi: number
  mediumSalmonid: number
  lesserSalmonid: number
  kohaku: number
  tower: number
  catapult: number
  cannon: number
  pillar: number
  mole: number
  pan: number
  pot: number
  snake: number
  diver: number
  bomb: number
}


function App() {
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>(['', '', '', ''])
  const [editingWeapon, setEditingWeapon] = useState<string | null>(null)
  
  const loadWeaponDatabase = (): Record<string, WeaponStats> => {
    const saved = localStorage.getItem('splatoon3-weapon-database')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved weapon database:', e)
      }
    }
    return getDefaultWeaponDatabase()
  }

  const [weaponDatabase, setWeaponDatabase] = useState<Record<string, WeaponStats>>(loadWeaponDatabase())

  useEffect(() => {
    localStorage.setItem('splatoon3-weapon-database', JSON.stringify(weaponDatabase))
  }, [weaponDatabase])

  const getDefaultWeaponDatabase = (): Record<string, WeaponStats> => ({
    'ボールドマーカー': { mobility: 8, painting: 6, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 5, tower: 4, catapult: 6, cannon: 5, pillar: 6, mole: 5, pan: 7, pot: 6, snake: 5, diver: 6, bomb: 5 },
    'わかばシューター': { mobility: 7, painting: 8, inkEfficiency: 8, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 6, tower: 5, catapult: 6, cannon: 5, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'シャープマーカー': { mobility: 7, painting: 6, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'プロモデラーMG': { mobility: 8, painting: 7, inkEfficiency: 7, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 5, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 6, pot: 5, snake: 5, diver: 5, bomb: 5 },
    'スプラシューター': { mobility: 7, painting: 8, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 6, catapult: 7, cannon: 6, pillar: 7, mole: 6, pan: 7, pot: 6, snake: 6, diver: 7, bomb: 6 },
    'N-ZAP85': { mobility: 9, painting: 9, inkEfficiency: 8, dosukoi: 9, mediumSalmonid: 9, lesserSalmonid: 9, kohaku: 5, tower: 5, catapult: 6, cannon: 5, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    '.52ガロン': { mobility: 5, painting: 6, inkEfficiency: 4, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 8, pot: 7, snake: 7, diver: 8, bomb: 7 },
    'プライムシューター': { mobility: 4, painting: 5, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 8, mole: 7, pan: 8, pot: 7, snake: 7, diver: 8, bomb: 7 },
    '.96ガロン': { mobility: 3, painting: 5, inkEfficiency: 3, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 9, tower: 8, catapult: 9, cannon: 9, pillar: 8, mole: 8, pan: 9, pot: 8, snake: 8, diver: 9, bomb: 8 },
    'ジェットスイーパー': { mobility: 4, painting: 7, inkEfficiency: 5, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 8, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'スペースシューター': { mobility: 6, painting: 6, inkEfficiency: 6, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 6, tower: 6, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 6, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'L3リールガン': { mobility: 8, painting: 5, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'H3リールガン': { mobility: 6, painting: 6, inkEfficiency: 6, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 6, pan: 7, pot: 6, snake: 6, diver: 7, bomb: 6 },
    'ボトルガイザー': { mobility: 5, painting: 4, inkEfficiency: 4, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 7, mole: 7, pan: 8, pot: 7, snake: 7, diver: 8, bomb: 7 },
    'カーボンローラー': { mobility: 10, painting: 8, inkEfficiency: 9, dosukoi: 9, mediumSalmonid: 9, lesserSalmonid: 9, kohaku: 2, tower: 1, catapult: 3, cannon: 2, pillar: 4, mole: 3, pan: 8, pot: 7, snake: 3, diver: 3, bomb: 2 },
    'スプラローラー': { mobility: 8, painting: 10, inkEfficiency: 8, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 3, tower: 2, catapult: 4, cannon: 3, pillar: 5, mole: 4, pan: 8, pot: 8, snake: 4, diver: 4, bomb: 3 },
    'ダイナモローラー': { mobility: 3, painting: 10, inkEfficiency: 4, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 5, tower: 3, catapult: 6, cannon: 5, pillar: 7, mole: 6, pan: 9, pot: 9, snake: 6, diver: 6, bomb: 5 },
    'ヴァリアブルローラー': { mobility: 6, painting: 8, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 4, tower: 3, catapult: 5, cannon: 4, pillar: 6, mole: 5, pan: 7, pot: 7, snake: 5, diver: 5, bomb: 4 },
    'ワイドローラー': { mobility: 5, painting: 9, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 4, tower: 2, catapult: 5, cannon: 4, pillar: 6, mole: 5, pan: 8, pot: 8, snake: 5, diver: 5, bomb: 4 },
    'ビッグスウィッグローラー': { mobility: 2, painting: 10, inkEfficiency: 3, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 6, tower: 4, catapult: 7, cannon: 6, pillar: 8, mole: 7, pan: 9, pot: 9, snake: 7, diver: 7, bomb: 6 },
    'スプラチャージャー': { mobility: 3, painting: 4, inkEfficiency: 5, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 9, tower: 10, catapult: 8, cannon: 9, pillar: 8, mole: 8, pan: 6, pot: 6, snake: 9, diver: 9, bomb: 8 },
    'スクイックリンα': { mobility: 6, painting: 3, inkEfficiency: 9, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 9, catapult: 7, cannon: 8, pillar: 7, mole: 7, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 7 },
    'リッター4K': { mobility: 1, painting: 3, inkEfficiency: 3, dosukoi: 3, mediumSalmonid: 3, lesserSalmonid: 3, kohaku: 10, tower: 10, catapult: 9, cannon: 10, pillar: 9, mole: 9, pan: 5, pot: 5, snake: 10, diver: 10, bomb: 9 },
    '14式竹筒銃・甲': { mobility: 6, painting: 3, inkEfficiency: 9, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 9, catapult: 7, cannon: 8, pillar: 7, mole: 7, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 7 },
    'ソイチューバー': { mobility: 5, painting: 4, inkEfficiency: 7, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 7, tower: 8, catapult: 6, cannon: 7, pillar: 6, mole: 6, pan: 5, pot: 5, snake: 7, diver: 7, bomb: 6 },
    'R-PEN/5H': { mobility: 4, painting: 4, inkEfficiency: 6, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 8, tower: 9, catapult: 7, cannon: 8, pillar: 7, mole: 7, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 7 },
    'R-PEN/5B': { mobility: 4, painting: 4, inkEfficiency: 6, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 8, tower: 9, catapult: 7, cannon: 8, pillar: 7, mole: 7, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 7 },
    'ホットブラスター': { mobility: 5, painting: 5, inkEfficiency: 5, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 7, mole: 8, pan: 7, pot: 8, snake: 7, diver: 8, bomb: 9 },
    'ロングブラスター': { mobility: 3, painting: 4, inkEfficiency: 4, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 9, tower: 8, catapult: 9, cannon: 9, pillar: 8, mole: 9, pan: 6, pot: 7, snake: 8, diver: 9, bomb: 9 },
    'クラッシュブラスター': { mobility: 7, painting: 6, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 6, mole: 7, pan: 6, pot: 7, snake: 6, diver: 7, bomb: 8 },
    'ラピッドブラスター': { mobility: 6, painting: 5, inkEfficiency: 6, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 7, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 7, snake: 7, diver: 7, bomb: 8 },
    'ラピッドブラスタープロ': { mobility: 4, painting: 4, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 8, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 6, pot: 7, snake: 8, diver: 8, bomb: 8 },
    'Rブラスターエリート': { mobility: 5, painting: 4, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 7, mole: 8, pan: 6, pot: 7, snake: 7, diver: 8, bomb: 8 },
    'S-BLAST92': { mobility: 6, painting: 5, inkEfficiency: 6, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 7, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 7, snake: 7, diver: 7, bomb: 8 },
    'ノヴァブラスター': { mobility: 8, painting: 6, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 5, mole: 6, pan: 6, pot: 6, snake: 5, diver: 6, bomb: 7 },
    'バケットスロッシャー': { mobility: 5, painting: 7, inkEfficiency: 7, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 8, snake: 6, diver: 7, bomb: 6 },
    'ヒッセン': { mobility: 6, painting: 8, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 7, pot: 8, snake: 5, diver: 6, bomb: 5 },
    'スクリュースロッシャー': { mobility: 4, painting: 6, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 7, snake: 7, diver: 7, bomb: 6 },
    'オーバーフロッシャー': { mobility: 3, painting: 8, inkEfficiency: 4, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 9, tower: 7, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 6, pot: 7, snake: 8, diver: 8, bomb: 7 },
    'エクスプロッシャー': { mobility: 2, painting: 9, inkEfficiency: 3, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 9, tower: 8, catapult: 9, cannon: 9, pillar: 9, mole: 9, pan: 5, pot: 6, snake: 9, diver: 9, bomb: 8 },
    'モップリン': { mobility: 7, painting: 6, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 5, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 6, pot: 7, snake: 5, diver: 5, bomb: 5 },
    'ドレッジャー': { mobility: 4, painting: 7, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 7, snake: 7, diver: 7, bomb: 6 },
    'スプラスピナー': { mobility: 4, painting: 8, inkEfficiency: 5, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 7, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'バレルスピナー': { mobility: 2, painting: 9, inkEfficiency: 3, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 7, pot: 6, snake: 8, diver: 8, bomb: 7 },
    'ハイドラント': { mobility: 1, painting: 10, inkEfficiency: 2, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 9, tower: 8, catapult: 9, cannon: 9, pillar: 9, mole: 9, pan: 6, pot: 5, snake: 9, diver: 9, bomb: 8 },
    'クーゲルシュライバー': { mobility: 3, painting: 8, inkEfficiency: 4, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 8, tower: 7, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 7, pot: 6, snake: 8, diver: 8, bomb: 7 },
    'ノーチラス47': { mobility: 5, painting: 7, inkEfficiency: 6, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 7, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'イグザミナー': { mobility: 6, painting: 6, inkEfficiency: 7, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 6, tower: 6, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 6, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'パブロ': { mobility: 10, painting: 9, inkEfficiency: 9, dosukoi: 9, mediumSalmonid: 9, lesserSalmonid: 9, kohaku: 2, tower: 1, catapult: 2, cannon: 2, pillar: 3, mole: 2, pan: 7, pot: 6, snake: 2, diver: 2, bomb: 2 },
    'ホクサイ': { mobility: 8, painting: 8, inkEfficiency: 8, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 3, tower: 2, catapult: 3, cannon: 3, pillar: 4, mole: 3, pan: 7, pot: 7, snake: 3, diver: 3, bomb: 3 },
    'フィンセント': { mobility: 7, painting: 7, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 4, tower: 3, catapult: 4, cannon: 4, pillar: 5, mole: 4, pan: 6, pot: 6, snake: 4, diver: 4, bomb: 4 },
    'スプラマニューバー': { mobility: 8, painting: 6, inkEfficiency: 7, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'スパッタリー': { mobility: 9, painting: 5, inkEfficiency: 8, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 5, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 6, pot: 5, snake: 5, diver: 5, bomb: 5 },
    'ケルビン525': { mobility: 7, painting: 7, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'デュアルスイーパー': { mobility: 6, painting: 8, inkEfficiency: 5, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 7, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'クアッドホッパーブラック': { mobility: 10, painting: 4, inkEfficiency: 7, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 5, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 6, pot: 5, snake: 5, diver: 5, bomb: 5 },
    'ガエンFF': { mobility: 5, painting: 6, inkEfficiency: 5, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 7, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'ドライブワイパー': { mobility: 8, painting: 7, inkEfficiency: 7, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 5, tower: 4, catapult: 5, cannon: 5, pillar: 5, mole: 5, pan: 7, pot: 6, snake: 5, diver: 5, bomb: 5 },
    'ジムワイパー': { mobility: 6, painting: 6, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 7, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'パラシェルター': { mobility: 4, painting: 6, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 7, tower: 8, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 6, snake: 7, diver: 7, bomb: 6 },
    'キャンピングシェルター': { mobility: 2, painting: 5, inkEfficiency: 4, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 8, tower: 9, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 7 },
    'スパイガジェット': { mobility: 6, painting: 5, inkEfficiency: 6, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 6, tower: 7, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 6, pot: 6, snake: 6, diver: 6, bomb: 6 },
    'トライストリンガー': { mobility: 5, painting: 5, inkEfficiency: 6, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 7, tower: 8, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 6, pot: 6, snake: 7, diver: 7, bomb: 7 },
    'LACT-450': { mobility: 4, painting: 4, inkEfficiency: 5, dosukoi: 4, mediumSalmonid: 4, lesserSalmonid: 4, kohaku: 8, tower: 9, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 5, pot: 5, snake: 8, diver: 8, bomb: 8 },
    'クマサン印のチャージャー': { mobility: 2, painting: 3, inkEfficiency: 2, dosukoi: 3, mediumSalmonid: 3, lesserSalmonid: 3, kohaku: 10, tower: 10, catapult: 10, cannon: 10, pillar: 10, mole: 10, pan: 7, pot: 7, snake: 10, diver: 10, bomb: 10 },
    'クマサン印のブラスター': { mobility: 4, painting: 6, inkEfficiency: 4, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 9, tower: 8, catapult: 9, cannon: 9, pillar: 8, mole: 9, pan: 8, pot: 9, snake: 8, diver: 9, bomb: 10 },
    'クマサン印のスロッシャー': { mobility: 3, painting: 9, inkEfficiency: 3, dosukoi: 6, mediumSalmonid: 6, lesserSalmonid: 6, kohaku: 9, tower: 7, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 7, pot: 8, snake: 8, diver: 8, bomb: 8 },
    'クマサン印のマニューバー': { mobility: 7, painting: 7, inkEfficiency: 6, dosukoi: 7, mediumSalmonid: 7, lesserSalmonid: 7, kohaku: 7, tower: 6, catapult: 7, cannon: 7, pillar: 7, mole: 7, pan: 8, pot: 7, snake: 7, diver: 7, bomb: 7 },
    'クマサン印のシェルター': { mobility: 3, painting: 6, inkEfficiency: 4, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 9, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 7, pot: 7, snake: 8, diver: 8, bomb: 8 },
    'クマサン印のストリンガー': { mobility: 4, painting: 5, inkEfficiency: 5, dosukoi: 5, mediumSalmonid: 5, lesserSalmonid: 5, kohaku: 8, tower: 9, catapult: 8, cannon: 8, pillar: 8, mole: 8, pan: 6, pot: 6, snake: 8, diver: 8, bomb: 8 },
    'クマサン印のワイパー': { mobility: 7, painting: 8, inkEfficiency: 6, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 6, tower: 5, catapult: 6, cannon: 6, pillar: 6, mole: 6, pan: 8, pot: 7, snake: 6, diver: 6, bomb: 6 },
    'クマサン印のローラー': { mobility: 6, painting: 10, inkEfficiency: 7, dosukoi: 8, mediumSalmonid: 8, lesserSalmonid: 8, kohaku: 4, tower: 3, catapult: 5, cannon: 4, pillar: 6, mole: 5, pan: 9, pot: 9, snake: 5, diver: 5, bomb: 4 }
  })

  const weaponList = Object.keys(weaponDatabase)

  const calculateTeamStats = (): WeaponStats => {
    const validWeapons = selectedWeapons.filter(w => w && weaponDatabase[w])
    if (validWeapons.length === 0) {
      return {
        mobility: 0,
        painting: 0,
        inkEfficiency: 0,
        dosukoi: 0,
      mediumSalmonid: 0,
      lesserSalmonid: 0,
        kohaku: 0,
        tower: 0,
        catapult: 0,
        cannon: 0,
        pillar: 0,
        mole: 0,
        pan: 0,
        pot: 0,
        snake: 0,
        diver: 0,
        bomb: 0
      }
    }

    const totals = validWeapons.reduce((acc, weaponName) => {
      const stats = weaponDatabase[weaponName]
      return {
        mobility: acc.mobility + stats.mobility,
        painting: acc.painting + stats.painting,
        inkEfficiency: acc.inkEfficiency + stats.inkEfficiency,
        dosukoi: acc.dosukoi + stats.dosukoi,
        mediumSalmonid: acc.mediumSalmonid + stats.mediumSalmonid,
        lesserSalmonid: acc.lesserSalmonid + stats.lesserSalmonid,
        kohaku: acc.kohaku + stats.kohaku,
        tower: acc.tower + stats.tower,
        catapult: acc.catapult + stats.catapult,
        cannon: acc.cannon + stats.cannon,
        pillar: acc.pillar + stats.pillar,
        mole: acc.mole + stats.mole,
        pan: acc.pan + stats.pan,
        pot: acc.pot + stats.pot,
        snake: acc.snake + stats.snake,
        diver: acc.diver + stats.diver,
        bomb: acc.bomb + stats.bomb
      }
    }, {
      mobility: 0,
      painting: 0,
      inkEfficiency: 0,
      dosukoi: 0,
      mediumSalmonid: 0,
      lesserSalmonid: 0,
      kohaku: 0,
      tower: 0,
      catapult: 0,
      cannon: 0,
      pillar: 0,
      mole: 0,
      pan: 0,
      pot: 0,
      snake: 0,
      diver: 0,
      bomb: 0
    })

    return {
      mobility: Math.round(totals.mobility / validWeapons.length),
      painting: Math.round(totals.painting / validWeapons.length),
      inkEfficiency: Math.round(totals.inkEfficiency / validWeapons.length),
      dosukoi: Math.round(totals.dosukoi / validWeapons.length),
      mediumSalmonid: Math.round(totals.mediumSalmonid / validWeapons.length),
      lesserSalmonid: Math.round(totals.lesserSalmonid / validWeapons.length),
      kohaku: Math.round(totals.kohaku / validWeapons.length),
      tower: Math.round(totals.tower / validWeapons.length),
      catapult: Math.round(totals.catapult / validWeapons.length),
      cannon: Math.round(totals.cannon / validWeapons.length),
      pillar: Math.round(totals.pillar / validWeapons.length),
      mole: Math.round(totals.mole / validWeapons.length),
      pan: Math.round(totals.pan / validWeapons.length),
      pot: Math.round(totals.pot / validWeapons.length),
      snake: Math.round(totals.snake / validWeapons.length),
      diver: Math.round(totals.diver / validWeapons.length),
      bomb: Math.round(totals.bomb / validWeapons.length)
    }
  }

  const getRadarData = () => {
    const teamStats = calculateTeamStats()
    return [
      { subject: '機動力', value: teamStats.mobility, fullMark: 10 },
      { subject: '塗り', value: teamStats.painting, fullMark: 10 },
      { subject: 'インク効率', value: teamStats.inkEfficiency, fullMark: 10 },
      { subject: 'ドスコイ', value: teamStats.dosukoi, fullMark: 10 },
      { subject: '中シャケ', value: teamStats.mediumSalmonid, fullMark: 10 },
      { subject: '小ジャケ', value: teamStats.lesserSalmonid, fullMark: 10 },
      { subject: 'コウモリ', value: teamStats.kohaku, fullMark: 10 },
      { subject: 'タワー', value: teamStats.tower, fullMark: 10 },
      { subject: 'カタパッド', value: teamStats.catapult, fullMark: 10 },
      { subject: 'テッキュウ', value: teamStats.cannon, fullMark: 10 },
      { subject: 'ハシラ', value: teamStats.pillar, fullMark: 10 },
      { subject: 'モグラ', value: teamStats.mole, fullMark: 10 },
      { subject: 'テッパン', value: teamStats.pan, fullMark: 10 },
      { subject: 'ナベブタ', value: teamStats.pot, fullMark: 10 },
      { subject: 'ヘビ', value: teamStats.snake, fullMark: 10 },
      { subject: 'ダイバー', value: teamStats.diver, fullMark: 10 },
      { subject: 'バクダン', value: teamStats.bomb, fullMark: 10 }
    ]
  }

  const updateWeaponSelection = (index: number, weaponName: string) => {
    const newSelection = [...selectedWeapons]
    newSelection[index] = weaponName
    setSelectedWeapons(newSelection)
  }

  const updateWeaponStat = (weaponName: string, stat: keyof WeaponStats, value: number) => {
    const updatedDatabase = {
      ...weaponDatabase,
      [weaponName]: {
        ...weaponDatabase[weaponName],
        [stat]: Math.max(0, Math.min(10, value))
      }
    }
    setWeaponDatabase(updatedDatabase)
    localStorage.setItem('splatoon3-weapon-database', JSON.stringify(updatedDatabase))
  }

  const addNewWeapon = () => {
    const newWeaponName = `新しい武器 ${Object.keys(weaponDatabase).length + 1}`
    setWeaponDatabase(prev => ({
      ...prev,
      [newWeaponName]: {
        mobility: 5,
        painting: 5,
        inkEfficiency: 5,
        dosukoi: 5,
        mediumSalmonid: 5,
        lesserSalmonid: 5,
        kohaku: 5,
        tower: 5,
        catapult: 5,
        cannon: 5,
        pillar: 5,
        mole: 5,
        pan: 5,
        pot: 5,
        snake: 5,
        diver: 5,
        bomb: 5
      }
    }))
    setEditingWeapon(newWeaponName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-2">
            <Fish className="h-8 w-8" />
            Splatoon 3 武器編成アナライザー
            <Fish className="h-8 w-8" />
          </h1>
          <p className="text-gray-600">4つの武器編成のパラメータをレーダーチャートで分析</p>
        </header>

        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              編成アナライザー
            </TabsTrigger>
            <TabsTrigger value="weapons" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              武器パラメータ編集
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>武器編成選択</CardTitle>
                <CardDescription>4つの武器を選択してチーム編成を分析します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {selectedWeapons.map((weapon, index) => (
                    <div key={index} className="space-y-2">
                      <Label>武器 {index + 1}</Label>
                      <Select value={weapon} onValueChange={(value) => updateWeaponSelection(index, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="武器を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {weaponList.map((weaponName) => (
                            <SelectItem key={weaponName} value={weaponName}>
                              {weaponName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>チーム編成パラメータ</CardTitle>
                <CardDescription>選択した武器の平均パラメータ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={getRadarData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      <Radar
                        name="チーム編成"
                        dataKey="value"
                        stroke="#ea580c"
                        fill="#ea580c"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>詳細パラメータ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(calculateTeamStats()).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      mobility: '機動力',
                      painting: '塗り',
                      inkEfficiency: 'インク効率',
                      dosukoi: 'ドスコイ',
                      mediumSalmonid: '中シャケ',
                      lesserSalmonid: '小ジャケ',
                      kohaku: 'コウモリ',
                      tower: 'タワー',
                      catapult: 'カタパッド',
                      cannon: 'テッキュウ',
                      pillar: 'ハシラ',
                      mole: 'モグラ',
                      pan: 'テッパン',
                      pot: 'ナベブタ',
                      snake: 'ヘビ',
                      diver: 'ダイバー',
                      bomb: 'バクダン'
                    }
                    return (
                      <div key={key} className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-sm text-gray-600">{labels[key]}</div>
                        <div className="text-2xl font-bold text-orange-600">{value}/10</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weapons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  武器パラメータ編集
                  <Button onClick={addNewWeapon} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新しい武器を追加
                  </Button>
                </CardTitle>
                <CardDescription>各武器のパラメータを編集できます（0-10の範囲）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weaponList.map((weaponName) => (
                    <Card key={weaponName} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{weaponName}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingWeapon(editingWeapon === weaponName ? null : weaponName)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {editingWeapon === weaponName && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(weaponDatabase[weaponName]).map(([stat, value]) => {
                            const labels: Record<string, string> = {
                              mobility: '機動力',
                              painting: '塗り',
                              inkEfficiency: 'インク効率',
                              dosukoi: 'ドスコイ',
                              mediumSalmonid: '中シャケ',
                              lesserSalmonid: '小ジャケ',
                              kohaku: 'コウモリ',
                              tower: 'タワー',
                              catapult: 'カタパッド',
                              cannon: 'テッキュウ',
                              pillar: 'ハシラ',
                              mole: 'モグラ',
                              pan: 'テッパン',
                              pot: 'ナベブタ',
                              snake: 'ヘビ',
                              diver: 'ダイバー',
                              bomb: 'バクダン'
                            }
                            return (
                              <div key={stat} className="space-y-2">
                                <Label>{labels[stat]}</Label>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateWeaponStat(weaponName, stat as keyof WeaponStats, value - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={value}
                                    onChange={(e) => updateWeaponStat(weaponName, stat as keyof WeaponStats, parseInt(e.target.value) || 0)}
                                    className="w-16 text-center"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateWeaponStat(weaponName, stat as keyof WeaponStats, value + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                      
                      {editingWeapon !== weaponName && (
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm">
                          {Object.entries(weaponDatabase[weaponName]).map(([stat, value]) => (
                            <div key={stat} className="text-center">
                              <div className="text-gray-600 text-xs">{stat}</div>
                              <div className="font-semibold">{value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
