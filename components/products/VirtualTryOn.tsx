'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sliders, Play, Download, Share2 } from 'lucide-react'

interface VirtualTryOnProps {
  productName: string
  productImage: string
}

interface BodyMeasurements {
  height: number
  bust: number
  waist: number
  hips: number
  shoulders: number
}

const bodyShapeTemplates = [
  { name: 'Petite', height: 160, bust: 85, waist: 68, hips: 90, shoulders: 38 },
  { name: 'Average', height: 170, bust: 90, waist: 72, hips: 95, shoulders: 40 },
  { name: 'Tall', height: 180, bust: 95, waist: 76, hips: 100, shoulders: 42 },
  { name: 'Plus', height: 170, bust: 105, waist: 90, hips: 115, shoulders: 44 },
]

export function VirtualTryOn({ productName, productImage }: VirtualTryOnProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(bodyShapeTemplates[1])
  const [customMeasurements, setCustomMeasurements] = useState<BodyMeasurements>(
    bodyShapeTemplates[1]
  )
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMeasurementChange = (key: keyof BodyMeasurements, value: number) => {
    setCustomMeasurements(prev => ({ ...prev, [key]: value }))
  }

  const handleTemplateSelect = (template: typeof bodyShapeTemplates[0]) => {
    setSelectedTemplate(template)
    setCustomMeasurements(template)
    setShowCustomizer(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-cream to-sand py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cormorant text-deep-charcoal mb-4">
            Virtual Try-On Experience
          </h2>
          <p className="text-lg text-taupe max-w-2xl mx-auto">
            See how this piece looks on different body shapes with our AI-powered virtual runway
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {/* Top: Body Shape Customizer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Template Selection */}
            <div className="bg-ivory p-6 rounded-sm">
              <h3 className="text-xl font-cormorant text-deep-charcoal mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-gold-accent" />
                Select Body Shape
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {bodyShapeTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 rounded-sm border-2 transition-all ${
                      selectedTemplate.name === template.name
                        ? 'border-gold-accent bg-sand'
                        : 'border-warm-grey hover:border-taupe'
                    }`}
                  >
                    <p className="font-medium text-deep-charcoal">{template.name}</p>
                    <p className="text-sm text-taupe">{template.height}cm</p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="w-full py-3 bg-sand hover:bg-warm-grey text-charcoal rounded-sm transition-all text-sm font-medium"
              >
                {showCustomizer ? 'Hide' : 'Customize'} Measurements
              </button>
            </div>

            {/* Custom Measurements */}
            {showCustomizer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-ivory p-6 rounded-sm space-y-6"
              >
                {/* Height Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-charcoal">Height</label>
                    <span className="text-sm text-taupe">{customMeasurements.height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="190"
                    value={customMeasurements.height}
                    onChange={(e) => handleMeasurementChange('height', Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-gold-accent"
                  />
                </div>

                {/* Bust Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-charcoal">Bust</label>
                    <span className="text-sm text-taupe">{customMeasurements.bust} cm</span>
                  </div>
                  <input
                    type="range"
                    min="75"
                    max="120"
                    value={customMeasurements.bust}
                    onChange={(e) => handleMeasurementChange('bust', Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-gold-accent"
                  />
                </div>

                {/* Waist Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-charcoal">Waist</label>
                    <span className="text-sm text-taupe">{customMeasurements.waist} cm</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="105"
                    value={customMeasurements.waist}
                    onChange={(e) => handleMeasurementChange('waist', Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-gold-accent"
                  />
                </div>

                {/* Hips Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-charcoal">Hips</label>
                    <span className="text-sm text-taupe">{customMeasurements.hips} cm</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="130"
                    value={customMeasurements.hips}
                    onChange={(e) => handleMeasurementChange('hips', Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-gold-accent"
                  />
                </div>

                {/* Shoulders Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-charcoal">Shoulders</label>
                    <span className="text-sm text-taupe">{customMeasurements.shoulders} cm</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="50"
                    value={customMeasurements.shoulders}
                    onChange={(e) => handleMeasurementChange('shoulders', Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-gold-accent"
                  />
                </div>
              </motion.div>
            )}

            {/* Integration Note */}
            <div className="bg-gold-accent/10 border border-gold-accent p-6 rounded-sm">
              <h4 className="font-medium text-charcoal mb-2 flex items-center gap-2">
                <span className="text-gold-accent">✨</span>
                3D Virtual Try-On Integration
              </h4>
              <p className="text-sm text-taupe leading-relaxed">
                This feature will be powered by DressX or Vntana API integration, providing 
                photorealistic 3D rendering of garments on custom body shapes with AI-powered 
                fit prediction and virtual runway experiences.
              </p>
            </div>
          </motion.div>

          {/* Bottom: Virtual Runway Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Video Player Placeholder */}
            <div className="relative aspect-video max-w-2xl mx-auto bg-deep-charcoal rounded-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 flex items-center justify-center bg-ivory/20 hover:bg-ivory/30 backdrop-blur-sm rounded-full transition-all group"
                  >
                    <Play className="w-10 h-10 text-ivory ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                ) : (
                  <div className="text-center text-ivory p-8">
                    <div className="mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-16 h-16 border-2 border-gold-accent border-t-transparent rounded-full mx-auto"
                      />
                    </div>
                    <p className="text-lg font-cormorant mb-2">Generating Virtual Runway...</p>
                    <p className="text-sm text-warm-grey">3D rendering in progress</p>
                  </div>
                )}
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-charcoal to-transparent p-6">
                <p className="text-ivory font-cormorant text-xl mb-1">{productName}</p>
                <p className="text-warm-grey text-sm">
                  {selectedTemplate.name} Model • {customMeasurements.height}cm
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-ivory hover:bg-sand border-2 border-warm-grey hover:border-gold-accent rounded-sm transition-all">
                <Download className="w-4 h-4 text-charcoal" />
                <span className="text-charcoal font-medium">Download</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-ivory hover:bg-sand border-2 border-warm-grey hover:border-gold-accent rounded-sm transition-all">
                <Share2 className="w-4 h-4 text-charcoal" />
                <span className="text-charcoal font-medium">Share</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-ivory p-6 rounded-sm">
              <h4 className="font-cormorant text-xl text-deep-charcoal mb-3">
                About Virtual Try-On
              </h4>
              <ul className="space-y-2 text-sm text-taupe">
                <li className="flex items-start gap-2">
                  <span className="text-gold-accent mt-1">•</span>
                  <span>High-definition 3D rendering with realistic fabric simulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-accent mt-1">•</span>
                  <span>AI-powered fit prediction based on body measurements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-accent mt-1">•</span>
                  <span>Dynamic runway walk with professional lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-accent mt-1">•</span>
                  <span>Multiple angles and poses for comprehensive view</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

